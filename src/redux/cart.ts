import { Dispatch } from "redux"
import { Tsneakers } from "../types"
import { BaseThunkType, InferActionsTypes } from "./store"


const initialState={
    items:[] as Tsneakers[],
    totalPrice:0,
    isCartOpen:false,
}

type TintialState = typeof initialState

const cartReducer=(state=initialState,action:Tactions):TintialState=>{
    switch(action.type){
        case 'ADD_IN_CART':
            return{
                ...state,
                items:[...state.items,action.obj],
                totalPrice:state.totalPrice+action.obj.price
            }      
        case 'REMOVE_CART':
            return{
                ...state,
                items:state.items.filter((i)=>i.id!==action.obj.id),
                totalPrice:state.totalPrice-action.obj.price
            }
        case'SET_CART':
            return{
                ...state,
                items:action.payload.items,
                totalPrice:action.payload.items.map(i=>i.price).reduce((sum,obj)=>sum+obj,0),
            }
        case"OPEN_CART":
            return{
                ...state,
                isCartOpen:action.val
            }    
        default:
            return state
    }
}

type Tactions=InferActionsTypes<typeof actions>
export const actions={
    setCart:(items:Tsneakers[])=>({type:'SET_CART',payload:{items}}as const),
    addInCart:(obj:Tsneakers)=>({type:'ADD_IN_CART',obj}as const),
    removeCart:(obj:Tsneakers)=>({type:'REMOVE_CART',obj}as const),
    openCart:(val:boolean)=>({type:'OPEN_CART',val}as const)
}

type DispatchType = Dispatch<Tactions>
type ThunkType = BaseThunkType<Tactions>

export const fetchCart=():ThunkType=>async(dispatch)=>{
    // const {data}= await axios.get(`api/cart`,
    // {headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}})
    const localStorageRef=localStorage.getItem('cart')
    if(localStorageRef){
        dispatch(actions.setCart(JSON.parse(localStorageRef)))

    }
    
 
    
}
export const addInCart=(obj:Tsneakers):ThunkType =>async(dispatch:DispatchType)=>{ 
    // await axios.post(`api/cart`,{itemId:obj.id},{headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}})
    await dispatch(actions.addInCart(obj))
    
    
    
    
}
export const removeToCart=(obj:Tsneakers):ThunkType=>async(dispatch:DispatchType)=>{
    // const {data}=await axios.delete(`api/cart/${obj.id}`,{headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}})
    await dispatch(actions.removeCart(obj))
}


export default cartReducer