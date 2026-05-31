<script lang="ts">
export default {
  props: {
    filters: {
      type: Object,
      required: true,
    },
    upbjjList: {
      type: Array<string>,
      required: true,
    },
    kategoriList: {
      type: Array<string>,
      required: true,
    },
    sortBy: {
      type: String,
      required: false,
    },
    sortOrder: {
      type: String,
      required: false,
    },
  },
  emits: ["update:filters", "update:sortBy", "update:sortOrder"],
  methods: {
    resetFilters() {
      this.$emit("update:filters", {
        upbjj: "",
        kategori: "",
        reorderWarning: false,
      });
      this.$emit("update:sortBy", "judul");
      this.$emit("update:sortOrder", "asc");
    },
  },
};
</script>

<template>
  <!-- Filter Section -->
  <div class="filter-section">
    <div class="filter-header">
      <h3><i class="bx bx-filter"></i> Filter & Sort</h3>
      <button
        class="btn-reset"
        @click="resetFilters()"
        v-if="
          filters.upbjj || filters.kategori || filters.reorderWarning || sortBy
        "
      >
        <i class="bx bx-reset"></i>
        <span>Reset Filter</span>
      </button>
    </div>

    <div class="filter-grid">
      <div class="filter-group">
        <label>UT-Daerah</label>
        <select v-model="filters.upbjj" class="filter-select">
          <option value="">-- Semua UT-Daerah --</option>
          <option v-for="upbjj in upbjjList" :key="upbjj" :value="upbjj">
            {{ upbjj }}
          </option>
        </select>
      </div>

      <div class="filter-group" v-if="filters.upbjj">
        <label>Kategori Mata Kuliah</label>
        <select
          v-model="filters.kategori"
          class="filter-select"
          :disabled="!filters.upbjj"
        >
          <option value="">-- Semua Kategori --</option>
          <option
            v-for="kategori in kategoriList"
            :key="kategori"
            :value="kategori"
          >
            {{ kategori }}
          </option>
        </select>
      </div>

      <div class="filter-group checkbox-group">
        <label class="checkbox-label">
          <input type="checkbox" v-model="filters.reorderWarning" />
          <span>
            <i class="bx bx-info-circle"></i>
            Tampilkan yang perlu reorder
          </span>
        </label>
        <small>Menampilkan stok = 0 atau stok < safety stok</small>
      </div>
    </div>
  </div>
</template>
