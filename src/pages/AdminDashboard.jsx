import React, { useState } from 'react';
import StatusBadge from '../components/common/StatusBadge';
import styles from './AdminDashboard.module.css';

const AdminDashboard = () => {
  // --- Data Mockup Diperbarui dengan 'alasan_penolakan' ---
  const [pengaduan, setPengaduan] = useState([
    { 
      id: 1, 
      judul: 'Jalan Rusak di RT 01', 
      status: 'menunggu_persetujuan',
      pelapor: 'Warga A', 
      isi: 'Jalanan di depan rumah saya (RT 01/RW 05) rusak parah...', 
      foto_bukti: 'https://placehold.co/600x400/ccc/999?text=Contoh+Foto+Jalan+Rusak',
      alasan_penolakan: null 
    },
    { 
      id: 2, 
      judul: 'Lampu Jalan Mati', 
      status: 'tertunda',
      pelapor: 'Warga B', 
      isi: 'Lampu jalan di pertigaan utama desa sudah mati 3 hari...', 
      foto_bukti: null,
      alasan_penolakan: null 
    },
    { 
      id: 3, 
      judul: 'Bantuan Sosial Belum Datang', 
      status: 'diproses', 
      pelapor: 'Warga C', 
      isi: 'Saya ingin melaporkan bahwa bantuan sosial (sembako) ...', 
      foto_bukti: null,
      alasan_penolakan: null 
    },
    { 
      id: 4, 
      judul: 'pak jaki korupsi', 
      status: 'ditolak',
      pelapor: 'Warga D', 
      isi: 'Turunkan jokowi', 
      foto_bukti: null,
      alasan_penolakan: 'Pemerintah bersama rakyat ga mungkin korupsi!' // Contoh alasan
    },
  ]);

  const [selectedPengaduan, setSelectedPengaduan] = useState(null);
  
  // --- State Baru untuk Modal Penolakan ---
  const [currentRejection, setCurrentRejection] = useState(null); // Menyimpan ID pengaduan yang akan ditolak
  const [rejectionReason, setRejectionReason] = useState(''); // Menyimpan isi textarea

  // --- FUNGSI HANDLER BARU ---
  const handleStatusChange = (id, newStatus, alasan = null) => {
    // Memperbarui state, sekarang juga menyimpan alasan
    setPengaduan(prev =>
      prev.map(p =>
        (p.id === id ? { ...p, status: newStatus, alasan_penolakan: alasan } : p)
      )
    );
  };

  const handleTerima = (id) => {
    handleStatusChange(id, 'tertunda', null); // Set alasan ke null saat diterima
  };

  // --- Mengubah 'handleTolak' menjadi 'handleBukaModalTolak' ---
  const handleBukaModalTolak = (pengaduan) => {
    setCurrentRejection(pengaduan); // Simpan seluruh data pengaduan
    setRejectionReason(''); // Kosongkan textarea
  };

  const handleTutupModalTolak = () => {
    setCurrentRejection(null);
    setRejectionReason('');
  };

  // --- Fungsi baru untuk submit penolakan dari modal ---
  const handleSubmitRejection = () => {
    if (rejectionReason.trim() === '') {
      // Ganti alert dengan metode notifikasi yang lebih baik jika ada
      alert('Alasan penolakan tidak boleh kosong.');
      return;
    }
    handleStatusChange(currentRejection.id, 'ditolak', rejectionReason);
    handleTutupModalTolak();
  };

  // --- Handler Modal Detail (Tidak berubah) ---
  const handleBukaDetail = (pengaduan) => {
    setSelectedPengaduan(pengaduan);
  };

  const handleTutupModal = () => {
    setSelectedPengaduan(null);
  };

  // --- FUNGSI RENDER AKSI (Diperbarui) ---
  const renderAksi = (pengaduan) => {
    switch (pengaduan.status) {
      case 'menunggu_persetujuan':
        return (
          <>
            <button 
              className={`${styles.actionButton} ${styles.actionButtonTerima}`}
              onClick={() => handleTerima(pengaduan.id)}
            >
              Terima
            </button>
            <button 
              className={`${styles.actionButton} ${styles.actionButtonTolak}`}
              onClick={() => handleBukaModalTolak(pengaduan)} // <-- Diperbarui
            >
              Tolak
            </button>
            <button 
              className={styles.actionButton}
              onClick={() => handleBukaDetail(pengaduan)}
            >
              Detail
            </button>
          </>
        );
      
      case 'tertunda':
      case 'diproses':
        return (
          <>
            <select
              className={styles.statusSelect}
              value={pengaduan.status}
              onChange={(e) => handleStatusChange(pengaduan.id, e.target.value)}
            >
              <option value="tertunda">Tertunda</option>
              <option value="diproses">Diproses</option>
              <option value="selesai">Selesai</option>
            </select>
            <button 
              className={styles.actionButton}
              onClick={() => handleBukaDetail(pengaduan)}
            >
              Detail
            </button>
          </>
        );
      
      case 'selesai':
      case 'ditolak':
        return (
          <button 
            className={styles.actionButton}
            onClick={() => handleBukaDetail(pengaduan)}
          >
            Lihat Detail
          </button>
        );
        
      default:
        return null;
    }
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
                  {/* Tambahkan style 'cellNowrap' agar nama pelapor tidak wrap */}
                  <td className={styles.cellNowrap}>{p.pelapor}</td>
                  
                  {/* Sel status tidak lagi 'nowrap' dan bisa menampilkan alasan */}
                  <td>
                    <StatusBadge status={p.status} />
                    {/* Tampilkan alasan penolakan jika status 'ditolak' */}
                    {p.status === 'ditolak' && p.alasan_penolakan && (
                      <p className={styles.rejectionReasonInTable}>
                        {p.alasan_penolakan}
                      </p>
                    )}
                  </td>
                  
                  <td className={styles.actionCell}>
                    {renderAksi(p)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* --- MODAL DETAIL (Diperbarui) --- */}
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
              
              {/* --- BARU: Menampilkan Alasan Penolakan --- */}
              {selectedPengaduan.status === 'ditolak' && selectedPengaduan.alasan_penolakan && (
                <div className={styles.rejectionInfo}>
                  <strong>Alasan Penolakan:</strong>
                  <p>{selectedPengaduan.alasan_penolakan}</p>
                </div>
              )}

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

      {/* --- MODAL PENOLAKAN (BARU) --- */}
      {currentRejection && (
        <div className={styles.modalOverlay} onClick={handleTutupModalTolak}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h2 className={styles.modalTitle}>Tolak Pengaduan</h2>
              <button className={styles.modalCloseButton} onClick={handleTutupModalTolak}>
                &times;
              </button>
            </div>
            <div className={styles.modalBody}>
              <p>Anda akan menolak pengaduan: <strong>"{currentRejection.judul}"</strong>.</p>
              <label htmlFor="rejectionReason" style={{ fontWeight: 600, color: 'var(--color-text-dark)' }}>
                Berikan alasan penolakan (Wajib):
              </label>
              <textarea
                id="rejectionReason"
                className={styles.rejectionTextarea}
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                rows="4"
                placeholder="Contoh: Pengaduan di luar wewenang desa, bukti tidak cukup, dll."
              />
            </div>
            <div className={styles.modalFooter}>
              <button 
                className={styles.modalButton} 
                onClick={handleTutupModalTolak}
              >
                Batal
              </button>
              <button 
                className={`${styles.modalButton} ${styles.modalButtonDanger}`}
                onClick={handleSubmitRejection}
              >
                Kirim Penolakan
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default AdminDashboard;

