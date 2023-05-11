let pokemonRepository = (function () {
  let e = [];
  function t() {
    return e;
  }
  function n(e) {
    pokemonRepository.loadDetails(e).then(function () {
      var t, n, o, a;
      let r, l, s, d, c, p, m;
      (t = `Pokemon's Name:  ${e.name}`),
        (n = `Pokemon's details Urls: ${e.detailsUrl}`),
        (o = e.imageUrl),
        (a = `Pokemon's Height: ${e.height}`),
        (r = document.querySelector("#modal-container")),
        (r.innerHTML = ""),
        (l = document.createElement("div")),
        l.classList.add("modal"),
        (s = document.createElement("button")),
        s.classList.add("modal-close"),
        (s.innerText = "Close"),
        s.addEventListener("click", i),
        (d = document.createElement("h1")),
        (d.innerText = t),
        (c = document.createElement("p")),
        (c.innerText = n),
        (p = document.createElement("p")),
        (p.innerText = a),
        (m = document.createElement("img")),
        (m.src = o),
        l.appendChild(s),
        l.appendChild(d),
        l.appendChild(c),
        l.appendChild(p),
        l.appendChild(m),
        r.appendChild(l),
        r.classList.add("is-visible"),
        r.addEventListener("click", (e) => {
          e.target === r && i();
        });
    });
  }
  function o(e) {
    let t = document.querySelector(".pokemon-list"),
      o = document.createElement("li");
    o.classList.add("list-group-item");
    let i = document.createElement("button");
    (i.innerText = e.name),
      i.classList.add("button-class"),
      i.classList.add("btn-primary"),
      i.classList.add("btn"),
      i.addEventListener("click", () => n(e)),
      o.appendChild(i),
      t.appendChild(o);
  }
  function i() {
    document.querySelector("#modal-container").classList.remove("is-visible");
  }
  return (
    window.addEventListener("keydown", (e) => {
      let t = document.querySelector("#modal-container");
      "Escape" === e.key && t.classList.contains("is-visible") && i();
    }),
    {
      getAll: t,
      add: function t(n) {
        "object" == typeof n && e.push(n);
      },
      findPokemon: function t(n) {
        e.filter((e) => e.name === n).length
          ? console.log(`Pokemon ${n} Is Found!`)
          : console.log(`Pokemon ${n} Is Not Found!`);
      },
      addListItem: o,
      loadList: function e() {
        return fetch("https://pokeapi.co/api/v2/pokemon/?limit=12")
          .then(function (e) {
            return e.json();
          })
          .then(function (e) {
            e.results.forEach(function (e) {
              o({ name: e.name, detailsUrl: e.url });
            });
          })
          .catch(function (e) {
            console.error(e);
          });
      },
      loadDetails: function e(t) {
        return fetch(t.detailsUrl)
          .then(function (e) {
            return e.json();
          })
          .then(function (e) {
            (t.imageUrl = e.sprites.front_default),
              (t.height = e.height),
              (t.types = e.types);
          })
          .catch(function (e) {
            console.error(e);
          });
      },
      showDetails: n,
    }
  );
})();
pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach((e) => {
    pokemonRepository.addListItem(e.name);
  });
}),
  document.write("<br>"),
  pokemonRepository
    .getAll()
    .forEach((e) => document.write(e.name + "(height: " + e.height + ")<br>")),
  document.write("<br>"),
  pokemonRepository.getAll().forEach((e) => {
    e.height > 1
      ? document.write(
          e.name + "(height: " + e.height + ")- Wow, that's big!<br>"
        )
      : document.writeln(e.name + "(height: " + e.height + ")<br>");
  }),
pokemonRepository.findPokemon("Metapod2")
pokemonRepository.findPokemon("Someone")