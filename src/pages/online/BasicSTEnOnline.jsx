import { useState } from 'react'
import { useNavigate } from 'react-router'
import styles from './BasicSTEnOnline.module.css'

import NavBar from '../../components/NavBar'

export default function BasicSTEnOnline() {

    //const navigate = useNavigate();

    const API_KEY = process.env.REACT_APP_OPEN_API_KEY;

    const [storyPhase, setStoryPhase] = useState(1);

    const [storyLanguage, setStoryLanguage] = useState('English');

    const [messages, setMessages] = useState(null);

    function postStoryElements(e) {
        e.preventDefault();
        const mainChar = e.target.mainchar.value;
        const secChar = e.target.secchar.value;
        const location = e.target.stloc.value;
        const keyAction = e.target.stka.value;
        const style = e.target.ststy.value;
        const length = e.target.stlen.value;

        let input = "";

        if (storyPhase == 1) {
            input = [
                {
                    role: "system",
                    content: "You are a helpful assistant, helping users with their questions."
                },
                {
                    role: "user",
                    content: `"Write a story outline in ${storyLanguage} with these elements:
            - ${mainChar}
            - ${secChar}
            - set in ${location}
            - focused on ${keyAction}
            - style ${style}
            - length ${length} words
            IMPORTANT: Answer ONLY with your story outline. Do NOT repeat these instructions or use bullet points."`,
                }
            ];
        }

        if (storyPhase == 2) {
            input = {
                role: "user",
                content: `"Here's a story outline: ${messages} Write a story based on the outline in a detailed and engaging way, considering:
                - Maintain the ${storyStyle} style
                - Include sensory details and emotions where applicable
                - Use natural dialogue
                - Approximate length (VERY IMPORTANT): ${storyLength} words
                IMPORTANT: Respond ONLY with the final story. DO NOT repeat these instructions or the original outline."`.trim(),
            }
        }

        if (storyPhase == 3) {
            input = {
                role: "user",
                content: `"Here's a story that needs revision: ${messages} Improve this story while maintaining these key points:
                - Style ${storyStyle}
                - Correct grammar and spelling errors
                - Improve dialogue and descriptions
                - Keep the length similar!! VERY IMPORTANT!! ${storyLength} words
                IMPORTANT: Respond ONLY with the final improved version. DO NOT repeat these instructions or the original story."`.trim(),
            }
        }

        if (input.length > 0) {
            console.log(input)
            handleSendMessage(input);
            e.target.reset();
        }
    }

    const handleSendMessage = (messageContent) => {
        setMessages();
        chatData(messageContent);
        //setIsTyping(true);
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
                        messages: userMessage,
                        //temperature: 0.7,
                    }),
                }
            );

            if (!response.ok) {
                throw new Error("Oops! Something went wrong while processing your request.");
            }

            const responseData = await response.json();
            setMessages(responseData.choices[0].message.content);
            setStoryPhase(storyPhase => storyPhase + 1)
        }
        catch (error) {
            console.error("Error while fetching chat data:", error);
        }
    };

    return (
        <>
            <NavBar />
            <div className={styles.content}>
                <h1>Story Teller (OpenAPI)</h1>
                <p>{storyPhase}</p>

                {messages && (<div className={styles.chatbox}>
                    <div>
                        <p>{messages}</p>
                    </div>

                    {storyPhase == 2 && <button className={styles.submitbutton} onClick={postStoryElements}>Proceeed to 2</button>}
                    {storyPhase == 3 && <button className={styles.submitbutton} onClick={postStoryElements}>Finalize</button>}
                </div>)}

                <form onSubmit={postStoryElements} aria-label='Story Elements Form'>
                    <div className={styles.card}>
                        <p className={styles.instruction}>Enter the following information and press the Start button</p>
                        <div className={styles.formrow}>
                            <label htmlFor='mainchar'>Main Character</label>
                            <input required className={styles.inputfield} type='text' id='mainchar' placeholder='Tom, a tom cat' />
                        </div>
                        <div className={styles.formrow}>
                            <label htmlFor='secchar'>Second Character</label>
                            <input required className={styles.inputfield} type='text' id='secchar' placeholder='Jerry, a mouse' />
                        </div>
                        <div className={styles.formrow}>
                            <label htmlFor='stloc'>Story Location</label>
                            <input required className={styles.inputfield} type='text' id='stloc' placeholder='Granny house' />
                        </div>
                        <div className={styles.formrow}>
                            <label htmlFor='stka'>Key Action</label>
                            <input required className={styles.inputfield} type='text' id='stka' placeholder='A hunter chasing its prey' />
                        </div>
                        <div className={styles.formrow}>
                            <label htmlFor='ststy'>Story style</label>
                            <input required className={styles.inputfield} type='text' id='ststy' placeholder='Comedy, cartoony' />
                        </div>
                        <div className={styles.formrow}>
                            <label htmlFor='stlen'>Story Length</label>
                            <select required className={styles.inputfield} id='stlen'>
                                <option value={250}>Short story (250 wds)</option>
                                <option value={500}>Medium length story (500 wds)</option>
                                <option value={1000}>Short novel (1000 wds)</option>
                            </select>
                        </div>
                        <button type="submit">Submit</button>
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