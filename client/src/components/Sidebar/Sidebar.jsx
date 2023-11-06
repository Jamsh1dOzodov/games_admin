import './Sidebar.scss'
import { Link } from 'react-router-dom';
import allgames from '../../assets/icons/sidebar_allgames.svg'
import admins from '../../assets/icons/sidebar_admins.svg'
import addgame from '../../assets/icons/sidebar_addgame.svg'


const Sidebar = ({ active }) => {
    return (
        <>
            <div className="sidebar">
                <ul className='sidebar-list'>
                    <li className={active === 'allgames' ? 'sidebar-list__item sidebar-list__item--active' : 'sidebar-list__item'}>
                        <Link className='sidebar-list__link link' to='/secret/allgames'>
                            <div className="link__img">
                                <img src={allgames} alt="" />
                            </div>
                            <span className='link__text'>Все игры</span>
                        </Link>
                    </li>
                    <li className={active === 'admins' ? 'sidebar-list__item sidebar-list__item--active' : 'sidebar-list__item'}>
                        <Link className='sidebar-list__link link' to='/secret/admins'>
                            <div className="link__img">
                                <img src={admins} alt="" />
                            </div>
                            <span className='link__text'>Администраторы</span>
                        </Link>
                    </li>
                    <li className={active === 'addgame' ? 'sidebar-list__item sidebar-list__item--active' : 'sidebar-list__item'}>
                        <Link className='sidebar-list__link link' to='/secret/addgame'>
                            <div className="link__img">
                                <img src={addgame} alt="" />
                            </div>
                            <span className='link__text'>Добавить новую игру</span>
                        </Link>
                    </li>
                </ul>
            </div>
        </>
    )
}

export default Sidebar;