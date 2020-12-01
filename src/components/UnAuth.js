import React, { useEffect, useState } from "react";
import { Redirect, Route } from "react-router-dom";
import { useUser } from "../contexts/UserProvider";

const UnAuth = ({ component: Component, ...rest }) => {
  const user = useUser();

  const [loading, setLoading] = useState(true);
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    setLoading(true);
    if(user){
        setAuth(true)
    }
    else{
        setAuth(false)
    }
    setLoading(false);
  }, [user]);

  return (
    <>
      {loading ? (
        <p>Loading</p>
      ) : (
        <Route
          {...rest}
          render={(props) =>
            auth ? <Redirect to='/' /> : <Component {...props} /> 
          }
        />
      )}
    </>
  );
};

export default UnAuth;
