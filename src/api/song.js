import {commonParams} from './config'
import axios from 'axios'

//代理本地调用   歌词
export function getLyric(mid) {
	const url = '/api/lyric'

	const data = Object.assign({}, commonParams, {
		songmid:mid,
		platform: 'yqq',
		pcachetime: +new Date(),
		hostUin:0,
		needNewCode: 0,
		g_tk: 67232076,
		format: 'json'
	})

	return axios.get(url, {
		params: data
	}).then((res) => {
		return Promise.resolve(res.data)
	})
}