<template>
  <div class="creation">
    <div class="creation-info">
      <div>
        <div class="label">教练ID</div>
        <Input ref="coachId" v-model="coachId" placeholder="请输入..."/>
      </div>
      <div>
        <div class="label">账户</div>
        <Input ref="coachAccount" v-model="coachAccount" placeholder="请输入..."/>
        <div class="label label-inline">密码</div>
        <Input ref="coachPassword" v-model="coachPassword" placeholder="请输入..."/>
      </div>
      <div>
        <div class="label">用户名</div>
        <Input ref="coachName" v-model="coachName" placeholder="请输入..."/>
        <div class="label label-inline">性别</div>
        <Radio-group ref="coachSex" v-model="coachGender">
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
        <Input ref="coachAge" v-model="coachAge" placeholder="请输入..." class="input-small"/>
        <div class="label label-inline">工作时间</div>
        <Input ref="coachWorkTime" v-model="coachWorkTime" placeholder="请输入..." class="input-small"/>
      </div>
      <div>
        <div class="label">工作地方</div>
        <Input ref="coachPlace" v-model="coachPlace" placeholder="请输入..."/>
      </div>
      <div>
        <div class="label">微信</div>
        <Input ref="coachWechat" v-model="coachWechat" placeholder="请输入..."/>
        <div class="label label-inline ">联系方式</div>
        <Input ref="coachConnect" v-model="coachConnect" placeholder="请输入..."/>
      </div>
      <div class="remark">
        <div class="label">备注</div>
        <Input ref="coachNote" v-model="coachNote" type="textarea" placeholder="请输入..." :rows="5" class="textarea"/>
      </div>
      <Button type="primary" class="btn-create" @click="_createCoach()">添加</Button>
    </div>
    <div class="clear"></div>
  </div>
</template>

<script type="text/ecmascript-6">
  import sha1 from 'sha1'
  import { mapGetters } from 'vuex'
  import { create } from 'api/coach'

  export default {
    mounted () {
    },
    computed: {
      ...mapGetters([
        'token',
        'uid',
        'timestamp'
      ])
    },
    methods: {
      _createCoach() {
        let coachInfo = [this.coachId, this.coachAccount, this.coachPassword, this.coachName, this.coachGender, this.coachAge, this.coachPlace, this.coachWorkTime, this.coachWechat, this.coachConnect, this.coachNote]
        console.log(coachInfo)
        let i = 0
        coachInfo.forEach((item) => {
          if (!item) {
            i++
          }
        })
        if (i === 0) {
          let params = {
            uid: this.uid,
            timestamp: this.timestamp,
            token: this.token,
            coach_id: this.$refs.coachId.value,
            coach_account: this.$refs.coachAccount.value,
            coach_password: sha1(this.$refs.coachPassword.value),
            coach_name: this.$refs.coachName.value,
            coach_sex: this.$refs.coachSex.value === 'male' ? 0 : 1,
            coach_age: this.$refs.coachAge.value,
            coach_place: this.$refs.coachPlace.value,
            coach_work_time: this.$refs.coachWorkTime.value,
            coach_wechat: this.$refs.coachWechat.value,
            coach_connect: this.$refs.coachConnect.value,
            coach_sign: this.$refs.coachNote.value
          }
          create(params).then(res => {
            if (res.code === 200) {
              this.$swal('添加成功!', '您已成功录入该会员数据！', 'success')
              this.$router.push({
                path: '/coach/'
              })
            }
          })
        } else if (i > 0) {
          this.$swal('信息不全！', '请确保您已填完全部信息。', 'error')
        }
      }
    },
    // 使用v-model进行双向绑定获得值，即可进行选择
    data() {
      return {
        coachId: '',
        coachAccount: '',
        coachPassword: '',
        coachName: '',
        coachGender: 'male',
        coachAge: '',
        coachWorkTime: '',
        coachPlace: '',
        coachWechat: '',
        coachConnect: '',
        coachNote: ''
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  pink = #FF69B4
  blue = #2d8cf0
  grey = #d7dde4
  white = #fff

  .clear
    clear both

  .creation
    width 100%
    background: white
    @media (min-width: 1024px) and (max-width: 1224px)
      height 530px

    .creation-info
      float left
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
