import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Web3 from "web3";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { NotificationManager } from "react-notifications";
import Web3Modal from "web3modal";
import axios from "axios";
import {
  PLATFORM_CONTRACT_ADDRESS,
  BACKEND_URL,
  GOERLI_RPC_URL,
  GOERLI_CHAIN_ID,
  CHAINS,
} from "../config";
import {
  setCurrentUserAction,
  updateAwardAmount,
  updateCurrentDeposited,
  updateReferalCounts,
} from "../store/actions/auth.actions";
import isEmpty from "../validation/isEmpty";
const platformABI = require("../assets/abi/platform.json");

export default function SideBar() {
  const user = useSelector((state) => state.auth.user);
  const chainId = useSelector((state) => state.auth.currentChainId);
  const account = useSelector((state) => state.auth.currentWallet);
  const globalWeb3 = useSelector((state) => state.auth.globalWeb3);
  const awardAmount = useSelector((state) => state.auth.awardAmount);
  const referredCounts = useSelector((state) => state.auth.referralCounts);
  const currentDeposited = useSelector((state) => state.auth.currentDeposited);
  const dispatch = useDispatch();

  const [menu, setMenu] = useState(false);
  const [tab, setTab] = useState("name");
  const [isCopied, setIsCopied] = React.useState(false);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [newWallet, setNewWallet] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newRePassword, setNewRePassword] = useState("");
  const [depositAmount, setDepositAmount] = useState(0);

  const onCopyText = () => {
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 1000);
  };

  useEffect(() => {
    let interval = setInterval(() => {
      getClaimInfo();
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    getClaimInfo();
  }, [account]);

  const getClaimInfo = async () => {
    let defaultWeb3 = new Web3(GOERLI_RPC_URL);
    if (defaultWeb3 && defaultWeb3.utils.isAddress(account)) {
      const factory = new defaultWeb3.eth.Contract(
        platformABI,
        PLATFORM_CONTRACT_ADDRESS
      );
      if (factory) {
        try {
          let claimable =
            (await factory.methods.getClaimableInformation(account).call()) ||
            0;
          let gpamount = defaultWeb3.utils.fromWei(
            claimable[0].toString(),
            "ether"
          );
          dispatch(updateAwardAmount(gpamount));
          let refCounts = claimable[1] || 0;
          dispatch(updateReferalCounts(refCounts));
          let depositedAm = defaultWeb3.utils.fromWei(
            claimable[3].toString(),
            "ether"
          );
          dispatch(updateCurrentDeposited(depositedAm));
        } catch (e) {
          console.log(e);
        }
      }
    }
  };

  useEffect(() => {
    getClaimInfo();
  }, [account, globalWeb3, chainId]);

  useEffect(() => {
    fillInputsWithUserProfile(user);
  }, [user]);

  const fillInputsWithUserProfile = (profile) => {
    setNewName(profile?.name || "");
    setNewPhone(profile?.phone || "");
    setNewWallet(profile?.wallet || "");
    setPassword("");
    setNewPassword("");
    setNewRePassword("");
  };

  const onClickWithDraw = async () => {
    if (account && chainId && globalWeb3) {
      if (currentDeposited <= 0) {
        NotificationManager.warning("You have no funds on our game.");
        return;
      }
      const factory = new globalWeb3.eth.Contract(
        platformABI,
        PLATFORM_CONTRACT_ADDRESS
      );
      if (factory) {
        try {
          await factory.methods.withDrawPlayerFunds().send({
            from: account,
          });
          getClaimInfo();
        } catch (err) {
          console.log(err);
          if (err.code && err.code === 4100)
            NotificationManager.warning(
              "Please unlock your wallet and try again."
            );
        }
      }
    } else {
      NotificationManager.warning("Please connect your wallet.");
    }
  };

  const onClickClaim = async () => {
    if (awardAmount > 0) {
    } else return;
    if (account && chainId && globalWeb3) {
      const factory = new globalWeb3.eth.Contract(
        platformABI,
        PLATFORM_CONTRACT_ADDRESS
      );
      if (factory) {
        try {
          await factory.methods.claimReferralAwards(account).send({
            from: account,
          });
          getClaimInfo();
        } catch (err) {
          console.log(err);
          if (err.code && err.code === 4100)
            NotificationManager.warning(
              "Please unlock your wallet and try again."
            );
        }
      }
    } else {
      NotificationManager.warning("Please connect your wallet.");
    }
  };

  const getUserProfileFromDB = async () => {
    await axios
      .post(
        `${BACKEND_URL}/api/user/getOne`,
        {
          _id: user._id,
        },
        {}
      )
      .then((response) => {
        if (response.data.code === 0) {
          console.log(response.data.data);
          dispatch(setCurrentUserAction(response.data.data));
          return;
        } else if (response.data.code === -1) {
          console.log(response.data.message);
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
        else
          NotificationManager.error(
            "Please check connection with server",
            "Error"
          );
      });
  };

  function ValidateWallet(walletStr) {
    if (/^0x[a-fA-F0-9]{40}$/.test(walletStr)) {
      return true;
    }
    return false;
  }

  const updateUserProfileOnDB = async (fieldName) => {
    var updateObj = {};
    switch (fieldName) {
      case "name":
        if (isEmpty(newName) === false) updateObj.name = newName;
        else {
          NotificationManager.warning("Please fill the input.");
        }
        break;
      case "phone":
        if (isEmpty(newPhone) === false) updateObj.phone = newPhone;
        else {
          NotificationManager.warning("Please fill the input.");
        }
        break;
      case "password":
        if (isEmpty(newPassword) === false && isEmpty(password) === false) {
          if (newPassword === newRePassword) {
            updateObj.newPassword = newPassword;
            updateObj.password = password;
          } else {
            NotificationManager.warning(
              "New password should be equal with Re - new password."
            );
            return;
          }
        } else {
          NotificationManager.warning("Please fill all the inputs.");
        }
        break;
      case "wallet":
        if (isEmpty(newWallet) === false) {
          if (ValidateWallet(newWallet) === true) updateObj.wallet = newWallet;
          else {
            NotificationManager.warning("Please input valid wallet address.");
            return;
          }
        } else {
          NotificationManager.warning("Please fill the input.");
        }
        break;
      default:
        break;
    }
    if (user && user._id) updateObj._id = user._id;
    else return;

    await axios
      .post(`${BACKEND_URL}/api/user/update`, updateObj, {
        header: {
          "x-access-token": localStorage.getItem("jwtToken"),
        },
      })
      .then(async (response) => {
        if (response.data.code === 0) {
          NotificationManager.success("Successfully updated.", "Success");
          await getUserProfileFromDB();
        } else if (response.data.code === -2) {
          NotificationManager.error(
            "Phone number is duplicated. Please use another phone number.",
            "Error"
          );
        } else if (response.data.code === -4) {
          NotificationManager.error("Current password is incorrect.", "Error");
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
        else
          NotificationManager.error(
            "Please check connection to server",
            "Error"
          );
      });
  };

  const setConnectedWalletToNew = async () => {
    setNewWallet(account);
  };

  const onDeposit = async () => {
    let gameContract;
    try {
      gameContract = new globalWeb3.eth.Contract(
        platformABI,
        PLATFORM_CONTRACT_ADDRESS
      );
    } catch (error) {
      console.log(error);
      return {
        success: false,
        value: 0,
        message: "Contract instance creation is failed",
      };
    }
    try {
      let payingAmount = globalWeb3.utils.toWei(
        depositAmount.toString(),
        "ether"
      );
      let funcTrx = gameContract.methods.depositFunds();
      await funcTrx.estimateGas({
        from: account,
        value: payingAmount,
      });
      await funcTrx.send({
        from: account,
        value: payingAmount,
      });

      setTimeout(() => {
        getClaimInfo();
      }, 5000);
      return {
        success: true,
        value: [],
      };
    } catch (err) {
      return {
        success: false,
        message: err,
      };
    }
  };

  const dsWalletAddChain = async (chainInfo) => {
    try {
      await window.ethereum.request({
        method: "wallet_addEthereumChain",
        params: [chainInfo],
      });
    } catch (addError) {
      throw addError;
    }
  };

  const switchWalletToANetwork = async (numChainId) => {
    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0x" + numChainId.toString(16) }],
      });
      await window.ethereum.request({ method: "eth_requestAccounts" });
      return true;
    } catch (error) {
      if (error.code === 4902) {
        await dsWalletAddChain(CHAINS[numChainId]);
        console.log("[HEAL] dsWalletAddChain ...");
        await window.ethereum.request({ method: "eth_requestAccounts" });
        console.log("[HEAL] Changing net ...");
      } else {
        throw error;
      }
    }
  };

  const onClickDeposit = async () => {
    if (depositAmount <= 0) return;
    if (account && chainId && globalWeb3) {
    } else {
      NotificationManager.warning("Please connect your wallet and try again.");
      return;
    }
    if (account !== user?.wallet) {
      NotificationManager.warning(
        "Please try again with registered wallet account."
      );
      return;
    }
    if (chainId !== GOERLI_CHAIN_ID) {
      switchWalletToANetwork(GOERLI_CHAIN_ID);
    }
    try {
      let result = await onDeposit();
      if (result.success === false) {
        NotificationManager.error(result.message, "Fail", 10000, () => {});
      }
      if (result.success === true) {
        NotificationManager.success(
          "Deposit succeed !!.",
          "Information",
          5000,
          () => {
            getClaimInfo();
          }
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="fixed bottom-0 left-0 z-50 w-full h-12 px-4 bg-black sidebar md:w-24 md:h-full md:px-0">
        <div className="flex flex-row justify-between w-full h-full mt-2 md:flex-col md:justify-start">
          <div
            id="logo"
            className="mb-3 h-20 w-[6.4rem] pt-2 hidden md:flex justify-center items-center pl-2 z-50 bg-black"
          >
            <img src="/images/icon.png" alt="icon" className="w-16" />
          </div>
          <div className="relative block drop-shadow-neon-green-sm md:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              role="presentation"
              focusable="false"
              aria-hidden="true"
              className="fill-primary-green-100 drop-shadow-green-md h-7 w-7"
            >
              <path
                fillRule="evenodd"
                d="M7 2a5 5 0 00-5 5v10a5 5 0 005 5h10a5 5 0 005-5V7a5 5 0 00-5-5H7zm13 10V7a3 3 0 00-3-3H7a3 3 0 00-3 3v8h1.441l1.495-2.429A1.2 1.2 0 017.958 12h3.402l2.333-5.055a1.2 1.2 0 012.147-.066L18.597 12H20zM4 17h1.888a1.2 1.2 0 001.022-.571L8.405 14h3.467a1.2 1.2 0 001.09-.697l1.876-4.066 2.225 4.132a1.2 1.2 0 001.056.631H20v3a3 3 0 01-3 3H7a3 3 0 01-3-3z"
                clipRule="evenodd"
              ></path>
            </svg>
          </div>
          <div
            id="Profile"
            className="flex flex-col items-center h-12 transition-all duration-100 rounded-md cursor-pointer select-none group md:m-1 md:mt-2 md:h-20 md:py-2 hover:bg-primary-dark-600"
            onClick={() => {
              setMenu("profile");
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              aria-hidden="true"
              className="transition-all duration-100 md:h-12 md:w-12 h-7 w-7 stroke-primary-dark-300 group-hover:stroke-gray-300"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              ></path>
            </svg>
            <div className="hidden mt-2 text-primary-dark-100 group-hover:text-gray-300 md:block">
              Profile
            </div>
          </div>
          <div
            id="Finance"
            className="flex flex-col items-center h-20 transition-all duration-100 rounded-md cursor-pointer select-none group md:m-1 md:mt-2 md:py-2 hover:bg-primary-dark-600"
            onClick={() => {
              setMenu("deposit");
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="transition-all duration-100 md:h-12 md:w-12 h-7 w-7 fill-primary-dark-300 group-hover:fill-gray-300"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M17 4.775a1 1 0 00-1.316-.949L9.162 6H17V4.775zM19 6V4.775a3 3 0 00-3.949-2.846l-11 3.666A3 3 0 002 8.442V17a3 3 0 003 3h14a3 3 0 003-3V9a3 3 0 00-3-3zM5 8a1 1 0 00-1 1v8a1 1 0 001 1h14a1 1 0 001-1V9a1 1 0 00-1-1H5z"
              ></path>
              <path d="M16 13a1 1 0 111.998 0A1 1 0 0116 13z"></path>
            </svg>
            <div className="hidden mt-2 text-primary-dark-100 group-hover:text-gray-300 md:block">
              Financial
            </div>
          </div>
          {/* <div id="Support" className="flex flex-col items-center h-12 transition-all duration-100 rounded-md cursor-pointer select-none group md:m-1 md:mt-2 md:h-20 md:py-2 hover:bg-primary-dark-600">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"strokeWidth="2" stroke="currentColor" aria-hidden="true" className="transition-all duration-100 md:h-12 md:w-12 h-7 w-7 stroke-primary-dark-300 group-hover:stroke-gray-300">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z">
                                </path>
                            </svg>
                        <div className="hidden mt-2 text-primary-dark-100 group-hover:text-gray-300 md:block">Support</div>
                    </div> */}
        </div>
      </div>
      {menu === "profile" ? (
        <>
          <div className="profile-menu-content bg-black md:ml-24 fixed sm:w-96 w-80 h-full px-2.5 top-0 left-0 z-50 overflow-y-auto">
            <div className="sticky top-0 flex justify-between py-6 bg-black">
              <h2 className="text-2xl font-semibold text-white">
                Profile and settings
              </h2>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                aria-hidden="true"
                className="w-10 h-10 text-white"
                onClick={() => {
                  setMenu(false);
                }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </div>
            <div className="pt-20 pb-10 profile-main">
              <h4 className="font-semibold text-white">
                Give a friend your referral code and you'll get ETHs as rewards!
              </h4>
              <div className="block mt-4 ">
                <CopyToClipboard
                  text={`${window.location.origin}/?ref=${
                    user?.wallet || account
                  }`}
                  onCopy={onCopyText}
                >
                  <button className="inline-block w-auto px-4 py-3 font-semibold text-center text-white uppercase rounded-md bg-primaryGreen">
                    Copy Referral link
                  </button>
                </CopyToClipboard>
              </div>
            </div>

            <div className="flex flex-col items-center justify-between mt-1 mb-10 space-y-3 sm:space-y-0 sm:flex-row">
              <div className="flex items-center space-x-3">
                <div className="dark:bg-[#9797972B] bg-[#0F1B2E] flex flex-col items-center rounded-lg py-2 px-4">
                  <h2 className="text-[#09C9E3] text-lg font-bold">
                    {referredCounts}
                  </h2>
                  <p className="text-[#DADADA] font-normal text-sm">
                    Active Referrals
                  </p>
                </div>

                <div className="dark:bg-[#9797972B] bg-[#0F1B2E] flex flex-col items-center rounded-lg py-2 px-4">
                  <h2 className="text-[#EDD604] text-lg font-bold">
                    {awardAmount} ETH
                  </h2>
                  <p className="text-[#DADADA] font-normal text-sm">
                    Active Awards
                  </p>
                </div>
              </div>
              <button
                className="border-2 border-lightGreen rounded-xl text-[#fff] text-lg px-2 py-4"
                onClick={() => {
                  onClickClaim();
                }}
              >
                Promotion withdraw
              </button>
            </div>

            <div
              className="flex p-1 space-x-1 rounded-xl bg-primary-dark-600"
              role="tablist"
              aria-orientation="horizontal"
            >
              <button
                className={
                  tab === "name"
                    ? "w-full rounded-lg py-2.5 px-1 text-sm font-medium leading-5 text-gray-300 bg-primary-dark-500 shadow"
                    : "w-full rounded-lg py-2.5 px-1 text-sm font-medium leading-5 text-gray-300 shadow"
                }
                id="headlessui-tabs-tab-27"
                role="tab"
                type="button"
                aria-selected="true"
                tabIndex="0"
                aria-controls="headlessui-tabs-panel-30"
                onClick={() => {
                  setTab("name");
                }}
              >
                Name
              </button>
              <button
                className={
                  tab === "email"
                    ? "w-full rounded-lg py-2.5 px-1 text-sm font-medium leading-5 text-gray-300 bg-primary-dark-500 shadow"
                    : "w-full rounded-lg py-2.5 px-1 text-sm font-medium leading-5 text-gray-300 shadow"
                }
                id="headlessui-tabs-tab-28"
                role="tab"
                type="button"
                aria-selected="false"
                tabIndex="-1"
                onClick={() => {
                  setTab("email");
                }}
              >
                Phone
              </button>
              <button
                className={
                  tab === "wallet"
                    ? "w-full rounded-lg py-2.5 px-1 text-sm font-medium leading-5 text-gray-300 bg-primary-dark-500 shadow"
                    : "w-full rounded-lg py-2.5 px-1 text-sm font-medium leading-5 text-gray-300 shadow"
                }
                role="tab"
                type="button"
                aria-selected="false"
                tabIndex="-1"
                onClick={() => {
                  setTab("wallet");
                }}
              >
                Wallet
              </button>
              <button
                className={
                  tab === "password"
                    ? "w-full rounded-lg py-2.5 px-1 text-sm font-medium leading-5 text-gray-300 bg-primary-dark-500 shadow"
                    : "w-full rounded-lg py-2.5 px-1 text-sm font-medium leading-5 text-gray-300 shadow"
                }
                role="tab"
                type="button"
                aria-selected="false"
                tabIndex="-1"
                onClick={() => {
                  setTab("password");
                }}
              >
                Password
              </button>
            </div>
            <div className="mt-3 tab-content">
              {tab === "name" ? (
                <>
                  <div className="name">
                    <div className="flex flex-col mt-7">
                      <div className="flex flex-col content-center justify-center gap-2">
                        <label className="text-xl font-semibold text-gray-200">
                          Enter your name
                        </label>
                        <input
                          type="text"
                          name="name"
                          className="w-full px-3 py-2 mb-3 text-black border-2 rounded-md border-slate-800 bg-primary-dark-600 focus:drop-shadow-green-sm focus:outline-none focus:shadow-none focus:border-lightGreen"
                          placeholder="Enter your name"
                          value={newName}
                          onChange={(e) => {
                            setNewName(e.target.value);
                          }}
                        />
                        <button
                          className="w-full h-12 text-sm text-white uppercase border-2 border-lightGreen rounded-xl"
                          onClick={() => {
                            updateUserProfileOnDB("name");
                          }}
                        >
                          SAVE
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                ""
              )}
              {tab === "email" ? (
                <>
                  <div className="email">
                    <div className="flex flex-col mt-7">
                      <div className="flex flex-col content-center justify-center gap-2">
                        <label className="text-xl font-semibold text-gray-200">
                          Change your phone number
                        </label>
                        <input
                          type="text"
                          name="phone"
                          className="w-full px-3 py-2 mb-1 text-black border-2 rounded-md border-slate-800 bg-primary-dark-600 focus:drop-shadow-green-sm focus:outline-none focus:shadow-none focus:border-lightGreen"
                          placeholder="Enter your phone number"
                          value={newPhone}
                          onChange={(e) => {
                            setNewPhone(e.target.value);
                          }}
                        />
                        <button
                          className="w-full h-12 text-sm text-white uppercase border-2 border-lightGreen rounded-xl"
                          onClick={() => {
                            updateUserProfileOnDB("phone");
                          }}
                        >
                          SAVE
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                ""
              )}
              {tab === "wallet" ? (
                <>
                  <div className="email">
                    <div className="flex flex-col mt-7">
                      <div className="flex flex-col content-center justify-center gap-2">
                        <label className="text-xl font-semibold text-gray-200">
                          Change your wallet account
                        </label>
                        <input
                          type="text"
                          name="wallet"
                          className="w-full px-3 py-2 mb-1 text-black border-2 rounded-md border-slate-800 bg-primary-dark-600 focus:drop-shadow-green-sm focus:outline-none focus:shadow-none focus:border-lightGreen"
                          placeholder="Wallet address"
                          value={newWallet}
                          onChange={(e) => {
                            setNewWallet(e.target.value);
                          }}
                        />
                        <button
                          className="w-full h-12 text-sm text-white uppercase border-2 border-lightGreen rounded-xl"
                          onClick={() => {
                            setConnectedWalletToNew();
                          }}
                        >
                          Copy connected wallet address
                        </button>
                        <button
                          className="w-full h-12 text-sm text-white uppercase border-2 border-lightGreen rounded-xl"
                          onClick={() => {
                            updateUserProfileOnDB("wallet");
                          }}
                        >
                          SAVE
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                ""
              )}
              {tab === "password" ? (
                <>
                  <div className="password">
                    <div className="flex flex-col mt-7">
                      <div className="flex flex-col content-center justify-center gap-2">
                        <label className="text-xl font-semibold text-gray-200">
                          Change your password
                        </label>
                        <input
                          type="password"
                          name="password"
                          className="w-full px-3 py-2 mb-1 text-black border-2 rounded-md border-slate-800 bg-primary-dark-600 focus:drop-shadow-green-sm focus:outline-none focus:shadow-none focus:border-lightGreen"
                          placeholder="Your current password"
                          onChange={(e) => {
                            setPassword(e.target.value);
                          }}
                          value={password}
                        />
                        <input
                          type="password"
                          name="newPassword"
                          className="w-full px-3 py-2 mb-1 text-black border-2 rounded-md border-slate-800 bg-primary-dark-600 focus:drop-shadow-green-sm focus:outline-none focus:shadow-none focus:border-lightGreen"
                          placeholder="New password"
                          onChange={(e) => {
                            setNewPassword(e.target.value);
                          }}
                          value={newPassword}
                        />
                        <input
                          type="password"
                          name="reNewpassword"
                          className="w-full px-3 py-2 mb-3 text-black border-2 rounded-md border-slate-800 bg-primary-dark-600 focus:drop-shadow-green-sm focus:outline-none focus:shadow-none focus:border-lightGreen"
                          placeholder="Re-Enter your new password"
                          onChange={(e) => {
                            setNewRePassword(e.target.value);
                          }}
                          value={newRePassword}
                        />
                        <button
                          className="w-full h-12 text-sm text-white uppercase border-2 border-lightGreen rounded-xl"
                          onClick={() => {
                            updateUserProfileOnDB("password");
                          }}
                        >
                          SAVE
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                ""
              )}
            </div>
          </div>
        </>
      ) : menu === "deposit" ? (
        <>
          <div className="profile-menu-content bg-black md:ml-24 fixed sm:w-96 w-80 h-full px-2.5 top-0 left-0 z-50 overflow-y-auto">
            <div className="sticky top-0 flex justify-between py-6 bg-black">
              <h2 className="text-2xl font-semibold text-white">Financial</h2>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                aria-hidden="true"
                className="w-10 h-10 text-white"
                onClick={() => {
                  setMenu(false);
                }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </div>
            <div className="pt-20 pb-10 profile-main">
              <h4 className="font-semibold text-white">
                {currentDeposited === 0
                  ? "Please deposit funds to this game before start playing."
                  : `You have ${currentDeposited} ETHs on BinaryStar game.`}
              </h4>
              <div className="flex items-center justify-center mt-4 space-x-3">
                <div className="dark:bg-[#9797972B] bg-[#0F1B2E] flex flex-col items-center rounded-lg py-2 px-4">
                  <h2 className="text-[#EDD604] text-lg font-bold">
                    {currentDeposited} ETH
                  </h2>
                  <p className="text-[#DADADA] font-normal text-sm">
                    Your game balance
                  </p>
                </div>
                <button
                  className="border-2 border-lightGreen rounded-xl text-[#fff] text-lg px-4 py-4"
                  onClick={() => {
                    onClickWithDraw();
                  }}
                >
                  Withdraw
                </button>
              </div>
            </div>

            <div className="flex flex-col items-center justify-between mt-1 mb-10 space-y-3 sm:space-y-0 sm:flex-row">
              <div className="flex items-center justify-center space-x-3 align-center">
                <input
                  type="number"
                  name="depositInput"
                  className="w-8/12 px-3 py-4 text-white border-2 rounded-md border-slate-800 bg-primary-dark-600 focus:drop-shadow-green-sm focus:outline-none focus:shadow-none focus:border-lightGreen"
                  placeholder="0"
                  onChange={(e) => {
                    setDepositAmount(e.target.value);
                  }}
                  value={depositAmount}
                />
                <h2 className="text-[#EDD604] text-lg font-bold">ETH</h2>
              </div>
              <button
                className="border-2 border-lightGreen rounded-xl text-[#fff] text-lg px-4 py-4"
                onClick={() => {
                  onClickDeposit();
                }}
              >
                Deposit
              </button>
            </div>
          </div>
        </>
      ) : (
        ""
      )}
    </div>
  );
}
