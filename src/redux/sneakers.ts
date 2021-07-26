import axios from "axios"
import { Dispatch } from "redux"
import { Tsneakers } from "../types"
import { API_URL } from "../utils/config"
import { BaseThunkType, InferActionsTypes } from "./store"

const initialState={
    items:[] as Tsneakers[],
    isLoaded:true,
    totalCount:0
}

type TinitialState=typeof initialState

const sneakersReducer=(state=initialState,action:Tactions):TinitialState=>{
    switch(action.type){
        case 'SET_SNEAKERS':
            return{
                ...state,
                items:action.payload.items,
                totalCount:action.payload.totalCount
            }
        case 'IS_FETCHING':
            return{
                ...state,
                isLoaded:action.boolean
            }
        default:
            return state        
    }   
}

type Tactions=InferActionsTypes<typeof actions>
export const actions={
    setSneakers:(items:Tsneakers[],totalCount:number)=>({type:'SET_SNEAKERS',payload:{items,totalCount}}as const),
    isFetching:(boolean:boolean)=>({type:'IS_FETCHING',boolean}as const)
}

type DispatchType = Dispatch<Tactions>
type ThunkType = BaseThunkType<Tactions>

export const fetchSneakers=(page:number,limit=8):ThunkType=>async(dispatch:DispatchType)=>{
    const {data}=await axios.get(`${API_URL}api/sneakers`,{params:{page,limit}})
    await dispatch(actions.setSneakers(data.sneakers,data.totalCount)) 
    dispatch(actions.isFetching(false))  
}


export default sneakersReducer
