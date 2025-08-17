import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'プライバシーポリシー | GENS ICHIHARA',
  description: 'GENS ICHIHARAのプライバシーポリシーです。個人情報の取り扱いについて詳しく説明しています。',
};

export default function PrivacyPolicyPage() {
  // 🛡️ セキュリティ対策: XSS脆弱性を防ぐため静的コンテンツに変更

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-center text-blue-900 mb-4">
              プライバシーポリシー
            </h1>
            <p className="text-center text-gray-600">
              最終更新日: 2025年8月17日
            </p>
          </div>
          
          <div className="prose prose-lg max-w-none space-y-6">
            <h2 className="text-2xl font-bold mt-8 mb-4 text-blue-800">1. 基本方針</h2>
            <p className="mb-3 leading-relaxed text-gray-800">
              GENS ICHIHARA（以下「当チーム」）は、個人情報保護法及び関連法令を遵守し、利用者の個人情報を適切に取り扱います。
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4 text-blue-800">2. 個人情報の定義</h2>
            <p className="mb-3 leading-relaxed text-gray-800">
              個人情報とは、個人情報保護法第2条第1項に規定する個人情報を指し、生存する個人に関する情報であって、当該情報に含まれる氏名、生年月日その他の記述により特定の個人を識別することができるもの、及び個人識別符号が含まれるものを指します。
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4 text-blue-800">3. 収集する個人情報の項目</h2>
            <p className="mb-3 leading-relaxed text-gray-800">当ウェブサイトでは、以下の個人情報を収集する場合があります：</p>
            
            <h3 className="text-xl font-semibold mt-6 mb-3 text-blue-900">お問い合わせ時</h3>
            <ul className="list-disc list-inside mb-4 ml-4 space-y-2 text-gray-800">
              <li>氏名</li>
              <li>メールアドレス</li>
              <li>電話番号</li>
              <li>年齢</li>
              <li>お問い合わせ内容</li>
            </ul>

            <h3 className="text-xl font-semibold mt-6 mb-3 text-blue-900">体験・練習参加申込時</h3>
            <ul className="list-disc list-inside mb-4 ml-4 space-y-2 text-gray-800">
              <li>氏名（ふりがな）</li>
              <li>生年月日</li>
              <li>性別</li>
              <li>住所</li>
              <li>電話番号</li>
              <li>メールアドレス</li>
              <li>緊急連絡先</li>
              <li>既往歴・健康状態に関する情報</li>
            </ul>

            <h3 className="text-xl font-semibold mt-6 mb-3 text-blue-900">自動取得情報</h3>
            <ul className="list-disc list-inside mb-4 ml-4 space-y-2 text-gray-800">
              <li>IPアドレス</li>
              <li>ブラウザ情報</li>
              <li>アクセス日時</li>
              <li>閲覧ページ</li>
              <li>Cookieによる情報</li>
            </ul>

            <h2 className="text-2xl font-bold mt-8 mb-4 text-blue-800">4. 個人情報の利用目的</h2>
            <p className="mb-3 leading-relaxed text-gray-800">収集した個人情報は以下の目的で利用します：</p>
            <ul className="list-disc list-inside mb-4 ml-4 space-y-2 text-gray-800">
              <li>お問い合わせへの回答・対応</li>
              <li>練習会・イベントの運営・管理</li>
              <li>安全管理・緊急時の連絡</li>
              <li>当チームの活動に関する情報提供</li>
              <li>ウェブサイトの改善・最適化</li>
              <li>統計データの作成（個人を特定できない形式）</li>
            </ul>

            <h2 className="text-2xl font-bold mt-8 mb-4 text-blue-800">5. 個人情報の第三者提供</h2>
            <p className="mb-3 leading-relaxed text-gray-800">当チームは、以下の場合を除き、個人情報を第三者に提供しません：</p>
            <ul className="list-disc list-inside mb-4 ml-4 space-y-2 text-gray-800">
              <li>ご本人の同意を得た場合</li>
              <li>法令に基づく場合</li>
              <li>人の生命、身体又は財産の保護のために必要がある場合</li>
              <li>公衆衛生の向上又は児童の健全な育成の推進のため特に必要がある場合</li>
              <li>国の機関若しくは地方公共団体又はその委託を受けた者が法令の定める事務を遂行することに対して協力する必要がある場合</li>
            </ul>

            <h2 className="text-2xl font-bold mt-8 mb-4 text-blue-800">6. 個人情報の保存期間</h2>
            <p className="mb-3 leading-relaxed text-gray-800">個人情報は利用目的の達成に必要な期間のみ保存し、以下を基準とします：</p>
            <ul className="list-disc list-inside mb-4 ml-4 space-y-2 text-gray-800">
              <li>お問い合わせ情報：2年間</li>
              <li>体験・練習参加者情報：参加から3年間</li>
              <li>アクセスログ：1年間</li>
            </ul>

            <h2 className="text-2xl font-bold mt-8 mb-4 text-blue-800">7. 個人情報の安全管理措置</h2>
            <p className="mb-3 leading-relaxed text-gray-800">
              当チームは、個人情報の漏えい、滅失又は毀損の防止その他の個人情報の安全管理のため、必要かつ適切な措置を講じます。
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4 text-blue-800">8. Cookieについて</h2>
            <p className="mb-3 leading-relaxed text-gray-800">
              当ウェブサイトでは、サービス向上のためCookieを使用する場合があります。Cookieの使用を希望されない場合は、ブラウザの設定で無効にすることができます。
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4 text-blue-800">9. 個人情報に関するお問い合わせ</h2>
            <p className="mb-3 leading-relaxed text-gray-800">個人情報の開示、訂正、利用停止等に関するお問い合わせは、以下までご連絡ください：</p>
            <ul className="list-disc list-inside mb-4 ml-4 space-y-2 text-gray-800">
              <li><strong>サイト運営者:</strong> CWG（代表：菅谷 裕樹）</li>
              <li><strong>チーム名:</strong> GENS ICHIHARA</li>
              <li><strong>メール:</strong> gensichihara@gmail.com</li>
            </ul>

            <h2 className="text-2xl font-bold mt-8 mb-4 text-blue-800">10. プライバシーポリシーの変更</h2>
            <p className="mb-3 leading-relaxed text-gray-800">
              本ポリシーは、法令の変更等に伴い、予告なく変更する場合があります。変更後のポリシーは、本ウェブサイトに掲載された時点から効力を生じるものとします。
            </p>

            <div className="mt-8 pt-4 border-t border-gray-200">
              <p className="text-sm text-gray-600">制定日：2025年8月12日</p>
              <p className="text-sm text-gray-600">最終改定日：2025年8月17日</p>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="text-center">
              <p className="text-gray-600 mb-4">
                ご質問やご不明な点がございましたら、お気軽にお問い合わせください。
              </p>
              <div className="space-y-2 text-sm text-gray-700">
                <p><strong>サイト運営者:</strong> CWG（代表：菅谷 裕樹）</p>
                <p><strong>チーム名:</strong> GENS ICHIHARA</p>
                <p><strong>メール:</strong> 
                  <a href="mailto:gensichihara@gmail.com" className="text-blue-600 hover:underline ml-1">
                    gensichihara@gmail.com
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}