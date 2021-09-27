let produitStorage = JSON.parse(localStorage.getItem("produit"))
let products=[];



if(products.length ==0){
    let pageConfirmation = document.getElementById("confirm")
    pageConfirmation.style.display="none"
    
} else{
    let contactStorage = JSON.parse(localStorage.getItem("contact"))
    let contact= contactStorage[0]

    let totalPrice = JSON.parse(localStorage.getItem("totalPrice"))
    let afficherTotalPrice = document.createElement("p")
    afficherTotalPrice.textContent = "Pour rappel, le prix total de votre commande est de" + totalPrice +"€"
    let essai = document.getElementById("confirm")
    console.log(essai)
    essai.appendChild(afficherTotalPrice)

    for(let i = 0; i<produitStorage.length;i++){
        products.push(produitStorage[i].idProduit)
    }

    const aEnvoyer = {
        products,
        
        contact
    }
    
    console.log(aEnvoyer)
    fetch('http://localhost:3000/api/furniture/order',{
        method: "POST",
        body: JSON.stringify(aEnvoyer),
        headers:{
            "content-type":"application/JSON"
        }
    })
    .then((reponse)=>{
        const orderData = reponse.json();
        orderData.then((orderDt) =>{
            console.log(orderDt)
            
            let orderStorage =[];
            orderStorage.push(orderDt.orderId)
            localStorage.setItem("orderId",JSON.stringify(orderStorage))
            let textOrderId = document.getElementById("orderIdText")
            textOrderId.textContent = "Votre numéro de commande est le " + orderDt.orderId
            localStorage.clear()
            
        })
    
    })

}





