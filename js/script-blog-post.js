const url = new URL(location.href);

const id = url.searchParams.get("id");

if(id === null) {
   location.href = "/";
}

const apiUrl = "https://www.cms-ca-kpn.no/wp-json/wp/v2/posts/" + id;

const main = document.querySelector("main");
const container = document.querySelector(".post-container");
const newContainer = document.createElement("div");

async function getApi() {
   try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      handlePosts(data);
   } catch(error) {
      console.log(error);
   }
}

function handlePosts(data) {
   document.title = `Food Blog - ${data.title.rendered}`;
   container.innerHTML = `${data.content.rendered}`;

   const image = container.querySelector(".post-image img");
   image.addEventListener("click", openModal);
   const modal = document.querySelector("[data-modal]");
   const modalContainer = document.querySelector(".modal-container");

   function openModal() {
      modalContainer.innerHTML = `${data.content.rendered}`;
      modal.showModal();
   }

   modal.addEventListener("click", function(event) {
      // Check if the user clicks inside the modal
      const isOutside = event.target.closest(".modal-container");

      // If not (modal will be = null), close the modal!
      if(!isOutside) {
         modalContainer.innerHTML = "";
         modal.close();
      }
   })
}

getApi();