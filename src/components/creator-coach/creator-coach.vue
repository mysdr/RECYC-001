<template>
  <div class="creation">
    <div class="creation-info">
      <div>
        <div class="label">教练ID</div>
        <Input ref="userId" v-model="userId" placeholder="请输入..."/>
      </div>
      <div>
        <div class="label">账户</div>
        <Input ref="userAccount" v-model="userAccount" placeholder="请输入..."/>
        <div class="label label-inline">密码</div>
        <Input ref="userPassword" v-model="userPassword" placeholder="请输入..."/>
      </div>
      <div>
        <div class="label">用户名</div>
        <Input ref="userName" v-model="userName" placeholder="请输入..."/>
        <div class="label label-inline">性别</div>
        <Radio-group ref="userSex" v-model="userGender">
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
        <Input ref="userAge" v-model="userAge" placeholder="请输入..." class="input-small"/>
        <div class="label label-inline">体重</div>
        <Input ref="userWeight" v-model="userWeight" placeholder="请输入..." class="input-small"/>
        <div class="label label-inline">工作时间</div>
        <Input ref="userWeight" v-model="userWeight" placeholder="请输入..." class="input-small"/>
      </div>
      <div>
        <div class="label">工作地方</div>
        <Input ref="userId" v-model="userId" placeholder="请输入..."/>
      </div>
      <div>
        <div class="label">微信</div>
        <Input ref="userWechat" v-model="userWechat" placeholder="请输入..."/>
        <div class="label label-inline ">联系方式</div>
        <Input ref="userConnect" v-model="userConnect" placeholder="请输入..."/>
      </div>
      <div class="remark">
        <div class="label">备注</div>
        <Input ref="userNote" v-model="userNote" type="textarea" placeholder="请输入..." :rows="5" class="textarea"/>
      </div>
      <Button type="primary" class="btn-create" @click="_createUser()">添加</Button>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">

</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  pink = #FF69B4
  blue = #2d8cf0
  grey = #d7dde4
  white = #fff

  .creation
    width 100%
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
