import React,{useState,useEffect} from 'react';
import axios from 'axios';

function WildPokemon(props){
	return(
		<div className="wild-pokemon">
                	<h3>Wild Encounter</h3>
                        <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${props.wildPokemon.id}.png`}/>
                        <h4>{props.wildPokemon.name}</h4>
                        <button className="catch" onClick={props.set}> CATCH </button>
                </div>

	);
}

function PokeList(props){
	return(
		<div class="pokedex">
		<h3>PoKéDeX</h3>
		<div class="pokedex-list">
		{
			props.pokedex.map((pokemon)=>(
				<div className="pokedex-item">
                       			<img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}/>
                       			<h4>{pokemon.name}</h4>
               				<button className="remove" onClick={()=>props.remove(pokemon.id)}>&times;</button>
              			</div>
			))
		}
		</div>
		</div>
	);
}

function App() {
	const [pokedex,setPokedex]= useState([]);
	const [wildPokemon,setWildPokemon] = useState([]);

	useEffect(()=>{
		encounterWithWildPokemon()
	},[])

	const pokeId = () => {
		const min = 1
		const max =151
		return Math.floor( Math.random()*(max-min+1) + min );
	}

	const encounterWithWildPokemon = () => {
		axios
			.get(`https://pokeapi.co/api/v2/pokemon/${pokeId()}`)
			.then(response=>{
				console.log(response.data);
				setWildPokemon(response.data);
			})
	}

	const catchPokemon = (pokemon) =>{
		setPokedex( state =>{
			const monExists = (state.filter( p => p.id==pokemon.id)).length > 0;
			if(!monExists){
				state = [...state,pokemon]
				state.sort((a,b)=>a>b);
			}
			return state;
		})
		encounterWithWildPokemon();
	}

	const removePokemon =(id) =>{
		setPokedex(state => {
			const newState = state.filter(p => p.id != id)
			state = [...newState]
			return state;
		})
	}

	return (
		<div className="app">
			<header>PoKéMoN</header>
			<WildPokemon wildPokemon={wildPokemon} set ={()=>catchPokemon(wildPokemon)}/>
			<PokeList pokedex={pokedex} remove={(id)=>removePokemon(id)}/>
		</div>
	);
}

export default App;
