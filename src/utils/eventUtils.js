import { arrayRemove, arrayUnion, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';

export async function getEvents(db, user) {
  const docRef = doc(db, 'events', user);
  const docSnapshot = await getDoc(docRef);

  if (docSnapshot.exists()) {
    return docSnapshot.data().events;
  }
  try {
    await setDoc(doc(db, 'events', user), {
      user: user,
      events: []
    });
  } catch (e) {
    alert('There was an error during user creation. Please log in again.');
    console.error('Error creating events for user:', user, e);
  }
  return [];
}

export async function addEvent(db, user, event) {
  const docRef = await validateUserExists(db, user);
  if (docRef === null) {
    return;
  }

  await updateDoc(docRef, {
    events: arrayUnion(event)
  });
}

export async function deleteEvent(db, user, event) {
  const docRef = await validateUserExists(db, user);
  if (docRef === null) {
    return;
  }
  
  await updateDoc(docRef, {
    events: arrayRemove(event)
  });
}

export async function updateEventList(db, user, events) {
  const docRef = await validateUserExists(db, user);
  if (docRef === null) {
    return;
  }

  await updateDoc(docRef, {
    events: events
  });
}

async function validateUserExists(db, user) {
  const docRef = doc(db, 'events', user);
  const docSnapshot = await getDoc(docRef);

  if (!docSnapshot.exists()) {
    alert('Something went wrong, please log in again.');
    return null;
  }
  return docRef;
}
