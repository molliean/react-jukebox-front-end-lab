
import { Link } from 'react-router-dom'

import './TrackList.css'

export default function TrackList({ tracks, handleDeleteTrack }) {

    const liEls = tracks.map((track) => {
        return (
            <div className="track-container">
            <li key={track._id}>{track.title} by {track.artist}</li>
            <div className='btns'>
            <button>Play </button>
            <Link to={`/edit-track/${track._id}`}><button>Edit </button></Link>
            <button onClick={() => handleDeleteTrack(track._id)}>Delete </button>
            </div>
            </div>
        )
    })
    return (
        <>
            <Link to={'/add-track'}><button>Add New Track</button></Link>
            <h2>Track List</h2>
            {tracks.length ? <ul>{liEls}</ul> : <h2>No tracks right now!</h2>}
            
        </>
    )
}