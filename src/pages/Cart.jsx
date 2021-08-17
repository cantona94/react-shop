import React from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { CartItem } from '../components';

function Cart() {
    const { totalPrice, totalCount, items } = useSelector(({ cart }) => cart);

    const addedProducts = Object.keys(items).map(key => {
        return items[key].items[0];
    });

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
                                    <span>Очистить корзину</span>
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
                                            totalCount={items[obj.id].items.length} s
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
                                    <div className="button pay-btn">
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
