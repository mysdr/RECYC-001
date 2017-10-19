<template>
  <div>
    <div class="editor" @click="_selectAdd()">
      <Icon type="android-add-circle" class="add"></Icon>
    </div>
    <div class="course-card"  v-for="dating in datingList" @click="selectDating(dating)">
      <Card>
        <div class="course-info">
          <img src="./default.jpg" class="course-img">
          <div class="course-star">
            <star :size="24" :rating="dating.dating_rating" class="star"></star>
          </div>
          <div class="course-price">
            300￥
          </div>
          <h3>{{dating.course_name}}</h3>
          <h4>导师：{{dating.course_teacher}}</h4>
          <div>约课ID：{{dating.dating_id}}</div>
          <div>约课容量：{{dating.dating_capacity}} 人</div>
          <div>约课地点：维尼亚健身中心</div>
          <div>约课时间段：{{dating.dating_time}}</div>
          <div>约课注册时间：{{_toDate(dating.dating_register)}}</div>
        </div>
      </Card>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Star from 'base/star/star'
  import { mapGetters, mapMutations } from 'vuex'
  import { list } from 'api/dating'

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
        'datingList'
      ])
    },
    methods: {
      _toDate(ts) {
        let date = new Date(ts)
        return date.getYear() + 1900 + '年' + date.getMonth() + '月' + date.getDate() + '日'
      },
      _showList() {
        let params = {
          uid: this.uid,
          timestamp: this.timestamp,
          token: this.token
        }
        list(params).then(res => {
          if (res.code === 0) {
            this.setDatingList(res.datings)
          }
        })
      },
      _selectAdd() {
        this.$router.push({
          path: '/order/creator'
        })
      },
      selectDating(dating) {
        this.$router.push({
          path: `/order/${dating.id}`
        })
        this.setDating(dating)
      },
      ...mapMutations({
        setDatingList: 'SET_DATING_LIST',
        setDating: 'SET_DATING'
      })
    },
    components: {
      Star
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
      text-align center

      .course-star
        height 30px
        margin-top -30px
        padding 0 7px

      .course-price
        width 240px
        height 30px
        margin-top -30px
        color white

      h3
        float left
        font-size 1.2em

      h4
        float right
        padding-top 4px

      div
        clear both
        text-align left
        font-size 1em
        font-weight 600

</style>
