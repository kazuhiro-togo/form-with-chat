# チャットで入力フォーム操作

**入力フォームをチャットで設定するコンセプト実装**

## 概要

このプロジェクトは、ユーザーがチャットインターフェースを通じて入力フォームの設定を行うための試作です。

<img width="1191" alt="image" src="https://github.com/user-attachments/assets/635ac60b-b1ef-462f-ac56-43e70f3ff91e">

## セットアップ

### バックエンドのセットアップ

```bash
cd backend
npm install
```

backendフォルダ内に.envファイルを作成し、以下を追加：

```
OPENAI_API_KEY=your_openai_api_key_here
PORT=3001
```

### フロントエンドのセットアップ

```bash
cd frontend
npm install
```

frontendフォルダ内に.envファイルを作成し、以下を追加：

```
REACT_APP_API_BASE_URL=http://localhost:3001/api
```

## サーバー起動方法

プロジェクトルートディレクトリで以下を実行

```bash
npm start
```

## 試し方

1. チャットボックスに設定変更の指示を入力（例：「名前を田中に変更したい」）。
2. 送信すると、対象の項目が自動的に更新されます。指示次第で複数項目の反映も可能です。
