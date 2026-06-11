<script lang="ts">
export default {
  props: {
    result: {
      type: Object as () => DeliveryOrder,
      required: true,
    },
  },
  methods: {
    getStatusInfo(status: string) {
      const statusMap: Record<string, { label: string; color: string }> = {
        shipped: { label: "Dalam Pengiriman", color: "info" },
        transit: { label: "Dalam Transit", color: "warning" },
        delivered: { label: "Diterima", color: "success" },
      };
      return statusMap[status] || { label: "Tidak Diketahui", color: "muted" };
    },

    getStatusProgress(status: string) {
      const progressMap: Record<string, number> = {
        shipped: 50,
        transit: 75,
        delivered: 100,
      };
      return progressMap[status] || 0;
    },

    formatCurrency(amount: number) {
      return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
      }).format(amount);
    },

    formatDate(dateString: string) {
      return new Date(dateString).toLocaleDateString("id-ID", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    },
  },
};
</script>

<template>
  <section class="tracking-result-section">
    <div class="tracking-grid">
      <div class="detail-card">
        <div class="card-header">
          <h3><i class="bx bx-receipt"></i> Informasi Pemesanan</h3>
          <span class="badge" :class="getStatusInfo(result.status).color">
            {{ getStatusInfo(result.status).label }}
          </span>
        </div>
        <div class="info-list">
          <div class="info-item">
            <span class="label">Penerima (Mahasiswa)</span>
            <span class="value">{{ result.nama }}</span>
          </div>
          <div class="info-item">
            <span class="label">NIM</span>
            <span class="value">{{ result.nim }}</span>
          </div>
          <div class="info-item">
            <span class="label">Nomor DO</span>
            <span class="value">{{ result.noDO }}</span>
          </div>
          <div class="info-item">
            <span class="label">Kurir Ekspedisi</span>
            <span class="value">{{ result.ekspedisi }}</span>
          </div>
          <div class="info-item">
            <span class="label">UT-Daerah</span>
            <span class="value">{{ result.upbjj }}</span>
          </div>
          <div class="info-item">
            <span class="label">Tanggal Kirim</span>
            <span class="value">{{ formatDate(result.tanggalKirim) }}</span>
          </div>
          <div class="info-item">
            <span class="label">Kode Paket</span>
            <span class="value">{{ result.kodePaket }}</span>
          </div>
          <div class="info-item highlight-total">
            <span class="label">Total Pembayaran DO</span>
            <strong class="value">{{
              formatCurrency(result.totalHarga)
            }}</strong>
          </div>
        </div>
      </div>

      <div class="timeline-card">
        <div class="card-header">
          <h3><i class="bx bx-map-alt"></i> Perjalanan Paket</h3>
        </div>

        <div class="progress-container">
          <div class="progress-bar">
            <div
              class="progress-fill"
              :style="{ width: getStatusProgress(result.status) + '%' }"
            ></div>
          </div>
          <div class="progress-labels">
            <span>Dikemas</span>
            <span>Dikirim</span>
            <span>Transit</span>
            <span>Diterima</span>
          </div>
        </div>

        <div class="timeline">
          <div
            v-for="(event, index) in result.timeline"
            :key="index"
            class="timeline-event"
          >
            <div
              class="timeline-dot"
              :class="{ active: index < result.timeline.length }"
            ></div>
            <div class="timeline-content">
              <div class="timeline-status">
                {{ event.status }}
              </div>
              <div class="timeline-datetime">
                {{ formatDate(event.tanggal) }} - {{ event.jam }}
              </div>
              <div class="timeline-location">
                <i class="bx bx-location-plus"></i>
                {{ event.lokasi }}
              </div>
              <div class="timeline-description">
                {{ event.deskripsi }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
