const url = "https://www.cms-ca-kpn.no/wp-json";
const endpoint = "/wp/v2/posts?per_page=30";

const postsContainer = document.querySelector(".posts-container");
const viewMoreBtn = document.querySelector(".view-more");
let length = 6;

viewMoreBtn.onclick = function() {
   event.preventDefault();
   length = length + 6;
   postsContainer.innerHTML = "";
   handlePosts();
}

async function getApi(url) {
   try {
      const response = await fetch(url);
      if(response.ok) {
         const data = await response.json();
         return data;
      } else {
         console.log("an error");
      }
   } catch(error) {
      console.log("error");
   }
}

async function handlePosts() {
   const newUrl = url + endpoint;
   const data = await getApi(newUrl);
   for(var i = 0; i < length; i++) {
      postsContainer.innerHTML += `
         <a class="all-posts__post">
            ${data[i].content.rendered}
         </a>
      `;
      
      if(length >= 30) {
         viewMoreBtn.style.display = "none";
      }
   }
}

handlePosts();