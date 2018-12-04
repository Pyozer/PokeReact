import React from 'react'
import '../css/PokemonInfosCard.css'

const PokemonInfosCard = ({ data }) => {
    let tableLines = []
    Object.entries(data).forEach(([key, value]) => {
        if (value)
            tableLines.push(
                <div className="row py-row mb-0" key={key}>
                    <div className="col s6 xl5 truncate capitalize">{key}</div>
                    <div className="col s6 xl7 truncate capitalize"><strong>{value}</strong></div>
                </div>
            )
    })

    if (tableLines.length === 0) return <></>

    return (
        <div className="Pokemon-Infos-Card card">
            <div className="card-content striped">
                {tableLines}
            </div>
        </div>
    )
}

export default PokemonInfosCard