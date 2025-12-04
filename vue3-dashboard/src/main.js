import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createI18n } from 'vue-i18n'
import './style.css'
import App from './App.vue'
import en from './locales/en.js'
import id from './locales/id.js'

// Load saved language preference or default to 'en'
const savedLang = localStorage.getItem('preferred-language')
const defaultLocale = (savedLang && (savedLang === 'en' || savedLang === 'id')) ? savedLang : 'en'

const i18n = createI18n({
  legacy: false, // Use Composition API mode
  locale: defaultLocale,
  fallbackLocale: 'en',
  globalInjection: true, // Enable $t in templates
  messages: {
    en,
    id
  }
})

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(i18n)
app.mount('#app')

