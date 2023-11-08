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
   const container = document.querySelector(".container");
   console.log(data);
   data.forEach(post => {
      container.innerHTML += `
         <div class="test">
            ${post.content.rendered}
         </div>
      `;
   })
}

handlePosts();