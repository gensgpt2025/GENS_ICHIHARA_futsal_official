// 対応する画像フォーマットの定義と検証

export const SUPPORTED_IMAGE_FORMATS = {
  JPEG: ['.jpg', '.jpeg'],
  PNG: ['.png'],
  SVG: ['.svg'],
  HEIC: ['.heic', '.heif'],
  // 将来的な拡張用
  WEBP: ['.webp'],
  AVIF: ['.avif']
} as const;

// 全ての対応拡張子をフラット配列で取得
export const getAllSupportedExtensions = (): string[] => {
  return Object.values(SUPPORTED_IMAGE_FORMATS).flat();
};

// ファイル拡張子が対応しているかチェック
export const isSupportedImageFormat = (filename: string): boolean => {
  const extension = getFileExtension(filename);
  return getAllSupportedExtensions().includes(extension);
};

// ファイル拡張子を取得（小文字で返す）
export const getFileExtension = (filename: string): string => {
  const lastDot = filename.lastIndexOf('.');
  return lastDot !== -1 ? filename.slice(lastDot).toLowerCase() : '';
};

// 画像フォーマットタイプを取得
export const getImageFormat = (filename: string): string | null => {
  const extension = getFileExtension(filename);
  
  for (const [format, extensions] of Object.entries(SUPPORTED_IMAGE_FORMATS)) {
    if (extensions.includes(extension)) {
      return format;
    }
  }
  
  return null;
};

// HEIC/HEIF形式かチェック
export const isHEICFormat = (filename: string): boolean => {
  const extension = getFileExtension(filename);
  return SUPPORTED_IMAGE_FORMATS.HEIC.includes(extension);
};

// SVG形式かチェック
export const isSVGFormat = (filename: string): boolean => {
  const extension = getFileExtension(filename);
  return SUPPORTED_IMAGE_FORMATS.SVG.includes(extension);
};

// モバイルで撮影された画像の可能性をチェック
export const isMobileFormat = (filename: string): boolean => {
  return isHEICFormat(filename);
};

// 対応フォーマットの説明を取得
export const getFormatDescription = (filename: string): string => {
  const format = getImageFormat(filename);
  
  switch (format) {
    case 'JPEG':
      return '高品質写真（圧縮あり）';
    case 'PNG':
      return '高品質画像（透明背景対応）';
    case 'SVG':
      return 'ベクター画像（拡大可能）';
    case 'HEIC':
      return 'iPhone/iPad画像';
    case 'WEBP':
      return '次世代画像（高効率）';
    case 'AVIF':
      return '最新画像フォーマット';
    default:
      return '未対応フォーマット';
  }
};