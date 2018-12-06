import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import SearchBar from '../components/SearchBar'
import PokemonList from '../components/PokemonList';
import MessageAction from '../components/MessageAction';
import PageTitle from '../Context';
import logoPokedex from '../assets/Pokedex_logo.png';
import searchIcon from '../assets/search_icon.svg';
import '../css/Home.css';

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
                res.data = (res.data || []).sort((a, b) => {
                    if (a.ndex > b.ndex) return 1
                    if (a.ndex < b.ndex) return -1
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

    renderErrorMsg = (error, action) => (
        <div className="row">
            <div className="col s12 m8 l6 offset-m2 offset-l3">
                <MessageAction message={error} onAction={action} />
            </div>
        </div>
    )

    renderBody = ({ dataLoaded, error, search }) => {
        if (!dataLoaded)
            return <></>
        if (error)
            return this.renderErrorMsg(`Error: ${error}`, this.fetchAllPokemon)

        const pokemonsFiltered = this.getFilteredPokemons(search)
        if (pokemonsFiltered.length === 0) {
            if (search.length > 0)
                return this.renderErrorMsg(<span>No search result with <strong>{search}</strong></span>)
            return this.renderErrorMsg(<span>There isn't any pokemon in database</span>)
        }
        return <PokemonList pokemons={pokemonsFiltered} />
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
                <div className="fixed-bottom-right">
                    <Link
                        to="/search"
                        className="btn-floating btn-large waves-effect waves-light red flex align-items-center justify-content-center"
                        title="Search pokemon by ID">
                        <img src={searchIcon} width="30" alt="Search pokemon by ID" />
                    </Link>
                </div>
            </PageTitle>
        )
    }
}

export default Home;
