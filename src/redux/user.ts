import axios from "axios"
import { Dispatch } from "redux"
import { TcurrentUser } from "../types"
import { API_URL } from "../utils/config"
import { BaseThunkType, InferActionsTypes } from "./store"

const initialState={
    isAuth:false,
    currentUser:{} as TcurrentUser|{}
}

type Tstate=typeof initialState

const userReducer=(state=initialState,action:Tactions):Tstate=>{
    switch (action.type) {
        case 'SET_USER':
            return{
                ...state,
                currentUser:action.user,
                isAuth:true
            }
        case 'LOGOUT':
            localStorage.removeItem('token')
            return{
                ...state,
                currentUser:{},
                isAuth:false
            }
        default:
            return state
            
    }
}

type Tactions=InferActionsTypes<typeof actions>

export const actions={
    setUser:(user:TcurrentUser)=>({type:'SET_USER',user}as const),
    logout:()=>({type:'LOGOUT'} as const)
}

type DispatchType = Dispatch<Tactions>
type ThunkType = BaseThunkType<Tactions>

export const registration=(email:string,password:string):ThunkType=>async(dispatch:DispatchType)=>{
    try {
        const {data}=await axios.post(`${API_URL}api/auth/register`,{email,password})
        dispatch(actions.setUser(data.user))
        localStorage.setItem('token',data.token)
    } catch (e:any) {
        alert(e.response.data.message)
    }
    
}

export const login=(email:string,password:string):ThunkType=>async(dispatch:DispatchType)=>{
    try {
        const {data}=await axios.post(`${API_URL}api/auth/login`,{email,password})
        dispatch(actions.setUser(data.user))
        localStorage.setItem('token',data.token)
    } catch (e:any) {
        alert(e.response.data.message)
    }
}

export const auth=():ThunkType=>async(dispatch:DispatchType)=>{
    try {
        const {data}=await axios.get(`${API_URL}api/auth/auth`,
        {headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}})
        dispatch(actions.setUser(data.user))
        localStorage.setItem('token',data.token)              
    } catch (e) {
        localStorage.removeItem('token')
    }  
}

export default userReducer