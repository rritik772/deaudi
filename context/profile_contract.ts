import { ethers } from "ethers";
import ProfileModal, { ProfileDefault } from "../modals/ProfileModal";
import { ProfileABI } from "../utils/constant";

const createProfileContract = (ethereum: any): ethers.Contract => {
  // const provider = new ethers.providers.Web3Provider(ethereum);
  const provider = new ethers.providers.WebSocketProvider("ws://127.0.0.1:8545/")
  const signer = provider.getSigner();

  const trackContract = new ethers.Contract(
    // process.env.PROFILECONTRACTADDRESS || '',
    // "0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9",
    "0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9",
    ProfileABI,
    signer
  );

  return trackContract;
}

export async function createProfile(ethereum: any, profile: ProfileModal): Promise<boolean> {
  try {
    const contract = createProfileContract(ethereum);
    await contract.createProfile(
      profile.name,
      profile.description,
      profile.username,
      []
    );

    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
}

export async function getProfile(ethereum: any): Promise<ProfileModal> {
  try {
    const contract = createProfileContract(ethereum);
    const profile = await contract.getProfile();

    return profile;
  } catch (err) {
    console.error(err);
    return ProfileDefault;
  }
}

export async function createNewTrack(ethereum: any): Promise<boolean> {
  try {
    const contract = createProfileContract(ethereum);
    await contract.createdNewTrack();

    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
}

export async function changeDescription(ethereum: any, desc: string): Promise<boolean> {
  try {
    const contract = createProfileContract(ethereum);
    await contract.changeDescription(desc);

    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
}

export async function isUsernameExisted(ethereum: any, username: string): Promise<boolean> {
  try {
    const contract = createProfileContract(ethereum);
    const isExisted = await contract.isUsernameExisted(username);

    return isExisted;
  } catch (err) {
    console.error(err);
    return false;
  }
}

export async function likeSong(ethereum: any, index: number): Promise<boolean> {
  try {
    const contract = createProfileContract(ethereum);
    await contract.likeSong(index);

    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
}

export async function likedSong(ethereum: any): Promise<number[]> {
  try {
    const contract = createProfileContract(ethereum);
    const liked = await contract.likedSong();

    return liked;
  } catch (err) {
    console.error(err);
    return [];
  }
}

export async function unlikeSong(ethereum: any, index: number): Promise<boolean> {
  try {
    const contract = createProfileContract(ethereum);
    await contract.unlikeSong(index);

    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
}
