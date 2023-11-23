const url = new URL(location.href);

const id = url.searchParams.get("id");

if(id === null) {
   location.href = "/";
}

const apiUrl = "https://www.cms-ca-kpn.no/wp-json/wp/v2/posts/" + id;

const main = document.querySelector("main");
const container = document.querySelector(".post-container");

async function getApi() {
   try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      handlePosts(data);
   } catch(error) {
      container.innerHTML = "An error occured displaying the blog post!";
      container.classList.add("error");
      container.style.padding = "1em";
      container.style.margin = "3em auto";
   }
}

function handlePosts(data) {
   document.title = `Food Blog - ${data.title.rendered}`;
   container.innerHTML = `${data.content.rendered}`;

   const image = container.querySelector(".post-image img");
   image.addEventListener("click", openModal);
   const modal = document.querySelector(".modal-container");
   const modalContainer = document.querySelector(".modal-container-body");

   function openModal() {
      modalContainer.innerHTML = `${data.content.rendered}`;
      modal.classList.add("active");
   }

   modal.addEventListener("click", function(event) {
      // Check if the user clicks inside the modal
      const isOutside = event.target.closest(".modal-container-body");

      // If not (modal will be = null), close the modal!
      if(!isOutside) {
         modalContainer.innerHTML = "";
         modal.classList.remove("active");
      }
   })
}

getApi();