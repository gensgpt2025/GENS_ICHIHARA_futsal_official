// 対応する動画フォーマットの定義と検証

export const SUPPORTED_VIDEO_FORMATS = {
  MP4: ['.mp4'],
  WEBM: ['.webm'],
  MOV: ['.mov'],
  // 将来的な拡張用
  M4V: ['.m4v'],
  AVI: ['.avi']
} as const;

// 全ての対応拡張子をフラット配列で取得
export const getAllSupportedVideoExtensions = (): string[] => {
  return Object.values(SUPPORTED_VIDEO_FORMATS).flat();
};

// ファイル拡張子が対応しているかチェック
export const isSupportedVideoFormat = (filename: string): boolean => {
  const extension = getVideoFileExtension(filename);
  return getAllSupportedVideoExtensions().includes(extension);
};

// ファイル拡張子を取得（小文字で返す）
export const getVideoFileExtension = (filename: string): string => {
  const lastDot = filename.lastIndexOf('.');
  return lastDot !== -1 ? filename.slice(lastDot).toLowerCase() : '';
};

// 動画フォーマットタイプを取得
export const getVideoFormat = (filename: string): string | null => {
  const extension = getVideoFileExtension(filename);
  
  for (const [format, extensions] of Object.entries(SUPPORTED_VIDEO_FORMATS)) {
    if ((extensions as readonly string[]).includes(extension)) {
      return format;
    }
  }
  
  return null;
};

// MIMEタイプを取得
export const getVideoMimeType = (filename: string): string => {
  const extension = getVideoFileExtension(filename);
  
  switch (extension) {
    case '.mp4':
    case '.m4v':
      return 'video/mp4';
    case '.webm':
      return 'video/webm';
    case '.mov':
      return 'video/quicktime';
    case '.avi':
      return 'video/x-msvideo';
    default:
      return 'video/mp4'; // フォールバック
  }
};

// ブラウザサポートチェック
export const getBrowserVideoSupport = () => {
  if (typeof window === 'undefined') return {};
  
  const video = document.createElement('video');
  
  return {
    mp4: !!(video.canPlayType && video.canPlayType('video/mp4').replace(/no/, '')),
    webm: !!(video.canPlayType && video.canPlayType('video/webm').replace(/no/, '')),
    mov: !!(video.canPlayType && video.canPlayType('video/quicktime').replace(/no/, '')),
  };
};

// 最適なフォーマットを選択
export const getOptimalVideoFormat = (availableFormats: string[]): string => {
  const support = getBrowserVideoSupport();
  
  // 優先順位: WebM > MP4 > MOV
  if (availableFormats.includes('webm') && support.webm) return 'webm';
  if (availableFormats.includes('mp4') && support.mp4) return 'mp4';
  if (availableFormats.includes('mov') && support.mov) return 'mov';
  
  // フォールバック
  return availableFormats[0] || 'mp4';
};

// 動画フォーマットの説明を取得
export const getVideoFormatDescription = (filename: string): string => {
  const format = getVideoFormat(filename);
  
  switch (format) {
    case 'MP4':
      return '標準動画（高互換性）';
    case 'WEBM':
      return 'Web最適化動画（軽量）';
    case 'MOV':
      return 'Apple動画（高品質）';
    case 'M4V':
      return 'iTunes動画（Apple）';
    case 'AVI':
      return 'レガシー動画（重い）';
    default:
      return '未対応フォーマット';
  }
};

// 複数フォーマット用のsourceタグ生成
export const generateVideoSources = (baseFilename: string): Array<{src: string, type: string}> => {
  // 実際のファイル拡張子を確認して、そのファイルのみを返す
  const extension = getVideoFileExtension(baseFilename);
  const mimeType = getVideoMimeType(baseFilename);
  
  return [
    { src: baseFilename, type: mimeType }
  ];
};