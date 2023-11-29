import React from "react";
import ShelfCurrentLoans from "../../../models/ShelfCurrentLoans";

export const LoansModal: React.FC<{shelfCurrentLoans: ShelfCurrentLoans,
    mobile: boolean, returnCoffee: any, renewLoan: any}> = (props) => {
    return(
        <div className={'modal fade'} key={props.shelfCurrentLoans.coffee.id}
             id={props.mobile ? `mobilemodal${props.shelfCurrentLoans.coffee.id}`
            : `modal${props.shelfCurrentLoans.coffee.id}`}
             data-bs-backdrop={'static'} data-bs-keyboard={'false'}
             aria-labelledby={'staticBackdropLabel'} aria-hidden={'true'}
        >
            <div className={'modal-dialog'}>
                <div className={'modal-content'}>
                    <div className={'modal-header'}>
                        <h5 className={'modal-title'} id={'staticBackdropLabel'}>
                            Loan Options
                        </h5>
                        <button type={'button'} className={'btn-close'} data-bs-dismiss={'modal'} aria-label={'Close'}></button>
                    </div>
                    <div className={'modal-body'}>
                        <div className={'container'}>
                            <div className={'mt-3'}>
                                <div className={'row'}>
                                    <div className={'col-2'}>
                                        {props.shelfCurrentLoans.coffee?.img ?
                                            <img src={props.shelfCurrentLoans.coffee?.img}
                                                 width={56} height={87} alt={'coffee'}/>
                                            :
                                            <img src={require('./../../../Images/CoffeeImages/new-coffee.png')}
                                                 width={56} height={87} alt={'coffee'}/>
                                        }
                                    </div>
                                    <div className={'col-10'}>
                                        <h6>{props.shelfCurrentLoans.coffee.country}</h6>
                                        <h4>{props.shelfCurrentLoans.coffee.name}</h4>
                                    </div>
                                </div>
                                <hr/>
                                {props.shelfCurrentLoans.daysLeft > 0 &&
                                    <p className={'text-secondary'}>
                                        Due in {props.shelfCurrentLoans.daysLeft} days.
                                    </p>
                                }
                                {props.shelfCurrentLoans.daysLeft === 0 &&
                                    <p className={'text-success'}>
                                        Due Today.
                                    </p>
                                }
                                {props.shelfCurrentLoans.daysLeft < 0 &&
                                    <p className={'text-danger'}>
                                        Past due by {props.shelfCurrentLoans.daysLeft} days.
                                    </p>
                                }
                                <div className={'list-group mt-3'}>
                                    <button className={'list-group-item list-group-item-action'}
                                            data-bs-dismiss={'modal'} aria-current={'true'}
                                            onClick={() => props.returnCoffee(props.shelfCurrentLoans.coffee.id)}
                                    >
                                        Return Coffee
                                    </button>
                                    <button className={props.shelfCurrentLoans.daysLeft < 0 ?
                                            'list-group-item list-group-item-action active'
                                            : 'list-group-item list-group-item-action'}
                                            data-bs-dismiss={'modal'}
                                            onClick={props.shelfCurrentLoans.daysLeft < 0 ?
                                                (event) => event.preventDefault()
                                                :
                                                () => props.renewLoan(props.shelfCurrentLoans.coffee.id)}
                                    >
                                        {props.shelfCurrentLoans.daysLeft < 0 ?
                                        'Late dues cannot be renewed' : 'Renew loan for 7 days'
                                        }
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={'modal-footer'}>
                        <button className={'btn btn-secondary'} type={'button'} data-bs-dismiss={'modal'}>
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}