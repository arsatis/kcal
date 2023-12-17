import { doc, getDoc } from 'firebase/firestore';
import sha256 from 'crypto-js/sha256';

export async function isSignUpValid(db, name, password) {
  if (name === '' || password === '') {
    alert('Username or password field is empty.');
    return false;
  }
  if (name.includes('@')) {
    alert('Names should not include the \'@\' symbol.');
    return false;
  }
  if (password.length < 6) {
    alert('Password should be longer than 6 characters.');
    return false;
  }

  const docRef = doc(db, 'users', name);
  const docSnapshot = await getDoc(docRef);
  if (docSnapshot.exists()) {
    alert('User with the given name already exists.');
    return false;
  }
  return true;
}

export async function isLoginValid(db, name, password) {
  if (name === '' || password === '') {
    alert('Username or password field is empty');
    return false;
  }
  if (name.includes('@')) {
    alert('Names should not include the \'@\' symbol.');
    return false;
  }

  const docRef = doc(db, 'users', name);
  const docSnapshot = await getDoc(docRef);
  if (!docSnapshot.exists()) {
    alert('User does not exist.');
    return false;
  }

  const userDetails = docSnapshot.data();
  const passwordHash = sha256(password + userDetails.salt).words;
  if (userDetails.password.some((v, i) => v !== passwordHash[i])) {
    alert('Incorrect password.');
    return false;
  }
  return true;
}

export function padUsername(name) {
  return name + '@kcal.kcal';
}
