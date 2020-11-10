import React, { Component } from 'react'
import axios from 'axios'
import { Link, Redirect } from 'react-router-dom'
import './AllCountries.css'

export default class AllCountries extends Component {

    constructor(props) {
        super(props)
        this.favorite = this.favorite.bind(this)
        this.favoritelist = this.favoritelist.bind(this)

        this.state = { listaCountries : [
            {country: "England"},
            {country: "Brazil"}
        ], usuario: {username: ''}, w: {es: 0} };
        

        console.log("Teste")
    }

    componentDidMount() {
        const fetchData = async () => {
            const  n   = this.props.location.state.us
            console.log(n)
            this.setState((state) => {
                return {
                    usuario: {username: n}
                }
            })
            console.log(this.state)
            const response = await axios.get('http://localhost:3003/country/fetchData')
            .catch(erro => console.log(erro))
            
            if (!response.data) {
                return 
            }

            var handleChange = (prevState, r) => {
                prevState.listaCountries = r;
                console.log(prevState)
                return prevState;
            }
            
            this.setState(handleChange(this.state, response.data), () => console.log(this.state))

            
        }
        fetchData() 
    }

    favorite() {
        axios.post('http://localhost:3003/favorite/create/' + this.state.usuario.username, this.state.usuario.username)
            .then(resp => {
                if(Math.floor(resp.status/100) == 2){
                    this.setState((state) => {
                    return {
                        redirectToReferrer: true
                    }
                    })
                    return;
                }
                console.log(resp)
            })
            .catch(erro => console.log(erro))
    }

    favoritelist() {
        this.setState((state) => {
        return {
            redirectToReferrer: true,
            w: {es: 1}
        }
        })
        return;  
    }

    render() {
        if (this.state.redirectToReferrer === true) {
            var usuario = this.state.usuario.username
            var estado = this.state.w.es
            if (estado == 1){
                return (
                    <Redirect to={{pathname: "/favoritesPag", state: {us: usuario} }}/>
                )
            } else {
                return (
                
                    <Redirect to={{pathname: "/favorites", state: {us: usuario} }}/>
                )
            }
            
        }
        var countries = this.state.listaCountries;
        console.log(this.state)
        var u = this.state.usuario.username;
        var liCountries = countries.map(function(pais) {
            return (
                <dl>
                    <dt>
                        <Link className = "paises" to= {{pathname: "/country", state: {us: u, name: pais.name, w: 0 }  }}>{pais.name}</Link>
                    </dt>
                </dl>
                

            )
        })
        return (
            <div>
                <h1>Selecione um país</h1>
                <button onClick={this.favorite}>Criar pagina de favoritos</button><br />
                <button onClick={this.favoritelist}>Ver paises favoritos</button>
                <dl>
                    {liCountries}
                </dl>
            </div>
        )
    }

}