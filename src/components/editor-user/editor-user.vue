<template>
  <div>
    <div class="editor">
      <span class="add" @click="_selectAdd()"></span>
      <span class="delete" @click="_selectDelete()"></span>
      <span class="edit"></span>
    </div>
    <div class="user">
      <img src="../../common/image/default.png" class="userinfo-head">
      <div class="userinfo">
        <h3>
          {{user.user_name}}
          <icon type="female" class="female"></icon>
        </h3>
        <h4>用户账号：{{user.user_account}}</h4>
        <h4>用户注册时间：2017.06.01</h4>
      </div>
      <div class="remark">
        <h3>备注</h3>
        <h4>{{user.user_note}}</h4>
      </div>
    </div>
    <div class="user-mid">
      <div>
        <div>
          <icon type="stats-bars" color="grey" size="25"></icon>
          <h2>{{user.user_weight}}KG</h2>
          <h3>体重</h3>
          <icon type="arrow-down-c" color="green" size="18"></icon>
          <span>1KG</span>
        </div>
        <div>
          <icon type="stats-bars" color="grey" size="25"></icon>
          <h2>{{user.user_fat}}%</h2>
          <h3>体脂</h3>
          <icon type="arrow-down-c" color="green" size="18"></icon>
          <span>0.1%</span>
        </div>
      </div>
      <div>
        <div>
          <icon type="ios-timer-outline" color="grey" size="25"></icon>
          <h2>{{user.user_learn_time}}h</h2>
          <h3>课程时长</h3>
        </div>
        <div>
          <icon type="ios-star-outline" color="grey" size="25"></icon>
          <h2>{{user.user_rating}}</h2>
          <h3>评价星数</h3>
        </div>
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
          <h3>{{user.user_id}}</h3>
        </div>
        <div>
          <h2>微信</h2>
          <h3>{{user.user_wechat}}</h3>
        </div>
        <div>
          <h2>电话</h2>
          <h3>{{user.user_connect}}</h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Star from 'base/star/star'
  import { mapGetters } from 'vuex'
  import { remove } from 'api/user'

  export default {
    computed: {
      ...mapGetters([
        'token',
        'uid',
        'timestamp',
        'user'
      ])
    },
    methods: {
      _selectAdd() {
        this.$router.push({
          path: '/user/creator'
        })
      },
      _selectDelete() {
        let params = {
          uid: this.uid,
          token: this.token,
          timestamp: this.timestamp
        }
        this.$swal({
          title: '是否确定',
          text: '您将删除该用户，该操作不可逆!',
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#DD6B55',
          confirmButtonText: '删除',
          cancelButtonText: '取消',
          closeOnConfirm: false,
          closeOnCancel: false
        },
        function (isConfirm) {
          if (isConfirm) {
            remove(params, this.user.id).then(res => {
              if (res.code === 0) {
                this.$swal('删除成功!', '您已成功删除该会员数据！', 'success')
                this.$router.push({
                  path: '/'
                })
              }
            })
          }
        })
      }
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
    margin-top 50px
    background white
    -webkit-border-radius 5px
    -moz-border-radius 5px
    border-radius 5px

    .userinfo-head
      float left
      width 10%
      margin-bottom 0
      -webkit-border-radius 50%
      -moz-border-radius 50%
      border-radius 50%

    .userinfo
      float left
      margin-top 60px

      .female
        color pink

      .male
        color blue

    .userinfo h4
      margin-top 10px
      color grey

    .userinfo h4:last-child
      margin-top 0

    .remark
      float left
      width 40%
      height 100px
      margin 36px
      margin-bottom 0

    .remark h3
      color white

    .remark h4
      margin-top 10px
      color grey

  .user-mid div
    float left
    width 49%
    margin-top 20px
    margin-right 2%
    background white
    -webkit-border-radius 5px
    -moz-border-radius 5px
    border-radius 5px

    div
      width 50%
      margin 0
      text-align center

      span
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
      height 19.5%
      border-bottom 1px solid grey

    .lesson:last-child
      border-bottom 0

    .lesson:hover
      background #f5f7f9

    .lesson li
      float left
      width 20%
      font-weight 600
      text-align center

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
      width 85%
      height 33%
      border-bottom 1px solid lightgrey

      h3
        margin-top 5px
        color grey

    div:last-child
      border-bottom 0

  @media screen and (min-width: 1366px)
  //user
    .user
      height 200px

      .userinfo-head
        width 100px
        margin 36px

      .userinfo
        min-width 200px
        margin 36px

      .userinfo h3
        font-size 1.5em

      .userinfo h4
        font-size 1.2em

      .remark
        min-width 300px

      .remark h3
        font-size 1.5em

      .remark h4
        font-size 1.2em

  //user-mid
    .user-mid div
      height 200px

      div
        padding-top 35px

    .user-mid h2
      font-size 3em

    .user-mid span
      font-size 1.2em

  //user-bottom
    .user-bottomleft
      min-width 570px
      height 300px

      .lesson
        width 90%
        margin 0 5%

      .lesson li
        min-width 105px
        padding-right 15px
        font-size 1.25em
        line-height 55px

      .lesson li:first-child
        font-size 1.5em

      .star
        height 55px
        padding-top 5px
        line-height 55px

    .user-bottomright
      height 300px

      h3
        font-size 1.3em

      div
        margin 0 7.5%
        padding 20px 2px

  @media screen and (min-width: 1024px) and (max-width: 1366px)
  //user
    .user
      height 150px

      .userinfo-head
        max-width 100px
        min-width 90px
        margin 25px 25px

      .userinfo
        min-width 150px
        margin 36px 25px

      .userinfo h3
        font-size 1.3em

      .userinfo h4
        font-size 1.1em

      .remark
        min-width 200px

      .remark h3
        font-size 1.3em

      .remark h4
        font-size 1.1em

  //user-mid
    .user-mid div
      height 150px

      div
        padding-top 20px

    .user-mid h2
      font-size 2em

    .user-mid span
      font-size 1.1em

  //user-bottom
    .user-bottomleft
      min-width 400px
      height 200px

      .lesson
        width 96%
        margin 0 2%

      .lesson li
        min-width 80px
        padding-right 10px
        font-size 1.1em
        line-height 35px

      .lesson li:first-child
        font-size 1.2em

      .star
        height 30px
        padding-top 5px
        line-height 30px

    .user-bottomright
      height 200px

      h3
        font-size 1.3em

      div
        margin 0 5%
        padding 10px 2px
</style>
