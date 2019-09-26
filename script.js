("use strict");
//ændre indholdet i form heroname
const form = document.querySelector("form");
form.addEventListener("submit", evt => {
  console.log(evt);
  evt.preventDefault();
  const data2 = {
    heroname: `${form.elements.heroname.value}`,
    realname: `${form.elements.realname.value}`,
    powers: `${form.elements.abilities.value}`,
    age: 10
  };
  addHeroToTheDom(data2);
  const postData = JSON.stringify(data2);
  fetch(
    "https://database1-6832.restdb.io/rest/superheroes?q={}&sort=heroname",
    {
      method: "post",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "x-apikey": "5d887445fd86cb75861e25f2",
        "cache-control": "no-cache"
      },
      body: postData
    }
  )
    .then(res => res.json())
    .then(data => {
      console.log(data);
      //addHeroToTheDom(data);
    });
});
form.elements.heroname.addEventListener("keyup", e => {
  console.log(e.key);
});

function get() {
  fetch(
    "https://database1-6832.restdb.io/rest/superheroes?q={}&sort=heroname",
    {
      method: "get",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "x-apikey": "5d887445fd86cb75861e25f2",
        "cache-control": "no-cache"
      }
    }
  )
    .then(e => e.json())
    .then(heroes => {
      console.log(heroes);
      heroes.forEach(addHeroToTheDom);
    });
}
get();

function addHeroToTheDom(hero) {
  const template = document.querySelector("template").content;
  const copy = template.cloneNode(true);
  copy.querySelector(".temp").dataset.heroid = hero._id;
  copy.querySelector("h1").textContent = hero.heroname;
  copy.querySelector("h2").textContent = hero.realname;
  copy.querySelector("h3").textContent = hero.powers;
  copy.querySelector(".btn").addEventListener("click", () => {
    console.log(hero._id);
    deleteIt(hero._id);
  });
  document.querySelector("#liste").prepend(copy);
}

function post() {
  const data = {
    heroname: `Black Panther`,
    realname: `Tchalla`,
    powers: `Fight like a panther`,
    age: 10
  };
  addHeroToTheDom(data);
  const postData = JSON.stringify(data);
  fetch(
    `https://database1-6832.restdb.io/rest/superheroes?q={}&sort=heroname"`,
    {
      method: "post",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "x-apikey": "5d887445fd86cb75861e25f2",
        "cache-control": "no-cache"
      },
      body: postData
    }
  )
    .then(res => res.json())
    .then(data => {
      console.log(data);
      //addHeroToTheDom(data);
    });
}
document.querySelector("#button").addEventListener("click", addSuperhero);

function addSuperhero() {
  post();
}

function deleteIt(id) {
  fetch(`https://database1-6832.restdb.io/rest/superheroes/${id}`, {
    method: "delete",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "x-apikey": "5d887445fd86cb75861e25f2",
      "cache-control": "no-cache"
    }
  })
    .then(res => res.json())
    .then(data => {
      document.querySelector(`[data-heroid = "${id}"]`).remove();
    });
}
