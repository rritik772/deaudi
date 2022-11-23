import ProfileModal from "./ProfileModal"
import TrackModal from "./Tracks"

export type BlockchainContextModal = {
  connectWallet: () => void
  isWalletConnected: boolean
  getTracks: undefined | ((ethereum: any, name: string) => Promise<TrackModal[]>)
  getTotalTracks: ((ethereum: any) => Promise<number>) | undefined
  addTrack: ((ethereum: any, modal: TrackModal) => Promise<boolean>) | undefined
  getArtistTracks: ((ethereum: any, name: string) => Promise<TrackModal[]>) | undefined
  getTracksAddedByArtist: ((ethereum: any) => Promise<TrackModal[]>) | undefined
  createProfile: ((ethereum: any, profile: ProfileModal) => Promise<boolean>) | undefined
  getProfile: ((ethereum: any) => Promise<ProfileModal>) | undefined
  createNewTrack: ((ethereum: any, track: TrackModal) => Promise<boolean>) | undefined
  changeDescription: ((ethereum: any, desc: string) => Promise<boolean>) | undefined
  isUsernameExisted: ((ethereum: any, username: string) => Promise<boolean>) | undefined
  getAllTracks: ((ethereum: any) => Promise<TrackModal[]>) | undefined
  likeSong: ((ethereum: any, index: number) => Promise<boolean>) | undefined
  likedSong: ((ethereum: any) => Promise<number[]>) | undefined
  unlikeSong: ((ethereum: any, index: number) => Promise<boolean>) | undefined
}

export const BlockchainContextModalDefault: BlockchainContextModal = {
  connectWallet: () => { },
  isWalletConnected: false,
  getTracks: undefined,
  getTotalTracks: undefined,
  addTrack: undefined,
  getArtistTracks: undefined,
  getTracksAddedByArtist: undefined,
  createProfile: undefined,
  getProfile: undefined,
  createNewTrack: undefined,
  changeDescription: undefined,
  isUsernameExisted: undefined,
  getAllTracks: undefined,
  likeSong: undefined,
  likedSong: undefined,
  unlikeSong: undefined
}
