type UploadProofProps = {
    name: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  };
  
  export default function UploadProof({ name, onChange }: UploadProofProps) {
    return (
      <div>
        <input
          type="file"
          name={name}
          accept="image/*"
          onChange={onChange}
          className="input"
        />
      </div>
    );
  }
  