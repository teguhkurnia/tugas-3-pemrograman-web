<script lang="ts">
export default {
  props: {
    data: {
      type: Array,
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
  computed: {
    sortedData() {
      if (!this.sortBy) return this.data;

      return [...this.data].sort((a, b) => {
        const valA = a[this.sortBy];
        const valB = b[this.sortBy];

        if (typeof valA === "number" && typeof valB === "number") {
          return this.sortOrder === "asc" ? valA - valB : valB - valA;
        }

        const strA = String(valA).toLowerCase();
        const strB = String(valB).toLowerCase();
        if (strA < strB) return this.sortOrder === "asc" ? -1 : 1;
        if (strA > strB) return this.sortOrder === "asc" ? 1 : -1;
        return 0;
      });
    },
  },
};
</script>

<template>
  <div class="table-container stock-table-wrapper">
    <table class="data-table">
      <thead>
        <tr>
          <th>
            <button
              class="th-sort-btn"
              :class="{ active: sortBy === 'judul' }"
              @click="handleSort('judul')"
              title="Klik untuk sort"
            >
              Kode & Nama Barang
              <i
                v-if="sortBy === 'judul'"
                class="bx"
                :class="{
                  'bx-sort-up': sortOrder === 'asc',
                  'bx-sort-down': sortOrder === 'desc',
                }"
              ></i>
            </button>
          </th>
          <th>Kategori</th>
          <th>UT Daerah</th>
          <th>Lokasi Rak</th>
          <th>
            <button
              class="th-sort-btn"
              :class="{ active: sortBy === 'qty' }"
              @click="handleSort('qty')"
              title="Klik untuk sort"
            >
              Total Stok
              <i
                v-if="sortBy === 'qty'"
                class="bx"
                :class="{
                  'bx-sort-up': sortOrder === 'asc',
                  'bx-sort-down': sortOrder === 'desc',
                }"
              ></i>
            </button>
          </th>
          <th>
            <button
              class="th-sort-btn"
              :class="{ active: sortBy === 'harga' }"
              @click="handleSort('harga')"
              title="Klik untuk sort"
            >
              Harga
              <i
                v-if="sortBy === 'harga'"
                class="bx"
                :class="{
                  'bx-sort-up': sortOrder === 'asc',
                  'bx-sort-down': sortOrder === 'desc',
                }"
              ></i>
            </button>
          </th>
          <th>Catatan</th>
          <th>Aksi</th>
        </tr>
      </thead>
      <tbody id="tableBodyStok">
        <tr v-for="item in sortedData">
          <td>
            <div class="book-title">
              <strong>{{ item.kode }}</strong>
              <span>{{ item.judul }}</span>
            </div>
          </td>
          <td>
            <span
              class="badge"
              :class="{
                success: item.kategori === 'MK Wajib',
                warning: item.kategori === 'MK Pilihan',
                info: item.kategori === 'Praktikum',
              }"
            >
              {{ item.kategori }}
            </span>
          </td>
          <td>{{ item.upbjj }}</td>
          <td>{{ item.lokasiRak }}</td>
          <td>
            <span
              class="badge"
              :class="{
                success: item.qty > item.safety,
                error: item.qty === 0,
                warning: item.qty > 0 && item.qty <= item.safety,
              }"
            >
              {{ item.qty }}
            </span>
          </td>
          <td>Rp {{ item.harga.toLocaleString("id-ID") }}</td>
          <td v-html="item.catatanHTML"></td>
          <td>
            <button class="btn-edit" @click="openEditModal(item)">
              <i class="bx bx-edit"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
