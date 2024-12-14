
const Filter=(props)=>{
    console.log('Filter props',props)
    const {filter, onFilterChange}=props
    return (
      <form>
          filter shown with <input value={filter} onChange={onFilterChange}/>
      </form>
    )
  }

export default Filter
