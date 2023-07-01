import React from 'react';
import {useRouteError} from "react-router-dom";

const Error = () => {
    const error = useRouteError();

    return (
        <div>
           looksLike something's gone wrong
            {error.statusText}
        </div>
    );
};

export default Error;