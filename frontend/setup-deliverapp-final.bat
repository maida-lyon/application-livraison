@echo off
echo === SETUP FINAL DELIVERAPP ===

REM Installer les dépendances
npm install axios react-icons qrcode.react leaflet react-leaflet jspdf

REM Créer les dossiers frontend
cd src\app
mkdir login
mkdir register
mkdir dashboard
mkdir dashboard\donneur
mkdir dashboard\transporteur
mkdir dashboard\admin
cd ..\..

REM register
> src\app\register\page.tsx (
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
echo await axios.post("http://localhost:5000/users/register", form);
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
echo ^</form^>);
echo }
)

REM login
> src\app\login\page.tsx (
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
echo ^</form^>);
echo }
)

REM Dashboards "connectés" basiques (à enrichir ensuite)

> src\app\dashboard\donneur\page.tsx echo export default function Donneur() { return <div className="p-6">Bienvenue Donneur – Vos commandes seront ici ✅</div>; }
> src\app\dashboard\transporteur\page.tsx echo export default function Transporteur() { return <div className="p-6">Bienvenue Transporteur – Missions en attente ✅</div>; }
> src\app\dashboard\admin\page.tsx echo export default function Admin() { return <div className="p-6">Bienvenue Admin – Documents & litiges à traiter ✅</div>; }

REM Lancer l'application
echo === INSTALLATION TERMINÉE – LANCEMENT EN LOCAL ===
npm run dev
