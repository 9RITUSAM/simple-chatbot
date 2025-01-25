'use client'

import Chatbot from "react-chatbot-kit";
import 'react-chatbot-kit/build/main.css';
import config from "../config";
import MessageParser from "../MessageParser";
import ActionProvider from "../Actionprovider";

const ChatComponent = () => {
    return (
        <div>
            < Chatbot
                config={config}
                actionProvider={ActionProvider}
                messageParser={MessageParser}
            
            />
        </div>
    )
}

export default ChatComponent;