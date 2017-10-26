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
        <Input ref="courseId" v-model="courseTeacher" placeholder="请输入..."/>
      </div>
      <div>
        <div class="label">导师电话</div>
        <Input type="number" ref="courseId" v-model="courseTeacherNumber" placeholder="请输入..."/>
      </div>
      <div>
        <div class="label label-inline">课程容量</div>
        <Input type="number" ref="courseCapacity" v-model="courseCapacity" placeholder="请输入..." class="input-small"/>
      </div>
      <div class="remark">
        <div class="label">课程简介</div>
        <Input ref="userNote" v-model="courseContent" type="textarea" placeholder="请输入..." class="textarea"/>
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
        courseTeacherNumber: '',
        courseCapacity: '',
        courseContent: ''
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
      _createCourse () {
        let params = {
          uid: this.uid,
          token: this.token,
          timestamp: this.timestamp,
          course_id: this.courseId,
          course_name: this.courseName,
          course_content: this.courseContent,
          course_teacher: this.courseTeacher,
          course_capacity: this.courseCapacity,
          course_register: +new Date()
        }
        console.log(params)
        create(params).then(res => {
          if (res.code === 0) {
            this.$swal('添加成功!', '您已成功录入该课程数据！', 'success')
            this.$router.push({
              path: '/course/'
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
    height 450px
    background: white

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

      .remark
        height 100px
        @media (min-width: 1524px)
          padding-top 10px
        @media (min-width: 1224px) and (max-width: 1524px)
          padding-top 10px
        @media (min-width: 1024px) and (max-width: 1224px)
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
