import { useEffect, useRef, useState } from "react"
import { storeNFT } from "../../lib/Upload";

export default function AddTrack() {

  const [loading, setLoading] = useState<boolean>(false);
  const trackRef = useRef<HTMLInputElement>(null);

  const submitTrack = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    if (trackRef.current?.files?.item(0)) {
      const cid = await storeNFT(new Blob([trackRef.current?.files?.item(0) as File], { type: 'audio/mp3' }));
      console.log(cid)
    }

    setLoading(false);
  }

  return (
    <div className="
        duration-300
        grid grid-cols-1 md:grid-cols-2 gap-5
        robo"
    >

      <div className="flex flex-col gap-2">
        <label htmlFor="track_id">Track Number</label>
        <input type="number" id="track_id" className="input mont" />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="song_name">Song Name</label>
        <input type="text" id="song_name" className="input mont" />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="song_name">Song Name</label>
        <input type="text" id="song_name" className="input mont" />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="album_name">Album Name</label>
        <input type="text" id="album_name" className="input mont" />
      </div>

      <div className="flex flex-col gap-2 col-spans-2">
        <label htmlFor="desc">Description</label>
        <textarea id="desc" className="input" />
      </div>

      <label className="">
        <span className=""> Album Art </span>
        <span className="sr-only">Choose track</span>
        <input
          type="file"
          accept="audio/mp3"
          ref={trackRef}
          className="w-56 block text-sm text-slate-500 p-0.5
            file:(mr-4 mt-2 py-3 px-4)
            file:(rounded-lg border-0 duration-300)
            file:(ring-1 ring-gray-300 bg-white)
            hover:(file:ring-yellow-500 file:bg-gray-50)"
        />
      </label>

      <form className="flex items-center space-x-6">
        <label className="block">
          <span className="">Song File</span>
          <span className="sr-only">Choose track</span>

          <input
            type="file"
            accept="audio/mp3"
            ref={trackRef}
            className="block w-full text-sm text-slate-500 p-0.5
              file:(mr-4 mt-2 py-3 px-4)
              file:(rounded-lg border-0 duration-300)
              file:(ring-1 ring-gray-300 bg-white)
              hover:(file:ring-yellow-500 file:bg-gray-50)"
          />
        </label>
      </form>

      {
        loading ?
          <span className="flex items-center px-4 py-2">
            <svg className="animate-spin w-5 text-white" fill="none" viewBox="0 0 24 24">
              <circle className="" cx="12" cy="12" r="10" stroke-width="4"></circle>
              <path className="text-yellow-500" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </span> :
          <button
            className="hover:(shadow-xl border-green-500) justify-self-start col-spans-2 duration-300 border-1 border-gray-200 px-4 py-3 text-sm rounded-lg"
            onClick={(e) => submitTrack(e)}
          >Add Track</button>
      }
    </div>

  )
}
