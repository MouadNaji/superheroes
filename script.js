"use strict";
function get() {
  fetch("https://database1-6832.restdb.io/rest/superheroes", {
    method: "get",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "x-apikey": "5d887445fd86cb75861e25f2",
      "cache-control": "no-cache"
    }
  })
    .then(e => e.json())
    .then(heroes => {
      heroes.forEach(hero => {
        const template = document.querySelector("template").content;
        const copy = template.cloneNode(true);
        copy.querySelector("h1").textContent = hero.heroname;
        copy.querySelector("h2").textContent = hero.realname;
        copy.querySelector("h3").textContent = hero.powers;
        document.querySelector("#liste").appendChild(copy);
      });
    });
}
get();
