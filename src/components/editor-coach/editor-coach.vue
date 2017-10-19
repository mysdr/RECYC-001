<template>
  <div>
    <div class="editor">
      <span class="add" @click="_selectAdd()"></span>
      <span class="delete" @click="_selectDelete()"></span>
      <span class="edit" @click="_selectEdit()"></span>
    </div>
    <div class="user">
      <img :src="coach.coach_head" class="userinfo-head">
      <div class="userinfo">
        <h3>
          <span ref="userNameField" @click="_edit('user_name')">{{coach.coach_name}}</span>
          <icon type="female" class="female"></icon>
        </h3>
        <h4>用户账号：{{coach.coach_account}}</h4>
        <h4>工作时间：5年</h4>
        <h4>工作地方：维尼亚健身中心</h4>
      </div>
      <div class="remark">
        <h3>备注</h3>
        <h4 ref="userNoteField" @click="_edit('user_note')">{{coach.coach_sign</h4>
      </div>
    </div>
    <div class="user-bottom">
      <div class="user-bottomleft">
        <div class="lesson">
          <ul>
            <li>2017.06.09</li>
            <li>14:00 - 17:00</li>
            <li>健身课程001</li>
            <li>3h</li>
            <li>
              <star :size="24" :rating="5" class="star"></star>
            </li>
          </ul>
        </div>
        <div class="lesson">
          <ul>
            <li>2017.06.09</li>
            <li>14:00 - 17:00</li>
            <li>健身课程001</li>
            <li>3h</li>
            <li>
              <star :size="24" :rating="5" class="star"></star>
            </li>
          </ul>
        </div>
        <div class="lesson">
          <ul>
            <li>2017.06.09</li>
            <li>14:00 - 17:00</li>
            <li>健身课程001</li>
            <li>3h</li>
            <li>
              <star :size="24" :rating="5" class="star"></star>
            </li>
          </ul>
        </div>
        <div class="lesson">
          <ul>
            <li>2017.06.09</li>
            <li>14:00 - 17:00</li>
            <li>健身课程001</li>
            <li>3h</li>
            <li>
              <star :size="24" :rating="5" class="star"></star>
            </li>
          </ul>
        </div>
        <div class="lesson">
          <ul>
            <li>2017.06.09</li>
            <li>14:00 - 17:00</li>
            <li>健身课程001</li>
            <li>3h</li>
            <li>
              <star :size="24" :rating="5" class="star"></star>
            </li>
          </ul>
        </div>
      </div>
      <div class="user-bottomright">
        <div>
          <h2>ID</h2>
          <h3 ref="userIdField" @click="_edit('user_id')">1</h3>
        </div>
        <div>
          <h2>微信</h2>
          <h3>1</h3>
        </div>
        <div>
          <h2>电话</h2>
          <h3 ref="userConnectField" @click="_edit('user_connect')">1</h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Star from 'base/star/star'
  import { mapGetters, mapMutations } from 'vuex'
//  import { remove, edit } from 'api/coach'

  export default {
    data () {
      return {
        mode: 0
      }
    },
    computed: {
      ...mapGetters([
        'token',
        'uid',
        'timestamp',
        'coach'
      ])
    },
    mounted() {
    },
    methods: {
      _selectAdd() {
        this.$router.push({
          path: '/coach/creator'
        })
      },
      _selectDelete() {
      },
      _selectEdit() {
      },
      _edit(field) {
      },
      ...mapMutations({
        setCoach: 'SET_COACH'
      })
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

  .user
    width 100%
    margin-top 45px
    background white
    -webkit-border-radius 5px
    -moz-border-radius 5px
    border-radius 5px
    @media (min-width:1366px)
      height 200px
    @media (min-width:1024px) and (max-width:1366px)
      height 150px

    .userinfo-head
      float left
      width 10%
      margin-bottom 0
      -webkit-border-radius 50%
      -moz-border-radius 50%
      border-radius 50%
      @media (min-width:1366px)
        width 100px
        margin 36px
      @media (min-width:1024px) and (max-width:1366px)
        max-width 100px
        min-width 90px
        margin 25px

    .userinfo
      float left
      margin-top 60px
      @media (min-width:1366px)
        min-width 200px
        margin 35px
      @media (min-width:1024px) and (max-width:1366px)
        min-width 150px
        margin 35px 25px 0 25px

      .female
        color pink

      .male
        color blue

    .userinfo h3
      margin-bottom 5px
      @media (min-width:1366px)
        font-size 1.5em
      @media (min-width:1024px) and (max-width:1366px)
        font-size 1.3em

    .userinfo h4
      color grey
      @media (min-width:1366px)
        font-size 1.2em
      @media (min-width:1024px) and (max-width:1366px)
        font-size 1.1em

    .userinfo h4:first-child
      margin-top 10px

    .remark
      float left
      width 40%
      height 100px
      margin 36px
      margin-bottom 0
      @media (min-width:1366px)
        min-width 300px
      @media (min-width:1024px) and (max-width:1366px)
        min-width 200px

    .remark h3
      color white
      @media (min-width:1366px)
        font-size 1.5em
      @media (min-width:1024px) and (max-width:1366px)
        font-size 1.3em

    .remark h4
      margin-top 10px
      color grey
      @media (min-width:1366px)
        font-size 1.2em
      @media (min-width:1024px) and (max-width:1366px)
        font-size 1.1em


  .user-top div
    float left
    width 50%
    height 150px
    margin-top 20px
    background white
    -webkit-border-radius 5px
    -moz-border-radius 5px
    border-radius 5px

    div
      width 50%
      margin 0
      text-align center
      padding-top 20px

      h2
        font-size 2em

      span
        color green
        font-size 1.1em
        font-weight 600

  .user-top div:last-child
    margin-right 0

  .user-mid
    height 320px

  .user-mid div
    float left
    width 49%
    height 100%
    margin-top 20px
    margin-right 1%
    padding-top 10px
    background white
    -webkit-border-radius 5px
    -moz-border-radius 5px
    border-radius 5px

    div
      width 100%
      margin 0

  .user-mid div:last-child
    margin-right 0

  .user-bottom
    height 200px

  .user-bottomleft
    float left
    width 64%
    min-width 400px
    height 200px
    margin-top 20px
    margin-right 1%
    background white
    -webkit-border-radius 5px
    -moz-border-radius 5px
    border-radius 5px

    .lesson
      width 96%
      height 19.5%
      margin 0 2%
      border-bottom 1px solid grey

    .lesson:last-child
      border-bottom 0

    .lesson:hover
      background #f5f7f9

    .lesson li
      float left
      width 20%
      min-width 80px
      padding-right 10px
      line-height 35px
      text-align center
      font-size 1.1em
      font-weight 600

    .star
      height 30px
      padding-top 5px
      line-height 30px

  .user-bottomright
    float left
    width 35%
    height 200px
    margin-top 20px
    background white
    -webkit-border-radius 5px
    -moz-border-radius 5px
    border-radius 5px

    div
      clear both
      width 85%
      height 33%
      margin 0 5%
      padding 10px 2px
      border-bottom 1px solid lightgrey

      h3
        margin-top 5px
        color grey
        font-size 1.3em

    div:last-child
      border-bottom 0


</style>
