import { useEffect, useRef, useState } from "react";
import { getNFT } from "../../lib/IPFSUtil";
import { SingleTracksProps } from "./SingleTrack";

export default function AudioPlayer({ track }: SingleTracksProps) {
  const { name, artists, length, album, IPFSHash, imgUrl } = track;

  const [trackProgress, setTrackProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imgBlobUrl, setImgBlobUrl] = useState('');
  const [trackBlobUrl, setTrackBlobUrl] = useState('');

  const audioSrc = new Audio();

  const audioRef = useRef(audioSrc);
  const intervalRef = useRef();
  const isReady = useRef();

  const { duration } = audioRef;


  async function getBlobUrl(cid: string, type: string): Promise<string | undefined> {
    const blob = await getNFT(cid);
    if (blob.size === 0) return undefined;

    const buffer = await blob.arrayBuffer();

    const url = URL.createObjectURL(new Blob([buffer], { type: type }));

    return url;
  }

  useEffect(() => {

    const getImgBlobUrl = async () => {
      setLoading(true);

      const url = await getBlobUrl(imgUrl, 'img/jpeg');
      setImgBlobUrl(url);
      console.log("Image loaded", name);

      setLoading(false);
    }

    const getTrackBlobUrl = async () => {
      setLoading(true);

      const url = await getBlobUrl(IPFSHash, 'audio/mp3');
      audioSrc.src = url || '';
      setTrackBlobUrl(url);
      console.log("track loaded", name);

      setLoading(false);
    }

    getImgBlobUrl();
    getTrackBlobUrl();

  }, [])

  return (
    <div className="">
      {duration}
    </div>
  )
}
