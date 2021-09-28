let totalPrice = JSON.parse(localStorage.getItem("totalPrice"))
let textTotalPrice = document.getElementById("totalPriceConfirmation")
textTotalPrice.textContent = "(TOTAL : " + totalPrice +" €)"

const formSubmit = document.getElementById("button")
const eP = document.getElementById("erreurPrenom");
const eN = document.getElementById("erreurNom");
const eM = document.getElementById("erreurMail");
const eA = document.getElementById("erreurAdresse");
const eC = document.getElementById("erreurCity")

//Vérification du formulaire avant envoi
formSubmit.addEventListener("click",(e)=>{
    const lastNameForm = document.getElementById("lastName")
    const firstNameForm = document.getElementById("firstName")
    const addressForm = document.getElementById("address")
    const cityForm = document.getElementById("city")
    const emailForm = document.getElementById("email")

    // fonction de vérification du format du mail
    let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; // Vérification du format du mail
    function eMailValidation(){ 
        if (emailForm.value.match(mailformat)){
            return true;
        } else if (emailForm.value == "") {
            return false;
        } else {
            return false;
        }
    }

    // format des input du formulaire quand il y a une erreur
    function erreurStyle(es){
        es.style.border = 'solid'
        es.style.borderColor='red';
        es.style.borderWidth='2px';
    }
    function erreurStyleStop(es){
        es.style.borderColor='none';
        es.style.borderWidth='0px';
    }

    // Prénom
    if (firstNameForm.value.length < 2){
        e.preventDefault();
        erreurStyle(firstNameForm);
        eP.style.display='block';
    } else {
        erreurStyleStop(firstNameForm);
        eP.style.display='none';
    }

    // Nom
    if (lastNameForm.value.length < 2) {
        e.preventDefault(); 
        erreurStyle(lastNameForm);
        eN.style.display='block';
    } else {
        erreurStyleStop(lastNameForm);
        eN.style.display='none';
    }

    // Email
    if (eMailValidation() == false){
        e.preventDefault();
        erreurStyle(emailForm);
        eM.style.display='block';
    } else {
        erreurStyleStop(emailForm);
        eM.style.display='none';
    }

    // Adresse
    if (addressForm.value.length < 2){
        e.preventDefault();
        erreurStyle(addressForm);
        eA.style.display='block';
    } else {
        erreurStyleStop(addressForm);
        eA.style.display='none';
    }

    // City
    if (cityForm.value.length < 2) {
        e.preventDefault(); 
        erreurStyle(cityForm);
        eC.style.display='block';
    } else {
        erreurStyleStop(cityForm);
        eC.style.display='none';
    }

    if (firstNameForm.value.length >=2 && lastNameForm.value.length >= 2 && eMailValidation() == true && addressForm.value.length >=2 && cityForm.value.length >=2){
        formSubmit.onclick ="confirmation.html"

        let contact = {
            firstName: firstNameForm.value,
            lastName: lastNameForm.value,
            address: addressForm.value,
            city: cityForm.value,
            email: emailForm.value
        }
    
        let contactStorage = JSON.parse(localStorage.getItem("contact"))
        
        if(contactStorage){
            contactStorage.push(contact)
            localStorage.setItem("contact",JSON.stringify(contactStorage))
        } else{
            contactStorage =[];
            contactStorage.push(contact)
            localStorage.setItem("contact",JSON.stringify(contactStorage))
        }
    }
})





