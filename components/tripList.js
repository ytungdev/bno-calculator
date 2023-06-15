import React from "react";
import utilStyles from '../styles/utils.module.css';

import { useAuthContext } from "../hooks/useAuthContext";

export default function TripList(props) {
    const {user, setUser} = useAuthContext();
    

    const TripRow = ({ items, renderItem }) => {
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


    return (
        <>
        <TripRow
            items={user.trips}
            renderItem={(trip) =>
                <div key={trip.id}>
                    <p className={utilStyles.listItem}>
                        {trip.from_date} - {trip.to_date}
                        <br />
                        {trip.destination}
                    </p>
                </div>

            }
        />
        </>
    )
    
    
}


