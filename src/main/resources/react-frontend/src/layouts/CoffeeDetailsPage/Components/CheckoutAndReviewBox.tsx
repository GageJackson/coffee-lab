import React from "react";
import CoffeeModel from "../../../models/CoffeeModel";
import {Link} from "react-router-dom";

export const CheckoutAndReviewBox: React.FC<{coffee: CoffeeModel | undefined,
    mobile: boolean, currentLoansCount: number, isAuthentication: any, isCheckedOut: boolean
}> = (props) => {
    return (
        <div className={props.mobile ? 'card d-flex mt-5' : 'card col-3 container d-flex mb-5'}>
            <div className={'card-body container'}>
                <div className={'mt-3'}>
                    <p>
                        <b>{props.currentLoansCount}/5 </b>
                        Coffees in cart
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
                <Link to={'/#'} className={'btn btn-success btn-lg'}>
                    Sign in
                </Link>
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