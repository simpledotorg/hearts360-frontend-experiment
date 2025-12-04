<template>
  <!-- Banner -->
  <div class="banner">
    <div class="banner-body">
      <div class="region-nav">
        <div class="hover-button">{{ $t('nav.chooseRegion') }}</div>
        <div class="card nav-hover-content">
          <div class="hover-button hover-button-hover-state">
            {{ $t('nav.chooseRegion') }}
          </div>
          <form class="search-form">
            <input
              v-model="regionSearch"
              type="search"
              class="region-search"
              :placeholder="$t('nav.searchPlaceholder')"
            />
          </form>
          <ul class="nav-list">
            <li class="region-national"><a href="#">{{ $t('nav.national') }}</a></li>
            <li class="region-state">
              <a href="#">{{ $t('nav.appleState') }}</a>
            </li>
          </ul>
        </div>
      </div>

      <h1>
        <div class="logo">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill-opacity="1.0"
            fill="white"
          >
            <path
              d="M16.5 3C19.5376 3 22 5.5 22 9C22 16 14.5 20 12 21.5C10.0226 20.3135 4.91699 17.563 2.86894 13.001L1 13V11L2.21045 11.0009C2.07425 10.3633 2 9.69651 2 9C2 5.5 4.5 3 7.5 3C9.35997 3 11 4 12 5C13 4 14.64 3 16.5 3ZM16.5 5C15.4241 5 14.2593 5.56911 13.4142 6.41421L12 7.82843L10.5858 6.41421C9.74068 5.56911 8.5759 5 7.5 5C5.55906 5 4 6.6565 4 9C4 9.68542 4.09035 10.3516 4.26658 11.0004L6.43381 11L8.5 7.55635L11.5 12.5563L12.4338 11H17V13H13.5662L11.5 16.4437L8.5 11.4437L7.56619 13L5.10789 13.0006C5.89727 14.3737 7.09304 15.6681 8.64514 16.9029C9.39001 17.4955 10.1845 18.0485 11.0661 18.6038C11.3646 18.7919 11.6611 18.9729 12 19.1752C12.3389 18.9729 12.6354 18.7919 12.9339 18.6038C13.8155 18.0485 14.61 17.4955 15.3549 16.9029C18.3337 14.533 20 11.9435 20 9C20 6.64076 18.463 5 16.5 5Z"
            ></path>
          </svg>
        </div>
        <span>{{ $t('nav.hearts360') }}</span>360
      </h1>

      <div class="flex justify-end items-center gap-2">
        <div class="language-selector relative">
          <button 
            @click="showLanguageMenu = !showLanguageMenu"
            class="bg-gray-600 hover:bg-gray-700 px-4 h-9 flex items-center justify-center rounded-md text-white text-sm"
            type="button"
          >
            {{ currentLanguageLabel }}
          </button>
          <div 
            v-if="showLanguageMenu"
            class="absolute right-0 mt-1 bg-white rounded-md shadow-lg border border-gray-200 min-w-[150px] z-50"
          >
            <button
              @click="changeLanguage('en')"
              class="w-full text-left px-4 py-2 hover:bg-gray-100 rounded-t-md text-sm"
              :class="{ 'bg-blue-50 font-semibold': locale.value === 'en' }"
            >
              {{ $t('nav.english') }}
            </button>
            <button
              @click="changeLanguage('id')"
              class="w-full text-left px-4 py-2 hover:bg-gray-100 rounded-b-md text-sm"
              :class="{ 'bg-blue-50 font-semibold': locale.value === 'id' }"
            >
              {{ $t('nav.indonesian') }}
            </button>
          </div>
        </div>
        <a class="bg-blue-400 px-10! h-9 flex items-center justify-center rounded-md" href="#">{{ $t('nav.uploadData') }}</a>
      </div>
    </div>
  </div>
  <TheNavDashboardLinks />
</template>

<script setup>
import TheNavDashboardLinks from './TheNavDashboardLinks.vue'
import { useDashboardStore } from '../stores/dashboard'
import { computed, ref, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'

const store = useDashboardStore()
const { locale, t } = useI18n()

const regionSearch = computed({
  get: () => store.regionSearch,
  set: (value) => { store.regionSearch = value }
})

const showLanguageMenu = ref(false)

const currentLanguageLabel = computed(() => {
  return locale.value === 'en' ? t('nav.english') : t('nav.indonesian')
})

const changeLanguage = (lang) => {
  locale.value = lang
  showLanguageMenu.value = false
  // Save to localStorage for persistence
  localStorage.setItem('preferred-language', lang)
}

// Close menu when clicking outside
const handleClickOutside = (event) => {
  if (!event.target.closest('.language-selector')) {
    showLanguageMenu.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>