"use client";
import { useEffect, useState } from "react";

export default function Notification({ message }: { message: string }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div className="bg-yellow-200 text-yellow-800 p-2 border rounded text-center">
      {message}
    </div>
  );
}
