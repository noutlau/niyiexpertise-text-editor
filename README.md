## Éditeur Collaboratif Temps Réel – Test Technique NIYIEXPERTISE
 
  ## Présentation

Ce projet est une implémentation d’un éditeur de texte collaboratif simulé en temps réel, réalisé dans le cadre du test technique Frontend 2026 de NIYIEXPERTISE.

L’objectif était de concevoir une interface React capable de gérer :

* Des flux asynchrones simulés

* Des états complexes

* Une latence réseau aléatoire

* Une gestion d’historique Undo/Redo

* Une optimisation des performances UI

  ## Architecture

L’application est construite avec React (Hooks) et suit une architecture modulaire :

App : gestion centralisée des états globaux

Header : nom du document, statut de connexion, Undo/Redo

SidebarLeft : utilisateurs actifs et statuts

Editor : zone d’édition avec curseurs multiples

SidebarRight : onglets Logs / Chat

Footer : console système (statistiques et latence)

Les composants sont optimisés avec :

React.memo

useCallback

useMemo

afin d’éviter les re-renders globaux lors de la saisie.

  ## Fonctionnalités Implémentées

  ## Édition collaborative simulée

3 utilisateurs simulés

Curseurs multiples colorés

Statuts d’écriture dynamiques

Compteurs d’opérations

## Simulation réseau

Latence aléatoire entre 100ms et 1500ms

Perte de paquet simulée (1%)

Indicateur de synchronisation (Connecté / Synchronisation / Erreur)

## Gestion d’historique

Undo / Redo basé sur deux piles (history / future)

## Journal d’activité

Logs chronologiques des opérations

Module de chat simulé

## UI & Design

Tailwind CSS

Mode sombre (Dark Mode)

Responsive design

Police monospace pour l’éditeur

Numérotation des lignes

## Installation

git clone https://github.com/noutlau/niyiexpertise-text-editor.git

cd niyiexpertise-text-editor

npm install

npm run dev

## Choix Techniques

Centralisation des états critiques dans le composant principal pour simplifier la synchronisation.

Découpage en composants mémorisés pour limiter les re-renders.

Simulation réseau via setTimeout avec latence variable.

Gestion des curseurs multiples via positionnement DOM contrôlé.

## Objectifs du projet

Ce projet démontre :

Maîtrise des hooks React

Gestion d’états complexes

Simulation de comportements temps réel

Optimisation des performances UI

Structuration claire d’une architecture frontend

## Auteur

Laurinda NOUTAI
Frontend Developer – fev 2026