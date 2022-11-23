import { useEffect, useRef, useState } from "react"
import { toast } from "react-toastify";
import { useContractContext } from "../../context/BlockchainContext";
import { storeNFT } from "../../lib/IPFSUtil";
import Loading from "../Loading/Loading";

declare const window: any;

export default function AddTrack() {

  const [ethereum, setEthereum] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);
  const [name, setName] = useState<string>('');
  const [trackId, setTrackId] = useState<number>(0);
  const [artists, setArtist] = useState<string[]>([]);
  const [album, setAlbum] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [audioToggle, setAudioToggle] = useState<boolean>(false);

  const trackRef = useRef<HTMLInputElement>(null);
  const artRef = useRef<HTMLInputElement>(null);

  const { addTrack, getProfile } = useContractContext();

  const submitTrack = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    if (!ethereum) {
      setLoading(false);
      return
    }

    if (trackRef.current?.files?.length == 0 || artRef.current?.files?.length == 0) {
      alert("No files either for track or album");
      return;
    }

    let trackIPFS = "";
    let artIPFS = "";

    toast.info("Uploading track file")
    if (trackRef.current?.files?.item(0)) {
      const trackFile = trackRef.current?.files.item(0) as File;
      const cid = await storeNFT(new Blob([trackFile], { type: 'audio/mp3' }));
      trackIPFS = cid;
    }
    toast.info("Uploaded track file")

    toast.info("Uploading album art file")
    if (artRef.current?.files?.item(0)) {
      const artFile = artRef.current?.files?.item(0) as File;
      const cid = await storeNFT(new Blob([artFile], { type: 'img/jpeg' }));
      artIPFS = cid;
    }
    toast.info("Uploaded album art file")

    const profile = await getProfile!(ethereum);
    const profile_name = profile.name;

    await addTrack!(ethereum, {
      name: name,
      trackId: trackId,
      length: 0,
      imgUrl: artIPFS,
      IPFSHash: trackIPFS,
      description: description,

      timestamp: new Date().valueOf(),
      addedBy: "None",
      addedByName: profile_name,
      album: album,
      artists: artists,
      isDeleted: false
    });

    setLoading(false);
  }

  useEffect(() => {
    setEthereum(window.ethereum);
  }, [])

  return (
    <div className="
        duration-300
        grid grid-cols-1 md:grid-cols-2 gap-5
        robo"
    >

      <div className="flex flex-col gap-2">
        <label htmlFor="track_id">Track Number</label>
        <input type="number" id="track_id" className="input mont" value={trackId} onChange={e => setTrackId(parseInt(e.target.value))} />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="song_name">Song Name</label>
        <input type="text" id="song_name" className="input mont" value={name} onChange={e => setName(e.target.value)} />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="song_name">Artist Names . <small className="text-xs text-gray-500"> Separated by comma </small> </label>
        <input type="text" id="song_name" className="input mont" value={artists.join(',')} onChange={e => setArtist(e.target.value.split(','))} />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="album_name">Album Name</label>
        <input type="text" id="album_name" className="input mont" value={album} onChange={e => setAlbum(e.target.value)} />
      </div>

      <div className="flex flex-col gap-2 col-spans-2">
        <label htmlFor="desc">Description</label>
        <textarea id="desc" className="input" value={description} onChange={e => setDescription(e.target.value)} />
      </div>

      <label className="">
        <span className=""> Album Art </span>
        <span className="sr-only">Album Art</span>
        <input
          type="file"
          accept="image/jpeg"
          ref={artRef}
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
          <Loading /> :
          <div>
            <button
              className="hover:(shadow-xl border-green-500) justify-self-start col-spans-2 duration-300 border-1 border-gray-200 px-4 py-3 text-sm rounded-lg"
              onClick={(e) => submitTrack(e)}
            >Add Track</button>
            {
              audioToggle &&
              <div className="">
                <audio src={
                  URL.createObjectURL(new Blob([trackRef.current?.files?.item(0) as File]))
                } controls />
              </div>
            }

          </div>
      }
    </div>

  )
}
