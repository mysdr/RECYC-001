<template>
  <div>
    <div class="editor">
      <span class="add" @click="_selectAdd()"></span>
      <span class="delete" @click="_selectDelete()"></span>
      <span class="edit" @click="_selectEdit()"></span>
    </div>
    <div class="user">
      <img :src="coach.coach_face" class="userinfo-head" @click="imgUpload = true">
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
          :data="{token: this.qiniuToken, key: 'recyc/coach/' + this.uid + '.png'}"
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
      <div class="userinfo">
        <h3>
          <span ref="userNameField" @click="_edit('user_name')">{{coach.coach_name}}</span>
          <icon :type="coach.coach_sex == 0 ? 'male':'female'" :class="coach.coach_sex == 0 ? 'male':'female'"></icon>
        </h3>
        <h4>用户账号：{{coach.coach_account}}</h4>
        <h4>工作时间：{{coach.coach_work_time}}年</h4>
        <h4>工作地方：{{coach.coach_place}}</h4>
      </div>
      <div class="remark">
        <h3>备注</h3>
        <h4 ref="userNoteField" @click="_edit('user_note')">{{coach.coach_sign}}</h4>
      </div>
    </div>
    <div class="user-bottom">
      <div class="user-bottomleft">
        <div class="lesson" v-for="record in coach.records">
          <ul>
            <li>{{record.dating_date}}</li>
            <li>{{record.dating_start}} - {{record.dating_end}}</li>
            <li>{{record.course_name}}</li>
            <li>{{record.dating_time}}h</li>
            <li>
              <star :size="24" :rating="record.dating_rating" class="star"></star>
            </li>
          </ul>
        </div>
      </div>
      <div class="user-bottomright">
        <div>
          <h2>ID</h2>
          <h3 ref="userIdField" @click="_edit('user_id')">{{coach.id}}</h3>
        </div>
        <div>
          <h2>微信</h2>
          <h3>{{coach.coach_wechat}}</h3>
        </div>
        <div>
          <h2>电话</h2>
          <h3 ref="userConnectField" @click="_edit('user_connect')">{{coach.coach_connect}}</h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Star from 'base/star/star'
  import { mapGetters, mapMutations } from 'vuex'
  import { remove, edit } from 'api/coach'
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
        'coach'
      ])
    },
    mounted() {
      this.uploadList = this.$refs.upload.fileList
      let params = {
        uid: this.uid,
        timestamp: this.timestamp,
        token: this.token,
        filename: 'recyc/coach/' + this.uid + '.png'
      }
      getToken(params).then(res => {
        this.qiniuToken = res.qiniu_token
      })
    },
    methods: {
      _selectAdd() {
        this.$router.push({
          path: '/coach/creator'
        })
      },
      _selectEdit() {
      },
      _edit(field) {
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
            remove(params, this.coach.id).then(res => {
              if (res.code === 0) {
                this.$swal('删除成功!', '您已成功删除该约课数据！', 'success')
                this.$router.push({
                  path: '/coach'
                })
              }
            })
          }
        })
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
        edit(params, this.coach.id, 'coach_face').then(res => {
          if (res.code === 0) {
            this.setCoach(res.coach)
            console.log('success')
          } else {
            console.log(res)
          }
        })
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
