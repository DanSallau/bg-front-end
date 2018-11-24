import * as React from 'react';
import * as quill from "quill";
import { AxiosResponse } from 'axios';
import { CommentApi } from '../../../apis/comment.api';

const Quill = (quill as any).default ? (quill as any).default : quill;

interface IEditorProps {
    account: any,
    logCommentError: (message: string) => void;
    requestComment: () => void,
    receiveComment: () => void,
}

export class QuillEditorComponent extends React.PureComponent<IEditorProps, {}> {
    private editor: quill.Quill;
    private commentApi: CommentApi;

    constructor(props: IEditorProps) {
        super(props);

        this.commentApi = new CommentApi();
    }

    handleUploadImage() {
        const input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.click();
        // Listen upload local image and save to server
        input.onchange = () => {
            const file = input.files[0];

            // file type is only image.
            if (/^image\//.test(file.type)) {
                this.saveToServer(file);
            } else {
                console.warn('You could only upload images.');
            }
        };
    }

    linkhandler(value: any) {
        if (value) {
            var href = prompt('Enter the URL');
            this.editor.format('link', href);
        } else {
            this.editor.format('link', false);
        }
    }

    saveToServer(file: File) {
        const fd = new FormData();
        const { account, requestComment, logCommentError } = this.props;
        fd.append('albumName', 'posts');
        fd.append('image', file);

        requestComment();
        this.commentApi.uploadImage(fd, account.token)
            .then((response: AxiosResponse) => {
                if (response.status === 200) {
                    const url = response.data.url;
                    this.insertToEditor(url);
                }
            })
            .catch(err => {
                console.log("Upload image failed ", err);
                logCommentError(err);
            })
    }


    insertToEditor(url: string) {
        const range = this.editor.getSelection();
        if (range) {
            this.editor.insertEmbed(range.index, 'image', url);
            this.props.receiveComment();
        }

    }

    componentDidMount() {
        const toolbarOptions = [
            [{ header: [1, 2, false] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            ['image', 'link', 'bullet', 'indent'],
            [{ 'color': [] }, { 'background': [] }],
        ];

        const mobileOptions = [
            ['image'],
        ];

        const mobileChoice = document.getElementById('editorMobile');
        const desktopChoice = document.getElementById('editor');
        if (mobileChoice.offsetParent) {
            this.editor = new Quill(mobileChoice, {
                modules: {
                    toolbar: mobileOptions

                },
                placeholder: 'Kayi rubutu anan...',
                theme: 'snow',
            });
        } else if (desktopChoice.offsetParent) {
            this.editor = new Quill(desktopChoice, {
                modules: {
                    toolbar: toolbarOptions

                },
                placeholder: 'Kayi rubutu anan...',
                theme: 'snow',
            });
        }

        this.editor.getModule('toolbar').addHandler('image', this.handleUploadImage.bind(this));
        this.editor.getModule('toolbar').addHandler('link', this.linkhandler.bind(this));

        this.editor.root.innerHTML = "";
    }

    render() {
        return (
            <React.Fragment>
                <div className="hidden-xs">
                    <div id="editor">
                    </div>
                </div>
                <div className="hidden-sm hidden-md hidden-lg">
                    <div id="editorMobile">
                    </div>
                </div>
            </React.Fragment>
        )
    }

}