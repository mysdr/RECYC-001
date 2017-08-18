<template>
  <div class="creation">
    <div class="creation-info">
      <div>
        <div class="label">车辆ID</div>
        <Input ref="bikeId" v-model="bikeId" placeholder="请输入..."/>
      </div>
      <div>
        <div class="label">车辆类型</div>
        <Select v-model="bikeType" class="ivu-input-wrapper">
          <Option v-for="item in bikeTypeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
      </div>
      <div>
        <div class="label">车辆位置</div>
        <Input ref="bikeLocation" v-model="bikeLocation" placeholder="请输入..."/>
      </div>
      <Button type="primary" class="btn-create" @click="_createBike()">添加</Button>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import { mapGetters } from 'vuex'
  import { create } from 'api/bike'
  export default {
    data() {
      return {
        bikeId: '',
        bikeType: '',
        bikeTypeList: [
          {
            value: 'donggan',
            label: '动感单车'
          }
        ],
        bikeLocation: ''
      }
    },
    computed: {
      ...mapGetters([
        'token',
        'uid',
        'timestamp'
      ])
    },
    methods: {
      _createBike() {
        let params = {
          uid: this.uid,
          timestamp: this.timestamp,
          token: this.token,
          bike_id: this.bikeId,
          bike_type: this.bikeType,
          bike_location: this.bikeLocation,
          bike_used: false,
          bike_update: +new Date(),
          bike_register: +new Date()
        }
        create(params).then(res => {
          if (res.code === 0) {
            this.$swal('添加成功!', '您已成功录入该车辆数据！', 'success')
          }
        })
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
    height 280px
    background: white
    @media (min-width: 1024px) and (max-width: 1224px)
      height 530px

    .creation-info
      width 68%
      padding 10px 20px
      @media (min-width: 1524px)
        min-width 745px
      @media (min-width: 1224px) and (max-width: 1524px)
        width 68%
      @media (min-width: 1024px) and (max-width: 1224px)
        width 500px

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
            width 64px
            margin 0 10px
            font-size 1.3em
          @media (min-width: 1224px) and (max-width: 1524px)
            width 60px
            margin 0 10px
            font-size 1.2em
          @media (min-width: 1024px) and (max-width: 1224px)
            width 14%
            margin 0 10px
            font-size 1.2em

        .ivu-input-wrapper
          @media (min-width: 1524px)
            width 36.4%
            min-width 271px
          @media (min-width: 1224px) and (max-width: 1524px)
            width 32%
          @media (min-width: 1024px) and (max-width: 1224px)
            width 80%

        .input-small
          width 50px
          @media (min-width: 1524px)
            min-width 50px
          @media (min-width: 1224px) and (max-width: 1524px)
            min-width 50px
          @media (min-width: 1024px) and (max-width: 1224px)
            min-width 50px
            margin-right 4%

        .ivu-select
          @media (min-width: 1524px)
            padding-top 11px
          @media (min-width: 1224px) and (max-width: 1524px)
            padding-top 11px
          @media (min-width: 1024px) and (max-width: 1224px)
            padding-top 6px

        .ivu-radio-wrapper
          margin-right 25px

        .ivu-radio-group
          @media (min-width: 1024px) and (max-width: 1224px)
            width 80%

      .btn-create
        width 50%
        height 40px
        margin-top 20px
        margin-left 25%
        font-size 1.2em
        @media (min-width: 1524px)
          min-width 340px
        @media (min-width: 1224px) and (max-width: 1524px)
          min-width 340px
        @media (min-width: 1024px) and (max-width: 1224px)
          width 50%

</style>
