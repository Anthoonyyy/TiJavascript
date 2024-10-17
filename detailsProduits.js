// Récupére l'ID du produit à partir de l'URL
const urlParams = new URLSearchParams(window.location.search);
const produitId = urlParams.get('id');

// Fonction pour afficher les détails du produit
function afficherDetailProduit(produit) {
    const produitDetail = document.getElementById('produit-detail');
    produitDetail.innerHTML = `
                <div class="col-md-8">
                    <div class="card">
                        <img src="${produit.image}" class="card-img-top" alt="${produit.nom}">
                        <div class="card-body">
                            <h3 class="card-title">${produit.nom}</h3>
                            <p class="card-text">${produit.description}</p>
                            <p class="card-text"><strong>Prix :</strong> ${produit.prix}€</p>
                            <p class="card-text"><small>Quantité disponible : ${produit.quantite}</small></p>
                            <button class="btn btn-primary add-to-cart" data-id="${produit.id}">Ajouter au panier</button>
                        </div>
                    </div>
                </div>
            `;
}


fetch('produits.json')
    .then(response => response.json())
    .then(data => {
        const produit = data.find(p => p.id == produitId);
        if (produit) {
            afficherDetailProduit(produit);
        } else {
            console.error('Produit non trouvé');
        }
    })
    .catch(error => console.error('Erreur lors du chargement des produits:', error));