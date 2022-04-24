import React, { useState, ChangeEvent } from "react";
import   Loading  from "../components/Loading";
import { usePokemon } from "../hooks/usePokemon";
import { Pokemon } from "../interfaces/fetchAllPokemonResponse";

const Homepage = () => {
  const { pokemons, isLoading  } = usePokemon();
  const [currentPage, setCurrentPage] = useState(0)
  const [search, setSearch] = useState("")

  const filteredPokemons = (): Pokemon[] => {
    if(search.length === 0)
    return pokemons.slice(currentPage, currentPage + 5)

    //Si hay algo en la caja de texto

    const filtered = pokemons.filter((pokemon) => pokemon.name.includes(search))
    return filtered.slice(currentPage, currentPage + 5)
  }

  const nextPage = () => {
    if(  pokemons.filter((pokemon) => pokemon.name.includes(search)).length > currentPage + 5)
    setCurrentPage(currentPage + 5)
  }

  const prevPage = () => {
    if(currentPage > 0){
      setCurrentPage(currentPage - 5)
    }
  }

  const onSearchChange = ({target}:ChangeEvent<HTMLInputElement>) => {
    setCurrentPage(0)
    setSearch(target.value)
  }


  usePokemon();


  return (
    <div className="mt-5">
      <h1>Listado de Pokemons</h1>
      <hr />
      <input type="text" className="mb-2 form-control" placeholder="Buscar Pokemons" value={search} onChange={onSearchChange}/>
      <button className="btn btn-primary" onClick={prevPage}>Anteriores</button>
      &nbsp;
      <button className="btn btn-primary" onClick={nextPage}>Siguientes</button>
      <table className="table">
        <thead>
          <tr>
            <th style={{width:100}}>ID</th>
            <th style={{width:150}}>Nombre</th>
            <th>Imagen</th>
          </tr>
        </thead>
        <tbody>
          {filteredPokemons().map((pokemon:Pokemon) => (
            <tr key={pokemon.id}>
              <td>{pokemon.id}</td>
              <td>{pokemon.name}</td>
              <td>
                <img src={pokemon.picture} alt={pokemon.name} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isLoading && <Loading/>}
    </div>
  );
};

export default Homepage;
