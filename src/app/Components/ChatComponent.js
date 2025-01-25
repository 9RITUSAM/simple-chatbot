'use client'

import Chatbot from "react-chatbot-kit";
import 'react-chatbot-kit/build/main.css';
import ActionProvider from "../actionprovider";
import config from "../config";
import MessageParser from "../MessageParser";

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