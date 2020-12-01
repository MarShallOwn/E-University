import React, { createContext, useContext, useState, useEffect } from "react";
import Axios from "axios";

const context = createContext();
const loginContext = createContext();

/**
 * returns the logged in user
 */
export const useUser = () => {
  return useContext(context)
}

export const useLoggedIn = () => {
  return useContext(loginContext)
}

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState();

  const [loggedIn, setLoggedIn] = useState(false)

  useEffect(() => {
    Axios.get("/api/user", { withCredentials: true })
      .then((res) => {
        !res.data.pass && setLoggedIn(false)
        if(res.data.pass){
          setLoggedIn(true)
          setUser(res.data.user)
        }
        else if(!loggedIn){
          setUser(undefined)
        }
      })
      .catch((err) => {
        console.log(err);
      });
      
  }, [loggedIn]);

  return (
<context.Provider value={user}>
  <loginContext.Provider value={ setLoggedIn }>
  {children}
  </loginContext.Provider>
</context.Provider>
  ) ;
};

