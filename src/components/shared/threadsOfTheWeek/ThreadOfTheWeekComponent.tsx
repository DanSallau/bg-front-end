import * as React from 'react';

import { Link } from 'react-router-dom';

interface IThreadOfTheWeek {
    postTitle: string,
    postId: number,
}

export interface IThreadOfTheWeekProps {
    threads: Array<IThreadOfTheWeek>
}

const ThreadOfTheWeek: React.StatelessComponent<IThreadOfTheWeekProps> = (props: IThreadOfTheWeekProps): React.ReactElement<void> => {
    return (
        <div className="sidebarblock">
            <h3>Threads of the week</h3>
            {props.threads.map((thread: IThreadOfTheWeek, index) =>
                <div key={index}>
                    <div className="divline"></div>
                    <div className="blocktxt">
                        <Link to={`/${thread.postId}/${thread.postTitle}`}>{thread.postTitle}</Link>
                    </div>
                </div>
            )}
        </div>
    )
}

export default ThreadOfTheWeek;