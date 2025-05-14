@echo off
echo === DELIVERAPP – SETUP FINAL DE PRODUCTION (LOCALE) ===

REM Lancer backend
start cmd /k "cd backend && npm install && npm run dev"

REM Lancer frontend
start cmd /k "cd frontend && npm install && npm run dev"

REM Corriger le QR Code dans donneur
echo Correction du QRCode en cours...
powershell -Command "(Get-Content -Raw frontend\src\app\dashboard\donneur\page.tsx).replace('import QRCode from \\\"qrcode.react\\\";', 'import { QRCodeCanvas } from \\\"qrcode.react\\\";') -replace '<QRCode ', '<QRCodeCanvas ' | Set-Content -Encoding UTF8 frontend\src\app\dashboard\donneur\page.tsx"

echo ✅ Setup terminé – Testez sur http://localhost:3000/login ou :3002
pause
