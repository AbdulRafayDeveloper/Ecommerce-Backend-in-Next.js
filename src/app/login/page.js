"use client";
import React, { useState } from "react";
import Image from "next/image";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import KeyOutlinedIcon from "@mui/icons-material/KeyOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import Button from "@mui/material/Button";
import { Poppins } from "next/font/google";
import axios from "axios";
import { Toaster, toast } from "sonner";

const poppins = Poppins({
  weight: "200",
  subsets: ["latin"],
});

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [isSignUpMode, setIsSignUpMode] = useState(false);
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    return re.test(email);
  };
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    const { id, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const checkSubmission = async (e) => {
    e.preventDefault();
    setLoading(true);
    const isSignUp = formData.email !== "";

    if (!formData.username || !formData.password) {
      toast.error("Username and Password fields are required!");
      return;
    }

    const userData = {
      username: formData.username,
      password: formData.password,
      email: isSignUp ? formData.email : "", // Include email only for sign up
    };

    if (isSignUp && !validateEmail(formData.email)) {
      toast.error("Enter a valid email!");
      setLoading(false);
      return;
    }
    try {
      let response;
      if (isSignUp) {
        // Sign Up logic
        response = await axios.post("/api/signUp", userData);
      } else {
        // Login logic
        response = await axios.post("/api/login", userData);
      }

      console.log(response.data); // Debugging step to check the response

      if (response.data.status === 200) {
        if (isSignUp) {
          toast.success("Account created successfully!");
        } else {
          toast.success("Logged in successfully!");
          window.location.href = response.data.redirectUrl;
        }
        setFormData({
          username: "",
          email: "",
          password: "",
        });
      } else if (response.data.status === 400) {
        toast.error("Your request cannot be submitted. Try Again Later!");
      } else if (response.data.status === 408) {
        toast.error("Invalid password!");
      } else if (response.data.status === 409) {
        toast.warning("This Account Already Exists");
      } else {
        toast.error("An unexpected error occurred");
      }
    } catch (e) {
      console.log("Error", e);
      toast.error("Error!");
    }
    // Submission logic...
    try {
      setLoading(false); // End loading after submission is complete
    } catch (error) {
      console.error(error);
      setLoading(false); // Ensure loading is stopped even if there's an error
    }
  };
  const classes = {
    btn: {
      "&:hover": {
        border: "1px solid #342e37",
      },
    },
  };
  return (
    <div>
      <Toaster richColors position="top-center" />
      <div
        className={`container ${
          isSignUpMode
            ? "relative min-h-[100vh] overflow-hidden bg-[#edf6f9] sign-up-mode"
            : ""
        }`}
      >
        <div>
          <div className="signin-signup absolute top-[50%] left-[75%] w-[50%] grid">
            <form action="#" className="sign-in-form">
              <h2 className="title text-[2.2rem] text-[#006d77] mb-3 font-bold">
                {" "}
                Sign in
              </h2>
              <div className="input-field">
                <div className="person">
                  <PermIdentityOutlinedIcon />
                </div>
                <input
                  type="text"
                  placeholder="Username"
                  id="username"
                  className={poppins.className}
                  value={formData.username}
                  onChange={handleChange}
                  autoComplete="off"
                />
              </div>
              <div className="input-field">
                <div className="password">
                  <KeyOutlinedIcon />
                </div>
                <input
                  type="password"
                  id="password"
                  placeholder="Password"
                  className={poppins.className}
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
              <Button
                variant="contained"
                type="submit"
                style={{
                  margin: "10px 0",
                  borderRadius: "49px",
                  width: "150px",
                  height: "40px",
                  backgroundColor: "#006d77",
                  pointerEvents: loading ? "none" : undefined,
                }}
                id="sign-in-btn"
                onClick={checkSubmission}
                disabled={loading}
              >
                Login
              </Button>
              {loading}
              <p className="social-text mt-3 mb-3">
                Or Sign in with social platforms
              </p>
              <div className="social-media flex gap-2 flex-row text-center text-[1.1rem] mt-4">
                <a href="#" className="social-icons">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 488 512"
                    className="w-6 h-6"
                    fill="#006d77"
                  >
                    <path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z" />
                  </svg>
                </a>
                <a href="#" className="social-icons">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 320 512"
                    className="w-6 h-6"
                    fill="#006d77"
                  >
                    <path d="M80 299.3V512H196V299.3h86.5l18-97.8H196V166.9c0-51.7 20.3-71.5 72.7-71.5c16.3 0 29.4 .4 37 1.2V7.9C291.4 4 256.4 0 236.2 0C129.3 0 80 50.5 80 159.4v42.1H14v97.8H80z" />
                  </svg>
                </a>
                <a href="#" className="social-icons">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    className="w-6 h-6"
                    fill="#006d77"
                  >
                    <path d="M459.4 151.7c.3 4.5 .3 9.1 .3 13.6 0 138.7-105.6 298.6-298.6 298.6-59.5 0-114.7-17.2-161.1-47.1 8.4 1 16.6 1.3 25.3 1.3 49.1 0 94.2-16.6 130.3-44.8-46.1-1-84.8-31.2-98.1-72.8 6.5 1 13 1.6 19.8 1.6 9.4 0 18.8-1.3 27.6-3.6-48.1-9.7-84.1-52-84.1-103v-1.3c14 7.8 30.2 12.7 47.4 13.3-28.3-18.8-46.8-51-46.8-87.4 0-19.5 5.2-37.4 14.3-53 51.7 63.7 129.3 105.3 216.4 109.8-1.6-7.8-2.6-15.9-2.6-24 0-57.8 46.8-104.9 104.9-104.9 30.2 0 57.5 12.7 76.7 33.1 23.7-4.5 46.5-13.3 66.6-25.3-7.8 24.4-24.4 44.8-46.1 57.8 21.1-2.3 41.6-8.1 60.4-16.2-14.3 20.8-32.2 39.3-52.6 54.3z" />
                  </svg>
                </a>
                <a href="#" className="social-icons">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                    className="w-6 h-6"
                    fill="#006d77"
                  >
                    <path d="M100.3 448H7.4V148.9h92.9zM53.8 108.1C24.1 108.1 0 83.5 0 53.8a53.8 53.8 0 0 1 107.6 0c0 29.7-24.1 54.3-53.8 54.3zM447.9 448h-92.7V302.4c0-34.7-.7-79.2-48.3-79.2-48.3 0-55.7 37.7-55.7 76.7V448h-92.8V148.9h89.1v40.8h1.3c12.4-23.5 42.7-48.3 87.9-48.3 94 0 111.3 61.9 111.3 142.3V448z" />
                  </svg>
                </a>
              </div>
            </form>

            {/* Sign Up */}
            <form action="#" className="sign-up-form">
              <h2 className="title text-[2.2rem] text-[#006d77] mb-3 font-bold">
                {" "}
                Sign Up
              </h2>
              <div className="input-field">
                <div className="person">
                  <PermIdentityOutlinedIcon />
                </div>
                <input
                  type="text"
                  placeholder="Username"
                  id="username"
                  className={poppins.className}
                  value={formData.username}
                  onChange={handleChange}
                  autoComplete="off"
                />
              </div>
              <div className="input-field">
                <div className="email">
                  <EmailOutlinedIcon />
                </div>
                <input
                  type="email"
                  id="email"
                  placeholder="Email Address"
                  className={poppins.className}
                  value={formData.email}
                  onChange={handleChange}
                  autoComplete="off"
                />
              </div>
              <div className="input-field">
                <div className="password">
                  <KeyOutlinedIcon />
                </div>
                <input
                  type="password"
                  id="password"
                  placeholder="Password"
                  className={poppins.className}
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
              <Button
                variant="contained"
                style={{
                  margin: "10px 0",
                  borderRadius: "49px",
                  width: "150px",
                  height: "40px",
                  backgroundColor: "#006d77",
                  pointerEvents: loading ? "none" : undefined,
                }}
                id="sign-up-btn"
                type="submit"
                onClick={checkSubmission}
              >
                Sign Up
              </Button>
              {loading}
              <p className="social-text mt-3 mb-3">
                Or Sign in with social platforms
              </p>
              <div className="social-media flex gap-2 flex-row text-center text-[1.1rem] mt-4">
                <a href="#" className="social-icons">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 488 512"
                    className="w-6 h-6"
                    fill="#006d77"
                  >
                    <path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z" />
                  </svg>
                </a>
                <a href="#" className="social-icons">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 320 512"
                    className="w-6 h-6"
                    fill="#006d77"
                  >
                    <path d="M80 299.3V512H196V299.3h86.5l18-97.8H196V166.9c0-51.7 20.3-71.5 72.7-71.5c16.3 0 29.4 .4 37 1.2V7.9C291.4 4 256.4 0 236.2 0C129.3 0 80 50.5 80 159.4v42.1H14v97.8H80z" />
                  </svg>
                </a>
                <a href="#" className="social-icons">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    className="w-6 h-6"
                    fill="#006d77"
                  >
                    <path d="M459.4 151.7c.3 4.5 .3 9.1 .3 13.6 0 138.7-105.6 298.6-298.6 298.6-59.5 0-114.7-17.2-161.1-47.1 8.4 1 16.6 1.3 25.3 1.3 49.1 0 94.2-16.6 130.3-44.8-46.1-1-84.8-31.2-98.1-72.8 6.5 1 13 1.6 19.8 1.6 9.4 0 18.8-1.3 27.6-3.6-48.1-9.7-84.1-52-84.1-103v-1.3c14 7.8 30.2 12.7 47.4 13.3-28.3-18.8-46.8-51-46.8-87.4 0-19.5 5.2-37.4 14.3-53 51.7 63.7 129.3 105.3 216.4 109.8-1.6-7.8-2.6-15.9-2.6-24 0-57.8 46.8-104.9 104.9-104.9 30.2 0 57.5 12.7 76.7 33.1 23.7-4.5 46.5-13.3 66.6-25.3-7.8 24.4-24.4 44.8-46.1 57.8 21.1-2.3 41.6-8.1 60.4-16.2-14.3 20.8-32.2 39.3-52.6 54.3z" />
                  </svg>
                </a>
                <a href="#" className="social-icons">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                    className="w-6 h-6"
                    fill="#006d77"
                  >
                    <path d="M100.3 448H7.4V148.9h92.9zM53.8 108.1C24.1 108.1 0 83.5 0 53.8a53.8 53.8 0 0 1 107.6 0c0 29.7-24.1 54.3-53.8 54.3zM447.9 448h-92.7V302.4c0-34.7-.7-79.2-48.3-79.2-48.3 0-55.7 37.7-55.7 76.7V448h-92.8V148.9h89.1v40.8h1.3c12.4-23.5 42.7-48.3 87.9-48.3 94 0 111.3 61.9 111.3 142.3V448z" />
                  </svg>
                </a>
              </div>
            </form>
          </div>
        </div>

        <div className="panel-container absolute grid w-[100%] h-[100%] top-0 left-0 grid-cols-2">
          <div className="panel left-panel">
            <div
              className="content text-[#edf6f9]"
              style={{ transform: ".9s .6s ease-in-out" }}
            >
              <h3 className="font-semibold leading-4 text-2xl">New Here?</h3>
              <p className="text-sm" style={{ padding: "0.7rem 0" }}>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Explicabo est odio sint quaerat labore nam?
              </p>
              <Button
                variant="outlined"
                className="text-white border border-white w-32 h-10 text-sm font-bold rounded-3xl mb-5"
                id="sign-up-btn"
                onClick={() => setIsSignUpMode(!isSignUpMode)}
                sx={classes.btn}
              >
                Sign Up
              </Button>
            </div>
            <Image
              src={"/images/pro.svg"}
              width={500}
              height={500}
              alt="Login"
              className="image"
              priority
            ></Image>
          </div>

          <div className="panel right-panel">
            <div className="content text-[#edf6f9]">
              <h3 className="font-semibold leading-4 text-2xl">One of Us</h3>
              <p className="text-sm" style={{ padding: "0.7rem 0" }}>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Explicabo est odio sint quaerat labore nam?
              </p>
              <Button
                variant="outlined"
                className="text-white border border-white w-32 h-10 text-sm font-bold rounded-3xl mb-5"
                id="sign-in-btn"
                sx={classes.btn}
                onClick={() => setIsSignUpMode(!isSignUpMode)}
              >
                Sign in
              </Button>
            </div>
            <Image
              src={"/images/sign.svg"}
              width={500}
              height={500}
              alt="Login"
              className="image"
            ></Image>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
