import React from 'react'
import { Categories, SortPopup, ProductBlock } from '../components';
import { useSelector, useDispatch } from 'react-redux';

import axios from 'axios';

const categoryNames = [
    'ASUS',
    'HP',
    'Apple',
    'Lenovo',
    'MSI',
];

const sortItems = [
    { name: 'по рейтингу', type: 'rating', order: 'desc' },
    { name: 'цене', type: 'price', order: 'desc' },
    { name: 'алфавиту', type: 'name', order: 'asc' }
];

function Home() {
    const dispatch = useDispatch();
    const cartItems = useSelector(({ cart }) => cart.items);

    const [productsActive, setProducts] = React.useState({});

    const [categoryActive, setCategory] = React.useState(null);
    const [sort, setSort] = React.useState({ type: 'rating', order: 'desc' });
    const [search, setSearch] = React.useState('');

    const onSelectCategory = (index) => {
        setCategory(index)
    };

    const onSelectSortType = (type) => {
        setSort(type)
    };

    const onSelectName = (name) => {
        setSearch(name)
    };

    const handleAddProductToCart = obj => {
        dispatch({
            type: 'ADD_PRODUCT_CART',
            payload: obj,
        });
    }

    const axiosProducts = (category, sort, search) => {
        axios.get((`/product?${category !== null ? `category=${category}` : ''}&name_like=${search}&_sort=${sort.type}&_order=${sort.order}`)).then(({ data }) => {
            setProducts(data);
        });
    };

    React.useEffect(() => {
        axiosProducts(categoryActive, sort, search);
    }, [categoryActive, sort, search]);


    return (
        <div className="container">
            <div className="content__top">
                <form>
                    <input className="search"
                        type="text"
                        placeholder="Search..."
                        onChange={(event) => onSelectName(event.target.value)}
                    />
                </form>
            </div>
            <div className="content__top">
                <Categories activeCategory={categoryActive}
                    onClickCategory={onSelectCategory}
                    items={categoryNames} />
                <SortPopup activeSortType={sort.type}
                    items={sortItems}
                    onClickSortType={onSelectSortType} />
            </div>
            <div className="content__items">
                {
                    productsActive.length
                        ? productsActive.map((obj) => (
                            <ProductBlock
                                onClickAddProduct={handleAddProductToCart}
                                addedCount={cartItems[obj.id] && cartItems[obj.id].items.length}
                                key={obj.id}
                                {...obj}
                            />))
                        : <h3> Товара нет</h3>}
            </div>
        </div>
    )
}

export default Home;
