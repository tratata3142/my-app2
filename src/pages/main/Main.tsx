import React, { FC,useEffect,useState } from 'react'
import s from './Main.module.scss'
import magnifier from '../../assets/img/magnifier.svg'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import SneakersItem from '../../components/sneakersItem/SneakersItem'
import { Tsneakers } from '../../types'
import LoadedItems from '../../components/sneakersItem/LoadedItems'
import { addInCart, removeToCart } from '../../redux/cart'
import Paginator from './../../components/Paginator/Paginator';



const Main:FC = () => {
    const dispatch = useDispatch()
    const {items,isLoaded} = useSelector(({sneakersReducer}:RootState) => sneakersReducer)
    const [search, setsearch] = useState('')
    const cartItems = useSelector(({cartReducer}:RootState) => cartReducer.items)
    const findItem=(id:string)=>{
        return cartItems.some((i) => i.id === id);
    }
    
    
    useEffect(()=>{
        localStorage.setItem('cart',JSON.stringify(cartItems) )
    },[cartItems])
      
    const addToCart=(obj:Tsneakers)=>{  
        if(findItem(obj.id)){
            return dispatch(removeToCart(obj))
        }else{
            return dispatch(addInCart(obj)) 
        }                  
    }
    
    const renderItems = () => {
        const filtredItems = items.filter((item) =>
          item.title.toLowerCase().includes(search.toLowerCase()),
        )
            return filtredItems.map((item)=>(
                <SneakersItem key={item.id} sneakers={item} addToCart={addToCart} findItem={findItem}/>
                ))  
    }
    
    
    return (
        <div className={s.main}>
                <div className={s.mainTop}>
            <h1>{search? search:'Все кросовки'}</h1>
            <div className={s.input}>
                <img src={magnifier} alt="" />
                <input onChange={(e)=>setsearch(e.target.value)} type="text" placeholder='Поиск...' value={search} />
            </div>             
            </div>
            <div className={s.sneakers}>
                {
                    isLoaded?
                    [...Array(8)].map((_,idx)=>(<LoadedItems key={idx}/>))
                    :
                    renderItems()
                }
            </div>
               <Paginator/>          
        </div>
    )
}

export default Main
