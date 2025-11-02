import React, { useState } from 'react';
import StatusBadge from '../components/common/StatusBadge';
import styles from './DashboardMasyarakat.module.css'; // <-- Menggunakan file CSS yang baru

const DashboardMasyarakat = () => {
  const [pengaduan] = useState([
    { id: 1, judul: 'Jalan Rusak di RT 01', status: 'tertunda' },
    { id: 2, judul: 'Lampu Jalan Mati', status: 'diproses' },
    { id: 3, judul: 'Bantuan Sosial Belum Datang', status: 'selesai' },
  ]);

  return (
    <div className={`${styles.card} animate-fadeIn`}>
      <h1 className={styles.title}>Riwayat Pengaduan Saya</h1>
      
      {/* --- STRUKTUR BARU (TABEL) --- */}
      {pengaduan.length === 0 ? (
        <p className={styles.emptyText}>Anda belum membuat pengaduan.</p>
      ) : (
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead className={styles.tableHead}>
              <tr>
                <th>Judul Pengaduan</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody className={styles.tableBody}>
              {pengaduan.map(p => (
                <tr key={p.id}>
                  <td className={styles.cellTitle}>{p.judul}</td>
                  <td>
                    <StatusBadge status={p.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default DashboardMasyarakat;

