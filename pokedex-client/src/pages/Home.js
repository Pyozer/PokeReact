import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import SearchBar from '../components/SearchBar'
import PokemonList from '../components/PokemonList';
import PageTitle from '../Context';
import logoPokedex from '../assets/Pokedex_logo.png';
import '../css/Home.css';
import Message from '../components/Message';

class Home extends Component {
    defaultState = { dataLoaded: false, pokemons: [], error: null, search: "" }

    constructor(props) {
        super(props)
        this.state = this.defaultState
    }

    componentDidMount() {
        this.fetchAllPokemon()
    }

    fetchAllPokemon = () => {
        this.setState({ dataLoaded: false, pokemons: [], error: null, search: "" })

        fetch('http://localhost:3001/pokemons')
            .then(res => res.json())
            .then(res => {
                res.data = (res.data || []).sort(({ndexA}, {ndexB}) => {
                    if (ndexA > ndexB) return 1
                    if (ndexA < ndexB) return -1
                    return 0
                })
                this.setState({ dataLoaded: true, error: res.message, pokemons: res.data })
            }).catch(err => this.setState({ dataLoaded: true, error: err.message }))
    }

    onSearch = (search) => {
        this.setState({ search: search })
    }

    getFilteredPokemons = (search) => {
        const searchValue = search.toLowerCase()
        return this.state.pokemons.filter(v => {
            const searchValues = [
                v.nom, v.nomen, v.nomde, v.nomja, v.nomch, v.nomko, v.nomromanji, v.nomtm,
                v.espece, v.ndex, v.pokemon
            ].map(v => v ? v.toLowerCase() : '')
            return searchValues.join(' ').indexOf(searchValue) !== -1
        })
    }

    renderErrorMsg = (error) => (
        <div className="row">
            <div className="col s12 m8 l6 offset-m2 offset-l3">
                <Message>
                    <div className="flex">
                        <div className="flex-grow">
                            Error: {error}
                        </div>
                        <div className="scaleEffect pointer white-text" href="#" onClick={this.fetchAllPokemon}>
                            <strong>Réessayer</strong>
                        </div>
                    </div>
                </Message>
            </div>
        </div>
    )

    renderBody = ({ dataLoaded, error, pokemons, search }) => {
        if (!dataLoaded)
            return <></>
        if (error)
            return this.renderErrorMsg(error)
        if (pokemons.length === 0)
            return <h3>No pokemon :/</h3>

        return <PokemonList pokemons={this.getFilteredPokemons(search)} />
    }

    render() {
        return (
            <PageTitle title="Home">
                <header className="App-header">
                    <Link to="/" title="Home">
                        <img src={logoPokedex} className="App-logo" alt="logo" />
                    </Link>
                </header>
                <main>
                    <div className="row">
                        <div className="col s12 m8 l6 offset-m2 offset-l3">
                            <SearchBar onSearch={this.onSearch} />
                        </div>
                    </div>
                    {this.renderBody(this.state)}
                </main>
            </PageTitle>
        )
    }
}

export default Home;
