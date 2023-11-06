import Header from "../components/Header/Header";
import Sidebar from "../components/Sidebar/Sidebar";
import planetZoo from '../assets/images/allgames_planetZoo.png'
import Catalog from "../components/Catalog/Catalog";
import { useFetch } from "../hooks/useFetch";
import { useEffect, useState } from "react";


const Allgames = () => {

    const {data, loading, error} = useFetch('/api/games/get')

    return (
        <>
            <Header title='Добавить игру' allgames={true} />
            <div className="main">
                <div className="container">
                    <div className="wrapper">
                        <Sidebar active='allgames' />
                        <div className="allgames">
                            {data &&
                                data.map(item =>
                                    <Catalog id={item._id} key={item._id} name={item.title} img={`/uploads/${item.preview.src}`} alt={item.preview.alt} />
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Allgames;