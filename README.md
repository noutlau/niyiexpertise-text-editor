# Éditeur de texte collaboratif - Test Technique NiyiExpertise

## Objectif
Réaliser une interface d'éditeur de texte collaboratif simulant des interactions multi-utilisateurs pour évaluer les compétences en React, gestion d'états complexes et optimisation des performances UI.

## Fonctionnalités
- Nom du document éditable en ligne
- Gestion du statut de connexion (Connecté, Synchronisation, Déconnecté)
- Undo / Redo
- Simulation de 3 utilisateurs simultanés avec curseurs et compteurs d'opérations
- Latence réseau simulée (100ms à 1500ms) et perte de paquets de 1%
- Éditeur monospaced avec numérotation de lignes et curseurs multiples
- Panneaux latéraux avec liste d’utilisateurs et journal d’activité / chat
- Footer affichant statistiques système
- Dark Mode et responsive design

## Tech Stack
- React (v24)
- Tailwind CSS
- State management optimisé pour éviter les re-renders globaux

## Instructions
1. Cloner le dépôt
2. `npm install` pour installer les dépendances
3. `npm start` pour lancer l'application
