import { useEffect, useState } from 'react'
import Filter from './Filter'
import AddNew from './AddNew'
import Persons from './Persons'
import phonebookApi from './service/phonebook'

const Status=(props)=>{
  const {message, isError}=props
  if (!isError) {
    const style={
      color:'green',
      fontStyle:'italic',
      fontSize:18
    }
    return <div className='status' style={style}>
      {message}
    </div>
  } else {
    const style={
      color:'red',
      fontStyle:'italic',
      fontSize:18
    }
    return <div className='status' style={style}>
      {message}
    </div>
  }
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [filter, setFilter] = useState('')
  const [status, setStatus] = useState('')
  const [isError, setIsError] = useState(false)

  useEffect(()=>{
    phonebookApi.fetch()
      .then(persons => setPersons(persons))
  }, [])

  const showStatus=(msg, isError=false)=>{
    setStatus(msg)
    setIsError(isError)
    setTimeout(()=>{setStatus(''); setIsError(false)}, 5000)
  }

  const onSubmitAdd=(ev)=>{
    ev.preventDefault()
    console.log('handleNewPerson')
    const i=persons.findIndex(q=>{
      return q.name === newName
    })
    if (i !== -1) {
      const msg=`${newName} is already added to photobook, replace the old number with new one?`
      const personObj={
        name:newName,
        number:newPhone,
        id:persons[i].id
      }
      if (window.confirm(msg)) {
        phonebookApi
          .update(personObj)
          .then(p=>{
            console.log('phonebookApi.update fulfilled',p)
            const newPersons=persons.map(p=>
              p.name===personObj.name ? personObj : p
            )
            setPersons(newPersons)
            setNewName('')
            setNewPhone('')
            showStatus(`Entry ${p.name} updated successfully`)
          }).catch(error=>{
            console.log('error',error)
            showStatus(error.response.data.error, true)
          })
      }
    } else {
      console.log('handleNewPerson->add')
      const personObj = {
        name: newName,
        number: newPhone,
        id:String(persons.length+1)
      }
      phonebookApi.add(personObj)
      .then(p=>{
        setPersons(()=>{return persons.concat(p)})
        setNewName('')
        setNewPhone('')
        showStatus(`Entry ${personObj.name} added successfully`)
      }).catch(error=>{
        console.log('error',error)
        showStatus(error.response.data.error, true)
      })
    }
  }

  const handleNewNameChange=(ev)=>{
    console.log('onNewNameChange', ev.target.value)
    setNewName(ev.target.value)
  }
  const handleNewPhoneChange=(ev)=>{
    console.log('onNewPhoneChange', ev.target.value)
    setNewPhone(ev.target.value)
  }
  const handleFilterChange=(ev)=>{
    console.log('onFilterChange',ev.target.value)
    setFilter(ev.target.value)
  }
  const handleDeletePerson=(p)=>{
    console.log('onDeletePerson',p)
    if (window.confirm(`Delete ${p.name}?`)) {
      phonebookApi.remove(p).then((r)=> {
        console.log('remove data',p)
        const newPersons=persons.filter(q=>q.id !== p.id)
        setPersons(()=>newPersons)
        showStatus(`Entry ${p.name} deleted successfully`)
      })
    }
  }

  const filteredPeople=(filter.length===0)
    ? persons
    : persons.filter((p)=>{
      return p.name.toLowerCase().includes(filter.toLowerCase())
    })

  return (
    <div>
      <h2>Phonebook</h2>
      <Status message={status} isError={isError} />
      <Filter filter={filter} onFilterChange={handleFilterChange} />
      <AddNew 
        newName={newName} newNumber={newPhone}
        onNameChange={handleNewNameChange} onNumberChange={handleNewPhoneChange} 
        onSubmitAdd={onSubmitAdd}/>
      <h2>Numbers</h2>
      <Persons persons={filteredPeople} onDeletePerson={handleDeletePerson} />
    </div>
  )
}

export default App