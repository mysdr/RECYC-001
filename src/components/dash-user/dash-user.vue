<template>
  <div>
    <div class="editor">
      <span class="add" @click="_selectAdd()"></span>
    </div>
    <div class="user-card" v-for="user in userList" @click="selectUser(user)">
      <Card>
        <div class="userinfo-title">
          <img :src="user.user_face" class="userinfo-head">
          <div class="userinfo">
            <div>
              {{user.user_name}}
              <span>
              <Icon type="female" class="userinfo-gender female"></Icon>
            </span>
            </div>
            <div>
              {{user.user_age}} 岁 | {{user.user_weight}} kg
            </div>
            <div>
              {{user.user_connect}}
            </div>
          </div>
        </div>
        <div class="userinfo-content">
          <ul class="userinfo-item">
            <li>项目一</li>
            <li>项目二</li>
            <li>项目三</li>
          </ul>
        </div>
      </Card>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import { mapGetters, mapMutations } from 'vuex'
  import { list } from 'api/user'

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
        'userList'
      ])
    },
    methods: {
      _showList() {
        let params = {
          uid: this.uid,
          timestamp: this.timestamp,
          token: this.token
        }
        list(params).then(res => {
          if (res.code === 0) {
            this.setUserList(res.users)
          }
        })
      },
      _selectAdd() {
        this.$router.push({
          path: '/user/creator'
        })
      },
      selectUser(user) {
        console.log('click')
        this.$router.push({
          path: `/user/${user.id}`
        })
        this.setUser(user)
      },
      ...mapMutations({
        setUserList: 'SET_USER_LIST',
        setUser: 'SET_USER'
      })
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/mixin"

  pink = #FF69B4
  blue = #2d8cf0
  grey = #d7dde4
  white = #fff

  .editor
    position absolute
    left 0
    top 50px
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

  .user-card
    width 260px
    float left
    margin-right 20px
    margin-bottom 20px
    font-family "Microsoft YaHei UI"
    .userinfo-title
      height 120px
      text-align center
      .userinfo-head
        -webkit-border-radius 50%
        -moz-border-radius 50%
        border-radius 50%
        width 50px
        z-index 2
      .userinfo-more
        visibility hidden
        position absolute
        top 16px
        left 104px
        width 50px
        height 50px
        background rgba(215, 221, 228, 0.5)
        -webkit-border-radius 50%
        -moz-border-radius 50%
        border-radius 50%
        font-size 25px
        z-index 999
      .userinfo-flash
        position absolute
        top 16px
        left 104px
        opacity 0
        width 50px
        height 50px
        font-size 25px
        z-index 1
      .userinfo-flash span
        display table-cell
        vertical-align middle
        text-align center
      .userinfo
        height 76px
        padding 2px 15px
        font-size 0.8em
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
      height 75px
      margin 10px 0
      padding 5px
      color grey
      font-size 0.8em
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
