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

<p style="margin-bottom:16px;">
  <img src="docs/screenshots/01-login.png" width="540" alt="Login" style="margin:8px 0 8px 0;" />
  <img src="docs/screenshots/02-payment.png" width="540" alt="Payment" style="margin:8px 0 8px 0;"  />
  <img src="docs/screenshots/03-invoice.png" width="540" alt="Invoice" style="margin:8px 0 8px 0;" />
  <img src="docs/screenshots/04-dashboard.png" width="540" alt="Mail & Dashboard" style="margin:8px 0 8px 0;" />
</p>

<details>
  <summary>More screenshots (WIP / extra screens)</summary>

  <p style="margin-bottom:16px;">
    <img src="docs/screenshots/05-agenda.png" width="540" alt="Agenda" />
    <img src="docs/screenshots/06-standardMenu.png" width="540" alt="Standard Menu" />
    <img src="docs/screenshots/07-premiumMenu.png" width="540" alt="Premium Menu" />
  </p>

  <p style="margin-bottom:16px;">
    <img src="docs/screenshots/08-listesfactures.png" width="540" alt="Listes des factures" />
    <img src="docs/screenshots/09-gestionfactures.png" width="540" alt="Gestion des factures" />
    <img src="docs/screenshots/10-relanceManuelle.png" width="540" alt="Relance manuelle" />
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
