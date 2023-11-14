import React from "react";
import CoffeeModel from "../../../models/CoffeeModel";
import {Link} from "react-router-dom";

export const CheckoutAndReviewBox: React.FC<{coffee: CoffeeModel | undefined,
    mobile: boolean, currentLoansCount: number, isAuthenticated: any,
    isCheckedOut: boolean, checkoutCoffee: any
}> = (props) => {

    function buttonRender() {
        if (props.isAuthenticated) {
            if (!props.isCheckedOut && props.currentLoansCount < 5) {
                return (
                    <button onClick={() => props.checkoutCoffee()} className={'btn btn-success btn-lg'}
                    >
                        Checkout
                    </button>
                )
            } else if (props.isCheckedOut) {
                return (
                    <p>
                        <b>Coffee in cart. Enjoy!</b>
                    </p>
                )
            } else if (!props.isCheckedOut) {
                return (
                    <p className={'text-danger'}>
                        Too many coffees checked out!
                    </p>
                )
            }
        }
        return (
            <Link to={'/login'} className={'btn btn-success btn-lg'}> Sign in </Link>
        )
    }

    return (
        <div className={props.mobile ? 'card d-flex mt-5' : 'card col-3 container d-flex mb-5'}>
            <div className={'card-body container'}>
                <div className={'mt-3'}>
                    <p>
                        <b>{props.currentLoansCount}/5 </b>
                        Coffees in cart.
                    </p>
                    <hr/>
                    {props.coffee && props.coffee.copiesAvailable && props.coffee.copiesAvailable > 0 ?
                        <h4 className={'text-success'}>Available</h4>
                        :
                        <h4 className={'text-danger'}>Out of Stock</h4>
                    }
                    <div className={'row'}>
                        <p className={'col-6 lead'}>
                            <b>{props.coffee?.copies} </b>
                            bags
                        </p>
                        <p className={'col-6 lead'}>
                            <b>{props.coffee?.copiesAvailable} </b>
                            available
                        </p>
                    </div>
                </div>
                {buttonRender()}
                <hr/>
                <p className={'mt-3'}>
                    This number can change until placing an order has been complete
                </p>
                <p>
                    Sign in to be able to leave a review
                </p>
            </div>
        </div>
    );
}