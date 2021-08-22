import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';

import { CartItem } from '../components';
import GetCookie from '../components/GetCookie';

import { clearCart, removeCartItem, plusCartItem, minusCartItem } from '../redux/actions/cart'

function Cart() {
    const dispatch = useDispatch();
    const { totalPrice, totalCount, items } = useSelector(({ cart }) => cart);

    const addedProducts = Object.keys(items).map(key => {
        return items[key].items[0];
    });

    const onClearCart = () => {
        if (window.confirm('Вы действительно хотите очистить корзину?')) {
            dispatch(clearCart());
        }
    }

    const onRemoveItem = (id) => {
        if (window.confirm('Вы действительно хотите удалить ноутбук?')) {
            dispatch(removeCartItem(id));
        }
    }

    const onPlusItem = (id) => {
        dispatch(plusCartItem(id));
    }

    const onMinusItem = (id) => {
        dispatch(minusCartItem(id));
    }

    const productNameToOrder = Object.keys(addedProducts).map(key => {
        return addedProducts[key].name
    })

    const orderTime = new Date().toLocaleTimeString()

    const addToOrder = () => {
        const orderCity = GetCookie("city")
        const newItems = {
            orderCity, productNameToOrder, totalPrice, orderTime,
        };
        axios.post(`http://localhost:3002/orders`, newItems)
        alert("Заказ оформлен!")
    }

    return (
        <div className="content">
            <div className="container container--cart">
                {
                    totalCount ?
                        <div className="cart">
                            <div className="cart__top">
                                <h2 className="content__title">
                                    Корзина</h2>
                                <div className="cart__clear">
                                    <span onClick={onClearCart}>Очистить корзину</span>
                                </div>
                            </div>
                            <div className="content__items">
                                {
                                    addedProducts.map(obj => (
                                        <CartItem
                                            key={obj.id}
                                            id={obj.id}
                                            name={obj.name}
                                            imageUrl={obj.imageUrl}
                                            totalPrice={items[obj.id].totalPrice}
                                            totalCount={items[obj.id].items.length}
                                            onRemove={onRemoveItem}
                                            onPlus={onPlusItem}
                                            onMinus={onMinusItem}
                                        />
                                    ))
                                }
                            </div>
                            <div className="cart__bottom">
                                <div className="cart__bottom-details">
                                    <span> Всего: <b>{totalCount} шт.</b> </span>
                                    <span> Сумма заказа: <b>{totalPrice} ₽</b> </span>
                                </div>
                                <div className="cart__bottom-buttons">
                                    <Link to="/" className="button button--outline button--add go-back-btn">
                                        <span>Вернуться назад</span>
                                    </Link>.
                                    <div className="button pay-btn" onClick={() => addToOrder()}>
                                        <span>Оплатить сейчас</span>
                                    </div>
                                </div>
                            </div>
                        </div> :
                        <div className="cart cart--empty">
                            <h2>Корзина пустая</h2>
                            <Link to="/" className="button button--black">
                                <span>Вернуться назад</span>
                            </Link>
                        </div>
                }
            </div>
        </div>
    )
}

export default Cart;
