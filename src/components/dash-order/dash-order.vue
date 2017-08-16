<template>
  <div>
    <div class="editor" @click="_selectAdd()">
      <Icon type="android-add-circle" class="add"></Icon>
    </div>
    <div class="course-card">
      <Card>
        <div class="course-info">
          <img src="./default.jpg" class="course-img">
          <div class="course-star">
            <star :size="24" :rating="5" class="star"></star>
          </div>
          <h3>课程001</h3>
          <h4>导师：邓国雄</h4>
          <div>约课ID：01</div>
          <div>约课容量：10 人</div>
          <div>约课时间段：14:00 - 17:00</div>
          <div>约课注册时间：2017年8月3日</div>
        </div>
      </Card>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Star from 'base/star/star'
  export default {
    methods: {
      _selectAdd() {
        this.$router.push({
          path: '/course/creator'
        })
      }
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
