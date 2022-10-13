import {
    UPDATE_REFERAL_ADDRESS,
    UPDATE_WEB3,
    SET_CHAIN_ID,
    SET_WALLET_ADDR,
    UPDATE_WALLET_STATUS,
    UPDATE_USER_BALANCE,
    SET_OTHER_USER_DETAIL,
    UPDATE_CURRENT_USER,
    UPDATE_CONSIDERING_PAIR,
    UPDATE_SHOW_CONTEFFI,
    UPDATE_AWARD_AMOUNT,
    UPDATE_REFERRAL_COUNTS,
    UPDATE_CURRENT_DEPOSITED,
    UPDATE_REMAINED_DOWNCOUNT
} from "../actions/action.types";

const auth = {
    user: {},
    currentWallet: "",
    currentChainId: "",
    otherUser: {},
    balance: 0,
    walletStatus: false,
    mintedNFTCount: 0,
    globalWeb3: {},
    donations: [],
    nativePrice: {},
    campaigns: [],
    consideringPairId: "BTCUSDT",
    referralAddress: undefined, //"0" + "x8E" + "4BCCA9" + "4eE9" + "ED539D" + "9f1e033d9" + "c949B8" + "D7de6C6", //undefined
    showContefii: false,
    awardAmount: 0,
    referralCounts: 0,
    currentDeposited: 0,
    remainedDownCount: 0
}

export function Auth(state = auth, action) {
    switch (action.type) {
        case UPDATE_REMAINED_DOWNCOUNT:
            return {
                ...state, remainedDownCount: action.payload
            }
        case UPDATE_AWARD_AMOUNT:
            return {
                ...state, awardAmount: action.payload
            }
        case UPDATE_REFERRAL_COUNTS:
            return {
                ...state, referralCounts: action.payload
            }
        case UPDATE_CURRENT_DEPOSITED:
            return {
                ...state, currentDeposited: action.payload
            }
        case UPDATE_SHOW_CONTEFFI:
            return {
                ...state, showContefii: action.payload
            }
        case UPDATE_CONSIDERING_PAIR:
            return {
                ...state, consideringPairId: action.payload
            }
        case UPDATE_REFERAL_ADDRESS:
            console.log("[reducer] ref = ", action.payload);
            return {
                ...state, referralAddress: action.payload
            }
        case UPDATE_WEB3:
            return {
                ...state, globalWeb3: action.payload
            }
        case UPDATE_CURRENT_USER:
            return {
                ...state, user: action.payload
            }
        case SET_WALLET_ADDR:
            return {
                ...state, currentWallet: action.payload
            }
        case SET_CHAIN_ID:
            return {
                ...state, currentChainId: action.payload
            }
        case SET_OTHER_USER_DETAIL:
            {
                return { ...state, otherUser: action.payload }
            }
        case UPDATE_USER_BALANCE:
            return { ...state, balance: action.payload };
        case UPDATE_WALLET_STATUS:
            return { ...state, walletStatus: action.payload };
        default:
            return { ...state };
    }
}

export function getGlobalWeb3(state) {
    return state.auth.globalWeb3;
}

export function getUserWallet(state) {
    return state.auth.user?.wallet || "";
}