let captchaSubject;

addEventListener("load", function() {
    console.log("pagina loaden");
    loadImages();
    loadCaptchaSubject();
    addEventListerToControleer();
});
function loadCaptchaSubject() {
    let bool=Math.round(Math.random());
    if (bool) {
        captchaSubject="crosswalk";
    } else {
        captchaSubject="trafficlight";
    }
    let subject=document.getElementById("subject");
    subject.innerHTML=captchaSubject;
}
function loadImages() {
    let images=document.getElementById("images");
    let indexesSeen=[];
    for (let i = 0; i < 9; i++) {
        let index=0;
        do {
            index=Math.floor(Math.random() * captchaImages.length);
        } while (indexesSeen.indexOf(index) !== -1);
        indexesSeen.push(index);

        let img = document.createElement("img");
        let captchaImage=captchaImages[index];
        img.src = "../media/"+captchaImage.filename;
        img.setAttribute("data-labels",captchaImage.labels);
        img.alt=captchaImage.filename;
        img.addEventListener("click",selectImage);
        images.appendChild(img);
    }
}

function selectImage(e) {
    console.log("image geklikt");
    let img=e.target;
    if (img.classList.contains("selected")) {
        img.classList.remove("selected");
    } else {
        img.classList.add("selected");
    }
}

function addEventListerToControleer() {
    let controleer=document.getElementById("check");
    let allTrue=true;
    controleer.addEventListener("click", function(){
        console.log("controleer geklikt");
       let images=document.querySelectorAll("#images img");
        for (let i = 0; i < images.length; i++) {
            let img=images[i];
            let labels=img.getAttribute("data-labels").split(",");
            let found=false;
            let isSelected=img.classList.contains("selected");
            for (let j = 0; j < labels.length; j++) {
                if (labels[j]===captchaSubject) {
                    found=true;
                    break;
                }
            }
            if (found) {
                if (isSelected) {
                    img.classList.add("valid");
                } else {
                    allTrue=false;
                    img.classList.add("forgot");
                }
            } else {
                if (isSelected) {
                    allTrue=false;
                    img.classList.add("invalid");
                }
            }

        }
        setMessage(allTrue);
        setTimeout(function (){
            console.log("reload");
            window.location.reload();
        },3000);
    });
}

function setMessage(allTrue) {
    let message=document.getElementById("message");
    if (allTrue) {
        message.innerHTML="Proficiat";
    } else {
        message.innerHTML="Helaas, probeer opnieuw";
    }
}