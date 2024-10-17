let panier = [];

function ajouterAuPanier(produitId) {
    const produit = produits.find(p => p.id == produitId);
    if (!produit) return; // Vérification que le produit existe

    const produitExistant = panier.find(item => item.id == produitId);

    if (produitExistant) {
        produitExistant.quantite++;
    } else {
        panier.push({ ...produit, quantite: 1 });
    }

    mettreAJourCompteurPanier();
    afficherPanier();
    sauvegarderPanier();
}
function sauvegarderPanier() {
    localStorage.setItem('panier', JSON.stringify(panier));
}

function chargerPanier() {
    const panierSauvegarde = localStorage.getItem('panier');
    if (panierSauvegarde) {
        panier = JSON.parse(panierSauvegarde);
        mettreAJourCompteurPanier();
        afficherPanier();
    }
}

function mettreAJourCompteurPanier() {
    const compteur = document.getElementById('cart-count');
    const nombreTotal = panier.reduce((sum, item) => sum + item.quantite, 0);
    compteur.textContent = nombreTotal;
}

function afficherPanier() {
    const panierElement = document.getElementById('cart-items');
    panierElement.innerHTML = '';

    panier.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.innerHTML = `
            <div class="panier-item">
                <p>${item.nom} - ${item.prix}€ x ${item.quantite}</p>
                <button onclick="supprimerDuPanier(${item.id})" class="btn btn-danger btn-sm">Supprimer</button>
            </div>
        `;
        panierElement.appendChild(itemElement);
    });

    const total = panier.reduce((sum, item) => sum + item.prix * item.quantite, 0);
    document.getElementById('total-price').textContent = total.toFixed(2);
}

function supprimerDuPanier(produitId) {
    panier = panier.filter(item => item.id != produitId);
    mettreAJourCompteurPanier();
    afficherPanier();
    sauvegarderPanier();
}

// Écouteur d'événements pour les boutons "Ajouter au panier"
document.addEventListener('click', function(event) {
    const boutonPanier = event.target.closest('.add-to-cart');
    if (boutonPanier) {
        const produitId = boutonPanier.getAttribute('data-id');
        ajouterAuPanier(produitId);
    }
});

