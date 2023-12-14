<template>
  <div>
    <transition :name="transitionName" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>

export default{
  data() {
    return {
      transitionName: '',
    }
  },
  watch: {
   //使用watch 监听$router的变化
    $route(to, from) {
      console.log(to, "to");
      console.log(from, "from");
      if (to.meta.index == 7) {
      //设置动画名称
      //如果index==7，则为登录界面，使用平移动画
        this.transitionName = "slide-right";
        const h = this.$createElement;
        this.$notify({
            title: "提示",
            message: h("i", { style: "color: red" }, "请登录"),
            customClass: 'messageZ'
        });
      } else if(from.meta.index == 7) {
        this.transitionName = "slide-right";
      } else{
        this.transitionName = "fade";
      }
   },
  },
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

.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
  will-change: transform;
  transition: all 0.5s ease;
}
.slide-right-enter {
  transform: translateX(-100%);
}
.slide-right-leave-active {
  transform: translateX(100%);
}
.slide-left-enter {
  transform: translateX(100%);
}
.slide-left-leave-active {
  transform: translateX(-100%);
}

.slide-up-enter-active,
.slide-up-leave-active,
.slide-down-enter-active,
.slide-down-leave-active {
  will-change: transform;
  transition: all 0.5s ease;
}
.slide-up-enter {
  transform: translateY(-30%);
  opacity: 0;
}
.slide-up-leave-active {
  transform: translateY(30%);
  opacity: 0;
}
.slide-down-enter {
  transform: translateY(30%);
  opacity: 0;
}
.slide-down-leave-active {
  transform: translateY(-30%);
  opacity: 0;
}

/* .slide-up-enter-active,
.slide-up-leave-active,
.slide-down-enter-active,
.slide-down-leave-active  {
  transition: all 0.75s ease-out;
}
.slide-up-enter {
  position: absolute;
  right: 0;
}
.slide-up-leave-active {
  position: absolute;
  right: -100%;
}
.slide-down-enter {
  position: absolute;
  left: -100%;
}
.slide-down-leave-active {
  position: absolute;
  left: 0;
} */
</style>
