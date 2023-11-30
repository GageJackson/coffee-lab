import {useOktaAuth} from "@okta/okta-react";
import {useEffect, useState} from "react";
import ShelfCurrentLoans from "../../../models/ShelfCurrentLoans";
import {SpinnerLoading} from "../../Utils/SpinnerLoading";
import {Link} from "react-router-dom";
import {LoansModal} from "./LoansModal";

export const Loans = () => {
    const {authState} = useOktaAuth();
    const [httpError, setHttpError] = useState(null);

    //Current Loans
    const  [shelfCurrentLoans, setShelfCurrentLoans] = useState<ShelfCurrentLoans[]>([]);
    const [isLoadingUserLoans, setIsLoadingUserLoans] =useState(true);
    const [checkout, setCheckout] = useState(false);

    useEffect(() => {
        const fetchUserCurrentLoans = async () => {
            if (authState && authState.isAuthenticated) {
                const url = `http://localhost:8080/api/coffees/secure/currentLoans`;
                const requestOptions = {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${authState.accessToken?.accessToken}`,
                        'Content-Type': 'application/json'
                    }
                };
                const shelfCurrentLoansResponse = await fetch(url, requestOptions);
                if (!shelfCurrentLoansResponse.ok) {
                    throw new Error('Something went wrong!');
                }
                const shelCurrentLoansResponseJson = await shelfCurrentLoansResponse.json();
                setShelfCurrentLoans(shelCurrentLoansResponseJson);
            }
            setIsLoadingUserLoans(false);
        }
        fetchUserCurrentLoans().catch((error: any) => {
            setIsLoadingUserLoans(false);
            setHttpError(error.message);
        })
        console.log(shelfCurrentLoans)
        window.scrollTo(0,0);
    }, [authState, checkout]);

    if (isLoadingUserLoans) {
        return (
            <SpinnerLoading/>
        );
    }

    if (httpError) {
        return (
            <div className={'container m-5'}>
                <p>
                    {httpError}
                </p>
            </div>
        );
    }

    async function returnCoffee(coffeeId: number) {
        const url = `http://localhost:8080/api/coffees/secure/return?coffeeId=${coffeeId}`;
        const requestOptions = {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
                'Content-Type': 'application/json'
            }
        };

        const returnResponse = await fetch(url, requestOptions);
        if (!returnResponse.ok) {
            throw new Error('Something went wrong!');
        }
        setCheckout(!checkout);
    }

    async function renewLoan(coffeeId: number) {
        const url = `http://localhost:8080/api/coffees/secure/renew?coffeeId=${coffeeId}`;
        const requestOptions = {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
                'Content-Type': 'application/json'
            }
        };

        const returnResponse = await fetch(url, requestOptions);
        if (!returnResponse.ok) {
            throw new Error('Something went wrong!');
        }
        setCheckout(!checkout);
    }

    return (
        <div>
            {/* Desktop */}
            <div className={'d-none d-lg-block mt-2'}>
                {shelfCurrentLoans.length >0 ?
                <>
                <h5>Current Loans: </h5>
                {shelfCurrentLoans.map(shelfCurrentLoans => (
                    <div key={shelfCurrentLoans.coffee.id}>
                        <div className={'row mt-3 mb-3'}>
                            <div className={'col-4 col-md-4 container'}>
                                {shelfCurrentLoans.coffee?.img ?
                                    <img src={shelfCurrentLoans.coffee?.img} alt="coffee" width={'226'} height={'349'}/>
                                    :
                                    <img src={require('./../../../Images/CoffeeImages/new-coffee.png')} alt="coffee" width={'226'} height={'349'}/>
                                }
                            </div>
                            <div className={'card col-3 col-md-3 container d-flex'}>
                                <div className={'card-body'}>
                                    <div className={'mt-3'}>
                                        <h4>Loan Options</h4>
                                        {shelfCurrentLoans.daysLeft > 0 &&
                                            <p className={'text-secondary'}>
                                                Due in {shelfCurrentLoans.daysLeft} days.
                                            </p>
                                        }
                                        {shelfCurrentLoans.daysLeft === 0 &&
                                            <p className={'text-success'}>
                                                Due Today.
                                            </p>
                                        }
                                        {shelfCurrentLoans.daysLeft < 0 &&
                                            <p className={'text-danger'}>
                                                Past due by {shelfCurrentLoans.daysLeft} days.
                                            </p>
                                        }
                                        <div className={'list-group mt-3'}>
                                            <button className={'list-group-item list-group-item-action'}
                                                    aria-current={'true'} data-bs-toggle={'modal'}
                                                    data-bs-target={`#modal${shelfCurrentLoans.coffee.id}`}>
                                                Manage Loan
                                            </button>
                                            <Link to={'search'} className={'list-group-item list-group-item-action'}>
                                                Search more coffees?
                                            </Link>
                                        </div>
                                    </div>
                                    <hr/>
                                    <p className={'mt-3'}>
                                        Help others find their next adventure by reviewing your coffee.
                                    </p>
                                    <Link to={`/checkout/${shelfCurrentLoans.coffee.id}`} className={'btn btn-primary'}>
                                        Leave a review
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <hr/>
                        <LoansModal shelfCurrentLoans={shelfCurrentLoans} mobile={false} returnCoffee={returnCoffee} renewLoan={renewLoan}/>
                    </div>
                    ))}
                </>
                :
                <>
                    <h3 className={'mt-3'}>Currently no loans</h3>
                    <Link to={'search'} className={'list-group-item list-group-item-action'}>
                        Search for a new coffee
                    </Link>
                </>
                }
            </div>

            {/* Mobile */}
            <div className={'container d-lg-none mt-2'}>
                {shelfCurrentLoans.length >0 ?
                    <>
                        <h5 className={'mb-3'}>Current Loans: </h5>
                        {shelfCurrentLoans.map(shelfCurrentLoans => (
                            <div key={shelfCurrentLoans.coffee.id}>
                                    <div className={'d-flex justify-content-center align-items-center'}>
                                        {shelfCurrentLoans.coffee?.img ?
                                            <img src={shelfCurrentLoans.coffee?.img} alt="coffee" width={'226'} height={'349'}/>
                                            :
                                            <img src={require('./../../../Images/CoffeeImages/new-coffee.png')} alt="coffee" width={'226'} height={'349'}/>
                                        }
                                    </div>
                                    <div className={'card d-flex mt-5 mb-3'}>
                                        <div className={'card-body container'}>
                                            <div className={'mt-3'}>
                                                <h4>Loan Options</h4>
                                                {shelfCurrentLoans.daysLeft > 0 &&
                                                    <p className={'text-secondary'}>
                                                        Due in {shelfCurrentLoans.daysLeft} days.
                                                    </p>
                                                }
                                                {shelfCurrentLoans.daysLeft === 0 &&
                                                    <p className={'text-success'}>
                                                        Due Today.
                                                    </p>
                                                }
                                                {shelfCurrentLoans.daysLeft < 0 &&
                                                    <p className={'text-danger'}>
                                                        Past due by {shelfCurrentLoans.daysLeft} days.
                                                    </p>
                                                }
                                                <div className={'list-group mt-3'}>
                                                    <button className={'list-group-item list-group-item-action'}
                                                            aria-current={'true'} data-bs-toggle={'modal'}
                                                            data-bs-target={`#mobilemodal${shelfCurrentLoans.coffee.id}`}>
                                                        Manage Loan
                                                    </button>
                                                    <Link to={'search'} className={'list-group-item list-group-item-action'}>
                                                        Search more coffees?
                                                    </Link>
                                                </div>
                                            </div>
                                            <hr/>
                                            <p className={'mt-3'}>
                                                Help others find their next adventure by reviewing your coffee.
                                            </p>
                                            <Link to={`/checkout/${shelfCurrentLoans.coffee.id}`} className={'btn btn-primary'}>
                                                Leave a review
                                            </Link>
                                        </div>
                                    </div>
                                <hr/>
                                <LoansModal shelfCurrentLoans={shelfCurrentLoans} mobile={true} returnCoffee={returnCoffee} renewLoan={renewLoan}/>
                            </div>
                        ))}
                    </>
                    :
                    <>
                        <h3 className={'mt-3'}>Currently no loans</h3>
                        <Link to={'search'} className={'list-group-item list-group-item-action'}>
                            Search for a new coffee
                        </Link>
                    </>
                }
            </div>
        </div>
    );
}