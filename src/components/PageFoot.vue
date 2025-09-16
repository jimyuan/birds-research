<template>
  <footer>
    <span>&copy; 2025 版权所有 Jim Yuan</span>
    <span class="foot-ref">
      数据参考： <el-link type="primary"
        href="https://www.birdreport.cn"
        target="new">中国观鸟记录中心</el-link>
    </span>
  </footer>
</template>

<style scoped>
footer {
  display: flex;
  align-items: center;
  font-size: 0.8rem;
  height: var(--foot-height);
  padding: 0 2em;
  border-top: 1px solid var(--el-color-info-light-5);
  background-color: var(--el-color-info-light-7);
  color: var(--el-color-info);
}

.foot-ref {
  margin-left: auto;
  display: flex;
  align-items: center;
}

.foot-ref a {
  font-size: 0.8rem;
  color: var(--el-color-primary-light-3);
}
</style>