import { jsPDF } from 'jspdf';

export const generateCertificate = (user) => {
  const pdf = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' });
  const W = 297, H = 210;
  const certId = 'CERT-' + Math.random().toString(36).substr(2, 8).toUpperCase();

  // Background
  pdf.setFillColor(10, 10, 10);
  pdf.rect(0, 0, W, H, 'F');

  // Red top border
  pdf.setFillColor(204, 0, 0);
  pdf.rect(0, 0, W, 8, 'F');
  pdf.rect(0, H - 8, W, 8, 'F');

  // Yellow side borders
  pdf.setFillColor(255, 215, 0);
  pdf.rect(0, 8, 8, H - 16, 'F');
  pdf.rect(W - 8, 8, 8, H - 16, 'F');

  // Inner border
  pdf.setDrawColor(255, 215, 0);
  pdf.setLineWidth(0.5);
  pdf.rect(15, 15, W - 30, H - 30);

  // Header badge
  pdf.setFillColor(204, 0, 0);
  pdf.roundedRect(W/2 - 45, 18, 90, 10, 2, 2, 'F');
  pdf.setTextColor(255, 215, 0);
  pdf.setFontSize(7);
  pdf.setFont('helvetica', 'bold');
  pdf.text('DMK GENZ MEETING 2026', W/2, 24.5, { align: 'center' });

  // Title
  pdf.setTextColor(255, 215, 0);
  pdf.setFontSize(38);
  pdf.setFont('helvetica', 'bold');
  pdf.text('CERTIFICATE', W/2, 55, { align: 'center' });

  pdf.setFontSize(14);
  pdf.setTextColor(200, 200, 200);
  pdf.text('OF PARTICIPATION', W/2, 65, { align: 'center' });

  // Decorative line
  pdf.setDrawColor(204, 0, 0);
  pdf.setLineWidth(1);
  pdf.line(60, 72, W - 60, 72);

  // Presented text
  pdf.setTextColor(160, 160, 160);
  pdf.setFontSize(11);
  pdf.setFont('helvetica', 'normal');
  pdf.text('This certificate is proudly presented to', W/2, 85, { align: 'center' });

  // Name
  pdf.setTextColor(255, 255, 255);
  pdf.setFontSize(30);
  pdf.setFont('helvetica', 'bold');
  pdf.text(user.fullName || user.name, W/2, 103, { align: 'center' });

  // Underline for name
  pdf.setDrawColor(255, 215, 0);
  pdf.setLineWidth(0.5);
  const nameWidth = pdf.getTextWidth(user.fullName || user.name);
  pdf.line(W/2 - nameWidth/2, 107, W/2 + nameWidth/2, 107);

  // Body text
  pdf.setTextColor(180, 180, 180);
  pdf.setFontSize(11);
  pdf.setFont('helvetica', 'normal');
  pdf.text('for actively participating in the', W/2, 118, { align: 'center' });

  pdf.setTextColor(255, 215, 0);
  pdf.setFontSize(15);
  pdf.setFont('helvetica', 'bold');
  pdf.text('DMK GENZ STATE MEETING 2026', W/2, 130, { align: 'center' });

  pdf.setTextColor(180, 180, 180);
  pdf.setFontSize(10);
  pdf.setFont('helvetica', 'normal');
  pdf.text('Held at Kanyakumari, Tamil Nadu | 21st June 2026, 3:00 PM', W/2, 140, { align: 'center' });

  // Bottom info row
  pdf.setDrawColor(255, 215, 0);
  pdf.setLineWidth(0.3);
  pdf.line(30, 155, W - 30, 155);

  // Left column
  pdf.setTextColor(100, 100, 100);
  pdf.setFontSize(8);
  pdf.text('REGISTRATION ID', 50, 165, { align: 'center' });
  pdf.setTextColor(255, 215, 0);
  pdf.setFontSize(10);
  pdf.text(user.registrationId || 'GENZ-XXXXX', 50, 173, { align: 'center' });

  // Center column
  pdf.setTextColor(100, 100, 100);
  pdf.setFontSize(8);
  pdf.text('CERTIFICATE ID', W/2, 165, { align: 'center' });
  pdf.setTextColor(255, 215, 0);
  pdf.setFontSize(10);
  pdf.text(certId, W/2, 173, { align: 'center' });

  // Right column
  pdf.setTextColor(100, 100, 100);
  pdf.setFontSize(8);
  pdf.text('DATE ISSUED', W - 50, 165, { align: 'center' });
  pdf.setTextColor(255, 215, 0);
  pdf.setFontSize(10);
  pdf.text('21 June 2026', W - 50, 173, { align: 'center' });

  // DMK branding
  pdf.setTextColor(60, 60, 60);
  pdf.setFontSize(8);
  pdf.text('திராவிட முன்னேற்றக் கழகம் — DMK YOUTH WING', W/2, 190, { align: 'center' });

  pdf.save(`DMK-GENZ-Certificate-${user.fullName || 'Participant'}.pdf`);
  return certId;
};