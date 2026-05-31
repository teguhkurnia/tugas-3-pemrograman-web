<script lang="ts">
export default {
  props: {
    activePage: {
      type: String,
      required: true,
    },
  },
  emits: ["changePage"],
  methods: {
    changePage(page: string) {
      this.$emit("changePage", page);
    },
  },
};
</script>

<template>
  <aside class="sidebar">
    <div class="sidebar-header">
      <div class="logo-ut">
        <img src="/img/logo_ut.png" alt="Logo UT" />
      </div>
      <div class="brand">
        <h2>Portal UT</h2>
        <span>Bahan Ajar</span>
      </div>
    </div>

    <ul class="nav-links">
      <li :class="{ active: activePage === 'stock' }">
        <button @click="changePage('stock')" class="nav-link">
          <i class="bx bx-book-open"></i> <span>Informasi Bahan Ajar</span>
        </button>
      </li>
      <li :class="{ active: activePage === 'tracking' }">
        <button @click="changePage('tracking')" class="nav-link">
          <i class="bx bx-bus"></i> <span>Tracking Pengiriman</span>
        </button>
      </li>
    </ul>

    <div class="sidebar-footer">
      <a href="#" id="logoutBtn" class="logout"
        ><i class="bx bx-log-out"></i> <span>Keluar Sistem</span></a
      >
    </div>
  </aside>
</template>
