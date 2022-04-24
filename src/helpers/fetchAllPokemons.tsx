import { pokemonApi } from "../api/pokemonApi"
import { FetchAllPokemonResponse, Pokemon, SmallPokemon } from "../interfaces/fetchAllPokemonResponse"

export const fetchAllPokemons = async(): Promise<Pokemon[]> =>{
    const resp = await pokemonApi.get<FetchAllPokemonResponse>('/pokemon?limit=1500');

    const smallPokemonList = resp.data.results  
    console.log(resp)

    return transformSmallPokemonIntoPokemon(smallPokemonList)
}

const transformSmallPokemonIntoPokemon = (smallPokemonList:SmallPokemon[]): Pokemon[] =>{
    const pokemonArr: Pokemon[] = smallPokemonList.map((poke) =>{

        const pokeArr = poke.url.split('/')
        const id = pokeArr[6]
        const picture = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`

        return {
            id,
            name:poke.name,
            picture
        }
    })
    console.log(pokemonArr)

    return pokemonArr
}