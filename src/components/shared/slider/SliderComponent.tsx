import * as React from 'react';

export class SliderComponent extends React.PureComponent < {}, {} > {
    componentDidMount() {

        var revapi;

        jQuery(document).ready(function () {
            "use strict";
            var selector : any = jQuery('.tp-banner');
            revapi = selector.revolution({delay: 150000, startwidth: 1200, startheight: 278, hideThumbs: 10, fullWidth: "on"});

        });
    }
    render() {
        return (
            <div className="tp-banner-container">
                <div className="tp-banner">
                    <ul>
                        {/*<!-- SLIDE  -->*/}
                        <li data-transition="fade" data-slotamount="7" data-masterspeed="1500">
                            {/*<!-- MAIN IMAGE -->*/}
                            <img
                                src={require('../../../styles/images/slide.jpg')}
                                alt="slidebg1"
                                data-bgfit="cover"
                                data-bgposition="left top"
                                data-bgrepeat="no-repeat"/> {/*<!-- LAYERS -->*/}
                        </li>
                    </ul>
                </div>
            </div>
        )
    }

}