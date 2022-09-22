import React, { useState } from 'react'
import { NavLink } from 'react-router-dom';

export default function SideBar() {
    const [menu, setMenu] = useState(false);
    const [tab, setTab] = useState('name');

    return (
        <div>
            <div className='sidebar bg-black md:w-24 w-full fixed left-0 bottom-0 md:h-full h-12 z-50 px-4 md:px-0'>
                <div className="mt-2 flex h-full w-full md:flex-col flex-row md:justify-start justify-between">
                    <div id="logo" className='mb-3 h-20 w-[6.4rem] pt-2 hidden md:flex justify-center items-center pl-2 z-50 bg-black'>
                        <img src="/images/icon.png" alt="icon" className='w-16' />
                    </div>
                    <div className="drop-shadow-neon-green-sm relative md:hidden block">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" role="presentation" focusable="false" aria-hidden="true" className="fill-primary-green-100 drop-shadow-green-md h-7 w-7">
                            <path fillRule="evenodd" d="M7 2a5 5 0 00-5 5v10a5 5 0 005 5h10a5 5 0 005-5V7a5 5 0 00-5-5H7zm13 10V7a3 3 0 00-3-3H7a3 3 0 00-3 3v8h1.441l1.495-2.429A1.2 1.2 0 017.958 12h3.402l2.333-5.055a1.2 1.2 0 012.147-.066L18.597 12H20zM4 17h1.888a1.2 1.2 0 001.022-.571L8.405 14h3.467a1.2 1.2 0 001.09-.697l1.876-4.066 2.225 4.132a1.2 1.2 0 001.056.631H20v3a3 3 0 01-3 3H7a3 3 0 01-3-3z" clipRule="evenodd">
                            </path>
                        </svg>
                    </div>
                    <div id="Trades" className="cursor-pointer group md:m-1 md:mt-2 flex md:h-20 h-12 select-none flex-col items-center rounded-md md:py-2 transition-all duration-100 hover:bg-primary-dark-600">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" role="presentation" focusable="false" aria-hidden="true" className="md:h-12 md:w-12 h-7 w-7 transition-all duration-100 fill-primary-dark-300 group-hover:fill-gray-300">
                            <path fillRule="evenodd" d="M6.756 3H12a1 1 0 011 1v5.308a1 1 0 11-2 0V6.414l-6.293 6.293a1 1 0 01-1.414-1.414L9.586 5h-2.83a1 1 0 010-2zm13.951 8.293a1 1 0 010 1.414L14.414 19h2.83a1 1 0 110 2H12a1 1 0 01-1-1v-5.308a1 1 0 012 0v2.894l6.293-6.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                        </svg>
                        <div className="text-primary-dark-100 group-hover:text-gray-300 mt-2 md:block hidden">Trades</div>
                    </div>
                    <div id="Profile" className="cursor-pointer group md:m-1 md:mt-2 flex md:h-20 h-12 select-none flex-col items-center rounded-md md:py-2 transition-all duration-100 hover:bg-primary-dark-600" onClick={() => { setMenu('profile') }}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"strokeWidth="2" stroke="currentColor" aria-hidden="true" className="md:h-12 md:w-12 h-7 w-7 transition-all duration-100 stroke-primary-dark-300 group-hover:stroke-gray-300">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                        </svg>
                        <div className="text-primary-dark-100 group-hover:text-gray-300 mt-2 md:block hidden">Profile</div>
                    </div>
                    <div id="Finance" className="cursor-pointer group md:m-1 md:mt-2 flex h-20 select-none flex-col items-center rounded-md md:py-2 transition-all duration-100 hover:bg-primary-dark-600">
                        <svg xmlns="http://www.w3.org/2000/svg" className="md:h-12 md:w-12 h-7 w-7 transition-all duration-100 fill-primary-dark-300 group-hover:fill-gray-300" viewBox="0 0 24 24" aria-hidden="true">
                            <path fillRule="evenodd" d="M17 4.775a1 1 0 00-1.316-.949L9.162 6H17V4.775zM19 6V4.775a3 3 0 00-3.949-2.846l-11 3.666A3 3 0 002 8.442V17a3 3 0 003 3h14a3 3 0 003-3V9a3 3 0 00-3-3zM5 8a1 1 0 00-1 1v8a1 1 0 001 1h14a1 1 0 001-1V9a1 1 0 00-1-1H5z">
                            </path>
                            <path d="M16 13a1 1 0 111.998 0A1 1 0 0116 13z"></path>
                        </svg>
                        <div className="text-primary-dark-100 group-hover:text-gray-300 mt-2 md:block hidden">Finance</div>
                    </div>
                    <div id="Support" className="cursor-pointer group md:m-1 md:mt-2 flex md:h-20 h-12 select-none flex-col items-center rounded-md md:py-2 transition-all duration-100 hover:bg-primary-dark-600">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"strokeWidth="2" stroke="currentColor" aria-hidden="true" className="md:h-12 md:w-12 h-7 w-7 transition-all duration-100 stroke-primary-dark-300 group-hover:stroke-gray-300">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z">
                                </path>
                            </svg>
                        <div className="text-primary-dark-100 group-hover:text-gray-300 mt-2 md:block hidden">Support</div>
                    </div>
                </div>
            </div>
            {menu === 'profile' ? <>
                <div className="profile-menu-content bg-black md:ml-24 fixed sm:w-96 w-80 h-full px-2.5 top-0 left-0 z-50 overflow-y-auto">
                    <div className="flex justify-between bg-black sticky top-0 py-6">
                        <h2 className='text-2xl text-white font-semibold'>Profile and settings</h2>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true" className="w-10 h-10 text-white" onClick={() => { setMenu(false) }}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </div>
                    <div className="profile-main py-20">
                        <div className='block'>
                            <NavLink to={'/'} className="w-auto uppercase bg-primaryGreen px-4 py-3 rounded-md text-center text-white font-semibold">Request demo balance</NavLink>
                        </div>
                        <div className='mt-6 block'>
                            <NavLink to={'/'} className="inline-block w-auto uppercase bg-primaryGreen px-4 py-3 rounded-md text-center text-white font-semibold">Affiliate</NavLink>
                        </div>
                    </div>
                    <div className="flex space-x-1 rounded-xl bg-primary-dark-600 p-1" role="tablist" aria-orientation="horizontal">
                        <button className={tab === 'name' ? "w-full rounded-lg py-2.5 px-1 text-sm font-medium leading-5 text-gray-300 bg-primary-dark-500 shadow" : "w-full rounded-lg py-2.5 px-1 text-sm font-medium leading-5 text-gray-300 shadow" } id="headlessui-tabs-tab-27" role="tab" type="button" aria-selected="true" tabindex="0" aria-controls="headlessui-tabs-panel-30" onClick={() => { setTab('name') }}>Change name</button>
                        <button className={tab === 'email' ? "w-full rounded-lg py-2.5 px-1 text-sm font-medium leading-5 text-gray-300 bg-primary-dark-500 shadow" : "w-full rounded-lg py-2.5 px-1 text-sm font-medium leading-5 text-gray-300 shadow" } id="headlessui-tabs-tab-28" role="tab" type="button" aria-selected="false" tabindex="-1" onClick={() => { setTab('email') }}>Change email</button>
                        <button className={tab === 'password' ? "w-full rounded-lg py-2.5 px-1 text-sm font-medium leading-5 text-gray-300 bg-primary-dark-500 shadow" : "w-full rounded-lg py-2.5 px-1 text-sm font-medium leading-5 text-gray-300 shadow" } role="tab" type="button" aria-selected="false" tabindex="-1" onClick={() =>{ setTab('password') }}>Change password</button>
                    </div>
                    <div className="tab-content mt-3">
                        { tab === 'name' ? <>
                            <div className="name">
                                <div className="mt-7 flex flex-col">
                                    <div className="flex flex-col content-center justify-center gap-2">
                                        <label className="text-xl font-semibold text-gray-200">Enter your name</label>
                                        <input type="text" name="nname" className="w-full py-2 px-3 rounded-md text-gray-300 border-2 border-slate-800 bg-primary-dark-600 focus:drop-shadow-green-sm focus:outline-none focus:shadow-none focus:border-lightGreen mb-3" placeholder="Enter your name" />
                                        <button className="border-2 border-lightGreen rounded-xl text-white uppercase h-12 w-full text-sm">SAVE</button>
                                    </div>
                                </div>
                            </div>
                        </> : ''}
                        { tab === 'email' ? <>
                            <div className="email">
                                <div className="mt-7 flex flex-col">
                                    <div className="flex flex-col content-center justify-center gap-2">
                                        <label className="text-xl font-semibold text-gray-200">Change your email address</label>
                                        <input type="email" name="email" className="w-full py-2 px-3 rounded-md text-gray-300 border-2 border-slate-800 bg-primary-dark-600 focus:drop-shadow-green-sm focus:outline-none focus:shadow-none focus:border-lightGreen mb-1" placeholder="Enter your email" />
                                        <input type="email" name="email" className="w-full py-2 px-3 rounded-md text-gray-300 border-2 border-slate-800 bg-primary-dark-600 focus:drop-shadow-green-sm focus:outline-none focus:shadow-none focus:border-lightGreen mb-3" placeholder="Re-Enter your email" />
                                        <button className="border-2 border-lightGreen rounded-xl text-white uppercase h-12 w-full text-sm">SAVE</button>
                                    </div>
                                </div>
                            </div>
                        </> : ''}
                        { tab === 'password' ? <>
                            <div className="password">
                                <div className="mt-7 flex flex-col">
                                    <div className="flex flex-col content-center justify-center gap-2">
                                        <label className="text-xl font-semibold text-gray-200">Change your password</label>
                                        <input type="password" name="password" className="w-full py-2 px-3 rounded-md text-gray-300 border-2 border-slate-800 bg-primary-dark-600 focus:drop-shadow-green-sm focus:outline-none focus:shadow-none focus:border-lightGreen mb-1" placeholder="Your current password" />
                                        <input type="password" name="password" className="w-full py-2 px-3 rounded-md text-gray-300 border-2 border-slate-800 bg-primary-dark-600 focus:drop-shadow-green-sm focus:outline-none focus:shadow-none focus:border-lightGreen mb-1" placeholder="New password" />
                                        <input type="password" name="password" className="w-full py-2 px-3 rounded-md text-gray-300 border-2 border-slate-800 bg-primary-dark-600 focus:drop-shadow-green-sm focus:outline-none focus:shadow-none focus:border-lightGreen mb-3" placeholder="Re-Enter your password" />
                                        <button className="border-2 border-lightGreen rounded-xl text-white uppercase h-12 w-full text-sm">SAVE</button>
                                    </div>
                                </div>
                            </div>
                        </> : ''}
                    </div>
                </div>
            
            </> : ''}
        </div>
    )
}
