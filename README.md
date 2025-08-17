# 🙏 宗教動態貼圖館 - GitHub整合版

> 專業的宗教動態貼圖分享平台，支援GitHub自動化部署

## 🌟 特色功能

### 🔄 自動化工作流程
- **後台上傳** → GitHub Repository
- **GitHub Actions** → 自動觸發部署
- **Netlify部署** → 新貼圖自動上線

### 🎨 智能管理
- **雙格式支援** - GIF原檔 + WebP優化
- **AI標籤建議** - 智能分析推薦標籤
- **批量操作** - 高效管理大量作品
- **即時同步** - 雲端數據實時同步

### 🚀 現代化技術
- **GitHub API整合** - 直接上傳到GitHub
- **自動部署** - GitHub Actions + Netlify
- **響應式設計** - 完美支援所有設備
- **PWA支援** - 可安裝到桌面

## 📋 快速開始

### 1. 創建GitHub Repository

```bash
# 在GitHub創建新的Repository
# 例如: your-username/sticker-gallery
```

### 2. 配置GitHub設置

1. 進入後台管理 (`/admin.html`)
2. 點擊「GitHub設置」
3. 填入以下信息：
   - **Repository**: `your-username/repository-name`
   - **Access Token**: GitHub Personal Access Token
   - **Branch**: `main` (或 `master`)

### 3. 生成GitHub Token

1. 訪問 [GitHub Settings](https://github.com/settings/tokens)
2. 點擊「Generate new token (classic)」
3. 選擇權限：
   - ✅ `repo` (完整repository權限)
   - ✅ `workflow` (GitHub Actions權限)
4. 複製生成的Token

### 4. 配置Netlify

1. 連接GitHub Repository到Netlify
2. 設置環境變量：
   - `NETLIFY_AUTH_TOKEN`: Netlify API Token
   - `NETLIFY_SITE_ID`: Netlify Site ID

### 5. 開始使用

1. 在後台上傳第一個貼圖
2. GitHub Actions自動觸發
3. 網站自動更新並部署

## 🔧 技術架構

### 前台 (Public Website)
```
index.html
├── 動態載入作品數據 (works.json)
├── 響應式展示界面
├── 智能格式選擇 (WebP/GIF)
└── 下載功能
```

### 後台 (Admin Panel)
```
admin.html
├── GitHub API整合
├── 文件上傳處理
├── 作品管理界面
└── 批量操作功能
```

### 自動化部署
```
GitHub Actions
├── 監聽文件變更
├── 驗證數據格式
├── 自動部署到Netlify
└── 部署狀態通知
```

## 📁 目錄結構

```
freedance-video-sticker-gallery/
├── .github/
│   └── workflows/
│       ├── deploy.yml          # 主要部署流程
│       └── update-works.yml    # 作品更新流程
├── images/                     # 貼圖文件目錄
├── scripts/
│   └── validate-works.js       # 數據驗證腳本
├── admin.html                  # 後台管理界面
├── index.html                  # 前台展示界面
├── works.json                  # 作品數據文件
├── netlify.toml               # Netlify配置
├── package.json               # 項目配置
└── README.md                  # 說明文檔
```

## 🔄 工作流程

### 上傳新貼圖
1. **後台操作** - 在 `/admin.html` 上傳GIF文件
2. **GitHub上傳** - 文件自動上傳到 `images/` 目錄
3. **數據同步** - 作品信息更新到 `works.json`
4. **觸發部署** - GitHub Actions檢測到變更
5. **自動部署** - Netlify重新部署網站
6. **即時上線** - 新貼圖在前台顯示

### 編輯現有作品
1. **後台編輯** - 修改作品信息
2. **數據更新** - 更新 `works.json`
3. **自動同步** - GitHub Actions自動部署
4. **即時生效** - 修改立即反映在網站上

## 🛠️ 開發指令

```bash
# 本地開發
npm run dev

# 驗證數據
npm run validate

# 預覽網站
npm run preview
```

## 🔒 安全設置

### GitHub Token權限
- ✅ `repo` - Repository完整權限
- ✅ `workflow` - GitHub Actions權限
- ❌ 不需要其他權限

### Netlify環境變量
```bash
NETLIFY_AUTH_TOKEN=your_netlify_token
NETLIFY_SITE_ID=your_site_id
```

### 數據保護
- 所有敏感信息存儲在環境變量中
- GitHub Token僅存儲在瀏覽器本地
- 自動數據驗證防止錯誤部署

## 📊 監控和維護

### GitHub Actions狀態
- 每次推送自動觸發部署
- 部署狀態在Actions頁面查看
- 失敗時自動發送通知

### 數據驗證
- 自動驗證 `works.json` 格式
- 檢查圖片文件完整性
- 部署前進行安全檢查

### 性能優化
- 圖片自動緩存 (1年)
- JSON數據緩存 (5分鐘)
- CDN全球加速

## 🎯 最佳實踐

### 文件命名
- 使用時間戳前綴: `1692123456_sticker.gif`
- 避免特殊字符和空格
- 保持文件名簡潔明確

### 作品信息
- 填寫完整的標題和描述
- 使用相關的標籤
- 選擇正確的分類

### 定期維護
- 定期檢查GitHub Actions狀態
- 監控網站性能指標
- 備份重要數據

## 🆘 故障排除

### 部署失敗
1. 檢查GitHub Actions日誌
2. 驗證Netlify環境變量
3. 確認Token權限正確

### 圖片不顯示
1. 檢查文件路徑是否正確
2. 確認圖片已上傳到GitHub
3. 驗證 `works.json` 格式

### 連接問題
1. 測試GitHub API連接
2. 檢查網絡連接
3. 確認Token未過期

## 📞 技術支援

如遇到問題，請檢查：
1. GitHub Actions執行日誌
2. 瀏覽器開發者工具控制台
3. Netlify部署日誌

## 📄 授權

MIT License - 自由使用和修改

---

**🙏 願一切眾生離苦得樂 · 智慧與慈悲同在**

