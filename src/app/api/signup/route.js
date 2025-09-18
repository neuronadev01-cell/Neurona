import { NextResponse } from 'next/server';
import { db } from '../../../lib/firebase';
import { 
  collection, 
  addDoc, 
  serverTimestamp, 
  query, 
  where, 
  getDocs,
  updateDoc,
  doc,
  increment
} from 'firebase/firestore';
import { sendWelcomeEmail } from '../../../lib/email';

// Generate a unique short referral code
function generateReferralCode() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < 8; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

// Check if referral code is unique
async function isReferralCodeUnique(code) {
  const q = query(collection(db, 'users'), where('referralCode', '==', code));
  const querySnapshot = await getDocs(q);
  return querySnapshot.empty;
}

// Generate a unique referral code
async function generateUniqueReferralCode() {
  let code;
  let isUnique = false;
  let attempts = 0;
  const maxAttempts = 10;

  while (!isUnique && attempts < maxAttempts) {
    code = generateReferralCode();
    isUnique = await isReferralCodeUnique(code);
    attempts++;
  }

  if (!isUnique) {
    throw new Error('Unable to generate unique referral code');
  }

  return code;
}

export async function POST(request) {
  try {
    const { name, email, phone, suggestions, ref } = await request.json();

    // Validate required fields
    if (!name || !email) {
      return NextResponse.json(
        { error: 'Name and email are required' },
        { status: 400 }
      );
    }

    // Check if email already exists
    const emailQuery = query(collection(db, 'users'), where('email', '==', email));
    const emailSnapshot = await getDocs(emailQuery);
    
    if (!emailSnapshot.empty) {
      return NextResponse.json(
        { error: 'Email already registered' },
        { status: 409 }
      );
    }

    // Generate unique referral code for new user
    const referralCode = await generateUniqueReferralCode();

    // Prepare user data
    const userData = {
      name: name.trim(),
      email: email.toLowerCase().trim(),
      phone: phone?.trim() || null,
      suggestions: suggestions?.trim() || null,
      referralCode,
      referredBy: null,
      referralCount: 0,
      createdAt: serverTimestamp()
    };

    // If referred by someone, validate referrer and update their count
    if (ref && ref.trim()) {
      const referrerQuery = query(
        collection(db, 'users'), 
        where('referralCode', '==', ref.trim().toUpperCase())
      );
      const referrerSnapshot = await getDocs(referrerQuery);
      
      if (!referrerSnapshot.empty) {
        // Set the referredBy field
        userData.referredBy = ref.trim().toUpperCase();
        
        // Update referrer's count
        const referrerDoc = referrerSnapshot.docs[0];
        await updateDoc(doc(db, 'users', referrerDoc.id), {
          referralCount: increment(1)
        });
      }
      // Note: If referral code is invalid, we still proceed with signup
      // but don't set referredBy (graceful degradation)
    }

    // Save the user to Firestore
    const docRef = await addDoc(collection(db, 'users'), userData);

    // Send welcome email (don't block the response if email fails)
    try {
      await sendWelcomeEmail({
        name: userData.name,
        email: userData.email,
        referralCode: userData.referralCode
      });
    } catch (emailError) {
      console.error('Welcome email failed (but signup succeeded):', emailError);
      // Don't fail the signup if email fails
    }

    return NextResponse.json({ 
      message: 'Signup successful',
      referralCode: userData.referralCode,
      userId: docRef.id
    });

  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}