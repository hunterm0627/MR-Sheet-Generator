import React from 'react';

const Warning = ({ message }) => {
    return (
        <div className="alert alert-warning text-center" role="alert">
            {message}
        </div>
    );
};

export default Warning;
