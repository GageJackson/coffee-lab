import {ReturnCoffee} from "./ReturnCoffee";
import {useEffect, useState} from "react";
import CoffeeModel from "../../../models/CoffeeModel";
import {SpinnerLoading} from "../../Utils/SpinnerLoading";

export const Carousel = () => {

    const [coffees, setCoffees] = useState<CoffeeModel[]>([])
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState(null);

    useEffect(() => {
        const fetchBooks = async () => {
            const baseUrl: string = "http://localhost:8080/api/coffees";
            const url: string = `${baseUrl}?page=0&size=9`;
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error('Something went wrong fetching coffees from API');
            }

            const responseJson = await response.json();
            const responseData = responseJson._embedded.coffees;
            const loadedCoffees: CoffeeModel[] = [];

            for (const key in responseData){
                loadedCoffees.push({
                    id: responseData[key].id,
                    name: responseData[key].name,
                    country: responseData[key].country,
                    description: responseData[key].description,
                    copies: responseData[key].copies,
                    copiesAvailable: responseData[key].copiesAvailable,
                    category: responseData[key].category,
                    img: responseData[key].img
                });
            }

            setCoffees(loadedCoffees);
            setIsLoading(false);
        };

        fetchBooks().catch((error:any) => {
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

    return(
        <div className={'container mt-5'} style={{height: 550}}>
            <div className={'homepage-carousel-title'}>
                <h3>Find your next favorite coffee</h3>
            </div>
            <div id={'carouselControls'} className={'carousel carousel-dark slide mt-5 d-none d-lg-block'} data-bs-interval={'false'}>

                {/* Desktop */}
                <div className={'carousel-inner'}>
                    <div className={'carousel-item active'}>
                        <div className={'row d-flex justify-content-center align-items-center'}>
                            {coffees.slice(0,3).map(coffee => (
                                <ReturnCoffee coffee={coffee} key = {coffee.id} />
                            ))}
                        </div>
                    </div>
                    <div className={'carousel-item'}>
                        <div className={'row d-flex justify-content-center align-items-center'}>
                            <div className={'row d-flex justify-content-center align-items-center'}>
                                {coffees.slice(3,6).map(coffee => (
                                    <ReturnCoffee coffee={coffee} key = {coffee.id} />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <button className={'carousel-control-prev'} type={'button'}
                        data-bs-target={'#carouselControls'} data-bs-slide={'prev'}
                >
                    <span className={'carousel-control-prev-icon'} aria-hidden={'true'}></span>
                    <span className={'visually-hidden'}>Previous</span>
                </button>
                <button className={'carousel-control-next'} type={'button'}
                        data-bs-target={'#carouselControls'} data-bs-slide={'next'}
                >
                    <span className={'carousel-control-next-icon'} aria-hidden={'true'}></span>
                    <span className={'visually-hidden'}>Next</span>
                </button>
            </div>

            {/* Mobile */}
            <div className={'d-lg-none mt-3'}>
                <div className={'row d-flex justify-content-center align-items-center'}>
                    <ReturnCoffee coffee={coffees[0]} key = {coffees[0].id}/>
                </div>
            </div>
            <div className={'homepage-carousel-title mt-3'}>
                <a className={'btn btn-outline-secondary btn-lg'} href={'#'}>View More</a>
            </div>
        </div>
    );
}