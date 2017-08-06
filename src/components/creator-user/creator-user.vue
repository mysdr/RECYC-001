<template>
  <div class="creation">
    <div class="creation-info">
      <div>
        <div class="label">用户ID</div>
        <Input ref="userId" placeholder="请输入..."/>
      </div>
      <div>
        <div class="label">账户</div>
        <Input ref="userAccount" placeholder="请输入..."/>
        <div class="label label-inline">密码</div>
        <Input ref="userPassword" placeholder="请输入..."/>
      </div>
      <div>
        <div class="label">用户名</div>
        <Input ref="userName" placeholder="请输入..."/>
        <div class="label label-inline">性别</div>
        <Radio-group ref="userSex" v-model="gender">
          <Radio label="male">
            <Icon type="male"></Icon>
            <span class="radio">Male</span>
          </Radio>
          <Radio label="female">
            <Icon type="female"></Icon>
            <span class="radio">Female</span>
          </Radio>
        </Radio-group>
      </div>
      <div>
        <div class="label">年龄</div>
        <Input ref="userAge" placeholder="请输入..." class="input-small"/>
        <div class="label label-inline">体重</div>
        <Input ref="userWeight" placeholder="请输入..." class="input-small"/>
        <div class="label label-inline">体脂</div>
        <Input ref="userFat" placeholder="请输入..." class="input-small"/>
      </div>
      <div>
        <div class="label">微信</div>
        <Input ref="userWechat" placeholder="请输入..."/>
        <div class="label label-inline ">联系方式</div>
        <Input ref="userConnect" placeholder="请输入..."/>
      </div>
      <div class="remark">
        <div class="label">备注</div>
        <Input ref="userNote" type="textarea" placeholder="请输入..." :row="5"/>
      </div>
      <Button type="primary" class="btn-create" @click="_createUser()">添加</Button>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import { mapGetters } from 'vuex'
  import { create } from 'api/user'

  export default {
    computed: {
      ...mapGetters([
        'token',
        'uid',
        'timestamp'
      ])
    },
    methods: {
      _createUser() {
        let params = {
          uid: this.uid,
          timestamp: this.timestamp,
          token: this.token,
          user_id: this.$refs.userId.value,
          user_account: this.$refs.userAccount.value,
          user_password: this.$refs.userPassword.value,
          user_name: this.$refs.userName.value,
          user_sex: this.$refs.userSex.value,
          user_age: this.$refs.userAge.value,
          user_weight: this.$refs.userWeight.value,
          user_fat: this.$refs.userFat.value,
          user_wechat: this.$refs.userWechat.value,
          user_connect: this.$refs.userConnect.value,
          user_note: this.$refs.userNote.value
        }
        create(params).then(res => {
          if (res.code === 0) {
            this.$swal('添加成功!', '您已成功录入该会员数据！', 'success')
          }
        })
      }
    },

    // 使用v-model进行双向绑定获得值，即可进行选择
    data() {
      return {
        gender: 'male'
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  pink = #FF69B4
  blue = #2d8cf0
  grey = #d7dde4
  white = #fff

  .creation
    width 100%
    height 500px
    background: white

    .creation-info
      width 68%
      padding 10px 20px

      div
        padding 2px 0

        div
          float left

        .input-small
          width 50px

        .ivu-radio-wrapper
          margin-right 25px

      .btn-create
        width 50%
        height 40px
        margin-top 30px
        margin-left 25%
        font-size 1.2em

  @media screen and (min-width: 1524px)

    .creation-info
      min-width 745px

      div
        height 50px
        line-height 50px

      .label
        width 64px
        margin 0 10px
        font-size 1.3em

      .label-inline
        margin-left 6%

      .ivu-input-wrapper
        width 36.4%
        min-width 271px

      .input-small
        min-width 50px

      .radio
        font-size 1.2em
        line-height 50px

    .remark
      height 210px
      padding-top 10px

      div
        line-height 40px

      .ivu-input-wrapper
        width 88%
        min-width 640px

    .btn-create
      min-width 340px

  @media screen and (min-width: 1224px) and (max-width: 1524px)

    .creation-info
      width 68%

      div
        height 50px
        line-height 50px

      .label
        width 60px
        margin 0 10px
        font-size 1.2em

      .label-inline
        margin-left 6%

      .ivu-input-wrapper
        width 32%

      .input-small
        min-width 50px

      .radio
        font-size 1.2em
        line-height 50px

    .remark
      height 210px
      padding-top 10px

      div
        line-height 40px

      .ivu-input-wrapper
        width 80%

    .btn-create
      min-width 340px

  @media screen and (min-width: 1024px) and (max-width: 1224px)

    .creation-info
      width 500px

      div
        height 40px
        padding-top 2px
        line-height 40px

        .label
          width 14%
          margin 0 10px
          font-size 1.2em

        .label-inline
          margin-left 10px

        .ivu-input-wrapper
          width 80%

        .input-small
          min-width 50px
          margin-right 4%

        .radio
          font-size 1.2em
          line-height 35px

        .ivu-radio-group
          width 80%

      .remark
        height 140px
        padding-top 10px

        div
          line-height 35px

        .ivu-input-wrapper
          width 80%

      .btn-create
        width 50%
</style>
