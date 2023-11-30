import {Loans} from "./Components/Loans";
import {History} from "./Components/History";
import {useState} from "react";

export const ShelfPage = () => {
    const [historyClick, setHistoryClick] = useState(false);

    return (
        <div className={'container'}>
            <div className={'mt-3'}>
                <nav>
                    <div className={'nav nav-tabs'} id={'nav-tab'} role={'tablist'}>
                        <button className={'nav-link active'} id={'nav-loans-tab'}
                                type={'button'} role={'tab'}
                                data-bs-toggle={'tab'} data-bs-target={'#nav-loans'}
                                aria-controls={'nav-loans'} aria-selected={'true'}
                                onClick={() => setHistoryClick(false)}
                        >
                            Loans
                        </button>
                        <button className={'nav-link'} id={'nav-history-tab'}
                                type={'button'} role={'tab'}
                                data-bs-toggle={'tab'} data-bs-target={'#nav-history'}
                                aria-controls={'nav-history'} aria-selected={'false'}
                                onClick={() => setHistoryClick(true)}
                        >
                            Your History
                        </button>
                    </div>
                </nav>
                <div className={'tab-content'} id={'nav-tabContent'}>
                    <div className={'tab-pane fade show active'} id={'nav-loans'} role={'tabpanel'}
                         aria-labelledby={'nav-loans-tab'}>
                        <Loans/>
                    </div>
                    <div className={'tab-pane fade'} id={'nav-history'} role={'tabpanel'}
                         aria-labelledby={'nav-history-tab'}>
                        {historyClick ? <History/> : <></>}
                    </div>
                </div>
            </div>
        </div>
    );
}