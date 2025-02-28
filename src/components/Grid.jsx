import { useState, useEffect } from 'react';
import { workoutProgram as training_plan } from '../utils/index.js'
import WorkoutCard from './WorkoutCard.jsx';

export default function Grid() {

    const [savedWorkouts, setSavedWorkouts] = useState(null);
    const [selectedWorkout, setSelectedWorkout] = useState(null);
    const completedWorkout = Object.keys(savedWorkouts || {}).filter((value) => {
        const entry = savedWorkouts[value];
        return entry.isComplete;
    });

    function handleSave(index, data) {
        // save to local storage and modify the saved workouts state
        const newObj = {
            ...savedWorkouts,
            [index]: {
                ...data,
                isComplete: !!data.isComplete || !!savedWorkouts?.[index]?.isComplete
            }
        }

        setSavedWorkouts(newObj);
        localStorage.setItem('brogram', JSON.stringify(newObj));
        setSelectedWorkout(null);
    }

    function handleComplete(index, data) {
        // complete a workout (so basically we modify the complete status)
        const newObj = { ...data }
        newObj.isComplete = true;
        handleSave(index, newObj);
    }

    useEffect(() => {
        if (!localStorage) { return }
        let savedData = {}

        if (localStorage.getItem('brogram')) {
            savedData = JSON.parse(localStorage.getItem('brogram'));
        }
        setSavedWorkouts(savedData);

    }, [])

    return (
        <div className="training-plan-grid">
            {Object.keys(training_plan).map((workout, workoutIndex) => {
                const isLocked = workoutIndex === 0 ?
                    false :
                    !completedWorkout.includes(`${workoutIndex - 1}`);

                const type = workoutIndex % 3 === 0 ?
                    'PUSH' : workoutIndex % 3 === 1 ?
                        'PULL' : 'LEGS'

                const trainingPlan = training_plan[workoutIndex]
                const dayNum = ((workoutIndex / 8) <= 1) ?
                    '0' + (workoutIndex + 1) : workoutIndex + 1

                const icon = workoutIndex % 3 === 0 ? (
                    <i className='fa-solid fa-dumbbell'></i>
                ) : (
                    workoutIndex % 3 === 1 ? (
                        <i className='fa-solid fa-weight-hanging'></i>
                    ) : (
                        <i className='fa-solid fa-bolt'></i>
                    ))

                if (workoutIndex === selectedWorkout) {
                    return (
                        <WorkoutCard key={workoutIndex}
                            trainingPlan={trainingPlan}
                            type={type}
                            workoutIndex={workoutIndex}
                            dayNum={dayNum}
                            icon={icon}
                            handleSave={handleSave}
                            handleComplete={handleComplete}
                            savedWeights={savedWorkouts?.[workoutIndex]?.weights}
                        />
                    )
                }

                return (
                    <button onClick={() => {
                        if (isLocked) { return }
                        setSelectedWorkout(workoutIndex)
                    }}
                        className={'card plan-card ' + (isLocked ? 'inactive' : '')}
                        key={workoutIndex}>
                        <div className='plan-card-header'>
                            <p>Day {dayNum}</p>
                        </div>
                        {isLocked ? (
                            <i className='fa-solid fa-lock'></i>
                        ) : (icon)}
                        <div className='plan-card-header'>
                            <h4><b>{type}</b></h4>
                        </div>
                    </button>
                )
            })}
        </div>
    )
}