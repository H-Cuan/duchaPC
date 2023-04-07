<template>
    <router-view/>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
* {
  margin: 0;
  padding: 0;
  list-style: none;
  text-decoration: none;
}
html,
body,
#app {
  height: 100%;
  width: 100%;
  /* min-width: 1200px;
  min-width: 1920px;
  min-height: 900px; */
  min-width: 1440px;
  font-size: 16px;
  background:#f4f5f7 ;
  overflow: auto;
}

</style>
