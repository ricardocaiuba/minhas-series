import React, {useState, useEffect} from "react" ;
import axios from "axios" ;
import { Link } from "react-router-dom" ;

const Series = () => {
    const [data, setData] = useState([]) ;
    useEffect(() => {
        axios
            .get("/api/series")
            .then(res => {
                setData(res.data.data) ;
            })   ;
    }, []) ;

    const DeleteSerie = (id) => {
        axios
            .delete(`/api/series/${id}`)
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
                        to={`/series/${record.id}`}
                        className="btn btn-outline-primary btn-sm">
                            Info
                    </Link>
                    <span> </span>
                    <button
                        type="button"
                        onClick={() => DeleteSerie(record.id)}
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
                <h1>Séries</h1>
                <p>
                    <Link 
                        to="/series/novo"
                        className="btn btn-info btn-sm"
                    >
                        Nova Série
                    </Link>
                    </p>

                <div className="alert alert-warning" role="alert">
                <h4 className="alert-heading">Atenção</h4>
                Não existem séries cadastradas!
                <hr/>    
                <p className="mb-0">Clique em <strong>Nova Série</strong> para incluir</p>
              </div>                
            </div>
        ) ;
    }

    return (
        <div className="container">
            <h1>Séries</h1>
            <p>
                <Link 
                    to="/series/novo"
                    className="btn btn-info btn-sm"
                >
                    Nova Série
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

export default Series ;

