import React from 'react';

// Style inline juga lebih mudah untuk komponen dinamis kecil ini
const StatusBadge = ({ status }) => {
  const statusColors = {
    tertunda: {
      backgroundColor: '#fef9c3', // bg-yellow-100
      color: '#854d0e', // text-yellow-800
    },
    diproses: {
      backgroundColor: '#dbeafe', // bg-blue-100
      color: '#1e40af', // text-blue-800
    },
    selesai: {
      backgroundColor: '#d1fae5', // bg-green-100
      color: '#065f46', // text-green-800
    },
  };

  const style = {
    padding: '0.125rem 0.5rem', // px-2
    fontSize: '0.75rem', // text-xs
    fontWeight: '600', // font-semibold
    borderRadius: '9999px', // rounded-full
    display: 'inline-flex',
    lineHeight: '1.25',
    ...statusColors[status], // Gabungkan style
  };

  return <span style={style}>{status}</span>;
};
export default StatusBadge;