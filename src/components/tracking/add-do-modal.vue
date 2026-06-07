<script lang="ts">
const initialForm = {
  nim: "",
  nama: "",
  upbjjId: "",
  kodePaket: "",
  ekspedisi: "",
  tanggalKirim: new Date().toISOString().split("T")[0],
};

export default {
  name: "AddDOModal",
  props: {
    show: {
      type: Boolean,
      required: true,
    },
    upbjjList: {
      type: Array<Upbjj>,
      required: true,
    },
    paketList: {
      type: Array<Paket>,
      required: true,
    },
  },
  data() {
    return {
      form: initialForm,
    };
  },
  computed: {
    selectedPaket(): Paket | undefined {
      return this.paketList.find((p) => p.kodePaket === this.form.kodePaket);
    },
    selectedUpbjj(): Upbjj | undefined {
      return this.upbjjList.find((u) => u.id === parseInt(this.form.upbjjId));
    },
  },
  watch: {
    "form.upbjjId": function (newUpbjjId) {
      if (newUpbjjId) {
        const upbjj = this.upbjjList.find((u) => u.id === parseInt(newUpbjjId));
        this.form.ekspedisi = upbjj ? upbjj.ekspedisi : "";
      } else {
        this.form.ekspedisi = "";
      }
    },
  },
  methods: {
    getInitialForm() {
      return initialForm;
    },
    formatCurrency(amount: number) {
      return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
      }).format(amount);
    },
    handleClose() {
      this.form = this.getInitialForm();
      this.$emit("close");
    },
    handleSave() {
      if (
        !this.form.nim ||
        !this.form.nama ||
        !this.form.upbjjId ||
        !this.form.kodePaket ||
        !this.form.ekspedisi
      ) {
        alert("Semua field harus diisi!");
        return;
      }

      if (!this.selectedPaket || this.selectedPaket.harga === 0) {
        alert("Paket tidak valid. Silakan pilih paket lagi!");
        return;
      }

      if (!this.selectedUpbjj || !this.selectedUpbjj.nama) {
        alert("UPBJJ tidak valid. Silakan pilih UPBJJ lagi!");
        return;
      }

      this.$emit("save", {
        form: { ...this.form },
        selectedPaket: this.selectedPaket,
        selectedUpbjj: this.selectedUpbjj,
      });

      this.form = this.getInitialForm();
    },
  },
};
</script>

<template>
  <div v-if="show" class="modal-overlay" @click.self="handleClose">
    <div class="modal-content modal-do">
      <div class="modal-header">
        <h2>Tambah Delivery Order Baru</h2>
        <i class="bx bx-x modal-close" @click="handleClose"></i>
      </div>
      <div class="modal-body">
        <form @submit.prevent="handleSave">
          <div class="form-grid">
            <div class="input-group">
              <label>NIM Mahasiswa *</label>
              <input
                type="text"
                v-model="form.nim"
                placeholder="Contoh: 031234567"
                required
              />
            </div>

            <div class="input-group">
              <label>Nama Mahasiswa *</label>
              <input
                type="text"
                v-model="form.nama"
                placeholder="Contoh: Budi Santoso"
                required
              />
            </div>

            <div class="input-group">
              <label>UT-Daerah (UPBJJ) *</label>
              <select v-model="form.upbjjId" required>
                <option value="">-- Pilih UT-Daerah --</option>
                <option
                  v-for="upbjj in upbjjList"
                  :key="upbjj.id"
                  :value="upbjj.id.toString()"
                >
                  {{ upbjj.nama }}
                </option>
              </select>
            </div>

            <div class="input-group">
              <label>Paket Bahan Ajar *</label>
              <select v-model="form.kodePaket" required>
                <option value="">-- Pilih Paket --</option>
                <option
                  v-for="paket in paketList"
                  :key="paket.id"
                  :value="paket.kodePaket"
                >
                  {{ paket.kodePaket }} - {{ paket.namaPaket }}
                </option>
              </select>
            </div>

            <div class="input-group">
              <label>Tanggal Kirim *</label>
              <input type="date" v-model="form.tanggalKirim" required />
            </div>
          </div>

          <div v-if="selectedPaket" class="paket-details">
            <h4>Detail Isi Paket: {{ selectedPaket.namaPaket }}</h4>
            <div class="paket-items">
              <div
                v-for="(item, index) in selectedPaket.isi"
                :key="index"
                class="paket-item"
              >
                <span class="item-code">{{ item }}</span>
              </div>
            </div>
            <h4>Expedisi: {{ form.ekspedisi }}</h4>
            <h4>
              Estimasi Biaya Kirim: {{ formatCurrency(selectedPaket.harga) }}
            </h4>
          </div>

          <div class="modal-actions">
            <button type="button" class="btn-secondary" @click="handleClose">
              Batal
            </button>
            <button type="submit" class="btn-primary">Simpan DO Baru</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
