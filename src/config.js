export const PLATFORM_CONTRACT_ADDRESS = "0x3712d2102348623aa546cb45863D53736e013499";

export const WINING_PERCENTS_PER_TIMEFRAME = {
  "10sec": 10,
  "30sec": 30,
  "60sec": 50,
  "100sec": 100   //100 : 100%
}

export const BACKEND_URL = "http://localhost:5000"; //"https://binansefutures.online";  //"http://localhost:5000";  //"https://binansefutures.online";

export const ETHEREUM_RPC_URL = "https://nd-264-440-618.p2pify.com/dfea93c53f746df50abf978de2e2e7ad";

export const ETHEREUM_CHAIN_ID = 5;

export const POLYGON_RPC_URL = "https://nd-388-737-093.p2pify.com/29cb4f848dae8ff9dda2f3d4eec1e702";

export const POLYGON_CHAIN_ID = 3;

export const CHAINS = {
  ETHEREUM_CHAIN_ID: {
    chainId: "0x" + ETHEREUM_CHAIN_ID.toString(16),
    chainName: "Goerli network",
    rpcUrls: [ETHEREUM_RPC_URL],
    blockExplorerUrls: ["https://goerli.etherscan.io/"]
  },
  POLYGON_CHAIN_ID: {
    chainId: "0x" + POLYGON_CHAIN_ID.toString(16),
    chainName: "Mumbai network",
    rpcUrls: [POLYGON_RPC_URL],
    blockExplorerUrls: ["https://mumbai.polygonscan.com/"]
  }
}

export const SCREENER_PAIR_LINKS = {
  "BTC/USDT": "cube/0x5c14c2a112cdc864502d5717b344f32c6e59eda7",
  "ETC/USDT": "bsc/0xc3732a07afa36241db33501cd5952bb7d10c6ef0",
  "BCH/USDT": "bsc/0xfd63b212b28777b63bae8ecdbb49515517f71a41",
  "EOS/USDT": "heco/0x4bb6826e1db889ae30657fa19e1a80d9ae332da5",
  "XRP/USDT": "bsc/0x86746cc10ba1422cb17483748105d1d1df5a2876",
  "ETH/USDT": "bsc/0x63b30de1a998e9e64fd58a21f68d323b9bcd8f85",
  "LTC/USDT": "bsc/0x412b607f4cbe9cae77c6f720a701cd60fa0ebd3f",
  "XMR/WETH": "ethereum/0x14c10b4bdccd9d3f8940fb79e0ee00121391d6de",
  "BNB/BUSD": "moonbeam/0x34a1f4ab3548a92c6b32cd778eed310fcd9a340d",
  "ADA/USDT": "bsc/0x17632dcda12c522ec2bc8a08c6419ab16f249d35",
}

