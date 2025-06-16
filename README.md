# 深空助手 - AI智能体聊天应用

一个基于 Next.js 和 AI SDK 构建的现代化AI聊天应用，支持工具调用、实时状态显示和历史对话管理。

## ✨ 主要特性

### 🤖 AI智能对话
- 基于通义千问模型的智能对话
- 支持多轮对话和上下文理解
- 实时流式响应，提供流畅的对话体验 

### 🛠️ 工具调用能力
- **天气查询工具**: 查询指定城市的实时天气信息
- **数学计算工具**: 执行复杂的数学表达式计算
- **实时状态显示**: 工具执行过程的进度条和状态提示
- **结果可视化**: 美观的工具结果展示界面

### 📚 历史对话管理
- **按日期分组**: 自动按日期组织历史对话
- **智能标题生成**: 根据对话内容自动生成会话标题
- **本地持久化**: 使用 localStorage 保存对话历史
- **快速切换**: 一键切换到任意历史对话
- **对话删除**: 支持删除不需要的历史对话

### 🎨 现代化UI设计
- **响应式布局**: 完美适配桌面端和移动端
- **深色主题**: 护眼的深色界面设计
- **流畅动画**: 丰富的交互动画效果
- **组件化架构**: 高度模块化的组件设计

## 🏗️ 技术架构

### 前端技术栈
- **Next.js 14**: React 全栈框架
- **TypeScript**: 类型安全的 JavaScript
- **Tailwind CSS**: 实用优先的 CSS 框架
- **Lucide React**: 现代化图标库

### AI 技术栈
- **AI SDK**: Vercel 的 AI 开发工具包
- **通义千问**: 阿里云的大语言模型
- **工具调用**: 支持函数调用的 AI 能力

### 开发工具
- **ESLint**: 代码质量检查
- **TypeScript**: 静态类型检查
- **组件化开发**: 模块化的代码组织

## 📁 项目结构

```
my-ai-app/
├── app/                          # Next.js App Router
│   ├── api/                      # API 路由
│   │   └── chat/                 # 聊天 API
│   │       └── route.ts          # 聊天接口实现
│   ├── components/               # React 组件
│   │   ├── WeatherResult.tsx     # 天气结果展示组件
│   │   ├── CalculatorResult.tsx  # 计算结果展示组件
│   │   ├── ToolStatusIndicator.tsx # 工具状态指示器
│   │   ├── ToolCallCard.tsx      # 工具调用卡片
│   │   ├── Message.tsx           # 消息组件
│   │   ├── TypingIndicator.tsx   # 打字指示器
│   │   ├── HistorySidebar.tsx    # 历史对话侧边栏
│   │   └── index.ts              # 组件统一导出
│   ├── hooks/                    # 自定义 Hooks
│   │   └── useChatHistory.ts     # 聊天历史管理 Hook
│   ├── types/                    # TypeScript 类型定义
│   │   └── index.ts              # 类型定义文件
│   ├── utils/                    # 工具函数
│   │   └── index.ts              # 通用工具函数
│   ├── globals.css               # 全局样式
│   ├── layout.tsx                # 根布局组件
│   └── page.tsx                  # 主页面组件
├── package.json                  # 项目依赖配置
├── tailwind.config.ts           # Tailwind CSS 配置
├── tsconfig.json                # TypeScript 配置
└── README.md                    # 项目说明文档
```

## 🚀 快速开始

### 环境要求
- Node.js 18+ 
- npm 或 yarn 或 pnpm

### 安装依赖
```bash
npm install
# 或
yarn install
# 或
pnpm install
```

### 环境配置
创建 `.env.local` 文件并配置以下环境变量：

```env
# 通义千问 API 密钥
DASHSCOPE_API_KEY=your_dashscope_api_key_here
```

### 启动开发服务器
```bash
npm run dev
# 或
yarn dev
# 或
pnpm dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看应用。

### 构建生产版本
```bash
npm run build
npm start
```

## 🎯 核心功能详解

### 1. AI 对话系统
- 支持自然语言对话
- 实时流式响应
- 上下文记忆能力
- 智能工具调用

### 2. 工具调用功能

#### 天气查询工具
```typescript
// 使用示例
用户: "北京今天天气怎么样？"
AI: 调用天气查询工具 → 返回详细天气信息
```

#### 数学计算工具
```typescript
// 使用示例  
用户: "计算 15 * 23 + 87"
AI: 调用计算器工具 → 返回计算结果: 432
```

### 3. 历史对话管理
- 自动按日期分组保存对话
- 支持对话标题自动生成
- 本地存储，数据持久化
- 快速检索和切换历史对话

### 4. 响应式设计
- 桌面端：侧边栏常驻显示
- 移动端：抽屉式侧边栏
- 自适应布局和交互

## 🔧 组件说明

### 核心组件

#### `Message` - 消息组件
负责渲染用户消息和AI回复，包括工具调用结果的展示。

#### `ToolCallCard` - 工具调用卡片
展示工具执行过程、状态和结果，支持展开/收起详细信息。

#### `HistorySidebar` - 历史对话侧边栏
管理和展示历史对话，支持按日期分组和快速切换。

#### `WeatherResult` / `CalculatorResult` - 结果展示组件
专门用于展示不同工具的执行结果，提供美观的可视化界面。

### 自定义 Hooks

#### `useChatHistory` - 聊天历史管理
提供完整的聊天历史管理功能，包括创建、保存、删除和切换对话。

### 工具函数

#### 日期处理
- `formatDate`: 格式化日期为 YYYY-MM-DD
- `formatDisplayDate`: 转换为友好的显示格式

#### 会话管理
- `generateSessionTitle`: 自动生成会话标题
- `generateSessionId`: 生成唯一会话ID

## 🎨 样式系统

### Tailwind CSS 配置
- 自定义颜色主题
- 响应式断点设置
- 动画和过渡效果

### CSS 变量
```css
:root {
  --background: 222.2 84% 4.9%;
  --foreground: 210 40% 98%;
  --primary: 210 40% 98%;
  /* 更多变量... */
}
```

## 🔒 环境变量

| 变量名 | 说明 | 必需 |
|--------|------|------|
| `DASHSCOPE_API_KEY` | 通义千问 API 密钥 | ✅ |

## 📝 开发指南

### 添加新工具
1. 在 `app/api/chat/route.ts` 中定义工具
2. 创建对应的结果展示组件
3. 在 `ToolCallCard` 中添加结果渲染逻辑

### 添加新组件
1. 在 `app/components/` 目录创建组件文件
2. 添加 TypeScript 类型定义
3. 在 `app/components/index.ts` 中导出

### 自定义样式
1. 使用 Tailwind CSS 类名
2. 必要时在 `globals.css` 中添加自定义样式
3. 遵循现有的设计系统

## 🤝 贡献指南

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 🙏 致谢

- [Next.js](https://nextjs.org/) - React 全栈框架
- [Vercel AI SDK](https://sdk.vercel.ai/) - AI 开发工具包
- [Tailwind CSS](https://tailwindcss.com/) - CSS 框架
- [Lucide](https://lucide.dev/) - 图标库
- [阿里云通义千问](https://tongyi.aliyun.com/) - 大语言模型

---

**深空助手** - 让AI对话更智能，让交互更自然 🚀