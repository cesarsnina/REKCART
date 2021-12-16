import React from 'react';
import Moment from 'moment';
import { useNavigate } from "react-router-dom";

const Workout2 = ({workout, userId}) => {
    const navigate = useNavigate()

    return (
        <>
            {workout ? (
                <>
                    <tr key={workout.id} onClick={() =>  navigate(`${workout.id}`)}>
                        <td>{Moment(workout.date).format('MM-DD-YYYY')}</td>
                        <td> {workout.type}</td>
                        <td>{workout.calories}</td>
                        <td>{workout.time}</td>
                    </tr>
                </>
            ) : (
                <h1>"This workout no longer exists..."</h1>
            )}
        </>
    )
}

export default Workout2;