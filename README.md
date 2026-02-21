# AmmaneProject Mobile (React Native / Expo)

Application mobile (React Native) avec navigation, écrans métier (dashboard, clients, relances, credit/risque) et intégration Stripe (paiement).

## Features
- Auth (Sign In)
- Navigation (drawer + screens)
- Gestion Clients / Contrats / Immatriculations (écrans)
- Relances / Contentieux / Litiges (écrans)
- Credit & Risque (DSO, encours, scoring)
- Paiement via Stripe (test)

## Tech Stack
- React Native + Expo
- React Navigation
- Redux Toolkit (store + slices)
- Stripe React Native
- Expo Secure Store

## Screenshots


![Login](docs/screenshots/01-login.png)
![Payment](docs/screenshots/02-payment.png)
![Invoice](docs/screenshots/03-invoice.png)
![Mail & Dashboard](docs/screenshots/04-dashboard.png)

<details>
  <summary>More screenshots (WIP / extra screens)</summary>

  ![Agenda](docs/screenshots/05-agenda.png)
  ![Standard Menu](docs/screenshots/06-standardMenu.png)
  ![Premium Menu](docs/screenshots/07-premiumMenu.png)
  ![Listes des factures](docs/screenshots/08-listesfactures.png)
  ![Gestion des factures](docs/screenshots/09-gestionfactures.png)
  ![Relance Manuelle si nécessaire](docs/screenshots/10-relanceManuelle.png)

</details>

## Getting Started

### Prerequisites
- Node.js (LTS)
- Expo CLI
- Un téléphone avec Expo Go (ou un émulateur)

### Install
```bash
npm install
```

### Run
```bash
npx expo start
```

## Configuration
### Stripe
Ce repo ne contient pas de clé Stripe.

Copier le fichier exemple :

```bash
cp src/config/stripe.example.js src/config/stripe.js
```

Modifier src/config/stripe.js et mettre votre pk_test_...

## Project Structure (simplifié)

App.js : entry

Navigation.js : navigation principale

screens/ : écrans UI

featuresSlices/ : Redux slices

store.js : Redux store

src/config/ : configs locales (stripe.js ignoré)

## Notes

Projet de démonstration : les clés/URLs sensibles ne sont pas commit.
