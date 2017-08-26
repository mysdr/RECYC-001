<template>
  <div>
    <div class="editor">
      <span class="add" @click="_selectAdd()"></span>
      <span class="delete" @click="_selectDelete()"></span>
      <span class="edit" @click="_selectEdit()"></span>
    </div>
    <div class="course-info">
      <img src="./default.jpg">
      <div>
        <h2 ref="courseNameField" @click="_edit('course_name')">{{course.course_name}}</h2>
        <h3 ref="courseIdField" @click="_edit('course_id')">ID：{{course.course_id}}</h3>
        <h3 ref="courseCapacityField" @click="_edit('course_capacity')">容量：{{course.course_capacity}} 人</h3>
        <h3>注册时间：{{_toDate(course.course_register)}}</h3>
      </div>
    </div>
    <div class="course-bottom">
      <div class="course-teacher">
        <img src="../../common/image/default.png">
        <div>
          <h2>
            <span ref="courseTeacherField" @click="_edit('course_teacher')">导师：{{course.course_teacher}}</span>
            <icon type="female" class="female"></icon>
          </h2>
          <h3>微信：airing</h3>
          <h3>联系方式：13188888888</h3>
        </div>
      </div>
      <div class="course-content">
        <h2>课程简介</h2>
        <div ref="courseContentField" @click="_edit('course_content')">
          {{course.course_content}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Star from 'base/star/star'
  import { mapGetters, mapMutations } from 'vuex'
  import { remove, edit } from 'api/course'

  export default {
    data () {
      return {
        mode: 0
      }
    },
    computed: {
      ...mapGetters([
        'token',
        'uid',
        'timestamp',
        'course'
      ])
    },
    methods: {
      _toDate(ts) {
        let date = new Date(ts)
        return date.getYear() + 1900 + '年' + date.getMonth() + '月' + date.getDate() + '日'
      },
      _selectAdd() {
        this.$router.push({
          path: '/course/creator'
        })
      },
      _selectDelete() {
        let params = {
          uid: this.uid,
          token: this.token,
          timestamp: this.timestamp
        }
        this.$swal({
          title: '是否确定',
          text: '您将删除该课程，该操作不可逆!',
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#DD6B55',
          confirmButtonText: '删除',
          cancelButtonText: '取消',
          closeOnConfirm: false,
          closeOnCancel: false
        }, function (isConfirm) {
          if (isConfirm) {
            remove(params, this.course.id).then(res => {
              if (res.code === 0) {
                this.$swal('删除成功!', '您已成功删除该课程数据！', 'success')
                this.$router.push({
                  path: '/course'
                })
              }
            })
          }
        })
      },
      _selectEdit() {
        if (this.mode === 0) {
          this.$swal('编辑模式！', '您已进入编辑模式，点击蓝色元素可以修改用户数据，再次点击编辑按钮可以退出编辑模式。', 'success')
          this.mode = 1
          this.$refs.courseNameField.style.color = '#0F88EB'
          this.$refs.courseIdField.style.color = '#0F88EB'
          this.$refs.courseContentField.style.color = '#0F88EB'
          this.$refs.courseTeacherField.style.color = '#0F88EB'
          this.$refs.courseCapacityField.style.color = '#0F88EB'
        } else {
          this.$swal('退出编辑模式！', '您已退出编辑模式，再次点击编辑按钮可以进入编辑模式。', 'success')
          this.$refs.courseNameField.style.color = 'black'
          this.$refs.courseIdField.style.color = 'black'
          this.$refs.courseContentField.style.color = 'black'
          this.$refs.courseTeacherField.style.color = 'black'
          this.$refs.courseCapacityField.style.color = 'black'
          this.mode = 0
        }
      },
      _edit(field) {
        if (this.mode === 1) {
          this.$swal({
            title: '请输入更新的数据内容',
            input: 'text',
            showCancelButton: true,
            confirmButtonText: '确定',
            showLoaderOnConfirm: true,
            allowOutsideClick: false
          }).then(text => {
            let params = {
              uid: this.uid,
              token: this.token,
              timestamp: this.timestamp,
              field: text
            }
            edit(params, this.course.id, field).then(res => {
              console.log(res)
              if (res.code === 0) {
                this.setCourse(res.course)
              }
            })
          })
        }
      },
      ...mapMutations({
        setCourse: 'SET_COURSE'
      })
    },
    components: {
      Star
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/mixin"

  pink = #FF69B4
  blue = #2d8cf0
  grey = #b6bbc2
  white = #fff

  .editor
    position absolute
    left 0
    top 0
    width 100%
    height 50px
    background #f5f7f9
    box-shadow 0 1px 1px rgba(0, 0, 0, 0.1)
    font-size 2.5em
    color black

    .add
      display inline-block
      vertical-align top
      margin 15px 5px
      margin-left 20px
      width 20px
      height 20px
      background-size 20px 20px
      background-repeat no-repeat
      bg-image('add')

    .delete
      display inline-block
      vertical-align top
      margin 15px 5px
      width 20px
      height 20px
      background-size 20px 20px
      background-repeat no-repeat
      bg-image('delete')

    .edit
      display inline-block
      vertical-align top
      margin 15px 5px
      width 20px
      height 20px
      background-size 20px 20px
      background-repeat no-repeat
      bg-image('edit')

  .course-info
    width 100%
    height 200px
    margin-top 50px
    background white

    img
      float left
      width 246px
      margin 40px 20px

    div
      float left

    h2
      margin-top 40px
      margin-left 10px
      font-size 1.8em

    h3
      margin-left 10px
      color grey
      font-size 1.4em

  .course-bottom
    width 100%
    height 200px
    margin-top 20px

    div
      float left
      height 100%
      background white

    .course-teacher
      width 49%

      img
        float left
        width 100px
        margin 50px 20px
        -webkit-border-radius 50%
        -moz-border-radius 50%
        border-radius 50%

      div
        float left
        height auto

      h2
        margin-top 50px
        margin-left 10px
        font-size 1.6em

        .female
          color pink

        .male
          color blue

      h3
        margin-left 10px
        color grey
        font-size 1.3em

    .course-content
      width 49%
      margin-left 2%

      h2
        margin-top 13px
        padding 0 20px

      div
        width 100%
        height auto
        padding 8px 20px
        font-size 1.2em
        color grey
        line-height 150%
        text-indent 20px

</style>
