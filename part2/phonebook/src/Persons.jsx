
const Person=(props)=>{
    const {info, onDelete}=props
    const onDeletePerson = (ev)=>{
      onDelete(info)
    }
    return <>{info.name} {info.number} <button onClick={onDeletePerson}>delete</button></>
}

const Persons=(props)=>{
    console.log('Persons', props)
    const {persons, onDeletePerson}=props
    return (
      <ul>{
        persons.map((p)=>{
          console.log('Person',p)
          return <li key={`id ${p.name}`}><Person info={p} onDelete={onDeletePerson} /></li>
        })}
      </ul>
    )
  }

export default Persons
