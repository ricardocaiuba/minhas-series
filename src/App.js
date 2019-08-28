import React, { useState, useEffect } from 'react';
import Reader from "./Reader" ;
import axios from "axios" ;
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom' ;
import Generos from "./Generos" ;
import NovoGenero from "./NovoGenero" ;
import EditarGenero from "./EditarGenero"

const Home = () => {
  return <h1>Home</h1> ;
} ;

function App() {
  const [data, setData] = useState({ }) ;
  useEffect(() => {
    axios
      .get("/api")
      .then(res => {
        setData(res.data) ;
        console.log(data) ;
      }) ;
  }, []) ;
  return (
    <Router>
      <div>
        <Reader />
        <Route path="/" exact component={Home} />
        <Route path="/generos/edit/:id" exact component={EditarGenero} />
        <Route path="/generos/novo" exact component={NovoGenero} />
        <Route path="/generos" exact component={Generos} />
        
      </div>
    </Router>
  ) ;
}

export default App;
