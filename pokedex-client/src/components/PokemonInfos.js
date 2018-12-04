import React from 'react';
import PokemonInfosCard from './PokemonInfosCard'
import TableRow from './TableRow';
import TableStriped from './StripedTable';
import Title from './Title';
import PokemonHeader from './PokemonHeader';

const TableStripedRow = ({ className, data }) => (
    <div className={"col s12 " + className}>
        <TableStriped>
            {Object.entries(data).map(([key, value]) => (
                <TableRow title={key} content={value} key={key} />
            ))}
        </TableStriped>
    </div>
)

const PokemonInfo = ({ pokemon }) => {
    const d = pokemon
    Object.entries(pokemon).forEach(([key, value]) => {
        if (typeof value === 'string')
            d[key] = value.replace(/\[/g, '').replace(/\]/g, '').replace(/'/g, '').replace(/\{\{!\}\}/g, '')
    })

    return (
        <div>
            <PokemonHeader ndex={d.ndex} nom={d.nom} />

            <Title>Identité</Title>

            <div className="row">
                <TableStripedRow className='l6' data={{
                    'Couleur': d.couleur, 'Espece': d.espece, 'Type 1': d.type1, 'Type 2': d.type2,
                    'Taille': d.taille, 'Poids': d.poids, 'Forme': d.forme
                }} />

                <TableStripedRow className='l6' data={{
                    'Pokemon': d.pokemon, 'Nom FR': d.nom, 'Nom EN': d.nomen, 'Nom DE': d.nomde, 'Nom TM': d.nomtm,
                    'Nom JA': d.nomja, 'Nom KO': d.nomko, 'Nom CH': d.nomch, 'Nom ROMANJI': d.nomromanji
                }} />
                <TableStripedRow className='mt-2' data={{
                    'Artwork Supp1': d['artwork_supp1-nom'], 'Artwork Supp2': d['artwork_supp2-nom'], 'Artwork Supp3': d['artwork_supp3-nom'],
                    'Artwork Supp4': d['artwork_supp4-nom'], 'Artwork Supp5': d['artwork_supp5-nom'], 'Artwork Supp6': d['artwork_supp6-nom']
                }} />
            </div>
            
            <Title>Attaques</Title>

            <div className="row">
                {d.attaques.map((attaque, index) => (
                    <div className="col s12 m6 l4 xl3" key={index}>
                        <PokemonInfosCard data={attaque} />
                    </div>
                ))}
            </div>

            <Title>Autres informations</Title>

            <div className="row">
                <div className="col s12 m6 l5 xl4">
                    <PokemonInfosCard data={{
                        'ndex': d.ndex, 'njdex': d.njdex, 'hdex': d.hdex, 'fdex': d.fdex,
                        'adex': d.adex, 'odex': d.odex, 'opdex': d.opdex,
                    }} />
                </div>
                <div className="col s12 m6 l7 xl8">
                    <PokemonInfosCard data={{
                        'Capacité spécial 1': d.capspe1, 'Capacité spécial 2': d.capspe2, 'Capacité spécial 3': d.capspe3,
                        'Oeuf Pas': d.oeufpas, 'Groupe Oeuf 1': d.groupoeuf1, 'Groupe Oeuf 2': d.groupoeuf2,
                    }} />
                </div>
            </div>
            <div className="row">
                <div className="col s12 m6">
                    <PokemonInfosCard data={{
                        'Effort value': d.effortval, 'Expérience value': d.expval,
                        'Expérience max': d.expmax, 'Capture value': d.captureval,
                    }} />
                </div>
                <div className="col s12 m6">
                    <PokemonInfosCard data={{
                        'Pinball RB GIF': d['pinballRB-gif'], 'Pinball RS GIF': d['pinballRS-gif'], 'Pinball RS': d.pinballRS,
                        'PDM': d.pdm, 'Almia': d.almia, 'Diff RS RFVF': d['diff_rs-rfvf'], 'Diff DP PT': d['diff_dp-pt'],
                        'Diff 4G FM': d['diff_4G-fm'],
                    }} />
                </div>
                <div className="col s12">
                    <PokemonInfosCard data={{
                        'Sensibilité Combat': d['sensib-combat'], 'Sensibilité Eau': d['sensib-eau'], 'Sensibilité Electrique': d['sensib-électrique'],
                        'Sensibilité Feu': d['sensib-feu'], 'Sensibilité Glace': d['sensib-glace'], 'Sensibilité Psy': d['sensib-psy'],
                        'RMQ Insecte': d['rmq-insecte'], 'RMQ Insecte Num': d['rmq-insecte-num'],
                        'RMQ Glace': d['rmq-glace'], 'RMQ Glace Num': d['rmq-glace-num'], 'RMQ Spectre Num': d['rmq-spectre-num'],
                        'RMQ Feu': d['rmq-feu'], 'RMQ Feu Num': d['rmq-feu-num'], 'RMQ Spectre': d['rmq-spectre'],
                    }} />
                </div>
            </div>
        </div>
    )
}

export default PokemonInfo;
