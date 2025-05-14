type AdresseFormProps = {
    prefix: string;
    form: any;
    setForm: React.Dispatch<React.SetStateAction<any>>;
  };
  
  export default function AdresseForm({ prefix, form, setForm }: AdresseFormProps) {
    return (
      <div className="space-y-2">
        <input
          type="text"
          placeholder={`Nom entreprise ${prefix}`}
          value={form[`entreprise${prefix}`]}
          onChange={(e) => setForm({ ...form, [`entreprise${prefix}`]: e.target.value })}
          className="input"
        />
        <input
          type="text"
          placeholder={`N° + rue ${prefix}`}
          value={form[`nomRue${prefix}`]}
          onChange={(e) => setForm({ ...form, [`nomRue${prefix}`]: e.target.value })}
          className="input"
        />
        <input
          type="text"
          placeholder={`Code postal ${prefix}`}
          value={form[`codePostal${prefix}`]}
          onChange={(e) => setForm({ ...form, [`codePostal${prefix}`]: e.target.value })}
          className="input"
        />
        <input
          type="text"
          placeholder={`Ville ${prefix}`}
          value={form[`ville${prefix}`]}
          onChange={(e) => setForm({ ...form, [`ville${prefix}`]: e.target.value })}
          className="input"
        />
        <input
          type="tel"
          placeholder={`Téléphone ${prefix}`}
          value={form[`telephone${prefix}`]}
          onChange={(e) => setForm({ ...form, [`telephone${prefix}`]: e.target.value })}
          className="input"
        />
        <input
          type="date"
          value={form[`date${prefix}`]}
          onChange={(e) => setForm({ ...form, [`date${prefix}`]: e.target.value })}
          className="input"
        />
        <input
          type="time"
          value={form[`heure${prefix}`]}
          onChange={(e) => setForm({ ...form, [`heure${prefix}`]: e.target.value })}
          className="input"
        />
      </div>
    );
  }
  