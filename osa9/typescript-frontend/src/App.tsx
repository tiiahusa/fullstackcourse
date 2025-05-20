import type { JSX } from "react";

interface CoursePart {
  name: string,
  exerciseCount: number
}

const Header = ({ name }: { name: string }): JSX.Element => {
  return <h1>{name}</h1>
}

const Content = ({ parts }: { parts: CoursePart[] }): JSX.Element => {
  return (
    <div> 
      {parts.map((part, index) => (
        <p key={index}>
          {part.name} {part.exerciseCount}
        </p>
      ))}
    </div>
  );
}

const Total = ({ parts }: { parts: CoursePart[] }): JSX.Element => {
  const total = parts.reduce((sum, part) => sum + part.exerciseCount, 0);
  return <p><strong>Total exercises: {total}</strong></p>;
};

const App = () => {
  const courseName = "Half Stack application development";
  const courseParts = [
    {
      name: "Fundamentals",
      exerciseCount: 10
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14
    }
  ];
  

  return (
    <div>
      <Header name={courseName} />
      <Content parts={courseParts} />
      <Total parts={courseParts} />
    </div>
  )
};

export default App;