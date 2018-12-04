import React from 'react'
import PokemonImage from './PokemonImage';

const PokemonHeader = ({ndex, nom, className}) => (
    <div className={"flex align-items-center justify-content-center " + className}>
        <h2 className="m-0 mr-1">#{ndex} {nom}</h2>
        <div>
            <PokemonImage ndex={ndex} width="150" className="bounceEffect" />
        </div>
    </div>
)

export default PokemonHeader