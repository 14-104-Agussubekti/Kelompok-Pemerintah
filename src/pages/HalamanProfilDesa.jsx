import React from 'react';
import styles from './HalamanProfilDesa.module.css'; // Kita akan sangat bergantung pada file CSS ini

// Kita letakkan data dummy di sini agar mudah diedit
// Nanti, data ini akan diambil dari Backend (Laravel)
const dummyData = {
  profil: {
    sejarah: "Sejarah singkat Desa Digital dimulai dari inisiatif warga untuk menciptakan sistem informasi yang terintegrasi pada tahun 2020. Dengan semangat gotong royong, desa ini berhasil menjadi pelopor desa digital di kabupaten.",
  },
  visi: "Terwujudnya Desa Digital yang Maju, Mandiri, Sejahtera, dan Berkeadilan.",
  misi: [
    "Meningkatkan kualitas pelayanan publik berbasis teknologi.",
    "Mengembangkan potensi ekonomi desa melalui e-commerce.",
    "Meningkatkan transparansi dan akuntabilitas pemerintah desa.",
    "Menciptakan sumber daya manusia yang unggul dan melek teknologi.",
  ],
  tugasPokok: [
    "Penyelenggaraan Pemerintahan Desa.",
    "Pelaksanaan Pembangunan Desa.",
    "Pembinaan Kemasyarakatan Desa.",
    "Pemberdayaan Masyarakat Desa.",
  ],
  struktur: [
    { nama: "Kepala Desa", jabatan: "Nama Kepala Desa" },
    { nama: "Sekretaris Desa", jabatan: "Nama Sekretaris Desa" },
    { nama: "Kaur Keuangan", jabatan: "Nama Kaur Keuangan" },
    { nama: "Kasi Pemerintahan", jabatan: "Nama Kasi Pemerintahan" },
  ],
  layanan: [
    "Layanan Kependudukan",
    "Layanan Perizinan",
    "Layanan Informasi Publik",
    "Layanan Pengaduan Online",
  ]
};


// Ini adalah komponen utama halaman profil Anda
const HalamanProfilDesa = () => {
  return (
    // 'pageWrapper' adalah pembungkus utama seluruh halaman
    <div className={`${styles.pageWrapper} animate-fadeIn`}>

      {/* === BAGIAN 1: HEADER (BANNER GAMBAR) === */}
      <header className={styles.hero}>
        {/* Overlay gelap agar teks terbaca */}
        <div className={styles.heroOverlay}></div>
        {/* Konten teks di atas gambar */}
        <div className={styles.heroContent}>
          <h1>Selamat Datang di Portal Desa</h1>
          <p>Transparan, Akuntabel, dan Melayani</p>
        </div>
      </header>

      {/* === BAGIAN 2: KONTEN UTAMA (BERISI KARTU-KARTU) === */}
      <main className={styles.mainContent}>

        {/* --- Kartu 1: Profil Instansi --- */}
        <section className={styles.card}>
          <h2 className={styles.cardTitle}>Profil Instansi</h2>
          <h3 className={styles.cardSubtitle}>Sejarah Singkat</h3>
          <p className={styles.paragraph}>{dummyData.profil.sejarah}</p>
        </section>

        {/* --- Kartu 2: Visi & Misi (Grid 2 kolom) --- */}
        <section className={`${styles.card} ${styles.visiMisiCard}`}>
          <div className={styles.visi}>
            <h2 className={styles.cardTitle}>Visi</h2>
            <p className={styles.paragraph}>{dummyData.visi}</p>
          </div>
          <div className={styles.misi}>
            <h2 className={styles.cardTitle}>Misi</h2>
            {/* Kita ubah array Misi menjadi daftar (list) */}
            <ol className={styles.list}>
              {dummyData.misi.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ol>
          </div>
        </section>
        
        {/* --- Kartu 3: Tugas Pokok & Fungsi --- */}
        <section className={styles.card}>
          <h2 className={styles.cardTitle}>Tugas Pokok & Fungsi</h2>
          <ul className={styles.list}>
            {dummyData.tugasPokok.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </section>

        {/* --- Kartu 4: Struktur Organisasi --- */}
        <section className={styles.card}>
          <h2 className={styles.cardTitle}>Struktur Organisasi</h2>
          <div className={styles.strukturGrid}>
            {dummyData.struktur.map((item, index) => (
              <div key={index} className={styles.strukturItem}>
                <div className={styles.strukturJabatan}>{item.nama}</div>
                <div className={styles.strukturNama}>{item.jabatan}</div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* === BAGIAN 3: FOOTER (LAYANAN DIGITAL) === */}
      <footer className={styles.footer}>
        <h2 className={styles.footerTitle}>Portal Layanan Digital</h2>
        <div className={styles.layananGrid}>
          {dummyData.layanan.map((layanan, index) => (
            <div key={index} className={styles.layananItem}>
              {layanan}
            </div>
          ))}
        </div>
        <div className={styles.footerCopy}>
          &copy; {new Date().getFullYear()} Desa Digital. Hak Cipta Dilindungi.
        </div>
      </footer>
    </div>
  );
};

export default HalamanProfilDesa;