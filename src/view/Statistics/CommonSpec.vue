<template>
  <section class="inner-box">
    <p>下面 2 个柱状图，统计的是两个极端。2024 年度最常见和最罕见的鸟种。在观鸟界，上海地区赫赫有名的四大菜鸟：<el-text
        type="success">珠颈斑鸠</el-text>、<el-text
        type="success">白头鹎</el-text>、<el-text
        type="success">乌鸫</el-text>、<el-text
        type="success">麻雀</el-text>。从统计数据看，<el-text
        type="success">麻雀</el-text>落在了<el-text
        type="success">棕背伯劳</el-text>和<el-text
        type="success">白鹭</el-text>后面，估计是观鸟者实在懒得记录他们了吧，从第三方数据参考来看，总体数量上，它还是能稳稳占据前四的。
    </p>
    <p>由此来看，上述这些鸟儿已经充分地适应了在城市公园、小片绿地内进行生息繁殖。例如<el-text
        type="success">珠颈斑鸠</el-text>这种家伙，随便找个小区的空调角落、废弃花盆，叼上几根树枝，就能坐巢孵蛋，俨然一副躺平主义者。
    </p>
    <p>林鸟种还有一种值得注意的鸟种——<el-text
        type="success">鹊鸲</el-text>。作为上海的留鸟，据一些有着十年观鸟经历的人讲，以前在上海，它还不是很常见，近几年来，<el-text
        type="success">鹊鸲</el-text>在各大公园的繁殖速度惊人，活跃在各大城市公园及绿地里。</p>
    <p>下图这 20 大常见鸟种里，基本上都是上海的留鸟，除了<el-text
        type="success">北红尾鸲</el-text>。它是上海的冬候鸟，每天大概 10 月前后来到这里，次年 3、4
      月份离去。巨大的数量，让我们在冬天的公园、野外等地都能轻松的看到。雄鸟棕色腹部，银色头部，黑色背羽，翅膀上标志性的白色三角形斑块，非常好辨认。
    </p>
    <chart-page :option="mostSpecChart" />
    <p>而下图记录的 2024
      年度罕见鸟种，则更加有趣，这部分的观察记录，是每个观鸟爱好者的乐趣所在。这些罕见鸟种大部分为过境旅鸟(Mp)或者游荡旅鸟(Mv)，平时难得一见。而每当有台风过境后，就有可能观看到更为罕见的迷鸟，这些鸟本无可能在上海及周边地区出现，然而由于台风气流影响而迷失了方向
      ，这种可遇不可求的机会到来时，又是观鸟者的一场盛宴。</p>
    <chart-page :option="leastSpecChart" />

  </section>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import ChartPage from '@/components/ChartPage.vue'
import { useStore } from '@/store'
import { useRouter } from 'vue-router'

const store = useStore()
const count = 20
const tooltip = {
  trigger: 'axis',
  axisPointer: {
    type: 'shadow'
  }
}

const mostSpecies = computed( () => [ ...store.speciesList ].splice( 0, count ) )
const leastSpecies = computed( () => [ ...store.speciesList ].splice( count * -1 ) )

const mostSpecChart = computed( () => {
  return {
    title: { text: `${count} 大常见鸟种` },
    tooltip,
    yAxis: { type: 'value', alignTicks: true },
    xAxis: { type: 'category', data: mostSpecies.value.map( v => v.specName ), axisLabel: { rotate: 45 } },
    series: [ {
      color: '#67c23a',
      name: '记录(次)',
      type: 'bar',
      data: mostSpecies.value.map( v => v.recordCount )
    } ]
  }
} )

const leastSpecChart = computed( () => {
  return {
    title: { text: `${count} 大罕见鸟种` },
    tooltip,
    yAxis: { type: 'value' },
    xAxis: { type: 'category', data: leastSpecies.value.map( v => v.specName ), axisLabel: { rotate: 45 } },
    series: [ {
      color: 'rgb(248,152,152)',
      name: '记录(次)',
      type: 'bar',
      data: leastSpecies.value.map( v => v.recordCount )
    } ]
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
.bar-container {
  display: flex;
  justify-content: space-between;
}

.bar-container>div {
  width: 48%;
}
</style>