@echo off
echo === DELIVERAPP V2 – COMPLETION FRONTEND EXISTANT ===

REM Installer seulement les dépendances nécessaires
echo [1/6] Installation des composants...
npm install axios qrcode.react leaflet react-leaflet jspdf react-icons

REM Créer les dossiers manquants
echo [2/6] Création des dossiers manquants...
mkdir src\app\components 2>nul
mkdir src\app\dashboard\donneur 2>nul
mkdir src\app\dashboard\transporteur 2>nul
mkdir src\app\dashboard\admin 2>nul

REM [3/6] Générer composants frontend

REM QR Code
> src\app\components\QrCode.tsx (
echo "use client";
echo import { QRCodeCanvas } from "qrcode.react";
echo export default function QrCode({ value }: { value: string }) {
echo return ^<QRCodeCanvas value={value} size={128} bgColor="#fff" fgColor="#000" includeMargin /^>;
echo }
)

REM Map (OpenStreetMap)
> src\app\components\Map.tsx (
echo "use client";
echo import { MapContainer, TileLayer, Marker } from "react-leaflet";
echo import "leaflet/dist/leaflet.css";
echo export default function MapView() {
echo return (
echo ^<div className="h-60 w-full"^>
echo ^<MapContainer center={[48.8566, 2.3522]} zoom={13} className="h-full w-full"^>
echo ^<TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" /^>
echo ^<Marker position={[48.8566, 2.3522]} /^>
echo ^</MapContainer^>
echo ^</div^>
echo );
echo }
)

REM Upload preuve photo
> src\app\components\UploadPhoto.tsx (
echo "use client";
echo import { useState } from "react";
echo export default function UploadPhoto() {
echo const [file, setFile] = useState(null);
echo const handleChange = (e) => setFile(e.target.files[0]);
echo return (
echo ^<div^>
echo ^<input type="file" onChange={handleChange} /^>
echo {file && ^<p^>Fichier: {file.name}^</p^>}
echo ^</div^>
echo );
echo }
)

REM Chatbot
> src\app\components\Chatbot.tsx (
echo "use client";
echo import { useState } from "react";
echo export default function Chatbot() {
echo const [q, setQ] = useState(""); const [r, setR] = useState("");
echo const ask = async (e) => {
echo e.preventDefault();
echo const res = await fetch("/api/chatbot", { method: "POST", body: q });
echo const data = await res.text(); setR(data);
echo };
echo return (
echo ^<div className="bg-gray-100 p-4 rounded"^>
echo ^<form onSubmit={ask} className="space-y-2"^>
echo ^<input value={q} onChange={e => setQ(e.target.value)} className="w-full p-2 rounded" /^>
echo ^<button type="submit" className="bg-black text-white px-4 py-1 rounded"^>Envoyer^</button^>
echo ^</form^>
echo ^<div className="mt-2 p-2 bg-white rounded"^>{r}^</div^>
echo ^</div^>
echo );
echo }
)

REM Facture PDF
> src\app\components\Facture.tsx (
echo "use client";
echo import jsPDF from "jspdf";
echo export default function FacturePDF() {
echo const handleDownload = () => {
echo const pdf = new jsPDF();
echo pdf.text("Facture Livreur", 10, 10);
echo pdf.save("facture.pdf");
echo };
echo return ^<button onClick={handleDownload} className="bg-black text-white px-4 py-2 rounded"^>Télécharger PDF^</button^>;
echo }
)

REM [4/6] Ajout Dashboards (si vide)
> src\app\dashboard\donneur\page.tsx echo export default function Donneur() { return ^<div className="p-6"^>Dashboard Donneur</div^>; }
> src\app\dashboard\transporteur\page.tsx echo export default function Transporteur() { return ^<div className="p-6"^>Dashboard Transporteur</div^>; }
> src\app\dashboard\admin\page.tsx echo export default function Admin() { return ^<div className="p-6"^>Dashboard Admin</div^>; }

REM [5/6] Confirmer API backend
echo NEXT_PUBLIC_API_BASE_URL=http://localhost:5000 > .env.local

REM [6/6] Lancer frontend
echo === LANCEMENT LOCAL DE L'APP DELIVERAPP ===
npm run dev
