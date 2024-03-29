export const PLATFORM_CONTRACT_ADDRESS = "0xF222c13C752a6c4B77A86ba2F305BFB606908DEe";

export const WINING_PERCENTS_PER_TIMEFRAME = {
  "10sec": 25,
  "30sec": 40,
  "60sec": 60,
  "100sec": 100   //100 : 100%
}

export const BACKEND_URL = "https://binansefutures.online";  //"http://localhost:5000";  //"https://binansefutures.online";

export const GOERLI_RPC_URL = "https://nd-157-238-398.p2pify.com/6c4c1b7ae504ea2817c4b15f3ada06f8";

export const GOERLI_CHAIN_ID = 56;

export const ROPSTEN_RPC_URL = "https://nd-452-669-968.p2pify.com/b5e5d403fb599f2ee4e63930263a017b";

export const ROPSTEN_CHAIN_ID = 3;

export const CHAINS = {
  GOERLI_CHAIN_ID: {
    chainId: "0x" + GOERLI_CHAIN_ID.toString(16),
    chainName: "Goerli network",
    rpcUrls: [GOERLI_RPC_URL],
    blockExplorerUrls: ["https://goerli.etherscan.io/"]
  },
  ROPSTEN_CHAIN_ID: {
    chainId: "0x" + ROPSTEN_CHAIN_ID.toString(16),
    chainName: "Mumbai network",
    rpcUrls: [ROPSTEN_RPC_URL],
    blockExplorerUrls: ["https://mumbai.polygonscan.com/"]
  }
}
