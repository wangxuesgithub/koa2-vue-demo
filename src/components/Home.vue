<template>
  <div class='wrap'>
    <header>后台管理系统</header>
    <div class="layout-content">
      <Row>
        <Col span="5">
        <Menu active-name="1-1" width="auto" :open-names="['1']">
          <Submenu name="1">
            <template slot="title">
              <Icon type="ios-navigate"></Icon>
              用户
            </template>
            <MenuItem name="1-1">
              <router-link to="/user">用户列表</router-link>
            </MenuItem>
            <MenuItem name="1-2">
              <router-link to="/upload">上传图片</router-link>
            </MenuItem>
            <MenuItem name="1-3">Option 3</MenuItem>
          </Submenu>
          <Submenu name="2">
            <template slot="title">
              <Icon type="ios-keypad"></Icon>
              Item 2
            </template>
            <MenuItem name="2-1">Option 1</MenuItem>
            <MenuItem name="2-2">Option 2</MenuItem>
          </Submenu>
          <Submenu name="3">
            <template slot="title">
              <Icon type="ios-analytics"></Icon>
              Item 3
            </template>
            <MenuItem name="3-1">Option 1</MenuItem>
            <MenuItem name="3-2">Option 2</MenuItem>
          </Submenu>
        </Menu>
        </Col>
        <Col span="19">
        <div class="layout-content-main">
          <!-- 路由出口,路由匹配到的组件将渲染在这里 -->
          <router-view></router-view>
        </div>
        </Col>
      </Row>
    </div>
    <div class="layout-copy">
      2011-2016 &copy; TalkingData
    </div>
  </div>
</template>

<script>
export default {
  name: 'home',
  data () {
    return {}
  }
}
</script>

<style scoped>
  header {
    background-color: #647DDF;
    color: #fff;
    height: 60px;
    font-size: 18px;
    line-height: 60px;
  }

.layout-content-main {
  margin: 30px;
  min-height: 500px;
}
</style>
