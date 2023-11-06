import Button from "../components/Button/Button";
import Input from "../components/Input/Input";
import { AuthContext } from "../context/context";
import { useContext, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useForm } from 'react-hook-form';



const Login = () => {

    const navigate = useNavigate()

    const [regist, setRegist] = useState(false)

    const registrate = (event) => {
        if (!regist) {
            return setRegist(true)
        } event.target.setAttribute('type', 'submit')
    }


    const signup = (event) => {
        event.preventDefault()

        const { name, password, email, key } = event.target
        const dataAdmin = {
            email: email.value,
            password: password.value,
        }
        if (regist) {
            dataAdmin.name = name.value
            dataAdmin.key = key.value
        }


        console.log(dataAdmin)

        let url = regist ? '/secret/signup' : '/secret/signin'
        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(dataAdmin)

        })
            .then(res => res.json())
            .then(data => {
                localStorage.setItem('token', data.token)
                localStorage.setItem('isAuth', 'true')
                navigate('/secret/admins')
            })
            .catch(error => console.error(error))
    }


    // const { register, handleSubmit } = useForm();


    return (
        <div className="main">
            <div className="container">
                <div className="registration">
                    <form onSubmit={signup} className="registration-form">
                        <h1 className="registration-form__title">Вход/Регистрация</h1>
                        {regist &&
                            <div>
                                <label htmlFor='name' className="registration-form__text">Имя</label>
                                <Input id='name' name='name' type='text' className='input input--regist' />
                            </div>
                        }
                        <label htmlFor='email' className="registration-form__text">Почта</label>
                        <Input id='email' name='email' type='email' className='input input--regist' />
                        <label htmlFor='password' className="registration-form__text">Пароль</label>
                        <Input id='password' name='password' type='password' className='input input--regist' />
                        {regist &&
                            <div>
                                <label htmlFor='key' className="registration-form__text">Ключ</label>
                                <Input id='key' name='key' type='text' className='input input--regist' />
                            </div>
                        }
                        <div className="wrapper">
                            <Button onClick={registrate} className={regist ? 'btn btn--dark' : 'btn btn--white'} type='button'>Регистрация</Button>
                            {!regist &&
                                <Button className='btn btn--dark' type='submit'>Вход</Button>
                            }
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login;