import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import ProfileInfo from "../components/Profile/ProfileInfo";
import Tracks from "../components/Tracks/Tracks";
import { useContractContext } from "../context/BlockchainContext";
import TrackModal, { TrackModalDefault } from "../modals/Tracks";

declare const window: any;

export default function profile() {
  const { connectWallet, getTracksAddedByArtist } = useContractContext();

  const [ethereum, setEthereum] = useState<any>(undefined);
  const [tracks, setTracks] = useState<TrackModal[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  async function getSongs() {
    setLoading(true);

    let _tracks = await getTracksAddedByArtist!(ethereum);

    if (_tracks[0] === TrackModalDefault) {
      toast.info("No tracks found");
      return;
    }

    setTracks(_tracks);
    setLoading(false);
  }

  useEffect(() => {
    setEthereum(window.ethereum)
  }, [])

  useEffect(() => {
    if (ethereum !== undefined) {
      getSongs();
    }
  }, [ethereum])

  return (
    <div className="mt-10 flex flex-col items-center">
      <ProfileInfo />
      {
        !loading && tracks.length > 0 &&
        <Tracks tracks={tracks} />
      }
    </div>
  )
}
