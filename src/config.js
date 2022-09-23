export const PLATFORM_CONTRACT_ADDRESS = "0xb5d1636Db1C90B37c178c68aFBB9a519dc40b3E2";

export const WINING_PERCENTS_PER_TIMEFRAME = {
    "10sec" : 10,
    "30sec" : 30,
    "60sec" : 50,
    "100sec" : 100   //100 : 100%
  }

export  const BACKEND_URL = "https://berryjuicer.com";

export  const ETHEREUM_RPC_URL = "https://nd-264-440-618.p2pify.com/dfea93c53f746df50abf978de2e2e7ad";

export  const ETHEREUM_CHAIN_ID = 5;

export  const POLYGON_RPC_URL = "https://nd-129-163-341.p2pify.com/155790d84cb60622110199d880d46d08";

export const POLYGON_CHAIN_ID = 80001;

export  const CHAINS = {
    ETHEREUM_CHAIN_ID: {
      chainId: "0x"+ETHEREUM_CHAIN_ID.toString(16),
      chainName: "Goerli network",
      rpcUrls: [ETHEREUM_RPC_URL],
      blockExplorerUrls: ["https://goerli.etherscan.io/"]
    },
    POLYGON_CHAIN_ID: {
      chainId: "0x"+POLYGON_CHAIN_ID.toString(16),
      chainName: "Mumbai network",
      rpcUrls: [POLYGON_RPC_URL],
      blockExplorerUrls: ["https://mumbai.polygonscan.com/"]
    }
  }

