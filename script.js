const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-button");
const pokeName = document.getElementById("pokemon-name");
const pokeId = document.getElementById("pokemon-id");
const weight_node = document.getElementById("weight");
const height_node = document.getElementById("height");
const types_node = document.getElementById("types");
const hp_node = document.getElementById("hp");
const att = document.getElementById("attack");
const def = document.getElementById("defense");
const spAtt = document.getElementById("special-attack");
const spDef = document.getElementById("special-defense");
const speed_node = document.getElementById("speed");

const listUrl = "https://pokeapi-proxy.freecodecamp.rocks/api/pokemon";
const poke_img = document.getElementById("poke-img");
let poke_search = "";


const pokeSearch = async () => {
  try{
    const name = !parseInt(searchInput.value) ? searchInput.value.toLowerCase() : parseInt(searchInput.value);
    const url = listUrl + `/${name}`
    const prom = await fetch(url);
    const data = await prom.json();
    showPoke(data);
  } catch(err) {
    alert("Pokémon not found")
  }
} 

const showPoke = (data) => {

    const { name,id,weight,height,types,stats,sprites } = data;
    pokeName.textContent = name.toUpperCase();
    pokeId.textContent = `#${id}`
    weight_node.textContent = `Weight: ${weight}`
    height_node.textContent = `Height: ${height}`
    const img_url = sprites.front_default
    poke_img.src = img_url

    let html_types = ``

    
    types.forEach((elem) => {
        html_types += `<div class="type-card ${elem.type.name}">${elem.type.name.toUpperCase()}</div>`
        
    })

    types_node.innerHTML = html_types;

    const stats_arr = [];

    stats.forEach((elem) => {
        stats_arr.push(elem.base_stat);
    })

    hp_node.textContent = stats_arr[0];
    att.textContent = stats_arr[1];
    def.textContent = stats_arr[2];
    spAtt.textContent = stats_arr[3];
    spDef.textContent = stats_arr[4];
    speed_node.textContent = stats_arr[5];
    
}

searchBtn.addEventListener("click", () => {
    pokeSearch();
})

searchInput.addEventListener("keypress", (e) => {
    if(e.key == "Enter"){
        pokeSearch();
    }

})