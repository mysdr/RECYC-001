<template>
  <div>
    <div class="editor" @click="_selectAdd()">
      <Icon type="android-add-circle" class="add"></Icon>
    </div>
    <div class="user-card" v-for="coach in coachList" @click="selectUser(coach)">
      <Card>
        <div class="userinfo-title">
          <img :src="coach.coach_head" class="userinfo-head">
          <div class="userinfo">
            <div>
              {{coach.coach_name}}
              <span>
                <Icon type="female" class="userinfo-gender female"></Icon>
              </span>
            </div>
            <div>
              23 岁 | 5 年
            </div>
            <div>
              维尼亚健身中心
            </div>
            <div class="userinfo-content">
              这个教练很懒
            </div>
          </div>
        </div>
      </Card>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import { mapGetters, mapMutations } from 'vuex'
  import { list } from 'api/coach'

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
        'coachList'
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
          console.log(res)
          if (res.code === 200) {
            this.setCoachList(res.coachs)
          }
        })
      },
      _selectAdd() {
        this.$router.push({
          path: '/coach/creator'
        })
      },
      selectUser(coach) {
        this.$router.push({
          path: `/coach/${coach.id}`
        })
        this.setCoach(coach)
      },
      ...mapMutations({
        setCoachList: 'SET_COACH_LIST',
        setCoach: 'SET_COACH'
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
      padding 5px
      color grey
      font-size 0.8em

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
