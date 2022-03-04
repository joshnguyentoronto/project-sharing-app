import React from 'react';
import './Filter.css';
import Flag from '../Flag/Flag'

export default function Filter(props) {
    return(
        <div className="filter">
            <div className="filter-search">
                <input className='filter-search-bar' type="text" />
            </div>
            <div className='filter-flags'>
                {props.flags.map(f => 
                    <Flag onClick={() => {props.filterByFlag()}} key={f} flag={f} />
                )}
            </div>
        </div>
    )
}