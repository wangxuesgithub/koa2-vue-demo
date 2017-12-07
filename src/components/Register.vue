<template>
  <div class="content register">
    <Spin fix v-if="loading">
      <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
      <div>Loading</div>
    </Spin>
    <div class="card" v-if="!showSuccess">
      <div class="register-title">
        <span>账户设置&nbsp;&nbsp;</span>
        <b>请设置您的用户名和密码用于登录</b>
      </div>
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80" name="register">
        <Radio-group v-model="formValidate.registerType">
          <Radio class="register-email" label="emailRegister">使用邮箱注册</Radio>
          <Radio class="register-phone" label="phoneRegister" disabled>使用手机注册</Radio>
        </Radio-group>
        <br/><br/>
        <div class="tip-container">
          <Form-item label="邮箱地址" prop="username">
            <Input type="text" v-model="formValidate.username" name="email"></Input>
          </Form-item>
          <div class="tip">请输入有效邮箱地址作为您的用户名</div>
        </div>
        <br/>
        <div class="tip-container">
          <Form-item label="登录密码" prop="password" ref="aaa">
            <Input type="password" v-model.trim="formValidate.password" name="password"></Input>
          </Form-item>
          <div class="tip">6-20个字符，包含英文字母和数字，不能包含空格和特殊字符</div>
        </div>
        <br/>
        <div class="tip-container">
          <Form-item label="确认密码" prop="confirmPassword">
            <Input type="password" v-model.trim="formValidate.confirmPassword" name="confirmPassword"></Input>
          </Form-item>
          <div class="tip">请再次输入密码</div>
        </div>
        <br/>
        <div class="tip-container">
          <Form-item label="手机号码" prop="mobile">
            <Input type="text" v-model="formValidate.mobile" name="mobile"></Input>
          </Form-item>
          <div class="tip">请输入手机号码</div>
        </div>
        <br/>
        <!--<Form-item prop="isRead">-->
        <!--<Checkbox-group v-model="formValidate.isRead" class="read">-->
        <!--<Checkbox label="我已阅读并同意用户注册协议"></Checkbox>-->
        <!--</Checkbox-group>-->
        <!--</Form-item>-->
        <div>
          <Button type="primary" class="register-btn" @click="handleSubmit('formValidate')" name="registerBtn">注册</Button>
        </div>
      </Form>
    </div>
  </div>
</template>
<script>
  import auth from '../api/auth'

  export default {
    data () {
      const validateMobile = (rule, value, callback) => {
        if (!/^1[34578]\d{9}|^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$/.test(value)) {
          return callback(new Error(`请输入正确的手机号码`))
        } else {
          callback()
        }
      }
      const validatePassword = (rule, value, callback) => {
        if (!/^[A-Za-z0-9]+$/.test(value)) {
          callback(new Error(`不能包含空格和特殊字符`))
        } else {
          if (this.formValidate.confirmPassword !== '') {
            // 对第二个密码框单独验证
            this.$refs.formValidate.validateField(`confirmPassword`)
          }
          callback()
        }
      }
      const validateConfirmPassword = (rule, value, callback) => {
        if (value === '') {
          callback(new Error(`请再次输入密码`))
        } else if (value !== this.formValidate.password) {
          callback(new Error(`两次输入密码不一致!`))
        } else {
          callback()
        }
      }
      return {
        formValidate: {
          username: '',
          password: '',
          confirmPassword: '',
          mobile: '',
          isRead: [],
          registerType: 'emailRegister'
        },
        ruleValidate: {
          username: [
            {required: true, message: '邮箱不能为空', trigger: 'blur'},
            {type: 'email', message: '邮箱格式不正确', trigger: 'blur'},
            { type: 'string', max: 50, message: '邮箱地址不能大于50个字符', trigger: 'blur' }
          ],
          password: [
            {required: true, message: '请输入密码', trigger: 'blur'},
            {validator: validatePassword, trigger: 'blur'},
            {type: 'string', max: 20, message: '密码长度不能大于20个字符', trigger: 'blur'},
            {type: 'string', min: 6, message: '密码长度不能小于6个字符', trigger: 'blur'}
          ],
          confirmPassword: [
            {required: true, message: '请再次输入密码', trigger: 'blur'},
            {validator: validateConfirmPassword, trigger: 'blur'}
          ],
          mobile: [
            {required: true, message: '联系电话不能为空', trigger: 'blur'},
            {type: 'string', min: 11, message: '请输入正确的手机号码', trigger: 'blur'},
            {type: 'string', max: 11, message: '请输入正确的手机号码', trigger: 'blur'},
            {validator: validateMobile, trigger: 'blur'}
          ]
//          isRead: [
//            {required: true, type: 'array', min: 1, message: '请同意用户注册协议', trigger: 'change'}
//          ]
        },
        loading: false,
        time: 5,
        showSuccess: false
      }
    },
    methods: {
      handleSubmit (name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            auth.register(this.formValidate)
              .then((user) => {
                this.$router.push({path: '/login'})
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
<style scoped>

  div.ivu-form-item-error + div.tip {
    display: none;
  }
  .content {
    width: 860px;
    margin: 0 auto;
    min-width: 860px;
    min-height: 750px;
  }

  .card {
    width: 400px;
    min-width: 400px;
    margin: 100px auto 0;
  }

  .register-title {
    text-align: left;
    line-height: 60px;
  }

  .register-title span {
    font-size: 22px;
    color: #2d2d2d;
  }
  .register-title b {
    font-size: 14px;
    color: #2d2d2d;
    font-weight: 100;
  }
  .read {
    text-align: left;
  }

  .demo-spin-icon-load{
    animation: ani-demo-spin 1s linear infinite;
  }
  @keyframes ani-demo-spin {
    from { transform: rotate(0deg);}
    50%  { transform: rotate(180deg);}
    to   { transform: rotate(360deg);}
  }
  .modal {
    position: relative;
    width: 100%;
    height: 540px;
    text-align: left;
  }
  .modal-container {
    border: 1px solid rgba(0, 0, 0, .1);
    overflow-y: scroll;
    width: 100%;
    height: 540px;
    padding: 40px;
  }
  ::-webkit-scrollbar {
    width: 6px;
  }
  ::-webkit-scrollbar-track {
    background-color: #fff;
  }
  ::-webkit-scrollbar-thumb {
    border-radius: 56px;
    background: #D8D8D8;
  }
  .modal h4 {
    text-align: center;
    font-size: 24px;
    line-height: 80px;
    font-weight: 100;
  }
  .close {
    position: absolute;
    top: 31px;
    right: 40px;
    cursor: pointer;
    color: rgba(0,0,0,.8);
    font-size: 20px;
  }
  .register-email {
    float: left;
  }
  .register-phone {
    float: right;
    margin-right: 26px;
  }
  .register-email, .register-phone {
    font-size: 16px;
    color: #2d2d2d;
  }
  .tip-container {
    position: relative;
    height: 66px;
  }
  .tip {
    background: url("../images/tip.png") no-repeat left center;
    text-indent: 20px;
    text-align: left;
    position: absolute;
    bottom:0;
    left: 10px;
    color: #B9B9B9;
  }
  .ivu-spin-fix {
    background-color: rgba(255,255,255,.5);
  }
  .ivu-card-bordered {
    border: 0;
  }
  .register-btn {
    width: 100%;
    background-color: #647DDF;
  }
  .back {
    width: 330px;
    margin: 0 auto;
  }
  .register-success {
    padding: 60px 40px;
    width:660px;
    margin: 0 auto;
  }
  .register-success h3 {
    font-weight: 100;
    font-size: 24px;
    color: #2D2D2D;
  }
  .register-success p {
    font-size: 16px;
    color: #B9B9B9;
  }
  .ivu-radio-group {
    width: 100%;
  }
</style>
