import { useEffect, useState } from "react";
import { faker } from '@faker-js/faker';
import SingleTracks, { SingleTracksProps } from "./SingleTrack";

export default function Tracks() {

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
        data &&
        Array.from(data).map((track, key) => (
          <SingleTracks
            key={key}
            name={track.name}
            trackId={track.trackId}
            length={track.length}
            imgUrl={track.imgUrl}
            description={track.description}
            timestamp={track.timestamp}
            addedByName={track.addedByName}
            album={track.album}
            artists={track.artists}
            IPFSHash={track.IPFSHash}
          />
        ))
      }
    </div>
  )
}
