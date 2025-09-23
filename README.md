# Backend - TODO App

Backend de l'application TODO, développé avec **NestJS** et **Prisma** (SQLite).

## 📦 Installation

Cloner le repo puis installer les dépendances :

- `pnpm install`

Créer un fichier `.env` à la racine du projet avec les variables d'environnement suivantes :

- `JWT_SECRET=secret`
- `JWT_EXPIRES_IN=3600s`

## 🚀 Lancement

Clean la base de données :

- `pnpm prisma migrate reset`

Lancer le serveur de développement :

- `pnpm run start:dev`

---

# Frontend - TODO App

Frontend de l'application TODO, développé avec **VueJS**.

## 🚀 Prérequis

- Node.js **v22.17.1**
- pnpm installé globalement (`npm install -g pnpm`)

## 📦 Installation

Cloner le repo puis installer les dépendances :

- `pnpm install`

Créer un fichier `.env` à la racine du projet avec les variables d'environnement suivantes :

- `VUE_APP_API_URL=http://localhost:3000`

## 🚀 Lancement

Lancer le serveur de développement :

- `pnpm run serve`
