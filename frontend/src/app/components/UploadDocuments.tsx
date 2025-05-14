"use client"
import { useState } from "react"

export default function UploadDocuments({ form, setForm }: any) {
  const [preview, setPreview] = useState<{ [key: string]: string }>({})

  const handleFile = (e: any) => {
    const { name, files } = e.target
    if (files[0]) {
      setForm({ ...form, [name]: files[0] })
      const reader = new FileReader()
      reader.onload = () =>
        setPreview((prev) => ({ ...prev, [name]: reader.result as string }))
      reader.readAsDataURL(files[0])
    }
  }

  return (
    <div className="space-y-4">
      {["kbis", "assurance", "identite", "rib", "justificatif"].map((doc) => (
        <div key={doc}>
          <label className="font-medium capitalize">{doc}</label>
          <input
            type="file"
            name={doc}
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={handleFile}
            className="block"
          />
          {preview[doc] && (
            <p className="text-sm text-gray-500">
              Fichier sélectionné : {form[doc]?.name}
            </p>
          )}
        </div>
      ))}
    </div>
  )
}
