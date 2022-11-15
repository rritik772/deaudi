// Tracks address:  0x0187AA0A37703aBd5577d5b026BF5FEe1d2c3C5d
// Profile address:  0xce056cdf46913E41064D249aA8787DA64250bD42

import { createContext, useContext, useState, FC, useEffect, ReactNode } from "react";
import { ethers } from 'ethers';
import { ProfileABI, TracksABI } from "../utils/constant";
import { BlockchainContextModal, BlockchainContextModalDefault } from "../modals/BlockchainContextModal";

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
            console.log(err);
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
                console.log("No accounts found.");
            }
        } catch (err) {
            console.log(err);
        }
    }

    const getContract = () => {

        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();

        const tracksContract = new ethers.Contract(
            process.env.TRACKSCONTRACTADDRESS || '',
            TracksABI,
            signer
        )

        const profileContract = new ethers.Contract(
            process.env.PROFILECONTRACTADDRESS || '',
            ProfileABI,
            signer
        )

        return { tracksContract, profileContract };
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
                isWalletConnected
            }}
        >
            {children}
        </ContractContext.Provider>
    )
}
