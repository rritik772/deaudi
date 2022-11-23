import { useEffect, useState } from "react";
import { faker } from '@faker-js/faker';
import SingleTracks, { SingleTracksProps } from "./SingleTrack";
import TrackModal from "../../modals/Tracks";

interface TracksProps {
  tracks: TrackModal[]
}

export default function Tracks({ tracks }: TracksProps) {

  const [data, setData] = useState<SingleTracksProps[]>();

  const generateData = () => {
    return {
      name: faker.music.songName(),
      trackId: faker.datatype.number({ min: 1, max: 12 }),
      length: faker.datatype.number({ min: 40, max: 520 }),
      imgUrl: faker.image.nature(480, 480, true),
      description: faker.lorem.sentence(10),
      timestamp: faker.datatype.number({ min: 1609439400, max: 1672511400 }),
      addedByName: faker.name.fullName(),
      album: faker.music.genre(),
      artists: Array.from({ length: Math.floor(Math.random() * (5 - 1 + 1) + 1) }, faker.name.fullName),
      IPFSHash: faker.datatype.string()
    }
  }

  useEffect(() => {
    const newData = Array.from({ length: 20 }, generateData);
    setData(newData);
  }, [])

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
