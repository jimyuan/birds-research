<template>
  <section class="container">
    <el-descriptions title="鸟种详情">
      <el-descriptions-item label="鸟种名">{{ species.specName
        }}</el-descriptions-item>
      <el-descriptions-item label="拉丁名"><i class="latin">{{ species.latin
          }}</i></el-descriptions-item>
      <el-descriptions-item label="英文名">{{ species.specEnName
        }}</el-descriptions-item>
      <el-descriptions-item label="记录数">{{ formatNumber(species.recordCount)
        }}</el-descriptions-item>
      <el-descriptions-item label="所属科">{{ species.familyName
        }}</el-descriptions-item>
      <el-descriptions-item label="所属目">{{ species.orderName
        }}</el-descriptions-item>
    </el-descriptions>
    <el-divider></el-divider>
    <chart-page :option="specMonthly"></chart-page>
    <p style="text-align: center;"><el-button type="primary"
        @click="goBack">返回</el-button></p>
  </section>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from '@/store'
import { formatNumber } from '@/utils'
import ChartPage from '@/components/ChartPage.vue'

const route = useRoute()
const store = useStore()
const species = computed( () => {
  return store.speciesList
    .find( v => v.id.toString() === route.params.id )
} )
const monthCount = computed( () => {
  const curMonthly = species.value.monthly || []
  const fullMonthly = []
  for ( let i = 0; i < 12; i++ ) {
    const tmp = curMonthly.find( v => v.month === i + 1 )
    if ( tmp ) {
      fullMonthly.push( tmp )
    } else {
      fullMonthly.push( { month: i + 1, count: 0 } )
    }
  }
  return fullMonthly
} )
const specMonthly = computed( () => {
  const cateData = monthCount.value.map( v => `${v.month}月` )
  const countData = monthCount.value.map( v => v.count )
  return {
    title: { text: `${species.value.specName}全年目击记录情况`, padding: [ 5, 5, 20, 5 ] },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    xAxis: { type: 'category', data: cateData },
    yAxis: { type: 'value' },
    series: [ {
      name: '记录数 (折线)',
      type: 'line',
      data: countData,
      markPoint: {
        color: '#5e00ed',
        data: [
          { type: 'max', name: '峰值' },
          { type: 'min', name: '峰谷' }
        ]
      }
    }, {
      name: '记录数 (柱状)',
      type: 'bar',
      data: countData,
      markLine: {
        data: [ { type: 'average', name: 'Avg', itemStyle: { color: '#f56c6c' } } ]
      },
    } ]
  }
} )

const router = useRouter()
onMounted( () => {
  if ( store.taxonArr.length === 0 ) {
    router.replace( { name: 'Home' } )
  }
} )

function goBack () {
  router.back()
}
</script>
