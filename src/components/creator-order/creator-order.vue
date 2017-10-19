<template>
  <div class="creation">
    <div class="creation-info">
      <div>
        <div class="label">课程ID</div>
        <Input ref="courseId" v-model="courseId" placeholder="请输入..."/>
      </div>
      <div>
        <div class="label">约课ID</div>
        <Input ref="datingId" v-model="datingId" placeholder="请输入..."/>
      </div>
      <div>
        <div class="label label-inline">约课容量</div>
        <Input type="number" class="input-small" ref="datingCapacity" v-model="datingCapacity" placeholder="请输入..." />
      </div>
      <div>
        <div class="label">约课地点</div>
        <Input ref="datingId" v-model="datingId" placeholder="请输入..."/>
      </div>
      <div>
        <div class="label">约课时间段</div>
        <Row class="datepicker">
          <Col span="24">
            <Date-picker type="daterange" v-model="datingTime" placeholder="选择时间" @on-change="onChangeDate"></Date-picker>
          </Col>
        </Row>
      </div>
      <Button type="primary" class="btn-create" @click="_createOrder">添加</Button>
    </div>
    <div class="upload-info">
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
        :format="['jpg','jpeg','png']"
        :max-size="2048"
        :on-format-error="handleFormatError"
        :on-exceeded-size="handleMaxSize"
        :before-upload="handleBeforeUpload"
        multiple
        type="drag"
        action="//jsonplaceholder.typicode.com/posts/"
        style="display: inline-block;width:58px;">
        <div style="width: 58px;height:58px;line-height: 58px;">
          <Icon type="camera" size="20"></Icon>
        </div>
      </Upload>
      <Modal title="查看图片" v-model="visible">
        <img :src="'https://o5wwk8baw.qnssl.com/' + imgName + '/large'" v-if="visible" style="width: 100%">
      </Modal>
    </div>
    <div class="clear"></div>
  </div>
</template>

<script type="text/ecmascript-6">
  import { mapGetters } from 'vuex'
  import { create } from 'api/dating'
  export default {
    data() {
      return {
        courseId: '',
        datingId: '',
        datingCapacity: '',
        datingTime: [],
        defaultList: [
          {
            'name': 'a42bdcc1178e62b4694c830f028db5c0',
            'url': 'https://o5wwk8baw.qnssl.com/a42bdcc1178e62b4694c830f028db5c0/avatar'
          },
          {
            'name': 'bc7521e033abdd1e92222d733590f104',
            'url': 'https://o5wwk8baw.qnssl.com/bc7521e033abdd1e92222d733590f104/avatar'
          }
        ],
        imgName: '',
        visible: false,
        uploadList: []
      }
    },
    mounted () {
      this.uploadList = this.$refs.upload.fileList
    },
    computed: {
      ...mapGetters([
        'token',
        'uid',
        'timestamp'
      ])
    },
    methods: {
      _createOrder () {
        let params = {
          uid: this.uid,
          token: this.token,
          timestamp: this.timestamp,
          course_id: this.courseId,
          dating_id: this.datingId,
          dating_rating: 0,
          dating_users: '',
          dating_time: this.datingTime[0] + '-' + this.datingTime[1],
          dating_capacity: this.datingCapacity,
          dating_register: +new Date()
        }
        console.log(params)
        create(params).then(res => {
          console.log(res)
          if (res.code === 0) {
            this.$swal('添加成功!', '您已成功录入该课程数据！', 'success')
            this.$router.push({
              path: '/order/'
            })
          }
        })
      },
      onChangeDate(value) {
        console.log(value)
        this.datingTime = value
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
        // 因为上传过程为实例，这里模拟添加 url
        file.url = 'https://o5wwk8baw.qnssl.com/7eb99afb9d5f317c912f08b5212fd69a/avatar'
        file.name = '7eb99afb9d5f317c912f08b5212fd69a'
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
      handleBeforeUpload () {
        const check = this.uploadList.length < 5
        if (!check) {
          this.$Notice.warning({
            title: '最多只能上传 5 张图片。'
          })
        }
        return check
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  pink = #FF69B4
  blue = #2d8cf0
  grey = #d7dde4
  white = #fff

  .creation
    width 100%
    background: white
    @media (min-width: 1024px) and (max-width: 1224px)
      height 280px

    .creation-info
      float left
      width 68%
      padding 10px 20px
      @media (min-width: 1524px)
        min-width 745px
      @media (min-width: 1224px) and (max-width: 1524px)
        width 68%
      @media (min-width: 1024px) and (max-width: 1224px)
        width 550px

      div
        padding 2px 0
        @media (min-width: 1524px)
          height 50px
          line-height 50px
        @media (min-width: 1224px) and (max-width: 1524px)
          height 50px
          line-height 50px
        @media (min-width: 1024px) and (max-width: 1224px)
          height 40px
          padding-top 2px
          line-height 40px

        div
          float left

        .label
          @media (min-width: 1524px)
            width 85px
            margin 0 10px
            font-size 1.3em
          @media (min-width: 1224px) and (max-width: 1524px)
            width 80px
            margin 0 10px
            font-size 1.2em
          @media (min-width: 1024px) and (max-width: 1224px)
            width 80px
            margin 0 10px
            font-size 1.2em

        .selection
          padding-top 9px

        .datepicker
          width 36%
          padding 0

        .ivu-col, .timepicker, .ivu-date-picker
          padding 0

        .ivu-date-picker
          margin-top 9px
          margin-right 10%
          line-height 32px !important

        .ivu-input-wrapper
          @media (min-width: 1524px)
            width 36.4%
            min-width 271px
          @media (min-width: 1224px) and (max-width: 1524px)
            width 40%
          @media (min-width: 1024px) and (max-width: 1224px)
            width 80%

        .input-small
          width 150px
          @media (min-width: 1524px)
            min-width 150px
          @media (min-width: 1224px) and (max-width: 1524px)
            min-width 150px
          @media (min-width: 1024px) and (max-width: 1224px)
            min-width 150px
            margin-right 4%

        .radio
          @media (min-width: 1524px)
            font-size 1.2em
            line-height 50px
          @media (min-width: 1224px) and (max-width: 1524px)
            font-size 1.2em
            line-height 50px
          @media (min-width: 1024px) and (max-width: 1224px)
            font-size 1.2em
            line-height 35px

        .ivu-radio-wrapper
          margin-right 25px

        .ivu-radio-group
          @media (min-width: 1024px) and (max-width: 1224px)
            width 80%

      .btn-create
        width 50%
        height 40px
        margin-top 30px
        margin-left 25%
        font-size 1.2em
        @media (min-width: 1524px)
          min-width 340px
        @media (min-width: 1224px) and (max-width: 1524px)
          min-width 340px
        @media (min-width: 1024px) and (max-width: 1224px)
          width 50%

  .upload-info
    float: right
    width: 25%
    padding 35px 0

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
    box-shadow 0 1px 1px rgba(0,0,0,.2)
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
    background rgba(0,0,0,.6)

  .demo-upload-list:hover .demo-upload-list-cover
    display block

  .demo-upload-list-cover i
    color #fff
    font-size 20px
    cursor pointer
    margin 0 2px

  .clear
   clear both
</style>
