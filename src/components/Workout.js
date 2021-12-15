import React from 'react';
import Moment from 'moment';

const Workout = ({workout}) => {

    return (
        <div>
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
        </div>
    );
}

export default Workout;


// useEffect:
// 2nd argument = array of dependencies
// if 2nd argument = empty array, will only run once - when component's initialized
// if 2nd argument = state, runs whenever state listed inside array is changed
