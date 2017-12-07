<template>
  <div class="content login" v-on:keyup.enter="handleSubmit('formLogin')">
    <div class="login-container">
      <Carousel autoplay v-model="value2" class="advertisement">
        <Carousel-item>
          <div class="demo-carousel"><img src="../images/login/banner_001.png"/></div>
        </Carousel-item>
        <Carousel-item>
          <div class="demo-carousel"><img src="../images/login/banner_001.png"/></div>
        </Carousel-item>
      </Carousel>
      <i-form ref="formLogin" :model="formLogin" :rules="formLoginRules" class="card-box" name="formLogin" :label-width="80" label-position="left">
        <Form-item label="用户名" prop="username">
          <i-input type="text" v-model.trim="formLogin.username" name="username">
          </i-input>
        </Form-item>
        <Form-item label="密码" prop="password">
          <i-input type="password" v-model.trim="formLogin.password" name="password">
          </i-input>
        </Form-item>
        <div class="login-no-bottom">
          <Row>
            <i-button type="primary" class="login-button" name="login" @click="handleSubmit('formLogin')">登录</i-button>
          </Row>
        </div>
        <br/>
        <div class="login-no-bottom">
          <a class="fr f14 bottom-font r52" href="/register">立即注册</a>
        </div>
      </i-form>
    </div>
  </div>
</template>

<script>
  import auth from '../api/auth'

  export default {
    data () {
      return {
        formLogin: {
          username: '',
          password: ''
        },
        formLoginRules: {
          username: [
            {required: true, message: '请填写用户名', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '请填写密码', trigger: 'blur'},
            {type: 'string', min: 6, message: '密码长度不能小于6位', trigger: 'blur'}
          ]
        },
        value2: 0
      }
    },
    methods: {
      handleSubmit (name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            auth.login(this.formLogin)
              .then((user) => {
                this.$router.push({path: '/user'})
              })
              .catch((error) => {
                this.$Message.error(error.message)
              })
          }
        })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .card-box {
    padding: 60px 45px;
    width: 420px;
    height: 420px;
    float: right;
    border: 1px solid #D9D9D9;
    position: relative;
  }

  .formLogin-title h3 {
    font-size: 18px;
  }

  .login-no-bottom {
    margin-bottom: 10px;
    width: 100%;
  }

  .advertisement {
    width: 420px;
    height: 420px;
    overflow: hidden;
    float: left;
  }

  .demo-carousel img {
    width: 100%;
    height: 100%;
  }

  .content {
    min-width: 800px;
  }

  .refresh {
    margin-left: 20px;
    color: #5cadff;
    cursor: pointer;
  }

  .ivu-menu-dark.ivu-menu-horizontal .ivu-menu-item {
    color: rgba(255, 255, 255, .7)
  }

  .ivu-menu-dark.ivu-menu-horizontal .ivu-menu-item:hover {
    color: rgba(255, 255, 255, 1)
  }

  .fr {
    float: right;
  }
  .f14 {
    font-size: 14px;
  }
  .bottom-font {
    position: absolute;
    bottom: 30px;
  }
  .r52 {
    right: 52px;
  }
  .r98 {
    right: 98px;
  }
  .forgetpas {
    float: right;
    margin-right: 30px;
    color: #6e6e6e;
  }
  .login-container {
    width:860px;
    min-width: 860px;
    margin: 10% auto;
    overflow: hidden;
  }
  .login-button {
    width: 100%;
    background-color: #647DDF;
    height: 40px;
    margin-top: 40px;
    font-size: 16px;
  }
  .login-button[disabled] {
    background-color: #cecece;
    color: #fff;
  }
</style>
