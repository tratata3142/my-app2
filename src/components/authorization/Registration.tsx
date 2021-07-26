import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { registration } from '../../redux/user';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';

const Registration = () => {
    const history=useHistory()
    const dispatch = useDispatch()
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    const onRegistation=()=>{
        dispatch(registration(email,password))
        history.push('/')
    }
    return (
        <div>
            <h1>Регистрация</h1>
            <input onChange={(e)=>setEmail(e.target.value)} name='email' value={email} type="email" placeholder='Email' />
            <input onChange={(e)=>setPassword(e.target.value)} name='password' value={password} type="password" placeholder='Password' />
            <button onClick={onRegistation}>Регистрация</button>
            <div>Есть аккаунт?<Link to='/authorization'>Авторизуйтесь</Link> </div>
        </div>
    )
}

export default Registration
