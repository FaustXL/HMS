<template>
  <div>
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>

export default{
  data() {
    return {
      
    }
  }
}
</script>

<style>
@import "@/views/css/nav.css";
@import "./views/css/font.css";
body{
  font-family: JetBrainsMono-Regular;
}
.fade-enter{
	opacity: 0;
}
.fade-enter-active{
	transition: opacity 0.5s ease;
}
.fade-leave-to{
	opacity: 0;
}
.fade-leave-active{
	transition: opacity 0.3s ease;
}
</style>
