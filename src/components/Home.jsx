// src/components/Home.jsx

import { useState, useEffect } from 'react'

import { Route, Routes, useNavigate } from "react-router-dom";

// import { Link } from 'react-router-dom'
import * as trackService from '../services/trackService'

import TrackList from "./TrackList";
import TrackForm from "./TrackForm";
import NowPlaying from './NowPlaying';


export default function Home({user}) {
  const [tracks, setTracks] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    async function fetchTracks() {
      try {
        const data = await trackService.index()
        console.log(data, " <-- data from express")
        setTracks(data)
        setError('')
      } catch (error) {
        console.log(error)
        setError('Could not load tracks. Please try again.')
      }
    }
    fetchTracks();
  }, [])

  if (error) {
    return (
      <h2>{error}</h2>
    )
  }

  async function handleAddTrack(formData) {
    try {
      const data = await trackService.create(formData)
      console.log(data, " <-- response from express create controller")
      setTracks([data, ...tracks])
    } catch (error) {
      console.log(error)
      setError('Could not create track.');
    }
  }

  async function handleUpdateTrack(formData, trackId) {
    try {
      const editedTrack = await trackService.updateTrack(trackId, formData)
      console.log(editedTrack, ' <-- response from express updateTrack controller')
      const newTracksArray = tracks.map((track) => {
        if (track._id === trackId) {
          return editedTrack
        } else {
          return track
        }
      })
      setTracks(newTracksArray)
    } catch (error) {
      console.log(error)
      setError('Could not edit track.');
    }
  }

  const navigate = useNavigate()

  async function handleDeleteTrack(trackId) {
    try {
      const deletedTrack = await trackService.deleteTrack(trackId)
      if (deletedTrack.error) {
        throw new Error(deletedTrack.error)
      }
      const deletedTrackArray = tracks.filter((track) => {
        return track._id !== deletedTrack._id
      })
      setTracks(deletedTrackArray)
      navigate('/')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <h1>Welcome to your Jukebox, {user.username}</h1>
      <Routes>
        <Route path='/add-track' element={<TrackForm handleAddTrack={handleAddTrack} />} />
        <Route path='/' element={<TrackList tracks={tracks} handleDeleteTrack={handleDeleteTrack}/>}></Route>
        <Route path='/edit-track/:trackId' element={<TrackForm handleUpdateTrack={handleUpdateTrack} tracks={tracks} />} />
        <Route path='/' element={<NowPlaying tracks={tracks} />} />
      </Routes>
    </>
  )
}