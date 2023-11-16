const container = document.querySelector(".recent-posts");
let count = 3;

const nextButton = document.querySelector(".nextButton");
const prevButton = document.querySelector(".prevButton");

const url = "https://www.cms-ca-kpn.no/wp-json/wp/v2/posts?per_page=30";

async function getApi() {
   try {
      const response = await fetch(url);
      const data = await response.json();
      handlePosts(data);
   } catch(error) {
      container.innerHTML = "An error occured displaying the blog posts!";
      container.classList.remove("recent-posts");
      container.classList.add("error");
   }
}

async function handlePosts(data) {
   container.innerHTML = "";
   for(var i = 0; i < 3; i++) {
      container.innerHTML += `
         <a class="recent-posts__post" href="/html/blog-post.html?id=${data[i].id}">
            ${data[i].content.rendered}
         </a>
         `;
   }

   nextButton.addEventListener("click", nextSlide);
   prevButton.addEventListener("click", prevSlide);

   function nextSlide() {
      container.innerHTML = "";
      for(var i = 0; i < 3; i++) {
         createNewSlide();
         count++;
         checkCount();
      }
   }
   
   function prevSlide() {
      count = count - 6;
      container.innerHTML = "";
      for(var i = 0; i < 3; i++) {
         createNewSlide();
         count++;
         checkCount();
      }
   }
   
   function createNewSlide() {
      container.innerHTML += `
         <a class="recent-posts__post" href="/html/blog-post.html?id=${data[count].id}">
            ${data[count].content.rendered}
         </a>
      `;
   }
}

getApi();

function checkCount() {
   if(count <= 3) {
      prevButton.disabled = true;
      prevButton.classList.add("disabled");
   } else {
      prevButton.disabled = false;
      prevButton.classList.remove("disabled");
   }
   
   if(count >= 29) {
      nextButton.disabled = true;
      nextButton.classList.add("disabled");
   } else {
      nextButton.disabled = false;
      nextButton.classList.remove("disabled");
   }
}

checkCount();

/* Contact page button Locate to next page */
const contactPageBtn = document.querySelector("#locateToContact");
contactPageBtn.onclick = function() {
   window.location.href = "/html/contact.html";
}