<template>
  <div class="login-container">
    <form :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-position="left"
          label-width="0px"
          class="login-form">
      <h3 class="title">系统登录</h3>
      <input type="text"
             v-model="ruleForm.account"
             auto-complete="off"
             placeholder="账号"
             class="login-input"
             ref="loginAccount">
      <input type="password"
             v-model="ruleForm.checkPass"
             auto-complete="off"
             placeholder="密码"
             class="login-input"
             ref="loginPassword">
      <button type="primary"
              style="width:100%;"
              @click.prevent="_login"
              :loading="logining"
              class="login-button">登录
      </button>
    </form>
  </div>
</template>

<script type="text/ecmascript-6">
  import { mapActions } from 'vuex'
  import { login } from 'api/admin'
  import sha1 from 'sha1'

  export default {
    data() {
      return {
        logining: false,
        ruleForm: {
          account: 'admin',
          checkPass: '123456'
        },
        rules: {
          account: [
            {required: true, message: '请输入账号', trigger: 'blur'}
          ],
          checkPass: [
            {required: true, message: '请输入密码', trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      _login() {
        if (this.$refs.loginAccount.value === '' || this.$refs.loginPassword.value === '') {
          this.$swal('登录失败!', '请输入账号和密码！', 'error')
          return
        }
        let params = {
          account: this.$refs.loginAccount.value,
          password: sha1(this.$refs.loginPassword.value)
        }
        login(params).then(res => {
          console.log(res)
          if (res.status === 0) {
            let data = {
              token: res.token,
              timestamp: res.timestamp,
              uid: res.uid
            }
            this.saveLogin(data)
            this.$swal('登录成功!', '登录成功！', 'success')
            this.$router.push({
              path: `/`
            })
          } else {
            this.$swal('登录失败!', '用户名或密码错误！', 'error')
          }
        })
      },
      ...mapActions([
        'saveLogin'
      ])
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  bgcolor = #2d3a4b
  buttoncolor = #20a0ff
  color = #eeeeee
  fontsize = 1.3em

  .login-container
    background-clip padding-box
    padding 35px 35px 15px 35px
    height 100vh
    background-color bgcolor
    font-size fontsize
    .login-form
      position: absolute
      left 0
      right 0
      width 400px
      padding 35px 35px 15px 35px
      margin 80px auto
      .login-input
        display inline-block
        background transparent
        border 1px solid rgba(255, 255, 255, 0.1)
        -webkit-appearance: none
        border-radius 5px
        padding 12px 5px 12px 15px
        margin-bottom 22px
        color color
        height 47px
        width 100%
      .login-button
        color color
        background-color buttoncolor
        border 1px solid buttoncolor
        display inline-block
        line-height 1
        white-space nowrap
        cursor pointer
        margin 0
        padding 10px 15px
        border-radius 4px
      .title
        font-size: 26px
        font-weight: 400
        color color
        margin 0px auto 40px auto
        text-align center
        font-weight bold

</style>
