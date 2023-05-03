let pokemonRepository = function() {
  let pokemonList = [
    {
      name: "Charmander",
      height: 0.5,
      types: ["Leave", "Tree"],
      Abilities: "Blaze",
      EVs: "2 Defence",
    },
    {
      name: "Metapod",
      height: 0.6,
      types: ["Green", "Sour"],
      Abilities: "Run-away",
      EVs: "1 Speed",
    },
    {
      name: "Weedle",
      height: 1.7,
      types: ["Tall", "Short"],
      Abilities: "Shed-skin",
      EVs: "2 Speed",
    },
    {
      name: "Horsey",
      height: 0.5,
      types: ["Big", "Finest"],
      Abilities: "Shed-skin",
      EVs: "3 Speed",
    },
    {
      name: "Fearow",
      height: 0.4,
      types: ["Thin", "Earliest"],
      Abilities: "Sniper",
      EVs: "2 Speed",
    },
  ];

  function getAll() {
    return pokemonList;
  }

  function add(pokemon) {
    if (typeof pokemon === "object")
      // Bonus Task solution; Ensures that only objects can be added.
      pokemonList.push(pokemon);
  }

  function findPokemon(searchName) {
    // Bonus Task solution; use filter function to find Pokemon.
    let pokemonFound = pokemonList.filter((pkle) => pkle.name === searchName);

    if (pokemonFound.length) console.log(`Pokemon ${searchName} Is Found!`);
    else console.log(`Pokemon ${searchName} Is Not Found!`);
  }

  function showDetails(pokemon) { 
    console.log(pokemon)
  }

  function addListItem(pokemon){
    let pokemonListUl = document.querySelector(".pokemon-list")
    let listItem = document.createElement("li")
    let newButton = document.createElement("button")
    newButton.innerText = pokemon
    newButton.classList.add("button-class")
    newButton.addEventListener("click", showDetails)
    listItem.appendChild(newButton)
    pokemonListUl.appendChild(listItem) 
  }

  return {
    getAll: getAll,
    add: add,
    findPokemon: findPokemon, // Bonus Task solution; use filter function to find Pokemon.
    addListItem: addListItem
  };
}();

// Use pokemonRepository.getAll() is used in the codes below to get the pokemonList from the above IIFE.
//pokemonRepository.getAll().forEach((pkle) => document.write(pkle.name + "<br>"));
pokemonRepository.getAll().forEach((pkle) =>  { 
   pokemonRepository.addListItem(pkle.name) 
 });

document.write("<br>");

pokemonRepository.getAll().forEach((pkle) =>document.write(pkle.name + "(height: " + pkle.height + ")" + "<br>"));

document.write("<br>");

pokemonRepository.getAll().forEach((pkle) => {
  if (pkle.height > 1.0)
    // Checks if the current pokemon's height is greater than 1.0; a threshold of 1.0 is chosen for the height.
    document.write(
      pkle.name + "(height: " + pkle.height + ")- Wow, that's big!" + "<br>"
    );
  else document.writeln(pkle.name + "(height: " + pkle.height + ")" + "<br>");
});

pokemonRepository.findPokemon("Metapod2"); // Bonus Task solution; use filter function to find Pokemon Metapod2. Result: Pokemon Metapod2 Is Not Found!
pokemonRepository.findPokemon("Metapod"); // Bonus Task solution; use filter function to find Pokemon Metapod. Result: Pokemon Metapod Is Found!
