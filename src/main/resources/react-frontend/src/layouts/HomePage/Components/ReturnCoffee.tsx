import React from "react";
import CoffeeModel from "../../../models/CoffeeModel";

export const ReturnCoffee: React.FC<{coffee: CoffeeModel}> = (props) => {
    return (
        <div className={'col-xs-6 col-sm-6 col-md-4 col-lg-3 mb-3'}>
            <div className={'text-center'}>
                {props.coffee.img ?
                    <img src={props.coffee.img}
                         width={'151'}
                         height={'233'}
                         alt={'coffee'}
                    />
                    :
                    <img src={require('../../../Images/CoffeeImages/new-coffee.png')}
                         width={'151'}
                         height={'233'}
                         alt={'coffee'}
                    />
                }
                <h6 className={'mt-2'}>{props.coffee.name}</h6>
                <p>{props.coffee.country}</p>
                <a className={'btn main-color text-white'} href={'#'}>Buy</a>
            </div>
        </div>
    );
}