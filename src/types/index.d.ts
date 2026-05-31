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
