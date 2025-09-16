<template>
  <section class="container">
    <p>共 <span class="count">{{ store.taxonList.order.length }}</span> 目，<span
        class="count">{{
          store.taxonList.family.length
        }}</span> 科， <span class="count">{{ tableData.length }}</span> 种</p>
    <el-divider></el-divider>
    <el-table :data="tableData"
      stripe
      style="width: 100%">
      <el-table-column type="index"
        class-name="index-no"
        label="№."
        width="80"
        :index="indexMethod" />
      <el-table-column prop="specName"
        label="鸟种名" />
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
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from '@/store'

const store = useStore()
const tableData = computed( () => Object.values( store.speciesList ) )

const indexMethod = idx => tableData.value.length - idx

</script>

<style scoped>
.latin-name {
  font-size: 0.8em;
  color: var(--el-color-info);
}
</style>