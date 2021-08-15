import React from 'react';
import { CityModel } from './CityModel';
import GetCookie from './GetCookie';

const listCitys = [
    'Москва',
    'Санкт-Петербург',
    'Пермь',
];

function Header() {
    const cookie_city = GetCookie("city")
    const [modalActive, setModalActive] = React.useState(false);
    const [cityActive, setChoiceCity] = React.useState(!cookie_city ? "" : cookie_city);

    const onВisplayCity = () => {
        setModalActive(true);
    };

    React.useEffect(() => {
        if (!listCitys.includes(cityActive)) {
            setModalActive(true);
        }
    }, [cityActive]);

    document.cookie = "city=" + cityActive;

    return (
        <div className="header">
            <div className="container">
                <CityModel active={modalActive} setActive={setModalActive} cityNames={listCitys} toggleCityActive={setChoiceCity} />
                <div className="header__logo">
                    <h1>React shop</h1>
                </div>
                <button className="botton-city" onClick={onВisplayCity}>{cityActive}</button>
            </div>
        </div>
    );
}

export default Header;
