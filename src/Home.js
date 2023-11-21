import React from 'react';
import { Link } from 'react-router-dom';
import coin from './images/coin.png';

const Home = () => {
  return (
    <div>
        <div className="body-container">
            <div className="left-section">
                <img src={coin} alt='Coin-icons'></img>
            </div>
            <div className="right-section">
              <p>A finance management system is a comprehensive tool designed to help individuals, businesses, or organizations effectively handle their financial affairs. It encompasses a range of features, including budgeting, expense tracking, income management, investment monitoring, and financial reporting. By utilizing such a system, users can gain better control over their finances, make informed decisions, and achieve their financial goals.</p>
              <Link to='/input' className='start-now'>Start Now.</Link>
            </div>
        </div>
    </div>
  )
}

export default Home