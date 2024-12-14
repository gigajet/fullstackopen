
const AddNew=(props)=>{
    console.log('AddNew props',props)
    const { 
      newName, newNumber,
      onNameChange, onNumberChange, onSubmitAdd } = props
    return (
      <>
        <h2>Add New Person</h2>
        <form onSubmit={onSubmitAdd}>
          <div>
            name: <input value={newName} onChange={onNameChange}/>
          </div>
          <div>
            phone: <input value={newNumber} onChange={onNumberChange} />
          </div>
          <div>
            <button type="submit">add</button>
          </div>
        </form>
      </>
    )
  }

export default AddNew
