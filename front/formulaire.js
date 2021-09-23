const formSubmit = document.getElementById("button")
formSubmit.onclick = "confirmation.html"
formSubmit.addEventListener("click",()=>{
    console.log("ok")
    const lastNameForm = document.getElementById("lastName")
    const firstNameForm = document.getElementById("firstName")
    const addressForm = document.getElementById("address")
    const cityForm = document.getElementById("city")
    const emailForm = document.getElementById("email")

    let contact = {
        firstName: firstNameForm.value,
        lastName: lastNameForm.value,
        address: addressForm.value,
        city: cityForm.value,
        email: emailForm.value
    }
    console.log(contact)

    let contactStorage = JSON.parse(localStorage.getItem("contact"))
    
    console.log(contactStorage)
    if(contactStorage){
        
   
        contactStorage.push(contact)
        console.log(contactStorage)
        localStorage.setItem("contact",JSON.stringify(contactStorage))
        
    } else{
        contactStorage =[];
        contactStorage.push(contact)
        console.log(contactStorage)
        localStorage.setItem("contact",JSON.stringify(contactStorage))
    }


    
})





