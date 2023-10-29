export const MacguffinServices = () => {
    return (
        <div className={'container my-5'}>
            <div className={'row p-4 align-items-center border shadow-lg'}>
                <div className={'col-lg-7 p-3'}>
                    <h1 className={'display-4 fw-bold'}>
                        Can't find what you're looking for?
                    </h1>
                    <p className={'lead'}>
                        If you can't find what you're looking for,
                        please reach out and we can see what we can do for you!
                    </p>
                    <div className={'d-grid gap-2 justify-content-md-start mb4 mb-lg-3'}>
                        <a className={'btn main-color btn-lg text-white'} href={'#'}>
                            Sign up
                        </a>
                    </div>
                </div>
                <div className={'col-lg-4 offset-lg-1 lost-image'}></div>
            </div>
        </div>
    );
}