"use client";
import { QRCodeCanvas } from "qrcode.react";

export default function QrCodeCanvas({ value }: { value: string }) {
  return (
    <div className="mt-2">
      <QRCodeCanvas value={value} size={160} />
    </div>
  );
}
