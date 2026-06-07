declare interface Stock {
  kode: string;
  judul: string;
  kategori: string;
  upbjj: string;
  lokasiRak: string;
  harga: number;
  qty: number;
  safety: number;
  catatanHTML: string;
}

declare interface Filter {
  upbjj: string;
  kategori: string;
  reorderWarning: boolean;
}

declare interface TimelineEvent {
  tanggal: string;
  jam: string;
  status: string;
  lokasi: string;
  deskripsi: string;
}

declare interface DeliveryOrder {
  noDO: string;
  nim: string;
  nama: string;
  ekspedisi: string;
  upbjj: string;
  kodePaket: string;
  tanggalKirim: string;
  totalHarga: number;
  status: string;
  timeline: TimelineEvent[];
}

declare interface Upbjj {
  id: number;
  nama: string;
  ekspedisi: string;
}

declare interface Paket {
  id: number;
  kodePaket: string;
  namaPaket: string;
  isi: string[];
  harga: number;
}
