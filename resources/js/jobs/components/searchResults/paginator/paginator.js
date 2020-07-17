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
        dispatch({type: 'connected', componentName: 'paginator'});
        dispatch({type: 'PAGINATE', pageNumber: currentPage});
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

    for (let i = currentPage; i < currentPage + 3; i++) {
        paginatorButtons.push(
            <div 
                className="paginator-button"
                key={i}
                onClick={() => paginate(i)}
            >
              {i}
            </div>
        );
    }

    const paginate = (i) => {
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
        <div className="paginator-button previous">
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