import { ethers } from 'ethers';
import { TracksABI } from '../utils/constant';
import TrackModal, { TrackModalDefault } from './../modals/Tracks';

const createTrackContract = (ethereum: any): ethers.Contract => {
  // const provider = new ethers.providers.Web3Provider(ethereum);
  const provider = new ethers.providers.WebSocketProvider("ws://127.0.0.1:8545/")
  const signer = provider.getSigner();

  const trackContract = new ethers.Contract(
    // process.env.TRACKSCONTRACTADDRESS || '',
    // "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9",
    "0x5FbDB2315678afecb367f032d93F642f64180aa3",
    TracksABI,
    signer
  );

  return trackContract;
}

export async function addTrack(ethereum: any, modal: TrackModal): Promise<boolean> {
  try {
    const contract = createTrackContract(ethereum);
    await contract.addTrack(
      modal.name,
      modal.trackId,
      modal.imgUrl,
      modal.IPFSHash,
      modal.description,
      modal.artists,
      modal.album,
      modal.addedByName
    );

    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
}

export async function getTracks(ethereum: any, name: string): Promise<TrackModal[]> {
  try {
    const contract = createTrackContract(ethereum);
    const tracks = await contract.getTracks(name);

    const s_tracks: TrackModal[] = tracks.map((track: any) => ({
      name: track.name,
      trackId: track.trackId,
      trackIndex: parseInt(track._length._hex, 16),
      IPFSHash: track.IPFSHash,
      description: track.description,
      imgUrl: track.imgUrl,

      timestamp: track.timestamp,
      addedBy: track.addedBy,
      artists: track.artists,
      album: track.album,
      addedByName: track.addedByName,

      isDeleted: track.isDeleted,

    }))
    return s_tracks;
  } catch (err) {
    console.error(err);
    return [TrackModalDefault];
  }
}

export async function getAllTracks(ethereum: any): Promise<TrackModal[]> {
  try {
    const contract = createTrackContract(ethereum);
    const tracks = await contract.getAllTracks();

    const s_tracks: TrackModal[] = tracks.map((track: any) => ({
      name: track.name,
      trackId: track.trackId,
      trackIndex: parseInt(track._length._hex, 16),
      IPFSHash: track.IPFSHash,
      description: track.description,
      imgUrl: track.imgUrl,

      timestamp: track.timestamp,
      addedBy: track.addedBy,
      artists: track.artists,
      album: track.album,
      addedByName: track.addedByName,

      isDeleted: track.isDeleted,

    }))

    return s_tracks;
  } catch (err) {
    console.error(err);
    return [TrackModalDefault];
  }
}

export async function getArtistTracks(ethereum: any, name: string): Promise<TrackModal[]> {
  try {
    const contract = createTrackContract(ethereum);
    const tracks = await contract.getArtistTracks(name);

    const s_tracks: TrackModal[] = tracks.map((track: any) => ({
      name: track.name,
      trackId: track.trackId,
      trackIndex: parseInt(track._length._hex, 16),
      IPFSHash: track.IPFSHash,
      description: track.description,
      imgUrl: track.imgUrl,

      timestamp: track.timestamp,
      addedBy: track.addedBy,
      artists: track.artists,
      album: track.album,
      addedByName: track.addedByName,

      isDeleted: track.isDeleted,

    }))
    return s_tracks;
  } catch (err) {
    console.error(err);
    return [TrackModalDefault];
  }
}

export async function getTracksAddedByArtist(ethereum: any): Promise<TrackModal[]> {
  try {
    const contract = createTrackContract(ethereum);
    const tracks = await contract.getTracksAddedByArtist();

    const s_tracks: TrackModal[] = tracks.map((track: any) => ({
      name: track.name,
      trackId: track.trackId,
      length: track.length,
      IPFSHash: track.IPFSHash,
      description: track.description,
      imgUrl: track.imgUrl,

      timestamp: track.timestamp,
      addedBy: track.addedBy,
      artists: track.artists,
      album: track.album,
      addedByName: track.addedByName,

      isDeleted: track.isDeleted,

    }))
    return s_tracks;
  } catch (err) {
    console.error(err);
    return [TrackModalDefault];
  }
}

export async function getTotalTracks(ethereum: any): Promise<number> {
  try {
    const contract = createTrackContract(ethereum);

    const totalTracks = await contract.totalTracks();

    return totalTracks;
  } catch (err) {
    console.error(err);
    return -1;
  }
}
