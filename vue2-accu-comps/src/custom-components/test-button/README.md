```
<template>
  <div id="app">
    <img alt="Vue logo" class="logo" src="https://cn.vuejs.org/images/logo.svg" />
    <h1>Welcome to Vue.js {{version}} !</h1> 
  </div>
</template>
<script>
export default {
    data() {
      return {
        version: '2.x'
      };
    },
  };
</script>

<style> 
.logo {
  width:30px;
}

h1{
  color:red;
}
</style> 
```