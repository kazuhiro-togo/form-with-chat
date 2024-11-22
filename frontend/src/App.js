// frontend/src/App.js
import React, { useState } from 'react';
import Chat from './components/Chat';
import { Container, Typography, Box } from '@mui/material';
import SettingsForm from './components/SettingsForm';

function App() {
  const [reloadSettings, setReloadSettings] = useState(false); // 設定更新通知用の状態

  return (
    <Container style={{ marginTop: '20px' }}>
      <Typography variant="h4" gutterBottom>
        設定チャットインターフェース
      </Typography>
      <Box
        display="flex"
        justifyContent="space-between" // コンテンツ間にスペースを確保
        alignItems="flex-start"       // 上部を揃える
        style={{ marginTop: '20px' }}
      >
        {/* 左側に設定フォーム */}
        <Box flex="1" marginRight="20px"> {/* 余白を追加 */}
          <Typography variant="h6" color="primary" gutterBottom>
            入力フォーム
          </Typography>
          <SettingsForm reload={reloadSettings} />
        </Box>

        {/* 右側にチャットインターフェース */}
        <Box flex="1">
          <Typography variant="h6" color="primary" gutterBottom>
            チャットインターフェース
          </Typography>
          <Chat setReloadSettings={setReloadSettings} />
        </Box>
      </Box>
    </Container>
  );
}

export default App;
