export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center text-center px-6">
      <div>
        <h1 className="text-3xl font-bold gold-gradient mb-2">ページが見つかりません</h1>
        <p className="text-gray-400">指定されたページは存在しないか、移動した可能性があります。</p>
      </div>
    </div>
  )
}

