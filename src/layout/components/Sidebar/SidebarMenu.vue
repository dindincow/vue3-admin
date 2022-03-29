<template>
  <!-- 一级 menu 菜单 -->
  <el-menu
    :default-active="activeMenu"
    :uniqueOpened="true"
    :background-color="$store.getters.cssVar.menuBg"
    :text-color="$store.getters.cssVar.menuText"
    :active-text-color="$store.getters.cssVar.menuActiveText"
    router
  >
    <SidebarItem
      v-for="item in routes"
      :key="item.path"
      :route="item"
    ></SidebarItem>
  </el-menu>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { filterRouters, generateMenus } from '@/utils/route'
import SidebarItem from './SidebarItem'

const router = useRouter()
const route = useRoute()
console.log(router.getRoutes())

// 生成對應路由表
const routes = computed(() => {
  const filterRoutes = filterRouters(router.getRoutes())
  return generateMenus(filterRoutes)
})

console.log(JSON.stringify(routes.value))

// 高亮 menu 的方法
const activeMenu = computed(() => {
  const { path } = route
  return path
})
</script>
