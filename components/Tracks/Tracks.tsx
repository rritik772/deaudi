import SingleTracks from "./SingleTrack";
import TrackModal from "../../modals/Tracks";
import AudioPlayer from "./AudioPlayer";

interface TracksProps {
  tracks: TrackModal[]
}

export default function Tracks({ tracks }: TracksProps) {

  return (
    <div className="container mx-auto">
      <div className="mb-5" />
      <span className="text-3xl rig tracking-widest">Tracks</span>
      <div className="my-3" />
      {
        tracks && tracks.length > 0 &&
        Array.from(tracks).map((track, key) => (
          <SingleTracks
            key={key}
            track={track}
          />
        ))
      }
    </div>
  )
}
