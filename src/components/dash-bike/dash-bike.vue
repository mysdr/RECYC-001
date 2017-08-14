<template>
  <div>
    <div class="editor">
      <Icon type="android-add-circle" class="add"></Icon>
    </div>
    <div class="bike-card">
      <Card>
        <h2>
          ID:001
          <span class="bike-used unused">
            未使用
          </span>
        </h2>
        <h3>动感单车</h3>
        <h3>位置：H03</h3>
        <h3>注册时间：2017.02.25</h3>
        <h3>最后维护时间：2017.03.08</h3>
      </Card>
    </div>
    <div class="bike-card">
      <Card>
        <h2>
          ID:002
          <span class="bike-used using">
            使用中
          </span>
        </h2>
        <h3>动感单车</h3>
        <h3>位置：H01</h3>
        <h3>注册时间：2017.02.25</h3>
        <h3>最后维护时间：2017.03.08</h3>
      </Card>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  blue = #2d8cf0
  using = rgba(255, 60, 45, 0.9)
  unused = rgba(0, 153, 0, 0.9)

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

  .bike-card
    float left
    width 250px
    height 150px
    margin-right 15px

    h2
      font-size 1.7em

    .bike-used
      float right
      padding-top 11px
      font-size 0.6em

    .using
      color using

    .unused
      color unused

    h3
      margin-top 1px
      font-size 1.1em

</style>
