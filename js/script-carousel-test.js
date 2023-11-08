const tag = document.querySelector("#slider");
let count = 3;

const nextButton = document.querySelector(".nextButton");
const prevButton = document.querySelector(".prevButton");

const url = "http://www.cms-ca-kpn.no/wp-json";
const endpoint = "/wp/v2/posts?per_page=30";

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
   console.log(data);
   console.log(data[0].title.rendered);
   console.log(data[0].date);
   for(var i = 0; i < 3; i++) {
      tag.innerHTML += `
         <a class="test">
            ${data[i].content.rendered}
            <h2 class="test2">${data[i].title.rendered}</h2>
         </a>
         `;
   }

   nextButton.addEventListener("click", nextSlide);
   prevButton.addEventListener("click", prevSlide);

   function nextSlide() {
      tag.innerHTML = "";
      for(var i = 0; i < 3; i++) {
         createNewSlide();
         count++;
         checkCount();
      }
   }
   
   function prevSlide() {
      count = count - 6;
      tag.innerHTML = "";
      for(var i = 0; i < 3; i++) {
         createNewSlide();
         count++;
         checkCount();
      }
   }
   
   function createNewSlide() {
      tag.innerHTML += `
         <a class="test">
            ${data[count].content.rendered}
            <h2 class="test2">${data[count].title.rendered}</h2>
         </a>
      `;
   }
}

handlePosts();

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