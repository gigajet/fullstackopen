import { Course } from "./Course.jsx"

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    },
    {
      name: 'Compiler construction',
      id: 3,
      parts: [
        {
          name: 'EBNF',
          exercises: 2,
          id: 1
        },
        {
          name: 'Oberon-2 compiler construction',
          exercises: 10,
          id: 2
        }
      ]
    }
  ]
  return (
  <>
    {courses.map(c=>{
      console.log('Courses map',c)
      return <Course course={c} key={c.id} />
    })}
  </>
  )
}

export default App
