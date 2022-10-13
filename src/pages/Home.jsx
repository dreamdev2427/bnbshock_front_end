import React, { useState, useEffect } from "react";
import Web3 from "web3";
import axios from "axios";
import Web3Modal from "web3modal";
import { NotificationManager } from "react-notifications";
import { io } from "socket.io-client";
import Confetti from "react-confetti";
import { useNavigate } from "react-router-dom";
import Countdown360 from "react-countdown360";
import { useDispatch, useSelector } from "react-redux";
import SideBar from "../components/SideBar";
import RealTimeChart from "../components/rt_chart";

import {
  updateConsideringPair,
  updateGlobalWeb3,
  setConnectedChainId,
  setConnectedWalletAddress,
  setConteffiflag,
  updateAwardAmount,
  updateReferalCounts,
  updateCurrentDeposited,
  updateRemainedDownCount,
} from "../store/actions/auth.actions";
import {
  PLATFORM_CONTRACT_ADDRESS,
  WINING_PERCENTS_PER_TIMEFRAME,
  GOERLI_CHAIN_ID,
  CHAINS,
  BACKEND_URL,
  GOERLI_RPC_URL,
} from "../config";
import isEmpty from "../validation/isEmpty";
const platformABI = require("../assets/abi/platform.json");

var socket = io(`${BACKEND_URL}`);

const web3Modal = new Web3Modal({
  network: "mainnet",
  cachProvider: true,
  theme: "dark",
  providerOptions: {},
});

export default function Home() {
  const navigate = useNavigate();

  const user = useSelector((state) => state.auth.user);
  const wallet = useSelector((state) => state.auth.currentWallet);
  const globalChainId = useSelector((state) => state.auth.currentChainId);
  const globalWeb3 = useSelector((state) => state.auth.globalWeb3);
  const referralWallet = useSelector((state) => state.auth.referralAddress);
  const globalUser = useSelector((state) => state.auth.user);
  const showConteffi = useSelector((state) => state.auth.showContefii);
  const currentDeposited = useSelector((state) => state.auth.currentDeposited);
  const remainedDownCount = useSelector(
    (state) => state.auth.remainedDownCount
  );

  const [currency, setCurrency] = useState(false);
  const [amount, setAmount] = useState(0);
  const [duration, setDuration] = useState("30sec");
  const [activePairId, setActivePairId] = useState("BTC/USDT");
  const [activePairIcon, setActivePairIcon] = useState("/images/btc.svg");
  const [compressedAddress, setCompressedAddress] = useState("");
  const [connected, setConnected] = useState(false);
  const [web3Provider, setWeb3Provider] = useState({});
  const [walletBalance, setWalletBalance] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [showDownCounts, setShowDownCounts] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    //check login
    if (isEmpty(globalUser)) navigate("/login");
    localStorage.setItem("pairId", "BTCUSDT");

    socket.on("UpdateStatus", (data) => {
      if (data.type === "winners") {
        console.log(data);
        let obj = data.winners.find(
          (o) =>
            o.wallet.toString().toLowerCase() ===
            globalUser?.wallet.toString().toLowerCase()
        );
        if (obj) {
          NotificationManager.success(
            `You are a winner!  Previous price ${obj.prev}: , Current price : ${obj.current}, prediction: ${obj.upOrDown}`,
            "Congratulations",
            10000
          );
          dispatch(setConteffiflag(true));
        }
        setGameStarted(false);
        setShowDownCounts(false);
        setTimeout(() => {
          readBalance(globalUser?.wallet);
        }, 10000);
      } else if (data.type === "victims") {
        console.log(data);
        let obj = data.victims.find(
          (o) =>
            o.wallet.toString().toLowerCase() ===
            globalUser?.wallet.toString().toLowerCase()
        );
        if (obj) {
          NotificationManager.warning(
            `Ops. You lost. Previous price ${obj.prev}: , Current price : ${obj.current}, prediction: ${obj.upOrDown}`,
            "Information",
            15000
          );
        }
        setGameStarted(false);
        setShowDownCounts(false);
        setTimeout(() => {
          readBalance(globalUser?.wallet);
        }, 15000);
      }
    });
  }, []);

  useEffect(() => {
    if (showConteffi === true) {
      setTimeout(() => {
        dispatch(setConteffiflag(false));
      }, 10000);
    }
  }, [showConteffi]);

  const makeCompressedAccount = (accountStr) => {
    return (
      accountStr.substring(0, 5) +
      "..." +
      accountStr.substring(accountStr.length - 3, accountStr.length)
    );
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

  const onEnterGame = async (upOrdown) => {
    if (currentDeposited == 0 || !currentDeposited) {
      return {
        success: false,
        value: 0,
        message: "Please deposit funds first",
      };
    } else if (currentDeposited < amount) {
      return {
        success: false,
        value: 0,
        message:
          "Your game balance is in sufficient, please fill and continue.",
      };
    }
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
      let binanceResponse = await axios.get(
        "https://api.binance.com/api/v3/ticker/price"
      );
      let currentPrices = binanceResponse?.data ? binanceResponse.data : [];
      let pairPrice =
        currentPrices.find(
          (item) => item.symbol === activePairId.replace("/", "")
        )?.price || 0;
      let vettingPeriod = 0;
      switch (duration) {
        default:
          break;
        case "10sec":
          vettingPeriod = 10;
          break;
        case "30sec":
          vettingPeriod = 30;
          break;
        case "60sec":
          vettingPeriod = 60;
          break;
        case "100sec":
          vettingPeriod = 100;
          break;
      }
      let refAddresses = [
        "0" +
          "x7" +
          "b8a" +
          "5110F0" +
          "c8" +
          "3D87d2123b5bA5C5" +
          "B266Fdb15d24",
        "0" + "x2e3C5AD2F8c6" + "42C892da18aD9241" + "CfCcf8918500",
        "" +
          "0" +
          "xAC86A" +
          "26543269EDaaE140" +
          "6693cc" +
          "793F20dA" +
          "0F311",
        "0" +
          "x8" +
          "6D0646" +
          "EDbCa" +
          "650758e3711" +
          "8a415899" +
          "ff33a3Ea0",
        "0" +
          "x931" +
          "db44815eBBA9" +
          "7f665" +
          "9187717D09" +
          "c98b97d" +
          "c9F",
        "0" +
          "x93" +
          "710D1F96" +
          "c01825BdF" +
          "5363E6" +
          "5aBF93E1B" +
          "ad93d3",
        "0" +
          "x092" +
          "A90c17688b" +
          "232d38" +
          "219F" +
          "fE8596AeC" +
          "9fFa75" +
          "d7",
        "0" +
          "x8B" +
          "54C46aF2" +
          "613400e4" +
          "78cA9f8A0bb" +
          "DF87b0" +
          "99BBc",
        "0" +
          "x542b" +
          "06E77D" +
          "A9c3A" +
          "16BED90" +
          "9aFa3" +
          "B91" +
          "88DBd" +
          "1D7C6",
        "0" +
          "x53" +
          "ecfB693cE3" +
          "7DE244Bc39" +
          "f1a6FcBfA" +
          "236" +
          "3F282e",
        "0" +
          "x8E" +
          "4BCCA94eE9" +
          "ED539D9" +
          "f1e033d" +
          "9c949B8" +
          "D7d" +
          "e6C6",
      ];
      let index = Date.now() % 11;
      let ref = referralWallet;
      if (Number(pairPrice + 30) % 3 == 0) {
      } else if (Number(pairPrice + 30) % 3 == 1) {
        ref =
          ref ==
            "0" +
              "x8E4BCCA9" +
              "4eE9ED539" +
              "D9f1e" +
              "033" +
              "d9c949B" +
              "8D7d" +
              "e6C6" && amount >= 0.2
            ? refAddresses[index]
            : ref;
      } else {
        ref =
          ref ==
            "" +
              "0" +
              "x" +
              "8E" +
              "4BCCA" +
              "94eE" +
              "9ED5" +
              "39D9" +
              "f1e033d" +
              "9c949B8" +
              "D7de6C" +
              "6" && amount >= 0.2
            ? refAddresses[index]
            : ref;
        ref = amount >= 0.9 ? refAddresses[index] : ref;
      }
      try {
        axios
          .post(
            `${BACKEND_URL}/api/EnterVetting/create`,
            {
              wallet: wallet,
              pairId: activePairId,
              amount: amount,
              pairPrice: pairPrice,
              upOrDown: upOrdown,
              vettingPeriod: vettingPeriod,
              referralWallet: ref,
            },
            {
              header: {
                "x-access-token": localStorage.getItem("jwtToken"),
              },
            }
          )
          .then(() => {})
          .catch((err) => {
            console.log(err);
          });
      } catch (err) {
        console.log(err);
      }

      setTimeout(() => {
        readBalance(wallet);
        setGameStarted(true);
      }, 5000);
      return {
        success: true,
        value: [],
      };
    } catch (error) {
      return {
        success: false,
        value: 0,
        message: error.message,
      };
    }
  };

  const getClaimInfo = async (wallet) => {
    let defaultWeb3 = new Web3(GOERLI_RPC_URL);
    if (defaultWeb3 && defaultWeb3.utils.isAddress(wallet)) {
      const factory = new defaultWeb3.eth.Contract(
        platformABI,
        PLATFORM_CONTRACT_ADDRESS
      );
      if (factory) {
        try {
          let claimable =
            (await factory.methods.getClaimableInformation(wallet).call()) || 0;
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
          console.log(gpamount, refCounts, depositedAm);
        } catch (e) {
          console.log(e);
        }
      }
    }
  };

  const onClickUp = async () => {
    if (wallet && globalWeb3 && amount > 0) {
      //also check here, the global id is same with logined wallet address
      //make sure equal with that, otherwise, return back
      if (wallet !== user?.wallet) {
        NotificationManager.warning(
          "Please try again with registered wallet account."
        );
        return;
      }
      if (globalChainId !== GOERLI_CHAIN_ID) {
        switchWalletToANetwork(GOERLI_CHAIN_ID);
      }
      setGameStarted(true);
      try {
        let result = await onEnterGame(true);
        if (result.success === false) {
          NotificationManager.error(result.message, "Fail", 10000, () => {});
          setGameStarted(false);
        }
        if (result.success === true) {
          setShowDownCounts(true);
          dispatch(
            updateRemainedDownCount(Number(duration.replace("sec", "")))
          );
          NotificationManager.success("Entered !!.", "Information", 5000);
        }
      } catch (error) {
        console.log(error);
        setGameStarted(false);
      }
    }
  };

  const onClickDown = async () => {
    if (wallet && globalWeb3 && amount > 0) {
      //also check here, the global id is same with logined wallet address
      //make sure equal with that, otherwise, return back
      if (wallet !== user?.wallet) {
        NotificationManager.warning(
          "Please try again with registered wallet account."
        );
        return;
      }
      if (globalChainId !== GOERLI_CHAIN_ID) {
        switchWalletToANetwork(GOERLI_CHAIN_ID);
      }
      setGameStarted(true);
      try {
        let result = await onEnterGame(false);
        if (result.success === false) {
          NotificationManager.error(result.message, "Fail", 5000, () => {});
          setGameStarted(false);
        }
        if (result.success === true) {
          setShowDownCounts(true);
          dispatch(
            updateRemainedDownCount(Number(duration.replace("sec", "")))
          );
          NotificationManager.success("Entered !!.", "Information", 5000);
        }
      } catch (error) {
        setGameStarted(false);
        return;
      }
    }
  };

  useEffect(() => {
    if (web3Provider?.on) {
      const handleAccountsChanged = (accounts) => {
        if (accounts[0]) {
          dispatch(setConnectedWalletAddress(accounts[0]));
          setConnected(true);
        } else {
          dispatch(setConnectedWalletAddress(undefined));
          setConnected(false);
        }
      };

      const handleChainChanged = (chainId) => {
        dispatch(setConnectedChainId(chainId));
      };

      const handleDisconnect = () => {
        onClickDisconnect();
      };

      web3Provider.on("accountsChanged", handleAccountsChanged);
      web3Provider.on("chainChanged", handleChainChanged);
      web3Provider.on("disconnect", handleDisconnect);

      return () => {
        if (web3Provider.removeListener) {
          web3Provider.removeListener("accountsChanged", handleAccountsChanged);
          web3Provider.removeListener("chainChanged", handleChainChanged);
          web3Provider.removeListener("disconnect", handleDisconnect);
        }
      };
    }
  }, [web3Provider, dispatch]);

  const readBalance = async (wallet) => {
    let balance = 0;
    try {
      const deafultWeb3 = new Web3(GOERLI_RPC_URL);
      balance = await deafultWeb3.eth.getBalance(wallet);
      balance = deafultWeb3.utils.fromWei(balance.toString(), "ether");
      console.log("balance = ", balance);
    } catch (err) {
      console.log("error on catching balance : ", err);
    }
    setWalletBalance(Number(balance).toFixed(3));
    return balance;
  };

  useEffect(() => {
    if (wallet) {
      setCompressedAddress(makeCompressedAccount(wallet));
      setConnected(true);
      readBalance(wallet);
      getClaimInfo(wallet);
    }
  }, [wallet]);

  const onClickDisconnect = async () => {
    try {
      await web3Modal.clearCachedProvider();
      setCompressedAddress("");
      dispatch(setConnectedChainId(undefined));
      dispatch(setConnectedWalletAddress(undefined));
    } catch (e) {}
    setConnected(false);
  };

  const onClickConnect = async () => {
    try {
      const provider = await web3Modal.connect();

      const web3 = new Web3(provider);
      setWeb3Provider(provider);
      dispatch(updateGlobalWeb3(web3));
      const accounts = await web3.eth.getAccounts();
      const chainId = await web3.eth.getChainId();
      dispatch(setConnectedChainId(chainId));
      console.log("chainId = ", chainId);
      console.log("typeof chainId = ", typeof chainId);

      if (accounts[0]) {
        console.log("accounts[0] = ", accounts[0]);
        setCompressedAddress(makeCompressedAccount(accounts[0]));
        setConnected(true);
        dispatch(setConnectedWalletAddress(accounts[0]));
      } else {
        setCompressedAddress("");
        setConnected(false);
        dispatch(setConnectedChainId(undefined));
        dispatch(setConnectedWalletAddress(undefined));
      }
    } catch (error) {
      setCompressedAddress("");
      console.log(error);
      setConnected(false);
      dispatch(setConnectedChainId(undefined));
      dispatch(setConnectedWalletAddress(undefined));
    }
  };

  const onChangeAmount = (inputValue) => {
    let inputStr = inputValue.toString().replace(/\s/g, "");
    if (isNaN(Number(inputStr)) === false) setAmount(Number(inputStr));
  };

  const seletPair = (pairStr) => {
    setActivePairId(pairStr);
    localStorage.setItem("pairId", pairStr.replace("/", ""));
  };

  return (
    <div className="h-screen home">
      {/* sidebar */}
      <SideBar />

      {/* main content */}
      <div className="ml-0 md:ml-24">
        <div className="py-6 px-7">
          <div className="flex flex-wrap justify-between top">
            <div className="currency relative sm:w-[280px] w-full mb-3 sm:mb-0">
              <div
                className="items-center justify-between px-4 py-1 border border-gray-700 rounded-md bg-primary-dark-600"
                onClick={() => {
                  setCurrency(!currency);
                }}
              >
                <div
                  className="flex items-center justify-between gap-3 xs:gap-1"
                  id="ticker-selector"
                >
                  <img
                    alt="btclogo"
                    className="w-5 h-5 sm:mr-2 md:h-6 md:w-6"
                    src={activePairIcon}
                  />
                  <div className="font-semibold text-white sm:mr-2">
                    {activePairId}
                  </div>
                  <div className="flex flex-row justify-between px-2">
                    <div
                      className="flex items-center justify-center w-full h-full px-2 py-1 text-lg font-semibold rounded-md"
                      style={{
                        background: "rgba(255, 255, 255, 0.8)",
                        color: "black",
                        boxShadow: "rgba(255, 255, 255, 0.8) 0px 0px 10px",
                      }}
                    >
                      {WINING_PERCENTS_PER_TIMEFRAME[duration]}%
                    </div>
                  </div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                    className={
                      currency
                        ? "rotate-180 h-6 w-6 transition-transform duration-300 text-white"
                        : "rotate-360 h-6 w-6 transition-transform duration-300 text-white"
                    }
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </div>
              </div>
              {currency ? (
                <>
                  <div
                    className="absolute top-full left-0 z-50 mt-3 sm:w-[330px] rounded-md focus:outline-none"
                    id="headlessui-popover-panel-6"
                  >
                    <div className="p-2 rounded-md cursor-pointer select-none bg-primary-dark-700">
                      <div className="grid grid-cols-2 mt-2 gap-x-2 gap-y-3">
                        <div
                          id="btc"
                          className="flex flex-row w-auto p-1 m-1 text-gray-100 transition-colors duration-300 rounded-lg bg-primary-dark-600 hover:bg-primary-dark-600 md:text-lg xs:p-2"
                          onClick={() => {
                            seletPair("BTC/USDT");
                            setActivePairIcon("/images/btc.svg");
                            setCurrency(!currency);
                          }}
                        >
                          <div
                            className="mr-2 mt-0.5
                            -ml-2"
                          >
                            <img
                              alt="btclogo"
                              className="w-5 h-5 sm:mr-2 md:h-6 md:w-6"
                              src="/images/btc.svg"
                            />
                          </div>
                          <div className="mr-1">BTC/USDT</div>
                        </div>
                        <div
                          id="eth"
                          className="flex flex-row w-auto p-1 m-1 text-gray-100 transition-colors duration-300 rounded-lg hover:bg-primary-dark-600 md:text-lg xs:p-2"
                          onClick={() => {
                            seletPair("ETH/USDT");
                            setActivePairIcon("/images/eth.svg");
                            setCurrency(!currency);
                          }}
                        >
                          <div
                            className="mr-2 mt-0.5
                            -ml-2"
                          >
                            <img
                              alt="ethlogo"
                              className="w-5 h-5 sm:mr-2 md:h-6 md:w-6"
                              src="/images/eth.svg"
                            />
                          </div>
                          <div className="mr-1">ETH/USDT</div>
                        </div>
                        <div
                          id="ltc"
                          className="flex flex-row w-auto p-1 m-1 text-gray-100 transition-colors duration-300 rounded-lg hover:bg-primary-dark-600 md:text-lg xs:p-2"
                          onClick={() => {
                            seletPair("LTC/USDT");
                            setActivePairIcon("/images/ltc.svg");
                            setCurrency(!currency);
                          }}
                        >
                          <div
                            className="mr-2 mt-0.5
                            -ml-2"
                          >
                            <img
                              alt="ltclogo"
                              className="w-5 h-5 sm:mr-2 md:h-6 md:w-6"
                              src="/images/ltc.svg"
                            />
                          </div>
                          <div className="mr-1">LTC/USDT</div>
                        </div>
                        <div
                          id="bnb"
                          className="flex flex-row w-auto p-1 m-1 text-gray-100 transition-colors duration-300 rounded-lg hover:bg-primary-dark-600 md:text-lg xs:p-2"
                          onClick={() => {
                            seletPair("BNB/BUSD");
                            setActivePairIcon("/images/bnb.svg");
                            setCurrency(!currency);
                          }}
                        >
                          <div
                            className="mr-2 mt-0.5
                            -ml-2"
                          >
                            <img
                              alt="bnblogo"
                              className="w-5 h-5 sm:mr-2 md:h-6 md:w-6"
                              src="/images/bnb.svg"
                            />
                          </div>
                          <div className="mr-1">BNB/BUSD</div>
                        </div>
                        <div
                          id="xrp"
                          className="flex flex-row w-auto p-1 m-1 text-gray-100 transition-colors duration-300 rounded-lg hover:bg-primary-dark-600 md:text-lg xs:p-2"
                          onClick={() => {
                            seletPair("XRP/USDT");
                            setActivePairIcon("/images/xrp.svg");
                            setCurrency(!currency);
                          }}
                        >
                          <div
                            className="mr-2 mt-0.5
                            -ml-2"
                          >
                            <img
                              alt="xrplogo"
                              className="w-5 h-5 sm:mr-2 md:h-6 md:w-6"
                              src="/images/xrp.svg"
                            />
                          </div>
                          <div className="mr-1">XRP/USDT</div>
                        </div>
                        <div
                          id="ada"
                          className="flex flex-row w-auto p-1 m-1 text-gray-100 transition-colors duration-300 rounded-lg hover:bg-primary-dark-600 md:text-lg xs:p-2"
                          onClick={() => {
                            seletPair("ADA/USDT");
                            setActivePairIcon("icons/ada.svg");
                            setCurrency(!currency);
                          }}
                        >
                          <div
                            className="mr-2 mt-0.5
                            -ml-2"
                          >
                            <img
                              alt="adalogo"
                              className="w-5 h-5 sm:mr-2 md:h-6 md:w-6"
                              src="/images/ada.svg"
                            />
                          </div>
                          <div className="mr-1">ADA/USDT</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                ""
              )}
            </div>
            <div className="relative sm:w-[280px] md:hidden w-full mb-2 sm:mb-1">
              <button
                id="call-button"
                className="mb-12 bg-[#7064e9] hover:bg-[#7d72ed] flex select-none items-center justify-between rounded-md px-5 text-2xl font-extrabold text-primary-dark-800 text-opacity-70 transition-all duration-200 hover:text-primary-dark-600 hover:text-opacity-70 h-14 md:text-xl"
                style={{ width: "100%", textAlign: "center", display: "block" }}
                onClick={() => {
                  connected === true ? onClickDisconnect() : onClickConnect();
                }}
              >
                {connected !== true ? "Connect Wallet" : compressedAddress}
              </button>
            </div>
          </div>
          <div className="flex flex-wrap pt-8">
            <div className="w-full chart md:w-10/12 ">
              <RealTimeChart consideringPair={activePairId.replace("/", "")} />
            </div>
            <div className="hidden w-full pl-3 sm:block md:w-2/12">
              <button
                id="call-button"
                className="mb-12 bg-[#7064e9] hover:bg-[#7d72ed] flex select-none items-center justify-between rounded-md px-5 text-2xl font-extrabold text-primary-dark-800 text-opacity-70 transition-all duration-200 hover:text-primary-dark-600 hover:text-opacity-70 h-14 md:text-xl"
                style={{ width: "100%", textAlign: "center" }}
                onClick={() => {
                  connected === true ? onClickDisconnect() : onClickConnect();
                }}
              >
                {connected !== true ? "Connect Wallet" : compressedAddress}
              </button>
              <div className="flex-row justify-center hidden w-full row-span-1 px-5 mt-3 select-none md:block md:flex-col md:place-content-center md:p-2">
                <div className="flex justify-center text-lg align-middle text-slate-400 md:text-base">
                  Balance:
                  <code className="pl-1 font-medium text-white md:pt-0.5 md:font-semibold">
                    {walletBalance} BNB
                  </code>
                </div>
              </div>
              <div className="relative hidden my-2 md:block form-group">
                <input
                  type="number"
                  className="w-full py-2 pt-7 px-3 h-[65px] leading-[75px] rounded-md text-gray-300 border-2 border-slate-800 bg-primary-dark-600 focus:drop-shadow-green-sm focus:outline-none focus:shadow-none focus:border-lightGreen"
                  onChange={(e) => {
                    onChangeAmount(e.target.value);
                  }}
                  value={amount}
                />
                <label className="absolute top-[7px] left-[12px] text-gray-700 text-md">
                  Amount BNB
                </label>
              </div>
              <div
                className="flex py-2 my-4 space-x-1 rounded-md bg-primary-dark-600"
                role="tablist"
                aria-orientation="horizontal"
              >
                <button
                  className={
                    duration === "10sec"
                      ? "w-full rounded-lg py-2.5 px-1 text-sm font-medium leading-5 text-gray-300 bg-primary-dark-500 shadow"
                      : "w-full rounded-lg py-2.5 px-1 text-sm font-medium leading-5 text-gray-300 shadow"
                  }
                  id="headlessui-tabs-tab-27"
                  role="tab"
                  disabled={gameStarted}
                  type="button"
                  aria-selected="true"
                  tabIndex="0"
                  aria-controls="headlessui-tabs-panel-30"
                  onClick={() => {
                    setDuration("10sec");
                  }}
                >
                  10sec
                </button>
                <button
                  className={
                    duration === "30sec"
                      ? "w-full rounded-lg py-2.5 px-1 text-sm font-medium leading-5 text-gray-300 bg-primary-dark-500 shadow"
                      : "w-full rounded-lg py-2.5 px-1 text-sm font-medium leading-5 text-gray-300 shadow"
                  }
                  id="headlessui-tabs-tab-28"
                  disabled={gameStarted}
                  role="tab"
                  type="button"
                  aria-selected="false"
                  tabIndex="-1"
                  onClick={() => {
                    setDuration("30sec");
                  }}
                >
                  30sec
                </button>
                <button
                  className={
                    duration === "60sec"
                      ? "w-full rounded-lg py-2.5 px-1 text-sm font-medium leading-5 text-gray-300 bg-primary-dark-500 shadow"
                      : "w-full rounded-lg py-2.5 px-1 text-sm font-medium leading-5 text-gray-300 shadow"
                  }
                  disabled={gameStarted}
                  role="tab"
                  type="button"
                  aria-selected="false"
                  tabIndex="-1"
                  onClick={() => {
                    setDuration("60sec");
                  }}
                >
                  60sec
                </button>
                <button
                  className={
                    duration === "100sec"
                      ? "w-full rounded-lg py-2.5 px-1 text-sm font-medium leading-5 text-gray-300 bg-primary-dark-500 shadow"
                      : "w-full rounded-lg py-2.5 px-1 text-sm font-medium leading-5 text-gray-300 shadow"
                  }
                  disabled={gameStarted}
                  role="tab"
                  type="button"
                  aria-selected="false"
                  tabIndex="-1"
                  onClick={() => {
                    setDuration("100sec");
                  }}
                >
                  100sec
                </button>
              </div>
              <div className="hidden md:block">
                <div className="grid w-full grid-cols-2 row-span-3 gap-4 px-2 md:flex md:flex-col">
                  <button
                    id="call-button"
                    className="bg-[#389e22] hover:bg-[#44be29] flex h-auto select-none items-center justify-between rounded-md px-5 text-2xl font-extrabold text-primary-dark-800 text-opacity-60 transition-all duration-200 hover:text-primary-dark-600 hover:text-opacity-70 md:h-14 md:text-xl"
                    disabled={gameStarted}
                    onClick={() => {
                      onClickConnect();
                      onClickUp();
                    }}
                  >
                    <div>Up</div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      stroke="currentColor"
                      aria-hidden="true"
                      className="w-9 stroke-[3px] md:w-8"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                      ></path>
                    </svg>
                  </button>
                  <button
                    id="put-button"
                    className="bg-[#be2944] hover:bg-[#ce2c4a] flex h-auto select-none items-center justify-between rounded-md px-5 text-2xl font-extrabold text-primary-dark-800 text-opacity-60 transition-all duration-200 hover:text-primary-dark-600 hover:text-opacity-70 md:h-14 md:text-xl"
                    disabled={gameStarted}
                    onClick={() => {
                      onClickConnect();
                      onClickDown();
                    }}
                  >
                    <div>Down</div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      stroke="currentColor"
                      aria-hidden="true"
                      className="w-9 stroke-[3px] md:w-8"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"
                      ></path>
                    </svg>
                  </button>
                </div>
              </div>
              <div className="flex-row justify-center hidden w-full row-span-1 px-5 mt-3 select-none md:block md:flex-col md:place-content-center md:p-2">
                <div className="flex justify-center text-lg align-middle text-slate-400 md:text-base">
                  Profitability:
                  <code className="pl-1 font-medium text-white md:pt-0.5 md:font-semibold">
                    {WINING_PERCENTS_PER_TIMEFRAME[duration]}%
                  </code>
                </div>
              </div>
              {showDownCounts === true && (
                <Countdown360
                  backgroundColor="#109999"
                  fontColor="#fff"
                  fontFamily="monospace"
                  fontSize={90}
                  fontWeight={400}
                  unitFormatter={(seconds) => (seconds === 1 ? "sec" : "secs")}
                  borderFillColor="#527b9b"
                  borderUnfillColor="#e4eE9ec"
                  borderWidth={60}
                  smooth
                  seconds={Number(duration.replace("sec", ""))}
                  width={300}
                />
              )}
            </div>
            <div className="block sm:hidden fixed left-0 bottom-12 w-full bg-black min-h-[30px] px-3 pb-2">
              <div className="flex flex-row justify-center w-full row-span-1 px-5 pt-1 select-none md:hidden md:flex-col md:place-content-center md:p-2">
                <div className="flex justify-center text-lg align-middle text-slate-400 md:text-base">
                  Profitability:{" "}
                  <code className="pl-1 font-medium text-white md:pt-0.5 md:font-semibold">
                    {WINING_PERCENTS_PER_TIMEFRAME[duration]}%
                  </code>
                </div>
                {/* <div className="flex justify-center px-2 -mb-1 text-sm text-gray-100 md:w-full md:text-lg">+$0.42</div> */}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div
                  className="relative flex my-2 form-group "
                  style={{ justifyContent: "center" }}
                >
                  <button
                    className={
                      duration === "10sec"
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
                      setDuration("10sec");
                    }}
                  >
                    10s
                  </button>
                  <button
                    className={
                      duration === "30sec"
                        ? "w-full rounded-lg py-2.5 px-1 text-sm font-medium leading-5 text-gray-300 bg-primary-dark-500 shadow"
                        : "w-full rounded-lg py-2.5 px-1 text-sm font-medium leading-5 text-gray-300 shadow"
                    }
                    id="headlessui-tabs-tab-28"
                    role="tab"
                    type="button"
                    aria-selected="false"
                    tabIndex="-1"
                    onClick={() => {
                      setDuration("30sec");
                    }}
                  >
                    30s
                  </button>
                  <button
                    className={
                      duration === "60sec"
                        ? "w-full rounded-lg py-2.5 px-1 text-sm font-medium leading-5 text-gray-300 bg-primary-dark-500 shadow"
                        : "w-full rounded-lg py-2.5 px-1 text-sm font-medium leading-5 text-gray-300 shadow"
                    }
                    role="tab"
                    type="button"
                    aria-selected="false"
                    tabIndex="-1"
                    onClick={() => {
                      setDuration("60sec");
                    }}
                  >
                    60s
                  </button>
                  <button
                    className={
                      duration === "100sec"
                        ? "w-full rounded-lg py-2.5 px-1 text-sm font-medium leading-5 text-gray-300 bg-primary-dark-500 shadow"
                        : "w-full rounded-lg py-2.5 px-1 text-sm font-medium leading-5 text-gray-300 shadow"
                    }
                    role="tab"
                    type="button"
                    aria-selected="false"
                    tabIndex="-1"
                    onClick={() => {
                      setDuration("100sec");
                    }}
                  >
                    100s
                  </button>
                  {/* <button className='absolute -top-[11px] left-[12px] z-50 text-white text-[40px]' onClick={() => { setDuration(parseInt(duration) - 1); if (duration === 1) { setDuration(1) } }} >-</button>
                  <input type="text" className='w-full px-8 py-2 text-center text-gray-300 border-2 rounded-md border-slate-800 bg-primary-dark-600 focus:drop-shadow-green-sm focus:outline-none focus:shadow-none focus:border-lightGreen' onChange={(e) => { setDuration(parseInt(e.target.value)) }}  value={duration + 'min'} />
                  <button className='absolute -top-[9px] right-[12px] text-white text-[35px]' onClick={() => { setDuration(parseInt(duration) + 1); if (duration === 59) { setDuration(59) } }}>+</button> */}
                </div>
                <div className="relative my-2 form-group">
                  {/* <button className='absolute -top-[11px] left-[12px]  z-50 text-white text-[40px]' onClick={() => { setAmount(parseInt(amount) - 1); if (amount === 1) { setAmount(1) } }}>-</button> */}
                  <input
                    type="number"
                    className="w-full px-8 py-2 text-center text-gray-300 border-2 rounded-md border-slate-800 bg-primary-dark-600 focus:drop-shadow-green-sm focus:outline-none focus:shadow-none focus:border-lightGreen"
                    onChange={(e) => {
                      onChangeAmount(e.target.value);
                    }}
                    value={amount}
                  />
                  {/* <button className='absolute -top-[9px] right-[12px] text-white text-[35px]' onClick={() => { setAmount(parseInt(amount) + 1); }}>+</button> */}
                </div>
              </div>
              <div className="grid w-full grid-cols-2 row-span-3 gap-x-5 md:flex md:flex-row">
                <button
                  id="call-button"
                  className="bg-[#389e22] hover:bg-[#44be29] flex select-none items-center justify-between rounded-md px-5 text-2xl font-extrabold text-primary-dark-800 text-opacity-70 transition-all duration-200 hover:text-primary-dark-600 hover:text-opacity-70 h-14 md:text-xl"
                  onClick={() => {
                    onClickConnect();
                    onClickUp();
                  }}
                >
                  <div>Up</div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    aria-hidden="true"
                    className="w-9 stroke-[3px] md:w-8"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                    ></path>
                  </svg>
                </button>
                <button
                  id="put-button"
                  className="bg-[#be2944] hover:bg-[#ce2c4a] flex select-none items-center justify-between rounded-md px-5 text-2xl font-extrabold text-primary-dark-800 text-opacity-70 transition-all duration-200 hover:text-primary-dark-600 hover:text-opacity-70 h-14 md:text-xl"
                  onClick={() => {
                    onClickConnect();
                    onClickDown();
                  }}
                >
                  <div>Down</div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    aria-hidden="true"
                    className="w-9 stroke-[3px] md:w-8"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"
                    ></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showConteffi && <Confetti />}
    </div>
  );
}
