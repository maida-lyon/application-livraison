"use client"
export default function Commentaire({ value, onChange }: {
  value: string, onChange: (e: any) => void
}) {
  return (
    <div>
      <label className="block mb-1 font-bold">Commentaire / Instructions</label>
      <textarea value={value} onChange={onChange} placeholder="N° de téléphone, remarques, contact…" className="border p-2 w-full" />
    </div>
  )
}
