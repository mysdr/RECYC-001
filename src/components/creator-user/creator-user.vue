<template>
  <div class="creation">
    <div class="creation-info">
      <div>
        <div class="label">用户ID</div>
        <Input ref="userId" @on-blur="_checkInput()" placeholder="请输入..."/>
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
        <Input ref="userNote" type="textarea" placeholder="请输入..." rows="5" class="textarea"/>
      </div>
      <Button type="primary" class="btn-create" @click="_createUser()">添加</Button>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import sha1 from 'sha1'
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
          user_password: sha1(this.$refs.userPassword.value),
          user_name: this.$refs.userName.value,
          user_sex: this.$refs.userSex.value === 'male' ? 0 : 1,
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
      },
      _checkInput(value) {
        console.log(value)
        if (value) {
          console.log(value)
        } else {
          console.log('err')
        }
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
    @media (min-width: 1024px) and (max-width: 1224px)
      height 530px

    .creation-info
      width 68%
      padding 10px 20px
      @media (min-width: 1524px)
        min-width 745px
      @media (min-width: 1224px) and (max-width: 1524px)
        width 68%
      @media (min-width: 1024px) and (max-width: 1224px)
        width 500px


      div
        padding 2px 0
        @media (min-width: 1524px)
          height 50px
          line-height 50px
        @media (min-width: 1224px) and (max-width: 1524px)
          height 50px
          line-height 50px
        @media (min-width: 1024px) and (max-width: 1224px)
          height 40px
          padding-top 2px
          line-height 40px

        div
          float left

        .label
          @media (min-width: 1524px)
            width 64px
            margin 0 10px
            font-size 1.3em
          @media (min-width: 1224px) and (max-width: 1524px)
            width 60px
            margin 0 10px
            font-size 1.2em
          @media (min-width: 1024px) and (max-width: 1224px)
            width 14%
            margin 0 10px
            font-size 1.2em

        .label-inline
          @media (min-width: 1524px)
            margin-left 6%
          @media (min-width: 1224px) and (max-width: 1524px)
            margin-left 6%
          @media (min-width: 1024px) and (max-width: 1224px)
            margin-left 10px

        .ivu-input-wrapper
          @media (min-width: 1524px)
            width 36.4%
            min-width 271px
          @media (min-width: 1224px) and (max-width: 1524px)
            width 32%
          @media (min-width: 1024px) and (max-width: 1224px)
            width 80%

        .input-small
          width 50px
          @media (min-width: 1524px)
            min-width 50px
          @media (min-width: 1224px) and (max-width: 1524px)
            min-width 50px
          @media (min-width: 1024px) and (max-width: 1224px)
            min-width 50px
            margin-right 4%

        .radio
          @media (min-width: 1524px)
            font-size 1.2em
            line-height 50px
          @media (min-width: 1224px) and (max-width: 1524px)
            font-size 1.2em
            line-height 50px
          @media (min-width: 1024px) and (max-width: 1224px)
            font-size 1.2em
            line-height 35px

        .ivu-radio-wrapper
          margin-right 25px

        .ivu-radio-group
          @media (min-width: 1024px) and (max-width: 1224px)
            width 80%

      .remark
        @media (min-width: 1524px)
          height 140px
          padding-top 10px
        @media (min-width: 1224px) and (max-width: 1524px)
          height 140px
          padding-top 10px
        @media (min-width: 1024px) and (max-width: 1224px)
          height 230px
          padding-top 10px

        div
          @media (min-width: 1524px)
            line-height 40px
          @media (min-width: 1224px) and (max-width: 1524px)
            line-height 40px
          @media (min-width: 1024px) and (max-width: 1224px)
            line-height 35px

        .textarea
          @media (min-width: 1524px)
            width 88%
            min-width 640px
          @media (min-width: 1224px) and (max-width: 1524px)
            width 80%
          @media (min-width: 1024px) and (max-width: 1224px)
            width 80%

      .btn-create
        width 50%
        height 40px
        margin-top 30px
        margin-left 25%
        font-size 1.2em
        @media (min-width: 1524px)
          min-width 340px
        @media (min-width: 1224px) and (max-width: 1524px)
          min-width 340px
        @media (min-width: 1024px) and (max-width: 1224px)
          width 50%

</style>
