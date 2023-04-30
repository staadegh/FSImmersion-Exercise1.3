let pokemonList =[{name: 'Charmander', height: 0.5, types:['Leave', 'Tree'], Abilities:"Blaze", EVs:"2 Defence"},
                  {name: 'Metapod', height: 0.6, types:['Green', 'Sour'], Abilities: "Run-away", EVs: "1 Speed"},
                  {name: 'Weedle', height: 1.7, types:['Tall', 'Short'], Abilities:"Shed-skin", EVs:"2 Speed"},
                  {name: 'Horsey', height: 0.5, types:['Big', 'Finest'], Abilities:"Shed-skin", EVs:"3 Speed" },
                  {name: 'Fearow', height: 0.4, types:['Thin', 'Earliest'], Abilities:"Sniper", EVs:"2 Speed" }];

// Part 1 of exercise 1.3.
for (let i = 0; i <pokemonList.length; i++) { 
    document.write(pokemonList[i].name+ "<br>")
}
 
document.write("<br>")

for (let i = 0; i <pokemonList.length; i++) {
    document.write(pokemonList[i].name + "(height: " + pokemonList[i].height + ")" + "<br>") 
}

// Part 3 of exercise 1.3.
document.write("<br>")

for (let i = 0; i <pokemonList.length; i++) {
    if (pokemonList[i].height > 1.0) // Checks if the current pokemon's height is greater than 1.0; a threshold of 1.0 is chosen for the height.
       document.write(pokemonList[i].name + "(height: " + pokemonList[i].height + ")- Wow, that's big!" + "<br>" ) 
    else 
       document.writeln(pokemonList[i].name + "(height: " + pokemonList[i].height + ")" + "<br>" )
}

