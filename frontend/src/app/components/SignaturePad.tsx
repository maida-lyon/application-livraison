type SignaturePadProps = {
    label: string;
    name: string;
    setForm: React.Dispatch<React.SetStateAction<any>>;
  };
  
  export default function SignaturePad({ label, name, setForm }: SignaturePadProps) {
    const handleSignature = (dataUrl: string) => {
      setForm((prev: any) => ({ ...prev, [name]: dataUrl }));
    };
  
    return (
      <div className="signature-pad">
        <label className="font-semibold block mb-1">{label}</label>
        {/* Simulate a canvas or button to upload signature */}
        <button
          className="bg-gray-200 rounded px-4 py-2"
          onClick={() => handleSignature("data:image/fake-signature")}
        >
          Simuler signature
        </button>
      </div>
    );
  }
  