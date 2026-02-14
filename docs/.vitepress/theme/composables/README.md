# 🎵 音乐播放器使用指南

## 快速添加歌曲

编辑 `useMusicStore.ts` 文件：

```typescript
export const musicPlaylist = ref<Track[]>([
  {
    name: '歌曲名称',
    author: '艺术家名称',
    file: '/music/分类文件夹/音频文件.flac',  // 支持 .flac, .mp3, .wav 等
    cover: '封面图片URL',                      // 可以是本地路径或外部URL
    category: 'japanese'                       // 分类标签
  }
])
```

## 分类说明

| 分类值 | 显示名称 | 图标 | 说明 |
|--------|---------|------|------|
| `japanese` | 日文歌 | 🇯🇵 | 日语歌曲 |
| `chinese` | 中文歌 | 🇨🇳 | 中文歌曲 |
| `english` | 英文歌 | 🇺🇸 | 英文歌曲 |
| `light` | 轻音乐 | 🎹 | 纯音乐、轻音乐 |
| `rock` | 重音乐 | 🎸 | 摇滚、金属等 |

## 音频文件放置位置

```
docs/public/music/
├── japanese/    # 日文歌曲
├── chinese/     # 中文歌曲
├── english/     # 英文歌曲
├── light/       # 轻音乐
└── rock/        # 重音乐
```

## 示例

```typescript
{
  name: 'ワールドイズマイン (World is Mine)',
  author: 'supercell feat. 初音ミク',
  file: '/music/japanese/ワールドイズマイン-supercell_初音ミク-1252051-2000.flac',
  cover: 'https://example.com/cover.jpg',
  category: 'japanese'
}
```

## 注意事项

1. 音频文件路径以 `/music/` 开头（对应 `docs/public/music/`）
2. 文件名支持中文和特殊字符
3. 推荐使用 FLAC 格式获得最佳音质
4. 封面图片建议尺寸：500x500 或更大
5. 确保音频文件大小合理，避免加载过慢
