# Mark Picture

## 2222

```vue-run
<template>
    <div>
        count:{{count}}
        <button @click="onClick">Click Me</button>
    </div>
</template>

<script>
    export default{
        name: "demo",
        data() {
            return{
                count: 0
            }
        },
        methods: {
            onClick() {
                this.count++
            }
        }
    }
</script>

<style>
    .red {
        color: red;
    }
</style>
```