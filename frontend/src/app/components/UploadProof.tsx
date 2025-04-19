type UploadProofProps = {
    name: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  };
  
  export default function UploadProof({ name, onChange }: UploadProofProps) {
    return (
      <div className="flex flex-col">
        <label htmlFor={name} className="text-sm font-medium mb-1">
          Preuve {name.includes("Chargement") ? "de chargement" : "de livraison"}
        </label>
        <input
          type="file"
          name={name}
          id={name}
          accept="image/*"
          onChange={onChange}
          className="border rounded px-3 py-2 text-sm"
        />
      </div>
    );
  }
  