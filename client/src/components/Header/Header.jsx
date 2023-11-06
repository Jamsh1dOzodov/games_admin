import './Header.scss';
import Input from '../Input/Input';
import Button from '../Button/Button'
import lupa from '../../assets/icons/lupa.svg';
import addImg from '../../assets/icons/add.svg';


const Header = ({ title, allgames, admins, add }) => {
    return (
        <>
            <div className="head">
                <div className="container">
                    <div className="header">
                        <div className="wrapper">
                            <div className="header-titles">
                                <p className="header-titles__title">Панель управления</p>
                                <p className="header-titles__title header-titles__title--right">{title}</p>
                            </div>

                            {allgames &&
                                <form className='header-form'>
                                    <Input className='input input--header' type='text' placeholder='Поиск' />
                                    <button className='header-form__btn'><img src={lupa} alt="Лупа" /></button>
                                </form>
                            }
                            {admins &&
                                <Button onClick={add} className='btn btn--admin'>
                                    <div className="header__btn"><img src={addImg} alt="Добавить" /></div>Добавить участника
                                </Button>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}


export default Header;