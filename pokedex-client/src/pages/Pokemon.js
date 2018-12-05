import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import PokemonInfo from '../components/PokemonInfos'
import PokemonHeader from '../components/PokemonHeader'
import BackIcon from '../components/BackIcon'
import PageTitle from '../Context';

class Pokemon extends Component {
    constructor(props) {
        super(props)
        this.state = { dataLoaded: false }
    }

    componentDidMount() {
        this.fetchPokemon(this.props.match.params.pokemonId)
    }

    fetchPokemon = (pokemonId) => {
        fetch(`http://localhost:3001/pokemons/${pokemonId}`)
            .then(res => res.json())
            .then(res => {
                this.setState({ dataLoaded: true, error: res.message, pokemon: res.data })
            });
    }

    renderBody = ({ dataLoaded, error, pokemon }) => {
        if (!dataLoaded) return
        if (error) return <h3>Error: {error}</h3>

        if (!pokemon) return <h3>No pokemon :/</h3>

        return <PokemonInfo pokemon={pokemon} />
    }

    render() {
        const { pokemon } = this.state
        const pokemonId = this.props.match.params.pokemonId
        const pokemonName = pokemon ? pokemon.nom : ''

        return (
            <PageTitle title={`#${pokemonId} ${pokemonName}`}>
                <div className="flex align-items-center justify-content-between">
                    <div>
                        <BackIcon href="/" title="Back to home" />
                    </div>
                    {pokemon ? (
                        <>
                            <PokemonHeader ndex={pokemon.ndex} nom={pokemon.nom} className="col s8" />
                            <div></div>
                        </>
                    ) : <></>}
                </div>
                {this.renderBody(this.state)}
            </PageTitle>
        )
    }
}

export default withRouter(Pokemon);
