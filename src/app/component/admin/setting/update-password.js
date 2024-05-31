import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import Loader from "../../loader";
import { useSelector } from "react-redux";
import config from "@/config";

const ChangePassword = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
  });
  const [cnfmPassword, setCnfmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isError, setError] = useState("");
  const [isLoader, setLoader] = useState(false);
  const { token } = useSelector((state) => state?.auth);

  const togglePasswordVisibility = (passwordType) => {
    if (passwordType === "password") {
      setShowPassword(!showPassword);
    } else if (passwordType === "newPassword") {
      setShowNewPassword(!showNewPassword);
    } else if (passwordType === "confirmPassword") {
      setShowConfirmPassword(!showConfirmPassword);
    }
  };

  const InputHandler = (e) => {
    setError("");
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { oldPassword, newPassword } = formData;

    if (oldPassword === newPassword) {
      setError("Old password and new password can't be the same");
    } else if (newPassword !== cnfmPassword) {
      setError("New password and confirm password should match");
    } else {
      try {
        setLoader(true);
        const res = await axios.post(`${config.baseURL}/api/auth/updatePassword`, formData, {
          headers: {
            "Content-Type": "application/json",
            authorization: token,
          },
        });
        if (res.status === 200) {
          setFormData({
            oldPassword: "",
            newPassword: "",
          });
          setCnfmPassword("");
          setError("");
          toast.success("Password changed successfully!");
          signoutFunc();
        } else if (res.status === 203) {
          setError(res?.data?.message);
          setLoader(false);
          return;
        }
      } catch (error) {
        setError("Password change failed!");
        toast.error("Server error");
      } finally {
        setLoader(false);
      }
    }
  };

  const signoutFunc = () => {
    handleSignout();
  };
  return (
    <>
      {isLoader && <Loader />}

      <ToastContainer autoClose={1000} />
      <div className="flex items-center justify-center">
        <div className="md:px-[50px] w-full mx-auto">
          <div className="relative flex flex-col 2xl:gap-x-20 xl:gap-x-10 gap-x-7 justify-center lg:shadow-none  items-center lg:flex-row space-y-8 md:space-y-0 w-[100%] px-[10px]bg-white lg:px-[40px] py-[20px]  ">
            <div className="w-[100%] lg:w-[60%] xl:w-[50%]">
              <form action="" className="" onSubmit={handleSubmit}>
                <div className="flex flex-col gap-4 justify-center md:max-w-[80%] lg:w-full lg:max-w-[100%] mx-auto px-4">
                  <div className="text-left ">
                    <p className="mb-2 custom_heading_text leading-[38px] md:font-bold font-medium whitespace-nowrap">
                      Change password
                    </p>
                  </div>
                  <div className="relative flex justify-center items-center ">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="oldPassword"
                      placeholder="Old password"
                      className="p-2 2xl:p-3 rounded-[10px] border placeholder:text-[gray] w-full custom-input "
                      onChange={InputHandler}
                      minLength={8}
                      required
                    />
                    <div
                      className="absolute right-[10px] cursor-pointer"
                      onClick={() => togglePasswordVisibility("password")}
                    >
                      {showPassword ? "Show" : "Hide"}
                    </div>
                  </div>
                  <div className="relative flex justify-center items-center">
                    <input
                      type={showNewPassword ? "text" : "password"}
                      name="newPassword"
                      placeholder="New password"
                      className="p-2 2xl:p-3 rounded-[10px] border placeholder:text-[gray] w-full mt-2 custom-input"
                      onChange={InputHandler}
                      minLength={8}
                      required
                    />
                    <div
                      className="absolute right-[10px] cursor-pointer"
                      onClick={() => togglePasswordVisibility("newPassword")}
                    >
                      {showNewPassword ? "Show" : "Hide"}
                    </div>
                  </div>
                  <div className="relative flex justify-center items-center">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm new password "
                      className="p-2 2xl:p-3 rounded-[10px] border placeholder:text-[gray] w-full mt-2 custom-input"
                      onChange={(e) => setCnfmPassword(e.target.value)}
                      minLength={8}
                      required
                    />
                    <div
                      className="absolute right-[10px] cursor-pointer"
                      onClick={() =>
                        togglePasswordVisibility("confirmPassword")
                      }
                    >
                      {showConfirmPassword ? "Show" : "Hide"}
                    </div>
                  </div>
                  {isError && (
                    <p className="text-[red] mt-2 px-2 text-[14px] lg:text-[13px] font-normal bg-[#f0e3e3] py-1 rounded-[4px]">
                      {isError}
                    </p>
                  )}
                  <div className="mt-4">
                    <button
                      type="submit"
                      disabled={isLoader}
                      className="w-full bg-[#1f2432] font-medium text-[15px] text-white rounded-lg hover:border hover:border-black lg:h-[50px] h-[40px] hover:bg-[#fff] hover:text-black"
                    >
                      {isLoader ? "Loading.." : "Change password"}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChangePassword;
