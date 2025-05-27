import { useState } from 'react'
import { useNavigate } from 'react-router'
import styles from './BasicSTEnOnline.module.css'

import NavBar from '../../components/NavBar'

export default function BasicSTEnOnline() {

    //const navigate = useNavigate();

    const API_KEY = process.env.REACT_APP_OPEN_API_KEY;

    const [isTyping, setIsTyping] = useState(false);

    const [storyPhase, setStoryPhase] = useState('start')

    const [storyLanguage, setStoryLanguage] = useState('English');
    const [storyMainCharacter, setStoryMainCharacter] = useState(null);
    const [storySecondCharacter, setStorySecondCharacter] = useState(null)
    const [storyLocation, setStoryLocation] = useState(null)
    const [storyKeyAction, setStoryKeyAction] = useState(null)
    const [storyStyle, setStoryStyle] = useState(null)
    const [storyLength, setStoryLength] = useState(null)

    const [messages, setMessages] = useState([
        {
            role: "system",
            content: "You are a helpful assistant, helping users with their questions."
        }
    ])

    let first_phase = {
        role: "user",
        content:
            `"Write a story outline in ${storyLanguage} with these elements:
                    - ${storyMainCharacter}
                    - ${storySecondCharacter}
                    - set in ${storyLocation}
                    - focused on ${storyKeyAction}
                    - style ${storyStyle}
                    - length ${storyLength}
                "`,
    }


    function postStoryElements(e) {
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
                        "Accept": "application/json",
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${API_KEY}`
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
                <h1>Story Teller (OpenAPI)</h1>

                {/* <div className={styles.card}>
                <p>Enter your openai api key and press Save button</p>
                <label htmlFor='chatgptapikey'>Api Key</label>
                <input className={styles.textinput} type='password' id='chatgptapikey' />
            </div> */}

                <div className={styles.chatbox}>
                    {messages.map((message, index) => (
                        <div key={index}>
                            <h4>{message.role}</h4>
                            <p>{message.content}</p>
                        </div>
                    ))}
                    {isTyping && <p>StoryTeller is working...</p>}
                </div>

                <div className={styles.card}>
                    <p>Enter the following information and press the Start button</p>
                    <label htmlFor='mainchar'>Main Character</label>
                    <input className={styles.inputfield} type='text' id='mainchar' placeholder='Main Character' />
                    <label htmlFor='secchar'>Second Character</label>
                    <input className={styles.inputfield} type='text' id='secchar' placeholder='Main Character' />

                </div>

                <form onSubmit={postStoryElements} aria-label='Chat Input Form'>
                    <div className={styles.inputbox}>
                        <input />
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

flexbox form
https://codepen.io/rstrahl/pen/rxmjgL
*/