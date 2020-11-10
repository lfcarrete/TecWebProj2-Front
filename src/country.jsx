import React, { Component } from 'react'
import axios from 'axios'
import { Link, Redirect } from 'react-router-dom'

export default class Country extends Component {

    constructor(props) {
        super(props)
        this.Back = this.Back.bind(this)

        this.state = { listaCountries : [
            {country: "England"},
            {country: "Brazil"}
        ], usuario: {username: ''}, a: {e: 0} };
        
        console.log("Teste")

    

    }

    componentDidMount() {
        var name  = this.props.location.state.name
        var n = this.props.location.state.us
        this.setState((state) => {
            return {
                usuario: {username: n}
            }
        })
        const fetchData = async () => {
            const response = await axios.get('http://localhost:3003/country/searchCountry/' + name)
            .catch(erro => console.log(erro))
            
            if (!response.data) {
                return 
            }

            var handleChange = (prevState, r) => {
                prevState.listaCountries = r;
                console.log(prevState)
                return prevState;
            }
            
            this.setState(handleChange(this.state, response.data.provinces), () => console.log(this.state))

            
        }
        fetchData() 
    }

    Back() {
        var est = this.props.location.state.w
        this.setState((state) => {
        return {
            a : {e: est},
            redirectToReferrer: true
        }
        })
        return;  
    }

    render() {
        if (this.state.redirectToReferrer === true) {
            var u = this.state.usuario.username
            var estado = this.state.a.e
            if (estado == 1){
                return (
                    <Redirect to={{pathname: "/favoritesPag", state: {us: u} }}/>
                )
            } else {
                return (
                
                    <Redirect to={{pathname: "/AllCountries", state: {us: u} }}/>
                )
            }
        }

        var countries = this.state.listaCountries;
        console.log(this.state)

        var liCountries = countries.map(function(pais) {
            return (
                <dl>
                    <dt>
                        Country: {pais.province}
                    </dt>
                    <dd>
                        Confirmed: {pais.confirmed}
                    </dd>
                    <dd>
                        Recovered: {pais.recovered}
                    </dd>
                    <dd>
                        Deaths: {pais.deaths}
                    </dd>
                    <dd>
                        Active: {pais.active}
                    </dd>
                </dl>
                

            )
        })
        return (
            <div>
                <h1>Dados sobre o país</h1>
                <button onClick={this.Back}>voltar</button>
                <dl>
                    {liCountries}
                </dl>
            </div>
        )
    }
}