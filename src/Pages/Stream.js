import React, { useEffect, useState } from "react";
import axios from "axios";
import config from "../config.json";
import "./Stream.css";
import { Col, Row, Container, Card, ListGroup } from "react-bootstrap";

const Stream = () => {
    const [playlistIds, setplaylistIds] = useState(null);
    const [tracks, setTracks] = useState(null);
    const [vibes, setVibes] = useState(null);
    const [recents, setRecents] = useState(null);

    const getplaylistIds = () => {
        axios
            .get(config.api.url + "/user/profile", {
                headers: {
                    Authorization: localStorage.getItem("jtoken"),
                },
            })
            .then((response) => {
                if (response.status === 200)
                    setplaylistIds(response.data.profile.playlists);
                else throw Error("server request not success");
            })
            .catch((err) => {
                alert(err.toString());
            });
    };

    const getPlaylistTracks = () => {
        axios
            .get(config.api.url + "/streams/tracks", {
                headers: {
                    Authorization: localStorage.getItem("jtoken"),
                },
            })
            .then((response) => {
                if (response.status === 200) {
                    if (response.data.tracks.length < 1)
                        throw Error("you don't have any tracks");
                    setTracks(response.data.tracks);
                } else throw Error("server request not success");
            })
            .catch((err) => {
                alert(err.toString());
            });
    };

    const getRecent = () => {
        axios
            .get(config.api.url + "/streams/recent", {
                headers: {
                    Authorization: localStorage.getItem("jtoken"),
                },
            })
            .then((response) => {
                console.log(response);
                if (response.status === 200) {
                    setVibes(response.data.vibes);
                    setRecents(response.data.tracks);
                } else throw Error("server request not success");
            })
            .catch((err) => {
                alert(err.toString());
            });
    };

    useEffect(() => {
        if (playlistIds) {
            getPlaylistTracks();
            getRecent();
        }
    }, [playlistIds]);

    return (
        <div id="stream-page">

            {
                !localStorage.getItem("jtoken")
                    ? (window.location.href = "/login")
                    : null
            }

            <Container>
                <div>
                    <Row>
                        <h1 style={{
                            justifyContent: "center",
                            textAlign: "center",
                            margin: "1rem auto 0.5rem auto"
                        }}
                        > Streams</h1>
                        <Col>
                            <div className="card" style={{ height: "250px" }}>
                                <div className="box">
                                    <div className="content">
                                        <h3>Access your music profile</h3>
                                        {/* <button onClick={getplaylistIds}>Refresh</button> */}
                                        <button
                                            className="button-36"
                                            onClick={getplaylistIds}
                                        >
                                            Refresh
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </div>
                <div>
                </div>

                <div>
                    <Row>
                        <div style={{ display: "flex", flexDirection: "row" }}>
                            <Col>
                                {/* PLAYLIST SECTION */}
                                {playlistIds && (
                                    <Card style={{ width: "18rem" }}>
                                        <Card.Header>Your Playlists</Card.Header>
                                        <ListGroup variant="flush">
                                            <ListGroup.Item>
                                                <ul>
                                                    {playlistIds.map((pl, index) => {
                                                        return (
                                                            <li key={index}>
                                                                <p>{pl.name}</p>
                                                            </li>

                                                        );
                                                    })}
                                                </ul>
                                            </ListGroup.Item>
                                        </ListGroup>
                                    </Card>

                                )}
                            </Col>


                            {/* PLAYLIST SECTION */}
                            <Col>
                                {tracks && (
                                    <Card style={{ width: "18rem" }}>
                                        <Card.Header>Your Most Played</Card.Header>
                                        <ListGroup variant="flush">
                                            <ListGroup.Item>
                                                <ul>
                                                    {tracks.map((tr, index) => {
                                                        return (

                                                            <li key={index}>
                                                                <p>
                                                                    {tr.name}
                                                                    {tr.artists.map(
                                                                        (art, x) => {
                                                                            return (
                                                                                <span key={x}>
                                                                                    {art}{" "}
                                                                                </span>
                                                                            );
                                                                        }
                                                                    )}
                                                                </p>
                                                            </li>

                                                        );
                                                    })}
                                                </ul>
                                            </ListGroup.Item>
                                        </ListGroup>
                                    </Card>
                                )}
                            </Col>

                            <Col>
                                {recents && (
                                    <Card style={{ width: "18rem" }}>
                                        <Card.Header>Recently Played</Card.Header>
                                        <ListGroup variant="flush">
                                            <ListGroup.Item>
                                                <ul>
                                                    {recents.map((tr, index) => {
                                                        return (
                                                            <li key={index}>
                                                                <p>{tr}</p>
                                                            </li>

                                                        );
                                                    })}
                                                </ul>
                                            </ListGroup.Item>
                                        </ListGroup>
                                    </Card>
                                )}
                            </Col>
                            {/* VIBES Section */}
                            <Col>
                                {vibes && (
                                    <Card style={{ width: "18rem" }}>
                                        <Card.Header>Your Vibes</Card.Header>
                                        <ListGroup variant="flush">
                                            <ListGroup.Item>
                                                <div>
                                                    <p>danceability : {vibes.danceability}</p>
                                                    <p>acousticness : {vibes.acousticness}</p>
                                                    <p>energy : {vibes.energy}</p>
                                                    <p>instrumentalness : {vibes.instrumentalness}</p>
                                                    <p>key : {vibes.key}</p>
                                                    <p>liveness : {vibes.liveness}</p>
                                                    <p>mode : {vibes.mode}</p>
                                                    <p>loudness : {vibes.loudness}</p>
                                                    <p>speechiness : {vibes.speechiness}</p>
                                                    <p>tempo : {vibes.tempo}</p>
                                                    <p>valence : {vibes.valence}</p>
                                                </div>
                                            </ListGroup.Item>
                                        </ListGroup>
                                    </Card>
                                )}
                            </Col>
                        </div>
                    </Row>
                </div>

            </Container>

            <br />
            <br />

        </div>
    );
};

export default Stream;
