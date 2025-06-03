import { useState } from 'react'
//import { useNavigate } from 'react-router'
import styles from './BasicSTEnLocal.module.css'

import NavBar from '../../components/NavBar'

export default function BasicSTEnLocal() {

    const [isLoading, setIsLoading] = useState(false);
    const [storyPhase, setStoryPhase] = useState(1);
    const [storyLanguage, setStoryLanguage] = useState();
    const [story, setStory] = useState('This is where the story will be shown');
    const [ststyle, setStyle] = useState();
    const [stlength, setStlength] = useState();
    const [modelname, setModelname] = useState();
    const [localurl, setLocalurl] = useState();

    function postStoryElements(e) {
        e.preventDefault();

        let input = "";

        if (storyPhase == 1) {
            const apiep = e.target.apiurl.value;
            const lang = e.target.stlang.value;
            const mainChar = e.target.mainchar.value;
            const secChar = e.target.secchar.value;
            const location = e.target.stloc.value;
            const keyAction = e.target.stka.value;
            const style = e.target.ststy.value;
            const length = e.target.stlen.value;
            const mdname = e.target.mdlname.value;

            setStoryLanguage(lang)
            setStlength(length)
            setStyle(style)
            setLocalurl(apiep)
            setModelname(mdname)

            input = [
                {
                    role: "system",
                    content: "You are a helpful assistant, helping users with their questions."
                },
                {
                    role: "user",
                    content: `"Write a story outline in ${lang} language with these elements:
            - ${mainChar}
            - ${secChar}
            - set in ${location}
            - focused on ${keyAction}
            - style ${style}
            - length ${length} words
            IMPORTANT: Answer ONLY with your story outline. Do NOT repeat these instructions or use bullet points."`,
                }
            ];
            handleSendMessage(input, apik);
        }

        if (storyPhase == 2) {
            //console.log('phase2')
            input = [{
                role: "user",
                content: `"Here's a story outline: ${story} Write a story based on the outline in a detailed and engaging way, considering:
                - Maintain the ${ststyle} style
                - Include sensory details and emotions where applicable
                - Use natural dialogue
                - Approximate length (VERY IMPORTANT): ${stlength} words
                IMPORTANT: Respond ONLY with the final story. DO NOT repeat these instructions or the original outline."`.trim(),
            }]
            handleSendMessage(input, appapikey);
        }

        if (storyPhase == 3) {
            //console.log('phase3')
            input = [{
                role: "user",
                content: `"Here's a story that needs revision: ${story} Improve this story while maintaining these key points:
                - Style ${ststyle}
                - Correct grammar and spelling errors
                - Improve dialogue and descriptions
                - Keep the length similar!! VERY IMPORTANT!! ${stlength} words
                IMPORTANT: Respond ONLY with the final improved version. DO NOT repeat these instructions or the original story."`.trim(),
            }]
            handleSendMessage(input, appapikey);
        }
    };

    const handleSendMessage = (messageContent, apik) => {
        chatData(messageContent, apik);
    };

    const chatData = async (userMessage, localurl) => {
        setIsLoading(true)
        try {
            const response = await fetch(
                localurl,
                {
                    method: "POST",
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        model: modelname,
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
            setStory(responseData.choices[0].message.content);
            setStoryPhase(storyPhase => storyPhase + 1)
        }
        catch (error) {
            console.error("Error while fetching chat data:", error);
            window.alert("Error while fetching chat data:", error);
        }
        finally {
            setIsLoading(false)
        }
    };


    return (
        <>
            <NavBar />
            <div className={styles.content}>
                <h1>LMStudio Story Teller</h1>

                {isLoading && (
                    <div className={styles.spinnerContainer}>
                        <div className={styles.spinner}></div>
                        <p>Processing...</p>
                    </div>
                )}

                {!isLoading && (
                    <>
                        {story && (<div className={styles.chatbox}>
                            <div>
                                <p>{story}</p>
                            </div>
                            {storyPhase == 2 && <button className={styles.submitbutton} onClick={postStoryElements} disabled={isLoading}>Proceeed to Next Step</button>}
                            {storyPhase == 3 && <button className={styles.submitbutton} onClick={postStoryElements} disabled={isLoading}>Finalize</button>}
                        </div>)}

                        <form onSubmit={postStoryElements} aria-label='Story Elements Form'>
                            <div className={styles.card}>
                                <p className={styles.instruction}>Enter the following information and press the Start button</p>
                                
                                <div className={styles.formrow}>
                                    <label htmlFor='apiurl'>Local API URL</label>
                                    <input required className={styles.inputfield} type='text' id='apiurl' placeholder='Your api url, e.g http://localhost:1234/v1/chat/completions' />
                                </div>

                                <div className={styles.formrow}>
                                    <label htmlFor='modelname'>Model Name</label>
                                    <input required className={styles.inputfield} type='text' id='modelname' placeholder='Local model name' />
                                </div>

                                <div className={styles.formrow}>
                                    <label htmlFor='stlang'>Story Language</label>
                                    <select required className={styles.inputfield} id='stlang'>
                                        <option value={'English'}>English</option>
                                        <option value={'Malay'}>Malay</option>
                                        <option value={'French'}>French</option>
                                    </select>
                                </div>
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
                                <button type="submit" className={styles.submitbutton} disabled={isLoading}>Submit</button>
                            </div>
                        </form>
                    </>

                )}
            </div>
        </>
    )
}

/*

*/