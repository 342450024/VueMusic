import {
	mapGetters,
	mapMutations,
	mapActions
} from 'vuex'
import {
	playMode
} from 'common/js/config'
import {
	shuffle
} from 'common/js/util'
//有播放列表时  列表刷新
export const playlistMixin = {
	computed: {
		...mapGetters([
			'playlist'
		])
	},
	mounted() {
		this.handlePlaylist(this.playlist)
	},
	activated() {
		this.handlePlaylist(this.playlist)
	},
	watch: {
		playlist(newVal) {
			this.handlePlaylist(newVal)
		}
	},
	methods: {
		handlePlaylist() {
			throw new Error('请实例化handlePlaylist方法')
		}
	}

}
//关于随机播放与收藏喜欢
export const playerMixin = {
	computed: {
		//切换播放顺序
		iconMode() {
			return this.mode === playMode.sequence ? 'icon-sequence' : this.mode === playMode.loop ? 'icon-loop' : 'icon-random'
		},
		...mapGetters([
			'sequenceList',
			'playlist',
			'currentSong',
			'mode',
			'favoriteList'
		])
	},
	methods: {
		//切换音乐播放列表顺序
		changeMode() {
			const mode = (this.mode + 1) % 3
			this.setPlayMode(mode)
			let list = null
			if (mode === playMode.random) {
				list = shuffle(this.sequenceList)
			} else {
				list = this.sequenceList
			}
			this.resetCurrentIndex(list)
			this.setPlaylist(list)
		},
		resetCurrentIndex(list) {
			let index = list.findIndex((item) => {
				return item.id === this.currentSong.id
			})
			this.setCurrentIndex(index)
		},
		toggleFavorite(song) {
			if (this.isFavorite(song)) {
				this.deleteFavoriteList(song)
			} else {
				this.saveFavoriteList(song)
			}
		},
		getFavoriteIcon(song) {
			if (this.isFavorite(song)) {
				return 'icon-favorite'
			}
			return 'icon-not-favorite'
		},
		isFavorite(song) {
			const index = this.favoriteList.findIndex((item) => {
				return item.id === song.id
			})
			return index > -1
		},
		...mapMutations({
			setPlayMode: 'SET_PLAY_MODE',
			setPlaylist: 'SET_PLAYLIST',
			setCurrentIndex: 'SET_CURRENT_INDEX',
			setPlayingState: 'SET_PLAYING_STATE'
		}),
		...mapActions([
			'saveFavoriteList',
			'deleteFavoriteList'
		])
	}
}

export const searchMixin = {
	data() {
		return {
			query: '',
			refreshDelay: 120
		}
	},
	computed: {
		...mapGetters([
			'searchHistory'
		])
	},
	methods: {
		onQueryChange(query) {
			this.query = query
		},
		blurInput() {
			this.$refs.searchBox.blur()
		},
		addQuery(query) {
			this.$refs.searchBox.setQuery(query)
		},
		saveSearch() {
			this.saveSearchHistory(this.query)
		},
		...mapActions([
			'saveSearchHistory',
			'deleteSearchHistory'
		])
	}
}