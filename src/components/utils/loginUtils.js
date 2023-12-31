import sha256 from 'crypto-js/sha256';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { base64url, jwtDecrypt, EncryptJWT } from 'jose';
import { kcalConfig } from '../providers/UserProvider';

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

export async function encryptJwt(payload, secret, issuer, audience) {
  const secretBytes = base64url.decode(secret);
  const jwt = await new EncryptJWT(payload)
    .setProtectedHeader({ alg: 'dir', enc: 'A128CBC-HS256' })
    .setIssuedAt()
    .setIssuer(issuer)
    .setAudience(audience)
    .setExpirationTime('2d')
    .encrypt(secretBytes);
  return jwt;
}

export async function getPayloadFromJwt(auth, db, jwt) {
  try {
    const jwtAuth = await initializeJwtSystem(auth, db);
    const secretBytes = base64url.decode(jwtAuth.secret);
    const { payload } = await jwtDecrypt(jwt, secretBytes, {
      issuer: jwtAuth.issuer,
      audience: jwtAuth.audience,
    });
    return payload;
  } catch (error) {
    throw error;
  }
}

export async function initializeJwtSystem(auth, db) {
  const resp = await signInWithEmailAndPassword(auth, kcalConfig.email, kcalConfig.pw)
    .then(async () => {
      const docRef = doc(db, 'auth', 'jwt');
      const docSnapshot = await getDoc(docRef);
      if (docSnapshot.exists()) {
        return docSnapshot.data();
      }
      return {};
    })
    .catch((error) => {
      alert('An error was encountered during initialization. Please refresh the page.');
      console.error(error);
    });
  
  resp.header = { alg: 'dir', enc: 'A128CBC-HS256' };
  resp.expTime = '2d';
  return resp;
}

export async function signIn(auth, user, password, setAuth, setUser, navigate) {
  await signInWithEmailAndPassword(auth, user, password)
    .then(() => {
      setUser(user);
      setAuth(true);
      navigate('/kcal');
    });
}
