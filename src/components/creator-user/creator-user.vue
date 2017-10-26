<template>
  <div class="creation">
    <div class="creation-info">
      <div>
        <div class="label">用户ID</div>
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
        <div class="label label-inline">身高</div>
        <Input ref="userHeight" v-model="userHeight" placeholder="请输入..." class="input-small"/>
        <div class="label label-inline">体重</div>
        <Input ref="userWeight" v-model="userWeight" placeholder="请输入..." class="input-small"/>
      </div>
      <div>
        <div class="label">肌肉量</div>
        <Input ref="userMuscle" v-model="userMuscle" placeholder="请输入..." class="input-small"/>
        <div class="label label-inline">骨质量</div>
        <Input ref="userBone" v-model="userBone" placeholder="请输入..." class="input-small"/>
        <div class="label label-inline">蛋白质</div>
        <Input ref="userProtein" v-model="userProtein" placeholder="请输入..." class="input-small"/>
      </div>
      <div>
        <div class="label">去脂体重</div>
        <Input ref="userWeightWithoutFat" v-model="userWeightWithoutFat" placeholder="请输入..." class="input-small"/>
        <div class="label label-inline">体脂肪量</div>
        <Input ref="userFat" v-model="userFat" placeholder="请输入..." class="input-small"/>
        <div class="label label-inline">身体水分</div>
        <Input ref="userWater" v-model="userWater" placeholder="请输入..." class="input-small"/>
      </div>
      <div>
        <div class="label">腰臀比</div>
        <Input ref="userWhr" v-model="userWhr" placeholder="请输入..." class="input-small"/>
        <div class="label label-inline">体质指数</div>
        <Input ref="userBmi" v-model="userBmi" placeholder="请输入..." class="input-small"/>
        <div class="label label-inline">体脂%</div>
        <Input ref="userPbf" v-model="userPbf" placeholder="请输入..." class="input-small"/>
      </div>
      <div>
        <div class="label">内脏脂肪</div>
        <Input ref="userVisceralFat" v-model="userVisceralFat" placeholder="请输入..." class="input-small"/>
        <div class="label label-inline">标准体重</div>
        <Input ref="userSbw" v-model="userSbw" placeholder="请输入..." class="input-small"/>
        <div class="label label-inline">控制体重</div>
        <Input ref="userWeightControl" v-model="userWeightControl" placeholder="请输入..." class="input-small"/>
      </div>
      <div>
        <div class="label">基础代谢</div>
        <Input ref="userBasalMetabolism" v-model="userBasalMetabolism" placeholder="请输入..." class="input-small"/>
        <div class="label label-inline">健康评分</div>
        <Input ref="userHealthScore" v-model="userHealthScore" placeholder="请输入..." class="input-small"/>
        <div class="label label-inline">控制脂肪</div>
        <Input ref="userControlFat" v-model="userControlFat" placeholder="请输入..." class="input-small"/>
      </div>
      <div>
        <div class="label">控制肌肉</div>
        <Input ref="userControlMuscle" v-model="userControlMuscle" placeholder="请输入..." class="input-small"/>
        <div class="label label-inline">生理年龄</div>
        <Input ref="userAge" v-model="userAge" placeholder="请输入..." class="input-small"/>
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
  import sha1 from 'sha1'
  import { mapGetters } from 'vuex'
  import { create } from 'api/user'

  export default {
    data() {
      return {
        userId: '',
        userAccount: '',
        userPassword: '',
        userName: '',
        userGender: 'male',
        userAge: '',
        userHeight: '',
        userWeight: '',
        userMuscle: '',
        userBone: '',
        userProtein: '',
        userWeightWithoutFat: '',
        userFat: '',
        userWater: '',
        userWhr: '',
        userBmi: '',
        userPbf: '',
        userVisceralFat: '',
        userSbw: '',
        userWeightControl: '',
        userBasalMetabolism: '',
        userHealthScore: '',
        userControlFat: '',
        userControlMuscle: '',
        userWechat: '',
        userConnect: '',
        userNote: ''
      }
    },
    computed: {
      ...mapGetters([
        'token',
        'uid',
        'timestamp'
      ])
    },
    methods: {
      _createUser() {
        let userInfo = [this.userId, this.userAccount, this.userPassword, this.userName, this.userGender, this.userAge, this.userWeight, this.userFat, this.userWechat, this.userConnect, this.userNote]
        let i = 0
        userInfo.forEach((item) => {
          if (!item) {
            i++
          }
        })
        if (i === 0) {
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
            user_height: this.$refs.userHeight.value,
            user_weight: this.$refs.userWeight.value,
            user_muscle: this.$refs.userMuscle.value,
            user_bone: this.$refs.userBone.value,
            user_protein: this.$refs.userProtein.value,
            user_weight_without_fat: this.$refs.userWeightWithoutFat.value,
            user_fat: this.$refs.userFat.value,
            user_water: this.$refs.userWater.value,
            user_whr: this.$refs.userWhr.value,
            user_bmi: this.$refs.userBmi.value,
            user_pbf: this.$refs.userPbf.value,
            user_visceral_fat: this.$refs.userVisceralFat.value,
            user_sbw: this.$refs.userSbw.value,
            user_weight_control: this.$refs.userWeightControl.value,
            user_basal_metabolism: this.$refs.userBasalMetabolism.value,
            user_health_score: this.$refs.userHealthScore.value,
            user_control_fat: this.$refs.userControlFat.value,
            user_control_muscle: this.$refs.userControlMuscle.value,
            user_wechat: this.$refs.userWechat.value,
            user_connect: this.$refs.userConnect.value,
            user_note: this.$refs.userNote.value
          }
          create(params).then(res => {
            if (res.code === 0) {
              this.$swal('添加成功!', '您已成功录入该会员数据！', 'success')
              this.$router.push({
                path: '/user/'
              })
            }
          })
        } else if (i > 0) {
          this.$swal('信息不全！', '请确保您已填完全部信息。', 'error')
        }
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
    height 800px
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
