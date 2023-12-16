import { useOktaAuth } from '@okta/okta-react';
import { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { AddNewCoffee } from './Components/AddNewCoffee';
import { AdminMessages } from './Components/AdminMessages';
import { ChangeQuantityOfCoffees } from './Components/ChangeQuantityOfCoffees';

export const ManageCoffeePage = () => {

    const { authState } = useOktaAuth();

    const [changeQuantityOfCoffeesClick, setChangeQuantityOfCoffeesClick] = useState(false);
    const [messagesClick, setMessagesClick] = useState(false);

    function addCoffeeClickFunction() {
        setChangeQuantityOfCoffeesClick(false);
        setMessagesClick(false);
    }

    function changeQuantityOfCoffeesClickFunction() {
        setChangeQuantityOfCoffeesClick(true);
        setMessagesClick(false);
    }

    function messagesClickFunction() {
        setChangeQuantityOfCoffeesClick(false);
        setMessagesClick(true);
    }

    if (authState?.accessToken?.claims.userType === undefined) {
        return <Redirect to='/home'/>
    }

    return (
        <div className='container'>
            <div className='mt-5'>
                <h3>Manage Library</h3>
                <nav>
                    <div className='nav nav-tabs' id='nav-tab' role='tablist'>
                        <button onClick={addCoffeeClickFunction} className='nav-link active' id='nav-add-coffee-tab' data-bs-toggle='tab'
                                data-bs-target='#nav-add-coffee' type='button' role='tab' aria-controls='nav-add-coffee'
                                aria-selected='false'
                        >
                            Add new coffee
                        </button>
                        <button onClick={changeQuantityOfCoffeesClickFunction} className='nav-link' id='nav-quantity-tab' data-bs-toggle='tab'
                                data-bs-target='#nav-quantity' type='button' role='tab' aria-controls='nav-quantity'
                                aria-selected='true'
                        >
                            Change quantity
                        </button>
                        <button onClick={messagesClickFunction} className='nav-link' id='nav-messages-tab' data-bs-toggle='tab'
                                data-bs-target='#nav-messages' type='button' role='tab' aria-controls='nav-messages'
                                aria-selected='false'
                        >
                            Messages
                        </button>
                    </div>
                </nav>
                <div className='tab-content' id='nav-tabContent'>
                    <div className='tab-pane fade show active' id='nav-add-coffee' role='tabpanel'
                         aria-labelledby='nav-add-coffee-tab'>
                        <AddNewCoffee/>
                    </div>
                    <div className='tab-pane fade' id='nav-quantity' role='tabpanel' aria-labelledby='nav-quantity-tab'>
                        {changeQuantityOfCoffeesClick ? <ChangeQuantityOfCoffees/> : <></>}
                    </div>
                    <div className='tab-pane fade' id='nav-messages' role='tabpanel' aria-labelledby='nav-messages-tab'>
                        {messagesClick ? <AdminMessages/> : <></>}
                    </div>
                </div>
            </div>
        </div>
    );
}