<template>
  <div>
    <div class="editor">
      <span class="add" ></span>
      <span class="delete" ></span>
      <span class="edit" ></span>
    </div>
    <div class="course-info">
      <img src="./default.jpg">
      <div>
        <h2>健身课程001</h2>
        <h3>课程容量：1人</h3>
        <h3>课程创建时间：2017.08.08</h3>
      </div>
    </div>
    <div class="course-bottom">
      <div class="course-teacher">
        <img src="../../common/image/default.png">
        <div>
          <h2>
            导师：邓国雄
            <icon type="female" class="female"></icon>
          </h2>
          <h3>微信：airing</h3>
          <h3>联系方式：110</h3>
        </div>
      </div>
      <div class="course-content">
        <h2>课程简介</h2>
        <div>
          课程简介……
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Star from 'base/star/star'

  export default {
    data () {
      return {
        mode: 0
      }
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
