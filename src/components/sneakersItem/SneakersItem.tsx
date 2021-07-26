import React, { FC } from 'react'
import { Tsneakers } from '../../types'
import s from './SneakesItem.module.scss'



type PropsType={
    sneakers:Tsneakers
    findItem:(id:string)=>boolean
    addToCart:(obj:Tsneakers)=>any
}

const SneakersItem:FC<PropsType> = ({sneakers,addToCart,findItem}) => {
    const obj={...sneakers}
    
    return (
        <div className={s.sneakersItem}>
            <div className={s.top}>
                <img className={s.sneakersImg} src={sneakers.imgUrl} alt="sneakers" />
            </div>   
            <p>{sneakers.title}</p>
            <div className={s.bottom}>
                <div className={s.price}>
                    <div>Цена:</div>
                    <b>{sneakers.price}руб.</b>
                </div>   
                <img onClick={()=>addToCart(obj)}
                    src={findItem(obj.id)?'img/addToCart.svg':'img/removedToCart.svg'}
                    alt="removeAddcart" />        
            </div>    
        </div>
        )
    }

export default SneakersItem




