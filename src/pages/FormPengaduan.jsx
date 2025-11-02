import React, { useState } from 'react'; // <-- PASTIKAN 'useState' ADA
import { useNavigate } from 'react-router-dom'; // <-- PASTIKAN 'useNavigate' ADA
import styles from './FormPengaduan.module.css'; 

const FormPengaduan = () => {
  const [judul, setJudul] = useState('');
  const [isi, setIsi] = useState('');
  const [foto, setFoto] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    console.log('MOCK SUBMIT PENGADUAN:', { judul, isi, foto_nama: foto?.name });
    setTimeout(() => {
      setSubmitting(false);
      navigate('/dashboard'); 
    }, 1000);
  };

  return (
    <div className={`${styles.card} animate-fadeIn`}>
      <h1 className={styles.title}>Buat Pengaduan Baru</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div>
          <label className={styles.label}>Judul Pengaduan</label>
          <input
            type="text" value={judul} onChange={(e) => setJudul(e.target.value)} required
          />
        </div>
        <div>
          <label className={styles.label}>Isi Pengaduan</label>
          <textarea
            value={isi} onChange={(e) => setIsi(e.target.value)} required rows="4"
          ></textarea>
        </div>
        <div>
          <label className={styles.label}>Foto Bukti (Opsional)</label>
          <input
            type="file" onChange={(e) => setFoto(e.target.files[0])}
            className={styles.fileInput}
          />
        </div>
        <button
          type="submit" disabled={submitting}
          className={styles.button}
        >
          {submitting ? 'Mengirim...' : 'Kirim Pengaduan'}
        </button>
      </form>
    </div>
  );
};
export default FormPengaduan;
