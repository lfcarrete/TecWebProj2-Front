import React, { Component } from 'react'
import axios from 'axios'
import { Link, Redirect } from 'react-router-dom'
import './AllCountries.css'

export default class favoritesPag extends Component {

    constructor(props) {
        super(props)
        this.Back = this.Back.bind(this)

        this.state = { listaCountries : [""], usuario: {username: ''}, };
        
        console.log("Teste")

    }

    componentDidMount() {
        var n  = this.props.location.state.us
        this.setState((state) => {
            return {
                usuario: {username: n}
            }
        })
        const fetchData = async () => {
            const response = await axios.get('http://localhost:3003/favorite/' + n)
            .catch(erro => console.log(erro))
            console.log(response)
            
            if (!response.data) {
                return 
            }

            var handleChange = (prevState, r) => {
                prevState.listaCountries = r;
                console.log(prevState)
                return prevState;
            }
            
            this.setState(handleChange(this.state, response.data.favorites), () => console.log(this.state))

            
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
        var paises = this.state.listaCountries;
        console.log(paises)
        var u = this.state.usuario.username;
        var liCountries = paises.map(function(pais) {
            return (
                <dl>
                    <dt>
                        <Link className = "paises" to= {{pathname: "/country", state: {us: u, name: pais, w: 1 }  }}>{pais}</Link>
                    </dt>
                </dl>
            )
        })

        return (
            <div>
                <h1>Esses são seus países favoritos</h1>
                <dl>
                    <h4>{liCountries}</h4>
                </dl>
                <button onClick={this.Back}>Voltar</button>
            </div>
        )
    }
}