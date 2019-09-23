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
      heroes.forEach(addHeroToTheDom);
    });
}
get();

function addHeroToTheDom(hero) {
  const template = document.querySelector("template").content;
  const copy = template.cloneNode(true);
  copy.querySelector("h1").textContent = hero.heroname;
  copy.querySelector("h2").textContent = hero.realname;
  copy.querySelector("h3").textContent = hero.powers;
  document.querySelector("#liste").appendChild(copy);
}

function post() {
  const data = {
    heroname: "Hulk",
    realname: "DR-sometihng",
    powers: "he is super strong, can jump very high, he mostly go berserk",
    age: 44
  };

  const postData = JSON.stringify(data);
  fetch("https://database1-6832.restdb.io/rest/superheroes", {
    method: "post",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "x-apikey": "5d887445fd86cb75861e25f2",
      "cache-control": "no-cache"
    },
    body: postData
  })
    .then(res => res.json())
    .then(data => {
      console.log(data);
      addHeroToTheDom(data);
    });
}
document.querySelector("#button").addEventListener("click", addSuperhero);

function addSuperhero() {
  post();
}
