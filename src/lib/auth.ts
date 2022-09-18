import {
  ADAPTER_EVENTS,
  CHAIN_NAMESPACES,
  CONNECTED_EVENT_DATA,
  WALLET_ADAPTERS,
} from "@web3auth/base";
import { Web3Auth } from "@web3auth/web3auth";
import { WEB3_AUTH_CLIENT_ID } from "../config";
import { providers } from "ethers";

export const web3auth = new Web3Auth({
  clientId: String(WEB3_AUTH_CLIENT_ID),
  chainConfig: {
    chainNamespace: CHAIN_NAMESPACES.EIP155,
    chainId: "0x1",
    rpcTarget: "https://rpc.ankr.com/eth", // This is the mainnet RPC we have added, please pass on your own endpoint while creating an app
  },
  uiConfig: {
    theme: "dark",
    loginMethodsOrder: ["facebook", "google"],
    appLogo: "https://web3auth.io/images/w3a-L-Favicon-1.svg", // Your App Logo Here
  },
});

export const subscribeAuthEvents = (web3auth: Web3Auth) => {
  //   web3auth.on(LOGIN_MODAL_EVENTS.MODAL_VISIBILITY, (isVisible) => {
  //     console.log("is modal visible", isVisible);
  //   });
  web3auth.on(ADAPTER_EVENTS.CONNECTED, (data: CONNECTED_EVENT_DATA) => {
    console.log("connected to wallet", data);
    // web3auth.provider will be available here after user is connected
  });
  web3auth.on(ADAPTER_EVENTS.CONNECTING, () => {
    console.log("connecting");
  });
  web3auth.on(ADAPTER_EVENTS.DISCONNECTED, () => {
    console.log("disconnected");
  });
  web3auth.on(ADAPTER_EVENTS.ERRORED, (error) => {
    console.log("error", error);
  });
  web3auth.on(ADAPTER_EVENTS.ERRORED, (error) => {
    console.log("error", error);
  });
};

export const initModal = async () => {
  await web3auth.initModal();
};

export const getUserData = async () => {
  return web3auth.getUserInfo();
};

export const logoutUser = async () => {
  return web3auth.logout({ cleanup: true });
};

export const getAuthenticateUser = async () => {
  return await web3auth.authenticateUser();
};

// export const getWeb3Provider = async ()=> {
//   const web3 = new Web3(web3auth.provider);

// // Get user's Ethereum public address
// const address = (await web3.eth.getAccounts())[0];

// // Get user's balance in ether
// const balance = web3.utils.fromWei(
//   await web3.eth.getBalance(address) // Balance is in wei
// );

export const getWeb3Provider = () => {
  if (!web3auth?.provider) return null;
  return new providers.Web3Provider(web3auth.provider);
};

export const getUserAddress = async () => {
  const web3Provider = getWeb3Provider();
  if (!web3Provider) return null;
  const signer = web3Provider.getSigner();
  return signer.getAddress();
};
