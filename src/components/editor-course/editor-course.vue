<template>
  <div>
    <div class="editor">
      <span class="add" @click="_selectAdd()"></span>
      <span class="delete" @click="_selectDelete()"></span>
      <span class="edit" @click="_selectEdit()"></span>
    </div>
    <div class="course-info">
      <img :src="course.course_title_img" width="246" height="120" @click="imgUpload = true">
      <Modal
        title="上传图片"
        v-model="imgUpload"
        :closable="false"
        @on-ok="updateImg">
        <div class="demo-upload-list" v-for="item in uploadList">
          <template v-if="item.status === 'finished'">
            <img :src="item.url">
            <div class="demo-upload-list-cover">
              <Icon type="ios-eye-outline" @click.native="handleView(item.name)"></Icon>
              <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
            </div>
          </template>
          <template v-else>
            <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
          </template>
        </div>
        <Upload
          ref="upload"
          :show-upload-list="false"
          :default-file-list="defaultList"
          :on-success="handleSuccess"
          :format="['png', 'jpg', 'jpeg']"
          :max-size="2048"
          :on-format-error="handleFormatError"
          :on-exceeded-size="handleMaxSize"
          :before-upload="handleBeforeUpload"
          multiple
          type="drag"
          action="//upload.qiniu.com/"
          :data="{token: this.qiniuToken, key: 'recyc/course/' + this.uid + '.png'}"
          :headers="{'Access-Control-Allow-Origin': '*'}"
          style="display: inline-block;width:58px;">
          <div style="width: 58px;height:58px;line-height: 58px;">
            <Icon type="camera" size="20"></Icon>
          </div>
        </Upload>
        <Modal title="查看图片" v-model="visible">
          <img :src="'http://airing.ursb.me/' + imgName" v-if="visible" style="width: 100%">
        </Modal>
      </Modal>
      <div>
        <h2 ref="courseNameField" @click="_edit('course_name')">{{course.course_name}}</h2>
        <h3 ref="courseIdField" @click="_edit('course_id')">ID：{{course.course_id}}</h3>
        <h3 ref="courseCapacityField" @click="_edit('course_capacity')">容量：{{course.course_capacity}} 人</h3>
        <h3>注册时间：{{_toDate(course.course_register)}}</h3>
      </div>
    </div>
    <div class="course-bottom">
      <div class="course-teacher">
        <img :src="course.coach.coach_face">
        <div>
          <h2>
            <span ref="courseTeacherField" @click="_edit('course_teacher')">导师：{{course.coach_name}}</span>
            <icon :type="course.coach.coach_sex == 0 ? 'male':'female'" :class="course.coach.coach_sex == 0 ? 'male':'female'"></icon>
          </h2>
          <h3>微信：{{course.coach.coach_wechat}}</h3>
          <h3>联系方式：{{course.coach.coach_connect}}</h3>
        </div>
      </div>
      <div class="course-content">
        <h2>课程简介</h2>
        <div ref="courseContentField" @click="_edit('course_content')">
          {{course.course_content}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Star from 'base/star/star'
  import { mapGetters, mapMutations } from 'vuex'
  import { remove, edit } from 'api/course'
  import { getToken } from 'api/util'

  export default {
    data () {
      return {
        mode: 0,
        imgUpload: false,
        defaultList: [],
        imgName: '',
        visible: false,
        uploadList: [],
        qiniuToken: '',
        file: {}
      }
    },
    computed: {
      ...mapGetters([
        'token',
        'uid',
        'timestamp',
        'course'
      ])
    },
    mounted() {
      this.uploadList = this.$refs.upload.fileList
      let params = {
        uid: this.uid,
        timestamp: this.timestamp,
        token: this.token,
        filename: 'recyc/course/' + this.uid + '.png'
      }
      getToken(params).then(res => {
        this.qiniuToken = res.qiniu_token
      })
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
            remove(params, this.course.id).then(res => {
              if (res.code === 0) {
                this.$swal('删除成功!', '您已成功删除该课程数据！', 'success')
                this.$router.push({
                  path: '/course'
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
          this.$refs.courseNameField.style.color = '#0F88EB'
          this.$refs.courseIdField.style.color = '#0F88EB'
          this.$refs.courseContentField.style.color = '#0F88EB'
          this.$refs.courseTeacherField.style.color = '#0F88EB'
          this.$refs.courseCapacityField.style.color = '#0F88EB'
        } else {
          this.$swal('退出编辑模式！', '您已退出编辑模式，再次点击编辑按钮可以进入编辑模式。', 'success')
          this.$refs.courseNameField.style.color = 'black'
          this.$refs.courseIdField.style.color = 'black'
          this.$refs.courseContentField.style.color = 'black'
          this.$refs.courseTeacherField.style.color = 'black'
          this.$refs.courseCapacityField.style.color = 'black'
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
      handleView (name) {
        this.imgName = name
        this.visible = true
      },
      handleRemove (file) {
        // 从 upload 实例删除数据
        const fileList = this.$refs.upload.fileList
        this.$refs.upload.fileList.splice(fileList.indexOf(file), 1)
      },
      handleSuccess (res, file) {
        file.name = res.key
        file.url = 'http://airing.ursb.me/' + res.key
        // TODO: 将用户的头像 url 更新为 file.url
      },
      handleFormatError (file) {
        this.$Notice.warning({
          title: '文件格式不正确',
          desc: '文件 ' + file.name + ' 格式不正确，请上传 jpg 或 png 格式的图片。'
        })
      },
      handleMaxSize (file) {
        this.$Notice.warning({
          title: '超出文件大小限制',
          desc: '文件 ' + file.name + ' 太大，不能超过 2M。'
        })
      },
      handleBeforeUpload (file) {
        console.log(file)
        const check = this.uploadList.length < 1
        if (!check) {
          this.$Notice.warning({
            title: '最多只能上传 1 张图片。'
          })
        }
        return check
      },
      updateImg() {
        console.log('ok')
        let params = {
          uid: this.uid,
          token: this.token,
          timestamp: this.timestamp,
          field: this.uploadList[0].url
        }
        edit(params, this.course.id, 'course_title_img').then(res => {
          if (res.code === 0) {
            this.setCourse(res.course)
            console.log('success')
          } else {
            console.log(res)
          }
        })
      },
      ...mapMutations({
        setCourse: 'SET_COURSE'
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

  .course-info
    width 100%
    height 200px
    margin-top 50px
    background white

    img
      float left
      width 246px
      margin 40px 20px

    div
      float left

    h2
      margin-top 40px
      margin-left 10px
      font-size 1.8em

    h3
      margin-left 10px
      color grey
      font-size 1.4em

  .course-bottom
    width 100%
    height 200px
    margin-top 20px

    div
      float left
      height 100%
      background white

    .course-teacher
      width 49%

      img
        float left
        width 100px
        margin 50px 20px
        -webkit-border-radius 50%
        -moz-border-radius 50%
        border-radius 50%

      div
        float left
        height auto

      h2
        margin-top 50px
        margin-left 10px
        font-size 1.6em

        .female
          color pink

        .male
          color blue

      h3
        margin-left 10px
        color grey
        font-size 1.3em

    .course-content
      width 49%
      margin-left 2%

      h2
        margin-top 13px
        padding 0 20px

      div
        width 100%
        height auto
        padding 8px 20px
        font-size 1.2em
        color grey
        line-height 150%
        text-indent 20px

  .demo-upload-list
    display inline-block
    width 60px
    height 60px
    text-align center
    line-height 60px
    border 1px solid transparent
    border-radius 4px
    overflow hidden
    background #fff
    position relative
    box-shadow 0 1px 1px rgba(0, 0, 0, .2)
    margin-right 4px

  .demo-upload-list img
    width 100%
    height 100%

  .demo-upload-list-cover
    display none
    position absolute
    top 0
    bottom 0
    left 0
    right 0
    background rgba(0, 0, 0, .6)

  .demo-upload-list:hover .demo-upload-list-cover
    display block

  .demo-upload-list-cover i
    color #fff
    font-size 20px
    cursor pointer
    margin 0 2px
</style>
