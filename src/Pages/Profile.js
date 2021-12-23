import React, { useState, useEffect } from 'react';
import axios from 'axios';
import config from "../config.json";
import "./Profile.css";
import { Container, Col, Row, Card, ListGroup, ListGroupItem } from 'react-bootstrap';
import userpg from "./user.png"

const Profile = () => {

    const [profilePlayList, setProfilePlayList] = useState([]);
    const [profileId, setProfileId] = useState("");
    /* const [profileImage, setProfileImage] =useState(""); */
    const [profileEmail, setProfileEmail] = useState("");
    const [profileName, setProfileName] = useState("");

    const profileData = async () => {
        try {
            /* const res = await axios.get("http://localhost:4000/user/profile"); */
            const res = await axios.get(config.api.url + "/user/profile", { headers: { Authorization: localStorage.getItem("jtoken") } })
            console.log(res);
            setProfilePlayList(res.data.profile.playlists)

            setProfileEmail(res.data.profile.user_email)
            setProfileName(res.data.profile.user_name)
            setProfileId(res.data.profile._id)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        profileData();
    }, [])

    return (
        <div className='profile-container'>
            {
                window.location.search &&
                new URLSearchParams(window.location.search) &&
                (new URLSearchParams(window.location.search).get("jtoken")) &&
                localStorage.setItem("jtoken", (new URLSearchParams(window.location.search).get("jtoken")))
            }
            {
                !localStorage.getItem("jtoken") ?
                    window.location.href = "/login" : null
            }
            <h1 style={{
                            justifyContent: "center",
                            textAlign: "center",
                            margin: "1rem auto 0.5rem auto"
                        }}
                        > Streams</h1>
            <Row>
                <Col></Col>
                <Col>
                    <Card style={{ width: '25rem', margin: "2rem" }}>
                        <Card.Img variant="top" src={userpg} />
                        <Card.Body>
                            <Card.Title>{`Hi, ${profileName}!`}</Card.Title>
                            <Card.Text>{`Your unique id is ${profileId}`}</Card.Text>
                            <Card.Text>{`Your email id is ${profileEmail}`}</Card.Text>
                        </Card.Body>
                        <Card.Text style={{ marginLeft: "1rem" }}><strong>Playlists</strong></Card.Text>
                        <ListGroup className="list-group-flush">
                            {
                                profilePlayList.map((value, key) => (
                                    <ListGroupItem key={key} style={{ fontSize: "12", marginLeft: "2rem", marginRight: "2rem" }}>
                                        {value.name}
                                    </ListGroupItem>
                                ))
                            }
                        </ListGroup>
                    </Card>
                </Col>
                <Col></Col>
            </Row>
        </div>

    )
}

export default Profile;


