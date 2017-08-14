<template>
  <div>
    <div class="editor">
      <span class="add" @click="_selectAdd()"></span>
      <span class="delete" @click="_selectDelete()"></span>
      <span class="edit" @click="_selectEdit()"></span>
    </div>
    <div class="user">
      <img :src="user.user_face" class="userinfo-head">
      <div class="userinfo">
        <h3>
          <span ref="userNameField" @click="_edit('user_name')">{{user.user_name}}</span>
          <icon type="female" class="female"></icon>
        </h3>
        <h4>用户账号：{{user.user_account}}</h4>
        <h4>用户注册时间：2017.06.01</h4>
      </div>
      <div class="remark">
        <h3>备注</h3>
        <h4 ref="userNoteField" @click="_edit('user_note')">{{user.user_note}}</h4>
      </div>
    </div>
    <div class="user-mid">
      <div>
        <div>
          <icon type="stats-bars" color="grey" size="25"></icon>
          <h2 ref="userWeightField" @click="_edit('user_weight')">{{user.user_weight}}KG</h2>
          <h3>体重</h3>
          <icon type="arrow-down-c" color="green" size="18"></icon>
          <span>1KG</span>
        </div>
        <div>
          <icon type="stats-bars" color="grey" size="25"></icon>
          <h2 ref="userFatField" @click="_edit('user_fat')">{{user.user_fat}}%</h2>
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
          <h3 ref="userIdField" @click="_edit('user_id')">{{user.user_id}}</h3>
        </div>
        <div>
          <h2>微信</h2>
          <h3>{{user.user_wechat}}</h3>
        </div>
        <div>
          <h2>电话</h2>
          <h3 ref="userConnectField" @click="_edit('user_connect')">{{user.user_connect}}</h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Star from 'base/star/star'
  import { mapGetters, mapMutations } from 'vuex'
  import { remove, edit } from 'api/user'

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
        }, function (isConfirm) {
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
      },
      _selectEdit() {
        if (this.mode === 0) {
          this.$swal('编辑模式！', '您已进入编辑模式，点击蓝色元素可以修改用户数据，再次点击编辑按钮可以退出编辑模式。', 'success')
          this.mode = 1
          this.$refs.userNameField.style.color = '#0F88EB'
          this.$refs.userNoteField.style.color = '#0F88EB'
          this.$refs.userWeightField.style.color = '#0F88EB'
          this.$refs.userFatField.style.color = '#0F88EB'
          this.$refs.userIdField.style.color = '#0F88EB'
          this.$refs.userConnectField.style.color = '#0F88EB'
        } else {
          this.$swal('退出编辑模式！', '您已退出编辑模式，再次点击编辑按钮可以进入编辑模式。', 'success')
          this.$refs.userNameField.style.color = 'black'
          this.$refs.userNoteField.style.color = 'black'
          this.$refs.userWeightField.style.color = 'black'
          this.$refs.userFatField.style.color = 'black'
          this.$refs.userIdField.style.color = 'black'
          this.$refs.userConnectField.style.color = 'black'
          this.mode = 0
        }
      },
      _edit(field) {
        if (this.mode === 1) {
          this.$swal({
            title: '请输入更新的数据内容',
            input: 'text',
            showCancelButton: true,
            confirmButtonText: '确定',
            showLoaderOnConfirm: true,
            allowOutsideClick: false
          }).then(text => {
            let params = {
              uid: this.uid,
              token: this.token,
              timestamp: this.timestamp,
              field: text
            }
            edit(params, this.user.id, field).then(res => {
              if (res.code === 0) {
                this.setUser(res.user)
              }
            })
          })
        }
      },
      ...mapMutations({
        setUser: 'SET_USER'
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
        margin 36px
      @media (min-width:1024px) and (max-width:1366px)
        min-width 150px
        margin 36px 25px

      .female
        color pink

      .male
        color blue

    .userinfo h3
      @media (min-width:1366px)
        font-size 1.5em
      @media (min-width:1024px) and (max-width:1366px)
        font-size 1.3em

    .userinfo h4
      margin-top 10px
      color grey
      @media (min-width:1366px)
        font-size 1.2em
      @media (min-width:1024px) and (max-width:1366px)
        font-size 1.1em

    .userinfo h4:last-child
      margin-top 0

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

  .user-mid
    @media (min-width:1366px)
      height 200px
    @media (min-width:1024px) and (max-width:1366px)
      height 150px

  .user-mid div
    float left
    width 49%
    margin-top 20px
    margin-right 2%
    background white
    -webkit-border-radius 5px
    -moz-border-radius 5px
    border-radius 5px
    @media (min-width:1366px)
      height 200px
    @media (min-width:1024px) and (max-width:1366px)
      height 150px

    div
      width 50%
      margin 0
      text-align center
      @media (min-width:1366px)
        padding-top 35px
      @media (min-width:1024px) and (max-width:1366px)
        padding-top 20px

      h2
        @media (min-width:1366px)
          font-size 3em
        @media (min-width:1024px) and (max-width:1366px)
          font-size 2em

      span
        font-weight 600
        color green
        @media (min-width:1366px)
          font-size 1.2em
        @media (min-width:1024px) and (max-width:1366px)
          font-size 1.1em

  .user-mid div:last-child
    margin-right 0

  .user-bottom
    @media (min-width:1366px)
      height 300px
    @media (min-width:1024px) and (max-width:1366px)
      height 200px

  .user-bottomleft
    float left
    width 64%
    margin-top 20px
    margin-right 2%
    background white
    -webkit-border-radius 5px
    -moz-border-radius 5px
    border-radius 5px
    @media (min-width:1366px)
      min-width 570px
      height 300px
    @media (min-width:1024px) and (max-width:1366px)
      min-width 400px
      height 200px

    .lesson
      height 19.5%
      border-bottom 1px solid grey
      @media (min-width:1366px)
        width 90%
        margin 0 5%
      @media (min-width:1024px) and (max-width:1366px)
        width 96%
        margin 0 2%

    .lesson:last-child
      border-bottom 0

    .lesson:hover
      background #f5f7f9

    .lesson li
      float left
      width 20%
      font-weight 600
      text-align center
      @media (min-width:1366px)
        min-width 105px
        padding-right 15px
        font-size 1.25em
        line-height 55px
      @media (min-width:1024px) and (max-width:1366px)
        min-width 80px
        padding-right 10px
        font-size 1.1em
        line-height 35px

    .lesson li:first-child
      @media (min-width:1366px)
        font-size 1.5em

    .star
      @media (min-width:1366px)
        height 55px
        padding-top 5px
        line-height 55px
      @media (min-width:1024px) and (max-width:1366px)
        height 30px
        padding-top 5px
        line-height 30px

  .user-bottomright
    float left
    width 34%
    margin-top 20px
    background white
    -webkit-border-radius 5px
    -moz-border-radius 5px
    border-radius 5px
    @media (min-width:1366px)
      height 300px
    @media (min-width:1024px) and (max-width:1366px)
      height 200px

    div
      clear both
      width 85%
      height 33%
      border-bottom 1px solid lightgrey
      @media (min-width:1366px)
        margin 0 7.5%
        padding 20px 2px
      @media (min-width:1024px) and (max-width:1366px)
        margin 0 5%
        padding 10px 2px

      h3
        margin-top 5px
        color grey
        @media (min-width:1366px)
          font-size 1.3em
        @media (min-width:1024px) and (max-width:1366px)
          font-size 1.3em

    div:last-child
      border-bottom 0


</style>
