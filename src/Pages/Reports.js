import React, { useEffect, useState } from 'react'
import axios from 'axios'
import config from '../config.json'

const Reports = () => {
    const [playlistIds, setplaylistIds] = useState(null)
    const [tracks, setTracks] = useState(null)
    const [vibes, setVibes] = useState(null)
    const [recents, setRecents] = useState(null)

    const getplaylistIds = () => {
        axios.get(config.api.url + "/user/profile", {
            headers: {
                Authorization: localStorage.getItem("jtoken")
            }
        })
            .then(response => {
                if (response.status === 200) setplaylistIds(response.data.profile.playlists)
                else throw Error("server request not success")
            })
            .catch(err => {
                alert(err.toString())
            })
    }

    const getPlaylistTracks = () => {
        axios.get(config.api.url + "/streams/tracks", {
            headers: {
                Authorization: localStorage.getItem("jtoken")
            }
        })
            .then(response => {
                if (response.status === 200) {
                    if (response.data.tracks.length < 1) throw Error("you don't have any tracks")
                    setTracks(response.data.tracks)
                } else
                    throw Error("server request not success")
            })
            .catch(err => {
                alert(err.toString())
            })
    }

    const getRecent = () => {
        axios.get(config.api.url + "/streams/recent", {
            headers: {
                Authorization: localStorage.getItem("jtoken")
            }
        })
            .then(response => {
                console.log(response)
                if (response.status === 200) {
                    setVibes(response.data.vibes)
                    setRecents(response.data.tracks)
                } else
                    throw Error("server request not success")
            })
            .catch(err => {
                alert(err.toString())
            })
    }

    useEffect(() => {
        if (playlistIds) {
            getPlaylistTracks()
            getRecent()
        }
    }, [playlistIds])

    return (
        <div>
            {
                !localStorage.getItem("jtoken") ?
                    window.location.href = "/login" : null
            }
            <h1>Streams</h1>
            <hr />
            <button onClick={getplaylistIds}>Refresh Your Playlist</button>
            <hr />
            {/* PLAYLIST SECTION */}
            {
                playlistIds &&
                <ul>
                    {
                        playlistIds.map((pl, index) => {
                            return <li key={index}><p>
                                {pl.name}
                            </p></li>
                        })
                    }
                </ul>
            }
            {/* PLAYLIST SECTION */}
            {
                tracks &&
                <ul>
                    {
                        tracks.map((tr, index) => {
                            return <li key={index}><p>
                                {tr.name}
                                {
                                    tr.artists.map((art, x) => {
                                        return <span key={x}>{art} </span>
                                    })
                                }
                            </p></li>
                        })
                    }
                </ul>
            }
            <hr />
            {
                recents &&
                <ul>
                    {
                        recents.map((tr, index) => {
                            return <li key={index}>
                                <p>{tr}</p>
                            </li>
                        })
                    }
                </ul>

            }
            <hr />
            {
                vibes &&
                <div>
                    <p>danceability : {vibes.danceability}</p>
                    <p>acousticness : {vibes.acousticness}</p>
                    <p>energy : {vibes.energy}</p>
                </div>

            }
            <hr />
        </div>
    )
}

export default Reports