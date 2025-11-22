import { SPStore } from '../store/SP_store';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const SPSearch = () => {
    const { SP, fetchSP, changeSearch } = SPStore();
    const [searchTerm, setSearchTerm] = useState<string>("");

    useEffect(() => {
        changeSearch("No debería haber una tienda con este nombre");
    }, [changeSearch]);

    const handleSearch = () => {
        changeSearch(searchTerm);
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    return (
        <div>
            <div className="search-container">
                <input 
                    type="text" 
                    value={searchTerm} 
                    onChange={handleInputChange}
                    placeholder="Buscar por nombre..."
                />
                <button onClick={handleSearch}>Buscar</button>
            </div>
            <div>
                <ul>
                    <h3>{"Buscador de SP"}</h3>
                    {SP?.map((sp) => (
                        <li className="sellingpoint-li" key={sp.id}>
                            <div className="sp-li-title">
                                <Link to={`/sellingPoint/${sp.id}`}>
                                    Nombre: {sp.name} — #{sp.id}
                                </Link>
                            </div>
                            <p>Tipo de puesto: {sp.static_point ? "Estático" : "Dinámico"}</p>
                            <p>Tipo de producto: {sp.product_type}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default SPSearch;