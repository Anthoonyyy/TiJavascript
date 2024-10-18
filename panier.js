let panier = [];

function ajouterAuPanier(produitId) {
    const produit = produits.find(p => p.id == produitId); // Recherche le produit correspondant à l'ID fourni dans la liste des produits
    if (!produit) return; // Vérification que le produit existe

    const produitExistant = panier.find(item => item.id == produitId); // Recherche si le produit est déjà dans le panier

    if (produitExistant) {
        produitExistant.quantite++;
    } else {
        panier.push({ ...produit, quantite: 1 }); // sinon, on l'ajoute au panier
    }

    mettreAJourCompteurPanier(); // Met à jour le nombre de produit dans le panier
    afficherPanier(); // Actualise l'affichage du panier
    sauvegarderPanier(); // Sauvegarde le panier dans le localStorage
}
function sauvegarderPanier() {
    localStorage.setItem('panier', JSON.stringify(panier));
}

function chargerPanier() {
    const panierSauvegarde = localStorage.getItem('panier'); // Récupère le panier sauvegardé dans localStorage
    if (panierSauvegarde) {
        panier = JSON.parse(panierSauvegarde);  // Si il existe, on le parse en objet javascript
        mettreAJourCompteurPanier();
        afficherPanier();
    }
}

function mettreAJourCompteurPanier() {
    const compteur = document.getElementById('cart-count');
    const nombreTotal = panier.reduce((sum, item) => sum + item.quantite, 0); // calcul le nombre total dans le panier
    compteur.textContent = nombreTotal; // met à jour le texte du compteur
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
        panierElement.appendChild(itemElement); // Ajoute l'élément au conteneur d'affichage du panier
    });

    const total = panier.reduce((sum, item) => sum + item.prix * item.quantite, 0);
    document.getElementById('total-price').textContent = total.toFixed(2); // Affiche le total avec deux décimales
}

function supprimerDuPanier(produitId) {
    const produitExistant = panier.find(item => item.id == produitId); // Recherche si le produit est déjà dans le panier

    if (produitExistant) {
        if (produitExistant.quantite > 1) {
            produitExistant.quantite--; // Décrémente la quantité si elle est supérieure à 1
        } else {
            panier = panier.filter(item => item.id != produitId); // Sinon, on supprime l'article du panier
        }
    }
    mettreAJourCompteurPanier();
    afficherPanier();
    sauvegarderPanier();
}

// Écouteur d'événements pour les boutons "Ajouter au panier"
document.addEventListener('click', function(event) {
    const boutonPanier = event.target.closest('.add-to-cart');  // Vérifie si l'élément cliqué est le bouton "Ajouter au panier"
    if (boutonPanier) {
        const produitId = boutonPanier.getAttribute('data-id');
        ajouterAuPanier(produitId);
    }
});

