import {
    AUTH_LOGOUT,
    AUTH_SUCCESS,
    SET_CHAIN_ID,
    UPDATE_WEB3,
    UPDATE_USER_BALANCE,
    UPDATE_WALLET_STATUS,
    SET_WALLET_ADDR,
    UPDATE_CURRENT_USER,
    UPDATE_REFERAL_ADDRESS,
    UPDATE_CONSIDERING_PAIR,
    UPDATE_SHOW_CONTEFFI,
    UPDATE_AWARD_AMOUNT,
    UPDATE_REFERRAL_COUNTS,
    UPDATE_CURRENT_DEPOSITED,
    UPDATE_REMAINED_DOWNCOUNT
} from "./action.types"

export const updateRemainedDownCount = count => dispatch => {
    dispatch({
        type: UPDATE_REMAINED_DOWNCOUNT,
        payload: count
    })
}

export const authSet = (payload) => dispatch => {
    dispatch({
        type: AUTH_SUCCESS,
        payload: payload
    })
}

export const authLogout = () => dispatch => {
    dispatch({
        type: AUTH_LOGOUT,
        payload: {}
    })
}

export const setConnectedWalletAddress = (address) => dispatch => {
    dispatch({
        type: SET_WALLET_ADDR,
        payload: address
    })
}

export const setConnectedChainId = (chainId) => dispatch => {
    dispatch({
        type: SET_CHAIN_ID,
        payload: chainId
    })
}

export const updateBalanceOfUser = (balance) => dispatch => {
    //UPDATE_USER_BALANCE
    dispatch({
        type: UPDATE_USER_BALANCE,
        payload: balance
    })
}

export const setWalletStatus = (status) => dispatch => {
    dispatch({
        type: UPDATE_WALLET_STATUS,
        payload: status
    })
}

export const updateGlobalWeb3 = (object) => dispatch => {
    dispatch({
        type: UPDATE_WEB3,
        payload: object
    })
}

export const updateReferalAddress = (addr) => dispatch => {
    dispatch({
        type: UPDATE_REFERAL_ADDRESS,
        payload: addr
    })
}

export const updateConsideringPair = (pairStr) => dispatch => {
    dispatch({
        type: UPDATE_CONSIDERING_PAIR,
        payload: pairStr
    })
}

export const logOutUserAction = () => async (dispatch) => {
    dispatch(cleanCurrentUser());
    localStorage.removeItem("jwtToken");
}

export const cleanCurrentUser = () => async (dispatch) => {
    dispatch({
        type: UPDATE_CURRENT_USER,
        payload: {}
    })
}

export const setCurrentUserAction = (userInfo) => async (dispatch) => {
    //try to send data to the mongodb, if succeed, then dispatch

    dispatch({
        type: UPDATE_CURRENT_USER,
        payload: userInfo
    })

}

//UPDATE_SHOW_CONTEFFI

export const setConteffiflag = flag => dispatch => {
    //try to send data to the mongodb, if succeed, then dispatch

    dispatch({
        type: UPDATE_SHOW_CONTEFFI,
        payload: flag
    })

}

export const updateAwardAmount = amount => dispatch => {

    dispatch({
        type: UPDATE_AWARD_AMOUNT,
        payload: amount
    })
}


export const updateReferalCounts = amount => dispatch => {

    dispatch({
        type: UPDATE_REFERRAL_COUNTS,
        payload: amount
    })
}

export const updateCurrentDeposited = amount => dispatch => {

    dispatch({
        type: UPDATE_CURRENT_DEPOSITED,
        payload: amount
    })
}