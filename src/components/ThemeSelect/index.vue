<template>
  <!-- 主题图标 v-bind：https://v3.cn.vuejs.org/api/instance-properties.html#attrs -->
  <!--v-bind="$attrs" 父祖件使用的屬性會綁定在這邊-->
  <el-dropdown
    v-bind="$attrs"
    trigger="click"
    class="theme"
    @command="handleSetTheme"
  >
    <div>
      <el-tooltip :content="$t('navBar.themeChange')">
        <svg-icon icon="change-theme" />
      </el-tooltip>
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item command="color">
          {{ $t('theme.themeColorChange') }}
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
  <!-- 展示弹出层 -->
  <SelectColor v-model="selectColorVisible"></SelectColor>
</template>

<script setup>
import { ref } from 'vue'
import SelectColor from './components/SelectColor.vue'
const selectColorVisible = ref(false)
const handleSetTheme = (command) => {
  selectColorVisible.value = true
}
</script>

<style lang="scss" scoped></style>
