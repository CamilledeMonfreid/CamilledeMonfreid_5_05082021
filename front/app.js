const modal = document.getElementById('background')
const modalTitle =document.getElementById("modal__description--title")
const modalText = document.getElementById('modal__description--text')
const modalPrice = document.getElementById('modalPrice')
const modalClose = document.getElementById("modal__close")
const modalSubmit = document.getElementById("submitPanier")
function closeModal(){
    modal.style.display = "none";
}
modalClose.addEventListener("click",closeModal)
modalSubmit.addEventListener("click",closeModal)

const quantite = document.getElementById("compteur")
const more = document.getElementById("more")
const less = document.getElementById("less")
function add(){
    quantite.textContent ++
}
function remove(){
    if(quantite.textContent > 1){
        quantite.textContent --
    }
}
more.addEventListener("click",add)
less.addEventListener("click",remove)



fetch('../back/data.json')
.then((response)=>{
    const furnitureData =response.json();
    furnitureData.then((furniture)=>{
        console.log(furniture)
        for(let i=0; i <furniture.length; i++){
            let section = document.getElementById('sectionProduct')

            let lienFurniture = document.createElement("a")
            lienFurniture.href = "#"
            lienFurniture.id = furniture[i]._id
            section.appendChild(lienFurniture)
            
            lienFurniture.addEventListener("click",launchModal)
            function launchModal() {
                    modal.style.display = "flex";
                    console.log(lienFurniture.id)
                    if(lienFurniture.id==furniture[i]._id){
                        console.log(furniture[i].name)
                        modalTitle.textContent = furniture[i].name
                        modalText.textContent =furniture[i].description
                        modalPrice.textContent = furniture[i].price /100 +"€"
                        const photoModal = document.getElementById("modalPhoto")
                        photoModal.src = "images/oak_" + [i + 1] +".jpg"

                        const selectionnerVarnish = document.getElementById("selectionner")


                        function openSelection(){
                            const hideVarnish = document.getElementById("hide")
                            hideVarnish.style.display = "block"
                        }
                        selectionnerVarnish.addEventListener("click",openSelection)

                        const essai = document.getElementById("essai")
                        

                        for(let t = 0; furniture[i].varnish.length;t++){
                            essai.options[essai.options.length]= new Option(furniture[i].varnish[t], [t]);

                        }

                        
                    }
            }



            let divFurniture = document.createElement("div")
            divFurniture.className = "produit"
            lienFurniture.appendChild(divFurniture)

            let titleFurniture = document.createElement("p")
            titleFurniture.className = "title"
            titleFurniture.textContent = furniture[i].name
            divFurniture.appendChild(titleFurniture)

            let imageFurniture = document.createElement("img")
            imageFurniture.src = "images/oak_" +[i+1]+".jpg"
            imageFurniture.className = "photo"
            imageFurniture.alt = "Photo du produit"
            divFurniture.appendChild(imageFurniture)

            let listVarnishFurniture = document.createElement("ul")
            divFurniture.appendChild(listVarnishFurniture)

            for(let j=0; j<furniture[i].varnish.length; j++){
                let varnishFurniture = document.createElement("li")
                varnishFurniture.textContent = furniture[i].varnish[j]
                listVarnishFurniture.appendChild(varnishFurniture)
            }

            let divDescriptionFurniture = document.createElement("div")
            divDescriptionFurniture.className = "description"
            divFurniture.appendChild(divDescriptionFurniture)

            let textDescriptionFurniture = document.createElement("p")
            textDescriptionFurniture.className= "description__text"
            textDescriptionFurniture.textContent = furniture[i].description
            divDescriptionFurniture.appendChild(textDescriptionFurniture)

            let priceDescriptionFurniture = document.createElement("p")
            priceDescriptionFurniture.className= "description__price"
            priceDescriptionFurniture.textContent = furniture[i].price/100 +"€"
            divDescriptionFurniture.appendChild(priceDescriptionFurniture)
        }

    })
    
})


/* Création de la liste déroulante pour trier les médias */
const selectElt = document.querySelector("select");
const selectDiv = document.querySelector("#conteneur");

const newSelect = document.createElement("div");
newSelect.classList.add("new-select");
newSelect.innerHTML = selectElt.options[selectElt.selectedIndex].innerHTML;
selectDiv.appendChild(newSelect);

const newMenu = document.createElement("div");
newMenu.classList.add("select-items", "select-hide");

for(let option of selectElt.options){
    const newOption = document.createElement("div");
    newOption.innerHTML = option.innerHTML;

    newSelect.addEventListener('click',function(){
        if(newSelect.innerHTML == option.innerHTML){
            newOption.style.display ="none"
        } else{
            newOption.style.display = "block"
        }
    })
        
    newOption.addEventListener("click", function(){
        for(let option of selectElt.options){
            if(option.innerHTML === this.innerHTML){
                selectElt.selectedIndex = option.index;
                newSelect.innerHTML = this.innerHTML;
                break;
            }
        }
        newSelect.click();
    });
    newMenu.appendChild(newOption);
}

selectDiv.appendChild(newMenu);

newSelect.addEventListener("click", function(e){
    e.stopPropagation();
    this.nextSibling.classList.toggle("select-hide");
    this.classList.toggle("active");
});

