import React from 'react';
import Moment from 'moment';

const Workout = ({workout, userId}) => {
    const { id, date, type, calories, time } = workout;

    const handleClick = (id) => {
        window.location.href=`/users/${userId}/workouts/${id}`
    }

    return (
        <tr key={id} onClick={() => handleClick(id)}>
            <td>{Moment(date).format('mm-dd-yyyy')}</td>
            <td> {type}</td>
            <td>{calories}</td>
            <td>{time}</td>
        </tr>
    )
}

export default Workout;


// useEffect:
// 2nd argument = array of dependencies
// if 2nd argument = empty array, will only run once - when component's initialized
// if 2nd argument = state, runs whenever state listed inside array is changed