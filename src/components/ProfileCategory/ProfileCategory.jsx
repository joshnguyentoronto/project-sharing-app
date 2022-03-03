import './ProfileCategory.css'
import React, { Component } from 'react'

export default function ProfileCategory(props) {
    return (
        <div>
            <ul className="ProfileCategory">
                {props.categories.map(c =>
                    <li 
                        className={c === props.activeCategory ? 'active' : ''}
                        onClick={() => props.handleSetActiveCat(c)}
                >{c}</li>
                )}
            </ul>
        </div>
    )
}