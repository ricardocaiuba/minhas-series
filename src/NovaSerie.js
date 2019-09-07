import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Redirect } from "react-router-dom"


const NovaSerie = () => {
    const [form, setForm] = useState({
        name: "",
        genre_id: 0
    });

    const [ListGenres, setListGenres] = useState([]) ;

    useEffect(() => {
        axios
            .get("/api/genres")
            .then(res => {
                setListGenres(res.data.data);
            });
    }, []);

    const [success, setSuccess] = useState(false);

    const onChange = (e) => {
        setForm({
            ...form,
            name: e.target.value
        });
    };

    const Save = () => {
        axios
            .post("/api/series", {
                ...form
            })
            .then(res => {
                setSuccess(true);
            });
    }

    const onChangeGenre = e => {
        setForm({
            ...form,
            genre_id: e.target.value
        }) ;
    } ;    

    if (success) {
        return <Redirect to="/series" />
    }

    return (
        <div className="container">
            <h1>Nova Série</h1>
            <form>
                <div className="form-group">
                    <label htmlFor="name">Nome Série</label>
                    <input
                        type="text"
                        value={form.name}
                        onChange={onChange}
                        className="form-control"
                        id="name"
                        placeholder="Série" />
                </div>
                <div className="form-group">
                    <label htmlFor="genero">Gênero</label>
                    <select
                        className="form-control"
                        id="genero"
                        onChange={onChangeGenre}
                        value={form.genre_id}>
                        {
                            ListGenres.map(genre =>
                                <option
                                    key={genre.id}
                                    value={genre.id}
                                >
                                    {genre.name}
                                </option>)
                        }
                    </select>
                </div>
                <button
                    type="button"
                    className="btn btn-primary"
                    onClick={Save}
                >
                    Salvar
                </button>
            </form>
        </div>
    );
}

export default NovaSerie;