import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { login} from '../../redux/user';

const Login = () => {
    const dispatch = useDispatch()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const history=useHistory()


    const onAuthorization=()=>{
        dispatch(login(email,password))
        history.push('/')
    }
    return (
        <div>
            <h1>Авторизация</h1>
            <input onChange={(e)=>setEmail(e.target.value)} name='email' value={email} type="email" placeholder='Email' />
            <input onChange={(e)=>setPassword(e.target.value)} name='password' value={password} type="password" placeholder='Password' />
            <button onClick={onAuthorization}>Авторизация</button>
            <div>Нет аккаунта?<Link to='/registration'>Зарегестрируйтесь</Link> </div>
        </div>
    )
}

export default Login
