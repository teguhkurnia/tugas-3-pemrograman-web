<script lang="ts">
export default {
  props: {
    openModal: {
      type: Boolean,
      required: true,
    },
    initialData: {
      type: Object,
      required: false,
    },
  },
  data() {
    return {
      form: {
        kode: "",
        judul: "",
        upbjj: "",
        lokasiRak: "",
        kategori: "",
        harga: 0,
        qty: 0,
        safety: 0,
        catatanHTML: "",
      },
    };
  },
  watch: {
    initialData: {
      handler(newData) {
        if (newData) {
          this.form = { ...newData };
        } else {
          this.resetForm();
        }
      },
      immediate: true,
    },
  },
  emits: ["close", "save"],
  methods: {
    resetForm() {
      this.form = {
        kode: "",
        judul: "",
        upbjj: "",
        lokasiRak: "",
        kategori: "",
        harga: 0,
        qty: 0,
        safety: 0,
        catatanHTML: "",
      };
    },
    closeModal() {
      this.$emit("close");
    },
    saveItem() {
      this.$emit("save", this.form);
    },
  },
};
</script>

<template>
  <div id="modalTambah" class="modal-overlay" :class="{ show: openModal }">
    <div class="modal-content">
      <div class="modal-header">
        <h2>Tambah Stok Bahan Ajar</h2>
        <i class="bx bx-x modal-close" @click="closeModal()"></i>
      </div>
      <div class="modal-body">
        <form id="formTambahStok" @submit.prevent="saveItem()">
          <div class="form-grid">
            <div class="input-group">
              <label>Kode Barang (Mata Kuliah)</label>
              <input
                type="text"
                id="inKodeBarang"
                placeholder="Misal: EKMA4116"
                required
                v-model="form.kode"
              />
            </div>
            <div class="input-group">
              <label>Nama Barang (Modul)</label>
              <input
                type="text"
                id="inNamaBarang"
                placeholder="Misal: Pengantar Manajemen"
                required
                v-model="form.judul"
              />
            </div>

            <div class="input-group">
              <label>UT Daerah (UPBJJ)</label>
              <input
                type="text"
                id="inUpbjj"
                placeholder="Misal: Jakarta"
                required
                v-model="form.upbjj"
              />
            </div>
            <div class="input-group">
              <label>Lokasi Rak</label>
              <input
                type="text"
                id="inLokasiRak"
                placeholder="Misal: R1-A3"
                required
                v-model="form.lokasiRak"
              />
            </div>

            <div class="input-group">
              <label>Kategori</label>
              <select id="inKategori" required v-model="form.kategori">
                <option value="">-- Pilih Kategori --</option>
                <option value="MK Wajib">MK Wajib</option>
                <option value="MK Pilihan">MK Pilihan</option>
                <option value="Praktikum">Praktikum</option>
              </select>
            </div>
            <div class="input-group">
              <label>Harga (Rp)</label>
              <input
                type="number"
                id="inHarga"
                min="0"
                placeholder="Misal: 65000"
                required
                v-model.number="form.harga"
              />
            </div>

            <div class="input-group">
              <label>Total Stok</label>
              <input
                type="number"
                id="inQty"
                min="0"
                placeholder="Misal: 150"
                required
                v-model.number="form.qty"
              />
            </div>
            <div class="input-group">
              <label>Safety Stok</label>
              <input
                type="number"
                id="inSafety"
                min="0"
                placeholder="Misal: 20"
                required
                v-model.number="form.safety"
              />
            </div>

            <div class="input-group full-width">
              <label>Catatan</label>
              <textarea
                id="inCatatan"
                placeholder="Misal: Edisi 2024, cetak ulang"
                v-model="form.catatanHTML"
              ></textarea>
            </div>
          </div>
          <div class="modal-actions">
            <button
              type="button"
              class="btn-secondary"
              id="btnBatal"
              @click="closeModal()"
            >
              Batal
            </button>
            <button type="submit" class="btn-primary">Simpan Data</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
