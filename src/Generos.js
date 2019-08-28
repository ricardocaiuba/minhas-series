import React, {useState, useEffect} from "react" ;
import axios from "axios" ;
import { Link } from "react-router-dom" ;

const Generos = () => {
    const [data, setData] = useState([]) ;
    useEffect(() => {
        axios
            .get("/api/genres")
            .then(res => {
                setData(res.data.data) ;
            })   ;
    }, []) ;

    const DeleteGenero = (id) => {
        axios
            .delete(`/api/genres/${id}`)
            .then(res => {
                const filtrado = data.filter(
                    item => item.id !== id) ;   
                setData(filtrado) ;
            }) ;
    } ;

      const ReinderizaLinha = (record) => {
        return (
            <tr key={record.id}>
                <th scope="row">{record.id}</th>
                <td>{record.name}</td>
                <td>
                    <Link
                        to={`/generos/edit/${record.id}`}
                        className="btn btn-outline-primary btn-sm">
                            alterar
                    </Link>
                    <span> </span>
                    <button
                        type="button"
                        onClick={() => DeleteGenero(record.id)}
                        className="btn btn-outline-warning btn-sm">
                            excluir
                    </button>

                </td>
            </tr>
        ) ;
    } ;

    if (data.length === 0) {
        return (
            <div className="container">
                <h1>Gêneros</h1>
                <p>
                    <Link 
                        to="/generos/novo"
                        className="btn btn-info btn-sm"
                    >
                        Novo gênero
                    </Link>
                    </p>

                <div className="alert alert-warning" role="alert">
                <h4 className="alert-heading">Atenção</h4>
                Não existem gêneros cadastrados!
                <hr/>    
                <p className="mb-0">Cliquem em <strong>Novo gênero</strong> para incluir</p>
              </div>                
            </div>
        ) ;
    }

    return (
        <div className="container">
            <h1>Gêneros</h1>
            <p>
                <Link 
                    to="/generos/novo"
                    className="btn btn-info btn-sm"
                >
                    Novo gênero
                </Link>
            </p>
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Nome</th>
                        <th scope="col">Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(ReinderizaLinha)}
                </tbody>              
            </table>
        </div>
    ) ;
} ;

export default Generos ;

