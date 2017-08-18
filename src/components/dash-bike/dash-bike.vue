<template>
  <div>
    <div class="editor" @click="_selectAdd()">
      <Icon type="android-add-circle" class="add"></Icon>
    </div>
    <div class="bike-card" v-for="bike in bikeList" @click="_selectBike(bike)">
      <Card>
        <h2>
          <span>ID：{{bike.bike_id}}</span>
          <span class="bike-used unused">
            {{bike.bike_used ? 正在使用 : 未使用}}
          </span>
        </h2>
        <h3>{{bike.bike_type}}</h3>
        <h3>位置：{{bike.bike_position}}</h3>
        <h3>注册时间：{{_toDate(bike.bike_register)}}</h3>
        <h3>最后维护时间：{{_toDate(bike.bike_update)}}</h3>
      </Card>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import { mapGetters, mapMutations } from 'vuex'
  import { list } from 'api/bike'

  export default {
    computed: {
      ...mapGetters([
        'token',
        'uid',
        'timestamp',
        'bikeList'
      ])
    },
    methods: {
      _toDate(ts) {
        let date = new Date(ts)
        return date.getYear() + 1900 + '年' + date.getMonth() + '月' + date.getDate() + '日'
      },
      _showList() {
        let params = {
          uid: this.uid,
          timestamp: this.timestamp,
          token: this.token
        }
        list(params).then(res => {
          if (res.code === 0) {
            this.setBikeList(res.bikes)
          }
        })
      },
      _selectAdd() {
        this.$router.push({
          path: '/bike/creator'
        })
      },
      _selectBike(bike) {
        this.$router.push({
          path: `/bike/${bike.id}`
        })
        this.setBike(bike)
      },
      ...mapMutations({
        setBikeList: 'SET_BIKE_LIST',
        setBike: 'SET_BIKE'
      })
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  blue = #2d8cf0
  using = rgba(255, 60, 45, 0.9)
  unused = rgba(0, 153, 0, 0.9)

  .editor
    position absolute
    top 90%
    left 93%
    width 40px
    height 40px

    .add
      display inline-block
      vertical-align top
      width 100%
      height 100%
      font-size 3.8em
      color blue

    .add:hover
      color rgba(45, 140, 240, 0.7)

  .bike-card
    float left
    width 250px
    height 150px
    margin-right 15px

    h2
      font-size 1.3em

    .bike-used
      float right
      padding-top 11px
      font-size 0.6em

    .using
      color using

    .unused
      color unused

    h3
      margin-top 1px
      font-size 0.9em

</style>
