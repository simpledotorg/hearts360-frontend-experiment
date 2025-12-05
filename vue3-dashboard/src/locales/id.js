export default {
  // Navigation
  nav: {
    chooseRegion: "Pilih wilayah atau fasilitas...",
    searchPlaceholder: "Cari wilayah atau fasilitas...",
    national: "Nasional",
    appleState: "Provinsi Apple",
    hearts360: "HEARTS",
    uploadData: "Unggah data",
    hypertensionDashboard: "Dasbor hipertensi",
    diabetesDashboard: "Dasbor diabetes",
    overduePatientsList: "Daftar pasien terlambat",
    selectLanguage: "Pilih bahasa",
    language: "Bahasa",
    english: "English",
    indonesian: "Bahasa Indonesia",
  },

  // Breadcrumbs
  breadcrumbs: {
    returnToDashboard: "Kembali ke dasbor",
  },

  // Common
  common: {
    loading: "Memuat data dasbor...",
    error: "Kesalahan",
    retry: "Coba lagi",
    dataLastUpdated: "Data terakhir diperbarui",
    scrollTable: "gulir tabel →",
    of: "dari",
    patients: "pasien",
    total: "Total",
    percent: "Persen",
    subRegions: "Sub-wilayah",
    numerator: "Pembilang",
    denominator: "Penyebut",
  },

  // Sections
  sections: {
    overviewIndicators: "1. Indikator ringkasan",
    programManagementIndicators: "2. Indikator manajemen program",
    overduePatients: "3. Pasien terlambat",
  },

  // Overview Indicators
  overview: {
    patientsProtected: {
      title:
        "Pasien terlindungi dari serangan jantung dan stroke dengan pengobatan kelas dunia",
      inRegion: "di {region} dengan TD <140/90",
    },
    treatmentCascade: {
      title: "Kaskade pengobatan hipertensi",
      description:
        "Perkiraan orang dewasa (>30) di River District dengan hipertensi yang terdaftar, dalam perawatan, dan terkontrol.",
      estimatedPopulation: {
        label: "Perkiraan orang dengan hipertensi",
        tooltip:
          "Perkiraan populasi dengan hipertensi berasal dari Survei Komunitas STEPS yang dilakukan pada tahun 2022.",
      },
      cumulativeRegistered: {
        label: "Pasien terdaftar kumulatif",
        tooltip:
          "Pasien dalam perawatan adalah pasien dengan hipertensi dengan setidaknya 1 kunjungan dalam 12 bulan terakhir.",
      },
      patientsUnderCare: {
        label: "Pasien dalam perawatan",
      },
      bpControlled: {
        label: "Pasien dengan TD terkontrol",
      },
    },
  },

  // Program Management Indicators
  programManagement: {
    treatmentOutcomes: {
      title: "Hasil pengobatan hipertensi",
      description:
        "Hasil untuk {count} pasien dalam perawatan (terdaftar sebelum {startDate}) antara {startDate} hingga {endDate}",
      bpControlled: {
        label: "TD terkontrol pada kunjungan terakhir dalam 3 bulan terakhir",
        patientsWithBP: "{count} pasien dengan TD <140/90",
        tooltipNumerator:
          "Pembilang untuk TD terkontrol: Pasien dengan TD <140 DAN <90 pada kunjungan terakhir mereka dalam 3 bulan terakhir.",
      },
      bpUncontrolled: {
        label:
          "TD tidak terkontrol pada kunjungan terakhir dalam 3 bulan terakhir",
        patientsWithBP: "{count} pasien dengan TD ≥140/90",
        tooltipNumerator:
          "Pembilang untuk TD tidak terkontrol: Pasien dengan TD ≥140 ATAU ≥90 pada kunjungan terakhir mereka dalam 3 bulan terakhir.",
      },
      noVisit3Months: {
        label: "Tidak ada kunjungan dalam 3 bulan terakhir",
        patientsWithNoVisit: "{count} pasien tanpa kunjungan",
        tooltipNumerator:
          "Pembilang untuk Tidak ada kunjungan dalam 3 bulan: Pasien tanpa kunjungan dalam 3 bulan terakhir.",
      },
      tooltipDenominator:
        "Penyebut: Pasien dengan hipertensi terdaftar sebelum 3 bulan terakhir. Pasien yang meninggal (205) dan pasien hilang kontak 12 bulan (1.562) dikecualikan.",
    },
    patientsUnderCare: {
      title: "Pasien dalam perawatan",
      description:
        "Pasien dengan hipertensi dengan setidaknya 1 kunjungan dalam 12 bulan terakhir",
      patientsRegistered: "{count} pasien terdaftar pada {month}",
      tooltipUnderCare:
        "Pasien dalam perawatan: Pasien terdaftar dengan hipertensi dengan setidaknya 1 kunjungan dalam 12 bulan terakhir. Pasien yang meninggal (205) dan pasien hilang kontak 12 bulan (1.562) dikecualikan.",
      tooltipCumulative:
        "Pasien terdaftar kumulatif: Semua pasien dengan hipertensi terdaftar. Pasien yang meninggal (205) dikecualikan.",
      tooltipMonthly:
        "Pasien terdaftar bulanan: Pasien dengan hipertensi terdaftar setiap bulan.",
    },
    lostToFollowUp12Months: {
      title: "Hilang kontak 12 bulan",
      description:
        "Pasien dengan hipertensi tanpa kunjungan dalam 12 bulan terakhir",
      patientsWithNoVisit: "{count} pasien tanpa kunjungan {period}",
      tooltipNumerator:
        "Pembilang: Pasien tanpa kunjungan dalam 12 bulan terakhir.",
      tooltipDenominator:
        "Penyebut: Pasien terdaftar dengan hipertensi. Pasien yang meninggal (205) dikecualikan.",
    },
    opportunisticScreening: {
      title: "Skrining oportunistik",
      description:
        "% dari perkiraan pasien rawat jalan dewasa yang diskrining untuk hipertensi",
      tooltipNumerator: "Pembilang: Pasien yang diskrining untuk hipertensi.",
      tooltipDenominator:
        "Penyebut: Perkiraan pasien rawat jalan dewasa per bulan.",
    },
  },

  // Compare Sub-regions
  compareSubRegions: {
    title: "Bandingkan sub-wilayah",
    description:
      "Hasil pengobatan untuk pasien dengan hipertensi pada kunjungan terakhir mereka dari {startDate} hingga {endDate}",
    tableHeaders: {
      patientsUnderCare: "Pasien dalam perawatan",
      monthlyNewPatients: "Pasien baru terdaftar bulanan",
      bpControlled: "TD terkontrol",
      bpUncontrolled: "TD tidak terkontrol",
      noVisit3Months: "Tidak ada kunjungan dalam 3 bulan terakhir",
    },
  },

  // Cohort Reports
  cohortReports: {
    title: "Laporan kohort",
    description:
      "Hasil untuk pasien terdaftar di setiap kuartal, ditampilkan berdasarkan kunjungan terakhir mereka di kuartal berikutnya",
    cohort: "kohort {quarter}",
    patients: "{count} pasien",
    resultFrom: "Hasil dari kunjungan terakhir di {quarter}",
    key: {
      bpControlled: "TD terkontrol",
      bpUncontrolled: "TD tidak terkontrol",
      noVisitInQuarter: "Tidak ada kunjungan di kuartal",
    },
  },

  // Overdue Patients
  overdue: {
    overduePatients: {
      title: "Pasien terlambat",
      description: "Pasien yang terlambat pada awal bulan.",
      tooltipNumerator:
        "Pembilang: Pasien yang terlambat pada tanggal 1 bulan. Pasien yang ditandai 'Dihapus dari daftar' (647) dan pasien tanpa nomor telepon (241) dikecualikan.",
      tooltipDenominator:
        "Penyebut: Pasien dalam perawatan. Pasien yang meninggal (205) dan pasien hilang kontak 12 bulan (1.562) dikecualikan.",
      tooltipOverdue:
        "Pasien terlambat: Pasien dengan tanggal kunjungan terjadwal yang telah berlalu tanpa kunjungan.",
    },
    overduePatientsCalled: {
      title: "Pasien terlambat yang dihubungi",
      description: "Pasien yang dihubungi selama bulan tersebut.",
      tooltipNumerator:
        "Pembilang: Pasien terlambat unik yang dihubungi selama bulan tersebut.",
      tooltipDenominator:
        "Penyebut: Pasien yang terlambat pada tanggal 1 bulan. Pasien yang ditandai 'Dihapus dari daftar' (647) dan pasien tanpa nomor telepon (241) dikecualikan.",
    },
    overduePatientsReturned: {
      title: "Pasien terlambat yang kembali ke perawatan",
      description:
        "Pasien yang kembali ke perawatan dalam 15 hari setelah dihubungi.",
      tooltipNumerator:
        "Pembilang: Pasien yang kembali ke perawatan dalam 15 hari setelah panggilan pertama mereka.",
      tooltipDenominator:
        "Penyebut: Jumlah pasien terlambat unik yang dihubungi selama bulan tersebut.",
    },
  },
};
