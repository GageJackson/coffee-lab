import {useEffect, useState} from "react";
import CoffeeModel from "../../models/CoffeeModel";
import {SpinnerLoading} from "../Utils/SpinnerLoading";
import {StarsReview} from "../Utils/StarsReview";
import {CheckoutAndReviewBox} from "./Components/CheckoutAndReviewBox";

export const CoffeeDetailsPage = () => {
    const [coffee, setCoffee] = useState<CoffeeModel>();
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState(null);

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

    if (isLoading){
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
                            <StarsReview rating={2.5} size={32}/>
                        </div>
                    </div>
                    <CheckoutAndReviewBox coffee={coffee} mobile={false}/>
                </div>
                <hr/>
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
                        <StarsReview rating={2.5} size={32}/>
                    </div>
                    <CheckoutAndReviewBox coffee={coffee} mobile={true}/>
                </div>
                <hr/>
            </div>
        </div>
    );
}