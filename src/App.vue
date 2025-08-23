<template>
  <RouterView></RouterView>
</template>

<script setup>
import { onUnmounted } from 'vue'
import { useStore } from '@/store'

const store = useStore()

onUnmounted( () => {
  store.clear()
} )
</script>