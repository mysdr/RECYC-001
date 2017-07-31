<template>
  <div class="login-container">
    <form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-position="left" label-width="0px"
             class="demo-ruleForm login-form">
      <h3 class="title">系统登录</h3>
        <input type="text" v-model="ruleForm2.account" auto-complete="off" placeholder="账号" class="login-input">
        <input type="password" v-model="ruleForm2.checkPass" auto-complete="off" placeholder="密码" class="login-input">
      <checkbox v-model="checked" checked class="remember">记住密码</checkbox>
        <button type="primary" style="width:100%;" @click.native.prevent="handleSubmit2" :loading="logining" class="login-button">登录
        </button>
    </form>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        logining: false,
        ruleForm2: {
          account: 'admin',
          checkPass: '123456'
        },
        rules2: {
          account: [
            { required: true, message: '请输入账号', trigger: 'blur' }
          ],
          checkPass: [
            { required: true, message: '请输入密码', trigger: 'blur' }
          ]
        },
        checked: true
      }
    },
    methods: {
      handleReset2() {
        this.$refs.ruleForm2.resetFields()
      },
      handleSubmit2(ev) {
      }
    }
  }

</script>

<style lang="stylus">
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
  .login-form
    position: absolute
    left 0
    right 0
    width 400px
    padding 35px 35px 15px 35px
    margin 120px auto
  .remember
    margin 0px 0px 35px 0px
    color color

</style>
