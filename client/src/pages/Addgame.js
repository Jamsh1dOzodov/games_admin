import Button from "../components/Button/Button";
import Header from "../components/Header/Header";
import Input from "../components/Input/Input";
import Sidebar from "../components/Sidebar/Sidebar";
import React, { useState, useRef, useEffect } from "react";
import input from '../assets/icons/input.svg'


const Addgame = () => {

    // const filePicekerRef = useRef(null);
    // const [imagePreview, setImagePreview] = useState(null);
    // const [images, setImages] = useState([]);

    // function previewFile(e) {
    //     const reader = new FileReader();
    //     const selectedFiles = e.target.files;
    //     for(let key in selectedFiles){
    //         images.push(selectedFiles[key].name)
    //     }
    //     console.log(images)

    //     if (selectedFiles) {
    //         reader.readAsDataURL(selectedFiles);
    //     }
    //     console.log(selectedFiles.type.includes("image"))
    //     reader.onload = (readerEvent) => {
    //         if (selectedFiles.type.includes("image")) {
    //             if(e.target.classList.contains('input--images')){
    //                 return setImages(readerEvent.target.result);
    //             }
    //             setImagePreview(readerEvent.target.result);
    //         }
    //     };

    // }

    // function clearFiles() {
    //     setImagePreview(null);
    // }

    const [imgs, setImgs] = useState([]);
    const [preeview, setPreeview] = useState('');
    const handleMultipleImages = (evnt) => {
        const selectedFIles = [];
        const targetFiles = evnt.target.files;
        const targetFilesObject = [...targetFiles]
        targetFilesObject.map((file) => {
            return selectedFIles.push(URL.createObjectURL(file))
        })
        setImgs(selectedFIles);
    }
    const handlePreviewImage = (event) => {
        const targetFile = event.target.files[0];
        setPreeview(URL.createObjectURL(targetFile))
    }


    const clearFiles = () => {
        setImgs([])
    }
    const clearFile = () => {
        setPreeview('')
    }



    // const addgame = (event) => {
    //     event.preventDefault()

    //     const { title, preview, images, min_os, min_memory, min_processor, min_graphics, min_storage, max_os, max_memory, max_processor, max_graphics, max_storage, stock_price, discount, system, platform, description } = event.target
    //     const imageObject = []
    //     Object.keys(preview.files).forEach(function(file) {
    //         imageObject.push(this[file]);
    //       }, preview.files);
        
    //     imageObject.slice(0, -2)
    //     for (let file in images.files) {
    //         imageObject.push(images.files[file])
    //     }

    //     const gameData = {
    //         title: title.value,
    //         images: imageObject.slice(0, -2),
    //         min_os: min_os.value,
    //         min_memory: min_memory.value,
    //         min_processor: min_processor.value,
    //         min_graphics: min_graphics.value,
    //         min_storage: min_storage.value,
    //         max_os: max_os.value,
    //         max_memory: max_memory.value,
    //         max_processor: max_processor.value,
    //         max_graphics: max_graphics.value,
    //         max_storage: max_storage.value,
    //         stock_price: stock_price.value,
    //         discount: discount.value,
    //         system: system.value,
    //         platform: platform.value,
    //         description: description.value,
    //     }

    //     let url = '/api/games/add'
    //     fetch(url, {
    //         method: 'POST',
    //         headers: {
    //             "Content-Type": "multipart/form-data",
    //         },
    //         body: JSON.stringify(gameData)
    //     })
    //         .then(res => res.json())
    //         .then(data => console.log(data))
    //         .catch(error => console.error(error))
    // }

    return (
        <>
            <Header title='Добавить игру' allgames={false} />
            <div className="main">
                <div className="container">
                    <div className="wrapper">
                        <Sidebar active='addgame' />
                        <div className="addgame">
                            <form action="/api/games/add" method="POST" encType="multipart/form-data" className="addgame-form">

                                <div className="addgame-form__column column">
                                    <p className="column__title">Название игры</p>
                                    <Input name='title' className='input input--form' />
                                    <p className="column__title column__title--second">Главное изображение</p>
                                    <div className="column-input">
                                        {preeview != '' && (
                                            <Button type="button" onClick={clearFile} className="btn btn--remove">Удалить</Button>
                                        )}

                                        <div className="column-input__choose choose">
                                            <input id='preview' name='images' onChange={handlePreviewImage} type="file" accept="image/*" hidden />
                                            {!preeview.length > 0 &&
                                                <label className="choose__btn" htmlFor="preview"><div><img src={input} /></div></label>
                                            }
                                        </div>
                                        <div className="column-input__preview preview">
                                            {preeview != '' &&
                                                <div className="preview__img">
                                                    <img src={preeview} />
                                                </div>
                                            }
                                        </div>

                                    </div>
                                </div>

                                <div className="wrapper">
                                    <div className="col">
                                        <div className="addgame-form__column column">
                                            <p className="column__config">Конфигурация</p>
                                            <p className="column__title">Минимальные*</p>
                                            <Input name='min_os' className='input input--form' placeholder='Os' />
                                            <Input name='min_memory' className='input input--form' placeholder='Memory' />
                                            <Input name='min_processor' className='input input--form' placeholder='Processor' />
                                            <Input name='min_graphics' className='input input--form' placeholder='Graphics' />
                                            <Input name='min_storage' className='input input--form' placeholder='Storage' />
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="addgame-form__column column">
                                            <p className="column__config">Конфигурация</p>
                                            <p className="column__title">Рекомендуемые*</p>
                                            <Input name='max_os' className='input input--form' placeholder='Os' />
                                            <Input name='max_memory' className='input input--form' placeholder='Memory' />
                                            <Input name='max_processor' className='input input--form' placeholder='Processor' />
                                            <Input name='max_graphics' className='input input--form' placeholder='Graphics' />
                                            <Input name='max_storage' className='input input--form' placeholder='Storage' />
                                        </div>
                                    </div>
                                </div>

                                <div className="wrapper">
                                    <div className="col">
                                        <div className="addgame-form__column column">
                                            <p className="column__config">Цена закупки</p>
                                            <Input name='stock_price' className='input input--form' placeholder='99.99' />
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="addgame-form__column column">
                                            <p className="column__config">Скидка(в процентах)</p>
                                            <Input name='discount' className='input input--form' placeholder='30' />
                                        </div>
                                    </div>
                                </div>

                                <div className="wrapper">
                                    <div className="col">
                                        <div className="addgame-form__column column">
                                            <p className="column__config">Система</p>
                                            <Input name='system' className='input input--form' placeholder='PC' />
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="addgame-form__column column">
                                            <p className="column__config">Платформа</p>
                                            <Input name='platform' className='input input--form' placeholder='Steam' />
                                        </div>
                                    </div>
                                </div>

                                <div className="addgame-form__column column">
                                    <p className="column__title">Описание</p>
                                    <Input name='description' className='input input--form' />
                                </div>

                                <div className="addgame-form__column column">
                                    <p className="column__config">Дополнительный контент</p>
                                    <p className="column__title">Изображение (для карусели)</p>
                                    <div className="column-input">
                                        {imgs != '' && (
                                            <Button type="button" onClick={clearFiles} className="btn btn--remove">Удалить</Button>
                                        )}
                                        <div className="column-input__choose choose">
                                            <input id='images' multiple name='images' onChange={handleMultipleImages} type="file" accept="image/*" hidden />
                                            {!imgs.length > 0 &&
                                                <label className="choose__btn" htmlFor="images"><div><img src={input} /></div></label>
                                            }
                                        </div>
                                        <div className="column-input__images images">
                                            {imgs.length > 0 &&
                                                imgs.map(img =>
                                                    <div className="images__img">
                                                        <img key={img} src={img} />
                                                    </div>
                                                )
                                            }
                                        </div>

                                    </div>
                                </div>

                                <div className="wrapper">
                                    <Button type='reset' className='btn btn--white'>Отменить редактирование</Button>
                                    <Button type='submit' className='btn btn--dark'>Изменить</Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Addgame;