<template>
  <h1 :class="{ 'is-home': isHome }">
    <span class="site-title">
      2024 上海野鸟调查分析</span>
    <span class="go-home"
      @click="goHome">
      <svg-icon svg-name="icon-home"></svg-icon>
    </span>
  </h1>
  <el-divider></el-divider>
</template>
<script setup>
import { useRouter, useRoute } from 'vue-router'
import { ref, watch } from 'vue'

const isHome = ref( true )
const route = useRoute()

watch( () => route.name, val => {
  isHome.value = val === 'Home'
}, { immediate: true } )


const router = useRouter()
function goHome () {
  router.push( { path: '/' } )
}

</script>
<style scoped>
h1 {
  height: 45px;
  font-size: 2.4rem;
  position: relative;
  color: var(--el-color-info);
}

.site-title {
  transition: left 0.5s;
  position: absolute;
  left: 0.5em;
  transform: translateX(0);
}

.go-home {
  transition: scale 0.5s;
  position: absolute;
  right: 0.5em;
  transform: scale(1);
}

.go-home:hover svg {
  cursor: pointer;
  fill: var(--el-color-primary);
}

.is-home .site-title {
  left: 50%;
  transform: translateX(-50%);
}

.is-home .go-home {
  transform: scale(0);
}
</style>