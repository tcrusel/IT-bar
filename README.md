# IT Bar
> La communauté qui ramène la tech dans la vraie vie.

Imaginez un endroit où les passionnés d’informatique – qu'ils soient experts chevronnés ou simples amateurs – peuvent facilement se rencontrer pour échanger autour d’un verre, dans un cadre convivial.

**L'IT Bar** est cette communauté. Notre objectif est de faciliter les rencontres réelles, le networking et l'apprentissage mutuel, loin des écrans.

## Le Concept

Le site web **IT Bar** sert d'annuaire pour connecter deux types de profils :

* **Les Experts (Partageurs) :** Des professionnels ou passionnés expérimentés qui souhaitent partager leurs connaissances, leur expérience et rencontrer d'autres curieux.
* **La Communauté (Apprenants) :** Toute personne souhaitant élargir ses connaissances, poser des questions, trouver un mentor ou simplement discuter de tech dans un cadre informel.

---

## Comment ça marche ?

### Pour la communauté (Ceux qui cherchent à apprendre)

C'est très simple :
1.  Consultez le site web de l'IT Bar (https://tcrusel.github.io/IT-bar/#concept).
2.  Parcourez les profils des experts disponibles dans votre ville.
3.  Contactez-les (via les informations fournies) pour proposer une rencontre dans un bar ou un café !

### Pour les Experts (Ceux qui veulent partager)

Si vous souhaitez apparaître sur le site, partager votre savoir et développer votre réseau, le processus est simple, transparent et 100% basé sur GitHub :

1.  **Modifiez le fichier `register.json`** à la racine pour y ajouter votre profil (voir instructions ci-dessous).
2.  **Soumettez une Pull Request (PR)**.

C'est tout ! Une fois votre PR vérifiée et validée (mergée) par un administrateur, un processus d'automatisation (GitHub Actions) se chargera de :
* Vérifier les données.
* Générer les pages statiques du site.
* Déployer automatiquement la nouvelle version sur GitHub Pages.

---

## 🖊️ Ajouter votre profil au `registers.json`

Pour apparaître dans la page dédiée aux intervenants, ouvrez le fichier `registers.js` et ajoutez un nouvel objet à la liste, en respectant scrupuleusement la structure suivante.

**Exemple de profil à ajouter :**

```json
{
  // --- Infos Obligatoires ---

  // Date de votre ajout
  since: "2025-11-16",
  
  // Votre nom complet
  name: "Alex Dupont",
  
  // Une courte biographie : qui vous êtes, ce que vous faites, 
  // ce que vous aimez partager (ex: "Dev Fullstack, passionné de Rust et de bières artisanales")
  bio: "Développeur Senior chez 'Ma Boîte', spécialisé en DevOps et Cloud. J'adore discuter de CI/CD et d'architecture microservices.",
  
  // Un lien direct (hotlink) vers une photo de profil (ex: votre GitHub, LinkedIn, Twitter...)
  picture: "[https://github.com/votrepseudo.png](https://github.com/votrepseudo.png)",
  
  // Une liste des villes où vous êtes disponible pour une rencontre
  cities: ["Paris", "Lyon", "Lille"],
  
  // --- Contacts (au moins un obligatoire) ---
  contacts: {
    // Votre email (optionnel)
    mail: "alex.dupont@email.com",
    
    // Votre profil Twitter (optionnel)
    twitter: "[https://twitter.com/alexpseudo](https://twitter.com/alexpseudo)",
    
    // Votre profil LinkedIn (optionnel)
    linkedin: "[https://linkedin.com/in/alexdupont](https://linkedin.com/in/alexdupont)",
    
    // Votre profil GitHub (optionnel)
    github: "[https://github.com/alexpseudo](https://github.com/alexpseudo)"
  }
}
```