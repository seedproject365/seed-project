'use client';

type Props = {
  onBack: () => void;
  onNext: () => void;
};

export default function PlanAStep({
  onBack,
  onNext,
}: Props) {
  return (
    <div className="max-w-2xl mx-auto">

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-[#5B4636] mb-3">
          🌱 计划 A
        </h1>

        <p className="text-[#8B7B6F]">
          找一个与你有共同目标，
          或值得帮助的对象。
        </p>
      </div>

      {/* Image */}
      <div className="overflow-hidden rounded-[28px] shadow-sm mb-8">
        <img
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuCY9hpML8fbdVw30ynu3lqrmb1BsRVZmgxTJ2YKbi4p7A5m0GaefeK0YJpkwz_0NHZgaBVj5v4AZjOVLPZMmtJKScn9mZcuts03342JOmUewio-4oRFhVSohm9pFvxs1ScyqvpUAB6paRZHXCVB9gpUDRVvKFqjkzCsBE0bYlSmpX_-Cve1XwuD6t5mBSf10Ki9YWIahdApg0rnpiCsYxEflYE78eag1WVXKlr0jcmqKT5SArsXyIyL"
          alt="Plan A"
          className="w-full h-64 object-cover"
        />
      </div>

      {/* Textarea */}
      <div className="bg-[#F8F4EC] rounded-[24px] p-6 mb-6">

        <label className="text-[#8FAE8B] font-semibold block mb-3">
          帮助对象
        </label>

        <textarea
          placeholder="例如：父母、伙伴、客户、朋友……"
          className="w-full bg-transparent resize-none outline-none text-2xl text-[#5B4636]"
          rows={2}
        />

      </div>

      {/* Tip */}
      <div className="bg-[#F8F4EC] rounded-[20px] p-5 border border-[#E8DDCC] mb-8">

        <p className="text-[#8B7B6F]">
          💡 先帮助别人得到他们想要的，
          你的种子就开始成长。
        </p>

      </div>

      {/* Chips */}
      <div className="flex flex-wrap gap-3 mb-10">

        <button className="px-4 py-2 rounded-full bg-[#ECE4D8]">
          家庭成员
        </button>

        <button className="px-4 py-2 rounded-full bg-[#ECE4D8]">
          事业伙伴
        </button>

        <button className="px-4 py-2 rounded-full bg-[#ECE4D8]">
          社会弱势
        </button>

        <button className="px-4 py-2 rounded-full bg-[#ECE4D8]">
          亲密朋友
        </button>

      </div>

      {/* Bottom Buttons */}
      <div className="flex justify-between">

        <button
          onClick={onBack}
          className="px-6 py-4 rounded-full border border-[#8FAE8B]"
        >
          ← 返回
        </button>

        <button
          onClick={onNext}
          className="bg-[#5C4033] text-white px-8 py-4 rounded-full hover:bg-[#4B352A]"
        >
          🌱 下一步
        </button>

      </div>

    </div>
  );
}