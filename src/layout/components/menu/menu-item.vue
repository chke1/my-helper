<template>
  <template v-for="item in menus" :key="item.path">
    <template v-if="item.children && item.children.length">
      <el-sub-menu :index="item.path" :key="item.path">
        <template #title>
          <el-icon v-if="item.meta.icon" :size="16">
            <component :is="iconsMap[item.name]"></component>
          </el-icon>
          <span>{{ item.meta.title }}</span>
        </template>
        <menu-item :menus="item.children"></menu-item>
      </el-sub-menu>
    </template>
    <template v-else>
      <el-menu-item :index="item.path" :key="item.path">
        <el-icon v-if="item.meta.icon" :size="16">
          <component :is="iconsMap[item.name]"></component>
        </el-icon>
        <template #title>{{ item.meta.title }}</template>
      </el-menu-item>
    </template>
  </template>
</template>

<script setup name="menu-item">
import iconsMap from '@/utils/menu-icons.js';

const props = defineProps({
  menus: {
    type: Array,
    default: () => [],
  },
});
</script>
