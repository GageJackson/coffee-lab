import CoffeeModel from "../../../models/CoffeeModel";

export const SearchCoffees: React.FC<{coffee: CoffeeModel}> = (props) => {

    return (
        <div className={'card mt-3 shadow p-3 mb-3 bg-body rounded'}>
            <div className={'row g-0'}>
                <div className={'col-md-2 '}>
                    <div className={'d-none d-lg-block'}>
                        {props.coffee.img ?
                            <img src={props.coffee.img}
                                 width={'123'}
                                 height={'196'}
                                 alt={'Coffee'}
                            />
                            :
                            <img src={require('../../../Images/CoffeeImages/new-coffee.png')}
                                 width={'123'}
                                 height={'196'}
                                 alt={'Coffee'}
                            />
                        }
                    </div>

                    <div className={'d-lg-none d-flex justify-content-center align-items-center'}>
                        {props.coffee.img ?
                            <img src={props.coffee.img}
                                 width={'123'}
                                 height={'196'}
                                 alt={'Coffee'}
                            />
                            :
                            <img src={require('../../../Images/CoffeeImages/new-coffee.png')}
                                 width={'123'}
                                 height={'196'}
                                 alt={'Coffee'}
                            />
                        }
                    </div>

                </div>
                <div className={'col-md-6'}>
                    <div className={'card-body'}>
                        <h5 className={'card-title'}>
                            {props.coffee.country}
                        </h5>
                        <h4 className={'card-title'}>
                            {props.coffee.name}
                        </h4>
                        <p className={'card-text'}>
                            {props.coffee.description}
                        </p>
                    </div>
                </div>
                <div className={'col-md-4 d-flex justify-content-center align-items-center'}>
                    <a className={'btn btn-md main-color text-white'} href={'#'}>
                        View Details
                    </a>
                </div>
            </div>
        </div>
    );
}