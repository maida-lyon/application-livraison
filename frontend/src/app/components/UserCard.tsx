export default function UserCard({ user }: { user: any }) {
    return (
      <div className="p-4 bg-white rounded-lg shadow space-y-1 text-sm">
        <p className="font-semibold">{user.nom}</p>
        <p>{user.email}</p>
        <p className="text-xs text-gray-500">
          {user.valide ? "✅ Validé" : user.force ? "🛠️ Forcé" : "⏳ En attente"}
        </p>
      </div>
    )
  }
  