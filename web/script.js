const contenedor = document.getElementById("container-row");
const btnCrear = document.getElementById("btn-new");
const myModal = new bootstrap.Modal(document.getElementById("myModal"));
const btnSave = document.getElementById("btn-save");
const form = document.getElementById("formulario");

let html = "";
let option = "";
let idForm = "";

const inputTitle = document.getElementById("inputTitle");
const inputDescription = document.getElementById("inputDescription");
const inputPoster = document.getElementById("inputPoster");

btnSave.addEventListener("click", () => {
  option = "new";
  btnSave.textContent = "New Post";
  inputTitle.value = "Titulo";
  inputDescription.value = "nueva descripción";
  inputPoster.value = "https://static.elnortedecastilla.es/www/multimedia/202107/06/media/MM-senderismo-asturias/oddle-1-ksRC--1350x900@El%20Comercio.jpg";
  myModal.show();
});

document.addEventListener("click", (event) => {
  if (event.target.matches("#btn-delete")) {
    const article = event.target.closest(".col-4");
    const idArticle = article.dataset.id;

    Swal.fire({
      title: "Estas seguro?",
      text: "No vas a poder revertir los cambios!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, borralo!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:3005/api/posts/${idArticle}`, {
          method: "DELETE",
        })
          .then((res) => {
            if (res.ok) {
              article.remove();
            }
          })
          .catch((err) => {
            console.error(err);
          });
        Swal.fire("Borrado!", "Tu posteo ha sido borrado.", "success");
      }
    });
  }
});

document.addEventListener("click", (event) => {
  if (event.target.matches("#btn-edit")) {
    const article = event.target.closest(".col-4");

    const idArticle = article.dataset.id;
    const urlPosterEdit = article.children[0].children[0].src;
    const titleEdit = article.children[0].children[1].children[0].textContent;
    const descriptionEdit =
      article.children[0].children[1].children[1].textContent;

    idForm = idArticle;
    inputTitle.value = titleEdit;
    inputDescription.value = descriptionEdit;
    inputPoster.value = urlPosterEdit;
    option = "edit";
    btnSave.textContent = "Edit";
    myModal.show();
  }
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  // console.log("submit");

  if (option === "new") {
    const newPost = {
      title: inputTitle.value,
      description: inputDescription.value,
      poster: inputPoster.value,
    };

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newPost)
    };

    fetch('http://localhost:3005/api/posts', requestOptions)
    .then(response => {
      if (response.ok) {
        alert('Post creado con éxito!');
        $('#myModal').modal('hide');
        location.reload();
      } else {
        console.log('Server response:', response);
      }
    })
    .catch(error => {
      console.error('Error:', error);
      console.log("Server response:", err.response);
    });

  } 

  if (option === "edit") {
    const newPost = {
      title: inputTitle.value,
      description: inputDescription.value,
      poster: inputPoster.value, // OJO! poster, no "url"
    };

    fetch(`http://localhost:3005/api/posts/${idForm}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newPost)
    }).then(res => {
      /* }).then(res => { //
      console.log(res); //
      return res.json(); //
    }).then(res => { // */
      if(res.ok){ //res.ok or data.ok ?
        alert('Post editado con éxito')
        myModal.hide();
        location.reload();
      } /* else {
        console.log("Server response:", res);
      } */
    }).catch((err) => {
      console.error(err);
      console.log("Server response:", err.response);
    });
  }

});

fetch("http://localhost:3005/api/posts")
  .then((res) => res.json())
  .then((data) => {
    // console.log(data);
    data.forEach((post) => {
      html += `
            <article class="col-4 d-flex justify-content-center mb-3 mt-2" data-id="${post.id}">
                <div class="card" style="width: 18rem;">
                    <img src="${post.poster}"
                        class="card-img-top" alt="nuevo titulo">
                    <div class="card-body">
                        <h5 class="card-title">${post.title}</h5>
                        <p class="card-text">${post.description}</p>
                        <small class="card-text">Created: ${post.createdAt}</small>
                        <small class="card-text">Modified: ${post.updatedAt}</small>
                        <div>
                            <button class="btn btn-secondary" id="btn-edit">Modificar</button>
                            <button type="" class="btn btn-danger" id="btn-delete">Eliminar</button>
                        </div>
                    </div>
                </div>
            </article>
            `;

      contenedor.innerHTML = html;
    });
  });
