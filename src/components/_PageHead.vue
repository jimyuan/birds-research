<template>
  <h1>
    <span>2024 上海野鸟调查分析</span>
    <RouterLink to="/">
      <svg-icon svg-name="icon-home"
        class-name="go-home"></svg-icon>
    </RouterLink>
  </h1>
  <el-divider></el-divider>
</template>

<style scoped>
h1 {
  font-size: 2.4rem;
  position: relative;
  color: var(--el-color-info);
}

h1>span {
  transform: translateX(0.5em);
}

h1 .go-home {
  color: var(--el-color-info);
  cursor: pointer;
}

h1 .go-home:hover {
  fill: var(--el-color-primary);
}
</style>