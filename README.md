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

<p>
  <img src="docs/screenshots/01-login.png" width="240" alt="Login" />
  <img src="docs/screenshots/02-payment.png" width="240" alt="Payment" />
  <img src="docs/screenshots/03-invoice.png" width="240" alt="Invoice" />
  <img src="docs/screenshots/04-dashboard.png" width="240" alt="Mail & Dashboard" />
</p>

<details>
  <summary>More screenshots (WIP / extra screens)</summary>

  <p>
    <img src="docs/screenshots/05-agenda.png" width="240" alt="Agenda" />
    <img src="docs/screenshots/06-standardMenu.png" width="240" alt="Standard Menu" />
    <img src="docs/screenshots/07-premiumMenu.png" width="240" alt="Premium Menu" />
  </p>

  <p>
    <img src="docs/screenshots/08-listesfactures.png" width="240" alt="Listes des factures" />
    <img src="docs/screenshots/09-gestionfactures.png" width="240" alt="Gestion des factures" />
    <img src="docs/screenshots/10-relanceManuelle.png" width="240" alt="Relance manuelle" />
  </p>

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
