export default interface TrackModal {
  name: string;
  trackId: number;
  trackIndex: number;
  imgUrl: string;
  IPFSHash: string;
  description: string;

  timestamp: number;
  addedBy: string;
  addedByName: string;
  album: string;
  artists: string[];

  isDeleted: boolean;
}

export const TrackModalDefault: TrackModal = {
  name: '',
  trackId: 0,
  trackIndex: 0,
  imgUrl: '',
  IPFSHash: '',
  description: '',
  timestamp: 0,
  addedBy: '',
  addedByName: '',
  album: '',
  artists: [],
  isDeleted: false
}
