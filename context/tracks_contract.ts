import { ethers } from 'ethers';
import { TracksABI } from '../utils/constant';
import TrackModal, { TrackModalDefault } from './../modals/Tracks';

const createTrackContract = (ethereum: any): ethers.Contract => {
  // const provider = new ethers.providers.Web3Provider(ethereum);
  const provider = new ethers.providers.WebSocketProvider("ws://127.0.0.1:8545/")
  const signer = provider.getSigner();

  const trackContract = new ethers.Contract(
    // process.env.TRACKSCONTRACTADDRESS || '',
    "0xa513E6E4b8f2a923D98304ec87F64353C4D5C853",
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
    console.log(err);
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

export async function getAllTracks(ethereum: any): Promise<TrackModal[]> {
  try {
    const contract = createTrackContract(ethereum);
    const tracks = await contract.getAllTracks();
    console.log(tracks);

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

export async function getArtistTracks(ethereum: any, name: string): Promise<TrackModal[]> {
  try {
    const contract = createTrackContract(ethereum);
    const tracks = await contract.getArtistTracks(name);
    console.log(tracks);

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
