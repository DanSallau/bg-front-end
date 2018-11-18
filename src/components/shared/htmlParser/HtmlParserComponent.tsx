import * as React from 'react';
import { Parser } from 'html-to-react';

interface IHtmlParser {
    htmlString: string;
}

const HtmlParser: React.StatelessComponent<IHtmlParser> = (props: IHtmlParser): React.ReactElement<void> => {

    const htmlToReactParser = new Parser();

    return (
        htmlToReactParser.parse(props.htmlString)
    );
};

export default HtmlParser;