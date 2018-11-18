import * as React from 'react';
import LoaderComponent from '../shared/loader/LoaderComponent';


export default class AppStateComponent extends React.PureComponent<{}, {}> {
    render() {
        return (
            <div>
                {/* <LoaderComponent tree={true}/> */}
                {this.props.children}
            </div>
        )
    }
}