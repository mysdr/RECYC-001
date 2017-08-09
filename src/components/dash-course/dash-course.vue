<template>
  <div>
    <div class="editor" >
      <Icon type="android-add-circle" class="add"></Icon>
    </div>
    <div class="course-card">
      <Card>
        <div class="course-info">
          <img src="./default.jpg" class="course-img">
          <h3>健身课程001</h3>
          <h4>邓国雄</h4>
          <div>课程容量：一周</div>
          <div>课程注册时间：2017.06.08</div>
        </div>
        <div class="course-content">
          课程简介
        </div>
      </Card>
    </div>
    <div class="course-card">
      <Card>
        <div class="course-info">
          <img src="./default.jpg" class="course-img">
          <h3>健身课程001</h3>
          <h4>邓国雄</h4>
          <div>课程容量：一周</div>
          <div>课程注册时间：2017.06.08</div>
        </div>
        <div class="course-content">
          课程简介
        </div>
      </Card>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {}
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
      color rgba(45,140,240,0.7)

  .course-card
    float left
    width 280px
    margin-right 20px
    margin-bottom 20px

    .course-info
      height 200px
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
