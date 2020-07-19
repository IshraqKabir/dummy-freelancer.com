import React, { useEffect, useState } from 'react';

import './PostButton.css';

import { useSelector, useDispatch } from 'react-redux';


const PostButton = () => {
    const [visible, setVisible] = useState(false);
    const name = useSelector(state => state.name.value);
    const details = useSelector(state => state.details.value);
    const skillsCount = useSelector(state => state.skills.selectedSkills.length);
    const minBudget = useSelector(state => state.payment.minBudget);
    const maxBudget = useSelector(state => state.payment.maxBudget);
    const currencyType = useSelector(state => state.payment.currencyType);
    
    useEffect(() => {
        if (
            name !== '' &&
            details !== '' &&
            skillsCount !== 0 &&
            skillsCount < 4 &&
            minBudget > 0 &&
            maxBudget >= 0 &&
            currencyType !== 'Currency'
        ) 
        {
            setVisible(true);
        } else {
            setVisible(false);
        }
    }, [
        name,
        details,
        skillsCount,
        minBudget,
        maxBudget,
        currencyType
    ]);

    return (
        <>
        {visible?
            <button 
                type="submit" 
                className="PostMyProjectButton"
            >Yes, post my project</button>
        :null}
        </>
    )
}

export default PostButton;