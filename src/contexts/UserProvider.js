import React, { createContext, useContext, useState, useEffect } from "react";
import Axios from "axios";

const context = createContext();
const loginContext = createContext();

const initUser = {
  firstname: null,
  lastname: null,
  email: null,
  street: null,
  city: null,
  phoneNumber: null,
  picture: null,
  department: null,
  faculty: null,
  level: null,
  isProf: null,
};

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
  const [user, setUser] = useState(initUser);

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
          setUser(initUser)
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

