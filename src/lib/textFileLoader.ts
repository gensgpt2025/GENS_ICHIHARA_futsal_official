import { promises as fs } from 'fs';
import path from 'path';

export interface PolicyData {
  content: string;
  lastModified: string;
}

export async function loadTextFile(filename: string): Promise<PolicyData> {
  try {
    const filePath = path.join(process.cwd(), '..', filename);
    const content = await fs.readFile(filePath, 'utf-8');
    const stats = await fs.stat(filePath);
    
    return {
      content: content.trim(),
      lastModified: stats.mtime.toLocaleDateString('ja-JP', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    };
  } catch (error) {
    console.error(`Error loading ${filename}:`, error);
    return {
      content: 'ファイルの読み込みに失敗しました。',
      lastModified: new Date().toLocaleDateString('ja-JP')
    };
  }
}

export async function loadPrivacyPolicy(): Promise<PolicyData> {
  return loadTextFile('public/content/privacy-policy.txt');
}

export async function loadTermsOfService(): Promise<PolicyData> {
  return loadTextFile('public/content/terms-of-service.txt');
}

export function formatTextContent(content: string): string {
  return content
    .split('\n')
    .map(line => {
      const trimmedLine = line.replace(/^\d+→/, '').trim();
      if (!trimmedLine) return '';
      
      // Markdown見出しの処理
      if (trimmedLine.startsWith('## ')) {
        return `<h2 class="text-2xl font-bold mt-8 mb-4 text-blue-800">${trimmedLine.substring(3)}</h2>`;
      }
      
      if (trimmedLine.startsWith('### ')) {
        return `<h3 class="text-xl font-semibold mt-6 mb-3 text-blue-900">${trimmedLine.substring(4)}</h3>`;
      }
      
      if (trimmedLine.match(/^第\d+条/) || trimmedLine.match(/^\d+\./)) {
        return `<h3 class="text-xl font-semibold mt-6 mb-3 text-blue-900">${trimmedLine}</h3>`;
      }
      
      if (trimmedLine === trimmedLine.toUpperCase() && trimmedLine.length > 1) {
        return `<h2 class="text-2xl font-bold mt-8 mb-4 text-blue-800">${trimmedLine}</h2>`;
      }
      
      if (trimmedLine.startsWith('- ') || trimmedLine.startsWith('・') || trimmedLine.match(/^[^：]+：/)) {
        return `<li class="mb-2">${trimmedLine.replace(/^- /, '')}</li>`;
      }
      
      // 太字の処理
      const boldText = trimmedLine.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      
      return `<p class="mb-3 leading-relaxed">${boldText}</p>`;
    })
    .join('\n')
    .replace(/(<li[^>]*>.*?<\/li>\s*)+/g, '<ul class="list-disc list-inside mb-4 ml-4">$&</ul>');
}