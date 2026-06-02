import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { generateQRData } from '../utils/generateQRCode';

const QRGenerator = ({ user, size = 140 }) => {
  const data = generateQRData(user);
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="p-3 rounded-xl" style={{ background: '#fff' }}>
        <QRCodeSVG
          value={data}
          size={size}
          bgColor="#ffffff"
          fgColor="#0a0a0a"
          level="H"
          includeMargin={false}
        />
      </div>
      <p className="text-white/40 text-xs tracking-wider">Scan to Verify</p>
    </div>
  );
};

export default QRGenerator;