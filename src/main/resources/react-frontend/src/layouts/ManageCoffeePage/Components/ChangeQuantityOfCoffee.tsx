import { useEffect, useState } from "react";
import CoffeeModel from "../../../models/CoffeeModel";
import { useOktaAuth } from '@okta/okta-react';

export const ChangeQuantityOfCoffee: React.FC<{ coffee: CoffeeModel, deleteCoffee: any }> = (props, key) => {
    
    const { authState } = useOktaAuth();
    const [quantity, setQuantity] = useState<number>(0);
    const [remaining, setRemaining] = useState<number>(0);

    useEffect(() => {
        const fetchCoffeeInState = () => {
            props.coffee.copies ? setQuantity(props.coffee.copies) : setQuantity(0);
            props.coffee.copiesAvailable ? setRemaining(props.coffee.copiesAvailable) : setRemaining(0);
        };
        fetchCoffeeInState();
    }, []);

    async function increaseQuantity() {
        const url = `http://localhost:8080/api/admin/secure/increase/coffee/quantity?coffeeId=${props.coffee?.id}`;
        const requestOptions = {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
                'Content-Type': 'application/json'
            }
        };

        const quantityUpdateResponse = await fetch(url, requestOptions);
        if (!quantityUpdateResponse.ok) {
            throw new Error('Something went wrong!');
        }
        setQuantity(quantity + 1);
        setRemaining(remaining + 1);
    }

    async function decreaseQuantity() {
        const url = `http://localhost:8080/api/admin/secure/decrease/coffee/quantity?coffeeId=${props.coffee?.id}`;
        const requestOptions = {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
                'Content-Type': 'application/json'
            }
        };

        const quantityUpdateResponse = await fetch(url, requestOptions);
        if (!quantityUpdateResponse.ok) {
            throw new Error('Something went wrong!');
        }
        setQuantity(quantity - 1);
        setRemaining(remaining - 1);
    }

    async function deleteCoffee() {
        const url = `http://localhost:8080/api/admin/secure/delete/coffee?coffeeId=${props.coffee?.id}`;
        const requestOptions = {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
                'Content-Type': 'application/json'
            }
        };

        const updateResponse = await fetch(url, requestOptions);
        if (!updateResponse.ok) {
            throw new Error('Something went wrong!');
        }
        props.deleteCoffee();
    }
    
    return (
        <div className='card mt-3 shadow p-3 mb-3 bg-body rounded'>
            <div className='row g-0'>
                <div className='col-md-2'>
                    <div className='d-none d-lg-block'>
                        {props.coffee.img ?
                            <img src={props.coffee.img} width='123' height='196' alt='Coffee' />
                            :
                            <img src={require('./../../../Images/CoffeeImages/new-coffee.png')}
                                width='123' height='196' alt='Coffee' />
                        }
                    </div>
                    <div className='d-lg-none d-flex justify-content-center align-items-center'>
                        {props.coffee.img ?
                            <img src={props.coffee.img} width='123' height='196' alt='Coffee' />
                            :
                            <img src={require('./../../../Images/CoffeeImages/new-coffee.png')}
                                width='123' height='196' alt='Coffee' />
                        }
                    </div>
                </div>
                <div className='col-md-6'>
                    <div className='card-body'>
                        <h5 className='card-title'>{props.coffee.country}</h5>
                        <h4>{props.coffee.name}</h4>
                        <p className='card-text'> {props.coffee.description} </p>
                    </div>
                </div>
                <div className='mt-3 col-md-4'>
                    <div className='d-flex justify-content-center algin-items-center'>
                        <p>Total Quantity: <b>{quantity}</b></p>
                    </div>
                    <div className='d-flex justify-content-center align-items-center'>
                        <p>Coffees Remaining: <b>{remaining}</b></p>
                    </div>
                </div>
                <div className='mt-3 col-md-1'>
                    <div className='d-flex justify-content-start'>
                        <button className='m-1 btn btn-md btn-danger' onClick={deleteCoffee}>Delete</button>
                    </div>
                </div>
                <button className='m1 btn btn-md main-color text-white' onClick={increaseQuantity}>Add Quantity</button>
                <button className='m1 btn btn-md btn-warning' onClick={decreaseQuantity}>Decrease Quantity</button>
            </div>
        </div>
    );
}