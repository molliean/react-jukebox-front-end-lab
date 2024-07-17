// src/components/TrackForm.jsx

import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

export default function TrackForm({ handleAddTrack, handleUpdateTrack, tracks }) {
  const { trackId } = useParams();
  const initialState = {
    title: '',
    artist: ''
  }
  const [formData, setFormData] = useState(initialState);
  const navigate = useNavigate();

  useEffect(() => {
    console.log('trackId:', trackId);
    console.log('tracks:', tracks);
    if (trackId && tracks) {
      const trackToUpdate = tracks.find(track => track._id === trackId)
      console.log('trackToUpdate:', trackToUpdate);
      if (trackToUpdate) {
        setFormData({
          title: trackToUpdate.title,
          artist: trackToUpdate.artist
        })
      }
    }
  }, [trackId, tracks])

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  async function handleSubmit(e) {
    e.preventDefault()
    if (trackId) {
      await handleUpdateTrack(formData, trackId)
    } else {
      await handleAddTrack(formData)
    }
    setFormData(initialState)
    navigate('/')
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title"> Title: </label>
        <input
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <label htmlFor="artist"> Artist: </label>
        <input
          id="artist"
          name="artist"
          value={formData.artist}
          onChange={handleChange}
        />
        <button type="submit">{trackId ? 'Save Changes' : 'Add Track'}</button>
      </form>
    </div>
  );
}