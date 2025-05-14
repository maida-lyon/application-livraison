"use client";
import { useRef, useEffect } from "react";
import SignatureCanvas from "react-signature-canvas";

export default function SignaturePad({ label, name, setForm }: any) {
  const sigRef = useRef<any>(null);

  const save = () => {
    if (!sigRef.current || sigRef.current.isEmpty()) return;
    const dataUrl = sigRef.current.getTrimmedCanvas().toDataURL("image/png");
    setForm((prev: any) => ({ ...prev, [name]: dataUrl }));
  };

  const clear = () => {
    sigRef.current?.clear();
    setForm((prev: any) => ({ ...prev, [name]: "" }));
  };

  useEffect(() => {
    save();
  }, []);

  return (
    <div className="mt-4">
      <p className="font-semibold mb-1">{label}</p>
      <div className="border rounded-md bg-white">
        <SignatureCanvas
          ref={sigRef}
          penColor="black"
          canvasProps={{ width: 400, height: 150, className: "signature-canvas" }}
          onEnd={save}
        />
      </div>
      <button
        onClick={clear}
        className="mt-2 text-sm bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
      >
        Effacer la signature
      </button>
    </div>
  );
}
