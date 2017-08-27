<template>
  <div>
    <div class="editor">
      <span class="add" @click="_selectAdd()"></span>
      <span class="delete" @click="_selectDelete()"></span>
      <span class="edit" @click="_selectEdit()"></span>
    </div>
    <div class="info">
      <div class="course-info">
        <Tabs>
          <Tab-pane label="课程信息">
            <div>
              <img src="./default.jpg">
            </div>
            <div>
              <h2>{{dating.course_name}}</h2>
              <h3 ref="courseTeacherField" @click="_edit('course_teacher')">课程导师：{{dating.course_teacher}}</h3>
              <h3>课程ID：{{dating.courseId}}</h3>
              <h3>注册时间：2017-04-14</h3>
            </div>
          </Tab-pane>
          <Tab-pane label="课程简介">
            <h3>{{dating.course_content}}</h3>
          </Tab-pane>
        </Tabs>
      </div>
      <div class="order-info">
        <div>
          <h3 ref="datingIdField" @click="_edit('dating_id')">约课ID： {{dating.dating_id}}</h3>
          <h3 ref="datingCapacityField" @click="_edit('dating_capacity')">本期约课容量： {{dating.dating_capacity}}人</h3>
          <h3>本期约课时间段： {{dating.dating_time}}</h3>
          <h3>本期约课注册时间： {{_toDate(dating.dating_register)}}</h3>
        </div>
        <div>
          <star :size="36" :rating="dating.dating_rating" class="star"></star>
          <h4>评价星数</h4>
        </div>
      </div>
    </div>
    <div class="order-user">
      <div>
        <ul>
          <li>
            头像
          </li>
          <li>
            <div>
              用户名
            </div>
          </li>
          <li>
            <div>
              年龄
            </div>
          </li>
          <li>
            <div>
              体重
            </div>
          </li>
          <li>
            <div>
              体脂
            </div>
          </li>
          <li>
            <div>
              微信
            </div>
          </li>
          <li>
            <div>
              联系方式
            </div>
          </li>
        </ul>
        <ul  v-for="(user, key) in userList" v-if="key < 7">
          <li>
            <img :src="user.user_face">
          </li>
          <li>
            <div>
              {{user.user_name}}
              <icon type="female" class="female"></icon>
            </div>
          </li>
          <li>
            <div>
              {{user.user_age}}
            </div>
          </li>
          <li>
            <div>
              {{user.user_weight}}KG
            </div>
          </li>
          <li>
            <div>
              {{user.user_fat}}%
            </div>
          </li>
          <li>
            <div>
              {{user.user_wechat}}
            </div>
          </li>
          <li>
            <div>
              {{user.user_connect}}
            </div>
          </li>
        </ul>
      </div>
      <Page :current="1" :total="50" :page-size="7" @on-change="_pageChange" simple></Page>
    </div>
  </div>
</template>

<script>
  import Star from 'base/star/star'
  import { mapGetters, mapMutations } from 'vuex'
  import { remove, edit } from 'api/dating'
  import { showUsers } from 'api/user'
  export default {
    data () {
      return {
        mode: 0,
        users: [],
        userList: []
      }
    },
    created() {
      this._showUserList(this.dating.dating_users)
    },
    computed: {
      ...mapGetters([
        'token',
        'uid',
        'timestamp',
        'dating'
      ])
    },
    methods: {
      _pageChange(page) {
        console.log(this.users)
        let i = 0
        let pageStart = 7 * (page - 1)
        let pageEnd = 7 * page
        if (pageEnd >= this.users.length) {
          pageEnd = this.users.length
        }
        this.userList = []
        for (let k = pageStart; k < pageEnd; k++) {
          this.userList[i] = this.users[k]
          i++
        }
        console.log(this.userList)
      },
      _showUserList(userIds) {
        console.log(userIds)
        let params = {
          uid: this.uid,
          timestamp: this.timestamp,
          token: this.token,
          ids: userIds
        }
        showUsers(params).then(res => {
          console.log(res)
          this.users = res.users
          this.userList = res.users
        })
      },
      _toDate(ts) {
        let date = new Date(ts)
        return date.getYear() + 1900 + '年' + date.getMonth() + '月' + date.getDate() + '日'
      },
      _selectAdd() {
        this.$router.push({
          path: '/order/creator'
        })
      },
      _selectEdit() {
        if (this.mode === 0) {
          this.$swal('编辑模式！', '您已进入编辑模式，点击蓝色元素可以修改用户数据，再次点击编辑按钮可以退出编辑模式。', 'success')
          this.mode = 1
          this.$refs.datingIdField.style.color = '#0F88EB'
          this.$refs.courseTeacherField.style.color = '#0F88EB'
          this.$refs.datingCapacityField.style.color = '#0F88EB'
        } else {
          this.$swal('退出编辑模式！', '您已退出编辑模式，再次点击编辑按钮可以进入编辑模式。', 'success')
          this.$refs.datingIdField.style.color = 'black'
          this.$refs.courseTeacherField.style.color = 'black'
          this.$refs.datingCapacityField.style.color = 'black'
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
            edit(params, this.course.id, field).then(res => {
              console.log(res)
              if (res.code === 0) {
                this.setDating(res.dating)
              }
            })
          })
        }
      },
      _selectDelete() {
        let params = {
          uid: this.uid,
          token: this.token,
          timestamp: this.timestamp
        }
        this.$swal({
          title: '是否确定',
          text: '您将删除该课程，该操作不可逆!',
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#DD6B55',
          confirmButtonText: '删除',
          cancelButtonText: '取消',
          closeOnConfirm: false,
          closeOnCancel: false
        }, function (isConfirm) {
          if (isConfirm) {
            remove(params, this.dating.id).then(res => {
              if (res.code === 0) {
                this.$swal('删除成功!', '您已成功删除该约课数据！', 'success')
                this.$router.push({
                  path: '/order'
                })
              }
            })
          }
        })
      },
      ...mapMutations({
        setDating: 'SET_DATING'
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
  grey = #7b838a
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

  .info
    width 100%
    height 180px
    margin-top 50px

  .ivu-tabs
    width 100%

  .course-info
    float left
    width 48%
    height 180px
    background white
    @media (min-width: 1024px) and (max-width: 1220px)
      height 180px

    img
      width 200px
      margin 5px 15px 0 15px

    div
      float left

    h2
      margin-top 5px
      margin-left 10px
      font-size 1.6em
      @media (min-width: 1024px) and (max-width: 1100px)
        margin-left 0
        font-size 1.4em

    h3
      margin-left 10px
      color grey
      font-size 1.3em
      @media (min-width: 1024px) and (max-width: 1100px)
        margin-left 0
        font-size 1.2em

  .order-info
    float left
    width 51%
    height 180px
    margin-left 1%
    background white

    div
      float left
      width auto
      height  100%
      padding-top 35px


    div:last-child
      float right
      padding-right 10%
      text-align center

    h2
      font-size 2em

    h3
      margin-top 2px
      margin-left 30px
      font-size 1.4em
      @media (min-width: 1024px) and (max-width: 1100px)
        font-size 1.2em

    h4
      font-size 1.4em

    .star
      float none
      width 100%
      height auto
      padding 15px 0


  .order-user
    width 100%
    height 620px
    margin-top 20px
    padding 0 1%
    background white

    ul
      width 98%
      height 60px
      padding 5px 0
      border-bottom 1px solid grey

      li
        float left
        width 14%
        height 100%
        line-height 50px
        font-size 1.3em
        font-weight 600

      li:first-child
        width 16%
        padding-left 20px

        img
          height 50px
          -webkit-border-radius 50%
          -moz-border-radius 50%
          border-radius 50%

      .female
        color pink

      .male
        color blue

    ul:first-child
      font-size 1.1em
      color grey

    .ivu-page
      border 0
      text-align center
      line-height 40px
</style>
