import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '利用規約 | GENS ICHIHARA',
  description: 'GENS ICHIHARAの利用規約です。本サイトをご利用いただく際の条件について詳しく説明しています。',
};

export default function TermsOfServicePage() {
  // 🛡️ セキュリティ対策: XSS脆弱性を防ぐため静的コンテンツに変更

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-center text-blue-900 mb-4">
              利用規約
            </h1>
            <p className="text-center text-gray-600">
              最終更新日: 2025年8月17日
            </p>
          </div>
          
          <div className="prose prose-lg max-w-none space-y-6">
            <h2 className="text-2xl font-bold mt-8 mb-4 text-blue-800">第1条（適用）</h2>
            <p className="mb-3 leading-relaxed text-gray-800">
              本規約は、GENS ICHIHARA（以下「当チーム」）が運営するウェブサイト（以下「本サイト」）の利用条件を定めるものです。本サイトを利用する全ての方（以下「利用者」）は本規約に同意したものとみなします。
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4 text-blue-800">第2条（利用登録）</h2>
            <ul className="list-disc list-inside mb-4 ml-4 space-y-2 text-gray-800">
              <li>本サイトの一部機能の利用には、事前の登録が必要な場合があります。</li>
              <li>登録情報に虚偽があった場合、当チームは利用を拒否又は停止することができます。</li>
              <li>登録情報に変更が生じた場合は、速やかに変更手続きを行ってください。</li>
            </ul>

            <h2 className="text-2xl font-bold mt-8 mb-4 text-blue-800">第3条（禁止事項）</h2>
            <p className="mb-3 leading-relaxed text-gray-800">利用者は、本サイト利用において以下の行為を行ってはなりません：</p>
            <ul className="list-disc list-inside mb-4 ml-4 space-y-2 text-gray-800">
              <li>法令又は公序良俗に反する行為</li>
              <li>犯罪行為に関連する行為</li>
              <li>当チーム、他の利用者、第三者の知的財産権、肖像権、プライバシー等の権利を侵害する行為</li>
              <li>当チーム、他の利用者、第三者を中傷、誹謗する行為</li>
              <li>営業、宣伝、広告、勧誘等を目的とする行為</li>
              <li>本サイトの運営を妨害する行為</li>
              <li>コンピューター・ウィルス等有害なプログラムを送信する行為</li>
              <li>その他当チームが不適切と判断する行為</li>
            </ul>

            <h2 className="text-2xl font-bold mt-8 mb-4 text-blue-800">第4条（知的財産権）</h2>
            <ul className="list-disc list-inside mb-4 ml-4 space-y-2 text-gray-800">
              <li>本サイトのコンテンツ（文章、画像、動画等）の著作権は当チーム又は権利者に帰属します。</li>
              <li>利用者は、当チームの事前の書面による許可なく、コンテンツを複製、転載、配布することはできません。</li>
            </ul>

            <h2 className="text-2xl font-bold mt-8 mb-4 text-blue-800">第5条（利用停止・削除）</h2>
            <p className="mb-3 leading-relaxed text-gray-800">
              当チームは、利用者が本規約に違反した場合、事前の通知なく、当該利用者の利用停止、登録削除等の措置を講じることができます。
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4 text-blue-800">第6条（免責事項）</h2>
            <ul className="list-disc list-inside mb-4 ml-4 space-y-2 text-gray-800">
              <li>当チームは、本サイトの内容について、正確性、完全性、有用性等を保証しません。</li>
              <li>本サイトの利用により生じた損害について、当チームは一切の責任を負いません。</li>
              <li>本サイトからリンクされる外部サイトについて、当チームは責任を負いません。</li>
            </ul>

            <h2 className="text-2xl font-bold mt-8 mb-4 text-blue-800">第7条（サービスの変更・停止）</h2>
            <p className="mb-3 leading-relaxed text-gray-800">
              当チームは、利用者への事前通知なく、本サイトの内容変更、サービス停止を行うことができます。これにより生じた損害について当チームは責任を負いません。
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4 text-blue-800">第8条（規約の変更）</h2>
            <p className="mb-3 leading-relaxed text-gray-800">
              当チームは、利用者への事前通知なく本規約を変更することができます。変更後の規約は本サイトに掲載された時点で効力を生じます。
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4 text-blue-800">第9条（個人情報の取扱い）</h2>
            <p className="mb-3 leading-relaxed text-gray-800">
              利用者の個人情報については、別途定めるプライバシーポリシーに従い適切に取り扱います。
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4 text-blue-800">第10条（準拠法・管轄裁判所）</h2>
            <ul className="list-disc list-inside mb-4 ml-4 space-y-2 text-gray-800">
              <li>本規約の解釈・適用は日本法に準拠します。</li>
              <li>本サイトに関して生じた紛争については、千葉地方裁判所を第一審の専属的合意管轄裁判所とします。</li>
            </ul>

            <h2 className="text-2xl font-bold mt-8 mb-4 text-blue-800">第11条（分離可能性）</h2>
            <p className="mb-3 leading-relaxed text-gray-800">
              本規約の一部が無効又は執行不能と判断された場合でも、残りの部分の有効性には影響しません。
            </p>

            <h2 className="text-2xl font-bold mt-8 mb-4 text-blue-800">第12条（お問い合わせ）</h2>
            <p className="mb-3 leading-relaxed text-gray-800">本規約に関するお問い合わせは、以下までご連絡ください：</p>
            <ul className="list-disc list-inside mb-4 ml-4 space-y-2 text-gray-800">
              <li><strong>サイト運営者:</strong> CWG（代表：菅谷 裕樹）</li>
              <li><strong>チーム名:</strong> GENS ICHIHARA</li>
              <li><strong>メール:</strong> gensichihara@gmail.com</li>
            </ul>
            
            <div className="mt-8 pt-4 border-t border-gray-200">
              <p className="text-sm text-gray-600">制定日：2025年8月12日</p>
              <p className="text-sm text-gray-600">最終改定日：2025年8月17日</p>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="text-center">
              <p className="text-gray-600 mb-4">
                本規約に関するご質問やお問い合わせがございましたら、お気軽にご連絡ください。
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