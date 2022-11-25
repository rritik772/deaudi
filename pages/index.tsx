import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Tracks from "../components/Tracks/Tracks";
import TrackModal, { TrackModalDefault } from "../modals/Tracks";
import { useContractContext } from './../context/BlockchainContext';

declare const window: any;

export default function Home(props: any) {
  console.log(props)
  const [tracks, setTracks] = useState<TrackModal[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [ethereum, setEthereum] = useState<any>(undefined);

  const { getAllTracks } = useContractContext();

  const getSongs = async () => {
    setLoading(true);

    const _tracks = await getAllTracks!(ethereum);
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
    if (ethereum !== undefined)
      getSongs();
  }, [ethereum])

  return (
    <div>
      {
        tracks.length > 0 && <Tracks tracks={tracks} />
      }
    </div>
  )
}
