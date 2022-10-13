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

