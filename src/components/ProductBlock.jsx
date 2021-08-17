import React from 'react'
import Button from './Button'

function ProductBlock({ id, name, imageUrl, price, onClickAddProduct, addedCount }) {

    const onAddProduct = () => {
        const obj = {
            id,
            name,
            imageUrl,
            price,
        }
        onClickAddProduct(obj)
    };

    return (
        <div className="product-block">
            <img
                className="product-block__image"
                src={imageUrl}
                alt="Product"
            />
            <h4 className="product-block__title">{name}</h4>
            <div className="product-block__bottom">
                <div className="product-block__price">{price} ₽</div>
                <Button onClick={onAddProduct} className="button--add" outline >
                    <span>Добавить </span>
                    {addedCount && <span>{addedCount}</span>}
                </Button    >
            </div>
        </div>
    )
}

export default ProductBlock;