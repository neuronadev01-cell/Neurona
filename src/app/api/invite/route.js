import { NextResponse } from 'next/server';
import { db } from '../../../lib/firebase';
import { 
  collection, 
  query, 
  where, 
  getDocs,
  addDoc,
  serverTimestamp
} from 'firebase/firestore';
import { sendReferralInviteEmail } from '../../../lib/email';
import { addInvitationToSheet } from '../../../lib/googleSheets';

export async function POST(request) {
  try {
    const { referrerEmail, friendName, friendEmail, referralCode } = await request.json();

    // Validate required fields
    if (!referrerEmail || !friendName || !friendEmail || !referralCode) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Find the referrer by email and referral code
    const referrerQuery = query(
      collection(db, 'users'), 
      where('email', '==', referrerEmail.toLowerCase().trim()),
      where('referralCode', '==', referralCode.toUpperCase())
    );
    const referrerSnapshot = await getDocs(referrerQuery);
    
    if (referrerSnapshot.empty) {
      return NextResponse.json(
        { error: 'Invalid referrer or referral code' },
        { status: 404 }
      );
    }

    const referrer = referrerSnapshot.docs[0].data();
    
    // Check if friend email already exists in users
    const friendQuery = query(collection(db, 'users'), where('email', '==', friendEmail.toLowerCase().trim()));
    const friendSnapshot = await getDocs(friendQuery);
    
    if (!friendSnapshot.empty) {
      return NextResponse.json(
        { error: 'This email is already registered' },
        { status: 409 }
      );
    }

    // Check if invitation already sent
    const inviteQuery = query(
      collection(db, 'invitations'), 
      where('referrerEmail', '==', referrerEmail.toLowerCase().trim()),
      where('friendEmail', '==', friendEmail.toLowerCase().trim())
    );
    const inviteSnapshot = await getDocs(inviteQuery);
    
    if (!inviteSnapshot.empty) {
      return NextResponse.json(
        { error: 'Invitation already sent to this email' },
        { status: 409 }
      );
    }

    // Send the referral invitation email
    const emailResult = await sendReferralInviteEmail({
      friendName: friendName.trim(),
      friendEmail: friendEmail.toLowerCase().trim(),
      referrerName: referrer.name,
      referralCode: referralCode.toUpperCase()
    });

    if (!emailResult.success) {
      return NextResponse.json(
        { error: 'Failed to send invitation email' },
        { status: 500 }
      );
    }

    // Track the invitation
    const invitationData = {
      referrerEmail: referrerEmail.toLowerCase().trim(),
      referrerName: referrer.name,
      friendName: friendName.trim(),
      friendEmail: friendEmail.toLowerCase().trim(),
      referralCode: referralCode.toUpperCase(),
      sentAt: serverTimestamp(),
      status: 'sent' // sent, opened, signed_up
    };
    
    await addDoc(collection(db, 'invitations'), invitationData);
    
    // Add to Google Sheets (don't block response if it fails)
    try {
      await addInvitationToSheet({
        referrerEmail: referrerEmail.toLowerCase().trim(),
        friendName: friendName.trim(),
        friendEmail: friendEmail.toLowerCase().trim(),
        referralCode: referralCode.toUpperCase()
      });
    } catch (sheetsError) {
      console.error('Google Sheets invitation sync failed (but invite succeeded):', sheetsError);
      // Don't fail the invite if sheets sync fails
    }

    return NextResponse.json({ 
      message: 'Invitation sent successfully',
      friendEmail: friendEmail.toLowerCase().trim()
    });

  } catch (error) {
    console.error('Invite API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}