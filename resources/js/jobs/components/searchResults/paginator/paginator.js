import React, { useState, useEffect } from "react";
import "./paginator.css";

import { useSelector, useDispatch } from "react-redux";

import { jobsPerPage } from '../../../store/reducer';

function Paginator ()
{
    const unMutableSearchResults = useSelector(state => state.unMutableSearchResults);
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
        if (unMutableSearchResults.length%jobsPerPage === 0) {
            setTotalPages(unMutableSearchResults.length / jobsPerPage);
        }
        else {
            setTotalPages(1 + unMutableSearchResults.length / jobsPerPage);
        }
    }, [unMutableSearchResults]);

    let paginatorButtons = [];

    let i = currentPage;

    console.log('current page  ' + currentPage);
    
    
    for (let i = currentPage; i < currentPage + 3; i++) {
        console.log(i);
        if (currentPage === 1) {
            if (i <= totalPages)
            paginatorButtons.push(
                <div 
                    className={"paginator-button " + (currentPage === i ? 'current' : '')}
                    key={i}
                    onClick={() => paginate(i)}
                >
                  {i}
                </div>
            );
        }
        else {
            if (i < totalPages + 2)
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
        console.log(i);
        if (i < 1) return;
        setCurrentPage(i);
        dispatch({type: 'PAGINATE', pageNumber: i});

    }

    const next = (i) => {
        if (i <= totalPages && currentPage !== totalPages) {
            paginate(i);
        }
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
            onClick={() => paginate(currentPage-1)}
        >
            Prev
        </div>
        {paginatorButtons}
        <div 
            className="paginator-button"
            onClick={() => next(currentPage+1)}
        >
            Next
        </div>
        <div 
            className="paginator-button last"
            onClick={() => paginate(totalPages)}
        >
            Last
        </div>
    </div>
    );
}

export default Paginator;