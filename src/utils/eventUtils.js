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
    alert('There was an error with during user creation. Please log in again.');
    console.error('Error creating events for user:', user, e);
  }
  return [];
}

export async function addEvent(db, user, event) {
  const docRef = doc(db, 'events', user);

  // verify that user exists
  const docSnapshot = await getDoc(docRef);
  if (!docSnapshot.exists()) {
    alert('Something went wrong, please log in again.');
    return;
  }

  await updateDoc(docRef, {
    events: arrayUnion(event)
  });
}

export async function deleteEvent(db, user, event) {
  const docRef = doc(db, 'events', user);

  // verify that user exists
  const docSnapshot = await getDoc(docRef);
  if (!docSnapshot.exists()) {
    alert('Something went wrong, please log in again.');
    return;
  }
  
  await updateDoc(docRef, {
    events: arrayRemove(event)
  });
}
