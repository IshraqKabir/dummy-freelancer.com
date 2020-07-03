import React from 'react';
import './payment.css';

import fixedPriceLogo from './fixed-price-logo.svg';
import hourlyPriceLogo from './hourly-price-logo.svg';

import { connect } from 'react-redux';

class Payment extends React.Component 
{   
    constructor (props)
    {
        super(props);
        this.state = {
        };

        this.handleSelectHourly = this.handleSelectHourly.bind(this);
        this.handleSelectFixed = this.handleSelectFixed.bind(this);
        this.handleSetCurrency = this.handleSetCurrency.bind(this);
    }


    componentDidMount ()
    {
        this.props.connect('payment.js');
    }
    

    handleSelectHourly ()
    {
      this.props.selectHourly();
    }

    handleSelectFixed ()
    {
        this.props.selectFixed();
    }

    handleSetCurrency (currency) 
    {
        this.props.selectCurrencyType(currency);
    }

    handleSetBudget (min, max) 
    {
        this.props.selectMinBudget(min);
        this.props.selectMaxBudget(max);
    }


    render()
    {   
        let budgetOptions = null;
        
        // USD
        if (this.props.currencyType === 'USD' && this.props.fixed)
        {
            budgetOptions = <React.Fragment>
                <option onClick={() => this.handleSetBudget(10, 30)}>
                    Micro Project ($10.00 - 30.00 USD)    
                </option>
                <option onClick={() => this.handleSetBudget(30, 250)}>
                    Simple Project ($30.00 - 250.00 USD)    
                </option>
                <option onClick={() => this.handleSetBudget(250, 750)}>
                    Very Small Project ($250.00 - 750.00 USD)    
                </option>
                <option onClick={() => this.handleSetBudget(750, 1500)}>
                    Small Project ($750.00 - 1,500.00 USD)    
                </option>
                <option onClick={() => this.handleSetBudget(1500, 3000)}>
                    Medium Project ($1,500.00 - 3,000.00 USD)    
                </option>
                <option onClick={() => this.handleSetBudget(3000, 5000)}>
                    Large Project ($3,000.00 - 5,000.00 USD)    
                </option>
                </React.Fragment>                            
        }
        else if (this.props.currencyType === 'USD' && this.props.hourly)
        {
            budgetOptions = <React.Fragment>
                <option onClick={() => this.handleSetBudget(2, 8)}>
                    Basic ($2.00 - 8.00 USD per hour)    
                </option>
                <option onClick={() => this.handleSetBudget(8, 15)}>
                    Moderate ($8.00 - 15.00 USD per hour)    
                </option>
                <option onClick={() => this.handleSetBudget(15, 25)}>
                    Standard ($15.00 - 25.00 USD per hour)    
                </option>
                <option onClick={() => this.handleSetBudget(25, 50)}>
                    Skilled ($25.00 - 50.00 USD per hour)    
                </option>
                <option onClick={() => this.handleSetBudget(50, 0)}>
                    Expert ($50.00+ USD per hour)    
                </option>
                </React.Fragment>
        }
        // GBP
        else if (this.props.currencyType === 'GBP' && this.props.fixed)
        {
            budgetOptions = <React.Fragment>
                <option onClick={() => this.handleSetBudget(10, 20)}>
                    Micro Project (£10.00 - 20.00 GBP)    
                </option>
                <option onClick={() => this.handleSetBudget(20, 250)}>
                    Simple Project (£20.00 - 250.00 GBP)    
                </option>
                <option onClick={() => this.handleSetBudget(250, 750)}>
                    Very Small Project (£250.00 - 750.00 GBP)    
                </option>
                <option onClick={() => this.handleSetBudget(750, 1500)}>
                    Small Project (£750.00 - 1,500.00 GBP)    
                </option>
                <option onClick={() => this.handleSetBudget(1500, 3000)}>
                    Medium Project (£1,500.00 - 3,000.00 GBP)    
                </option>
                <option onClick={() => this.handleSetBudget(3000, 50000)}>
                    Large Project (£3,000.00 - 5,000.00 GBP)    
                </option>
                </React.Fragment>                            
        }
        else if (this.props.currencyType === 'GBP' && this.props.hourly)
        {
            budgetOptions = <React.Fragment>
                <option onClick={() => this.handleSetBudget(2, 5)}>
                    Basic (£2.00 - 5.00 GBP per hour)    
                </option>
                <option onClick={() => this.handleSetBudget(5, 10)}>
                    Moderate (£5.00 - 10.00 GBP per hour)    
                </option>
                <option onClick={() => this.handleSetBudget(10, 15)}>
                    Standard (£10.00 - 15.00 GBP per hour)    
                </option>
                <option onClick={() => this.handleSetBudget(18, 36)}>
                    Skilled (£18.00 - 36.00 GBP per hour)    
                </option>
                <option onClick={() => this.handleSetBudget(36, 0)}>
                    Expert (£36.00+ GBP per hour)    
                </option>
                </React.Fragment>
        }
        // EUR
        if (this.props.currencyType === 'EUR' && this.props.fixed)
        {
            budgetOptions = <React.Fragment>
                <option onClick={() => this.handleSetBudget(8, 30)}>
                    Micro Project (€8.00 - 30.00 EUR)    
                </option>
                <option onClick={() => this.handleSetBudget(30, 250)}>
                    Simple Project (€30.00 - 250.00 EUR)    
                </option>
                <option onClick={() => this.handleSetBudget(250, 750)}>
                    Very Small Project (€250.00 - 750.00 EUR)    
                </option>
                <option onClick={() => this.handleSetBudget(750, 1500)}>
                    Small Project (€750.00 - 1,500.00 EUR)    
                </option>
                <option onClick={() => this.handleSetBudget(1500, 3000)}>
                    Medium Project (€1,500.00 - 3,000.00 EUR)    
                </option>
                <option onClick={() => this.handleSetBudget(3000, 5000)}>
                    Large Project (€3,000.00 - 5,000.00 EUR)    
                </option>
                </React.Fragment>                            
        }
        else if (this.props.currencyType === 'EUR' && this.props.hourly)
        {
            budgetOptions = <React.Fragment>
                <option onClick={() => this.handleSetBudget(2, 8)}>
                    Basic (€2.00 - 8.00 EUR per hour)    
                </option>
                <option onClick={() => this.handleSetBudget(8, 15)}>
                    Moderate (€8.00 - 15.00 EUR per hour)    
                </option>
                <option onClick={() => this.handleSetBudget(15, 25)}>
                    Standard (€15.00 - 25.00 EUR per hour)    
                </option>
                <option onClick={() => this.handleSetBudget(25, 50)}>
                    Skilled (€25.00 - 50.00 EUR per hour)    
                </option>
                <option onClick={() => this.handleSetBudget(50, 0)}>
                    Expert (€50.00+ EUR per hour)    
                </option>
                </React.Fragment>
        }        

        return (
            <React.Fragment>
                <h3 className="PaymentH3">How would you like to get it done? </h3>
                <div className="PaymentOptionContainer">
                    <div 
                        className={"PaymentOption box-shadow flex-item-1" + (this.props.fixed ? ' blue-border' : '')} 
                        onClick={this.handleSelectFixed}
                    >
                        <img src={fixedPriceLogo} className="priceLogo"/>
                        <div className="paymentDescription">
                          <h4>Pay Fixed Price</h4>
                          <p>Agree on a price and release payment when the job is done. Best for one-off tasks. </p>
                        </div>
                    </div>
                    <div 
                        className={"PaymentOption box-shadow flex-item-2" + (this.props.hourly ? ' blue-border' : '')}
                        onClick={this.handleSelectHourly}
                    >
                        <img src={hourlyPriceLogo} className="priceLogo"/>
                        <div className="paymentDescription">
                            <h4>
                                Pay by the hour
                            </h4>
                            <p className="">
                            Crowdsource ideas. Post a prize and get competing entries which you can iterate on with feedback. Great for visual designs. 
                            </p>
                        </div>
                    </div>
                </div>

                <h3 className="">
                  What is your estimated budget?
                </h3>
                <div className="currencyAndBudgetContainer">
                    <div className="select currencySelect">
                        <select>
                            <option onClick={() => this.handleSetCurrency('USD')}>
                            USD
                            </option>
                            <option onClick={() => this.handleSetCurrency('GBP')}>
                            GBP
                            </option>
                            {/* <option onClick={() => this.handleSetCurrency('CAD')}>
                            CAD
                            </option> */}
                            <option onClick={() => this.handleSetCurrency('EUR')}>
                            EUR
                            </option>
                            {/* <option onClick={() => this.handleSetCurrency('NZD')}>
                            NZD
                            </option> */}
                        </select>
                        <div className="select_arrow">
                          
                        </div>
                    </div>
                    <div className="select budgetSelect">
                        <select>
                            {budgetOptions}
                        </select>
                        <div className="select_arrow">
                          
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

function mapStoreToProps (store)
{
  return {
    hourly: store.payment.hourly,
    fixed: store.payment.fixed,
    currencyType: store.payment.currencyType,
    minBudget: store.payment.minBudget,
    maxBudget: store.payment.maxBudget,
    error: store.payment.error
  }
}

function mapDispatchToProps (dispatch)
{
  return {
    connect: (componentName) => dispatch({type:'connected', componentName}),
    selectHourly: () => dispatch({type:'SELECT_HOURLY'}),
    selectFixed: () => dispatch({type:'SELECT_FIXED'}),
    selectCurrencyType: (value) => dispatch({type: 'SELECT_CURRENCY_TYPE', value}),
    selectMaxBudget: (value) => dispatch({type: 'SELECT_MAX_BUDGET', value}),
    selectMinBudget: (value) => dispatch({type: 'SELECT_MIN_BUDGET', value}),
  }
}


export default connect(mapStoreToProps, mapDispatchToProps) (Payment);


