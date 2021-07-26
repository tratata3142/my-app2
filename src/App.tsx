import React, { useEffect, useState } from 'react';
import Header from './components/Header/Header';
import {Route} from 'react-router-dom'
import Main from './pages/main/Main';
import Cart from './components/cart/Cart';
import { useDispatch} from 'react-redux';
import Registration from './components/authorization/Registration';
import Login from './components/authorization/Login';
import { fetchCart } from './redux/cart';
import { fetchSneakers } from './redux/sneakers';



function App() {
  const dispatch = useDispatch()
  const [initialized, setinitialized] = useState(false)
  
  useEffect(() => {
    const initialize=async()=>{
      await dispatch(fetchSneakers(1,8))
      await dispatch(fetchCart())
      await setinitialized(true) 
    } 
    initialize()    
  }, [dispatch])
 
  
  if(!initialized){
    return <div>Загрузка...</div> 
  }
  return (
    <div className='app'>
      <div className="container">
        <Header />
        <div className='content'>
          <Route path='/' component={Main} exact/>
          <Route path='/cart' component={Cart}/>
          <Route path='/registration' component={Registration}/>  
          <Route path='/authorization' component={Login}/>  
        </div>
      </div>
      <Cart />   
    </div>
  );
}

export default App;
