import React,{useState, useEffect} from 'react';
import './App.css';
import Recipe from './Recipe';

const App = () =>{
const API_ID = "883b5156"
const API_Key = "b67081f3631176fcbad9d589ea717138"
const [recipes, setRecipes] = useState([])
const [search, setSearch] = useState("")
const [query, setQuery] = useState("chicken")


useEffect(()=>{
  getRecipes()
},[query])

const getRecipes = async() =>{
  const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${API_ID}&app_key=${API_Key}`)
  const data = await response.json()
  console.log(data)
  setRecipes(data.hits)
  }


const updateSearch = (e) =>{
  console.log(search)
  setSearch(e.target.value)
}

const getSearch = e =>{
  e.preventDefault()
  setQuery(search)
}
  return (
    <div className="App">
      <form onSubmit={getSearch} className="search-form">
        <input className="search-bar" type="text" value={search} onChange={updateSearch}/>
        <button className="search-button" type="submit">Search</button>
      </form>
    <div className="recipes">
    {recipes.map(recipe =>(
    <Recipe 
    key={recipe.recipe.label}
    title={recipe.recipe.label} 
    calories={recipe.recipe.calories} 
    image={recipe.recipe.image}
    ingredients = {recipe.recipe.ingredients}/>
    ))}
    </div>
    </div>
  );
}

export default App;
