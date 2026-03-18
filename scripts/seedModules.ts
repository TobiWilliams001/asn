// scripts/seedModules.ts
/**
 * SEED SCRIPT - Run once to populate Firestore with ASAP modules
 * 
 * Usage:
 * npx tsx scripts/seedModules.ts
 */

import 'dotenv/config';
import { MOCK_MODULES } from '../src/lib/data/mockModules';

const { initializeApp } = require('firebase/app');
const { getFirestore, doc, setDoc, Timestamp } = require('firebase/firestore');

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_LEARN_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_LEARN_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_LEARN_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_LEARN_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_LEARN_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_LEARN_FIREBASE_APP_ID,
};

console.log('Firebase Config:', firebaseConfig);

const app = initializeApp(firebaseConfig, 'seed-app');
const db = getFirestore(app, '(default)'); // Explicitly use (default) database

async function seedModules() {
  console.log('🌱 Starting module seed...\n');

  try {
    let totalLessons = 0;

    for (const moduleData of MOCK_MODULES) {
      const { id, lessons, ...moduleFields } = moduleData;

      // Create module document
      const moduleRef = doc(db, 'modules', id);
      await setDoc(moduleRef, {
        ...moduleFields,
        published: true,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      });

      console.log(`✅ ${moduleData.title}`);

      // Create lessons subcollection
      for (const lessonData of lessons) {
        const { id: lessonId, ...lessonFields } = lessonData;
        const lessonRef = doc(db, 'modules', id, 'lessons', lessonId);

        await setDoc(lessonRef, {
          ...lessonFields,
          createdAt: Timestamp.now(),
          updatedAt: Timestamp.now(),
        });

        totalLessons++;
      }
    }

    console.log(`\n🎉 Success! Created ${MOCK_MODULES.length} modules and ${totalLessons} lessons\n`);
    process.exit(0);
  } catch (error) {
    console.error('❌ Seed failed:', error);
    process.exit(1);
  }
}

seedModules();