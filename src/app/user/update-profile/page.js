"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import female from "../../../../public/images/female.svg";
import Navbar from "../navbar";
import SideBar from "../sideBar";
import UserSidebar from "@/app/user2nd/userSidebar";
import UserNavbar from "@/app/user2nd/userNav";
import arrow from "../assets/arrow.svg";
import axios from "axios";
import { useSelector } from "react-redux";
import UserProtectedRoute from "@/config/userProtectedRoute";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/navigation";

const UserProfile = () => {
  const router = useRouter();
  const [studentDetail, setStudentDetail] = useState({});
  const { token } = useSelector((state) => state?.auth);
  const { _id } = useSelector((state) => state?.auth);
  const [userDetail, setUserDetail] = useState({
    firstname: "",
    mobile: "",
    email: "",
    // gender: "",
    // whatsappnumber: "",
    // state: [],
    // city: [],
  });

  useEffect(() => {
    defaultAUser();
  }, []);

  const defaultAUser = async () => {
    const options = {
      method: "GET",
      url: `http://localhost:4000/api/auth/getUserById/${_id}`,
      headers: {
        Accept: "application/json",
        authorization: token,
      },
    };
    axios
      .request(options)
      .then((response) => {
        setStudentDetail(response?.data?.user);
        console.log(response?.data?.user, "user");
      })
      .catch((error) => {
        console.log(error, "Error");
      });
  };

  const inputHandler = (e) => {
    setUserDetail({
      ...userDetail,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:4000/api/auth/edit-user/${_id}`,
        userDetail,
        {
          headers: {
            "Content-Type": "application/json",
            authorization: token,
          },
        }
      );

      if (response.status === 200) {
        // refreshData();
        toast.success("Update successfully!");
        router.push("/user2nd/profile");
      } else {
        console.log("Server error");
      }
    } catch (error) {
      console.log(error?.response?.data?.message || "Server error");
    }
  };
  return (
    // <>
    //   <section>
    //     <div className="flex">
    //       <SideBar />
    //       <div className="lg:w-11/12 w-full">
    //         <Navbar />

    //         <div>
    //           <div className="2xl:h-[58px] xl:h-[50px] lg:h-[45px] md:h-[40px] sm:h-[35px] h-[35px] text-[14px] bg-[#E7F4FD] flex items-center">
    //             <h1 className="montserrat-countinue 2xl:leading-[19.5px] 2xl:text-[16px]  2xl:p-10 pl-5">
    //               Parent’s Details<span className="text-[#E72027]">*</span>
    //             </h1>
    //           </div>
    //           <form className="md:flex 2xl:gap-20 xl:gap-10 gap-7 2xl:pl-10 pl-5 2xl:my-5">
    //             <div className="my-3">
    //               <label
    //                 htmlFor="email"
    //                 className="montserrat-lable block userprofileU "
    //               >
    //                 Name
    //               </label>
    //               <input
    //                 required
    //                 type="text"
    //                 id="Name"
    //                 name="Name"
    //                 className=" quicksand font-[600] text-[#979797]  px-6 xl:py-4  xl:my-1 2xl:my-1 userupdateInputs"
    //               />
    //             </div>
    //             <div className="my-3">
    //               <label
    //                 htmlFor="email"
    //                 className="montserrat-lable block userprofileU "
    //               >
    //                 Phone Number
    //               </label>
    //               <input
    //                 required
    //                 type="number"
    //                 id="Name"
    //                 name="Name"
    //                 className=" quicksand font-[600] text-[#979797] px-6 xl:py-4 xl:my-1 2xl:my-1 userupdateInputs"
    //               />
    //             </div>
    //             <div className="my-3">
    //               <label
    //                 htmlFor="email"
    //                 className="montserrat-lable block userprofileU "
    //               >
    //                 City
    //               </label>
    //               <input
    //                 required
    //                 type="text"
    //                 id="Name"
    //                 name="Name"
    //                 className=" quicksand font-[600] text-[#979797] px-6 xl:py-4 xl:my-1 2xl:my-1 outline-[#0071BC] userupdateInputs"
    //               />
    //             </div>
    //             <button
    //               type="submit"
    //               className="montserrat-btn mt-1 mb-5 md:my-7 lg:my-7 xl:my-8 userupdateBtn"
    //             >
    //               Save Changes
    //             </button>
    //           </form>
    //         </div>

    //         <div className=" 2xl:mt-40 xl:mt-20 lg:mt-12 md:mt-10">
    //           <div className="2xl:h-[58px] xl:h-[50px] lg:h-[45px] md:h-[40px] sm:h-[35px] h-[35px] text-[14px] bg-[#E7F4FD] flex items-center">
    //             <h1 className="montserrat-countinue 2xl:leading-[19.5px] 2xl:text-[16px]  2xl:p-10 pl-5">
    //               Student Details<span className="text-[#E72027]">*</span>
    //             </h1>
    //           </div>
    //           <form className="">
    //             <div className="md:flex 2xl:gap-20 xl:gap-10 gap-7 2xl:pl-10 pl-5 xl:mt-5 md:mt-3 ">
    //               <div className="my-3">
    //                 <label
    //                   htmlFor="email"
    //                   className="montserrat-lable block userprofileU "
    //                 >
    //                   Name
    //                 </label>
    //                 <input
    //                   required
    //                   type="text"
    //                   id="Name"
    //                   name="Name"
    //                   className=" quicksand font-[600] text-[#979797] px-6 xl:py-4 xl:my-1 2xl:my-1 outline-[#0071BC] userupdateInputs"
    //                 />
    //               </div>
    //               <div className="my-3">
    //                 <label
    //                   htmlFor="email"
    //                   className="montserrat-lable block userprofileU "
    //                 >
    //                   Email
    //                 </label>
    //                 <input
    //                   required
    //                   type="number"
    //                   id="Name"
    //                   name="Name"
    //                   className=" quicksand font-[600] text-[#979797] px-6 xl:py-4 xl:my-1 2xl:my-1 outline-[#0071BC] userupdateInputs"
    //                 />
    //               </div>
    //               <div className="my-3">
    //                 <label
    //                   htmlFor="email"
    //                   className="montserrat-lable block userprofileU "
    //                 >
    //                   Phone Number
    //                 </label>
    //                 <input
    //                   required
    //                   type="text"
    //                   id="Name"
    //                   name="Name"
    //                   className=" quicksand font-[600] text-[#979797] px-6 xl:py-4 xl:my-1 2xl:my-1 outline-[#0071BC] userupdateInputs"
    //                 />
    //               </div>
    //             </div>
    //             <div className="flex 2xl:gap-20 xl:gap-10 lg:gap-7 pl-5  2xl:my-5">
    //               <div>
    //                 <div className="flex gap-20 2xl:pl-5">
    //                   <div>
    //                     <div className="md:flex 2xl:gap-20 xl:gap-10 gap-7 my-3">
    //                       <div className="my-2 md:my-0">
    //                         <label
    //                           htmlFor="email"
    //                           className="montserrat-lable block userprofileU "
    //                         >
    //                           Gender
    //                         </label>
    //                         <div className="flex xl:w-[200px] 2xl:w-[286px]">
    //                           <button
    //                             id="states-button"
    //                             data-dropdown-toggle="dropdown-states"
    //                             className=" quicksand font-[600] text-[#979797] border rounded-full 2xl:h-[52px] w-[52px] xl:h-[35px] lg:h-[30px]  xl:my-1 2xl:my-1 outline-[#0071BC] 2xl:text-[16px] xl:text-[12px] lg:text-[10px] rounded-r-[0px]"
    //                             type="button"
    //                           >
    //                             <Image
    //                               src={female}
    //                               className="mx-auto lg:w-auto md:w-3"
    //                             />
    //                           </button>
    //                           <div
    //                             id="dropdown-states"
    //                             className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow"
    //                           >
    //                             <ul
    //                               className="py-2 text-sm text-gray-700 dark:text-gray-200"
    //                               aria-labelledby="states-button"
    //                             >
    //                               <li>
    //                                 <button
    //                                   type="button"
    //                                   className="inline-flex w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
    //                                 ></button>
    //                               </li>
    //                             </ul>
    //                           </div>
    //                           <label
    //                             htmlFor="states"
    //                             className="sr-only"
    //                           ></label>
    //                           <select
    //                             id="states"
    //                             className=" quicksand font-[600]  text-black border rounded-full px-6 xl:py-4  2xl:h-[52px] xl:h-[35px] l h-[30px] 2xl:w-full xl:my-1 2xl:my-1 outline-[#0071BC] 2xl:text-[16px] xl:text-[12px] text-[10px] rounded-l-[0px] xl:w-[200px] lg:w-[115px]  w-[120px]"
    //                           >
    //                             <option value="TX">Female</option>
    //                             <option value="CA">Male</option>
    //                           </select>
    //                         </div>
    //                       </div>

    //                       <div className="my-2 md:my-0">
    //                         <label
    //                           htmlFor="email"
    //                           className="montserrat-lable block text-black  userprofileU "
    //                         >
    //                           College Type
    //                         </label>
    //                         <select
    //                           id="states"
    //                           className=" quicksand font-[600] text-black border rounded-full px-6 xl:py-4  2xl:h-[52px] xl:h-[35px] h-[30px] xl:my-1 2xl:my-1 outline-[#0071BC] 2xl:text-[16px] xl:text-[12px] text-[10px] 2xl:w-[286px] xl:w-[200px] lg:w-[167px]  w-[170px]"
    //                         >
    //                           <option value="TX">Pvt</option>
    //                           <option value="TX">Government</option>
    //                         </select>
    //                       </div>

    //                       <div className="my-2 md:my-0">
    //                         <label
    //                           htmlFor="email"
    //                           className="montserrat-lable block userprofileU "
    //                         >
    //                           Course Type
    //                         </label>
    //                         <select
    //                           id="states"
    //                           className=" quicksand font-[600] text-black border rounded-full px-6 xl:py-4  2xl:h-[52px] xl:h-[35px] h-[30px] xl:my-1 2xl:my-1 outline-[#0071BC] 2xl:text-[16px] xl:text-[12px] text-[10px] 2xl:w-[286px] xl:w-[200px] lg:w-[167px]  w-[170px]"
    //                         >
    //                           <option value="TX">MD</option>
    //                           <option value="TX">HR</option>
    //                         </select>
    //                       </div>

    //                       <div>
    //                         <button
    //                           type="submit"
    //                           className=" montserrat-btn mt-2 mb-5 md:my-4 xl:my-6 userupdateBtn"
    //                         >
    //                           Save Changes
    //                         </button>
    //                       </div>
    //                     </div>
    //                   </div>
    //                 </div>
    //               </div>
    //             </div>
    //           </form>
    //         </div>
    //       </div>
    //     </div>
    //   </section>
    // </>
    <>
      <ToastContainer autoClose={1000} />
      <section>
        <div className="flex">
          <div className="">
            <UserSidebar />
          </div>
          <div className="w-full">
            <UserNavbar />

            <section className="flex">
              <div className="mx-auto">
                <div className="bg-[#F5F6FF] rounded-[10px] 2xl:w-[1345px] 2xl:h-[115px] xl:w-[900px] xl:h-[80px] lg:w-[650px] h-[60px] 2xl:mt-[30px] xl:mt-[20px] mt-[15px] flex justify-center items-center text-center">
                  <div>
                    <h1 className="updateUh1">Edit Profile</h1>
                    <p className="updateUpara">Edit your profile & password</p>
                  </div>
                </div>
                <div className="bg-[#F5F6FF] rounded-[10px] 2xl:w-[1345px] 2xl:h-[513px] xl:w-[900px] xl:h-[350px] lg:w-[650px] h-[280px] 2xl:mt-[30px] xl:mt-[20px] mt-[15px] 2xl:p-[55px] xl:p-[30px] p-[15px]">
                  <form onSubmit={handleUpdateUser}>
                    <div className="flex flex-wrap 2xl:gap-[30px] xl:gap-[20px] gap-[10px]">
                      <div className="">
                        <label className="userUlabel">Full Name</label> <br />
                        <input
                          defaultValue={
                            studentDetail?.firstname
                              ? studentDetail?.firstname
                              : userDetail?.firstname
                          }
                          type="text"
                          name="firstname"
                          className="userUinput"
                          placeholder="Enter Name"
                          required
                          maxLength={200}
                          onChange={inputHandler}
                        />
                      </div>
                      <div className="">
                        <label className="userUlabel">Last Name</label> <br />
                        <input
                          defaultValue={
                            studentDetail?.lastname
                              ? studentDetail?.lastname
                              : userDetail?.lastname
                          }
                          type="text"
                          name="lastname"
                          className="userUinput"
                          placeholder="Enter Name"
                          required
                          maxLength={200}
                          onChange={inputHandler}
                        />
                      </div>
                      <div className="">
                        <label className="userUlabel">Mobile Number*</label>{" "}
                        <br />
                        <input
                          defaultValue={
                            studentDetail?.mobile
                              ? studentDetail?.mobile
                              : userDetail?.mobile
                          }
                          type="text"
                          name="mobile"
                          className="userUinput"
                          placeholder="Enter Number"
                          required
                          maxLength={10}
                          onChange={inputHandler}
                          onKeyPress={(e) => {
                            // Allow only numbers
                            const onlyNumbers = /^[0-9\b]+$/;
                            if (!onlyNumbers.test(e.key)) {
                              e.preventDefault();
                            }
                          }}
                        />
                      </div>
                      <div className="">
                        <label className="userUlabel">Email id</label> <br />
                        <input
                          defaultValue={
                            studentDetail?.email
                              ? studentDetail?.email
                              : userDetail?.email
                          }
                          type="text"
                          name="email"
                          className="userUinput"
                          placeholder="Enter Email"
                          required
                          maxLength={200}
                          onChange={inputHandler}
                        />
                      </div>
                      <div className="">
                        <label className="userUlabel">Gender</label> <br />
                        <input
                          defaultValue={
                            studentDetail?.gender
                              ? studentDetail?.gender
                              : userDetail?.gender
                          }
                          type="text"
                          name="gender"
                          className="userUinput"
                          placeholder="Enter Gender"
                          // required
                          maxLength={200}
                          onChange={inputHandler}
                        />
                      </div>
                      <div className="">
                        <label className="userUlabel">Whatsapp Number</label>{" "}
                        <br />
                        <input
                          defaultValue={
                            studentDetail?.mobile
                              ? studentDetail?.mobile
                              : userDetail?.mobile
                          }
                          type="text"
                          name="whatsappnumber"
                          className="userUinput"
                          placeholder="Enter Whatsapp Number"
                          // required
                          maxLength={10}
                          onChange={inputHandler}
                          onKeyPress={(e) => {
                            // Allow only numbers
                            const onlyNumbers = /^[0-9\b]+$/;
                            if (!onlyNumbers.test(e.key)) {
                              e.preventDefault();
                            }
                          }}
                        />
                      </div>
                      <div className="">
                        <label className="userUlabel">Current State</label>{" "}
                        <br />
                        <div className="">
                          <select
                            id="states2"
                            className="userUinput"
                            // value={preference2}
                            // onChange={handlePreference2Change}
                          >
                            <option value=""> Select State</option>

                            <option className="">MP</option>

                            {/* <option value=""> Select State</option>
                          {getAllStates.map((item) => (
                            <option
                              key={item._id}
                              value={item._id}
                              className="pre_input"
                            >
                              {item.name}
                            </option>
                          ))} */}
                          </select>
                        </div>
                      </div>
                      <div className="">
                        <label className="userUlabel">Current District</label>{" "}
                        <br />
                        <div className="">
                          <select
                            id="states2"
                            className="userUinput"
                            // value={preference2}
                            // onChange={handlePreference2Change}
                          >
                            <option value=""> Select District</option>

                            <option className="">MP</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="2xl:mt-[65px] xl:mt-[40px] mt-[30px]">
                      <button type="submit" className=" userpboxbtn ">
                        Submit
                        <Image
                          src={arrow}
                          className="xl:w-[14px] xl:h-[10px] w-[10px] h-[8px]"
                        />
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </section>
          </div>
        </div>
      </section>
    </>
  );
};

export default UserProtectedRoute(UserProfile);
