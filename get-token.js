const fs = require('fs');
const envFile = fs.readFileSync('.env.local', 'utf8');
const env = {};
envFile.split('\n').forEach(line => {
  const match = line.match(/^([^=]+)=(.*)$/);
  if (match) env[match[1].trim()] = match[2].trim().replace(/^"|"$/g, '');
});

const { initializeApp } = require('firebase/app');
const { getStorage, ref, getDownloadURL } = require('firebase/storage');

const firebaseConfig = {
  apiKey: env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const fileRef = ref(storage, 'WhatsApp Image 2026-04-26 at 6.58.02 PM.jpeg');

getDownloadURL(fileRef).then(url => {
  console.log('DOWNLOAD_URL:', url);
  process.exit(0);
}).catch(err => {
  console.error(err);
  process.exit(1);
});
