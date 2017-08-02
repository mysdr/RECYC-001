<template>
  <div>
    <Card class="user-card">
      <div class="userinfo-title">
        <img src="../../common/image/default.png" class="userinfo-head">
        <div class="userinfo-more">
          <span>
            <icon type="edit" size="25" color="white"></icon>
          </span>
        </div>
        <div class="userinfo-flash right">
          <span>
            <icon type="chevron-right" size="25" color="black"></icon>
          </span>
        </div>
        <div class="userinfo-flash left">
          <span>
            <icon type="chevron-left" size="25" color="black"></icon>
          </span>
        </div>
        <div class="userinfo">
          <div>
            邓国雄
            <span>
              <Icon type="female" class="userinfo-gender female"></Icon>
            </span>
          </div>
          <div>
            Age : 99 | Weight : 100kg
          </div>
          <div>
            110
          </div>
        </div>
      </div>
      <div class="userinfo-content">
        <span>
          <icon type="cube" size="20"></icon>
          项目
        </span>
        <ul class="userinfo-item">
          <li>项目一</li>
          <li>项目二</li>
          <li>项目三</li>
        </ul>
      </div>
    </Card>
    <Card class="user-card">
      <div class="userinfo-title">
        <img src="../../common/image/default.png" class="userinfo-head">
        <div class="userinfo-more">
          <span>
            <icon type="edit" size="25" color="white"></icon>
          </span>
        </div>
        <div class="userinfo-flash right">
          <span>
            <icon type="chevron-right" size="25" color="black"></icon>
          </span>
        </div>
        <div class="userinfo-flash left">
          <span>
            <icon type="chevron-left" size="25" color="black"></icon>
          </span>
        </div>
        <div class="userinfo">
          <div>
            梁志豪
            <span>
              <Icon type="male" class="userinfo-gender male"></Icon>
            </span>
          </div>
          <div>
            Age : 19 | Weight : 150kg
          </div>
          <div>
            120
          </div>
        </div>
      </div>
      <div class="userinfo-content">
        <span>
          <icon type="cube" size="20"></icon>
          项目
        </span>
        <ul class="userinfo-item">
          <li>项目一</li>
          <li>项目二</li>
          <li>项目三</li>
        </ul>
      </div>
    </Card>
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
  .user-card
    width 300px
    float left
    margin-right 40px
    margin-bottom 20px
    font-family "Microsoft YaHei UI"
    .userinfo-title
      height 160px
      text-align center
      .userinfo-head
        -webkit-border-radius 50%
        -moz-border-radius 50%
        border-radius 50%
        height 80px
        z-index 2
      .userinfo-more
        visibility hidden
        position absolute
        top 16px
        left 109px
        width 80px
        height 80px
        background rgba(215,221,228,0.5)
        -webkit-border-radius 50%
        -moz-border-radius 50%
        border-radius 50%
        line-height 80px
        font-size 25px
        z-index 999
      .userinfo-flash
        position absolute
        top 16px
        left 109px
        opacity 0
        width 80px
        height 80px
        line-height 80px
        font-size 25px
        z-index 1
      .userinfo
        height 76px
        padding 2px 15px
        font-size 1.1em
        font-weight 600
      .userinfo-gender
        padding 3px
        font-size 1.2em
      .female
        color: pink
      .male
        color: blue
    .userinfo-content
      width 100%
      height 130px
      margin 10px 0
      padding 5px
      color grey
      .userinfo-item
        padding-top 5px
        padding-left 10px
  .user-card:last-child
    margin-right 0
  .user-card:hover .userinfo-more
    visibility visible
  .user-card:hover .left
    opacity 1
    left 29px
    -webkit-animation left 0.8s
    -o-animation left 0.8s
    animation left 0.8s
  @keyframes left
    from
      left 109px
      opacity 0
    to
      left 29px
      opacity 1
  .user-card:hover .right
    opacity 1
    left 189px
    -webkit-animation right 0.8s
    -o-animation right 0.8s
    animation right 0.8s
  @keyframes right
    from
      left 109px
      opacity 0
    to
      left 189px
      opacity 1


</style>
