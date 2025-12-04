<template>
  <footer class="dashboard-footer">
    <div class="footer-content">
      <p>&copy; {{ currentYear }} HEARTS360 Dashboard</p>
      <div class="version-info">
        <span class="version-text">v{{ currentVersion }}</span>

      </div>
      <a href="#" @click.prevent="" class="checking-update">Newer version available ↗</a>
    </div>
  </footer>
</template>

<script setup>
import { computed, ref, onMounted } from 'vue'
import { CURRENT_VERSION, checkForUpdates } from '../utils/version.js'

const currentYear = computed(() => new Date().getFullYear())
const currentVersion = ref(CURRENT_VERSION)
const latestVersion = ref(null)
const updateAvailable = ref(false)
const checkingUpdate = ref(false)

onMounted(async () => {
  checkingUpdate.value = true
  try {
    const updateInfo = await checkForUpdates()
    updateAvailable.value = updateInfo.available
    latestVersion.value = updateInfo.version
  } catch (error) {
    console.warn('Error checking for updates:', error)
  } finally {
    checkingUpdate.value = false
  }
})
</script>

<style scoped>
.dashboard-footer {
  border-top: 1px solid rgba(0, 0, 0, 0.15);
  width: 100%;
  max-width: 1600px;
  margin: 48px auto 0;
  padding: 1rem 1.5rem;
  @media screen and (max-width: 660px) {
    padding: 1rem;
  }
}

.footer-content {
  text-align: center;
  font-size: 0.9rem;
  color: rgba(0, 0, 0, 0.7);
  display: flex;
  /* flex-direction: column; */
  gap: 0.5rem;
}

.footer-content p {
  margin: 0;
}

.version-info {
  font-size: 0.85rem;
}

.version-text {
  font-weight: 500;
  background: #dedede;
  padding: 4px 8px;
  border-radius: 4px;
}

.update-available {
  color: #0175eb;
}

.update-link {
  text-decoration: none;
  font-weight: 500;
}

.update-link:hover {
  text-decoration: underline;
}

.checking-update {
  /* text-decoration: none; */
  text-decoration: underline;
  text-underline-offset: 2px;
  font-weight: 400;
  color: rgba(0, 0, 0, 0.7);

}

.checking-update:hover {
  text-decoration: underline;
}
</style>

