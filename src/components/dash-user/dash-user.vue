<template>
  <div>
    <div class="editor" @click="_selectAdd()">
      <Icon type="android-add-circle" class="add"></Icon>
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

  .user-card
    width 160px
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
