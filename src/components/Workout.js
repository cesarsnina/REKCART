import React from 'react';
import Moment from 'moment';

const Workout = ({workout}) => {
    return (
        <>
            {workout ? (
                <>
                    <tr key={workout.id}>
                        <td>{Moment(workout.date).format('mm-dd-yyyy')}</td>
                        <td>{workout.type}</td>
                        <td>{workout.calories}</td>
                        <td>{workout.time}</td>
                    </tr>
                </>
            ) : (
                <h1>"This workout no longer exists..."</h1>
            )}
            <br/>
        </>
    );
}

export default Workout;