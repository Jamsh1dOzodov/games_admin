import './Catalog.scss';
import settings from '../../assets/icons/allgames_settings.svg'

const Catalog = ({ img, name, alt, id }) => {

    const deleteButton = (event) => {
        fetch(`/api/games/delete/${id}`, {
            method: 'DELETE'
        })
        event.target.closest('.catalog').remove()

        
    }

    return (
        <div className='catalog'>
            <div className="wrapper">
                <div className="catalog-left">
                    <div className="catalog-left__img">
                        <img src={img} alt={alt} />
                    </div>
                    <p className="catalog-left__name">{name}</p>
                </div>
                <div className="catalog-right">
                    <button className='catalog-right__settings'><img src={settings} alt="Настройки" /></button>
                    <button className='catalog-right__deleteBtn' onClick={deleteButton}>Удалить игру</button>
                </div>
            </div>
        </div>
    )
}


export default Catalog;