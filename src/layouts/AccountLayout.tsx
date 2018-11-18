import * as React from 'react';

import { SliderComponent } from '../components/shared/slider/SliderComponent';
import HeaderComponent from '../components/shared/header/HeaderComponent';
import PaginationComponent from '../components/shared/pagination/PaginationComponent';
import FooterComponent from '../components/shared/footer/FooterComponent';

interface IAccountLayout {
    account: any;
    signOut: () => void,
}

export default class AccountLayout extends React.PureComponent<IAccountLayout, {}> {

    componentDidCatch(error, errorInfo) {
        // Catch errors in any components below and re-render with error message
        console.log("An error coming from layout")
        // You can also log error messages to an error reporting service here
    }

    render() {
        return (
            <div className="container-fluid">

                <SliderComponent />


                <section className="content">

                    <div
                        className="container"
                        style={{
                            marginTop: 38
                        }}>
                        <div className="row">
                            <div className="col-lg-8 col-md-8">
                                {this.props.children}
                            </div>
                            <div className="col-lg-4 col-md-4">

                                <div className="sidebarblock">
                                    <h3>Categories</h3>
                                    <div className="divline"></div>
                                    <div className="blocktxt">
                                        <ul className="cats">
                                            <li>
                                                <a href="#">Trading for Money
                                                    <span className="badge pull-right">20</span>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#">Vault Keys Giveway
                                                    <span className="badge pull-right">10</span>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#">Misc Guns Locations
                                                    <span className="badge pull-right">50</span>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#">Looking for Players
                                                    <span className="badge pull-right">36</span>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#">Stupid Bugs &amp; Solves
                                                    <span className="badge pull-right">41</span>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#">Video &amp; Audio Drivers
                                                    <span className="badge pull-right">11</span>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#">2K Official Forums
                                                    <span className="badge pull-right">5</span>
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>

                                <div className="sidebarblock">
                                    <h3>Poll of the Week</h3>
                                    <div className="divline"></div>
                                    <div className="blocktxt">
                                        <p>Which game you are playing this week?</p>
                                        <form action="#" method="post" className="form">
                                            <table className="poll">
                                                <tbody>
                                                    <tr>
                                                        <td>
                                                            <div className="progress">
                                                                <div
                                                                    className="progress-bar color1"
                                                                    role="progressbar"
                                                                    aria-valuenow={40}
                                                                    aria-valuemin={0}
                                                                    aria-valuemax={100}
                                                                    style={{
                                                                        width: '90%'
                                                                    }}>
                                                                    Call of Duty Ghosts
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="chbox">
                                                            <input id="opt1" type="radio" name="opt" value="1" />
                                                            <label htmlFor="opt1"></label>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <div className="progress">
                                                                <div
                                                                    className="progress-bar color2"
                                                                    role="progressbar"
                                                                    aria-valuenow={40}
                                                                    aria-valuemin={0}
                                                                    aria-valuemax={100}
                                                                    style={{
                                                                        width: 63 + '%'
                                                                    }}>
                                                                    Titanfall
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="chbox">
                                                            <input id="opt2" type="radio" name="opt" value="2" checked />
                                                            <label htmlFor="opt2"></label>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <div className="progress">
                                                                <div
                                                                    className="progress-bar color3"
                                                                    role="progressbar"
                                                                    aria-valuenow={40}
                                                                    aria-valuemin={0}
                                                                    aria-valuemax={100}
                                                                    style={{
                                                                        width: 75 + '%'
                                                                    }}>
                                                                    Battlefield 4
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="chbox">
                                                            <input id="opt3" type="radio" name="opt" value="3" />
                                                            <label htmlFor="opt3"></label>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </form>
                                        <p className="smal">Voting ends on 19th of October</p>
                                    </div>
                                </div>

                                {/* {/*<!-- -->*/
                                } * /}
                                <div className="sidebarblock">
                                    <h3>My Active Threads</h3>
                                    <div className="divline"></div>
                                    <div className="blocktxt">
                                        <a href="#">This Dock Turns Your iPhone Into a Bedside Lamp</a>
                                    </div>
                                    <div className="divline"></div>
                                    <div className="blocktxt">
                                        <a href="#">Who Wins in the Battle for Power on the Internet?</a>
                                    </div>
                                    <div className="divline"></div>
                                    <div className="blocktxt">
                                        <a href="#">Sony QX10: A Funky, Overpriced Lens Camera for Your Smartphone</a>
                                    </div>
                                    <div className="divline"></div>
                                    <div className="blocktxt">
                                        <a href="#">FedEx Simplifies Shipping for Small Businesses</a>
                                    </div>
                                    <div className="divline"></div>
                                    <div className="blocktxt">
                                        <a href="#">Loud and Brave: Saudi Women Set to Protest Driving Ban</a>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>

                </section>

                <footer>
                    <FooterComponent />
                </footer>

            </div>
        )
    }

}