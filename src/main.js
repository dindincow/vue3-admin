import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import installElementPlus from './plugins/element'
// i18n （PS：导入放到 APP.vue 导入之前，因为后面我们会在 app.vue 中使用国际化内容）
import i18n from '@/i18n'

// 全局樣式
import './styles/index.scss'

// 导入 svgIcon
import installIcons from '@/icons'

// 導入permission
import './permission'

const app = createApp(App)
installIcons(app)
installElementPlus(app)
app.use(store).use(router).use(i18n).mount('#app')
