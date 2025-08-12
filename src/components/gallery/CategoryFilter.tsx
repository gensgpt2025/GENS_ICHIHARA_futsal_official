'use client'

import React from 'react'
import { PhotoCategory, VideoCategory, GalleryFilter } from '@/types/gallery'
import { Filter, X } from 'lucide-react'

interface CategoryFilterProps {
  type: 'photo' | 'video'
  categories: Record<string, string>
  currentFilter: GalleryFilter
  availableYears: string[]
  onFilterChange: (filter: GalleryFilter) => void
  onClearFilter: () => void
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  type,
  categories,
  currentFilter,
  availableYears,
  onFilterChange,
  onClearFilter
}) => {
  const handleCategoryChange = (category: PhotoCategory | VideoCategory | '') => {
    onFilterChange({
      ...currentFilter,
      category: category || undefined
    })
  }

  const handleYearChange = (year: string) => {
    onFilterChange({
      ...currentFilter,
      year: year || undefined
    })
  }

  const hasActiveFilter = currentFilter.category || currentFilter.year

  return (
    <div className="bg-gray-900 rounded-lg p-4 mb-6">
      <div className="flex flex-col sm:flex-row sm:flex-wrap items-start sm:items-center gap-4">
        {/* フィルターアイコン */}
        <div className="flex items-center space-x-2">
          <Filter size={18} className="text-yellow-400" />
          <span className="text-white font-medium">フィルター</span>
        </div>

        {/* モバイル用: フィルター横並び */}
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          {/* カテゴリフィルター */}
          <div className="flex items-center space-x-2">
            <span className="text-gray-300 text-sm min-w-0 whitespace-nowrap">カテゴリ:</span>
            <select
              value={currentFilter.category || ''}
              onChange={(e) => handleCategoryChange(e.target.value as PhotoCategory | VideoCategory)}
              className="bg-gray-800 text-white border border-gray-600 rounded px-3 py-2 text-sm focus:border-yellow-400 focus:outline-none flex-1 sm:flex-none min-w-[120px]"
            >
              <option value="">すべて</option>
              {Object.entries(categories).map(([key, label]) => (
                <option key={key} value={key}>
                  {label}
                </option>
              ))}
            </select>
          </div>

          {/* 年フィルター */}
          <div className="flex items-center space-x-2">
            <span className="text-gray-300 text-sm min-w-0 whitespace-nowrap">年:</span>
            <select
              value={currentFilter.year || ''}
              onChange={(e) => handleYearChange(e.target.value)}
              className="bg-gray-800 text-white border border-gray-600 rounded px-3 py-2 text-sm focus:border-yellow-400 focus:outline-none flex-1 sm:flex-none min-w-[100px]"
            >
              <option value="">すべて</option>
              {availableYears.map(year => (
                <option key={year} value={year}>
                  {year}年
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* クリアボタン */}
        {hasActiveFilter && (
          <button
            onClick={onClearFilter}
            className="flex items-center space-x-1 text-gray-400 hover:text-white transition-colors text-sm sm:ml-auto"
          >
            <X size={16} />
            <span>クリア</span>
          </button>
        )}
      </div>

      {/* アクティブフィルター表示 */}
      {hasActiveFilter && (
        <div className="mt-3 pt-3 border-t border-gray-700">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-gray-400 text-sm">適用中:</span>
            {currentFilter.category && (
              <span className="bg-yellow-400 text-black px-2 py-1 rounded text-xs font-medium">
                {categories[currentFilter.category]}
              </span>
            )}
            {currentFilter.year && (
              <span className="bg-yellow-400 text-black px-2 py-1 rounded text-xs font-medium">
                {currentFilter.year}年
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default CategoryFilter