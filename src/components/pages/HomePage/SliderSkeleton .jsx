const SliderSkeleton = () => (
  <div className="flex flex-nowrap gap-4 md:gap-6 w-full mt-8 pb-4">
    {Array.from({ length: 5 }).map((_, index) => (
      <div
        key={index}
        className="flex-none w-[48%] md:w-[30%] lg:w-1/5 h-64 rounded-lg bg-gray-200/50 animate-pulse"
      />
    ))}
  </div>
);

export default SliderSkeleton;
