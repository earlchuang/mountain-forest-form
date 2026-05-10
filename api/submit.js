// api/submit.js
// Vercel Serverless Function
// 用途：接收表單數據並處理

export default async function handler(req, res) {
  // 只接受 POST 請求
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { form, timestamp } = req.body;

    if (!form) {
      return res.status(400).json({ error: '缺少表單數據' });
    }

    console.log('📝 收到表單提交:', {
      廠商名稱: form.s1_name,
      提交時間: timestamp,
      商品數: form.s5_items.filter(i => i.name).length,
    });

    // 這裡你可以：
    // 1. 保存到數據庫
    // 2. 發送到 Notion
    // 3. 發送 Email 通知
    // 4. 記錄到日誌系統

    // 目前只是返回成功響應
    return res.status(200).json({
      success: true,
      message: '✓ 資料已接收',
      data: {
        廠商: form.s1_name,
        商品數: form.s5_items.filter(i => i.name).length,
        提交時間: timestamp,
      },
    });
  } catch (error) {
    console.error('❌ 錯誤:', error);
    return res.status(500).json({
      error: '伺服器錯誤',
      message: error.message,
    });
  }
}