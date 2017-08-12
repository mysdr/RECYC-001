<template>
  <div class="creation">
    <div class="creation-info">
      <div>
        <div class="label">课程ID</div>
        <Input ref="courseId" v-model="courseId" placeholder="请输入..."/>
      </div>
      <div>
        <div class="label">课程名称</div>
        <Input ref="courseName" v-model="courseName" placeholder="请输入..."/>
      </div>
      <div>
        <div class="label">导师</div>
        <Select v-model="courseTeacher" class="ivu-input-wrapper selection">
          <Option-group label="男性导师">
            <Option v-for="item in male" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Option-group>
          <Option-group label="女性导师">
            <Option v-for="item in female" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Option-group>
        </Select>
      </div>
      <div>
        <div class="label label-inline">课程容量</div>
        <Input type="number" ref="courseCapacity" v-model="courseCapacity" placeholder="请输入..." class="input-small"/>
      </div>
      <div class="remark">
        <div class="label">课程简介</div>
        <Input ref="userNote" v-model="courseContent" type="textarea" placeholder="请输入..." rows="5" class="textarea"/>
      </div>
      <Button type="primary" class="btn-create" @click="_createCourse()">添加</Button>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import { mapGetters } from 'vuex'
  import { create } from 'api/course'

  export default {
    data() {
      return {
        courseId: '',
        courseName: '',
        courseTeacher: '',
        courseCapacity: '',
        courseContent: '',
        male: [
          {
            value: 'airing',
            label: '邓国雄'
          },
          {
            value: 'LZH',
            label: '梁志豪'
          }
        ],
        female: [
          {
            value: 'airing-female',
            label: '邓国雄'
          },
          {
            value: 'LZH-female',
            label: '梁志豪'
          }
        ]
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
      _createCourse () {
        let params = {
          uid: this.uid,
          token: this.token,
          timestamp: this.timestamp,
          course_id: 'id',
          course_name: this.$refs.courseName.value,
          course_content: this.$refs.courseContent.value,
          course_teacher: this.$refs.courseTeacher.value,
          course_capacity: this.$refs.courseCapacity.value,
          course_register: +new Date()
        }
        create(params).then(res => {
          if (res.code === 0) {
            this.$swal('添加成功!', '您已成功录入该会员数据！', 'success')
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

        .selection
          padding-top 9px

        .timepicker
          width 100%
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
