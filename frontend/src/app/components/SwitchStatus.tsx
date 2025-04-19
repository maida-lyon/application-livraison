type SwitchStatusProps = {
    enLigne: boolean;
    setEnLigne: React.Dispatch<React.SetStateAction<boolean>>;
  };
  
  export default function SwitchStatus({ enLigne, setEnLigne }: SwitchStatusProps) {
    return (
      <button
        onClick={() => setEnLigne(!enLigne)}
        className={`px-4 py-2 rounded-xl text-white ${
          enLigne ? "bg-green-600" : "bg-red-600"
        }`}
      >
        {enLigne ? "🟢 En ligne" : "🔴 Hors ligne"}
      </button>
    );
  }
  