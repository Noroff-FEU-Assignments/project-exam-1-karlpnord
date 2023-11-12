const name = document.querySelector("#name");
const nameError = document.querySelector("#nameError");

const email = document.querySelector("#email");
const emailError = document.querySelector("#emailError");

const subject = document.querySelector("#subject");
const subjectError = document.querySelector("#subjectError");

const message = document.querySelector("#message");
const messageError = document.querySelector("#messageError");

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