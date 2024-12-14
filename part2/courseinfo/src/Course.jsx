
const Header=(props)=>{
    return (
      <>
        <h1>{props.course.name}</h1>
      </>
    )
  }
  
  const Part=(props)=>{
    console.log('Part',props)
    return (
      <>
        <p>{props.part.name} {props.part.exercises}</p>
      </>
    )
  }
  
  const Content=(props)=>{
    console.log('Content',props)
    const {parts}=props
    return (
      <>
      {
        parts.map(p=><Part part={p} key={p.id}/>)
      }
      </>
    )
  }
  
  const Total=(props)=>{
    console.log('Total',props)
    const total=props.parts.reduce(
      (sum,part)=>sum+part.exercises,
      0
    )
    return (
      <>
        <p><b>total of {total} exercises</b></p>
      </>
    )
  }

const Course=(props)=>{
    console.log('Course',props)
    const {course}=props
    return (
      <div>
        <Header course={course} />
        <Content parts={course.parts} />
        <Total parts={course.parts} />
      </div>
    )
  }

export default Course
