export default function IAVerification({ result }: { result: string }) {
    return (
      <div
        className={`p-4 rounded-lg mt-4 ${
          result.includes("✅")
            ? "bg-green-100 text-green-800"
            : result.includes("❌")
            ? "bg-red-100 text-red-800"
            : "bg-yellow-100 text-yellow-800"
        }`}
      >
        {result}
      </div>
    )
  }
  