<template>
  <div>
    <div class="editor">
      <span class="add" @click="_selectAdd()"></span>
      <span class="delete" @click="_selectDelete()"></span>
      <span class="edit" @click="_selectEdit()"></span>
    </div>
    <div class="user">
      <img :src="user.user_face" class="userinfo-head" @click="imgUpload = true">
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
          :data="{token: this.qiniuToken, key: 'recyc/user/' + this.uid + '.png'}"
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
          <span ref="userNameField" @click="_edit('user_name')">{{user.user_name}}</span>
          <icon type="female" class="female"></icon>
        </h3>
        <h4>用户账号：{{user.user_account}}</h4>
        <h4>用户注册时间：2017.06.01</h4>
        <h4>年龄：{{user.user_age}}岁</h4>
        <h4>身高：{{user.user_height}}cm</h4>
      </div>
      <div class="remark">
        <h3>备注</h3>
        <h4 ref="userNoteField" @click="_edit('user_note')">{{user.user_note}}</h4>
      </div>
    </div>
    <div class="user-info">
      <div class="body-info">
        <h2>身体成分</h2>
        <li>去脂体重:
          <div>{{user.user_weight_without_fat}} kg</div>
        </li>
        <li>体脂体重:
          <div>{{user.user_fat}} kg</div>
        </li>
        <li>肌肉量:
          <div>{{user.user_muscle}} kg</div>
        </li>
        <li>骨质量:
          <div>{{user.user_bone}} kg</div>
        </li>
        <li>蛋白质:
          <div>{{user.user_protein}} kg</div>
        </li>
        <li>身体水分:
          <div>{{user.user_water}} kg</div>
        </li>
        <h4 class="clear"></h4>
        <li class="measure">
          测量日期：
          <span>
            {{user.last_measure_date}}
          </span>
        </li>
        <li class="measure">
          测量时间：
          <span>
            {{user.last_measure_time}}
          </span>
        </li>
      </div>
      <div class="fat-info">
        <h2>肌肉脂肪控制</h2>
        <li>体脂百分比:
          <div>{{user.user_pbf}} %</div>
        </li>
        <li>体脂指数:
          <div>{{user.user_bmi}} BMI</div>
        </li>
        <li>腰臀比:
          <div>{{user.user_whr}} </div>
        </li>
        <li>内脏脂肪:
          <div>{{user.user_visceral_fat}} VFI</div>
        </li>
        <li>标准体重:
          <div>{{user.user_sbw}} kg</div>
        </li>
        <li>控制体重:
          <div>{{user.user_weight_control}} kg</div>
        </li>
        <li>基础代谢:
          <div>{{user.user_basal_metabolism}} cal</div>
        </li>
        <li>健康评分:
          <div>{{user.user_health_score}}</div>
        </li>
        <li>控制脂肪:
          <div>{{user.user_control_fat}} kg</div>
        </li>
        <li>控制肌肉:
          <div>{{user.user_control_muscle}} kg</div>
        </li>
        <li>生理年龄:
          <div>{{user.user_age}} 岁</div>
        </li>
      </div>
    </div>
    <div class="user-top">
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
    <div class="user-mid">
      <div>
        <div id="weight"></div>
      </div>
      <div>
        <div id="fat"></div>
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
  import echarts from 'echarts'
  import { mapGetters, mapMutations } from 'vuex'
  import { remove, edit } from 'api/user'
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
        'user'
      ])
    },
    mounted() {
      this.initCharts()

      this.uploadList = this.$refs.upload.fileList
      let params = {
        uid: this.uid,
        timestamp: this.timestamp,
        token: this.token,
        filename: 'recyc/user/' + this.uid + '.png'
      }
      getToken(params).then(res => {
        this.qiniuToken = res.qiniu_token
      })
    },
    methods: {
      initCharts() {
        this.weightchart = echarts.init(document.getElementById('weight'))
        this.setWeightOptions()
        this.fatchart = echarts.init(document.getElementById('fat'))
        this.setFatOptions()
      },
      setWeightOptions() {
        this.weightchart.setOption({
          title: {
            text: '一周体重(KG)'
          },
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            data: ['体重']
          },
          toolbox: {
            feature: {
              saveAsImage: {}
            }
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: [
            {
              type: 'category',
              boundaryGap: false,
              data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
            }
          ],
          yAxis: [
            {
              type: 'value',
              min: 45,
              max: 75
            }
          ],
          series: [
            {
              name: '体重',
              type: 'line',
              stack: '总量',
              areaStyle: {
                normal: {
                  color: '#2d8cf0'
                }
              },
              label: {
                normal: {
                  show: true,
                  position: 'top'
                }
              },
              data: [58, 60, 57, 55, 58, 50, 52]
            }
          ],
          color: ['#2d8cf0']
        })
      },
      setFatOptions() {
        this.fatchart.setOption({
          title: {
            text: '一周体脂(%)'
          },
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            data: ['体脂']
          },
          toolbox: {
            feature: {
              saveAsImage: {}
            }
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: [
            {
              type: 'category',
              boundaryGap: false,
              data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
            }
          ],
          yAxis: [
            {
              type: 'value',
              min: 18,
              max: 13
            }
          ],
          series: [
            {
              name: '体脂',
              type: 'line',
              stack: '总量',
              areaStyle: {normal: {}},
              label: {
                normal: {
                  show: true,
                  position: 'top'
                }
              },
              data: [16, 15, 15.2, 15, 14.9, 14.8, 15]
            }
          ],
          color: ['#009900']
        })
      },
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
        edit(params, this.user.id, 'user_face').then(res => {
          if (res.code === 0) {
            this.setUser(res.user)
            console.log('success')
          } else {
            console.log(res)
          }
        })
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

  .clear
   clear both

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
      @media (min-width:1366px)
        min-width 200px
        margin 30px
        margin-bottom 0
      @media (min-width:1024px) and (max-width:1366px)
        min-width 150px
        margin 30px 25px
        margin-bottom 0

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


    .remark
      float left
      width 40%
      height 100px
      margin 25px
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


  .user-info div
    float left
    width 50%
    height 200px
    margin-top 20px
    padding 1%
    background white
    -webkit-border-radius 5px
    -moz-border-radius 5px
    border-radius 5px

    h2
      color grey

    .measure
      width 200px
      color grey

  .body-info
    width 100%

    li
      list-style none
      float left
      width 105px
      margin 5% 8% 0 0
      font-size 1.3em
      font-weight bold

      div
        float right
        width 35px
        height 23px
        margin 0
        padding 0

  .fat-info
    width 100%

    li
      list-style none
      float left
      width 130px
      margin 3% 5% 0 0
      font-size 1.3em
      font-weight bold

      div
        float right
        width 45px
        height 23px
        margin 0
        padding 0

  .user-top div
    float left
    width 50%
    height 150px
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
