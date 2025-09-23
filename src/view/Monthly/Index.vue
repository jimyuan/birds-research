<template>
  <section class="container">
    <p> <i>*按鸟种观察记录数排名</i></p>
    <el-tabs v-model="activeName"
      @tab-change="getMonthlyData"
      stretch>
      <el-tab-pane v-for="(month, i) of dataTabs"
        :key="month"
        :label="month"
        :name="i">
        <el-table :data="tableData[i]"
          stripe
          style="width: 100%; margin-top: 1em">
          <template #empty>
            <div class="spin">
              <svg-icon svg-name="loading"></svg-icon>
            </div>
          </template>
          <el-table-column type="index"
            class-name="index-no"
            label="№."
            width="80" />
          <el-table-column prop="taxonname"
            label="鸟种名">
            <template #default="{ row }">
              <span>{{ row.taxonname }}</span>
              <router-link
                :to="{ name: 'SpeciesDetail', params: { id: row.taxon_id } }">
                <svg-icon svg-name="icon-bar"
                  class-name="bar"></svg-icon>
              </router-link>
            </template>
          </el-table-column>
          <el-table-column prop="latinname"
            label="拉丁名"
            class-name="latin-name" />
          <el-table-column prop="englishname"
            show-overflow-tooltip
            label="英文名" />
          <el-table-column prop="taxonordername"
            label="所属目"
            width="100" />
          <el-table-column prop="taxonfamilyname"
            label="所属科"
            width="100" />
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </section>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { decodeData } from '@/utils'


const dataTabs = 'Jan、Feb、Mar、Apr、May、Jun、Jul、Aug、Sep、Oct、Nov、Dec'.split( '、' ).map( v => `${v}.` )
const activeName = ref( 0 )
const tableData = reactive( Array.from( { length: 12 }, v => [] ) )

const getMonthlyData = async () => {
  const curData = tableData[ activeName.value ]
  if ( curData.length > 0 ) {
    return false
  }
  const url = `./data/month-${activeName.value + 1}.json`
  const res = await fetch( url )
  const json = await res.json()
  tableData[ activeName.value ] = decodeData( json )
  tableData[ activeName.value ].sort( ( a, b ) => b.recordcount - a.recordcount )
}
onMounted( async () => {
  getMonthlyData()
} )
</script>

<style scoped>
.spin {
  padding: 20px 0;
  font-size: 5rem;
  animation-duration: 2s;
}
</style>