<template>
  <div class="creation">
    <div class="creation-info">
      <div>
        <div class="label">课程ID</div>
        <Input ref="courseId" v-model="courseId" placeholder="请输入..."/>
      </div>
      <div>
        <div class="label">约课ID</div>
        <Input ref="datingId" v-model="datingId" placeholder="请输入..."/>
      </div>
      <div>
        <div class="label label-inline">约课容量</div>
        <Input type="number" class="input-small" ref="datingCapacity" v-model="datingCapacity" placeholder="请输入..." />
      </div>
      <div>
        <div class="label">约课时间段</div>
        <Row class="datepicker">
          <Col span="24">
          <Date-picker type="daterange" v-model="datingTime" placeholder="选择时间"></Date-picker>
          </Col>
        </Row>
      </div>
      <Button type="primary" class="btn-create" @click="_createOrder">添加</Button>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import { mapGetters } from 'vuex'
  import { create } from 'api/dating'
  export default {
    data() {
      return {
        courseId: '',
        datingId: '',
        datingCapacity: '',
        datingTime: ''
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
      _createOrder () {
        let params = {
          uid: this.uid,
          token: this.token,
          timestamp: this.timestamp,
          course_id: this.courseId,
          dating_id: this.datingId,
          dating_rating: 0,
          dating_users: '',
          dating_time: this.datingTime[0] + '-' + this.datingTime[1],
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
    height 320px
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
            width 85px
            margin 0 10px
            font-size 1.3em
          @media (min-width: 1224px) and (max-width: 1524px)
            width 80px
            margin 0 10px
            font-size 1.2em
          @media (min-width: 1024px) and (max-width: 1224px)
            width 14%
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

</style>
