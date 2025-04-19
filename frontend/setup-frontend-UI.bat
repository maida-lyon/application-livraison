@echo off
echo === DELIVERAPP UI – INSTALLATION VISUELLE LOCALE ===

REM Installer les dépendances frontend utiles
npm install axios qrcode.react leaflet react-leaflet jspdf react-icons

REM Créer les dossiers
cd src\app
mkdir accueil
mkdir dashboard
mkdir dashboard\donneur
mkdir dashboard\transporteur
mkdir dashboard\admin
mkdir components
cd ..\..

REM Page accueil
> src\app\page.tsx (
echo export default function Home() {
echo return (
echo ^<main className="min-h-screen flex flex-col items-center justify-center bg-white text-black space-y-4 p-6"^>
echo ^<h1 className="text-3xl font-bold"^>Bienvenue sur DeliverApp^</h1^>
echo ^<a href="/dashboard/donneur" className="bg-black text-white px-4 py-2 rounded"^>Espace Donneur d’ordre^</a^>
echo ^<a href="/dashboard/transporteur" className="bg-black text-white px-4 py-2 rounded"^>Espace Transporteur^</a^>
echo ^<a href="/dashboard/admin" className="bg-black text-white px-4 py-2 rounded"^>Espace Admin^</a^>
echo ^</main^>
echo );
echo }
)
REM Dashboards
> src\app\dashboard\donneur\page.tsx echo export default function Donneur() { return ^<div className="p-6"^>Donneur : QR | Facture | Chatbot | Carte | Upload^</div^>; }
> src\app\dashboard\transporteur\page.tsx echo export default function Transporteur() { return ^<div className="p-6"^>Transporteur : Missions + Upload Preuve + Carte^</div^>; }
> src\app\dashboard\admin\page.tsx echo export default function Admin() { return ^<div className="p-6"^>Admin : Validation docs + litiges + IA^</div^>; }

REM QR Code
> src\app\components\QrCode.tsx (
echo "use client";
echo import { QRCodeCanvas } from "qrcode.react";
echo export default function QrCode({ value }: { value: string }) {
echo return ^<QRCodeCanvas value={value} size={128} /^>;
echo }
)

REM Map
> src\app\components\Map.tsx (
echo "use client";
echo import { MapContainer, TileLayer, Marker } from "react-leaflet";
echo import "leaflet/dist/leaflet.css";
echo export default function MapView() {
echo return (
echo ^<MapContainer center={[45.75, 4.85]} zoom={13} className="h-60 w-full"^>
echo ^<TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" /^>
echo ^<Marker position={[45.75, 4.85]} /^>
echo ^</MapContainer^>
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
echo pdf.text("Facture DeliverApp", 10, 10);
echo pdf.save("facture.pdf");
echo };
echo return ^<button onClick={handleDownload} className="bg-black text-white px-4 py-2 rounded"^>Télécharger Facture PDF^</button^>;
echo }
)

REM Chatbot
> src\app\components\Chatbot.tsx (
echo "use client";
echo import { useState } from "react";
echo export default function Chatbot() {
echo const [q, setQ] = useState(""); const [r, setR] = useState("");
echo const ask = async (e) => { e.preventDefault(); setR("Réponse simulée DeliverApp"); };
echo return (
echo ^<form onSubmit={ask} className="bg-gray-100 p-4 rounded space-y-2"^>
echo ^<input value={q} onChange={e => setQ(e.target.value)} className="w-full p-2" placeholder="Posez une question..." /^>
echo ^<button type="submit" className="bg-black text-white px-4 py-1 rounded"^>Envoyer^</button^>
echo ^<div className="mt-2 text-black"^>{r}^</div^>
echo ^</form^>);
echo }
)

REM Upload photo
> src\app\components\UploadPhoto.tsx (
echo "use client";
echo import { useState } from "react";
echo export default function UploadPhoto() {
echo const [file, setFile] = useState(null);
echo const handleChange = (e) => setFile(e.target.files[0]);
echo return (
echo ^<div^>
echo ^<input type="file" onChange={handleChange} /^>
echo {file && ^<p^>Fichier : {file.name}^</p^>}
echo ^</div^>);
echo }
)

REM Lancer l'app
echo === LANCEMENT INTERFACE DELIVERAPP ===
npm run dev
