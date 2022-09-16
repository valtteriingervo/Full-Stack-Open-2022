const ExerciseSum = ({ courseParts }) => {
    // To-do
    // Form the exercises count array from courseParts as in [{}, {}, {}]
    const courseExercises = courseParts.map(part => part.exercises)
    const sum = courseExercises.reduce(
        (prevExercisesCount, currentCount) => prevExercisesCount + currentCount
    )
    return (
        <h3>total of {sum} exercises</h3>
    )
}

const Part = ({ part }) => {
    return (
        <li>
            {part.name} {part.exercises}
        </li>
    )
}


const Content = ({ courseParts }) => {
    return (
        <div>
            <ul>
                {courseParts.map(part =>
                    <Part key={part.id} part={part} />
                )}
            </ul>
        </div>
    )
}

const Header = ({ courseHeader }) => {
    return (
        <>
            <h1>{courseHeader}</h1>
        </>
    )
}

const Course = ({ course }) => {
    return (
        <>
            <Header courseHeader={course.name} />
            <Content courseParts={course.parts} />
            <ExerciseSum courseParts={course.parts} />
        </>
    )
}

export default Course