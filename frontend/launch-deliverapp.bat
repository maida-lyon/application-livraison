@echo off
title 🚀 LANCEMENT DELIVERAPP - LOCAL
echo ============================================
echo     DELIVERAPP - DEMARRAGE LOCAL
echo ============================================

REM Lancer le backend dans un terminal
start cmd /k "cd backend && npm install && npm run dev"

REM Lancer le frontend dans un autre terminal
start cmd /k "cd frontend && npm install && npm run dev"

echo.
echo ✅ Backend lancé sur http://localhost:5000
echo ✅ Frontend lancé sur http://localhost:3000 (ou 3001/3002 si occupé)
echo.
pause
