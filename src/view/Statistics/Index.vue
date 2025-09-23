<template>
  <section class="container">
    <el-menu :default-active="activeIndex"
      router
      mode="horizontal"
      @select="handleSelect">
      <el-menu-item :index="nav.path"
        v-for="nav of navData.list"
        :key="nav.path">{{ nav.name }}</el-menu-item>
    </el-menu>
    <router-view></router-view>

  </section>
</template>

<script setup>
import { reactive, ref } from 'vue'

// 使用示例
const activeIndex = ref( 'all-year' )
const navData = reactive( {
  list: [
    { path: 'all-year', name: '全年鸟况' },
    { path: 'common-spec', name: '种群概况' }
  ]
} )


/**
 * 1. 全年鸟况：每月鸟种数 barchart * linechart；目占比 piechart
 * 2. 鸟种密度：全年记录次数最多的 10~20 大鸟种 barchart； 目占比&科占比 piechart
 * 3. 
 */

const handleSelect = ( key, keyPath ) => {
  // myCon.log( key, keyPath )
}
</script>