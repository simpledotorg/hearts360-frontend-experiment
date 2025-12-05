<template>
  <div class="hearts360-dashboard">
    <div>
      <TheNav @navigate="handleNavigation" />
      <Breadcrumbs :currentPage="currentPage" @navigate="handleNavigation" />
    </div>
    <div>
      <HTNDashboard v-if="currentPage === 'dashboard'" />
      <Upload v-else-if="currentPage === 'upload'" />
    </div>
    <Footer />
  </div>
</template>

<script setup>
import { ref } from "vue";
import TheNav from "./components/TheNav.vue";
import Breadcrumbs from "./components/Breadcrumbs.vue";
import Upload from "./components/Upload.vue";
import HTNDashboard from "./components/HTNDashboard.vue";
import Footer from "./components/Footer.vue";

// Current page state
const currentPage = ref("dashboard");

// Handle navigation from TheNav
const handleNavigation = (page) => {
  currentPage.value = page;
};
</script>

<style scoped>
.hearts360-dashboard {
  min-height: 100dvh;
  container-name: hearts360-dashboard;
  container-type: inline-size;
  display: grid;
  grid-template-rows: auto 1fr auto;
}

</style>
