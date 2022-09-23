import React, { useState } from 'react'
import SideBar from '../components/SideBar'
import Chart from '../components/Chart'
import StockChart from '../components/StockChart'
import { useDispatch, useSelector } from 'react-redux'
import { updateConsideringPair } from '../store/actions/auth.actions'
import { useEffect } from 'react'

export default function Home() {

  const wallet = useSelector(state => state.auth.currentWallet);
  const chainId = useSelector(state => state.auth.currentChainId);
  const globalWeb3 = useSelector(state => state.auth.globalWeb3);

  const BSC_CHAIN_ID = 56;
  const [currency, setCurrency] = useState(false)
  const [amount, setAmount] = useState(10)
  const [duration, setDuration] = useState("30sec");
  const [profitablePercent, setProfitablePercent] = useState(30);
  const [activePairId, setActivePairId] = useState("BTC/USDT")
  const [activePairIcon, setActivePairIcon] = useState("https://platform.binarystars.cc/icons/btc.svg")

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(updateConsideringPair(activePairId.replace("/", "")));
  }, [activePairId])

  useEffect(() => {
    switch(duration)
    {
      default: break;
      case "10sec": setProfitablePercent(10); break;
      case "30sec": setProfitablePercent(30); break;
      case "1min": setProfitablePercent(50); break;
      case "100sec": setProfitablePercent(100); break; 
    }
  }, [duration])

  const onClickUp = async () => {
    if(wallet && globalWeb3 && chainId === BSC_CHAIN_ID)
    {
      
    }
  }
  
  const onClickDown = async () => {
    if(wallet && globalWeb3 && chainId === BSC_CHAIN_ID)
    {

    }
  }

  return (
    <div className='home h-screen'>
      {/* sidebar */}
      <SideBar />

      {/* main content */}
      <div className='md:ml-24 ml-0'>
        <div className="py-6 px-7">
          <div className="top flex flex-wrap justify-between">
            <div className="currency relative sm:w-[280px] w-full mb-3 sm:mb-0">
              <div className="justify-between items-center py-1 px-4 rounded-md bg-primary-dark-600 border border-gray-700" onClick={() => { setCurrency(!currency) }}>
                <div className="flex items-center justify-between gap-3 xs:gap-1" id="ticker-selector">
                  <img alt="btclogo" className="h-5 w-5 sm:mr-2 md:h-6 md:w-6" src={activePairIcon} />
                  <div className="font-semibold sm:mr-2 text-white">{activePairId}</div>
                  <div className="flex flex-row justify-between px-2">
                    <div className="flex h-full w-full items-center justify-center  rounded-md py-1 font-semibold text-lg px-2" style={{ background: 'rgba(255, 255, 255, 0.8)', color: 'black', boxShadow: 'rgba(255, 255, 255, 0.8) 0px 0px 10px' }}>{profitablePercent}%</div>
                  </div>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" className={currency ? "rotate-180 h-6 w-6 transition-transform duration-300 text-white" : "rotate-360 h-6 w-6 transition-transform duration-300 text-white"}><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path>
                  </svg>
                </div>
              </div>
              {currency ? <>
                <div className="absolute top-full left-0 z-50 mt-3 sm:w-[330px] rounded-md focus:outline-none" id="headlessui-popover-panel-6">
                  <div className="cursor-pointer select-none rounded-md bg-primary-dark-700
                      p-2">
                    {/* <div className="flex w-full flex-row gap-2">
                      <div className="bg-primary-dark-700 group flex h-auto w-full flex-col
                          items-center rounded-md p-4 transition-colors duration-300
                          hover:bg-primary-dark-400">

                        <div className="mt-2 text-gray-300">Line</div>
                      </div>
                      <div className="group flex h-auto w-full flex-col items-center rounded-md
                          p-4 transition-colors duration-300 hover:bg-primary-dark-400">

                        <div className="mt-2 text-gray-300">Candles</div>
                      </div>
                    </div> */}
                    <div className="mt-2 grid grid-cols-2 gap-x-2 gap-y-3">
                      <div id="btc" className="bg-primary-dark-600 m-1 flex w-auto flex-row rounded-lg p-1
                        text-gray-100 transition-colors duration-300
                        hover:bg-primary-dark-600 md:text-lg xs:p-2"
                        onClick={ () => {
                            setActivePairId("BTC/USDT")
                            setActivePairIcon("https://platform.binarystars.cc/icons/btc.svg")
                            setCurrency(!currency)
                          }
                        }
                      >
                        <div className="mr-2 mt-0.5
                            -ml-2"><img alt="btclogo" className="h-5 w-5 sm:mr-2 md:h-6 md:w-6" src="https://platform.binarystars.cc/icons/btc.svg" /></div>
                        <div className="mr-1">BTC/USDT</div>
                      </div>
                      <div id="eth" className="m-1 flex w-auto flex-row rounded-lg p-1
                          text-gray-100 transition-colors duration-300
                          hover:bg-primary-dark-600 md:text-lg xs:p-2"
                          onClick={ () => {
                              setActivePairId("ETH/USDT")
                              setActivePairIcon("https://platform.binarystars.cc/icons/eth.svg")
                              setCurrency(!currency)
                            }
                          }
                        >
                        <div className="mr-2 mt-0.5
                            -ml-2"><img alt="ethlogo" className="h-5 w-5 sm:mr-2 md:h-6 md:w-6" src="https://platform.binarystars.cc/icons/eth.svg" /></div>
                        <div className="mr-1">ETH/USDT</div>
                      </div>
                      <div id="etc" className="m-1 flex w-auto flex-row rounded-lg p-1
                          text-gray-100 transition-colors duration-300
                          hover:bg-primary-dark-600 md:text-lg xs:p-2"
                          onClick={ () => {
                              setActivePairId("ETC/USDT")
                              setActivePairIcon("https://platform.binarystars.cc/icons/etc.svg")
                              setCurrency(!currency)
                            }
                          }
                        >
                        <div className="mr-2 mt-0.5
                            -ml-2"><img alt="etclogo" className="h-5 w-5 sm:mr-2 md:h-6 md:w-6" src="https://platform.binarystars.cc/icons/etc.svg" /></div>
                        <div className="mr-1">ETC/USDT</div>
                      </div>
                      <div id="ltc" className="m-1 flex w-auto flex-row rounded-lg p-1
                          text-gray-100 transition-colors duration-300
                          hover:bg-primary-dark-600 md:text-lg xs:p-2"
                          onClick={ () => {
                              setActivePairId("LTC/USDT")
                              setActivePairIcon("https://platform.binarystars.cc/icons/ltc.svg")
                              setCurrency(!currency)
                            }
                          }
                        >
                        <div className="mr-2 mt-0.5
                            -ml-2"><img alt="ltclogo" className="h-5 w-5 sm:mr-2 md:h-6 md:w-6" src="https://platform.binarystars.cc/icons/ltc.svg" /></div>
                        <div className="mr-1">LTC/USDT</div>
                      </div>
                      <div id="bch" className="m-1 flex w-auto flex-row rounded-lg p-1
                          text-gray-100 transition-colors duration-300
                          hover:bg-primary-dark-600 md:text-lg xs:p-2"
                          onClick={ () => {
                              setActivePairId("BCH/USDT")
                              setActivePairIcon("https://platform.binarystars.cc/icons/bch.svg")
                              setCurrency(!currency)
                            }
                          }
                        >
                        <div className="mr-2 mt-0.5
                            -ml-2"><img alt="bchlogo" className="h-5 w-5 sm:mr-2 md:h-6 md:w-6" src="https://platform.binarystars.cc/icons/bch.svg" /></div>
                        <div className="mr-1">BCH/USDT</div>
                      </div>
                      <div id="xmr" className="m-1 flex w-auto flex-row rounded-lg p-1
                          text-gray-100 transition-colors duration-300
                          hover:bg-primary-dark-600 md:text-lg xs:p-2"         
                          onClick={ () => {
                            setActivePairId("XMR/USDT")
                            setActivePairIcon("https://platform.binarystars.cc/icons/xmr.svg")
                            setCurrency(!currency)
                          }
                        }>
                        <div className="mr-2 mt-0.5
                            -ml-2"><img alt="xmrlogo" className="h-5 w-5 sm:mr-2 md:h-6 md:w-6" src="https://platform.binarystars.cc/icons/xmr.svg" /></div>
                        <div className="mr-1">XMR/USDT</div>
                      </div>
                      <div id="eos" className="m-1 flex w-auto flex-row rounded-lg p-1
                          text-gray-100 transition-colors duration-300
                          hover:bg-primary-dark-600 md:text-lg xs:p-2"                          
                          onClick={ () => {
                            setActivePairId("EOS/USDT")
                            setActivePairIcon("https://platform.binarystars.cc/icons/eos.svg")
                            setCurrency(!currency)
                          }
                        }
                      >
                        <div className="mr-2 mt-0.5
                            -ml-2"><img alt="eoslogo" className="h-5 w-5 sm:mr-2 md:h-6 md:w-6" src="https://platform.binarystars.cc/icons/eos.svg" /></div>
                        <div className="mr-1">EOS/USDT</div>
                      </div>
                      <div id="bnb" className="m-1 flex w-auto flex-row rounded-lg p-1
                          text-gray-100 transition-colors duration-300
                          hover:bg-primary-dark-600 md:text-lg xs:p-2"                       
                          onClick={ () => {
                            setActivePairId("BNB/USDT")
                            setActivePairIcon("https://platform.binarystars.cc/icons/bnb.svg")
                            setCurrency(!currency)
                          }
                        }>
                        <div className="mr-2 mt-0.5
                            -ml-2"><img alt="bnblogo" className="h-5 w-5 sm:mr-2 md:h-6 md:w-6" src="https://platform.binarystars.cc/icons/bnb.svg" /></div>
                        <div className="mr-1">BNB/USDT</div>
                      </div>
                      <div id="xrp" className="m-1 flex w-auto flex-row rounded-lg p-1
                          text-gray-100 transition-colors duration-300
                          hover:bg-primary-dark-600 md:text-lg xs:p-2"                 
                          onClick={ () => {
                            setActivePairId("XRP/USDT")
                            setActivePairIcon("https://platform.binarystars.cc/icons/xrp.svg")
                            setCurrency(!currency)
                          }
                        }
                      >
                        <div className="mr-2 mt-0.5
                            -ml-2"><img alt="xrplogo" className="h-5 w-5 sm:mr-2 md:h-6 md:w-6" src="https://platform.binarystars.cc/icons/xrp.svg" /></div>
                        <div className="mr-1">XRP/USDT</div>
                      </div>
                      <div id="ada" className="m-1 flex w-auto flex-row rounded-lg p-1
                          text-gray-100 transition-colors duration-300
                          hover:bg-primary-dark-600 md:text-lg xs:p-2"             
                          onClick={ () => {
                            setActivePairId("ADA/USDT")
                            setActivePairIcon("https://platform.binarystars.cc/icons/ada.svg")
                            setCurrency(!currency)
                          }
                        }
                      >
                        <div className="mr-2 mt-0.5
                            -ml-2"><img alt="adalogo" className="h-5 w-5 sm:mr-2 md:h-6 md:w-6" src="https://platform.binarystars.cc/icons/ada.svg" /></div>
                        <div className="mr-1">ADA/USDT</div>
                      </div>
                    </div>
                  </div>
                </div>
              </> : ''}
            </div>
          </div>
          <div className="flex flex-wrap pt-8">
            <div className="chart md:w-10/12 w-full">
              <Chart currentPairId={activePairId.replace("/", "")}/>
            </div>
            <div className="sm:block hidden md:w-2/12 w-full">
              <button id="call-button" className="mb-12 bg-[#7064e9] hover:bg-[#7d72ed] flex select-none items-center justify-between rounded-md px-5 text-2xl font-extrabold text-primary-dark-800 text-opacity-70 transition-all duration-200 hover:text-primary-dark-600 hover:text-opacity-70 h-14 md:text-xl"
                style={{ width:"100%", textAlign: "center"}}
                  onClick = {() => {}}
                >
                  Connect Wallet
              </button>
              <div className="hidden md:block form-group relative my-2">
                <input type="text" className='w-full py-2 pt-7 px-3 h-[65px] leading-[75px] rounded-md text-gray-300 border-2 border-slate-800 bg-primary-dark-600 focus:drop-shadow-green-sm focus:outline-none focus:shadow-none focus:border-lightGreen' onChange={(e) => { setAmount(parseInt(e.target.value)) }} value={amount} />
                <label className='absolute top-[7px] left-[12px] text-gray-700 text-md'>Amount BNB</label>
              </div>
              <div className="hidden justify-between gap-2 pt-2 pb-4 md:flex md:flex-row">
                <div className="group flex grow items-center justify-center rounded-xl bg-primary-dark-700 py-2 transition-all duration-200 hover:bg-primary-dark-600" onClick={() => { setAmount(parseInt(amount) - 1); if (amount === 1) { setAmount(1) } }}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true" className="w-4 stroke-gray-300 stroke-[4px] group-hover:stroke-gray-200">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4"></path>
                  </svg>
                </div>
                <div className="group flex grow items-center justify-center rounded-xl bg-primary-dark-700 py-2 transition-all duration-200 hover:bg-primary-dark-600" onClick={() => { setAmount(parseInt(amount) + 1); }}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true" className="w-4 stroke-gray-300 stroke-[4px] group-hover:stroke-gray-200">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4"></path>
                  </svg>
                </div>
              </div>
              {/* <div className="hidden md:block form-group relative my-2 mt-4">
                <input type="text" className='w-full py-2 pt-7 px-3 h-[65px] leading-[75px] rounded-md text-gray-300 border-2 border-slate-800 bg-primary-dark-600 focus:drop-shadow-green-sm focus:outline-none focus:shadow-none focus:border-lightGreen' onChange={(e) => { setDuration(parseInt(e.target.value)) }} value={duration + 'min'} />
                <label className='absolute top-[7px] left-[12px] text-gray-700 text-md'>Duration</label>
              </div> */}
              <div className="flex space-x-1 rounded-xl bg-primary-dark-600 py-2 mb-4" role="tablist" aria-orientation="horizontal">
                  <button className={duration === '10sec' ? "w-full rounded-lg py-2.5 px-1 text-sm font-medium leading-5 text-gray-300 bg-primary-dark-500 shadow" : "w-full rounded-lg py-2.5 px-1 text-sm font-medium leading-5 text-gray-300 shadow" } id="headlessui-tabs-tab-27" role="tab" type="button" aria-selected="true" tabindex="0" aria-controls="headlessui-tabs-panel-30" onClick={() => { setDuration('10sec') }}>10sec</button>
                  <button className={duration === '30sec' ? "w-full rounded-lg py-2.5 px-1 text-sm font-medium leading-5 text-gray-300 bg-primary-dark-500 shadow" : "w-full rounded-lg py-2.5 px-1 text-sm font-medium leading-5 text-gray-300 shadow" } id="headlessui-tabs-tab-28" role="tab" type="button" aria-selected="false" tabindex="-1" onClick={() => { setDuration('30sec') }}>30sec</button>
                  <button className={duration === '1min' ? "w-full rounded-lg py-2.5 px-1 text-sm font-medium leading-5 text-gray-300 bg-primary-dark-500 shadow" : "w-full rounded-lg py-2.5 px-1 text-sm font-medium leading-5 text-gray-300 shadow" } role="tab" type="button" aria-selected="false" tabindex="-1" onClick={() =>{ setDuration('1min') }}>1min</button>
                  <button className={duration === '100sec' ? "w-full rounded-lg py-2.5 px-1 text-sm font-medium leading-5 text-gray-300 bg-primary-dark-500 shadow" : "w-full rounded-lg py-2.5 px-1 text-sm font-medium leading-5 text-gray-300 shadow" } role="tab" type="button" aria-selected="false" tabindex="-1" onClick={() =>{ setDuration('100sec') }}>100sec</button>
              </div>
              {/* <div className="hidden justify-between gap-2 pt-2 pb-4 md:flex md:flex-row">
                <div className="group flex grow items-center justify-center rounded-xl bg-primary-dark-700 py-2 transition-all duration-200 hover:bg-primary-dark-600" onClick={() => { setDuration(parseInt(duration) - 1); if (duration === 1) { setDuration(1) } }}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true" className="w-4 stroke-gray-300 stroke-[4px] group-hover:stroke-gray-200">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4"></path>
                  </svg>
                </div>
                <div className="group flex grow items-center justify-center rounded-xl bg-primary-dark-700 py-2 transition-all duration-200 hover:bg-primary-dark-600" onClick={() => { setDuration(parseInt(duration) + 1); if (duration === 59) { setDuration(59) } }}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true" className="w-4 stroke-gray-300 stroke-[4px] group-hover:stroke-gray-200">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4"></path>
                  </svg>
                </div>
              </div> */}
              <div className='hidden md:block'>
                <div className="row-span-3 grid w-full grid-cols-2 gap-4 px-2 md:flex md:flex-col">
                  <button id="call-button" className="bg-[#389e22] hover:bg-[#44be29] flex h-auto select-none items-center justify-between rounded-md px-5 text-2xl font-extrabold text-primary-dark-800 text-opacity-60 transition-all duration-200 hover:text-primary-dark-600 hover:text-opacity-70 md:h-14 md:text-xl">
                    <div>Up</div>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true" className="w-9 stroke-[3px] md:w-8">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
                    </svg>
                  </button>
                  <button id="put-button" className="bg-[#be2944] hover:bg-[#ce2c4a] flex h-auto select-none items-center justify-between rounded-md px-5 text-2xl font-extrabold text-primary-dark-800 text-opacity-60 transition-all duration-200 hover:text-primary-dark-600 hover:text-opacity-70 md:h-14 md:text-xl">
                    <div>Down</div>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true" className="w-9 stroke-[3px] md:w-8">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"></path>
                    </svg>
                  </button>
                </div>
              </div>
              <div className="hidden md:block row-span-1 w-full select-none flex-row justify-center px-5 md:flex-col md:place-content-center md:p-2 mt-3">
                <div className="flex justify-center align-middle text-sm text-gray-600 md:text-base">Profitability:
                  <code className="pl-1 font-medium text-slate-400 md:pt-0.5 md:font-semibold">{profitablePercent}%</code>
                </div>
                {/* <div className="-mb-1 flex justify-center px-2 text-sm text-gray-100 md:w-full md:text-lg">+$0.42</div> */}
              </div>
            </div>
            <div className='block sm:hidden fixed left-0 bottom-12 w-full bg-black min-h-[30px] px-3 pb-2'>
              <div className="md:hidden row-span-1 flex w-full select-none flex-row justify-center px-5 md:flex-col md:place-content-center md:p-2 pt-1">
              <div className="flex justify-center align-middle text-sm text-gray-600 md:text-base">
                Profitability: <code className="pl-1 font-medium text-slate-400 md:pt-0.5 md:font-semibold">{profitablePercent}%</code>
                </div>
                {/* <div className="-mb-1 flex justify-center px-2 text-sm text-gray-100 md:w-full md:text-lg">+$0.42</div> */}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="form-group relative my-2 flex " style={{ justifyContent:"center" }}>
                  <button className={duration === '10sec' ? "w-full rounded-lg py-2.5 px-1 text-sm font-medium leading-5 text-gray-300 bg-primary-dark-500 shadow" : "w-full rounded-lg py-2.5 px-1 text-sm font-medium leading-5 text-gray-300 shadow" } id="headlessui-tabs-tab-27" role="tab" type="button" aria-selected="true" tabindex="0" aria-controls="headlessui-tabs-panel-30" onClick={() => { setDuration('10sec') }}>10s</button>
                  <button className={duration === '30sec' ? "w-full rounded-lg py-2.5 px-1 text-sm font-medium leading-5 text-gray-300 bg-primary-dark-500 shadow" : "w-full rounded-lg py-2.5 px-1 text-sm font-medium leading-5 text-gray-300 shadow" } id="headlessui-tabs-tab-28" role="tab" type="button" aria-selected="false" tabindex="-1" onClick={() => { setDuration('30sec') }}>30s</button>
                  <button className={duration === '1min' ? "w-full rounded-lg py-2.5 px-1 text-sm font-medium leading-5 text-gray-300 bg-primary-dark-500 shadow" : "w-full rounded-lg py-2.5 px-1 text-sm font-medium leading-5 text-gray-300 shadow" } role="tab" type="button" aria-selected="false" tabindex="-1" onClick={() =>{ setDuration('1min') }}>60s</button>
                  <button className={duration === '100sec' ? "w-full rounded-lg py-2.5 px-1 text-sm font-medium leading-5 text-gray-300 bg-primary-dark-500 shadow" : "w-full rounded-lg py-2.5 px-1 text-sm font-medium leading-5 text-gray-300 shadow" } role="tab" type="button" aria-selected="false" tabindex="-1" onClick={() =>{ setDuration('100sec') }}>100s</button>
                  {/* <button className='absolute -top-[11px] left-[12px] z-50 text-white text-[40px]' onClick={() => { setDuration(parseInt(duration) - 1); if (duration === 1) { setDuration(1) } }} >-</button>
                  <input type="text" className='w-full py-2 px-8 text-center rounded-md text-gray-300 border-2 border-slate-800 bg-primary-dark-600 focus:drop-shadow-green-sm focus:outline-none focus:shadow-none focus:border-lightGreen' onChange={(e) => { setDuration(parseInt(e.target.value)) }}  value={duration + 'min'} />
                  <button className='absolute -top-[9px] right-[12px] text-white text-[35px]' onClick={() => { setDuration(parseInt(duration) + 1); if (duration === 59) { setDuration(59) } }}>+</button> */}
                </div>
                <div className="form-group relative my-2">
                  <button className='absolute -top-[11px] left-[12px]  z-50 text-white text-[40px]' onClick={() => { setAmount(parseInt(amount) - 1); if (amount === 1) { setAmount(1) } }}>-</button>
                  <input type="text" className='w-full py-2 px-8 text-center rounded-md text-gray-300 border-2 border-slate-800 bg-primary-dark-600 focus:drop-shadow-green-sm focus:outline-none focus:shadow-none focus:border-lightGreen' onChange={(e) => { setAmount(parseInt(e.target.value)) }} value={amount} />
                  <button className='absolute -top-[9px] right-[12px] text-white text-[35px]' onClick={() => { setAmount(parseInt(amount) + 1); }}>+</button>
                </div>
              </div>
              <div className="row-span-3 grid w-full grid-cols-2 gap-x-5 md:flex md:flex-row">
                <button id="call-button" className="bg-[#389e22] hover:bg-[#44be29] flex select-none items-center justify-between rounded-md px-5 text-2xl font-extrabold text-primary-dark-800 text-opacity-70 transition-all duration-200 hover:text-primary-dark-600 hover:text-opacity-70 h-14 md:text-xl"
                  onClick = {() => {}}
                >
                  <div>Up</div>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true" className="w-9 stroke-[3px] md:w-8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
                  </svg>                
                </button>
                <button id="put-button" className="bg-[#be2944] hover:bg-[#ce2c4a] flex select-none items-center justify-between rounded-md px-5 text-2xl font-extrabold text-primary-dark-800 text-opacity-70 transition-all duration-200 hover:text-primary-dark-600 hover:text-opacity-70 h-14 md:text-xl"
                  onClick={ () => {}}
                >
                  <div>Down</div>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true" className="w-9 stroke-[3px] md:w-8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
