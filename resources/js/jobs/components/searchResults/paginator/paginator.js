import React, { useState, useEffect } from "react";
import "./paginator.css";

import { useSelector, useDispatch } from "react-redux";

import { jobsPerPage } from '../../../store/reducer';

function Paginator ()
{
    const searchResults = useSelector(state => state.searchResults);
    const dispatch = useDispatch();
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);


    
    useEffect(() => {
        let stateCheck = 1;
        if (stateCheck) {
            dispatch({type: 'connected', componentName: 'paginator'});
            dispatch({type: 'PAGINATE', pageNumber: currentPage});
        }

        return () => {
            stateCheck = 0;
        }
    }, []);

    useEffect(() => {
        if (searchResults.length%jobsPerPage === 0) {
            setTotalPages(searchResults.length / jobsPerPage);
        }
        else {
            setTotalPages(1 + searchResults.length / jobsPerPage);
        }
    }, [searchResults]);

    let paginatorButtons = [];
    
    let buttonCountLimit = currentPage + 3;

    // if (currentPage + 2 > totalPages) {
    //     buttonCountLimit = currentPage + 1;
    // }
    // else if (currentPage + 3 > totalPages) {
    //     buttonCountLimit = currentPage + 2;
    // }
    
    for (let i = currentPage; i < buttonCountLimit; i++) {
        if (currentPage === 1) {
            paginatorButtons.push(
                <div 
                    className={"paginator-button " + (currentPage === i ? 'current' : '')}
                    key={i}
                    onClick={() => paginate(i)}
                >
                  {i}
                </div>
            );
        } else{
            paginatorButtons.push(
                <div 
                    className={"paginator-button " + (currentPage === i-1 ? 'current' : '')}
                    key={i-1}
                    onClick={() => paginate(i-1)}
                >
                    {i-1}
                </div>
            );            
        }
    }

    const paginate = (i) => {
        setCurrentPage(i);
        dispatch({type: 'PAGINATE', pageNumber: i});
    }


    return (
    <div className="paginator-Container">
        <div 
            className="paginator-button first"
            onClick={() => paginate(1)}
        >
            First
        </div>
        <div 
            className="paginator-button previous"
            // onClick={}
        >
            Prev
        </div>
        {paginatorButtons}
        <div className="paginator-button">
            Next
        </div>
        <div 
            className="paginator-button last"
            
        >
            Last
        </div>
    </div>
    );
}

export default Paginator;