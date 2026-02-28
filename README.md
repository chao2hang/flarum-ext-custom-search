# Flarum 自定义搜索插件 (Custom Search)

这是一个为 Flarum 开发的搜索增强插件。它通过替换 Flarum 原生的站内搜索逻辑，允许用户直接使用外部搜索引擎（Google 或 Bing）来搜索本站内容，提升搜索体验的同时减轻了服务器的索引压力。

## 功能特性

- **多引擎支持**：在搜索框左侧集成了一个搜索引擎选择器，用户可以在 Google 和 Bing 之间自由切换。
- **默认使用 Bing**：根据您的需求，插件初始化时默认选中 Bing 搜索引擎。
- **精准搜索范围**：搜索时会自动在关键词前添加 `site:[当前域名]` 前缀，确保搜索结果仅来自本站。
- **原生风格整合**：
  - 移除了原有的左侧放大镜图标。
  - 采用 Flarum 原生的 `Select` 组件和配色，与系统 UI 完美融合。
  - 右侧集成了搜索按钮，操作直观。
- **性能优化**：禁用了 Flarum 原生的异步搜索请求，避免在输入时产生不必要的服务器查询。

## 安装

您可以直接通过 Composer 安装此插件：

```bash
composer require nopj/flarum-ext-custom-search:*
```

启用插件：

```bash
php flarum extension:enable nopj-custom-search
```

清除缓存：

```bash
php flarum cache:clear
```

## 开发与编译

如果您需要修改插件的 JS 或 CSS，请进入 `js` 目录进行操作：

```bash
cd packages/flarum-ext-custom-search/js
# 安装依赖
npm install
# 开发模式（实时监听变化）
npm run dev
# 生产模式编译
npm run build
```

## 使用说明

1. 在论坛顶部的搜索框中输入您要查找的内容。
2. （可选）点击搜索框左侧的下拉菜单，切换您偏好的搜索引擎（默认 Bing）。
3. 按下 **回车键** 或点击搜索框右侧的 **搜索按钮**。
4. 浏览器将在新标签页中打开对应搜索引擎的搜索结果页面。

## 开源协议

本项目采用 MIT 协议开源。
