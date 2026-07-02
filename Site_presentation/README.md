# Peakly — Site de présentation (Projet 3)

Site statique, 23 pages, palette **Noir & Or**. Aucun outil de build : tu ouvres
`index.html` et ça marche. Déploiement en un clic sur GitHub Pages.

## Lancer en local

Double-clique sur `index.html`, ou pour un rendu 100% fidèle (recommandé,
surtout pour les animations et les chemins d'images) :

```bash
cd peakly-site
python3 -m http.server 8000
# puis ouvre http://localhost:8000
```

## Déployer sur GitHub Pages

1. Crée un repo GitHub et pousse tout le contenu de ce dossier à la racine du repo.
2. Dans le repo : **Settings → Pages → Branch: main → dossier `/root`**.
3. Le site est en ligne à `https://<ton-user>.github.io/<ton-repo>/`.

Aucune étape de build, aucune dépendance à installer : tout est en HTML/CSS/JS brut.

## Arborescence

```
peakly-site/
├── index.html                  → page d'accueil (slide 1, avec écran de lancement)
├── 02-probleme.html … 23-remerciements.html  → une page HTML par slide (22 pages)
├── css/
│   ├── variables.css           → COULEURS, POLICES, RAYONS. À ouvrir en 1er pour tout recolorer.
│   ├── base.css                → reset + styles des balises HTML natives
│   ├── layout.css              → header, grille, contrôles de navigation (flèches/points)
│   ├── components.css          → cartes, badges, timeline, tableaux, pricing...
│   └── animations.css          → écran de lancement, transitions de page, curseur, reveal
├── js/
│   ├── cursor.js                → curseur personnalisé qui suit la souris
│   ├── transitions.js           → écran de lancement + fondu entre les pages + apparition des blocs
│   ├── navigation.js            → flèches clavier, swipe tactile
│   └── charts.js                → tous les graphiques Chart.js (chargé seulement sur 2 pages)
├── assets/images/
│   ├── logo-peakly-nav.png      → logo du header (PLACEHOLDER — à remplacer)
│   └── logo-peakly.png          → logo de la page d'accueil (PLACEHOLDER — à remplacer)
└── README.md
```

## ⚠️ À faire avant présentation

Les deux logos dans `assets/images/` sont des **placeholders générés automatiquement**
(texte "PEAKLY" en or). Remplace-les par tes vrais fichiers en gardant exactement
les mêmes noms :
- `assets/images/logo-peakly-nav.png` (logo compact, header)
- `assets/images/logo-peakly.png` (logo large, page d'accueil + page de remerciements)

## Comment éditer le contenu

Chaque page est un fichier HTML autonome et lisible. Le texte est directement dans
le HTML de la page correspondante — pas de CMS, pas de build : tu ouvres le fichier,
tu changes le texte, tu sauvegardes, c'est tout.

## Comment éditer le style (couleurs, tailles, espacements)

Tout se règle dans `css/variables.css`. Exemple : pour changer la teinte d'or
partout sur le site, il suffit de changer **une seule ligne** :

```css
--color-gold: #D4AF37;
```

## Convention de nommage CSS

Les classes sont nommées pour être lisibles et cherchables (Ctrl+F) :

| Classe                  | Ce que ça fait |
|--------------------------|-----------------|
| `.box_gold_round`        | Encadré bordure or 2px, coins arrondis |
| `.box_thin_round`        | Encadré bordure fine, coins arrondis |
| `.box_top_right`         | Positionne un élément en haut à droite de son parent |
| `.glow_on_hover`         | Ajoute un halo or + léger soulèvement au survol |
| `.card_panel`            | Carte générique (contenu texte) |
| `.card_kpi`               | Variante carte pour un gros chiffre centré |
| `.chart_card`             | Carte contenant un graphique Chart.js |
| `.pill_tag` + `.tone_*`   | Badge coloré (`tone_success`, `tone_gold`, `tone_neutral`, `tone_danger`) |
| `.is_highlight`           | Modificateur : met en valeur une carte/un prix (bordure or) |
| `.is_active` / `.is_disabled` | États (lien de nav actif, flèche désactivée en bord de deck) |

Toutes les couleurs et tailles utilisées dans `components.css` et `layout.css`
viennent des variables définies dans `variables.css` — jamais de valeur codée en dur.

## Fonctionnalités "modernes"

- **Écran de lancement** : uniquement sur `index.html`, géré par `js/transitions.js`
  (bloc `#launch_screen` dans le HTML + `.launch_screen` dans `animations.css`).
- **Transitions entre pages** : un voile noir apparaît en fondu avant de charger
  la page suivante (voir `.page_transition_veil` dans `animations.css` et la
  logique dans `transitions.js`). La page qui arrive apparaît elle-même en fondu
  (animation `page_fade_in` sur `<body>`).
- **Curseur personnalisé** : point + anneau qui suivent la souris, géré entièrement
  par `js/cursor.js` (désactivé automatiquement sur tactile).
- **Apparition progressive du contenu** : les cartes/graphiques/tableaux
  apparaissent en cascade à l'arrivée sur une page (`transitions.js` + `.reveal_item`
  dans `animations.css`).

Toutes les animations respectent `prefers-reduced-motion` (accessibilité).

## Navigation

- **Header** : 8 liens vers les grandes sections (Vision, Le produit, Market & data...).
- **Flèches ‹ ›** (bords gauche/droit de l'écran) : page précédente/suivante.
- **Points en bas** : accès direct à n'importe laquelle des 23 pages.
- **Clavier** : flèches ← → ↑ ↓, Espace, Page Up/Down.
- **Tactile** : swipe gauche/droite.

## Ajouter une nouvelle slide

1. Duplique une page HTML existante proche du contenu voulu (ex. `04-solution.html`).
2. Renomme-la (ex. `24-nouvelle-slide.html`), change son `id="..."` sur `<main>`,
   son `<title>`, et son contenu.
3. Ouvre `/home/claude/build_pages.py`... en fait non : comme il n'y a **pas de build**,
   tu dois juste mettre à jour manuellement les liens "précédent/suivant" et les points
   de pagination sur les pages voisines (celle d'avant et celle d'après dans l'ordre).
   C'est la seule contrepartie du choix "fichiers séparés" plutôt qu'un seul fichier
   avec navigation JS automatique.
