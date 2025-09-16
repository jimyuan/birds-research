<template>
  <page-head></page-head>
  <router-view />
  <page-foot></page-foot>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from '@/store'
import PageHead from '@/components/PageHead.vue'
import PageFoot from '@/components/PageFoot.vue'

const store = useStore()
const route = useRoute()
const router = useRouter()

onMounted( () => {
  const notHome = route.name !== 'Home'
  const isEmpty = store.taxonArr.length === 0
  if ( isEmpty && notHome ) {
    router.replace( { name: 'Home' } )
  }
} )
</script>
