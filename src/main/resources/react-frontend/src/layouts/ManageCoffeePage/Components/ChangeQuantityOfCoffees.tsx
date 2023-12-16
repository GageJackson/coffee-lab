import React from "react";
import { useEffect, useState } from "react"
import { Pagination } from '../../Utils/Pagination';
import { ChangeQuantityOfCoffee } from "./ChangeQuantityOfCoffee";
import CoffeeModel from "../../../models/CoffeeModel";
import {SpinnerLoading} from "../../Utils/SpinnerLoading";

export const ChangeQuantityOfCoffees = () => {

    const [coffees, setCoffees] = useState<CoffeeModel[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [coffeesPerPage] = useState(5);
    const [totalAmountOfCoffees, setTotalAmountOfCoffees] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    const [coffeeDelete, setCoffeeDelete] = useState(false);

    useEffect(() => {
        const fetchCoffees = async () => {
            const baseUrl: string = `http://localhost:8080/api/coffees?page=${currentPage - 1}&size=${coffeesPerPage}`;

            const response = await fetch(baseUrl);

            if (!response.ok) {
                throw new Error('Something went wrong!');
            }

            const responseJson = await response.json();

            const responseData = responseJson._embedded.coffees;

            setTotalAmountOfCoffees(responseJson.page.totalElements);
            setTotalPages(responseJson.page.totalPages);

            const loadedCoffees: CoffeeModel[] = [];

            for (const key in responseData) {
                loadedCoffees.push({
                    id: responseData[key].id,
                    name: responseData[key].name,
                    country: responseData[key].county,
                    description: responseData[key].description,
                    copies: responseData[key].copies,
                    copiesAvailable: responseData[key].copiesAvailable,
                    category: responseData[key].category,
                    img: responseData[key].img,
                });
            }

            setCoffees(loadedCoffees);
            setIsLoading(false);
        };
        fetchCoffees().catch((error: any) => {
            setIsLoading(false);
            setHttpError(error.message);
        })
    }, [currentPage, coffeeDelete]);

    const indexOfLastCoffee: number = currentPage * coffeesPerPage;
    const indexOfFirstCoffee: number = indexOfLastCoffee - coffeesPerPage;
    let lastItem = coffeesPerPage * currentPage <= totalAmountOfCoffees ?
        coffeesPerPage * currentPage : totalAmountOfCoffees;

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    const deleteCoffee = () => setCoffeeDelete(!coffeeDelete);

    if (isLoading) {
        return (
            <SpinnerLoading/>
        );
    }

    if (httpError) {
        return (
            <div className='container m-5'>
                <p>{httpError}</p>
            </div>
        );
    }

    return (
        <div className='container mt-5'>
            {totalAmountOfCoffees > 0 ?
                <>
                    <div className='mt-3'>
                        <h3>Number of results: ({totalAmountOfCoffees})</h3>
                    </div>
                    <p>
                        {indexOfFirstCoffee + 1} to {lastItem} of {totalAmountOfCoffees} items:
                    </p>
                    {coffees.map(coffee => (
                       <ChangeQuantityOfCoffee coffee={coffee} key={coffee.id} deleteCoffee={deleteCoffee}/>
                    ))}
                </>
                :
                <h5>Add a coffee before changing quantity</h5>
            }
            {totalPages > 1 && <Pagination currentPage={currentPage} totalPages={totalPages} paginate={paginate}/>}
        </div>
    );
}