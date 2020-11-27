import React, { createContext, useContext, useState, useEffect } from "react";
import Axios from "axios";

const context = createContext();

/**
 * returns the logged in user
 */
export const useUser = () => {
  return useContext(context)
}

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState();

  useEffect(() => {
    Axios.get("/api/user", { withCredentials: true })
      .then((res) => setUser(res.data.user))
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return <context.Provider value={user}>{children}</context.Provider>;
};

