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
    const [search, setSearch] = useState('');
    const [searchUrl, setSearchUrl] = useState('');
    const [categorySelection, setCategorySelection] = useState('Coffee Category');

    useEffect(() => {
        const fetchCoffees = async () => {
            const baseUrl: string = "http://localhost:8080/api/coffees";
            let url: string = '';

            if (searchUrl === ''){
                url = `${baseUrl}?page=${currentPage - 1}&size=${coffeesPerPage}`;
            } else {
                let searchWithPage = searchUrl.replace('<pageNumber>', `${currentPage - 1}`);
                url = baseUrl + searchWithPage;
            }

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
    }, [currentPage, searchUrl]);

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

    const searchHandleChange = () => {
        setCurrentPage(1);
        if (search === '') {
            setSearchUrl('');
        } else {
            setSearchUrl(`/search/findByNameContaining?name=${search}&page=<pageNumber>&size=${coffeesPerPage}`);
        }
        setCategorySelection('Coffee Category')
    }

    const categoryField = (value: string) => {
        setCurrentPage(1);
        if (value.toLowerCase() === 'll' ||
            value.toLowerCase() === 'ml' ||
            value.toLowerCase() === 'mm' ||
            value.toLowerCase() === 'md' ||
            value.toLowerCase() === 'dd'
        ) {
            setCategorySelection(value);
            setSearchUrl(`/search/findByCategory?category=${value}&page=<pageNumber>&size=${coffeesPerPage}`);
        } else {
            setCategorySelection('All');
            setSearchUrl(`?page=<pageNumber>&size=${coffeesPerPage}`);
        }
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
                                       onChange={e => setSearch((e.target.value))}
                                />
                                <button className={'btn btn-outline-success'}
                                        onClick={() => searchHandleChange()}
                                >
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
                                    {categorySelection}
                                </button>
                                <ul className={'dropdown-menu'} aria-labelledby={'dropdownMenuButton1'}>
                                    <li onClick={() => categoryField('All')}>
                                        <a className={'dropdown-item'} href={'#'}>
                                            All
                                        </a>
                                    </li>
                                    <li onClick={() => categoryField('LL')}>
                                        <a className={'dropdown-item'} href={'#'}>
                                            Light
                                        </a>
                                    </li>
                                    <li onClick={() => categoryField('ML')}>
                                        <a className={'dropdown-item'} href={'#'}>
                                            Medium Light
                                        </a>
                                    </li>
                                    <li onClick={() => categoryField('MM')}>
                                        <a className={'dropdown-item'} href={'#'}>
                                            Medium
                                        </a>
                                    </li>
                                    <li onClick={() => categoryField('MD')}>
                                        <a className={'dropdown-item'} href={'#'}>
                                            Medium Dark
                                        </a>
                                    </li>
                                    <li onClick={() => categoryField('DD')}>
                                        <a className={'dropdown-item'} href={'#'}>
                                            Dark
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    {totalAmountOfCoffees > 0 ?
                        <>
                            <div className={'mt-3'}>
                                <h5>Number of results: ({totalAmountOfCoffees})</h5>
                            </div>
                            <p>
                                {indexOfFirstCoffee + 1} to {lastItem} of {totalAmountOfCoffees} items:
                            </p>
                            {coffees.map(coffee => (
                                <SearchCoffees coffee={coffee} key={coffee.id}/>
                            ))}
                        </>
                    :
                        <div className={'m-5'}>
                            <h3>
                                Can't find what you're looking for?
                            </h3>
                            <a className={'btn main-color bt-md px-4 me-md-2 fw-bold text-white'}
                               type={'button'} href={'#'}>Macguffin Services</a>
                        </div>
                    }

                    {totalPages > 1 &&
                      <Pagination currentPage={currentPage} totalPages={totalPages} paginate={paginate}/>
                    }
                </div>
            </div>
        </div>
    );
}