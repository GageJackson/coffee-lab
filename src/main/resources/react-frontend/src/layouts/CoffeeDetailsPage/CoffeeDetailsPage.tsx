import {useEffect, useState} from "react";
import CoffeeModel from "../../models/CoffeeModel";
import {SpinnerLoading} from "../Utils/SpinnerLoading";
import {StarsReview} from "../Utils/StarsReview";
import {CheckoutAndReviewBox} from "./Components/CheckoutAndReviewBox";
import ReviewModel from "../../models/ReviewModel";
import {LatestReviews} from "./Components/LatestReviews";
import {useOktaAuth} from "@okta/okta-react";
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;

export const CoffeeDetailsPage = () => {

    const {authState} = useOktaAuth();

    const [coffee, setCoffee] = useState<CoffeeModel>();
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState(null);

    //Review States
    const [reviews, setReviews] = useState<ReviewModel[]>([]);
    const [totalStars, setTotalStars] = useState(0);
    const [isLoadingReview, setIsLoadingReview] = useState(true);

    //Loans Count State
    const [currentLoansCount, setCurrentLoansCount] = useState(0);
    const [isLoadingCurrentLoansCount, setIsLoadingCurrentLoansCount] = useState(true);

    // Is coffee checked out
    const [isCoffeeCheckedOut, setIsCoffeeCheckedOut] = useState(false);
    const [isLoadingCoffeeCheckedOut, setIsLoadingCoffeeCheckedOut] = useState(true);

    const coffeeId = (window.location.pathname).split('/')[2];

    useEffect(() => {
        const fetchCoffee = async () => {
            const baseUrl: string = `http://localhost:8080/api/coffees/${coffeeId}`;
            const response = await fetch(baseUrl);

            if (!response.ok) {
                throw new Error('Something went wrong fetching coffees from API');
            }

            const responseJson = await response.json();
            const loadedCoffee: CoffeeModel = {
                id: responseJson.id,
                name: responseJson.name,
                country: responseJson.country,
                description: responseJson.description,
                copies: responseJson.copies,
                copiesAvailable: responseJson.copiesAvailable,
                category: responseJson.category,
                img: responseJson.img
            };

            setCoffee(loadedCoffee);
            setIsLoading(false);
        };

        fetchCoffee().catch((error:any) => {
            setIsLoading(false);
            setHttpError(error.message);
        })
    }, []);

    useEffect(() => {
        const fetchCoffeeReviews = async () => {
            const reviewUrl: string = `http://localhost:8080/api/reviews/search/findByCoffeeId?coffeeId=${coffeeId}`;
            const responseReviews = await fetch(reviewUrl);

            if (!responseReviews.ok) {
                throw new Error('Something went wrong!')
            }

            const responseJsonReviews = await responseReviews.json();
            const responseData = responseJsonReviews._embedded.reviews;

            const loadedReviews: ReviewModel[] = [];
            let weightedStarReviews: number = 0;

            for (const key in responseData) {
                loadedReviews.push({
                    id: responseData[key].id,
                    userEmail: responseData[key].userEmail,
                    date: responseData[key].date,
                    rating: responseData[key].rating,
                    coffeeId: responseData[key].coffeeId,
                    reviewDescription: responseData[key].reviewDescription
                });
                weightedStarReviews = weightedStarReviews + responseData[key].rating;
            }

            if (loadedReviews) {
                const roundedNumber = (Math.round((weightedStarReviews / loadedReviews.length) * 2) / 2).toFixed(1);
                setTotalStars(Number(roundedNumber));
            }

            setReviews(loadedReviews);
            setIsLoadingReview(false);
        };

        fetchCoffeeReviews().catch((error: any) => {
            setIsLoadingReview(false);
            setHttpError(error.message);
        })
    }, []);

    useEffect(() => {
        const fetchUserCurrentLoansCount = async () => {
            if (authState && authState.isAuthenticated) {
                const url = `http://localhost:8080/api/coffees/secure/currentLoans/count`;
                const requestOptions = {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${authState.accessToken?.accessToken}`,
                        'Content-type': 'application/json'
                    }
                };
                const currentLoansCountResponse = await fetch(url, requestOptions);
                if (!currentLoansCountResponse.ok) {
                    throw new Error('Something went wrong!');
                }
                const currentLoansCountResponseJson = await currentLoansCountResponse.json();
                setCurrentLoansCount(currentLoansCountResponseJson);
            }
            setIsLoadingCurrentLoansCount(false);
        }
        fetchUserCurrentLoansCount().catch((error: any) => {
            setIsLoadingCurrentLoansCount(false);
            setHttpError(error.message);
        })
    }, [authState]);

    useEffect(() => {
        const fetchUserCheckedOutCoffee = async () => {
            if (authState && authState.isAuthenticated) {
                console.log("1")
                const url = `http://localhost:8080/api/coffees/secure/isCheckedOut/byUser/?coffeeId=${coffeeId}`;
                const requestOptions = {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${authState.accessToken?.accessToken}`,
                        'Content-type': 'application/json'
                    }
                };
                console.log("2")
                const coffeeCheckedOut = await  fetch(url, requestOptions);
                console.log("3")
                if (!coffeeCheckedOut.ok) {
                    console.log("3b")
                    console.error(`Fetch error: ${coffeeCheckedOut.status} - ${coffeeCheckedOut.statusText}`);
                    throw new Error('Something went wrong!');
                }
                console.log("4")
                const coffeeCheckedOutResponseJson = await coffeeCheckedOut.json();


                setIsCoffeeCheckedOut(coffeeCheckedOutResponseJson);
            }
            setIsLoadingCoffeeCheckedOut(false);
        }
        fetchUserCheckedOutCoffee().catch((error: any) => {
            setIsLoadingCoffeeCheckedOut(false);
            setHttpError(error.message);
        })
    }, [authState]);

    if (isLoading || isLoadingReview || isLoadingCurrentLoansCount || isLoadingCoffeeCheckedOut){
        return (
            <SpinnerLoading/>
        )
    }

    if (httpError){
        return (
            <div className={'container m-5'}>
                <p>{httpError}</p>
            </div>
        )
    }

    return (
        <div>
            {/* Desktop */}
            <div className={'container d-none d-lg-block'}>
                <div className={'row mt-5'}>
                    <div className={'col-auto'}>
                        {coffee?.img ?
                            <img src={coffee?.img} width={'226'} height={'349'} alt={'Coffee'}/>
                            :
                            <img src={require('./../../Images/CoffeeImages/new-coffee.png')}
                                 width={'226'} height={'349'} alt={'Coffee'}
                            />
                        }
                    </div>
                    <div className={'col-4 container'}>
                        <div className={'ml-2'}>
                            <h2>{coffee?.name}</h2>
                            <h5 className={'text-primary'}>{coffee?.country}</h5>
                            <p className={'lead'}>{coffee?.description}</p>
                            <StarsReview rating={totalStars} size={32}/>
                        </div>
                    </div>
                    <CheckoutAndReviewBox coffee={coffee} mobile={false} currentLoansCount={currentLoansCount}/>
                </div>
                <hr/>
                <LatestReviews reviews={reviews} coffeeId={coffee?.id} mobile={false}/>
            </div>

            {/* Mobile */}
            <div className={'container d-lg-none mt-5'}>
                <div className={'d-flex justify-content-center align-items-center'}>
                    {coffee?.img ?
                        <img src={coffee?.img} width={'226'} height={'349'} alt={'Coffee'}/>
                        :
                        <img src={require('./../../Images/CoffeeImages/new-coffee.png')}
                             width={'226'} height={'349'} alt={'Coffee'}
                        />
                    }
                </div>
                <div className={'mt-4'}>
                    <div className={'ml-2'}>
                        <h2>{coffee?.name}</h2>
                        <h5 className={'text-primary'}>{coffee?.country}</h5>
                        <p className={'lead'}>{coffee?.description}</p>
                        <StarsReview rating={totalStars} size={32}/>
                    </div>
                    <CheckoutAndReviewBox coffee={coffee} mobile={true} currentLoansCount={currentLoansCount}/>
                </div>
                <hr/>
                <LatestReviews reviews={reviews} coffeeId={coffee?.id} mobile={true}/>
            </div>
        </div>
    );
}