<template>
  <div ref="el"
    :style="{ width: width, height: height }"></div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import echarts from '@/echarts'

const props = defineProps( {
  width: { type: String, default: '100%' },
  height: { type: String, default: '400px' },
  option: { type: Object, required: true }
} )

const el = ref( null )
let chart = null

onMounted( () => {
  chart = echarts.init( el.value )
  chart.setOption( props.option )
} )

watch( () => props.option, ( newVal ) => {
  chart?.setOption( newVal )
}, { deep: true } )
</script>
