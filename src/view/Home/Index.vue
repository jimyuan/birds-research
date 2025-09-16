<template>
  <section class="container">
    <nav>
      <Transition>
        <ul v-if="isLoaded">
          <li>
            <RouterLink to="/overview">
              <svg-icon svg-name="icon-overview"></svg-icon>
              <span>全年概览</span>
            </RouterLink>
          </li>
          <li>
            <RouterLink to="/species">
              <svg-icon svg-name="icon-taxon"></svg-icon>
              <span>鸟种列表</span>
            </RouterLink>
          </li>
          <li>
            <RouterLink to="/monthly">
              <svg-icon svg-name="icon-chart"></svg-icon>
              <span>每月数据</span>
            </RouterLink>
          </li>
          <li>
            <RouterLink to="/statistics">
              <svg-icon svg-name="icon-utils"></svg-icon>
              <span>综合统计</span>
            </RouterLink>
          </li>
        </ul>
        <section v-else>
          <svg-icon svg-name="loading"
            class-name="spin"></svg-icon>
          {{ stat }}
        </section>
      </Transition>
    </nav>
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useStore } from '@/store'
import { decodeData } from '@/utils'

const stat = ref( '' )
const store = useStore()
const isLoaded = computed( () => Boolean( store.taxonArr.length ) )

onMounted( async () => {
  if ( isLoaded.value ) {
    return false
  }
  const urls = Array.from( { length: 12 }, ( v, i ) => `./data/month-${i + 1}.json` )
  let res, json
  const _tmp = []
  for ( let i = 0; i < urls.length; i++ ) {
    stat.value = `正在加载第 ${i + 1} 个月数据`
    res = await fetch( urls[ i ] )
    json = await res.json()
    _tmp.push( decodeData( json ) )
  }
  store.addTaxonData( _tmp )
  stat.value = '加载完毕！'
} )
</script>

<style>
nav {
  --nav-size: calc(var(--base-width) / 3);
  transition: box-shadow 0.8s;
  width: var(--nav-size);
  height: var(--nav-size);
  margin: 100px auto;
  border-radius: 15%;
  overflow: hidden;
  box-shadow:
    0 15px 15px var(--el-color-info-light-9),
    0 -15px 15px var(--el-color-info-light-9),
    15px 0 15px var(--el-color-info-light-9),
    -15px 0 15px var(--el-color-info-light-9);
}

nav:hover {
  box-shadow:
    0 15px 50px var(--el-color-info-light-7),
    0 -15px 50px var(--el-color-info-light-7),
    15px 0 50px var(--el-color-info-light-7),
    -15px 0 50px var(--el-color-info-light-7);
}

nav>ul {
  margin: 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
}

nav li {
  list-style-type: none;
  width: calc(var(--nav-size) / 2);
  height: calc(var(--nav-size) / 2);
  overflow: hidden;
}

nav li:nth-child(1) {
  border-bottom-right-radius: 10%;
}

nav li:nth-child(2) {
  border-bottom-left-radius: 10%;
}

nav li:nth-child(3) {
  border-top-right-radius: 10%;
}

nav li:nth-child(4) {
  border-top-left-radius: 10%;
}

nav li a {
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: column;
  align-items: center;
  text-decoration: none;
  justify-content: center;
  color: var(--el-color-info);
  transition: background-color 0.8s, font-size 0.5s;
}

nav li a svg {
  font-size: 3em;
  margin-bottom: 10px;
}

nav li:nth-child(1) a {
  color: var(--el-color-primary)
}

nav li:nth-child(2) a {
  color: var(--el-color-warning)
}

nav li:nth-child(3) a {
  color: var(--el-color-success)
}

nav li:nth-child(4) a {
  color: var(--el-color-danger)
}

nav li a:hover {
  background-color: var(--el-color-info-light-9);
  font-size: 150%;
}

nav>section {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5em;
  color: var(--el-color-info);
  background-color: var(--el-color-primary-light-8);
}
</style>
