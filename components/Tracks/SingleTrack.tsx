import { FC } from 'react';

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
  const getTrimmedString = (s: string, l: number) => {
    const ns = s.substring(0, l);
    return (s.length <= l) ? s : `${ns}...`;
  }

  return (
    <div className="card mb-3 hover:tw-shadow-lg tw-shadow-sm tw-duration-300">
      <div className="card-header mont link text-muted">
        <small>
          @{artists[0]}
          {
            (artists.length > 1) ? ' and ' + artists.length + ' others' : ''
          }
        </small>
      </div>
      <div className="card-body tw-flex tw-justify-between align-items-center">
        <h4 className="card-title robo col-9 tw-text-xl">
          <span className="me-2">▶️</span>
          <span className="tw-text-sm text-muted">{trackId}. </span>
          {getTrimmedString(name, 25)}
        </h4>

        <div className="">

          <span className="mont">
            {new Date(length * 1000).toISOString().substring(14, 19)}
          </span>
          <span className="col-1 mont">{album}</span>

          <div className="d-grid col-1">
            <button
              className="btn btn-outline-secondary"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target={`#info-${timestamp}-col`}
              aria-expanded="false"
              aria-controls={`info-${timestamp}-col`}
            >
              &#10225;
            </button>
          </div>
        </div>

        <div className="collapse mt-3" id={`info-${timestamp}-col`}>
          <div className="card card-body bg-light">
            <div className="">
              <span className="robo">Description</span>
              <p className="ms-3 mont">{description}</p>
            </div>

            <div>
              <span className="robo">Added By</span>
              <p className="ms-3 mont">{addedByName}</p>
            </div>

            <div>
              <span className="robo">Artists</span><br />
              {
                artists.map(artist => (
                  <>
                    <span className="ms-3 mont">@{artist}</span>
                    <br />
                  </>
                ))
              }
            </div>

          </div>
        </div>

      </div>
    </div>
  )
}

export default SingleTracks;
