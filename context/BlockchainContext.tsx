// Tracks address:  0x23F264301a92e532998a23100691Da5C31f2f48f
// Profile address:  0xf4b6E8cb8028bD2955896de3BCeb687bBbbC3D81

import { createContext, useContext, useState, FC, useEffect, ReactNode } from "react";
import { BlockchainContextModal, BlockchainContextModalDefault } from "../modals/BlockchainContextModal";

import { getTracks, getTotalTracks, addTrack, getArtistTracks, getTracksAddedByArtist, getAllTracks } from './tracks_contract';
import { createProfile, getProfile, createNewTrack, isUsernameExisted, changeDescription, likeSong, likedSong, unlikeSong } from './profile_contract';

declare var window: any;

// context
export const ContractContext = createContext<BlockchainContextModal>(BlockchainContextModalDefault as BlockchainContextModal);
export const useContractContext = () => useContext(ContractContext);
// *** //


export const ContractProvider = ({ children }: { children: ReactNode }) => {

  const [account, setAccount] = useState();
  const [ethereum, setEthereum] = useState<any>();
  const [isWalletConnected, setIsWalletConnected] = useState<boolean>(false);

  const connectWallet = async () => {
    try {
      if (!ethereum) return alert("Please install MetaMask");

      const accounts = await ethereum.request({ method: "eth_requestAccounts" });
      setAccount(accounts[0]);
    } catch (err) {
      console.error(err);
      throw new Error("No ethereum object");
    }
  }

  const checkIfWalletIsConnected = async () => {
    try {
      if (!ethereum) return alert("Please install MetaMask");

      const accounts = await ethereum.request({ method: "eth_accounts" });

      if (accounts.length) {
        setAccount(accounts[0]);
        setIsWalletConnected(true);
      } else {
        console.info("No accounts found.");
      }
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    setEthereum(window.ethereum);
  }, [])

  useEffect(() => {
    if (ethereum !== undefined)
      checkIfWalletIsConnected();
  }, [ethereum])

  return (
    <ContractContext.Provider
      value={{
        connectWallet,
        isWalletConnected,
        getTracks,
        getTotalTracks,
        addTrack,
        getArtistTracks,
        getTracksAddedByArtist,
        createProfile,
        getProfile,
        createNewTrack,
        changeDescription,
        isUsernameExisted,
        getAllTracks,
        likedSong,
        unlikeSong,
        likeSong
      }}
    >
      {children}
    </ContractContext.Provider>
  )
}
