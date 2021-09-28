let produitStorage = JSON.parse(localStorage.getItem("produit"))
let arrayStorage =[]

//Fonction pour vider le panier
let viderPanier = document.getElementById("supprProducts")
function vider(){
    localStorage.clear()
    location.reload()
}
viderPanier.addEventListener('click',vider)

//Accéder au formulaire de paiement
let goToFormulaire = document.getElementById("goToForm")
goToFormulaire.style.cursor = "pointer"
function validPanier(){
    if(arrayStorage.length!=0){
        goToFormulaire.href = "paiement.html"
    }
}
goToFormulaire.addEventListener('click',validPanier)

//Création du panier
fetch('http://localhost:3000/api/furniture')
.then((response)=>{
    const furnitureData =response.json();
    furnitureData.then((furniture)=>{
        for(let i=0; i < furniture.length; i++){
            for(let y = 0; y<produitStorage.length; y++){
                if(furniture[i].name==produitStorage[y].nomProduit){
                    let totalPriceProduct=furniture[i].price/100* parseInt(produitStorage[y].quantiteProduit)     
                    arrayStorage.push(totalPriceProduct) 
                    let panierProduits = document.getElementById("panierProduct")

                    let newProduct = document.createElement("div")
                    newProduct.className = "panier__contenu--produit"
                    panierProduits.appendChild(newProduct)

                    let newProductImage = document.createElement("img")
                    newProductImage.className = "photoProduit"
                    newProductImage.src= "../images/oak_" +[i+1]+".jpg"
                    newProductImage.alt = "Photo du produit"
                    newProduct.appendChild(newProductImage)

                    let newProductDescription = document.createElement("div")
                    newProductDescription.className = "produit__description"
                    newProduct.appendChild(newProductDescription)

                    let newProductPrice = document.createElement("p")
                    newProductPrice.className ="price"
                    newProductPrice.textContent =furniture[i].price/100* parseInt(produitStorage[y].quantiteProduit)  +"€"
                    newProductDescription.appendChild(newProductPrice)

                    let newProductName = document.createElement("p")
                    newProductName.className = "title"
                    newProductName.textContent = furniture[i].name
                    newProductDescription.appendChild(newProductName)

                    let newProductQuantite = document.createElement("div")
                    newProductQuantite.className ="produit__description--quantite"
                    newProductDescription.appendChild(newProductQuantite)

                    let textQuantite = document.createElement("p")
                    textQuantite.textContent = "Quantité :"
                    newProductQuantite.appendChild(textQuantite)

                    let quantiteProduct = document.createElement("p")
                    quantiteProduct.textContent = produitStorage[y].quantiteProduit
                    newProductQuantite.appendChild(quantiteProduct)
                } 
            }
        }

        //Calcul du prix total
        let totalPrice = 0;
        for (let j = 0; j < arrayStorage.length; j++) {
            totalPrice += arrayStorage[j];
        }
        
        let priceSousTotal = document.getElementById("panierSousTotal")
        priceSousTotal.textContent = totalPrice + "€" 

        let priceTotal = document.getElementById("totalPrice")
        let priceLivraisonTotal = totalPrice + 4.99
        priceTotal.textContent = "TOTAL (" + priceLivraisonTotal +"€)" 

        localStorage.setItem("totalPrice",JSON.stringify(priceLivraisonTotal))
    })
})