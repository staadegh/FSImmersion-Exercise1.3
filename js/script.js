let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";

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
    pokemonRepository.loadDetails(pokemon).then(function () {
      console.log(pokemon);
    });
  }

  function addListItem(pokemon) {
    let pokemonListUl = document.querySelector(".pokemon-list");
    let listItem = document.createElement("li");
    let newButton = document.createElement("button");
    newButton.innerText = pokemon;
    newButton.classList.add("button-class");
    newButton.addEventListener("click", () => showDetails(pokemon));
    listItem.appendChild(newButton);
    pokemonListUl.appendChild(listItem);
  }

  function loadList() {
    return fetch(apiUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        json.results.forEach(function (item) {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url
          };
          add(pokemon);
        });
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  function loadDetails(item) {
    let url = item.detailsUrl;
   
    return fetch(url)
      .then(function (response) { 
        return response.json(); 
      })
      .then(function (details) { 
        // Now we add the details to the item
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        item.types = details.types; 
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  return {
    getAll: getAll,
    add: add,
    findPokemon: findPokemon, // Bonus Task solution; use filter function to find Pokemon.
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails,
  };
})();

// Use pokemonRepository.getAll() is used in the codes below to get the pokemonList from the above IIFE.
//pokemonRepository.getAll().forEach((pkle) => document.write(pkle.name + "<br>"));
pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach((pkle) => {
    pokemonRepository.addListItem(pkle.name);
  });
});

document.write("<br>");

pokemonRepository
  .getAll()
  .forEach((pkle) =>
    document.write(pkle.name + "(height: " + pkle.height + ")" + "<br>")
  );

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
