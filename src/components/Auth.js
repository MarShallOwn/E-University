import React, { useEffect, useState } from "react";
import { Redirect, Route, useLocation } from "react-router-dom";
import { useUser } from "../contexts/UserProvider";

const Auth = ({ component: Component, ...rest }) => {
  const user = useUser();

  const location = useLocation();

  //alert(location.pathname)

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
            auth ? <Component {...props} /> : <Redirect to={{
                pathname: '/login',
                search: `?next=${location.pathname}`
            }} />
          }
        />
      )}
    </>
  );
};

export default Auth;
