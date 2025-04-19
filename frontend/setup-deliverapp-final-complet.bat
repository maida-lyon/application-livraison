@echo off
echo === DELIVERAPP – SETUP FINAL COMPLET ===

REM Lancer backend
start cmd /k "cd backend && npm install && npm run dev"

REM Aller dans frontend et installer les packages nécessaires
cd frontend
npm install axios react-icons qrcode.react leaflet react-leaflet jspdf multer

REM Créer l’arborescence frontend
cd src\app
mkdir login
mkdir register
mkdir dashboard
mkdir dashboard\donneur
mkdir dashboard\transporteur
mkdir dashboard\admin
cd ..\..\..

REM PAGE REGISTER
> frontend\src\app\register\page.tsx (
echo "use client";
echo import { useState } from "react";
echo import axios from "axios";
echo import { useRouter } from "next/navigation";
echo export default function Register() {
echo const router = useRouter();
echo const [form, setForm] = useState({ nom:"", email:"", telephone:"", motdepasse:"", role:"donneur" });
echo const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
echo const handleSubmit = async (e) => {
echo e.preventDefault();
echo try {
echo await axios.post("http://localhost:5000/api/users/register", form);
echo router.push("/login");
echo } catch {
echo alert("Erreur à l'inscription");
echo }};
echo return (
echo ^<form onSubmit={handleSubmit} className="p-6 flex flex-col gap-4 max-w-md mx-auto"^>
echo ^<input name="nom" placeholder="Nom" onChange={handleChange} className="p-2 border" /^>
echo ^<input name="email" placeholder="Email" type="email" onChange={handleChange} className="p-2 border" /^>
echo ^<input name="telephone" placeholder="Téléphone" onChange={handleChange} className="p-2 border" /^>
echo ^<input name="motdepasse" type="password" placeholder="Mot de passe" onChange={handleChange} className="p-2 border" /^>
echo ^<select name="role" onChange={handleChange} className="p-2 border"^>
echo ^<option value="donneur"^>Donneur^</option^>
echo ^<option value="transporteur"^>Transporteur^</option^>
echo ^<option value="admin"^>Admin^</option^>
echo ^</select^>
echo ^<button type="submit" className="bg-black text-white py-2"^>Créer compte^</button^>
echo ^</form^> );
echo }
)

REM PAGE LOGIN
> frontend\src\app\login\page.tsx (
echo "use client";
echo import { useState } from "react";
echo import axios from "axios";
echo import { useRouter } from "next/navigation";
echo export default function Login() {
echo const router = useRouter();
echo const [email, setEmail] = useState("");
echo const [motdepasse, setMotdepasse] = useState("");
echo const handleSubmit = async (e) => {
echo e.preventDefault();
echo try {
echo const res = await axios.post("http://localhost:5000/api/users/login", { email, motdepasse });
echo const role = res.data.role;
echo router.push("/dashboard/" + role);
echo } catch {
echo alert("Identifiants invalides");
echo }};
echo return (
echo ^<form onSubmit={handleSubmit} className="p-6 flex flex-col gap-4 max-w-md mx-auto"^>
echo ^<input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} className="p-2 border" /^>
echo ^<input type="password" placeholder="Mot de passe" value={motdepasse} onChange={e => setMotdepasse(e.target.value)} className="p-2 border" /^>
echo ^<button type="submit" className="bg-black text-white py-2"^>Connexion^</button^>
echo ^</form^> );
echo }
)

REM DASHBOARD DONNEUR – commandes + documents + QR + facture
> frontend\src\app\dashboard\donneur\page.tsx (
echo "use client";
echo import { useState } from "react";
echo import axios from "axios";
echo import QRCode from "qrcode.react";
echo import jsPDF from "jspdf";
echo export default function Donneur() {
echo const [commande, setCommande] = useState(null);
echo const creerCommande = async () => {
echo const res = await axios.post("http://localhost:5000/api/commandes", {
echo   type: "freight", volume: 10, poids: 200, statut: "en attente"
echo });
echo setCommande(res.data);
echo };
echo const generatePDF = () => {
echo const pdf = new jsPDF();
echo pdf.text("Facture commande #" + commande.id, 10, 10);
echo pdf.save("facture.pdf");
echo };
echo return (
echo ^<div className="p-6 space-y-4"^>
echo ^<h1 className="text-xl font-bold"^>Dashboard Donneur^</h1^>
echo ^<button onClick={creerCommande} className="bg-blue-600 text-white px-4 py-2"^>Créer commande freight^</button^>
echo {commande && (
echo   ^<div className="border p-4"^>
echo     ^<p^>Commande ID: {commande.id} – Volume: {commande.volume} – Poids: {commande.poids}kg^</p^>
echo     ^<QRCode value={"CMD-" + commande.id} /^>
echo     ^<button onClick={generatePDF} className="bg-green-700 text-white px-2 py-1 mt-2"^>Télécharger facture PDF^</button^>
echo   ^</div^>
echo )}
echo ^</div^>);
echo }
)

REM DASHBOARD TRANSPORTEUR – suivi + preuve
> frontend\src\app\dashboard\transporteur\page.tsx (
echo "use client";
echo import { useState } from "react";
echo import { MapContainer, TileLayer, Marker } from "react-leaflet";
echo import "leaflet/dist/leaflet.css";
echo export default function Transporteur() {
echo const position = [45.75, 4.85];
echo const [preuve, setPreuve] = useState(null);
echo const uploadPreuve = (e) => {
echo const file = e.target.files[0];
echo setPreuve(file?.name || "Fichier sélectionné");
echo };
echo return (
echo ^<div className="p-6 space-y-6"^>
echo ^<h1 className="text-xl font-bold"^>Dashboard Transporteur^</h1^>
echo ^<MapContainer center={position} zoom={13} style={{ height: "300px", width: "100%" }}^>
echo   ^<TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" /^>
echo   ^<Marker position={position} /^>
echo ^</MapContainer^>
echo ^<div^>
echo ^<input type="file" onChange={uploadPreuve} className="mt-4" /^>
echo ^<p^>{preuve && "Fichier : " + preuve}^</p^>
echo ^</div^>
echo ^</div^>);
echo }
)

REM DASHBOARD ADMIN – aperçu
> frontend\src\app\dashboard\admin\page.tsx (
echo export default function Admin() {
echo return ^<div className="p-6"^>Bienvenue Admin – Gestion des utilisateurs, documents et litiges ✅^</div^>;
echo }
)

REM Revenir racine et lancer le frontend
cd ../..
start cmd /k "cd frontend && npm run dev"

echo === ✅ DELIVERAPP ENTIÈREMENT LANCÉ – PRÊT À TESTER EN RÉEL ===
pause
