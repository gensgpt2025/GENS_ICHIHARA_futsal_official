// HEIC/HEIF画像の処理とフォールバック

export const isHEICSupported = (): boolean => {
  // ブラウザでHEIC対応をチェック
  if (typeof window === 'undefined') return false;
  
  // Safariは基本的にHEICサポート
  const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
  
  // iOS WebViewもサポート
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
  
  return isSafari || isIOS;
};

export const getHEICFallbackPath = (originalPath: string): string => {
  // HEIC画像のフォールバック（JPEG変換版）を返す
  if (originalPath.toLowerCase().endsWith('.heic') || originalPath.toLowerCase().endsWith('.heif')) {
    // .heicを.jpgに置換してフォールバック画像のパスを生成
    return originalPath.replace(/\.(heic|heif)$/i, '_converted.jpg');
  }
  return originalPath;
};

export const shouldUseHEICFallback = (filename: string): boolean => {
  const isHEIC = filename.toLowerCase().endsWith('.heic') || filename.toLowerCase().endsWith('.heif');
  return isHEIC && !isHEICSupported();
};

// HEIC変換の説明テキスト
export const getHEICMessage = (): string => {
  if (isHEICSupported()) {
    return 'HEIC形式をサポートしています';
  }
  return 'HEIC形式は自動的にJPEGに変換されます';
};

// 実際の画像URLを決定（HEIC対応考慮）
export const resolveImageUrl = (originalUrl: string, filename: string): string => {
  if (shouldUseHEICFallback(filename)) {
    return getHEICFallbackPath(originalUrl);
  }
  return originalUrl;
};