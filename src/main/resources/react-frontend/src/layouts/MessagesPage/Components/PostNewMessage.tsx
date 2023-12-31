import {useOktaAuth} from "@okta/okta-react";
import {useState} from "react";
import MessageModel from "../../../models/MessageModel";

export const PostNewMessage = () => {
    const {authState} = useOktaAuth();
    const [title, setTitle] = useState('');
    const [question, setQuestion] = useState('');
    const [displayWarning, setDisplayWarning] = useState(false);
    const [displaySuccess, setDisplaySuccess] = useState(false);

    async function submitNewQuestion() {
        const url = `http://localhost:8080/api/messages/secure/add/message`;
        if (authState?.isAuthenticated && title !== '' && question !== '') {
            const messageRequestModel: MessageModel = new MessageModel(title, question);
            const requestOptions = {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
                    'Content-Type' : 'application/json',
                },
                body: JSON.stringify(messageRequestModel)
            };

            const  submitNewQuestionResponse = await fetch(url, requestOptions);
            if (!submitNewQuestionResponse.ok) {
                throw new Error('Something went wrong!');
            }

            setTitle('');
            setQuestion('');
            setDisplayWarning(false);
            setDisplaySuccess(true);
        } else {
            setDisplayWarning(true);
            setDisplaySuccess(false);
        }
    }

    return(
        <div className={'card mt-3'}>
            <div className={'card-header'}>
                Ask a question
            </div>
            <div className={'card-body'}>
                <form method={'POST'}>
                    {displayWarning &&
                        <div className={'alert alert-danger'} role={'alert'}>
                          All fields must be filled out!
                        </div>
                    }
                    {displaySuccess &&
                        <div className={'alert alert-success'} role={'alert'}>
                            Question added successfully
                        </div>
                    }
                    <div className={'mb-3'}>
                        <label className={'form-label'}>
                            Title
                        </label>
                        <input id={'titleInput'} className={'form-control'} type={'text'}
                               placeholder={'Title'} value={title}
                               onChange={e => setTitle(e.target.value)}
                        />
                    </div>
                    <div className={'mb-3'}>
                        <label className={'form-label'}>
                            Question
                        </label>
                        <textarea id={'questionInput'} className={'form-control'}
                               placeholder={'Do you have a question?'} value={question} rows={3}
                               onChange={e => setQuestion(e.target.value)}
                        />
                    </div>
                    <button className={'btn btn-primary mt-3'} type={'button'}
                            onClick={submitNewQuestion}
                    >
                        Submit Question
                    </button>
                </form>
            </div>
        </div>
    );
}