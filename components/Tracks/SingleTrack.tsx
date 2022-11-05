import { FC, useState } from 'react';

export interface SingleTracksProps {
  name: string
  trackId: number
  length: number
  description: string
  timestamp: number
  addedByName: string
  album: string
  artists: string[]
  IPFSHash: string
}

const SingleTracks: FC<SingleTracksProps> = ({ name, trackId, length, description, timestamp, addedByName, album, artists, IPFSHash }) => {

  const [infoToggle, setInfoToggle] = useState<boolean>(false);

  const getTrimmedString = (s: string, l: number) => {
    const ns = s.substring(0, l);
    return (s.length <= l) ? s : `${ns}...`;
  }

  return (
    <div className="hover:(shadow) duration-300 p-2 border-2 rounded-lg bg-gray-50 mb-5">
      <div className="border-b-2 p-2">
        <span className="text-gray-500 robo pr-3">{trackId} </span>
        <span className='robo text-gray-700'>
          @{artists[0]}
          {
            (artists.length > 1) ? ' and ' + artists.length + ' others' : ''
          }
        </span>
      </div>

      <div className="mt-2 flex gap-3 p-2 justify-between items-center">
        <h4 className="flex gap-3 robo text-xl items-end">
          <button className="hover:(text-purple-500) duration-300 me-2 text-2xl">▶️</button>
          {getTrimmedString(name, 25)}
        </h4>

        <div className="flex items-center gap-4">

          <span className="mont">
            {new Date(length * 1000).toISOString().substring(14, 19)}
          </span>
          <span className="col-1 mont">{album}</span>

          <div className="d-grid col-1">
            <button
              className="hover:(border-gray-500 text-gray-800 shadow-lg) text-gray-500 duration-300 shadow-sm rounded-lg border-2 px-2 py-1"
              type="button"
              onClick={() => setInfoToggle(!infoToggle)}
            >
              &#10225;
            </button>
          </div>
        </div>

      </div>


      <div className={`border-b-2 my-2 ${(!infoToggle) && 'hidden'}`} />
      <div className={`pl-10 py-2 ${(!infoToggle) ? 'hidden' : 'flex flex-col gap-3'}`} id={`info-${timestamp}-col`}>

        <div className="">
          <span className="robo text-lg">Description</span>
          <p className="ml-3 mt-1 mont">{description}</p>
        </div>

        <div>
          <span className="robo text-lg">Added By</span>
          <p className="ml-3 mt-1 mont">{addedByName}</p>
        </div>

        <div>
          <span className="robo text-lg">Artists</span><br />
          {
            artists.map(artist => (
              <>
                <span className="ml-3 mt-1 mont">@{artist}</span>
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
