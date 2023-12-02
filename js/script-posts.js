const url = "https://www.cms-ca-kpn.no/wp-json/wp/v2/posts?per_page=30";

const postsContainer = document.querySelector("#postsContainer");
const viewMoreBtn = document.querySelector(".view-more");
let length = 6;
let error = false;

viewMoreBtn.onclick = function() {
   event.preventDefault();
   /* Length of how many posts should be visible incremented by six each time the button is clicked */
   length = length + 6;
   postsContainer.innerHTML = "";
   getApi();
}

async function getApi() {
   try {
      const response = await fetch(url);
      const data = await response.json();
      handlePosts(data);
   } catch(error) {
      postsContainer.classList.add("error");
      postsContainer.innerHTML = "An error occured displaying the blog posts!";
      postsContainer.classList.remove("posts-container");
   } finally {
      postsContainer.classList.remove("loading");
      postsContainer.classList.add("posts-container");
   }
}

async function handlePosts(data) {
   postsContainer.innerHTML = "";
   for(var i = 0; i < length; i++) {
       postsContainer.innerHTML += `
         <a class="all-posts__post" href="blog-post.html?id=${data[i].id}">
            ${data[i].content.rendered}
         </a>
      `;

      /* When clicking the view more button, you get sent to the bottom of the page */
      if(length >= 12) {
         const scrollingElement = (document.scrollingElement || document.body);
         scrollingElement.scrollTop = scrollingElement.scrollHeight;
      }
      /* If length is 30 or more remove the button */
      if(length >= 30) {
         viewMoreBtn.style.display = "none";
      }
   } 
}

getApi();