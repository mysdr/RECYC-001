<template>
  <div>
    <div class="editor" @click="_selectAdd()">
      <Icon type="android-add-circle" class="add"></Icon>
    </div>
    <div class="course-card" v-for="course in courseList" @click="selectCourse(course)">
      <Card>
        <div class="course-info">
          <img :src="course.course_title_img" width="246" height="120">
          <h3>{{course.course_name}}</h3>
          <h4>导师：{{course.coach_name}}</h4>
          <div>课程ID：{{course.course_id}}</div>
          <div>容量：{{course.course_capacity}} 人</div>
          <div>注册时间：{{_toDate(course.course_register)}}</div>
        </div>
        <div class="course-content">
          {{course.course_content}}
        </div>
      </Card>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import { mapGetters, mapMutations } from 'vuex'
  import { list } from 'api/course'

  export default {
    created() {
      this._showList()
    },
    mounted() {
      this._showList()
    },
    computed: {
      ...mapGetters([
        'token',
        'timestamp',
        'uid',
        'courseList'
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
      _showList() {
        let params = {
          uid: this.uid,
          timestamp: this.timestamp,
          token: this.token
        }
        list(params).then(res => {
          if (res.code === 0) {
            this.setCourseList(res.courses)
          }
        })
      },
      selectCourse(course) {
        this.$router.push({
          path: `/course/${course.id}`
        })
        this.setCourse(course)
      },
      ...mapMutations({
        setCourseList: 'SET_COURSE_LIST',
        setCourse: 'SET_COURSE'
      })
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">

  pink = #FF69B4
  blue = #2d8cf0
  grey = #d7dde4
  white = #fff

  .editor
    position absolute
    top 90%
    left 93%
    width 40px
    height 40px

    .add
      display inline-block
      vertical-align top
      width 100%
      height 100%
      font-size 3.8em
      color blue

    .add:hover
      color rgba(45, 140, 240, 0.7)

  .course-card
    float left
    width 280px
    margin-right 20px
    margin-bottom 20px

    .course-info
      height 220px
      text-align center

      h3
        float left
        font-size 1.2em

      h4
        float right
        padding-top 6px

      div
        clear both
        text-align left
        font-size 1em
        font-weight 600

    .course-content
      overflow hidden
      height 60px
      color lightgrey

</style>
