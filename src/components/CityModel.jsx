import React from 'react'
import { Link } from 'react-router-dom';


export const CityModel = (function CityModel({ active, setActive, cityNames, toggleCityActive }) {

    const onCityTable = () => {
        setActive(false)
    }

    const onCity = (index) => {
        toggleCityActive(index);
    }

    return (
        <div className={active ? "modal active" : "modal"}>
            <div className={active ? "modal__content active" : "modal"} onClick={e => e.stopPropagation()}>
                <h4>Выберите город:</h4>
                <ul>
                    {cityNames.map((obj, index) => (
                        <li onClick={() => onCity(obj)}
                            key={`${obj}_${index}`}>
                            <Link to="/" onClick={onCityTable}>
                                {obj}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
});