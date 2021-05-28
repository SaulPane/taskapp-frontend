import React from 'react'

function Error({value}) {

    
        return (
            value && <p className="error m-1 p-2">{value}</p>
        )
    

    
};

export default Error;

