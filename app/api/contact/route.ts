import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(request: NextRequest) {
  try {
    const { name, email, company, phone, subject, message } = await request.json()

    // 必須フィールドの検証
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: '必須項目が入力されていません' },
        { status: 400 }
      )
    }

    // メール設定
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })

    // 管理者向けメール
    const adminMailOptions = {
      from: process.env.SMTP_USER,
      to: process.env.CONTACT_EMAIL,
      subject: `【お問い合わせ】${subject}`,
      html: `
        <h2>ウェブサイトからお問い合わせがありました</h2>
        
        <p><strong>お名前:</strong> ${name}</p>
        <p><strong>メールアドレス:</strong> ${email}</p>
        <p><strong>会社名・団体名:</strong> ${company || '未記入'}</p>
        <p><strong>電話番号:</strong> ${phone || '未記入'}</p>
        <p><strong>お問い合わせの種類:</strong> ${subject}</p>
        
        <p><strong>お問い合わせ内容:</strong></p>
        <div style="background-color: #f5f5f5; padding: 15px; border-left: 4px solid #007bff; margin: 10px 0;">
          ${message.replace(/\n/g, '<br>')}
        </div>
        
        <hr>
        <p style="color: #666; font-size: 12px;">
          このメールは恒栄トレーディング株式会社のウェブサイトから送信されました。
        </p>
      `,
    }

    // お客様向け自動返信メール
    const customerMailOptions = {
      from: process.env.SMTP_USER,
      to: email,
      subject: 'お問い合わせを承りました - 恒栄トレーディング株式会社',
      html: `
        <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif;">
          <h2 style="color: #1e40af;">お問い合わせありがとうございます</h2>
          
          <p>${name} 様</p>
          
          <p>
            この度は、恒栄トレーディング株式会社にお問い合わせいただき、誠にありがとうございます。<br>
            以下の内容でお問い合わせを承りました。
          </p>
          
          <div style="background-color: #f8f9fa; padding: 20px; border: 1px solid #dee2e6; border-radius: 5px; margin: 20px 0;">
            <p><strong>お問い合わせの種類:</strong> ${subject}</p>
            <p><strong>お問い合わせ内容:</strong></p>
            <div style="background-color: white; padding: 15px; border-radius: 3px; margin-top: 10px;">
              ${message.replace(/\n/g, '<br>')}
            </div>
          </div>
          
          <p>
            担当者より2-3営業日以内にご回答させていただきます。<br>
            お急ぎの場合は、直接お電話でお問い合わせください。
          </p>
          
          <div style="background-color: #e3f2fd; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <h3 style="color: #1565c0; margin-top: 0;">お問い合わせ先</h3>
            <p style="margin: 5px 0;"><strong>恒栄トレーディング株式会社</strong></p>
            <p style="margin: 5px 0;">TEL: 03-1234-5678</p>
            <p style="margin: 5px 0;">Email: info@kjt.co.jp</p>
            <p style="margin: 5px 0;">営業時間: 平日 9:00-18:00</p>
          </div>
          
          <p>
            今後とも恒栄トレーディング株式会社をよろしくお願いいたします。
          </p>
          
          <hr style="margin: 30px 0;">
          <p style="color: #666; font-size: 12px;">
            このメールは自動送信されています。このメールに直接返信いただいても対応いたしかねますので、
            ご質問等がございましたら、上記連絡先までお問い合わせください。
          </p>
        </div>
      `,
    }

    // メール送信
    if (process.env.SMTP_HOST && process.env.SMTP_USER) {
      await transporter.sendMail(adminMailOptions)
      await transporter.sendMail(customerMailOptions)
    } else {
      // 開発環境では、コンソールにログ出力
      console.log('=== お問い合わせフォーム送信 ===')
      console.log('名前:', name)
      console.log('メール:', email)
      console.log('会社:', company)
      console.log('電話:', phone)
      console.log('件名:', subject)
      console.log('内容:', message)
      console.log('===============================')
    }

    return NextResponse.json({ success: true, message: 'お問い合わせを受け付けました' })
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'メール送信に失敗しました' },
      { status: 500 }
    )
  }
}