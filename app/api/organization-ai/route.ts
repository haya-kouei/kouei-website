import { NextRequest, NextResponse } from 'next/server'
import { getOrganizations } from '@/lib/content-loader'
import Anthropic from '@anthropic-ai/sdk'

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json()

    if (!message || message.trim() === '') {
      return NextResponse.json(
        { error: 'メッセージが空です' },
        { status: 400 }
      )
    }

    // YAMLから組織データを読み込み
    const organizations = await getOrganizations()

    if (!organizations) {
      return NextResponse.json(
        { error: '組織データの読み込みに失敗しました' },
        { status: 500 }
      )
    }

    // APIキーの確認
    if (!process.env.ANTHROPIC_API_KEY) {
      return NextResponse.json(
        { error: 'Anthropic API キーが設定されていません' },
        { status: 500 }
      )
    }

    // Claude API クライアント初期化
    const anthropic = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY,
    })

    // 組織データをコンテキストとして整形
    const context = `
あなたは株式会社恒栄トレーディングの組織案内アシスタントです。
以下の3つの拠点について、ユーザーの質問に答えてください。

# ベトナム拠点
${JSON.stringify(organizations.vietnam, null, 2)}

# 日本本社
${JSON.stringify(organizations.japan, null, 2)}

# ミャンマー支店
${JSON.stringify(organizations.myanmar, null, 2)}

## 回答の指針
- 丁寧でわかりやすい日本語で回答してください
- 質問された拠点の詳細情報を提供してください
- 連絡先、所在地、事業内容などを適切に案内してください
- 不明な情報がある場合は正直に「情報がありません」と伝えてください
- 必要に応じて、他の適切な拠点を提案してください
`

    // Claude APIを呼び出し
    const response = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 2048,
      temperature: 0.7,
      messages: [
        {
          role: 'user',
          content: `${context}\n\nユーザーの質問: ${message}`
        }
      ]
    })

    // レスポンスからテキストを抽出
    const aiResponse = response.content[0].type === 'text'
      ? response.content[0].text
      : 'エラー: 適切なレスポンスを生成できませんでした'

    return NextResponse.json({
      response: aiResponse,
      model: response.model,
      usage: response.usage
    })

  } catch (error: any) {
    console.error('Organization AI Error:', error)
    return NextResponse.json(
      {
        error: 'AIの応答生成中にエラーが発生しました',
        details: error.message
      },
      { status: 500 }
    )
  }
}
