import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import SearchBar from '../components/SearchBar'
import PokemonList from '../components/PokemonList';
import PageTitle from '../Context';
import logoPokedex from '../assets/Pokedex_logo.png';
import '../css/Home.css';

class Home extends Component {
    constructor(props) {
        super(props)
        this.state = { dataLoaded: false, pokemons: [], error: null, search: "" }
    }

    componentDidMount() {
        this.fetchAllPokemon()
    }

    fetchAllPokemon = () => {
        fetch('http://localhost:3001/pokemons')
            .then(res => res.json())
            .then(res => {
                if (res.data)
                    res.data = res.data.sort((a, b) => {
                        if (a.ndex > b.ndex) return 1
                        if (a.ndex < b.ndex) return -1
                        return 0
                    })
                this.setState({ dataLoaded: true, error: res.message, pokemons: res.data || [] })
            });
    }

    onSearch = (search) => {
        this.setState({
            search: search
        })
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

    renderBody = ({dataLoaded, error, pokemons, search}) => {
        if (!dataLoaded) return <></>
        if (error) return <h3>Error: {error}</h3>
        if (pokemons.length === 0) return <h3>No pokemon :/</h3>
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
