import {Link} from "react-router-dom";

export const ExploreTopCoffees = () => {
    return (
        <div className={'p-5 mb-4 bg-dark text-white header d-flex justify-content-center align-items-center'}>
            <div>
                <h1 className={'display-5 fw-bold'}>Find your next adventure</h1>
                <p className={'col-md-8 fs-4'}>What would you like to try next?</p>
                <Link className={'btn main-color btn-lg text-white'} type={'button'} to={'/search'}>
                    Explore top coffees
                </Link>
            </div>
        </div>
    );
}