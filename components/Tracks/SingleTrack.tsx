import { FC, useState } from 'react';

export interface SingleTracksProps {
  name: string
  trackId: number
  length: number
  imgUrl: string
  description: string
  timestamp: number
  addedByName: string
  album: string
  artists: string[]
  IPFSHash: string
}

const SingleTracks: FC<SingleTracksProps> = ({ name, trackId, length, imgUrl, description, timestamp, addedByName, album, artists, IPFSHash }) => {

  const [infoToggle, setInfoToggle] = useState<boolean>(false);

  const getTrimmedString = (s: string, l: number) => {
    const ns = s.substring(0, l);
    return (s.length <= l) ? s : `${ns}...`;
  }


  return (
    <div className="mb-3 border p-2 rounded-lg hover:shadow-md duration-300">
      <div className="p-4 flex justify-between rounded-lg robo items-center">

        <div className="flex gap-4 items-center">
          <span className="text-gray-500">{trackId.toString().length < 2 ? `0${trackId}` : trackId}</span>
          <img src={imgUrl} className="cursor-pointer rounded-full w-15 h-15" style={{ backgroundImage: `url(${imgUrl})` }} />

          <div className="flex flex-col">
            <span className='text-xl'>{getTrimmedString(name, 20)}</span>
            <span className='text-sm mont text-bold text-gray-500'>{getTrimmedString(album, 10)}</span>
          </div>
        </div>

        <div className="flex items-center gap-5">
          <span>{new Date(length * 1000).toISOString().substring(14, 19)}</span>
          <span className="text-3xl hover:text-red-500 select-none cursor-pointer">&#10084;</span>
          <span className="cursor-pointer py-2 px-3 border hover:(border-purple-400 shadow-md text-purple-500) duration-300 rounded-lg select-none">&#9654;</span>
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
              <>
                <span key={key} className="ml-3 text-sm mont">@{artist}</span>
                <br />
              </>
            ))
          }
        </div>

      </div>
    </div>
  )
}

export default SingleTracks;
