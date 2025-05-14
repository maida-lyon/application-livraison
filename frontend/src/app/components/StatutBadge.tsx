export default function StatutBadge({
    valide,
    force,
  }: {
    valide: boolean
    force: boolean
  }) {
    if (valide)
      return (
        <span className="text-green-600 font-medium text-xs bg-green-100 px-2 py-1 rounded">
          ✅ Validé
        </span>
      )
    if (force)
      return (
        <span className="text-yellow-600 font-medium text-xs bg-yellow-100 px-2 py-1 rounded">
          🛠️ Validation forcée
        </span>
      )
    return (
      <span className="text-red-600 font-medium text-xs bg-red-100 px-2 py-1 rounded">
        ⏳ En attente
      </span>
    )
  }
  