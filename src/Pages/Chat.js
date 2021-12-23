import React, { useState } from "react";
import axios from "axios";
import config from "../config.json";
import { ChatEngine } from "react-chat-engine";

const Chat = () => {
    // load email Ids
    const [self, setSelf] = useState(null);
    const [other, setOther] = useState(null);
    const [chatIoCreds, setChatIoCreds] = useState(null);

    const getEmailIds = () => {
        axios
            .get(config.api.url + "/chat/generate", {
                headers: {
                    Authorization: localStorage.getItem("jtoken"),
                },
            })
            .then((response) => {
                console.log(response.data);
                if (response.status === 200) {
                    setSelf(response.data.pairs.self.name);
                    setOther(response.data.pairs.other.name);
                    setChatIoCreds(response.data.pairs.self.chatio);
                } else throw Error("something went wrong on server");
            })
            .catch((err) => {
                alert(err.toString());
            });
    };

    return (
        <div>
            {!localStorage.getItem("jtoken")
                ? (window.location.href = "/login")
                : null}
            {console.log(chatIoCreds)}
            <h3>Chat</h3>
            <button onClick={getEmailIds}>Start/Refresh</button>
            <div>
                <hr />
                <h5>You: {self}</h5>
                <h5>Your Partner: {other}</h5>
                <hr />
                <br />
                <div>
                    {chatIoCreds && (
                        <div style={{ height: "50%" }}>
                            <ChatEngine
                                publicKey={config.chatio.project_id}
                                userName={chatIoCreds.name}
                                userSecret={chatIoCreds.secret}
                            />
                        </div>
                    )}
                </div>
                <hr />
            </div>
        </div>
    );
};

export default Chat;
