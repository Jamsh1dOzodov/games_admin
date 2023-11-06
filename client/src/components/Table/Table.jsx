import './Table.scss';
import React, { useState } from 'react';
import dots from '../../assets/icons/admins_dots.svg'
import Button from '../Button/Button';


const Table = ({ img, name, email, role, }) => {

    const [dot, setDot] = useState(false)
    const clickedDots = () => {
        if (dot) {
            return setDot(false)

        } setDot(true)
    }

    const deleteMore = (event) => {
        const el = event.target
        el.closest('.table').remove()
    }

    return (
        <tr className='table'>
            <td className='table-ava'>
                <div className="table-ava__img">
                    <img src={img} alt='Аватарка' />
                </div>
            </td>
            <td className='table-name'>
                <p className='table-name__text'>{name}</p>
            </td>
            <td className='table-email'>
                <p className='table-email__text'>{email}</p>
            </td>
            <td className='table-role'>
                <p className='table-role__text'>{role}</p>
            </td>
            <td className='table-more'>
                <button onClick={clickedDots} className='table-more__btn'>
                    <img src={dots} alt='настройки' />
                </button>
                <div className={dot ? 'table-more__btns table-more__btns--clicked' : 'table-more__btns'}>
                    <Button onClick={deleteMore} className='btn btn--table' type='button'>Удалить</Button>
                    <Button className='btn btn--table' type='button'>Изменить</Button>
                </div>
            </td>
        </tr>
    )
}


export default Table;
