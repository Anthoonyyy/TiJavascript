function afficherProduits(produits) {
    const catalogue = document.getElementById('catalogue'); // Sélectionner le conteneur du catalogue
    catalogue.innerHTML = ''; // Vider le contenu existant

    // Parcourir chaque produit dans les données JSON
    produits.forEach(produit => {
        // Créer un élément div pour chaque produit avec les classes Bootstrap
        const produitElement = document.createElement('div');
        produitElement.classList.add('col-md-4', 'mb-4'); // Utiliser les colonnes Bootstrap pour la grille

        // Remplir l'élément avec la structure d'une carte Bootstrap
        produitElement.innerHTML = `
            <div class="card h-100">
                <img src="${produit.image}" class="card-img-top img-fluid" alt="${produit.nom}">
                <div class="card-body">
                    <h5 class="card-title">${produit.nom}</h5>
                    <p class="card-text">${produit.description}</p>
                    <p class="card-text"><strong>Prix :</strong> ${produit.prix}€</p>
                    <p class="card-text"><small class="text-muted">Quantité restante : ${produit.quantite}</small></p>
                </div>
                <div class="card-footer text-center">
                    <button class="btn btn-primary add-to-cart" data-id="${produit.id}">Ajouter au panier</button>
                </div>
            </div>
        `;

        // Ajouter l'élément produit au catalogue
        catalogue.appendChild(produitElement);
    });
}

// Fetch et afficher les produits
fetch('produits.json')
    .then(response => response.json()) // Convertir la réponse en JSON
    .then(data => {
        afficherProduits(data); // Appeler une fonction pour afficher les produits
    })
    .catch(error => console.error('Erreur lors du chargement des produits:', error));