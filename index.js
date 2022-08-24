const form = document.querySelector("form")
fileInput = document.querySelector(".file-input"),
progressArea = document.querySelector(".progress-area");
uploadedArea = document.querySelector(".uploaded-area");

form.addEventListener("click", () => {
    fileInput.click();
})

fileInput.onchange = ({target}) => {
    let file = target.files[0]; //get first file in case user selects multiple files
    if (file) { //if file is selected
        let fileName = file.name; //getting selected file name
        if (fileName.length >=12) {
            let splitName = fileName.split('.');
            fileName = splitName[0].substring(0,12) + "... ." + splitName[1];
        }
        uploadFile(fileName);
        console.log(file);
    }
}

function uploadFile(name) {
    let xhr = new XMLHttpRequest(); //creating new xml obj (AJAX)
    xhr.open("POST", "php/upload.php"); //sending post request to the specified URL/File
    xhr.upload.addEventListener("progress", ({loaded, total}) => {
        let fileLoaded = Math.floor((loaded/total) * 100); //getting percentage of file loaded size
        let fileTotal = Math.floor(total / 1000); //getting file size in KB from bytes
        let fileSize;
        //if file size is less than 1024, then add only KB, else convert size into KB to MB
        (fileTotal < 1024) ? fileSize = fileTotal + " KB" : fileSize = (loaded / (1024 * 1024)).toFixed(2) + " MB";
        let progressHTML = `<li class="row">
                                <i class="fas fa-file-alt"></i>
                                <div class="content">
                                    <div class="details">
                                        <span class="name">${name} - Uploading</span>
                                        <span class="percent">${fileLoaded}%</span>
                                    </div>
                                    <div class="progress-bar">
                                        <div class="progress" style = "width: ${fileLoaded}%"></div>
                                    </div>
                                </div>
                            </li>`;
        // uploadedArea.innerHTML = ""; (to not show upload history)
        uploadedArea.classList.add("onprogress");
        progressArea.innerHTML = progressHTML;
        if (loaded == total) {
            progressArea.innerHTML = ""; //to not retain download progress
            let uploadedHTML = `<li class="row">
                                    <div class="content">
                                        <i class="fas fa-file-alt"></i>
                                        <div class="details">
                                            <span class="name">${name} - Uploaded</span>
                                            <span class="size">${fileSize}</span>
                                        </div>
                                    </div>
                                    <i class="fas fa-check"></i>
                                </li>`;
            // uploadedArea.innerHTML = uploadedHTML; (to not show upload history, also deactivate below code)
            uploadedArea.classList.remove("onprogress");
            uploadedArea.insertAdjacentHTML("afterbegin", uploadedHTML);
        }
    });             
    let formData = new FormData(form); //formData is an object to easily send form data
    xhr.send(formData); //sending form data to php
}