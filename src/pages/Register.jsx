import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { NotificationManager } from "react-notifications";
import { BACKEND_URL } from "../config";

export default function Register() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRepassword] = useState("");
  const [wallet, setWallet] = useState("");
  const navigate = useNavigate();

  function ValidateWallet(walletStr) {
    if (/^0x[a-fA-F0-9]{40}$/.test(walletStr)) {
      return true;
    }
    return false;
  }

  const onClickSignUp = async () => {
    if (phone === "" || password === "" || repassword === "" || wallet === "") {
      NotificationManager.warning("Please fill all the inputs.");
    }
    if (ValidateWallet(wallet) !== true) {
      NotificationManager.warning("Please input vaild Metamask address.");
    }
    if (password !== repassword) {
      NotificationManager.error("Password should be equal with Re - password.");
    }
    //test phone, wallet

    await axios
      .post(
        `${BACKEND_URL}/api/user/register`,
        {
          name,
          phone,
          password,
          wallet,
        },
        {}
      )
      .then((response) => {
        if (response.data.code === 0) {
          NotificationManager.success("Successfully signed up.", "Success");
          navigate("/login");
          return;
        } else if (response.data.code === -2) {
          NotificationManager.error(
            "Phone number is duplicated. Please use another phone number.",
            "Error"
          );
        } else if (response.data.code === -3) {
          NotificationManager.error("Walle address is Invalid.", "Error");
        }
      })
      .catch((error) => {
        console.log(error);
        if (
          error &&
          error.response &&
          error.response.data &&
          error.response.data.message
        )
          NotificationManager.error(error.response.data.message, "Error");
        else NotificationManager.error("Internal Server Error", "Error");
      });
  };

  return (
    <div id="login_container">
      <div className="flex items-center justify-center w-full h-full">
        <div className="layer-12 mt-12 space-y-8 rounded-xl bg-primary-dark-800 bg-opacity-60 p-4 py-12 md:p-12">
          <div
            className="flex justify-center items-center"
            style={{ flexDirection: "column" }}
          >
            <img
              src="/images/icon.png"
              id="Layer_6"
              style={{ width: "5rem", height: "5rem" }}
            />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-300">
              Sign up to your account
            </h2>
          </div>
          <div className="z-0 mt-8 ">
            <div className="-space-y-px rounded-md shadow-sm ">
              <div className="flex justify-center">
                <label for="user-name" className="sr-only">
                  Name
                </label>
                <input
                  id="user-name"
                  name="user-name"
                  type="text"
                  autoComplete="user-name"
                  required=""
                  className="input-primary"
                  placeholder="User name"
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
              </div>
              <div className="flex justify-center">
                <label for="phone-number" className="sr-only">
                  Phone number
                </label>
                <input
                  id="phone-number"
                  name="phone-number"
                  type="text"
                  autoComplete="phone-number"
                  required=""
                  className="input-primary"
                  placeholder="Phone number"
                  onChange={(e) => {
                    setPhone(e.target.value);
                  }}
                />
              </div>
              <div className="flex justify-center">
                <label for="wallet_address" className="sr-only">
                  Wallet
                </label>
                <input
                  id="wallet_address"
                  name="wallet_address"
                  type="text"
                  autoComplete="wallet_address"
                  required=""
                  className="input-primary"
                  placeholder="0x4a7798fC47F729A39b61Fc8373573dBb0c62e264"
                  onChange={(e) => {
                    setWallet(e.target.value);
                  }}
                />
              </div>
              <div className="flex justify-center">
                <label for="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required=""
                  className="input-primary"
                  placeholder="Password"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </div>
              <div className="flex justify-center">
                <label for="confirmpassword" className="sr-only">
                  Repeat password
                </label>
                <input
                  id="repeat-password"
                  name="confirmpassword"
                  type="password"
                  required=""
                  className="input-primary"
                  placeholder="Repeat password"
                  onChange={(e) => {
                    setRepassword(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="mt-6 items-center">
              <div className="text-sm flex justify-center text-white">
                <a
                  className="font-medium text-primary-purple-100 hover:text-primary-purple-200"
                  href="/login"
                >
                  Already have an acccount? Sign in!
                </a>
              </div>
            </div>
            <div className="mt-6 text-white w-full flex justify-center">
              <button
                id="submit"
                className="btn-primary-purple group w-full"
                onClick={() => {
                  onClickSignUp();
                }}
              >
                <p className="grow">Sign up</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
