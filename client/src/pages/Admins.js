import Header from "../components/Header/Header";
import Sidebar from "../components/Sidebar/Sidebar";
import defaultImg from '../assets/icons/admins_default.svg'
import Table from "../components/Table/Table";
import Input from "../components/Input/Input";
import addmore from '../assets/icons/addmore.svg'
import { Link } from "react-router-dom";
import Button from "../components/Button/Button";
import { useState } from "react";



const Admins = () => {

    const adminList = [
        { id: 1, img: defaultImg, name: 'Роман', email: 'example@gmail.com', role: 'Супер-админ' },
        { id: 2, img: defaultImg, name: 'Евгений', email: 'example@gmail.com', role: 'Админ' },
        { id: 3, img: defaultImg, name: 'Евгений', email: 'example@gmail.com', role: 'Админ' },
    ]

    const [active, setActive] = useState(false)

    const add = () => {
        if (active) {
            return setActive(false)
        } setActive(true)
    }



    return (
        <>
            <Header add={add} title='Добавить игру' admins={true} />
            <div className="main">
                <div className="container">
                    <div className="wrapper">
                        <Sidebar active='admins' />
                        <div className="admins">
                            <div className="admins-padding">
                                <div className="admins-info">
                                    <p className="admins-info__text">2 человека приглашено в рабочее пространство</p>
                                </div>
                            </div>

                            <table className="admins-list">
                                <thead>
                                    <tr className="admins-list__titles titles">
                                        <th colSpan="2" className="titles__text titles__text--first">Имя</th>
                                        <th className="titles__text">Почта аккаунта </th>
                                        <th colSpan="2" className="titles__text titles__text--last">Роль</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {adminList &&
                                        adminList.map(item =>
                                            <Table key={item.id} img={item.img} name={item.name} email={item.email} role={item.role} />
                                        )
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className={active ? 'modal modal--active' : 'modal'}>
                    <div className="modal-wrapper">
                        <h4 className="modal__title">Добавить участника в рабочее пространство</h4>
                        <form className="modal-form">
                            <div className="wrapper">
                                <div>
                                    <Input className='input input--modal' type='text' placeholder='Имя...' />
                                    <Input className='input input--modal' type='text' placeholder='Почта...' />
                                </div>
                                <select className="modal-form__select">
                                    <option defaultValue>Роль</option>
                                    <option value='admin'>Админ</option>
                                    <option value='superAdmin'>Супер-админ</option>
                                </select>
                            </div>
                            <p className="modal-form__text">Права участника</p>
                            <label>
                                <p className="modal-form__checkbox"><input className="modal-form__checkInput" type="checkbox" value='change' /> Изменять</p>
                            </label>
                            <label>
                                <p className="modal-form__checkbox"><input className="modal-form__checkInput" type="checkbox" value='add' /> Добавлять</p>
                            </label>
                            <label>
                                <p className="modal-form__checkbox"><input className="modal-form__checkInput" type="checkbox" value='delete' /> Удалять</p>
                            </label>
                            <div className="modal-form__addMore addMore">
                                <Link className="addMore__img"><img src={addmore} /></Link>
                                <Link className="addMore__text">Добавить еще</Link>
                            </div>
                            <div className="modal-form__btns">
                                <Button onClick={add} type='button' className='btn btn--white'>Отмена</Button>
                                <Button type='submit' className='btn btn--dark'>Пригласить</Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Admins;