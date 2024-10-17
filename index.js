function afficherProduits(produits) {
    const catalogue = document.getElementById('catalogue');
    catalogue.innerHTML = '';

    produits.forEach(produit => {
        const produitElement = document.createElement('div');
        produitElement.classList.add('col-md-6', 'col-lg-4', 'col-xl-3', 'mb-4');

        produitElement.innerHTML = `
            <div class="single-product card h-100">
                <img src="${produit.image}" alt="${produit.nom}" class="card-img-top img-fluid" />
                <div class="card-body">
                    <h3 class="product-title">${produit.nom}</h3>
                    <p class="product-description">${produit.description}</p>
                    <p class="product-price"><strong>Prix :</strong> ${produit.prix}€</p>
                    <p class="product-quantity"><small>Quantité restante : ${produit.quantite}</small></p>
                    <button class="btn btn-primary add-to-cart" data-id="${produit.id}">Ajouter au panier</button>
                    <button class="btn btn-secondary view-details" data-id="${produit.id}" onclick="window.location.href='produit.html?id=${produit.id}'">Détails du produit</button>
                </div>
            </div>
        `;

        catalogue.appendChild(produitElement);
    });
}

// Récupération des données depuis le fichier JSON
fetch('produits.json')
    .then(response => response.json())
    .then(data => {
        afficherProduits(data);
    })
    .catch(error => console.error('Erreur lors du chargement des produits:', error));