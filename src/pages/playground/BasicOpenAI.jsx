import { useState } from 'react'
import { useNavigate } from 'react-router'
import styles from './BasicOpenAI.module.css'

import NavBar from '../../components/NavBar'

export default function BasicOpenAI() {

    const navigate = useNavigate();

    const API_KEY = process.env.REACT_APP_OPEN_API_KEY;

    const [isTyping, setIsTyping] = useState(false);
    const [messages, setMessages] = useState([
        {
            role: "system",
            content:
                "You're a helpful assistant, answer with short sentences with less than 20 words.",
        },
    ])

    function goToURL(loc) {
        navigate(loc)
    }

    function postChatMessage(e) {
        e.preventDefault();
        const input = e.target.input.value;
        if (input.trim() !== "") {
            handleSendMessage(input);
            //console.log(input)
            e.target.reset();
        }
    }

    const handleSendMessage = (messageContent) => {
        setMessages((prevMessages) => [
            ...prevMessages,
            { role: "user", content: messageContent },
        ]);
        chatData(messageContent);
        setIsTyping(true);
    };

    const chatData = async (userMessage) => {
        try {
            const response = await fetch(
                "https://api.openai.com/v1/chat/completions",
                {
                    method: "POST",
                    headers: {
                        "Accept" : "application/json",
                        "Content-Type" : "application/json",
                        "Authorization" : `Bearer ${API_KEY}`
                    },
                    body: JSON.stringify({
                        model: "gpt-3.5-turbo",
                        /* gpt-4.1-mini | gpt-4.1 | gpt-4.1-nano */
                        messages: [...messages, { role: "user", content: userMessage }],
                        //temperature: 0.7,
                    }),
                }
            );

            if (!response.ok) {
                throw new Error("Oops! Something went wrong while processing your request.");
            }

            const responseData = await response.json();
            setIsTyping(false);
            setMessages((prevMessages) => [
                ...prevMessages,
                {
                    role: "assistant",
                    content: responseData.choices[0].message.content,
                },
            ]);
        } catch (error) {
            console.error("Error while fetching chat data:", error);
            setIsTyping(false);
        }
    };

    return (
        <>
        <NavBar />
        <div className={styles.content}>
            <h1>Playground (OpenAPI)</h1>

            <div className={styles.card}>
                <p>Enter your openai api key and press Save button</p>
                <label htmlFor='chatgptapikey'>Api Key</label>
                <input className={styles.textinput} type='password' id='chatgptapikey' />
            </div>

            <div className={styles.chatbox}>
                {messages.map((message, index) => (
                    <div key={index}>
                        <h4>{message.role}</h4>
                        <p>{message.content}</p>
                    </div>
                ))}
                {isTyping && <p>Bot is typing...</p>}
            </div>

            <form onSubmit={postChatMessage} aria-label='Chat Input Form'>
                <div className={styles.inputbox}>
                    <input
                        className={styles.chatinput}
                        type='text'
                        name='input'
                        placeholder='Type your message...'
                        disabled={isTyping}
                    />
                    <button type='submit' className={styles.chatsendbutton}>
                        Send
                    </button>
                </div>
            </form>

        </div>
        </>
    )
}

/*
https://medium.com/@deeksharungta/how-to-build-your-own-ai-chatbot-with-open-ai-api-cb779b03bae2

process is not defined error
https://dev.to/boostup/uncaught-referenceerror-process-is-not-defined-12kg

*/