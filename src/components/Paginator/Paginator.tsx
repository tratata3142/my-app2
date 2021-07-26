import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchSneakers } from '../../redux/sneakers';
import { RootState } from '../../redux/store';
import s from './Paginator.module.scss'
import cn from 'classnames';


const Paginator = () => {
    const dispatch = useDispatch()
    const {totalCount} = useSelector(({sneakersReducer}:RootState) => sneakersReducer)
    const [currentPage, setcurrentPage] = useState(1)
    const limit=8
    const pageCount=Math.ceil(totalCount/limit)
    const pages=[]
    for(let i=0; i<pageCount;i++){
        pages.push(i+1)
    }
    const onChangePage=(page:number)=>{  
        setcurrentPage(page)
        dispatch(fetchSneakers(page,limit))
    }
   
    return (
        <div className={s.paginator}>
            {pages.map((page)=>(
                <div key={page} onClick={()=>onChangePage(page)} className={cn(s.page,{[s.active]:currentPage===page})}>{page}</div>
            )) }
        </div>
    )
}

export default Paginator
