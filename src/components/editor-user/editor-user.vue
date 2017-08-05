<template>
  <div>
    <div class="editor">
      <span class="add"></span>
      <span class="delete"></span>
      <span class="edit"></span>
    </div>
    <div class="user">
      <img src="../../common/image/default.png" class="userinfo-head">
      <div class="userinfo">
        <h3>
          邓国雄
          <icon type="female" class="female"></icon>
        </h3>
        <h4>用户账号：airing</h4>
        <h4>用户注册时间：2017.06.01</h4>
      </div>
      <div class="remark">
        <h3>
          备注
        </h3>
        <h4>
          备注……
        </h4>
      </div>
    </div>
    <div class="user-mid">
      <div>
        <div>
          <icon type="stats-bars" color="grey" size="25"></icon>
          <h2>50KG</h2>
          <h3>体重</h3>
          <icon type="arrow-down-c" color="green" size="18"></icon>
          <span>1KG</span>
        </div>
        <div>
          <icon type="stats-bars" color="grey" size="25"></icon>
          <h2>15%</h2>
          <h3>体脂</h3>
          <icon type="arrow-down-c" color="green" size="18"></icon>
          <span>0.1%</span>
        </div>
      </div>
      <div>
        <div>
          <icon type="ios-timer-outline" color="grey" size="25"></icon>
          <h2>30h</h2>
          <h3>课程时长</h3>
        </div>
        <div>
          <icon type="ios-star-outline" color="grey" size="25"></icon>
          <h2>100</h2>
          <h3>评价星数</h3>
        </div>
      </div>
    </div>
    <div class="user-bottom">
      <div class="user-bottomleft">
        <div class="lesson">
          <ul>
            <li>
              2017.06.09
            </li>
            <li>
              14:00 - 17:00
            </li>
            <li>
              健身课程001
            </li>
            <li>
              3h
            </li>
            <li>
              <star></star>
            </li>
          </ul>
        </div>
        <div class="lesson">
          <ul>
            <li>
              2017.06.10
            </li>
            <li>
              14:00 - 17:00
            </li>
            <li>
              健身课程001
            </li>
            <li>
              3h
            </li>
            <li>
              <star></star>
            </li>
          </ul>
        </div>
        <div class="lesson">
          <ul>
            <li>
              2017.06.10
            </li>
            <li>
              14:00 - 17:00
            </li>
            <li>
              健身课程001
            </li>
            <li>
              3h
            </li>
            <li>
              <star></star>
            </li>
          </ul>
        </div>
        <div class="lesson">
          <ul>
            <li>
              2017.06.10
            </li>
            <li>
              14:00 - 17:00
            </li>
            <li>
              健身课程001
            </li>
            <li>
              3h
            </li>
            <li>
              <star></star>
            </li>
          </ul>
        </div>
        <div class="lesson">
          <ul>
            <li>
              2017.06.10
            </li>
            <li>
              14:00 - 17:00
            </li>
            <li>
              健身课程001
            </li>
            <li>
              3h
            </li>
            <li>
              <star></star>
            </li>
          </ul>
        </div>
      </div>
      <div class="user-bottomright">
        <div>
          <h2>
            ID
          </h2>
          <h3>
            1123581321
          </h3>
        </div>
        <div>
          <h2>
            微信
          </h2>
          <h3>
            Wechat
          </h3>
        </div>
        <div>
          <h2>
            电话
          </h2>
          <h3>
            110
          </h3>
        </div>
      </div>
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
    top 50px
    width 100%
    height 50px
    background #f5f7f9
    box-shadow 0 1px 1px rgba(0,0,0,0.1)
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

  .user
    width 100%
    height 200px
    margin-top 50px
    background white
    -webkit-border-radius 5px
    -moz-border-radius 5px
    border-radius 5px

    .userinfo-head
      float left
      min-width 100px
      margin 36px
      margin-bottom 0
      -webkit-border-radius 50%
      -moz-border-radius 50%
      border-radius 50%

    .userinfo
      float left
      width 20%
      min-width 200px
      margin 36px
      margin-top 60px

    .userinfo h3
      font-size 1.5em

      .female
        color pink

      .male
        color blue

    .userinfo h4
      margin-top 10px
      font-size 1.2em
      color grey

    .userinfo h4:last-child
      margin-top 0

    .remark
      float left
      width 40%
      min-width 300px
      height 100px
      margin 36px

    .remark h3
      font-size 1.5em
      color white

    .remark h4
      margin-top 10px
      font-size 1.2em
      color grey

  .user-mid div
    float left
    width 49%
    height 200px
    margin-top 20px
    margin-right 2%
    background white
    -webkit-border-radius 5px
    -moz-border-radius 5px
    border-radius 5px

    div
      width 50%
      margin 0
      padding-top 35px
      text-align center

      h2
        font-size 3em

      span
        font-size 1.2em
        font-weight 600
        color green


  .user-mid div:last-child
    margin-right 0

  .user-bottomleft
    float left
    width 64%
    height 300px
    margin-top 20px
    margin-right 2%
    background white
    -webkit-border-radius 5px
    -moz-border-radius 5px
    border-radius 5px

    .lesson
      width 90%
      height 20%
      margin 0 5%
      border-bottom 1px solid grey

    .lesson:last-child
      border-bottom 0

    .lesson:hover
      background #f5f7f9

    .lesson li
      float left
      width 18%
      padding-right 15px
      font-size 1.25em
      font-weight 600
      text-align center
      line-height 60px

    .lesson li:first-child
      font-size 1.5em


  .user-bottomright
    float left
    width 34%
    height 300px
    margin-top 20px
    background white
    -webkit-border-radius 5px
    -moz-border-radius 5px
    border-radius 5px

    div
      clear both
      margin 0 7.5%
      padding 20px 2px
      width 85%
      height 33%
      border-bottom 1px solid lightgrey

      h3
        margin-top 5px
        font-size 1.3em
        color grey

    div:last-child
      border-bottom 0


</style>
