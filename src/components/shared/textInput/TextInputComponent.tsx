import * as React from 'react';


export interface ITextInput {
    className?: string;
    type?: string;
    placeHolder: string;
    id?: string;
    name?: string;
    error?: string;
    onTextChanged: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const TextInput: React.StatelessComponent<ITextInput> = (props: ITextInput): React.ReactElement<void> => {

    return (
        <React.Fragment>
            <input type={props.type ? props.type : "text"} placeholder={props.placeHolder} className={"form-control" + (props.className ? ` ${props.className}` : "")} onChange={props.onTextChanged} />
            {props.error &&
                <div className="alert alert-danger" role="alert">
                    <strong>Oh snap!</strong> {props.error}
                </div>
            }
        </React.Fragment>
    );
}

export default TextInput;