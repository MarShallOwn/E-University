import React, { createContext, useContext, useState, useEffect } from "react";
import Axios from "axios";
import { set } from "lodash";

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
        if(res.data.pass){
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

