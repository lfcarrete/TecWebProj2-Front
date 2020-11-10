import React, { Component } from 'react'
import axios from 'axios'
import { Link, Redirect } from 'react-router-dom'
import './AllCountries.css'

export default class favorite extends Component {

    constructor(props) {
        super(props)
        this.Back = this.Back.bind(this)
        this.state = { listaCountries : [
            {country: "England"},
            {country: "Brazil"}
        ], usuario: {username: ''} };
        

        console.log("Teste")
    }

    componentDidMount() {
        const fetchData = async () => {
            var name  = this.props.location.state.us
            this.setState((state) => {
                return {
                    usuario: {username: name}
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

    Back() {
        this.setState((state) => {
        return {
            redirectToReferrer: true,
        }
        })
        return;  
    }

    render() {
        if (this.state.redirectToReferrer === true) {
            var usuario = this.state.usuario.username
            return (
                <Redirect to={{pathname: "/AllCountries", state: {us: usuario}}} />
            )
        }
        var countries = this.state.listaCountries;
        console.log(this.state)
        var usuario = this.state.usuario.username
        
        var liCountries = countries.map(function(pais) {
            return (
                <dl>
                    <dt>
                        <Link className = "paises" to= {{pathname: "/favoriteList", state: { name: pais.name, us: usuario }  }}>{pais.name}</Link>
                    </dt>
                </dl>
                

            )
        })
        return (
            <div>
                <h1>Selecione um país e ele entrara na lista de favoritos</h1>
                <button onClick={this.Back}>voltar</button>
                <dl>
                    {liCountries}
                </dl>
            
            </div>
        )
    }

}