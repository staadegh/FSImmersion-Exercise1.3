let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=4";

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
     // console.log(pokemon);
     // Call function showModal with Pokemon's Name, detailsUrl, ImageUrl and height
      showModal( `Pokemon's Name:  ${pokemon.name}`, `Pokemon's details Urls: ${pokemon.detailsUrl}`, pokemon.imageUrl, `Pokemon's Height: ${pokemon.height}`)
    });
  }

  function addListItem(pokemon) {
    let pokemonListUl = document.querySelector(".pokemon-list");
    let listItem = document.createElement("li");
    let newButton = document.createElement("button");
    newButton.innerText = pokemon.name;
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
        //  add(pokemon);
        addListItem(pokemon);
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
        item.imageUrl = details.sprites.front_default
        item.height = details.height
        item.types = details.types
      })
      .catch(function (e) {
        console.error(e);
      });
  }
  
  //
  function showModal(title, text, image, pkmHeight) { 
    let modalContainer = document.querySelector('#modal-container');
  
    // Clear all existing modal content
    modalContainer.innerHTML = '';
  
    let modal = document.createElement('div');
    modal.classList.add('modal');
  
    // Add the new modal content
    let closeButtonElement = document.createElement('button');
    closeButtonElement.classList.add('modal-close');
    closeButtonElement.innerText = 'Close';
    closeButtonElement.addEventListener('click', hideModal);
  
    let titleElement = document.createElement('h1');
    titleElement.innerText = title;
  
    let contentElement = document.createElement('p');
    contentElement.innerText = text;

    let pkmHeightElement = document.createElement("p") // Creates a p Element for Pokemon height
    pkmHeightElement.innerText= pkmHeight

    let imageElement = document.createElement("img") // Creates an Image Element for Pokemon imageUrl
    imageElement.src = image   
  
    modal.appendChild(closeButtonElement);
    modal.appendChild(titleElement);
    modal.appendChild(contentElement);
    modal.appendChild(pkmHeightElement); // Appends the p Element for Pokemon's height
    modal.appendChild(imageElement); // Appends the Image Element
    modalContainer.appendChild(modal);
  
  
  
    modalContainer.classList.add('is-visible');
  
    modalContainer.addEventListener('click', (e) => {
      // Since this is also triggered when clicking INSIDE the modal
      // We only want to close if the user clicks directly on the overlay
      let target = e.target;
      if (target === modalContainer) {
        hideModal();
      }
    });
  
    
  }
  
  function hideModal() {
    let modalContainer = document.querySelector('#modal-container');
    modalContainer.classList.remove('is-visible');
  }
  
  window.addEventListener('keydown', (e) => {
    let modalContainer = document.querySelector('#modal-container');
    if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
      hideModal();  
    }
  });
  
  /*document.querySelector('#show-modal').addEventListener('click', () => {
    showModal('Modal title', 'This is the modal content!');
  } )*/

  //
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


  /*
function showModal(title, text) {
  let modalContainer = document.querySelector('#modal-container');

  // Clear all existing modal content
  modalContainer.innerHTML = '';

  let modal = document.createElement('div');
  modal.classList.add('modal');

  // Add the new modal content
  let closeButtonElement = document.createElement('button');
  closeButtonElement.classList.add('modal-close');
  closeButtonElement.innerText = 'Close';
  closeButtonElement.addEventListener('click', hideModal);

  let titleElement = document.createElement('h1');
  titleElement.innerText = title;

  let contentElement = document.createElement('p');
  contentElement.innerText = text;

  modal.appendChild(closeButtonElement);
  modal.appendChild(titleElement);
  modal.appendChild(contentElement);
  modalContainer.appendChild(modal);



  modalContainer.classList.add('is-visible');

  modalContainer.addEventListener('click', (e) => {
    // Since this is also triggered when clicking INSIDE the modal
    // We only want to close if the user clicks directly on the overlay
    let target = e.target;
    if (target === modalContainer) {
      hideModal();
    }
  });

  
}

function hideModal() {
  let modalContainer = document.querySelector('#modal-container');
  modalContainer.classList.remove('is-visible');
}

window.addEventListener('keydown', (e) => {
  let modalContainer = document.querySelector('#modal-container');
  if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
    hideModal();  
  }
});

document.querySelector('#show-modal').addEventListener('click', () => {
  showModal('Modal title', 'This is the modal content!');
}
)
  */