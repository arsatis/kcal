import { createContext, useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

export const kcalConfig = {
  email: 'kcal@arsatis.kcal',
  pw: 'kCaL!fF2@(fL*b72Bj&,',
  jwtStorageKey: 'kcalAuth',
};

const firebaseConfig = {
  apiKey: 'AIzaSyDC_OOByj0zCcJEgYraBNTo_ItEq_tYOlY',
  authDomain: 'kcal-arsatis.firebaseapp.com',
  projectId: 'kcal-arsatis',
  storageBucket: 'kcal-arsatis.appspot.com',
  messagingSenderId: '69806283894',
  appId: '1:69806283894:web:c2443945966740e3e31357',
  measurementId: 'G-0J39BNLT7C',
};

function UserProvider({ children }) {
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const db = getFirestore(app);

  const [jwt, setJwt] = useState(localStorage.getItem(kcalConfig.jwtStorageKey));
  const [isAuth, setAuth] = useState(false);
  const [user, setUser] = useState('');

  return (
    <UserContext.Provider value={{
      auth,
      db,
      jwt,
      setJwt,
      isAuth,
      setAuth,
      user,
      setUser,
    }}>
      {children}
    </UserContext.Provider>
  );
}

export const UserContext = createContext();
export default UserProvider;
