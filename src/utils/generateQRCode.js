export const generateQRData = (user) => {
  return JSON.stringify({
    id: user.registrationId,
    name: user.fullName,
    event: 'DMK GenZ Meeting 2026',
    date: '21 June 2026',
    venue: 'Kanyakumari',
    mobile: user.mobile
  });
};

export const downloadPass = (canvasRef, user) => {
  if (!canvasRef) return;
  const link = document.createElement('a');
  link.download = `DMK-GENZ-Pass-${user.registrationId}.png`;
  link.href = canvasRef.toDataURL('image/png');
  link.click();
};