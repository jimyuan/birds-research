<template>
  <section class="container">
    <el-menu :default-active="activeIndex"
      mode="horizontal"
      @select="handleSelect">
      <el-menu-item index="1">aa</el-menu-item>
      <el-menu-item index="2">bb</el-menu-item>
      <el-menu-item index="3">cc</el-menu-item>
    </el-menu>
    <bar-chart :option="option"></bar-chart>
    {{ formatNumber(12344566) }}
  </section>
</template>

<script setup>
import { reactive, ref } from 'vue'
import BarChart from '@/components/BarChart.vue'
import { formatNumber } from '@/utils';

// 使用示例
const activeIndex = ref( '1' )
const option = reactive( {
  title: { text: 'Vue3 + ECharts 示例' },
  xAxis: { data: [ 'A', 'B', 'C', 'D', 'E' ] },
  yAxis: { type: 'value' },
  series: [ {
    name: '数据1',
    type: 'bar',
    data: [ 10, 22, 28, 43, 49 ]
  }, {
    name: '数据2',
    type: 'bar',
    data: [ 4, 16, 33, 20, 67 ]
  } ]
} )

const handleSelect = ( key, keyPath ) => {
  myCon.log( key, keyPath )
}
</script>