"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { removeToken } from "@/redux/adminSlice/authSlice";
import Loader from "@/app/component/loader";

const protectedRoute = (WrappedComponent) => {
  const Wrapper = (props) => {
    const router = useRouter();
    const dispatch = useDispatch();
    const adminAuthToken = useSelector((state) => state.auth?.token);
    const [isLoading, setIsLoading] = useState(false);
    const [isAuth, setIsAuth] = useState(false);

    useEffect(() => {
      const checkAuth = () => {
        if (!adminAuthToken) {
          router.push("/admin-login");
        }
        if (adminAuthToken) {
          verify();
        }
      };

      checkAuth();
    }, [adminAuthToken, router]);

    const verify = async () => {
      setIsLoading(true);
      setIsAuth(false);
      try {
        const res = await axios.get(
          `https://counselling-backend.vercel.app/api/auth/verifyAdminToken/${adminAuthToken}`
        );
        if (res?.data?.data === null) {
          router.push("/admin-login ");
          dispatch(removeToken());
        }
        if (res.status === 200) {
          setIsAuth(true);
          setIsLoading(false);
          return;
        } else {
          dispatch(removeToken());
          router.push("/admin-login");
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error occurred:", error);
        router.push("/admin-login");
        setIsLoading(false);
      }
    };

    return (
      <>
        {isLoading ? (
          <Loader />
        ) : adminAuthToken && isAuth ? (
          <WrappedComponent {...props} />
        ) : null}
      </>
    );
  };
  return Wrapper;
};

export default protectedRoute;
