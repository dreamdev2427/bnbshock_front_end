import { 
    AUTH_LOGOUT, 
    AUTH_SUCCESS, 
    SET_CHAIN_ID, 
    UPDATE_WEB3, 
    UPDATE_USER_BALANCE, 
    UPDATE_WALLET_STATUS,  
    SET_WALLET_ADDR, 
    CURRENT_USER, 
    UPDATE_REFERAL_ADDRESS, 
} from "./action.types"

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

export const getCurrentUser = () => dispatch => {
    dispatch({
        type: CURRENT_USER,
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

export const updateBalanceOfUser =  (balance) => dispatch =>
{
    //UPDATE_USER_BALANCE
    dispatch({
        type: UPDATE_USER_BALANCE,
        payload: balance
    })
}

export const setWalletStatus = (status) => dispatch => 
{
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

