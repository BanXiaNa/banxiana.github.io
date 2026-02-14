// 音乐播放器共享状态
import { ref } from 'vue'

export interface Track {
  name: string
  author: string
  file: string
  cover: string
  category: string
}

// 播放列表 - 统一管理
export const musicPlaylist = ref<Track[]>([
  {
    name: 'ワールドイズマイン (World is Mine)',
    author: 'supercell feat. 初音ミク',
    file: '/music/japanese/ワールドイズマイン-supercell_初音ミク-1252051-2000.flac',
    cover: 'https://banxia-log.oss-cn-beijing.aliyuncs.com/public/logo.bmp',
    category: 'japanese'
  }
  // 在这里添加更多歌曲
])

// 使用共享播放列表的 composable
export function useMusicStore() {
  return {
    playlist: musicPlaylist
  }
}
