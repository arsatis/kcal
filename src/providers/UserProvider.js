import { createContext, useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  const firebaseConfig = {
    apiKey: 'AIzaSyDC_OOByj0zCcJEgYraBNTo_ItEq_tYOlY',
    authDomain: 'kcal-arsatis.firebaseapp.com',
    projectId: 'kcal-arsatis',
    storageBucket: 'kcal-arsatis.appspot.com',
    messagingSenderId: '69806283894',
    appId: '1:69806283894:web:c2443945966740e3e31357',
    measurementId: 'G-0J39BNLT7C'
  };
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  return (
    <UserContext.Provider value={{ db, user, setUser }}>
      {children}
    </UserContext.Provider>
  )
}

export const UserContext = createContext();;
export default UserProvider;
