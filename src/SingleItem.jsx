
export const SingleItem = ({ item, removeItem, checkboxClicked }) => {

    const { name, id, checked } = item;

    return (
        <div className='single-item'>
            <input type='checkbox' onClick={() => checkboxClicked({ id })} checked={item.checked}/>
            <p style={{textTransform: 'capitalize', textDecoration: item.checked && 'line-through' }}>{item.name}</p>
            <button className='btn remove-btn' type='button' onClick={() => removeItem({ id })}>delete</button>
        </div>
    )
}

