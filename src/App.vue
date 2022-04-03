<template>
  <div class="app-main">
    <el-config-provider :locale="store.getters.language === 'en' ? en : zhCn">
      <router-view></router-view>
    </el-config-provider>
  </div>
</template>

<script setup>
import { useStore } from 'vuex'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import en from 'element-plus/lib/locale/lang/en'
const store = useStore()

</script>

<style lang="scss" scoped>
.app-main {
  min-height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  overflow: hidden;
  //padding: 61px 20px 20px 20px;
  box-sizing: border-box;
}
</style>
