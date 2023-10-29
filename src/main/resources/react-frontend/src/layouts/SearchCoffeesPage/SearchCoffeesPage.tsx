import { useEffect, useState } from "react";
import CoffeeModel from "../../models/CoffeeModel";
import { Pagination } from "../Utils/Pagination";
import { SpinnerLoading } from "../Utils/SpinnerLoading";
import { SearchCoffees } from "./Components/SearchCoffees";

export const SearchCoffeesPage = () => {

    const [coffees, setCoffees] = useState<CoffeeModel[]>([])
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [coffeesPerPage] = useState(4);
    const [totalAmountOfCoffees, setTotalAmountOfCoffees] = useState(0);
    const [totalPages, setTotalPages] = useState(0)

    useEffect(() => {
        const fetchCoffees = async () => {
            const baseUrl: string = "http://localhost:8080/api/coffees";
            const url: string = `${baseUrl}?page=${currentPage - 1}&size=${coffeesPerPage}`;
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error('Something went wrong fetching coffees from API');
            }

            const responseJson = await response.json();
            const responseData = responseJson._embedded.coffees;

            setTotalAmountOfCoffees(responseJson.page.totalElements);
            setTotalPages(responseJson.page.totalPages);

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

        fetchCoffees().catch((error:any) => {
            setIsLoading(false);
            setHttpError(error.message);
        })
        window.scrollTo(0,0);
    }, [currentPage]);

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

    const indexOfLastCoffee: number = currentPage * coffeesPerPage;
    const indexOfFirstCoffee: number = indexOfLastCoffee - coffeesPerPage;
    let lastItem = coffeesPerPage * currentPage <= totalPages ? coffeesPerPage * currentPage : totalAmountOfCoffees;
    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    return (
        <div>
            <div className={'container'}>
                <div>
                    <div className={'row mt-5'}>
                        <div className={'col-6'}>
                            <div className={'d-flex'}>
                                <input className={'form-control me-2'} type={'search'}
                                       placeholder={'Search'} aria-labelledby={'Search'}
                                />
                                <button className={'btn btn-outline-success'}>
                                    Search
                                </button>
                            </div>
                        </div>
                        <div className={'col-4'}>
                            <div className={'dropdown'}>
                                <button id={'dropdownMenuButton1'} type={'button'}
                                        className={'btn btn-secondary dropdown-toggle'}
                                        data-bs-toggle={'dropdown'} aria-expanded={'false'}
                                >
                                    Category
                                </button>
                                <ul className={'dropdown-menu'} aria-labelledby={'dropdownMenuButton1'}>
                                    <li>
                                        <a className={'dropdown-item'} href={'#'}>
                                            All
                                        </a>
                                    </li>
                                    <li>
                                        <a className={'dropdown-item'} href={'#'}>
                                            Light
                                        </a>
                                    </li>
                                    <li>
                                        <a className={'dropdown-item'} href={'#'}>
                                            Medium Light
                                        </a>
                                    </li>
                                    <li>
                                        <a className={'dropdown-item'} href={'#'}>
                                            Medium
                                        </a>
                                    </li>
                                    <li>
                                        <a className={'dropdown-item'} href={'#'}>
                                            Medium Dark
                                        </a>
                                    </li>
                                    <li>
                                        <a className={'dropdown-item'} href={'#'}>
                                            Dark
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className={'mt-3'}>
                        <h5>Number of results: ({totalAmountOfCoffees})</h5>
                    </div>
                    <p>
                        {indexOfFirstCoffee + 1} to {lastItem} of {totalAmountOfCoffees} items:
                    </p>
                    {coffees.map(coffee => (
                        <SearchCoffees coffee={coffee} key={coffee.id}/>
                    ))}
                    {totalPages > 1 &&
                      <Pagination currentPage={currentPage} totalPages={totalPages} paginate={paginate}/>
                    }
                </div>
            </div>
        </div>
    );
}