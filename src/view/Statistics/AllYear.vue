<template>
  <section class="inner-box">
    <p>鸟类为适应环境形成的生存本能反应，表现为定期往返繁殖地与越冬地的规律性移动，受日照变化、地磁导航及脂肪储备等因素调控
      。全球共有 9 条主要迁徙路线，其中东亚-澳大利西亚、西太平洋等 4 条途经中国。</p>
    <p><img
        src="https://q5.itc.cn/images01/20240219/0c2e3ebdcbd6458597e8b07cf14d3635.png"
        alt="全球候鸟迁徙路线图"
        style="width: 100%;"></p>
    <p>如图所示，我们所在的城市——上海，正处于上图 5
      号迁徙路线内，上海的南汇东滩、崇明东滩等地，是鸟儿们迁徙路径上休憩的好地方。每年春、秋两大迁徙月份，途径上海的鸟种数量大大丰富。</p>
    <chart-page :option="specLineChart"></chart-page>
    <p>通过上面的统计信息来看，每年 4-5 月、9-11
      月是全年观察鸟种的峰值月份，这几个峰值月份即迁徙季节。在这些月份中，上海大量的观鸟爱好者往往都会高频次的前往南汇、崇明等地，欣赏这些风尘仆仆的鸟儿们。<el-text
        type="success">黄眉姬鹟</el-text>、<el-text
        type="success">紫寿带</el-text>、<el-text
        type="success">蚁䴕</el-text>等平时难得一见的美丽林鸟纷纷亮相。<el-text
        type="primary">黄嘴白鹭</el-text>、 <el-text
        type="primary">小青脚鹬</el-text>等一众国保一级的水鸟也有机会遇到！尤其是国保中的国宝——<el-text
        type="primary">勺嘴鹬</el-text>，每当它惊鸿一瞥的出现在南汇滩涂，都是众多鸟友的重大节日。长焦、单筒，各种设备齐齐招呼，都要抓住这个机遇，留下宝贝的倩影。
    </p>
    <p></p>
    <chart-page :option="orderPieChart"></chart-page>
    <p>上面的 Pie-chart 是上海全年类目记录次数总和的一个统计。显而易见，鸟类大纲下的<el-text
        type="success">雀形目</el-text>鸟类占据了一大半的份额（57.95%）。而排在余下三位的都是水鸟类目，<el-text
        type="success">鹈形目</el-text>中的各种白鹭基本上常年可见；<el-text
        type="success">鸻形目</el-text>里的各类鸻鹬是迁徙季节中的主力大部队；<el-text
        type="success">雁形目</el-text>所属的雁鸭大群，是上海冬候鸟的一大亮点。
    </p>
  </section>
</template>
<script setup>
import { computed, onMounted } from 'vue'
import ChartPage from '@/components/ChartPage.vue'
import { useStore } from '@/store'
import { useRouter } from 'vue-router'

const store = useStore()
// 各月份的物种数统计
const specCount = computed( () => store.taxonArr.map( v => v.length ) )
// 寻找第二峰值
const secondPeak = computed( () => {
  let max = 0
  for ( let i = specCount.value.length - 1; i >= 0; --i ) {
    if ( specCount.value[ i ] < max ) {
      const value = specCount.value[ i + 1 ]
      return { name: '第二峰值', value, xAxis: i + 1, yAxis: value }
    }
    max = Math.max( max, specCount.value[ i ] )
  }
  return null
} )
const specLineChart = computed( () => {
  return {
    title: { text: '月度鸟种数量统计' },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    xAxis: { type: 'category', data: specCount.value.map( ( v, i ) => `${i + 1}月` ) },
    yAxis: { type: 'value' },
    series: [ {
      name: '折线图',
      type: 'line',
      data: specCount.value,
      markPoint: {
        color: '#5e00ed',
        data: [
          { type: 'max', name: '峰值' },
          { type: 'min', name: '峰谷' },
          secondPeak.value || {}
        ]
      }
    }, {
      name: '柱状图',
      type: 'bar',
      data: specCount.value,
      markLine: {
        data: [ { type: 'average', name: 'Avg', itemStyle: { color: '#f56c6c' } } ]
      },
    } ]
  }
} )

const pieData = computed( () => {
  return store.speciesList.reduce( ( acc, cur ) => {
    const { orderName } = cur
    if ( !acc[ orderName ] ) {
      acc[ orderName ] = 0
    }
    acc[ orderName ] += cur.recordCount
    return acc
  }, {} )
} )

const orderPieChart = computed( () => {
  return {
    title: { text: '全年记录鸟种类目前 10 统计' },
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b} : {c} ({d}%)'
    },
    legend: {
      bottom: '0%',
      left: 'center'
    },
    series: [
      {
        name: '鸟种类目',
        type: 'pie',
        radius: [ '40%', '70%' ],
        avoidLabelOverlap: false,
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 30,
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: true
        },
        data: Object.keys( pieData.value )
          .map( key => ( { value: pieData.value[ key ], name: key } ) )
          .sort( ( a, b ) => b.value - a.value )
          .splice( 0, 10 )
      }
    ]
  }
} )

const router = useRouter()
onMounted( () => {
  if ( store.taxonArr.length === 0 ) {
    router.replace( { name: 'Home' } )
  }
} )
</script>
<style>
.container .el-text {
  font-size: 16px;
  padding: 0 3px;
  font-weight: bold;
}
</style>