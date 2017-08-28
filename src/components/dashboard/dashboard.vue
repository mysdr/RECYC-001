<template>
  <div class="layout" :class="{'layout-hide-text': spanLeft < 5}">
    <Row type="flex">
      <i-col :span="spanLeft" class="layout-menu-left">
        <Menu @on-select="_selectMenu" active-name="1" theme="dark" width="auto">
          <div class="layout-logo-left"></div>
          <Menu-item name="1">
            <Icon type="ios-navigate" :size="iconSize"></Icon>
            <span class="layout-text">用户管理</span>
          </Menu-item>
          <Submenu name="2">
            <template slot="title">
              <Icon type="ios-keypad" :size="iconSize"></Icon>
              <span class="layout-text">课程管理</span>
            </template>
            <Menu-item name="2-1">
              <Icon type="ios-keypad" :size="iconSize"></Icon>
              <span class="layout-text">课程列表</span>
            </Menu-item>
            <Menu-item name="2-2">
              <Icon type="ios-calendar" :size="iconSize"></Icon>
              <span class="layout-text">约课</span>
            </Menu-item>
          </Submenu>
          <Menu-item name="3">
            <Icon type="ios-analytics" :size="iconSize"></Icon>
            <span class="layout-text">车辆管理</span>
          </Menu-item>
        </Menu>
      </i-col>
      <i-col :span="spanRight">
        <div class="layout-header">
          <i-button type="text" @click="toggleClick">
            <Icon type="navicon" size="32"></Icon>
          </i-button>
          <screen-full class='screenfull'></screen-full>
        </div>
        <div class="layout-content">
          <div class="layout-content-main">
            <router-view></router-view>
          </div>
        </div>
        <div class="layout-copy">
          2017 &copy; RE·CYC
        </div>
      </i-col>
    </Row>
  </div>
</template>
<script type="text/ecmascript-6">
  import DashUser from 'components/dash-user/dash-user'
  import ScreenFull from 'base/screen-full/screen-full'

  export default {
    data () {
      return {
        spanLeft: 5,
        spanRight: 19
      }
    },
    computed: {
      iconSize () {
        return this.spanLeft === 5 ? 14 : 24
      }
    },
    methods: {
      toggleClick () {
        if (this.spanLeft === 5) {
          this.spanLeft = 2
          this.spanRight = 22
        } else {
          this.spanLeft = 5
          this.spanRight = 19
        }
      },
      _selectMenu(name) {
        switch (name) {
          case '1':
            this._selectUser()
            break
          case '2-1':
            this._selectCourse()
            break
          case '2-2':
            this._selectOrder()
            break
          case '3':
            this._selectBike()
            break
          default:
            break
        }
      },
      _selectUser() {
        console.log('_selectUser')
        this.$router.push({
          path: '/'
        })
      },
      _selectCourse() {
        console.log('_selectCourse')
        this.$router.push({
          path: '/course'
        })
      },
      _selectBike() {
        console.log('_selectBike')
        this.$router.push({
          path: '/bike'
        })
      },
      _selectOrder() {
        console.log('_selectOrder')
        this.$router.push({
          path: '/order'
        })
      }
    },
    components: {
      DashUser,
      ScreenFull
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  .layout, .ivu-row-flex, .layout-menu-left, .ivu-col
    height 100%

  .layout
    border 1px solid #d7dde4
    background #f5f7f9
    position relative
    border-radius 4px
    overflow hidden

  .layout-breadcrumb
    height 3%
    min-height 30px
    padding 10px 15px 0

  .layout-content
    position relative
    width 100%
    height 87%
    min-height 200px
    padding 15px
    overflow hidden
    border-radius 4px

  .layout-content-main
    position absolute
    top 0
    bottom 0
    left 0
    right -17px
    padding 10px
    overflow-y scroll

  .layout-copy
    height 5%
    min-height 20px
    text-align: center
    padding 10px 0 20px
    color #9ea7b4

  .layout-menu-left
    background: #464c5b

  .layout-header
    height 5%
    min-height 45px
    background #fff
    box-shadow 0 1px 1px rgba(0, 0, 0, .1)

  .layout-logo-left
    width 90%
    height 30px
    background #5b6270
    border-radius 3px
    margin 15px auto

  .layout-ceiling-main a
    color #9ba7b5

  .ivu-icon
    margin-right 8px

  .layout-hide-text .layout-text
    display none

  .ivu-col
    transition width .2s ease-in-out

  .screenfull
    position absolute
    right 10px
    top 16px
    color red

  .ivu-menu-dark.ivu-menu-vertical .ivu-menu-item-active:not(.ivu-menu-submenu), .ivu-menu-dark.ivu-menu-vertical .ivu-menu-item-active:not(.ivu-menu-submenu):hover, .ivu-menu-dark.ivu-menu-vertical .ivu-menu-submenu-title-active:not(.ivu-menu-submenu), .ivu-menu-dark.ivu-menu-vertical .ivu-menu-submenu-title-active:not(.ivu-menu-submenu):hover
    color white
    background #2d8cf0

</style>
