<template>
  <section class="container">
    <p class="el-text el-text--large">
      上海野鸟会于 2025 年 3 月 19 日 在其公众号上发布了《上海市鸟类名录2024》。数据显示，截止 2024 年底，上海市共记录到鸟类
      <span class="count">22</span> 目 <span class="count">82</span> 科，共计
      <span class="count">{{ totalSpec }}</span>
      种，占全国鸟类种数的 <span class="count">35.2%</span>（2024 年底全国记录鸟种数量据统计为
      {{ formatNumber(1516) }}）。其中列入国保一级 <span class="count">29</span>
      种，国保二级 <span class="count">93</span> 种；列入 <strong>IUCN</strong>
      濒危物种红色名录( Red
      List )中极危(CR)物种 <span class="count">7</span> 种，濒危(EN)物种 <span
        class="count">10</span> 种，易危(VU)物种 <span class="count">28</span> 种。
    </p>
    <p class="el-text el-text--large">本网站从中国最权威的鸟类数据观察记录网站 <a
        href="https://www.birdreport.cn"
        target="new"><svg-icon svg-name="icon-link"></svg-icon>
        中国观鸟记录中心</a> (以下简称“观鸟中心”)获取 2024
      年度上海鸟类观察数据样本，从鸟种记录频次、多样性等方面，试图初步分析探讨一下上海一鸟类的现状。</p>
    <p class="el-text el-text--large">
      从观鸟中心的前端页面，我们可以获取到 2024
      年度上海地区的每月由鸟友提交而来的鸟种数据，打开浏览器控制台，可以从网络标签里截获客户端和服务器异步通讯传来的一组 JSON 数据，其格式如下：
    </p>
    <pre class="code">
  {
    "code": 0,
    "count": 416,
    "data": "sNm8rcODHOMHbmjl42LphVTk5pvxUC3R7cOEpv9EjibSp2geqSbQ6if...",
    "timestamp": 1756647245,
    "sign": "EF0CE3680AA2B6DECA54EB51BCF223B8",
    "requestId": "0A3E343E-B6A3-41CA-B0DF-0AEA30D1F2A9"
  }</pre>
    <p>可以看到其 data
      部分的数据经过了某种算法的再次编码，但是网页上能正常显示所获得的数据，可以肯定，这一定是可逆的。通过解读源代码，发现其 encode/decode
      算法库也是经过源码混淆的，没法解读。经过仔细研判，还是找出了暴露在源码里的解码函数，至此，我们顺利的将观鸟中心
      2024 年上海地区 12 个月的鸟种数据全部获取，并解码、序列化，清洗成了这次我们需要的数据，其基本格式如下：</p>
    <pre class="code">
  [
    {
      "englishname": "Common Pheasant",
      "recordcount": 157,
      "taxonordername": "鸡形目",
      "taxon_id": 4040,
      "taxonfamilyname": "雉科",
      "latinname":" Phasianus colchicus",
      "taxonname": "环颈雉"
    },
    ...
  ]</pre>
    <p>以上为单月数据格式，经由对 12 个月的数据进行查询统计，上海地区 2024 年度（去除存疑、逃逸鸟种）记录到 <span
        class="count">{{ store.taxonList.order.length || 0 }}</span> 目 <span
        class="count">{{ store.taxonList.family.length || 0 }}</span> 科，共计<span
        class="count">{{ Object.keys(store.speciesList).length || 0
        }}</span>
      种鸟类，占上海历史鸟种数({{ totalSpec }})的 <span class="count">{{ specRate }}%</span>。
    </p>
    <chart-page :option="barOption"></chart-page>
    <p>
      由上图可见，近几年在上海地区记录到的鸟种呈现了递增的趋势，说明了上海及其周边地区的环境水平在逐年的优化和改善。另一方面，日益增多的观鸟人口，尤其是青少年观鸟人口的增加，让许多鸟种得到有效的目击和记录。
    </p>
  </section>
</template>

<script setup>
import { computed, ref, reactive } from 'vue'
import { useStore } from '@/store'
import { formatNumber } from '@/utils'
import ChartPage from '@/components/ChartPage.vue'

const store = useStore()

const totalSpec = ref( 534 )

const specRate = computed( () => {
  const tmp = Object.keys( store.speciesList ).length / totalSpec.value * 100
  return tmp.toFixed( 2 )
} )

const barOption = reactive( {
  title: { text: '2020-2024 年鸟种数据一览' },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    }
  },
  xAxis: { type: 'category', data: [ 2020, 2021, 2022, 2023, 2024 ].reverse() },
  yAxis: { type: 'value' },
  series: [ {
    name: '鸟种数',
    type: 'bar',
    data: [ Object.keys( store.speciesList ).length, 389, 360, 364, 315 ],
  }, {
    name: '所属科数',
    type: 'bar',
    stack: 'Ad',
    data: [ store.taxonList.family.length, 67, 65, 65, 62 ],
  }, {
    name: '所属目数',
    type: 'bar',
    stack: 'Ad',
    data: [ store.taxonList.order.length, 19, 19, 20, 19 ],
  }, {
    name: '鸟种走势',
    type: 'line',
    data: [ Object.keys( store.speciesList ).length, 389, 360, 364, 315 ],
    markPoint: {
      data: [
        { type: 'max', name: '峰值' }
      ]
    }
  } ]
} )

</script>

<style scoped>
.container>p {
  margin-bottom: 1em;
  line-height: 2;
  text-indent: 2em;
  text-align: justify;
}
</style>