import { Metadata } from 'next';
import { loadTermsOfService, formatTextContent } from '@/lib/textFileLoader';

export const metadata: Metadata = {
  title: '利用規約 | GENS ICHIHARA',
  description: 'GENS ICHIHARAの利用規約です。本サイトをご利用いただく際の条件について詳しく説明しています。',
};

export default async function TermsOfServicePage() {
  const { content, lastModified } = await loadTermsOfService();
  const formattedContent = formatTextContent(content);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-center text-blue-900 mb-4">
              利用規約
            </h1>
            <p className="text-center text-gray-600">
              最終更新日: {lastModified}
            </p>
          </div>
          
          <div className="prose prose-lg max-w-none">
            <div 
              dangerouslySetInnerHTML={{ __html: formattedContent }}
              className="space-y-4"
            />
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