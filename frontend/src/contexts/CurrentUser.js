import { createContext, useState, useEffect } from 'react';

export const CurrentUser = createContext();

function CurrentUserProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {

    const getLoggedInUser = async () => {
      try{
        let response = await fetch('http://localhost:5000/authentication/profile', {
            credentials: 'include'
        })
        if (response.status === 401) {
          setCurrentUser(null);
          return;
        }

        let user = await response.json();
        setCurrentUser(user);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };
    getLoggedInUser();
  }, []);

  return (
    <CurrentUser.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </CurrentUser.Provider>
  );
}

export default CurrentUserProvider;
