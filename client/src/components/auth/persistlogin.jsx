import { Outlet, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import newAccessTokenAction from "../../redux/actions/newAccessToken.js";
import Barloader from "../ui/barloader.jsx";

const PersistLogin = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const newAccessToken = useSelector((state) => state.newAccessToken);

  useEffect(() => {
    if (!user?.accessToken) {
      dispatch(newAccessTokenAction());
    }
  }, [dispatch, user?.accessToken]);

  // useEffect(() => {
  //   const handleLoginRedirect = () => {
  //     if (newAccessToken?.errorMessage) {
  //       console.log(newAccessToken);
  //       navigate("/login");
  //     }
  //   };

  //   if (!user?.accessToken) {
  //     dispatch(newAccessTokenAction());
  //   } else {
  //     handleLoginRedirect();
  //   }
  // }, [dispatch, navigate, newAccessToken?.errorMessage, user?.accessToken]);

  return (
    <>
      {!user?.accessToken && <Navigate to="/login" />}
      <Barloader isLoading={newAccessToken?.isLoading} />
      {user?.accessToken && <Outlet />}
    </>
  );
};

export default PersistLogin;
