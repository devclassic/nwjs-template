<template>
  <h1>Hello World</h1>
</template>

<script setup>
  const { helloWorld } = require('hello-world-npm')

  alert(helloWorld())
</script>
