import {useState} from "react";
import {PostNewMessage} from "./Components/PostNewMessage";
import {Messages} from "./Components/Messages";

export const MessagesPage = () => {
    const  [messagesClick, setMessagesClick] = useState(false);



    return(
        <div className={'container'}>
            <div className={'mt-3 mb-2'}>
                <nav>
                    <div id={'nav-tab'} className={'nav nav-tabs'} role={'tablist'}>
                        <button id={'nav-send-message-tab'} className={'nav-link active'}
                                data-bs-toggle={'tab'} data-bs-target={'#nav-send-message'}
                                type={'button'} role={'tab'}
                                aria-controls={'nav-send-message'} aria-selected={'true'}
                                onClick={() => setMessagesClick(false)}
                        >
                            Submit Question
                        </button>
                        <button id={'nav-message-tab'} className={'nav-link'}
                                data-bs-toggle={'tab'} data-bs-target={'#nav-message'}
                                type={'button'} role={'tab'}
                                aria-controls={'nav-message'} aria-selected={'false'}
                                onClick={() => setMessagesClick(true)}
                        >
                            Q/A Response/Pending
                        </button>
                    </div>
                </nav>
                <div id={'nav-tabContent'} className={'tab-content'}>
                    <div id={'nav-send-message'} className={'tab-pane fade show active'}
                         role={'tabpanel'} aria-labelledby={'nav-send-message-tab'}>
                        <PostNewMessage/>
                    </div>
                    <div id={'nav-message'} className={'tab-pane fade'}
                         role={'tabpanel'} aria-labelledby={'nav-message-tab'}>
                        {messagesClick ? <Messages/> : <></>}
                    </div>
                </div>
            </div>
        </div>

    );
}