const sign_in_link = document.querySelector("#sign-in-link");
const sign_up_link = document.querySelector("#sign-up-link");
const forgot_password_link = document.querySelector("#forgot-password-link");
const container = document.querySelector(".container");
const sign_forgot_password_link = document.querySelector("#sign-forgot-password-link");


forgot_password_link.addEventListener("click", () => {
	container.classList.add("forgot-password-mode");
})

sign_up_link.addEventListener("click", () => {
    container.classList.add("sign-up-mode");
})

sign_in_link.addEventListener("click", () => {
    container.classList.remove("sign-up-mode");
})

sign_forgot_password_link.addEventListener("click", () => {
	container.classList.remove("forgot-password-mode");
})
