import React, { FC, useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import s from './Cart.module.scss'
import { actions, removeToCart } from './../../redux/cart';
import { RootState } from '../../redux/store';
import cn from 'classnames'


const Cart:FC = () => {
    const dispatch = useDispatch()
    const [tax, settax] = useState<number>(0)
    const {isCartOpen,items,totalPrice} = useSelector(({cartReducer}:RootState) => cartReducer)
    useEffect(()=>{
        settax(totalPrice*0.05)
    },[totalPrice])
    
    
    return (
        <div className={cn(s.cart,{[s.active]:isCartOpen})} onClick={()=>dispatch(actions.openCart(false))} >    
            <div className={s.cartContent} onClick={e=>e.stopPropagation()}>
                <b>Корзина</b>
                {items.length?(
                    <>
                    <div className={s.cartItems}>
                    {items.map((i)=>(
                        <div className={s.cartItem} key={i.id}>
                            <img height='70' width='70' src={i.imgUrl} alt="sneakers" />
                            <div>
                                <div>{i.title}</div>
                                <div className={s.price}>{i.price} руб.</div> 
                            </div>
                            <svg className={s.delItem} onClick={()=>dispatch(removeToCart(i))} width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                             <rect x="0.5" y="0.5" width="31" height="31" rx="7.5" fill="white" stroke="#F2F2F2"/>
                             <path d="M20.0799 18.6155L17.6311 16.1667L20.0798 13.718C21.0241 12.7738 19.5596 11.3093 18.6154 12.2536L16.1667 14.7023L13.7179 12.2535C12.7738 11.3095 11.3095 12.7738 12.2535 13.7179L14.7023 16.1667L12.2536 18.6154C11.3093 19.5596 12.7738 21.0241 13.718 20.0798L16.1667 17.6311L18.6155 20.0799C19.5597 21.0241 21.0241 19.5597 20.0799 18.6155Z" fill="#D3D3D3"/>
                            </svg>  
                        </div>
                    ))}
                </div>
                <div className={s.order}>
                    <div className={s.totalPrice}>
                        <div><p>Итого:</p><div className={s.dashed}></div><div className={s.totalSumm}>{totalPrice} руб.</div></div>
                        <div><p>Налог 5%</p><div className={s.dashed}></div><div className={s.totalSumm}>{tax.toFixed(2)} руб.</div></div>
                    </div>
                    <div className={s.orderButton}>
                        Оформить заказ
                        <svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 7H14.7143" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M8.71436 1L14.7144 7L8.71436 13" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </div>
                </div>
                    </>
                ):(
                    <div className={s.emptyCart}>
                        <img src="/img/emptyCart.png" alt="Empty cart" />
                        <h2>Корзина пустая</h2>
                        <p>Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ.</p>
                        <div onClick={()=>dispatch(actions.openCart(false))} className={s.backButton}>
                            <img src="/img/arrowBack.png" alt="Arrow back" />
                            Вернутся назад    
                        </div>
                    </div>
                )
                
            }
                
            </div>     
        </div>
    )
}

export default Cart
