<script lang="ts">
import AppSidebar from "./components/app-sidebar.vue";
import StockPage from "./components/stock-page.vue";

export default {
  components: {
    AppSidebar,
    StockPage,
  },
  data() {
    return {
      page: "stock",
    };
  },
};
</script>

<template>
  <app-sidebar :active-page="page" @changePage="page = $event"></app-sidebar>

  <main class="main-content">
    <header class="topbar">
      <div class="greeting-box">
        <h1>Informasi Bahan Ajar</h1>
        <p>Pantau jumlah ketersediaan stok modul dan bahan ajar UT-Daerah.</p>
      </div>

      <div class="profile-area">
        <div class="profile-info">
          <strong id="userName">User Name</strong>
          <span id="userRole">Role - Lokasi</span>
        </div>
        <div class="profile-avatar">
          <i class="bx bxs-user-circle"></i>
        </div>
      </div>
    </header>

    <div class="" v-if="page === 'stock'">
      <stock-page></stock-page>
    </div>
  </main>
</template>

<style scoped></style>
