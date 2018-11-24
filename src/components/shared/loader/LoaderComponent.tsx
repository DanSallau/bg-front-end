import * as React from "react";

export interface LoaderProps {
    toggle: boolean;
    fullscreen?: boolean;
    className?: string;
}

export const LoaderComponent: React.StatelessComponent<LoaderProps> = (props: LoaderProps): React.ReactElement<void> => {
    const fullscreen: boolean = props.fullscreen === undefined ? true : props.fullscreen;
    let loaderWrapper: string = "loaderWrapper ";
    if (fullscreen) { loaderWrapper += "fullscreen "; }

    return (
        <div className={loaderWrapper + (props.className ? props.className : "")}>
            {props.toggle &&
                <div className="loader-holder">
                    <div className="loader" />
                </div>
            }
        </div>
    );
};

const Loader: React.StatelessComponent = (): React.ReactElement<void> => {
    return (
        <div className={'loaderWrapper'}>
            <div className="loader-holder">
                <div className="loader" />
            </div>

        </div>
    );
};

export default Loader;