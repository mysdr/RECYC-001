<template>
  <div>
    <div class="editor">
      <span class="add"  @click="_selectAdd"></span>
      <span class="delete" @click="_selectDelete"></span>
      <span class="edit" @click="_selectEdit"></span>
    </div>
    <div class="bike-info">
      <div>
        <h2>
          <span ref="bikeIdField" @click="_edit('bike_id')">ID：{{bike.bike_id}}</span>
          <span class="bike-used unused">
            {{bike.bike_used ? 正在使用 : 未使用}}
          </span>
        </h2>
        <h3 ref="bikeTypeField" @click="_edit('bike_type')">{{bike.bike_type}}</h3>
        <h3 ref="bikePositionField" @click="_edit('bike_position')">位置：{{bike.bike_position}}</h3>
        <h3>注册时间：{{_toDate(bike.bike_register)}}</h3>
        <h3>最后维护时间：{{_toDate(bike.bike_update)}}</h3>
      </div>
    </div>

  </div>
</template>

<script>
  import { mapGetters, mapMutations } from 'vuex'
  import { remove, edit } from 'api/bike'

  export default {
    computed: {
      ...mapGetters([
        'token',
        'uid',
        'timestamp',
        'course'
      ])
    },
    methods: {
      _toDate(ts) {
        let date = new Date(ts)
        return date.getYear() + 1900 + '年' + date.getMonth() + '月' + date.getDate() + '日'
      },
      _selectAdd() {
        this.$router.push({
          path: '/course/creator'
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
          text: '您将删除该车辆，该操作不可逆!',
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#DD6B55',
          confirmButtonText: '删除',
          cancelButtonText: '取消',
          closeOnConfirm: false,
          closeOnCancel: false
        }, function (isConfirm) {
          if (isConfirm) {
            remove(params, this.bike.id).then(res => {
              if (res.code === 0) {
                this.$swal('删除成功!', '您已成功删除该课程数据！', 'success')
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
          this.$refs.bikeIdField.style.color = '#0F88EB'
          this.$refs.bikeTypeField.style.color = '#0F88EB'
          this.$refs.bikePositionField.style.color = '#0F88EB'
        } else {
          this.$swal('退出编辑模式！', '您已退出编辑模式，再次点击编辑按钮可以进入编辑模式。', 'success')
          this.$refs.bikeIdField.style.color = 'black'
          this.$refs.bikeTypeField.style.color = 'black'
          this.$refs.bikePositionField.style.color = 'black'
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
                this.setCourse(res.course)
              }
            })
          })
        }
      },
      ...mapMutations({
        setBike: 'SET_BIKE'
      })
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/mixin"

  pink = #FF69B4
  blue = #2d8cf0
  grey = #b6bbc2
  white = #fff
  using = rgba(255, 60, 45, 0.9)
  unused = rgba(0, 153, 0, 0.9)

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

  .bike-info
    width 100%
    height 170px
    margin-top 50px

    div
      float left
      height 100%
      background white

    div:first-child
      width 35%
      margin-right 1%
      padding 10px

    h2
      font-size 2em

    .bike-used
      float right
      padding-top 11px
      font-size 0.7em

    .using
      color using

    .unused
      color unused

    h3
      margin-top 1px
      font-size 1.4em
</style>
