# Taat — Smart Mess Attendance & Fee Management Prototype

A responsive React + Vite front-end prototype with English and Marathi interface options.

## Run locally (Windows / PowerShell)

1. Install the current Node.js LTS version from https://nodejs.org/.
2. Extract the ZIP file.
3. In VS Code, open the extracted **taat-prototype** folder (the folder containing `package.json`).
4. Open **Terminal → New Terminal**. Confirm the terminal is inside that folder:
   ```powershell
   dir
   ```
   You should see `package.json`, `index.html`, and the `src` folder.
5. Install dependencies and start the app:
   ```powershell
   npm install
   npm run dev
   ```
6. Open the local URL printed by Vite (usually http://localhost:5173).

## Demo flow

- Sign in with any name as Student or Mess Owner (no password in this prototype).
- Student: Dashboard → Plan & Skip → submit a skip request → receipt is generated.
- Owner: switch role using the profile area or sign out and sign in as Owner → Skip Receipts → verify a request.
- Student: Seat Scan → select a free seat → confirm check-in.
- Fees & Reports: view sample monthly payment summary; use Download report to print/save as PDF.
- Use the language control in the top bar to switch English / Marathi.

## Prototype limitations

- Skip receipts persist in the browser's LocalStorage on that device/browser.
- Seat occupancy is simulated in the current browser session.
- QR scanning, authentication, live payments, notifications, and multi-device synchronization are not connected to real services.
- November 2026 figures and sample student records are demonstration data, not real transactions.
- No backend or real payment gateway is connected.
