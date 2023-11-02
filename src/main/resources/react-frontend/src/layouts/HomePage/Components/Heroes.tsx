import {useOktaAuth} from "@okta/okta-react";
import {Link} from "react-router-dom";

export const Heroes = () => {

    const {authState} = useOktaAuth();

    return (
        <div>
            {/* Desktop */}
            <div className={'d-none d-lg-block'}>
                <div className={'row g-0 mt-5'}>
                    <div className={'col-sm-6 col-md-6'}>
                        <div className={'col-image-left'}></div>
                    </div>
                    <div className={'col-4 col-md-4 container d-flex justify-content-center align-items-center'}>
                        <div className={'ml-2'}>
                            <h1>What have you been drinking?</h1>
                            <p className={'lead'}>
                                The roasting team would love to know which coffees you've been enjoying.
                                Whether something new and exotic, or tried and true,
                                we want to know what's good to you!
                            </p>
                            {authState?.isAuthenticated ?
                                <Link className={'btn main-color btn-lg text-white'}
                                      type={'button'} to={'search'}
                                >
                                    Explore top coffees
                                </Link>
                                :
                                <Link className={'btn main-color btn-lg text-white'}
                                      type={'button'} to={'/login'}
                                >
                                    Sign up
                                </Link>
                            }
                        </div>
                    </div>
                </div>

                <div className={'row g-0'}>
                    <div className={'col-4 col-md-4 container d-flex justify-content-center align-items-center'}>
                        <div className={'ml-2'}>
                            <h1>Our selection is always changing!</h1>
                            <p className={'lead'}>
                                Check in monthly to see what new coffees we have in store for you!
                                We work nonstop to bring new tasty coffees your way, and allow
                                you to try many different things a year!
                            </p>
                        </div>
                    </div>
                    <div className={'col-sm-6 col-md-6'}>
                        <div className={'col-image-right'}></div>
                    </div>
                </div>
            </div>

            {/* Mobile */}
            <div className={'d-lg-none'}>
                <div className={'container'}>
                    <div className={'m-2'}>
                        <div className={'col-image-left'}></div>
                        <div className={'mt-2'}>
                            <h1>What have you been drinking?</h1>
                            <p className={'lead'}>
                                The roasting team would love to know which coffees you've been enjoying.
                                Whether something new and exotic, or tried and true,
                                we want to know what's good to you!
                            </p>

                            {authState?.isAuthenticated ?
                                <Link className={'btn main-color btn-lg text-white'}
                                      type={'button'} to={'search'}
                                >
                                    Explore top coffees
                                </Link>
                            :
                                <Link className={'btn main-color btn-lg text-white'}
                                      type={'button'} to={'/login'}
                                >
                                    Sign up
                                </Link>
                            }


                        </div>
                    </div>

                    <div className={'m-2'}>
                        <div className={'col-image-right'}></div>
                        <div className={'mt-2'}>
                            <h1>Our selection is always changing!</h1>
                            <p className={'lead'}>
                                Check in monthly to see what new coffees we have in store for you!
                                We work nonstop to bring new tasty coffees your way, and allow
                                you to try many different things a year!
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}