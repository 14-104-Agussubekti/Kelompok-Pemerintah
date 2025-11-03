import React, { useState } from 'react';
import StatusBadge from '../components/common/StatusBadge';
import styles from './DashboardMasyarakat.module.css';

const DashboardMasyarakat = () => {
  // --- Data Mockup Diperbarui ---
  // Sekarang menyertakan 'alasan_penolakan'
  const [pengaduan] = useState([
    { 
      id: 1, 
      judul: 'Jalan Rusak di RT 01', 
      status: 'tertunda', 
      alasan_penolakan: null 
    },
    { 
      id: 2, 
      judul: 'Lampu Jalan Mati', 
      status: 'diproses', 
      alasan_penolakan: null 
    },
    {
      id: 3,
      judul: 'si jaki korupsi',
      status: 'ditolak',
      alasan_penolakan: 'Pemerintah bersama rakyat ga mungkin korupsi!'
    }
  ]);

  return (
    <div className={`${styles.card} animate-fadeIn`}>
      <h1 className={styles.title}>Riwayat Pengaduan Saya</h1>
      
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead className={styles.tableHead}>
            <tr>
              <th>Judul Pengaduan</th>
              <th>Status</th>
              {/* Kita bisa tambahkan kolom 'Aksi' untuk 'Lihat Detail' di masa depan */}
            </tr>
          </thead>
          <tbody className={styles.tableBody}>
            {pengaduan.length === 0 ? (
              <tr>
                <td colSpan="2" style={{ textAlign: 'center' }}>
                  Anda belum membuat pengaduan.
                </td>
              </tr>
            ) : (
              pengaduan.map(p => (
                <tr key={p.id}>
                  <td className={styles.cellTitle}>{p.judul}</td>
                  
                  {/* --- PERUBAHAN DI SINI --- */}
                  {/* Sel status sekarang bisa menampilkan alasan penolakan */}
                  <td>
                    <StatusBadge status={p.status} />
                    {/* Tampilkan alasan penolakan jika status 'ditolak' */}
                    {p.status === 'ditolak' && p.alasan_penolakan && (
                      <p className={styles.rejectionReasonInTable}>
                        {p.alasan_penolakan}
                      </p>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DashboardMasyarakat;

