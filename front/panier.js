let produitStorage = JSON.parse(localStorage.getItem("produit"))

console.log(produitStorage)
let arrayStorage =[]



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
                newProductImage.src= "images/oak_" +[i+1]+".jpg"
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






/*<div class="panier__contenu--produit">
<img class="photoProduit" src="images/oak_1.jpg" alt="Photo du produit">
                    
<div class="produit__description">
    <p class="price">599€</p>
    <p class="title">Cross table</p>
    <div class="produit__description--quantite">
        <p>Quantité :</p>
        <p>1</p>
    </div>
    
    <div class="vanish">
        <p class="vanish__1">Dark oak</p>
        <a href="#" class="arrow"></a>
    </div>
</div>

<a href="#" class="modal__close"></a>
</div>*/