import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import React , {Fragment} from 'react'


const ProtectedRoute =  ({ isAdmin, element: Element, ...routeProps }) => {
  const { loading, isAuthenticated, user } =  useSelector((state) => state.user);
  
  if (!loading && isAuthenticated === false) {
    return <Navigate to="/login" />;
  }

  if (!loading && isAdmin === true && user?.role !== "admin") {
    return <Navigate to="/login" />;
  }

  return (
    <Fragment>
      {loading === false ? (
       <Element {...routeProps} />
      ) : null}
    </Fragment>
  );
};
export default ProtectedRoute;