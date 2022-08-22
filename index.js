const form = document.querySelector("form")
fileInput = document.querySelector(".file-input"),
progressArea = document.querySelector(".progress-area");
uploadedArea = document.querySelector(".uploaded-area");

form.addEventListener("click", () => {
    fileInput.click();
})

fileInput.onchange = ({target}) => {
    console.log(target.files);
}

//Use php to receive files, dunno, I'm stuck

document.querySelector("header").textContent="File Uploader";