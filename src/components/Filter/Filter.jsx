import React from 'react';
import './Filter.css';
import Flag from '../Flag/Flag'

export default function Filter(props) {
    return(
        <div className="filter">
            <div className="filter-search">
                <form autoComplete='off'  onSubmit={props.filterByTag}>
                    <input onChange={props.handleChange} name="currentTag" className='filter-search-bar' type="text" />
                    <button onSubmit={props.filterByTag} type='submit'>Search</button>
                </form>
            </div>
            <div className='filter-flags'>
                {props.flags.map(f => 
                    <Flag filterByFlag={props.filterByFlag} key={f} flag={f} />
                )}
            </div>
        </div>
    )
}