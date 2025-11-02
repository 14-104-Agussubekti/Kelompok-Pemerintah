import React, { useState } from 'react';
import StatusBadge from '../components/common/StatusBadge';
import styles from './AdminDashboard.module.css'; // <-- Menggunakan file CSS yang baru

const AdminDashboard = () => {
  // --- Data Mockup Diperbarui dengan 'isi' dan 'foto_bukti' ---
  const [pengaduan, setPengaduan] = useState([
    { 
      id: 1, 
      judul: 'Jalan Rusak di RT 01', 
      status: 'tertunda', 
      pelapor: 'Warga A', 
      isi: 'Jalanan di depan rumah saya (RT 01/RW 05) rusak parah dan berlubang, membahayakan pengendara. Mohon segera diperbaiki.', 
      foto_bukti: 'https://placehold.co/600x400/ccc/999?text=Contoh+Foto+Jalan+Rusak' 
    },
    { 
      id: 2, 
      judul: 'Lampu Jalan Mati', 
      status: 'diproses', 
      pelapor: 'Warga B', 
      isi: 'Lampu jalan di pertigaan utama desa sudah mati 3 hari, sangat gelap dan rawan.', 
      foto_bukti: null 
    },
    { 
      id: 3, 
      judul: 'Bantuan Sosial Belum Datang', 
      status: 'selesai', 
      pelapor: 'Warga C', 
      isi: 'Saya ingin melaporkan bahwa bantuan sosial (sembako) untuk bulan ini belum kami terima.', 
      foto_bukti: null 
    },
  ]);

  // --- State Baru untuk Modal ---
  const [selectedPengaduan, setSelectedPengaduan] = useState(null);

  const handleStatusChange = async (id, newStatus) => {
    console.log(`MOCK UPDATE: ID ${id} -> Status ${newStatus}`);
    setPengaduan(prev =>
      prev.map(p => (p.id === id ? { ...p, status: newStatus } : p))
    );
  };

  // --- Fungsi Baru untuk Membuka dan Menutup Modal ---
  const handleBukaDetail = (pengaduan) => {
    setSelectedPengaduan(pengaduan);
  };

  const handleTutupModal = () => {
    setSelectedPengaduan(null);
  };

  return (
    <>
      <div className={`${styles.card} animate-fadeIn`}>
        <h1 className={styles.title}>Manajemen Pengaduan (Admin)</h1>
        
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead className={styles.tableHead}>
              <tr>
                <th>Judul</th>
                <th>Pelapor</th>
                <th>Status</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody className={styles.tableBody}>
              {pengaduan.map(p => (
                <tr key={p.id}>
                  <td className={styles.cellTitle}>{p.judul}</td>
                  <td>{p.pelapor}</td>
                  <td><StatusBadge status={p.status} /></td>
                  
                  {/* --- Kolom Aksi Diperbarui --- */}
                  <td className={styles.actionCell}>
                    <select
                      className={styles.statusSelect}
                      value={p.status}
                      onChange={(e) => handleStatusChange(p.id, e.target.value)}
                    >
                      <option value="tertunda">Tertunda</option>
                      <option value="diproses">Diproses</option>
                      <option value="selesai">Selesai</option>
                    </select>
                    <button 
                      className={styles.actionButton}
                      onClick={() => handleBukaDetail(p)}
                    >
                      Lihat Detail
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* --- JSX BARU UNTUK MODAL --- */}
      {selectedPengaduan && (
        <div className={styles.modalOverlay} onClick={handleTutupModal}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h2 className={styles.modalTitle}>{selectedPengaduan.judul}</h2>
              <button className={styles.modalCloseButton} onClick={handleTutupModal}>
                &times;
              </button>
            </div>
            <div className={styles.modalBody}>
              <p><strong>Pelapor:</strong> {selectedPengaduan.pelapor}</p>
              <p><strong>Status:</strong> <StatusBadge status={selectedPengaduan.status} /></p>
              <hr className={styles.modalDivider} />
              <p><strong>Isi Laporan:</strong></p>
              <p>{selectedPengaduan.isi}</p>
              
              {selectedPengaduan.foto_bukti && (
                <div className={styles.modalImageContainer}>
                  <p><strong>Foto Bukti:</strong></p>
                  <img 
                    src={selectedPengaduan.foto_bukti} 
                    alt="Foto Bukti" 
                    className={styles.modalImage}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default AdminDashboard;
