import React, { useEffect } from "react";
import "./paginator.css";

import { useSelector, useDispatch } from "react-redux";

function Paginator ()
{
    const searchResults = useSelector(state => state.searchResults);
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch({type: 'connected', componentName: 'paginator'});
    }, []);

    return (
    <>
        
    </>
    );
}

export default Paginator;