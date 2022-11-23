import { getImageSize } from 'next/dist/server/image-optimizer';
import { FC, useEffect, useRef, useState } from 'react';
import { getNFT } from '../../lib/IPFSUtil';
import TrackModal from '../../modals/Tracks';

export interface SingleTracksProps {
  track: TrackModal
}

const SingleTracks: FC<SingleTracksProps> = ({ track }) => {

  const { trackId, name, imgUrl, IPFSHash, description, timestamp, addedByName, album, artists } = track;

  const [infoToggle, setInfoToggle] = useState<boolean>(false);
  const [imgBlobUrl, setImgBlobUrl] = useState<string | undefined>();
  const [trackBlobUrl, setTrackBlobUrl] = useState<string | undefined>();
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [length, setLength] = useState<string>('--:--');
  const [loading, setLoading] = useState<boolean>(false);

  const audioPlayerRef = useRef(null);

  const getTrimmedString = (s: string, l: number) => {
    const ns = s.substring(0, l);
    return (s.length <= l) ? s : `${ns}...`;
  }

  async function getBlobUrl(cid: string, type: string): Promise<string | undefined> {
    const blob = await getNFT(cid);
    if (blob.size === 0) return undefined;

    const buffer = await blob.arrayBuffer();

    const url = URL.createObjectURL(new Blob([buffer], { type: type }));

    return url;
  }

  function handlePlayer() {
    if (isPlaying) {
      audioPlayerRef.current?.pause();
    } else {
      audioPlayerRef.current?.play();
    }

    setIsPlaying(!isPlaying);
  }

  useEffect(() => {
    const getImgBlobUrl = async () => {
      setLoading(true);

      const url = await getBlobUrl(imgUrl, 'img/jpeg');
      setImgBlobUrl(url);

      setLoading(false);
    }

    const getTrackBlobUrl = async () => {
      setLoading(true);

      const url = await getBlobUrl(IPFSHash, 'audio/mp3');
      setTrackBlobUrl(url);

      setLoading(false);
    }

    getImgBlobUrl();
    getTrackBlobUrl();

  }, [])

  useEffect(() => {
    if (audioPlayerRef !== null && audioPlayerRef.current?.duration > 0) {
      setLength(
        new Date(
          audioPlayerRef.current?.duration * 1000
        ).toISOString().substring(14, 19))
    }

  }, [audioPlayerRef, loading])

  return (
    <div className="mb-3 border p-2 rounded-lg hover:shadow-md duration-300">
      <div className="p-4 flex justify-between rounded-lg robo items-center">

        <div className="flex gap-4 items-center">
          <span className="text-gray-500">{trackId.toString().length < 2 ? `0${trackId}` : trackId}</span>

          {
            imgBlobUrl !== undefined ?
              <img src={imgBlobUrl} className="cursor-pointer rounded-full shadow-lg w-15 h-15" /> :
              <div className="w-15 h-15 bg-blue-500/30 rounded-full shadow-lg" />
          }
          <div className="flex flex-col">
            <span className='text-xl'>{getTrimmedString(name, 20)}</span>
            <span className='text-sm mont text-bold text-gray-500'>{getTrimmedString(album, 10)}</span>
          </div>
        </div>

        <div className="hidden">
          <audio src={trackBlobUrl} controls ref={audioPlayerRef} className="" />
        </div>

        <div className="flex items-center gap-5">
          {
            audioPlayerRef != null &&
            <span>{length}</span>
          }
          <span className="text-3xl hover:text-red-500 select-none cursor-pointer">&#10084;</span>
          <span
            className="cursor-pointer py-2 px-3 border hover:(border-purple-400 shadow-md text-purple-500) duration-300 rounded-lg select-none"
            onClick={handlePlayer}
          > {isPlaying ? '⏸️' : <span>&#9654;</span>}</span>
          <span
            onClick={() => setInfoToggle(!infoToggle)}
            className="cursor-pointer py-2 px-3 border hover:(border-yellow-400 shadow-md text-yellow-500) duration-300 rounded-lg select-none"
          >
            &bull;&bull;&bull;
          </span>
        </div>
      </div>

      <div className={`transition-all ease-out duration-300 transform ${infoToggle ? 'p-5 border-t' : 'scale-y-0 opacity-0 h-0'} `}>

        <div className="mb-2">
          <span className="robo">Description</span>
          <p className="ml-3 text-sm mont">{description}</p>
        </div>

        <div className="mb-2">
          <span className="robo">Added By</span>
          <p className="ml-3 mont text-sm">{addedByName}</p>
        </div>

        <div className="">
          <span className="robo">Artists</span><br />
          {
            artists.map((artist, key) => (
              <div key={key}>
                <span key={key} className="ml-3 text-sm mont">@{artist}</span>
                <br />
              </div>
            ))
          }
        </div>

      </div>
    </div>
  )
}

export default SingleTracks;
