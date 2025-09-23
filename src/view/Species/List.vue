<template>
  <section class="container">
    <p>共 <span class="count">{{ store.taxonList.order.length }}</span> 目，<span
        class="count">{{
          store.taxonList.family.length
        }}</span> 科， <span class="count">{{ store.speciesList.length || 0
        }}</span> 种
      ( 按观察记录数排序↓ )
    </p>
    <el-divider></el-divider>
    <el-table :data="store.speciesList"
      stripe
      style="width: 100%">
      <el-table-column type="index"
        class-name="index-no"
        label="№."
        width="80" />
      <el-table-column label="鸟种名">
        <template #default="{ row }">
          <span>{{ row.specName }}</span>
          <router-link :to="{ name: 'SpeciesDetail', params: { id: row.id } }">
            <svg-icon svg-name="icon-bar"
              class-name="bar"></svg-icon>
          </router-link>
        </template>
      </el-table-column>
      <el-table-column prop="latin"
        label="拉丁名"
        class-name="latin-name" />
      <el-table-column prop="specEnName"
        show-overflow-tooltip
        label="英文名" />
      <el-table-column prop="orderName"
        label="所属目"
        width="100" />
      <el-table-column prop="familyName"
        label="所属科"
        width="100" />
    </el-table>
    <el-backtop :right="100"
      :bottom="100" />
  </section>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from '@/store'

const store = useStore()
const router = useRouter()
onMounted( () => {
  if ( store.taxonArr.length === 0 ) {
    router.replace( { name: 'Home' } )
  }
} )
</script>

<style>
.latin-name>.cell {
  color: var(--el-color-info);
}

.bar {
  font-size: 1.5em;
  padding-left: 5px;
}
</style>