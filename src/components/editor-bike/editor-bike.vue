<template>
  <div>
    <div class="editor">
      <span class="add"></span>
      <span class="delete"></span>
      <span class="edit"></span>
    </div>
    <div class="bike-info">
      <div>
        <h2>
          ID:001
          <span class="bike-used unused">
            未使用
          </span>
        </h2>
        <h3>动感单车</h3>
        <h3>位置：H03</h3>
        <h3>注册时间：2017.02.25</h3>
        <h3>最后维护时间：2017.08.08</h3>
      </div>
    </div>

  </div>
</template>

<script>

  export default {
    data () {
      return {
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/mixin"

  pink = #FF69B4
  blue = #2d8cf0
  grey = #b6bbc2
  white = #fff
  using = rgba(255, 60, 45, 0.9)
  unused = rgba(0, 153, 0, 0.9)

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

  .bike-info
    width 100%
    height 170px
    margin-top 50px

    div
      float left
      height 100%
      background white

    div:first-child
      width 35%
      margin-right 1%
      padding 10px

    h2
      font-size 2em

    .bike-used
      float right
      padding-top 11px
      font-size 0.7em

    .using
      color using

    .unused
      color unused

    h3
      margin-top 1px
      font-size 1.4em
</style>
