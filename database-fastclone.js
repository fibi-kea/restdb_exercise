"use strict";

window.addEventListener("DOMContentLoaded", init);

function init() {
  console.log("init");
  get();
}

// sends a get request to the db
function post(newAlbum) {
  fetch("https://test01-0e26.restdb.io/rest/albums", {
    method: "post",
    body: JSON.stringify(newAlbum),
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "x-apikey": "5c7e37f2cac6621685acbb47",
      "cache-control": "no-cache"
    }
  })
    .then(res => res.json())
    .then(data => {
      showAlbum(data);
    });
}

// sends a get request to the db
function get() {
  console.log("get");
  //   use database endpoint with security code to get posts
  fetch("https://test01-0e26.restdb.io/rest/albums", {
    method: "get",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "x-apikey": "5c7e37f2cac6621685acbb47",
      "cache-control": "no-cache"
    }
  })
    //   format as jason
    .then(res => res.json())
    .then(data => {
      // send to loop
      data.forEach(showAlbum);
      console.log(data);
    });
}

// sends a delete request to the db
function deleteAlbum(id) {
  fetch("https://test01-0e26.restdb.io/rest/albums" + id, {
    method: "delete",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "x-apikey": "5c7e37f2cac6621685acbb47",
      "cache-control": "no-cache"
    }
  })
    .then(res => res.json())
    .then(data => {});
}

// loop to add posts to DOM - template -> clone -> append
function showAlbum(album) {
  console.log("showAlbum");
  const template = document.querySelector("[data-template]").content;
  const clone = template.cloneNode(true);
  clone.querySelector("[data-artist]").textContent = album.Artist;
  clone.querySelector("[data-title]").textContent = album.Title;
  clone.querySelector("[data-year]").textContent = album.Year;
  clone.querySelector("[data-id]").dataset.id = album._id;
  clone.querySelector("button").addEventListener("click", e => {
    // mouseevnt on click
    console.log(e);
    // finds mouse target (button) and delete its parent element on click (article)
    e.target.parentElement.remove();
    deleteAlbum(album._id);
  });
  document.querySelector("[data-container]").appendChild(clone);
}

document.querySelector("button").addEventListener("click", () => {
  const obj = {
    Artist: "Madonna",
    Title: "I'm not a virgin",
    Year: 1995
  };
  post(obj);
});
