<template>
  <div>
    <div class="editor">
      <span class="add"></span>
      <span class="delete"></span>
      <span class="edit"></span>
    </div>
    <div class="info">
      <div class="course-info">
        <img src="./default.jpg">
        <div>
          <h2 ref="courseNameField">健身课程001</h2>
          <h3>课程导师： 邓国雄</h3>
          <h3 ref="courseIdField">ID：01</h3>
          <h3 ref="courseCapacityField">容量： 3人</h3>
          <h3>注册时间：2017-04-14</h3>
        </div>
      </div>
      <div class="order-info">
        <div>
          <h3>约课ID： 01</h3>
          <h3>约课容量： 3人</h3>
          <h3>约课时间段： 14：00 - 17：00</h3>
          <h3>约课注册时间： 2017-08-08</h3>
        </div>
        <div>
          <star :size="36" :rating="5" class="star"></star>
          <h2>5</h2>
          <h4>评价星数</h4>
        </div>
      </div>
    </div>
    <div class="order-user">
      <div>
        <ul>
          <li>
            头像
          </li>
          <li>
            <div>
              用户名
            </div>
          </li>
          <li>
            <div>
              年龄
            </div>
          </li>
          <li>
            <div>
              体重
            </div>
          </li>
          <li>
            <div>
              体脂
            </div>
          </li>
          <li>
            <div>
              微信
            </div>
          </li>
          <li>
            <div>
              联系方式
            </div>
          </li>
        </ul>
        <ul>
          <li>
            <img src="../../common/image/default.png">
          </li>
          <li>
            <div>
              邓国雄
              <icon type="female" class="female"></icon>
            </div>
          </li>
          <li>
            <div>
              20
            </div>
          </li>
          <li>
            <div>
              50KG
            </div>
          </li>
          <li>
            <div>
              15%
            </div>
          </li>
          <li>
            <div>
              gx-deng
            </div>
          </li>
          <li>
            <div>
              110
            </div>
          </li>
        </ul>
        <ul>
          <li>
            <img src="../../common/image/default.png">
          </li>
          <li>
            <div>
              邓国雄
              <icon type="female" class="female"></icon>
            </div>
          </li>
          <li>
            <div>
              20
            </div>
          </li>
          <li>
            <div>
              50KG
            </div>
          </li>
          <li>
            <div>
              15%
            </div>
          </li>
          <li>
            <div>
              gx-deng
            </div>
          </li>
          <li>
            <div>
              110
            </div>
          </li>
        </ul>
        <ul>
          <li>
            <img src="../../common/image/default.png">
          </li>
          <li>
            <div>
              邓国雄
              <icon type="female" class="female"></icon>
            </div>
          </li>
          <li>
            <div>
              20
            </div>
          </li>
          <li>
            <div>
              50KG
            </div>
          </li>
          <li>
            <div>
              15%
            </div>
          </li>
          <li>
            <div>
              gx-deng
            </div>
          </li>
          <li>
            <div>
              110
            </div>
          </li>
        </ul>
        <ul>
          <li>
            <img src="../../common/image/default.png">
          </li>
          <li>
            <div>
              邓国雄
              <icon type="female" class="female"></icon>
            </div>
          </li>
          <li>
            <div>
              20
            </div>
          </li>
          <li>
            <div>
              50KG
            </div>
          </li>
          <li>
            <div>
              15%
            </div>
          </li>
          <li>
            <div>
              gx-deng
            </div>
          </li>
          <li>
            <div>
              110
            </div>
          </li>
        </ul>
        <ul>
          <li>
            <img src="../../common/image/default.png">
          </li>
          <li>
            <div>
              邓国雄
              <icon type="female" class="female"></icon>
            </div>
          </li>
          <li>
            <div>
              20
            </div>
          </li>
          <li>
            <div>
              50KG
            </div>
          </li>
          <li>
            <div>
              15%
            </div>
          </li>
          <li>
            <div>
              gx-deng
            </div>
          </li>
          <li>
            <div>
              110
            </div>
          </li>
        </ul>
        <ul>
          <li>
            <img src="../../common/image/default.png">
          </li>
          <li>
            <div>
              邓国雄
              <icon type="female" class="female"></icon>
            </div>
          </li>
          <li>
            <div>
              20
            </div>
          </li>
          <li>
            <div>
              50KG
            </div>
          </li>
          <li>
            <div>
              15%
            </div>
          </li>
          <li>
            <div>
              gx-deng
            </div>
          </li>
          <li>
            <div>
              110
            </div>
          </li>
        </ul>
        <ul>
          <li>
            <img src="../../common/image/default.png">
          </li>
          <li>
            <div>
              邓国雄
              <icon type="female" class="female"></icon>
            </div>
          </li>
          <li>
            <div>
              20
            </div>
          </li>
          <li>
            <div>
              50KG
            </div>
          </li>
          <li>
            <div>
              15%
            </div>
          </li>
          <li>
            <div>
              gx-deng
            </div>
          </li>
          <li>
            <div>
              110
            </div>
          </li>
        </ul>
      </div>
      <Page :current="1" :total="50" page-size="7" simple></Page>
    </div>
  </div>
</template>

<script>
  import Star from 'base/star/star'
  export default {
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

  .info
    width 100%
    height 200px
    margin-top 50px

  .course-info
    float left
    width 48%
    height 200px
    background white

    img
      float left
      width 246px
      margin 40px 20px

    div
      float left

    h2
      margin-top 32px
      margin-left 10px
      font-size 1.8em

    h3
      margin-left 10px
      color grey
      font-size 1.4em

  .order-info
    float left
    width 51%
    height 200px
    margin-left 1%
    background white

    div
      float left
      width 50%
      height  100%
      padding-top 45px

    div:last-child
      text-align center

    h2
      font-size 2em

    h3
      margin-top 2px
      margin-left 30px
      font-size 1.4em

    h4
      font-size 1.4em

    .star
      float none
      width 100%
      height auto
      padding 15px 0


  .order-user
    width 100%
    height 620px
    margin-top 20px
    padding 0 1%
    background white

    ul
      width 98%
      height 60px
      padding 5px 0
      border-bottom 1px solid grey

      li
        float left
        width 14%
        height 100%
        line-height 50px
        font-size 1.3em
        font-weight 600

      li:first-child
        width 16%
        padding-left 20px

        img
          height 50px
          -webkit-border-radius 50%
          -moz-border-radius 50%
          border-radius 50%

      .female
        color pink

      .male
        color blue

    ul:first-child
      font-size 1.1em
      color grey

    .ivu-page
      text-align center
      line-height 40px
</style>
