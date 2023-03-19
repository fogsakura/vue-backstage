<template>
  <div class="home">
    <PageHeader/>
    <el-container class="content">
      <PageMenu/>
      <el-container>
        <el-main>
          <Bread/>
          <div class="count">
            <router-view></router-view>
          </div>
        </el-main>
        <el-footer>
          <PageFooter/>
        </el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import PageHeader from './common/PageHeader.vue';
import PageFooter from './common/PageFooter.vue';
import PageMenu from './common/PageMenu.vue';
import Bread from './common/BreadCrumb.vue';

export default {
  components:{
    PageHeader,
    PageFooter,
    PageMenu,
    Bread
  },
  data(){
    return {}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import url('../assets/css/reset.css');
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.home{
  width:100%;
  height:100%;
  .content{
    position:absolute;
    width:100%;
    top:60px;
    bottom:0;
    .content{
      margin:20px 0;
    }
  }
  // background: yellow;
  .el-button{
    color:red
  }
}
</style>
