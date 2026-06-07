<script lang="ts">
export default {
  name: "SearchDO",
  props: {
    errorMessage: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      searchQuery: "",
    };
  },
  methods: {
    submitSearch() {
      if (this.searchQuery.trim()) {
        this.$emit("search", this.searchQuery);
      }
    },
  },
};
</script>

<template>
  <section class="search-section">
    <div class="search-card">
      <div class="search-header">
        <div>
          <h2>Cari Status Pengiriman DO (Delivery Order)</h2>
          <p>
            Masukkan nomor DO untuk melihat status terbaru paket mahasiswa Anda.
          </p>
        </div>
        <button class="btn-tambah-do" @click="$emit('openForm')">
          <i class="bx bx-plus"></i>
          <span>Tambah DO Baru</span>
        </button>
      </div>

      <form @submit.prevent="submitSearch" class="search-form">
        <div class="search-input-wrapper">
          <i class="bx bx-search-alt"></i>
          <input
            type="text"
            v-model="searchQuery"
            placeholder="Contoh: DO2025-001 atau DO2025-002"
            required
          />
          <button type="submit" class="btn-search">
            <span>Lacak Paket</span>
          </button>
        </div>
      </form>
      <div v-if="errorMessage" class="error-msg">
        {{ errorMessage }}
      </div>
    </div>
  </section>
</template>
