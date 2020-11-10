import React, { Component } from 'react'
import axios from 'axios'
import { Link, Redirect } from 'react-router-dom'

export default class favoriteList extends Component {

    constructor(props) {
        super(props)
        this.Back = this.Back.bind(this)

        this.state = { listaCountries : [
            {country: "England"},
            {country: "Brazil"}
        ] };
        
        console.log("Teste")

    

    }

    componentDidMount() {
        var nome  = this.props.location.state.us
        
            this.setState((state) => {
                return {
                    usuario: {username: nome}
                }
            })
        var count  = this.props.location.state.name
        console.log(this.props.location.state)

        axios.patch('http://localhost:3003/favorite/update/' + nome + '/' + count)
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
                <Redirect to={{pathname: "/favorites", state: {us: usuario}}} />
            )
        }
        var countries = this.state.listaCountries;
        console.log(this.state)


        return (
            <div>
                <h1>Pais adicionado!</h1>
                <button onClick={this.Back}>voltar</button>
            </div>
        )
    }
}