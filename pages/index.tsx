import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Tracks from "../components/Tracks/Tracks";
import TrackModal, { TrackModalDefault } from "../modals/Tracks";
import { useContractContext } from './../context/BlockchainContext';

declare const window: any;

export default function Home() {
  const [tracks, setTracks] = useState<TrackModal[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [etherum, setEtherum] = useState<any>(undefined);

  const { getAllTracks } = useContractContext();

  const getSongs = async () => {
    setLoading(true);

    const _tracks = await getAllTracks!(etherum);
    console.log(tracks, 'tracks')
    if (_tracks[0] === TrackModalDefault) {
      toast.info("No tracks found");
      return;
    }

    setTracks(_tracks);
    setLoading(false);
  }

  useEffect(() => {
    setEtherum(window.etherum)
  }, [])

  useEffect(() => {
    console.log(etherum)
    if (etherum !== undefined)
      getSongs();
  }, [etherum])

  return (
    <div>
      {
        tracks.length > 0 && <Tracks tracks={tracks} />
      }
    </div>
  )
}
