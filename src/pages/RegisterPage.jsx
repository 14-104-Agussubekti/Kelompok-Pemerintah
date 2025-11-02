import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import styles from './RegisterPage.module.css'; // <-- Kita akan gunakan style ini

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { register, loading } = useAuth(); // Asumsi Anda punya fungsi register di context
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    // Cek jika fungsi register ada
    if (!register) {
      setError('Fungsi register belum diimplementasikan di AuthContext.');
      return;
    }

    try {
      const result = await register(name, email, password);
      if (result.success) {
        // Jika sukses, arahkan ke halaman login untuk login pertama kali
        navigate('/login');
      } else {
        setError(result.error || 'Registrasi gagal.');
      }
    } catch (err) {
      setError('Terjadi kesalahan saat registrasi.');
    }
  };

  return (
    <div className={`${styles.card} animate-fadeIn`}>
      <h1 className={styles.title}>Register</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        {error && <p className={styles.error}>{error}</p>}
        <div>
          <label className={styles.label}>Nama Lengkap</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="Nama Anda"
          />
        </div>
        <div>
          <label className={styles.label}>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="email@anda.com"
          />
        </div>
        <div>
          <label className={styles.label}>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Buat password"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className={styles.button}
        >
          {loading ? 'Mendaftar...' : 'Register'}
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;
