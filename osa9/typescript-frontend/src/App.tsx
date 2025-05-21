import type { JSX } from "react";

interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartBasic extends CoursePartDescription {
  kind: "basic";
}

interface CoursePartDescription extends CoursePartBase {
  description: string;
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: "group"
}

interface CoursePartBackground extends CoursePartDescription {
  backgroundMaterial: string;
  kind: "background"
}

interface CoursePartSpecial extends CoursePartDescription {
  requirements: string[];
  kind: "special";
}

type CoursePart = CoursePartSpecial | CoursePartBasic | CoursePartGroup | CoursePartBackground;

const Part = ({ part }: { part: CoursePart }) => {
  switch(part.kind) {
    case "basic":
      return (
        <div>
          <p>
            <b>{part.name} {part.exerciseCount}</b> <br></br>
            <i>{part.description}</i>
          </p>
        </div>
      )
    case "group":
      return (
        <div>
          <p>
            <b>{part.name} {part.exerciseCount}</b><br></br>
            project exercises {part.groupProjectCount}
          </p>
        </div>
      )    
    case "background":
      return (
        <div>
          <p>
            <b>{part.name} {part.exerciseCount}</b><br></br>
            <i>{part.description}</i><br></br>
            submit to {part.backgroundMaterial}
          </p>
        </div>
      )
    case "special":
      return (
        <div>
          <p>
            <b>{part.name} {part.exerciseCount}</b><br></br>
            <i>{part.description}</i><br></br>
            required skills: {part.requirements.map(x => x).join(", ")}
          </p>
        </div>
      )
  }

}

const Header = ({ name }: { name: string }): JSX.Element => {
  return <h1>{name}</h1>
}

const Content = ({ parts }: { parts: CoursePart[] }): JSX.Element => {
  return (
    <div> 
      {parts.map((part, key) => (
        <div key={key}>
          <Part part={part}></Part>
        </div>
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
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is an awesome course part",
      kind: "basic"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3,
      kind: "group"
    },
    {
      name: "Basics of type Narrowing",
      exerciseCount: 7,
      description: "How to go from unknown to string",
      kind: "basic"
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      backgroundMaterial: "https://type-level-typescript.com/template-literal-types",
      kind: "background"
    },
    {
      name: "TypeScript in frontend",
      exerciseCount: 10,
      description: "a hard part",
      kind: "basic",
    },
    {
      name: "Backend development",
      exerciseCount: 21,
      description: "Typing the backend",
      requirements: ["nodejs", "jest"],
      kind: "special"
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