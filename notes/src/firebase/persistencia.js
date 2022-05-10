/* eslint-disable eqeqeq */
import {
  enableIndexedDbPersistence,
  initializeFirestore,
  CACHE_SIZE_UNLIMITED,
} from "./firebase-auth";
import { db, app } from "./firebase-config";

const firestoreDb = initializeFirestore(app, {
  cacheSizeBytes: CACHE_SIZE_UNLIMITED,
});

enableIndexedDbPersistence(db).catch((err) => {
  if (err.code == "failed-precondition") {
    // Multiple tabs open, persistence can only be enabled
    // in one tab at a a time.
    // ...
  } else if (err.code == "unimplemented") {
    // The current browser does not support all of the
    // features required to enable persistence
    // ...
  }
});
