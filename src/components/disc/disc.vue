<template>
   <transition name='slide'>
   	<MusicList :title="title" :bg-image="bgImage" :songs='songs'></MusicList>
   </transition>
</template>
<script>
import MusicList from 'components/music-list/music-list'
import {getSongList} from 'api/recommend'
import {ERR_OK} from 'api/config'
import {mapGetters} from 'vuex'
import {createSong} from 'common/js/song'
	export default {
    data(){
     return{
      songs:[]
     }
    },
     components:{
     	MusicList
     },
     computed:{
      ...mapGetters(['disc']),
      title(){
        return this.disc.dissname
      },
      bgImage(){
        return this.disc.imgurl
      }
     },
     created(){
      this._getSongList()
     },
     methods:{
      _getSongList(){
        if(!this.disc.dissid){
          this.$router.push('/recommend')
          return
        }
        getSongList(this.disc.dissid).then((res)=>{
         if(res.code === ERR_OK){
         this.songs = this._normalSonglist(res.cdlist[0].songlist)
         }
        })
      },
      //用类  new出需要的数据组成的对象
      _normalSonglist(list){
        let ret = []
        list.forEach((item)=>{
       if(item.songid && item.albummid){
       ret.push(createSong(item))
       }
        })
        return ret
      }
     }
	}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
 .slide-enter-active, .slide-leave-active
   transition:all 0.3s
 .slide-enter, .slide-leave-to
   transform:translate3d(100%,0,0)
</style>
