import { NextResponse } from 'next/server';
import { db } from '../../../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export async function GET() {
  try {
    // Test Firestore connectivity by adding a dummy document
    const testDoc = {
      message: 'Firebase connection test',
      timestamp: serverTimestamp(),
      testId: Math.random().toString(36).substring(7)
    };

    const docRef = await addDoc(collection(db, 'test'), testDoc);
    
    return NextResponse.json({ 
      success: true, 
      message: 'Firebase connection successful!', 
      documentId: docRef.id 
    });
  } catch (error) {
    console.error('Firebase connection error:', error);
    return NextResponse.json({ 
      success: false, 
      error: error.message 
    }, { status: 500 });
  }
}