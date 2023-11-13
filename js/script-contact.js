const name = document.querySelector("#name");
const nameError = document.querySelector("#nameError");

const email = document.querySelector("#email");
const emailError = document.querySelector("#emailError");

const subject = document.querySelector("#subject");
const subjectError = document.querySelector("#subjectError");

const message = document.querySelector("#message");
const messageError = document.querySelector("#messageError");

const form = document.querySelector(".form");
const submit = document.querySelector(".cta-submit");
const mainContainer = document.querySelector("main");
const infoSection = document.querySelector(".information-section");
const confirmSection = document.querySelector(".form-complete");

function checkLength(value, len) {
   if(value.trim().length > len) {
      return true;
   } else {
      return false;
   }
}

function checkEmail(email) {
   const regEx = /\S+@\S+\.\S+/;
   const patternMatches = regEx.test(email);
   return patternMatches;
}

/* NAME VALIDATION */
name.addEventListener("focus", (event) => {
   event.target.style.borderColor = "#767676";
});

name.addEventListener("blur", function() {
   if(checkLength(name.value, 7)) {
      nameError.style.display = "none";
   } else {
      nameError.style.display = "block";
      name.style.borderColor = "red";
   }
});

/* EMAIL VALIDATION */
email.addEventListener("focus", (event) => {
   event.target.style.borderColor = "#767676";
});

email.addEventListener("blur", function() {
   if(checkEmail(email.value)) {
      emailError.style.display = "none";
   } else {
      emailError.style.display = "block";
      email.style.borderColor = "red";
   }
});

/* SUBJECT VALIDATION */
subject.addEventListener("focus", (event) => {
   event.target.style.borderColor = "#767676";
});

subject.addEventListener("blur", function() {
   if(checkLength(subject.value, 14)) {
      subjectError.style.display = "none";
   } else {
      subjectError.style.display = "block";
      subject.style.borderColor = "red";
   }
});

/* MESSAGE VALIDATION */
message.addEventListener("focus", (event) => {
   event.target.style.borderColor = "#767676";
});

message.addEventListener("blur", function() {
   if(checkLength(message.value, 24)) {
      messageError.style.display = "none";
   } else {
      messageError.style.display = "block";
      message.style.borderColor = "red";
   }
});

name.addEventListener("keyup", validateForm);
email.addEventListener("keyup", validateForm);
subject.addEventListener("keyup", validateForm);
message.addEventListener("keyup", validateForm);

function validateForm() {
   if(checkLength(name.value, 7) && checkEmail(email.value) && checkLength(subject.value, 14) && checkLength(message.value, 24)) {
      submit.disabled = false;
      submit.classList.remove("cta-disabled");
      submit.classList.add("cta-enabled");
      confirmSection.textContent = "Form has been filled out correctly!";
   } else {
      submit.disabled = true;
      submit.classList.remove("cta-enabled");
      submit.classList.add("cta-disabled");
      confirmSection.textContent = "";
   }
}

submit.addEventListener("click", function (e) {
   e.preventDefault();

   form.style.opacity = "0.5"; 
   infoSection.style.opacity = "0.5";

   const overlayContainer = document.createElement("div");
   overlayContainer.classList.add("overlay-container");
   mainContainer.appendChild(overlayContainer);

   overlayContainer.innerHTML = 
      `
         <button class="close-button close-overlay"><i        class="fa-solid fa-xmark"></i></button>
         <div class="flex-col overlay-container__info">
            <h3>Your message has been sent!</h3>
            <p>Please be patient as we try to solve your question as fast as possible</p>
         </div>
         <button class="cta cta-overlay">View Posts</button>
      `;

   const closeOverlay = overlayContainer.querySelector(".close-button");
   closeOverlay.addEventListener("click", removeOverlay);
   

   function removeOverlay() {
      overlayContainer.style.display = "none";
      form.style.opacity = "1";
      infoSection.style.opacity = "1";
   }
}, true);