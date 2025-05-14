@echo off
echo === INSTALLATION DELIVERAPP FRONTEND EN COURS ===

REM Creation projet Next.js
npx create-next-app@latest . --use-npm --typescript --tailwind --eslint --src-dir --app --import-alias "@/*" --no-interactive

REM Installation des dependances
npm install axios qrcode.react leaflet react-leaflet jspdf react-icons

REM Configuration API backend
echo NEXT_PUBLIC_API_BASE_URL=http://localhost:5000 > .env.local

REM Creation des dossiers
cd src\app
mkdir login
mkdir register
mkdir dashboard
mkdir dashboard\donneur
mkdir dashboard\transporteur
mkdir dashboard\admin
cd ..\..

REM Creation des pages

REM Page d'accueil
echo export default function Home() { return ( ^<main className="min-h-screen flex flex-col justify-center items-center bg-white text-black space-y-4"^> ^<h1 className="text-3xl font-bold"^>Bienvenue sur DeliverApp^</h1^> ^<a href="/register" className="bg-black text-white px-4 py-2 rounded"^>Creer un compte^</a^> ^<a href="/login" className="bg-black text-white px-4 py-2 rounded"^>Connexion^</a^> ^</main^> ); } > src\app\page.tsx

REM Dashboards
echo export default function Page() { return ^<div className="p-6"^>Dashboard Donneur^</div^>; } > src\app\dashboard\donneur\page.tsx
echo export default function Page() { return ^<div className="p-6"^>Dashboard Transporteur^</div^>; } > src\app\dashboard\transporteur\page.tsx
echo export default function Page() { return ^<div className="p-6"^>Dashboard Admin^</div^>; } > src\app\dashboard\admin\page.tsx

echo FIN DE L'INSTALLATION
echo Lancement du serveur frontend...
npm run dev
