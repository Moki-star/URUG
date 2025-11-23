
function loadMovies(){
  db.collection("movies").get().then(snapshot=>{
    let html="";
    snapshot.forEach(doc=>{
      let d=doc.data();
      html+=`<div>
        <h3>${d.title}</h3>
        <img src="${d.image}" width="150">
        <p>${d.category}</p>
      </div>`;
    });
    document.getElementById("movie-list").innerHTML=html;
  });
}

function searchMovie(){
  let q=document.getElementById("search").value.toLowerCase();
  let items=document.querySelectorAll("#movie-list div");
  items.forEach(i=>{
    i.style.display = i.innerText.toLowerCase().includes(q) ? "" : "none";
  });
}

window.onload=loadMovies;
