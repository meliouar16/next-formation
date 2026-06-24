# Prismic / Slice Machine - Notes TP

## Vue d'ensemble

Prismic est un CMS headless.

Le principe :

```txt
Slice Machine
= on definit la structure des donnees

Prismic
= l'admin remplit le vrai contenu

Next.js
= le site recupere les donnees et les affiche
```

On ne teste pas le rendu final dans Slice Machine. Le rendu final se teste sur le site Next.js :

```txt
http://localhost:3000
```

Slice Machine sert a configurer les types de contenus et les slices :

```txt
http://localhost:9999
```

## Difference entre Slice Machine et Prismic

### Slice Machine

Slice Machine sert a definir la typologie des donnees.

Exemple :

```txt
Une homepage contient :
- un titre
- une intro
- une image
- un bouton
- une zone de slices
```

Slice Machine repond a la question :

```txt
Quelles donnees un redacteur pourra remplir ?
```

### Prismic

Prismic sert a remplir les vraies donnees.

Exemple :

```txt
title = Bienvenue sur mon site
intro = Nous creons des sites web...
image = homepage.jpg
button_label = Voir nos projets
button_link = /websites
```

Prismic repond a la question :

```txt
Quel contenu reel je mets dans ces champs ?
```

## Fichiers generes dans le projet

Quand on cree un type ou une slice dans Slice Machine, des fichiers sont generes dans le projet.

Exemple pour un type `contact` :

```txt
customtypes/contact/index.json
```

Ce fichier decrit les champs disponibles pour le contenu `contact`.

Exemple simplifie :

```json
{
  "id": "contact",
  "label": "Contact",
  "repeatable": false,
  "json": {
    "Main": {
      "title": {
        "type": "Text",
        "config": {
          "label": "Titre"
        }
      },
      "email": {
        "type": "Text",
        "config": {
          "label": "Email"
        }
      }
    }
  }
}
```

Important : normalement, on ne modifie pas ces fichiers a la main. On utilise Slice Machine, qui les met a jour.

## Page types, Custom types et Single/Repeatable

Dans l'interface actuelle, Prismic peut parler de :

- Page types
- Custom types
- Slices

Le vocabulaire peut changer selon les versions, mais l'idee reste la meme.

### Single type

Un Single type sert pour un contenu unique.

Exemples :

```txt
homepage
contact
header_menu
footer_menu
```

On utilise un Single type quand il n'y a qu'un seul document de ce type.

Exemple :

```txt
La page contact est unique
=> on peut creer un Single type contact
```

Dans le code Next.js, on recupere souvent un Single type avec :

```ts
const contact = await client.getSingle("contact");
```

### Repeatable / Reusable type

Un Repeatable type sert quand on peut creer plusieurs documents avec la meme structure.

Exemples :

```txt
page
website
article
project
```

Exemple :

```txt
On a plusieurs pages standards
=> on peut creer un type repeatable page

On a plusieurs projets/sites web
=> on peut creer un type repeatable website
```

Dans le code Next.js, on recupere souvent un document repeatable par son UID :

```ts
const page = await client.getByUID("page", uid);
```

## Custom types

Les Custom types definissent des contenus administrables.

Ils peuvent servir pour :

- des pages uniques comme `contact`
- des pages reutilisables comme `page`
- des donnees globales comme `header_menu` ou `footer_menu`

Le prof a donne l'exemple d'un dossier :

```txt
customtypes/contact/index.json
```

Ce fichier dit ce que le type `contact` contient.

Exemple :

```txt
contact contient :
- title
- description
- email
- phone
- address
```

Le lien avec le site :

```txt
app/contact/page.tsx
=> page visible sur le site

customtypes/contact/index.json
=> structure Prismic de la page contact

Prismic
=> contenu reel rempli par l'admin
```

## Slices

Une slice est un bloc reutilisable dans une page.

Exemples :

```txt
hero
text_block
image_slice
cta
website_grid
video_block
```

Une slice sert a dire :

```txt
Ce bloc existe, il contient tels champs, et le redacteur peut l'ajouter dans une page.
```

Exemple avec une slice `imageSlice` :

```txt
slices/imageSlice/index.json
```

Ce fichier decrit ce que la slice contient.

Exemple :

```txt
imageSlice contient :
- image
- caption
- alt text
```

Une slice a aussi un composant React cote Next.js, qui definit comment le bloc s'affiche.

Donc :

```txt
index.json
= structure des donnees de la slice

composant React
= rendu visuel de la slice sur le site
```

L'admin peut ensuite ajouter une ou plusieurs slices dans une page, selon ce que le type de page autorise.

Exemple :

```txt
Une page peut contenir :
- Hero
- TextBlock
- ImageSlice
- CTA
```

L'admin peut changer l'ordre, ajouter des blocs, en enlever, et remplir les champs.

## Difference entre Custom type et Slice

### Custom type / Page type

Un type represente un document complet.

Exemples :

```txt
homepage
contact
page
website
header_menu
footer_menu
```

Il repond a la question :

```txt
Quel document l'admin peut creer ou modifier ?
```

### Slice

Une slice represente un bloc a l'interieur d'un document.

Exemples :

```txt
hero
image_slice
text_block
cta
website_grid
```

Elle repond a la question :

```txt
Quels blocs l'admin peut ajouter dans une page ?
```

## Exemple avec la page contact

Si on a :

```txt
app/contact/page.tsx
```

On peut faire un Single type :

```txt
contact
```

Parce que la page contact est unique.

Champs possibles :

```txt
title
intro
email
phone
address
form_title
```

Dans Slice Machine, cela generera un fichier du type :

```txt
customtypes/contact/index.json
```

Dans Prismic, l'admin remplira :

```txt
title = Contactez-nous
email = contact@example.com
phone = ...
```

Dans Next.js, la page affichera ces donnees.

## Exemple avec la homepage

La homepage est unique, donc on cree un Single type :

```txt
homepage
```

Dans l'onglet `Main`, la zone `Static zone` peut contenir :

| Champ | Type | API ID |
| --- | --- | --- |
| Titre principal | Key Text / Text | `title` |
| Texte d'intro | Rich Text | `intro` |
| Image principale | Image | `image` |
| Bouton principal - texte | Key Text / Text | `button_label` |
| Bouton principal - lien | Link | `button_link` |

Dans `SEO & Metadata`, on peut ajouter :

| Champ | Type | API ID |
| --- | --- | --- |
| Meta title | Key Text / Text | `meta_title` |
| Meta description | Text | `meta_description` |
| Meta image | Image | `meta_image` |

La zone `Slices` servira ensuite a autoriser des blocs reutilisables.

Exemples :

```txt
hero
text_block
image_slice
website_grid
cta
```

## Application au TP

L'exercice demande :

1. Creer une branche `exercice/prismic`
2. Lister les Reusable types, Single types et slices necessaires
3. Creer les menus et les differentes pages du site
4. Verifier que le site fonctionne
5. Ajouter une barre de recherche par tags

### Types proposes pour ce site

Single types :

```txt
homepage
contact
header_menu
footer_menu
```

Repeatable / reusable types :

```txt
page
website
```

Slices possibles :

```txt
hero
text_block
image_slice
cta
website_grid
video_block
```

### Menus

Les menus sont des contenus globaux, pas des pages.

On peut donc les mettre dans des Single types :

```txt
header_menu
footer_menu
```

Chaque menu peut contenir un champ de groupe/repeatable avec :

```txt
label
link
```

Cela permet a l'admin d'ajouter ou modifier les liens du menu sans toucher au code.

### Recherche par tags

Prismic possede des tags natifs.

L'idee du TP :

```txt
L'admin ajoute des tags aux documents Prismic.
Le site recupere la liste des tags.
L'utilisateur choisit un tag dans une barre de recherche.
Le site affiche les pages/documents correspondant au tag.
```

## Commandes utiles

Lancer le site Next.js :

```bash
npm run dev
```

Site local :

```txt
http://localhost:3000
```

Lancer Slice Machine :

```bash
npm run slicemachine
```

Interface Slice Machine :

```txt
http://localhost:9999
```

Initialiser Slice Machine si besoin :

```bash
npx @slicemachine/init
```

## Regle importante

On evite de modifier directement les fichiers JSON generes par Slice Machine.

On modifie les modeles depuis l'interface Slice Machine, puis on publie avec :

```txt
Review changes
```

