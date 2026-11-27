# PULSE – Frontend

Interface web de **PULSE V1 – Coach & Challenges**, l'application du projet HealthAI (MSPR TPRE501).
PULSE permet à un utilisateur de suivre ses défis, sa progression et les conseils de son coach.

Ce dépôt contient uniquement le frontend. L'API est développée dans un dépôt séparé.

---

## Sommaire

- [Stack technique](#stack-technique)
- [Prérequis](#prérequis)
- [Installation](#installation)
- [Lancement](#lancement)
- [Dépannage](#dépannage)
- [Scripts disponibles](#scripts-disponibles)
- [Structure du projet](#structure-du-projet)
- [Travailler sur le projet](#travailler-sur-le-projet)
- [Équipe](#équipe)

---

## Stack technique

Versions installées dans le projet (enregistrées dans `package-lock.json`).

| Outil | Version | Rôle |
| --- | --- | --- |
| [React](https://react.dev) | 19.3.1 | Bibliothèque d'interface |
| [React DOM](https://react.dev) | 19.3.1 | Rendu de React dans le navigateur |
| [Vite](https://vite.dev) | 8.3.8 | Serveur de développement et build |
| [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react) | 6.3.0 | Support de React dans Vite |
| [Oxlint](https://oxc.rs) | 1.94.0 | Linter |
| [@types/react](https://www.npmjs.com/package/@types/react) | 19.3.0 | Types TypeScript de React |
| [@types/react-dom](https://www.npmjs.com/package/@types/react-dom) | 19.3.0 | Types TypeScript de React DOM |
| [TypeScript](https://www.typescriptlang.org) | non installé | Prévu pour le typage du code |

> **Migration TypeScript à faire** : l'arborescence `src/` est prévue en TypeScript (`.ts` / `.tsx`), mais TypeScript n'est pas encore installé et le point d'entrée (`main.jsx`, `App.jsx`) est encore en JavaScript.

---

## Prérequis

| Outil | Version requise | Vérifier avec |
| --- | --- | --- |
| Node.js | 20.19+ (branche 20) ou 22.12+ (exigé par Vite 8, la branche 21 ne marche pas) | `node -v` |
| npm | Fourni avec Node.js | `npm -v` |
| Git | Une version récente | `git --version` |

- Un accès au dépôt GitHub `mdeguil/PULSE-Frontend`

### Installer les outils manquants

Si `node -v` affiche une version trop ancienne ou une erreur « command not found », installer Node.js 22 (LTS) avec l'une des méthodes ci-dessous. npm est installé en même temps que Node.js.

**macOS**

```bash
# 1. Installer les outils en ligne de commande d'Apple (contient Git, nécessaire pour nvm)
xcode-select --install

# 2. Créer le fichier de config du terminal s'il n'existe pas (zsh est le terminal par défaut)
touch ~/.zshrc

# 3. Installer nvm (gestionnaire de versions de Node.js)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.5/install.sh | bash

# 4. Fermer puis rouvrir le terminal, puis installer et utiliser Node.js 22
nvm install 22
nvm use 22
nvm alias default 22
```

**Linux (Ubuntu / Debian)**

```bash
# Prérequis : Git et curl
sudo apt update && sudo apt install -y git curl

# Node.js avec nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.5/install.sh | bash
# Fermer puis rouvrir le terminal
nvm install 22
nvm use 22
nvm alias default 22
```

**Windows**

```powershell
# Dans PowerShell (winget est fourni avec Windows 10 et 11)
winget install OpenJS.NodeJS.LTS
winget install Git.Git
# Fermer puis rouvrir le terminal
```

Sans winget : télécharger l'installeur **LTS** sur [nodejs.org](https://nodejs.org) et Git sur [git-scm.com](https://git-scm.com).

**Vérifier l'installation**

```bash
node -v   # doit afficher v20.19+ (branche 20) ou v22.12+
npm -v
git --version
```

> Déjà une autre version de Node.js pour un autre projet ? Avec nvm, `nvm use 22` change de version dans le terminal courant sans rien désinstaller.

---

## Installation

```bash
git clone https://github.com/mdeguil/PULSE-Frontend.git
cd PULSE-Frontend
npm ci
```

`npm ci` installe **exactement** les versions enregistrées dans `package-lock.json` (celles du tableau [Stack technique](#stack-technique)). C'est la commande à utiliser pour installer le projet.
Utiliser `npm install` uniquement pour ajouter ou mettre à jour une dépendance.

Ensuite, se placer sur sa branche perso (voir [Travailler sur le projet](#travailler-sur-le-projet)) :

```bash
git checkout dev
git pull origin dev
git checkout -b tonPrenom
```

---

## Lancement

```bash
npm run dev
```

L'application est disponible sur **http://localhost:5173**.
Pour l'ouvrir depuis un autre appareil du réseau (téléphone par exemple) : `npm run dev -- --host`.

Pour arrêter le serveur : `Ctrl + C` dans le terminal.

---

## Dépannage

| Problème | Solution |
| --- | --- |
| `command not found: nvm` après l'installation | Fermer et rouvrir le terminal. Sur macOS, vérifier que `~/.zshrc` existe puis relancer le script d'installation de nvm |
| `command not found: node` ou `npm` | Node.js n'est pas installé : voir [Installer les outils manquants](#installer-les-outils-manquants) |
| `Vite requires Node.js version 20.19+ or 22.12+` | Node.js trop ancien : `nvm install 22 && nvm use 22` |
| `Port 5173 is in use` | Un autre serveur tourne déjà : l'arrêter, ou lire dans le terminal le nouveau port proposé par Vite |
| Erreurs bizarres après un `git pull` | Les dépendances ont changé : relancer `npm ci` |
| `npm ci` échoue avec une erreur de cache | Lancer `npm cache clean --force` puis relancer `npm ci` |
| `Permission denied` lors du `git clone` | Pas d'accès au dépôt : demander à être ajouté sur GitHub |

---

## Scripts disponibles

| Commande | Effet |
| --- | --- |
| `npm run dev` | Lance le serveur de développement avec rechargement automatique |
| `npm run build` | Génère la version de production dans `dist/` |
| `npm run preview` | Sert localement le contenu de `dist/` pour vérifier le build |
| `npm run lint` | Analyse le code avec Oxlint |

---

## Structure du projet

```
PULSE-Frontend/
├── .github/             Configuration GitHub (CODEOWNERS)
├── public/              Fichiers servis tels quels (icônes)
├── src/
│   ├── api/             Appels HTTP vers l'API (client, requêtes par ressource)
│   ├── assets/
│   │   ├── icons/       Icônes
│   │   └── images/      Images
│   ├── components/
│   │   ├── layout/      Structure des pages (header, navbar, footer, layout)
│   │   └── ui/          Composants réutilisables (boutons, champs, cartes…)
│   ├── constants/       Valeurs fixes et configuration de l'application
│   ├── context/         Contextes React partagés (authentification…)
│   ├── hooks/           Hooks personnalisés (useAuth…)
│   ├── pages/           Une page par dossier
│   │   ├── auth/        Connexion, inscription
│   │   ├── challenges/  Liste et détail des défis
│   │   ├── coach/       Échanges avec le coach
│   │   ├── dashboard/   Tableau de bord
│   │   ├── not-found/   Page 404
│   │   └── profile/     Profil utilisateur
│   ├── routes/          Définition des routes de l'application
│   ├── styles/          Styles globaux et variables CSS
│   ├── types/           Types TypeScript partagés
│   ├── utils/           Fonctions utilitaires
│   ├── App.jsx          Composant racine
│   └── main.jsx         Point d'entrée
├── index.html
├── package.json
└── vite.config.js
```

**Règles de rangement**

- Un composant utilisé par une seule page reste dans le dossier de cette page.
- Un composant utilisé par plusieurs pages va dans `components/ui/`.
- Aucun appel HTTP directement dans un composant : on passe toujours par `api/`.
- Les noms de composants et de pages sont en PascalCase (`LoginPage.tsx`), les hooks commencent par `use` (`useAuth.ts`).

---

## Travailler sur le projet

### Branches

| Branche | Rôle |
| --- | --- |
| `main` | Production. On n'y touche jamais directement. |
| `dev` | Intégration du travail de l'équipe. Pas de commit direct. |
| `enzo`, `tom`, … | Une branche perso par membre, créée depuis `dev`. |

Avant de commencer à travailler, toujours récupérer le travail des autres :

```bash
git checkout tonPrenom
git pull origin dev
```

---

## Équipe

|      Membre       |
| ----------------- |
| Enzo Bourgade     |
| Mathéo Deguil     |
| Owen Auriault     |
| Tom Chaudet       |
| Killian Guillemot |
