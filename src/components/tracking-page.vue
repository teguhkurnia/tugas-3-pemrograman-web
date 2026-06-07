<script lang="ts">
import AddDoModal from "./tracking/add-do-modal.vue";
import SearchDo from "./tracking/search-do.vue";
import TrackingResult from "./tracking/tracking-result.vue";

interface DataState {
  upbjjList: Upbjj[];
  paketList: Paket[];
  deliveryOrders: DeliveryOrder[];
  showForm: boolean;
  searchResult: DeliveryOrder | null;
  errorMessage: string;
}

export default {
  name: "DeliveryTracker",
  components: {
    SearchDo,
    TrackingResult,
    AddDoModal,
  },
  data(): DataState {
    return {
      upbjjList: [
        { id: 1, nama: "Jakarta", ekspedisi: "JNE Regular" },
        { id: 2, nama: "Bandung", ekspedisi: "JNE Express" },
        { id: 3, nama: "Surabaya", ekspedisi: "JNE Regular" },
      ],
      paketList: [
        {
          id: 1,
          kodePaket: "PAK001",
          namaPaket: "PAKET IPS Dasar",
          isi: ["EKMA4116", "EKMA4115"],
          harga: 120000,
        },
        {
          id: 2,
          kodePaket: "PAK002",
          namaPaket: "PAKET IPA Dasar",
          isi: ["BIOL4201", "FISIP4001"],
          harga: 140000,
        },
      ],
      deliveryOrders: [
        {
          noDO: "DO2025-001",
          nim: "031234567",
          nama: "Budi Santoso",
          ekspedisi: "JNE Regular",
          upbjj: "Jakarta",
          kodePaket: "PAK001",
          tanggalKirim: "2025-01-15",
          totalHarga: 150000,
          status: "delivered",
          timeline: [
            {
              tanggal: "2025-01-15",
              jam: "08:30",
              status: "Dikemas",
              lokasi: "Jakarta",
              deskripsi: "Paket dikemas dan siap dikirim",
            },
          ],
        },
      ],
      showForm: false,
      searchResult: null,
      errorMessage: "",
    };
  },
  computed: {
    nextNoDO(): string {
      const year = new Date().getFullYear();
      const currentYear = this.deliveryOrders.filter((delivery) =>
        delivery.noDO.includes(`DO${year}`),
      );
      const sequence = currentYear.length + 1;
      return `DO${year}-${String(sequence).padStart(3, "0")}`;
    },
  },
  methods: {
    handleSearch(query: string) {
      this.errorMessage = "";
      this.searchResult = null;

      const result = this.deliveryOrders.find(
        (delivery) => delivery.noDO === query.trim(),
      );

      if (result) {
        this.searchResult = result;
      } else {
        this.errorMessage = `Nomor DO "${query}" tidak dapat ditemukan di dalam sistem!`;
      }
    },

    getCurrentTime() {
      const now = new Date();
      return `${String(now.getHours()).padStart(2, "0")}:${String(
        now.getMinutes(),
      ).padStart(2, "0")}`;
    },

    getTimeOffset(time: string, hours: number) {
      const [h, m] = time.split(":").map(Number);
      const newHour = (Number(h) + hours) % 24;
      return `${String(newHour).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
    },

    handleSaveDO(payload: {
      form: any;
      selectedPaket: Paket;
      selectedUpbjj: Upbjj;
    }) {
      const { form, selectedPaket, selectedUpbjj } = payload;
      const noDO = this.nextNoDO;

      const initialTimeline: TimelineEvent[] = [
        {
          tanggal: form.tanggalKirim,
          jam: this.getCurrentTime(),
          status: "Dikemas",
          lokasi: selectedUpbjj.nama,
          deskripsi: "Paket dikemas dan siap dikirim",
        },
        {
          tanggal: form.tanggalKirim,
          jam: this.getTimeOffset(this.getCurrentTime(), 6),
          status: "Dikirim",
          lokasi: selectedUpbjj.nama,
          deskripsi: "Paket dikirim ke kurir ekspedisi",
        },
      ];

      const newDO: DeliveryOrder = {
        noDO: noDO,
        nim: form.nim,
        nama: form.nama,
        ekspedisi: form.ekspedisi,
        upbjj: selectedUpbjj.nama,
        kodePaket: form.kodePaket,
        tanggalKirim: form.tanggalKirim,
        totalHarga: selectedPaket.harga,
        status: "shipped",
        timeline: initialTimeline,
      };

      this.deliveryOrders.push(newDO);
      this.showForm = false;
      this.handleSearch(noDO);
    },
  },
};
</script>

<template>
  <div>
    <SearchDO
      :errorMessage="errorMessage"
      @search="handleSearch"
      @openForm="showForm = true"
    />

    <TrackingResult v-if="searchResult" :result="searchResult" />

    <AddDOModal
      :show="showForm"
      :upbjjList="upbjjList"
      :paketList="paketList"
      @close="showForm = false"
      @save="handleSaveDO"
    />
  </div>
</template>
