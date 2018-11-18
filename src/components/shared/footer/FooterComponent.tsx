import * as React from 'react';

const Footer : React.StatelessComponent = () : React.ReactElement < void > => {
    return (

        <div className="container">
            <div className="row">
                <div className="col-lg-1 col-xs-3 col-sm-2 logo ">
                    <a href="#"><img src={require('../../../styles/images/logo.jpg')} alt=""/></a>
                </div>
                <div className="col-lg-8 col-xs-9 col-sm-5 ">Copyrights 2014, websitename.com</div>
                <div className="col-lg-3 col-xs-12 col-sm-5 sociconcent">
                    <ul className="socialicons">
                        <li>
                            <a href="#">
                                <i className="fa fa-facebook-square"></i>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <i className="fa fa-twitter"></i>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <i className="fa fa-google-plus"></i>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <i className="fa fa-dribbble"></i>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <i className="fa fa-cloud"></i>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <i className="fa fa-rss"></i>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Footer;