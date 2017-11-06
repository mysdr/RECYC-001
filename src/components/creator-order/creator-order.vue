<template>
  <div class="creation">
    <div class="creation-info">
      <div>
        <div class="label">约课ID</div>
        <Input ref="datingId" v-model="datingId" placeholder="请输入..."/>
      </div>
      <div>
        <div class="label">课程ID</div>
        <Input ref="courseId" v-model="courseId" placeholder="请输入..."/>
      </div>
      <div>
        <div class="label">教练ID</div>
        <Input ref="courseId" v-model="coachId" placeholder="请输入..."/>
      </div>
      <div>
        <div class="label label-inline">约课容量</div>
        <Input type="number" class="input-small" ref="datingCapacity" v-model="datingCapacity" placeholder="请输入..." />
      </div>
      <div>
        <div class="label">约课地点</div>
        <Input ref="datingPlace" v-model="datingPlace" placeholder="请输入..."/>
      </div>
      <div>
        <div class="label">约课时间</div>
        <Row class="datepicker">
          <Col span="24">
          <TimePicker type="timerange" v-model="datingTime" format="HH:mm" placeholder="选择时间" :value="datingTime"></TimePicker>
          </Col>
        </Row>
      </div>
      <div>
        <div class="label">约课日期</div>
        <Row class="datepicker">
          <Col span="24">
            <DatePicker type="date" v-model="datingDate" format="yyyy-MM-dd" placeholder="选择日期" :value="datingDate"></DatePicker>
          </Col>
        </Row>
      </div>
      <Button type="primary" class="btn-create" @click="_createOrder">添加</Button>
    </div>
    <div class="clear"></div>
  </div>
</template>

<script type="text/ecmascript-6">
  import { mapGetters } from 'vuex'
  import { create } from 'api/dating'
  export default {
    data() {
      return {
        courseId: '',
        coachId: '',
        datingId: '',
        datingPlace: '',
        datingCapacity: '',
        datingTime: [],
        datingDate: ''
      }
    },
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
      _createOrder () {
        let hour0 = this.datingTime[0].getHours()
        let minute0 = this.datingTime[0].getMinutes()
        if (hour0 < 10) {
          hour0 = '0' + hour0
        }
        if (minute0 < 10) {
          minute0 = '0' + minute0
        }
        let hour1 = this.datingTime[1].getHours()
        let minute1 = this.datingTime[1].getMinutes()
        if (hour1 < 10) {
          hour1 = '0' + hour1
        }
        if (minute1 < 10) {
          minute1 = '0' + minute1
        }
        let params = {
          uid: this.uid,
          token: this.token,
          timestamp: this.timestamp,
          courseId: this.courseId,
          coachId: this.coachId,
          dating_id: this.datingId,
          dating_place: this.datingPlace,
          dating_rating: 0,
          dating_users: '',
          dating_time: hour0 + ':' + minute0 + '-' + hour1 + ':' + minute1,
          dating_date: this.datingDate.getFullYear() + '-' + this.datingDate.getMonth() + '-' + this.datingDate.getDate(),
          dating_capacity: this.datingCapacity,
          dating_register: +new Date()
        }
        console.log(params)
        create(params).then(res => {
          console.log(res)
          if (res.code === 0) {
            this.$swal('添加成功!', '您已成功录入该课程数据！', 'success')
            this.$router.push({
              path: '/order/'
            })
          }
        })
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
    background: white
    @media (min-width: 1024px) and (max-width: 1224px)
      height 280px

    .creation-info
      float left
      width 68%
      padding 10px 20px
      @media (min-width: 1524px)
        min-width 745px
      @media (min-width: 1224px) and (max-width: 1524px)
        width 68%
      @media (min-width: 1024px) and (max-width: 1224px)
        width 550px

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
            width 85px
            margin 0 10px
            font-size 1.3em
          @media (min-width: 1224px) and (max-width: 1524px)
            width 80px
            margin 0 10px
            font-size 1.2em
          @media (min-width: 1024px) and (max-width: 1224px)
            width 80px
            margin 0 10px
            font-size 1.2em

        .selection
          padding-top 9px

        .datepicker
          width 36%
          padding 0

        .ivu-col, .timepicker, .ivu-date-picker
          padding 0

        .ivu-date-picker
          margin-top 9px
          margin-right 10%
          line-height 32px !important

        .ivu-input-wrapper
          @media (min-width: 1524px)
            width 36.4%
            min-width 271px
          @media (min-width: 1224px) and (max-width: 1524px)
            width 40%
          @media (min-width: 1024px) and (max-width: 1224px)
            width 80%

        .input-small
          width 150px
          @media (min-width: 1524px)
            min-width 150px
          @media (min-width: 1224px) and (max-width: 1524px)
            min-width 150px
          @media (min-width: 1024px) and (max-width: 1224px)
            min-width 150px
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

  .clear
    clear both
</style>
