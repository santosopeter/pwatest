import Head from 'next/head'
import Nav from '../components/nav';

import {useSelector, useDispatch} from 'react-redux';
import {addProduct, removeProduct} from '../redux/actions';


const CartPage = () => {
    
  const cart = useSelector(state => state.cart);
  const dispatch = useDispatch();

    console.log(cart);

    return (<div className="container">
        <Head>
            <title>Cart</title>
        </Head>
        <Nav/>
        <div className="page-title">
            <span className="span-title">Cart</span><br/>
        </div>

        <div className="cart-container">
            {              
                cart.cart.map((val, idx) => {
                    console.log(val);
                })
            }
        </div>
    </div>);
};

export default CartPage;