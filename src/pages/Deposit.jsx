import React from 'react'
import { useState } from 'react'
import SideBar from '../components/SideBar'

export default function Home() {
  const [amount, setAmount] = useState(30);
  const [answer, setAnswer] = useState('');
  const [tab, setTab] = useState('faq');

  const amountData = [
    { amount: 30, text: '$30 + 5% bonus' },
    { amount: 100, text: '$100 + 5% bonus' },
    { amount: 250, text: '$250 + 5% bonus' },
    { amount: 500, text: '$500 + 10% bonus' },
    { amount: 750, text: '$750 + 15% bonus' },
    { amount: 1000, text: '$1000 + 20% bonus' },
    { amount: 1500, text: '$1500 + 25% bonus' },
    { amount: 2000, text: '$2000 + 30% bonus' },
    { amount: 5000, text: '$5000 + 35% bonus' },
    { amount: 10000, text: '$10000 + 40% bonus' },
    { amount: 15000, text: '$15000 + 45% bonus' },
    { amount: 20000, text: '$20000 + 50% bonus' },
  ];

  const faqData = [
    { id: 1, question: 'How can I make a deposit?', answer: 'We currently support Bitcoin, Bitcoin Cash, DAI, Ethereum, Litecoin and Dogecoin. Payment by debit card is currently unavailable.' },
    { id: 2, question: 'How long does it take for a transaction to go through the blockchain?', answer: 'This depends on how busy the network is at any given time. Usually confirmation time varies from 5 minutes to several hours.' },
    { id: 3, question: 'I have paid, but the money don\'t appear on my balance.', answer: 'Check again if you sent money to the right wallet. Also note that transactions in blockchain take time.' },
    { id: 4, question: 'What is the minimum deposit amount?', answer: 'Minimal deposit is $30' },
    { id: 5, question: 'What\'ll happen if I\'ll deposit less?', answer: 'If you deposit less than $30, you won\'t be able to trade. You\'ll have to deposit more to start trading. ' },
    { id: 6, question: 'What to do, if I accidentally sent money to a wrong wallet?', answer: 'If it happens, contact our support, and we\'ll try to do our best to help you.' },
    { id: 7, question: 'How does the bonus system work?', answer: 'Bonuses are credited according to the amount deposited. When you trade, first your real deposit amount is deducted from your account, and only then bonus funds are deducted. ' },
    { id: 8, question: 'How to withdraw bonus funds?', answer: 'To withdraw your bonus money you need to make such amount of trades that their total sum (without considering your real deposit) is 20 times more than the bonus amount (for example: 200$ bonus = 4000$ total trades). If you\'ll try to make a withdrawal before the bonus conditions are met, all bonuses will burned. In this case only real funds will be deducted from your account.' },
    { id: 9, question: 'Can I refuse the bonus?', answer: 'Yes, you can refuse the bonus by contacting our support team. In that case you do not need to fulfill any conditions for withdrawal.' },
  ];

  const historyData = [
    { orderId: '631cba6ae7c23dc525d2b620', date: '2022-09-10 16:25:14.197', requestAmount: '$250.00', receivedAmount: '$0.00', status: 'failded' },
    { orderId: '631cba6ae7c23dc525d2b620', date: '2022-09-10 16:25:14.197', requestAmount: '$250.00', receivedAmount: '$0.00', status: 'failded' },
    { orderId: '631cba6ae7c23dc525d2b620', date: '2022-09-10 16:25:14.197', requestAmount: '$250.00', receivedAmount: '$0.00', status: 'failded' }
  ];

  return (
    <div className='home deposit min-h-screen'>
      {/* sidebar */}
      <SideBar />

      {/* main content */}
      <div className='md:ml-24 ml-0'>
        {/* top bar */}
        <div className="top-bar py-8 bg-black px-7 sticky top-0 z-10">
          <h2 className='text-white text-2xl'>Deposit</h2>
        </div>
        {/* main content */}
        <div className="content bg-primary-dark-900 min-h-screen md:px-20 px-6 py-6 md:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-20 gap-y-12">
            <div className="left">
              <div className='bg-primary-dark-700 p-6 rounded'>
                <h3 className="text-center text-white text-2xl font-semibold">Select deposit amount:</h3>
                <div className="grid grid-cols-2 gap-2 my-5">
                  {amountData.map((data, index) => (
                    <button className={amount === data.amount ? 'drop-shadow-green-md rounded-md border-2 border-slate-800 bg-primary-dark-600 py-4 text-white hover:bg-primary-dark-500 hover:drop-shadow-green-md xs:p-4' : 'rounded-md border-2 border-slate-800 bg-primary-dark-600 py-4 text-white hover:bg-primary-dark-500 hover:drop-shadow-green-md xs:p-4'} onClick={(e) => { setAmount(data.amount) }} key={index}>{data.text}</button>
                  ))}
                </div>
                <div className="form-group relative my-2">
                  <input type="number" className='w-full py-2 px-7 rounded-md text-gray-300 border-2 border-slate-800 bg-primary-dark-600 focus:drop-shadow-green-sm focus:outline-none focus:shadow-none focus:border-lightGreen' value={amount} />
                  <label className='absolute top-[7px] left-[12px] text-gray-700 text-xl'>$</label>
                </div>
                <div className="form-group my-2 mt-4">
                  <button className='bg-primaryGreen text-white text-xl w-full rounded-md h-[45px] leading-[45px] text-center uppercase font-semibold'>Continue</button>
                </div>
                <div className="flex flex-col gap-1 text-gray-300 text-opacity-80">
                  <span>If you deposit this amount you'll receive <span className="text-gray-100">$1.50 bonus</span>.</span>
                  <span>Your account will be <span className='text-white'>Base</span> after deposit this amount (scroll below for more details)</span>
                  <span><span className="">Now your total amount of deposits is $0.00</span></span>
                </div>
              </div>
            </div>
            <div className="right">
              <div className='bg-primary-dark-700 p-6 rounded h-full'>
                <div className="flex justify-start">
                  <button className={tab === 'faq' ? 'pb-2 text-lightGreen font-semibold text-md w-1/2 text-left border-b-4 border-lightGreen' : 'font-semibold text-md text-gray-500 w-1/2 text-left border-b-4 border-gray-600 pb-2'} onClick={() => { setTab('faq') }}>FAQ</button>
                  <button className={tab === 'history' ? 'pb-2 text-lightGreen font-semibold text-md w-1/2 text-left border-b-4 border-lightGreen' : 'font-semibold text-md text-gray-500 w-1/2 text-left border-b-4 border-gray-600 pb-2'} onClick={() => { setTab('history') }}>History</button>
                </div>
                {tab === 'faq' ?
                  <>
                    <div className="faqs my-4">
                      {faqData.map((faq, index) => (
                        <div className="single-faq my-2" key={index}>
                          <div className="question flex justify-between py-2 px-4 rounded-md bg-primary-dark-500" onClick={() => { setAnswer(faq.id); if (answer === faq.id) { setAnswer(null) } }}>
                            <h4 className='text-gray-300 text-xl font-semibold'>{faq.question}</h4>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" className={answer === faq.id ? "rotate-360 h-5 w-5 transition-transform duration-300 text-white" : "rotate-180 h-5 w-5 transition-transform duration-300 text-white"}><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path>
                            </svg>
                          </div>
                          {answer === faq.id ? <>
                            <div class="answer my-2 rounded-md bg-primary-dark-600 p-3 text-xl text-white" id="headlessui-disclosure-panel-100">{faq.answer}</div>
                          </> : ''}
                        </div>
                      ))}
                    </div>
                  </>
                  :
                  <>
                    <div className="history my-4">
                      { historyData.map((history,index)=>(
                        <div className="single-history my-2" key={index}>
                          <div class="flex flex-col rounded-md bg-primary-dark-600 p-4">
                            <div class="flex w-full flex-row">
                              <div class="flex min-w-max grow-0 flex-nowrap items-end break-normal text-sm text-gray-400 text-opacity-60">Order</div>
                              <div class="mb-1 min-w-[20px] grow border-b-[1px] border-dotted border-gray-600"></div>
                              <div class="grow-0 select-all break-normal text-sm text-gray-400 text-opacity-90" datatest="Order">{history.orderId}</div>
                            </div>
                            <div class="flex w-full flex-row">
                              <div class="flex min-w-max grow-0 flex-nowrap items-end break-normal text-sm text-gray-400 text-opacity-60">Date</div>
                              <div class="mb-1 min-w-[20px] grow border-b-[1px] border-dotted border-gray-600"></div>
                              <div class="grow-0 select-all break-normal text-sm text-gray-400 text-opacity-90" datatest="Date">{history.date}</div>
                            </div>
                            <div class="flex w-full flex-row">
                              <div class="flex min-w-max grow-0 flex-nowrap items-end break-normal text-sm text-gray-400 text-opacity-60">Amount requested</div>
                              <div class="mb-1 min-w-[20px] grow border-b-[1px] border-dotted border-gray-600"></div>
                              <div class="grow-0 select-all break-normal text-sm text-gray-400 text-opacity-90" datatest="Amount requested">{history.requestAmount}</div>
                            </div>
                            <div class="flex w-full flex-row">
                              <div class="flex min-w-max grow-0 flex-nowrap items-end break-normal text-sm text-gray-400 text-opacity-60">Amount received</div>
                              <div class="mb-1 min-w-[20px] grow border-b-[1px] border-dotted border-gray-600"></div>
                              <div class="grow-0 select-all break-normal text-sm text-gray-400 text-opacity-90" datatest="Amount received">{history.receivedAmount}</div>
                            </div>
                            <div class="flex w-full flex-row">
                              <div class="flex min-w-max grow-0 flex-nowrap items-end break-normal text-sm text-gray-400 text-opacity-60">Status</div>
                              <div class="mb-1 min-w-[20px] grow border-b-[1px] border-dotted border-gray-600"></div>
                              <div class="grow-0 select-all break-normal text-sm text-gray-400 text-opacity-90" datatest="Status">
                                <span class="text-red-600">{history.status}</span>
                              </div>
                            </div>
                          </div>
                        </div>

                      ))}
                    </div>
                  </>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
