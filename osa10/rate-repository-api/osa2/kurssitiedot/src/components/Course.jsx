//Komponentti Course
const Course = ({course}) => {
    const result = course.parts.map(note => note.exercises)
    const sumParts = course.parts.reduce(
      (accumulator, currentValue) => accumulator + currentValue.exercises,
      course.parts[0].exercises,
    )
    console.log(result)
    return (
      <div>
        <h1>{course.name}</h1>
          {course.parts.map(part => 
            <p key={part.id}>{part.name} {part.exercises}</p>
          )}
        <p><b>Total of {sumParts} exercises</b></p>
      </div>
    )
  
  }

  export default Course