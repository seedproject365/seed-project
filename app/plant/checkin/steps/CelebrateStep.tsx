type Props = {
  onBack: () => void;
  onNext: () => void;
};

export default function CelebrateStep({
  onBack,
  onNext,
}: Props) {
  return (
    <div>
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-6">
          🎉 庆祝
        </h1>

        <p className="mb-8">
          这里放庆祝的内容
        </p>

        <div className="flex gap-4">
          <button
            onClick={onBack}
            className="px-6 py-3 rounded-full bg-gray-200"
          >
            返回
          </button>

          <button
            onClick={onNext}
            className="px-6 py-3 rounded-full bg-green-600 text-white"
          >
            完成
          </button>
        </div>
      </div>
    </div>
  );
}