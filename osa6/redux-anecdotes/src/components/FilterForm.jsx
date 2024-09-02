import { useDispatch } from 'react-redux'
import { filterChange } from '../reducers/filterReducer'


const FilterForm = () => {
    const dispatch = useDispatch()

    const addFilter = (event) => {
        event.preventDefault()
        const anecdote = event.target.value
        dispatch(filterChange(anecdote))
      }

    return(
        <p>
            filter <input name="addFilter" onInput={addFilter} />
        </p>
    )
}

export default FilterForm