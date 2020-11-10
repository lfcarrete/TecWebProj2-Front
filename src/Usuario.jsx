import React, { Component } from 'react'
import axios from 'axios'
import { Link, Redirect } from 'react-router-dom'
import './Usuario.css'

export default class Usuario extends Component {

    constructor(props){
        super(props)
    }

    render() {

        return (
            <div>
                <h1>Bem Vindo!</h1>
                <div class="Btn">
                    <Link class="Button" to={{pathname: "/Login"}}>Login</Link><br />
                    <Link class="Button" to={{pathname: "/Cadastrar"}}>Cadastrar</Link><br />
                </div>
            </div>


        )

    }


}