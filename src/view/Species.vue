<template>
  <page-head></page-head>
  Species
  <pre>{{ taxonData[0] }}</pre>
  <p>{{ taxonData.length }}</p>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import PageHead from '@/components/PageHead.vue'

const taxonData = ref( [] )

onMounted( async () => {
  fetch( './data/month-2.json' )
    .then( res => res.json() )
    .then( json => {
      taxonData.value = JSON.parse( BIRDREPORT_APIJS.decode( json[ 'data' ] ) )
    } )
} )

onUnmounted( () => {
  taxonData.value = []
} )

</script>