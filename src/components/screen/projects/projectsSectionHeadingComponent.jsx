const ProjectsSectionHeadingComponent = ({ hasAnimated }) => {
  return (
    <div className="text-center mb-16 sm:mb-20 md:mb-24">
      <div
        className={`transition-all duration-1000 ease-out ${
          hasAnimated ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 sm:mb-8">
          Our <span className="text-orange-500">Projects</span>
        </h2>
        <p className="text-lg sm:text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
          Showcasing our expertise across diverse sectors - from infrastructure
          and commercial developments to marine projects and renewable energy
          installations.
        </p>
      </div>
    </div>
  );
};

export default ProjectsSectionHeadingComponent;
