import React from "react";
import utilStyles from '../styles/utils.module.css';

export default function TripList({ items, renderItem }) {
    return (
        <div>
            <h2 className={utilStyles.headingLg}>Trips</h2>
            <ul className={utilStyles.list}>
                {items.map((trip) => {
                    return renderItem(trip);
                })}
            </ul>
        </div>
    )
}


