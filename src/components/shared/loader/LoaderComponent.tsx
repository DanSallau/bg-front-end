import * as React from 'react';
import './LoaderComponent.scss';

interface IProps {
    isLoading: boolean;
}

export const LoaderComponent: React.SFC<IProps> = (props: IProps): React.ReactElement<void> => {
    return (
        props.isLoading &&
        <div className="loader">
            <svg viewBox="0 0 32 32" width="32" height="32">
                <circle id="spinner" cx="16" cy="16" r="14" fill="none"></circle>
            </svg>
        </div>

    )

}

const LoadableLoader: React.SFC = (): React.ReactElement<void> => {
    return (

        <div className="loader">
            <svg viewBox="0 0 32 32" width="32" height="32">
                <circle id="spinner" cx="16" cy="16" r="14" fill="none"></circle>
            </svg>
        </div>
    )

}

export default LoadableLoader;