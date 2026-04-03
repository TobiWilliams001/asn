import * as admin from 'firebase-admin';

// Initialize Firebase Admin
admin.initializeApp();

// Export all triggers
export { onUserCreate } from './triggers/onUserCreate';
export { onApplicationCreate } from './triggers/onApplicationCreate';
export { onApplicationUpdate } from './triggers/onApplicationUpdate';
