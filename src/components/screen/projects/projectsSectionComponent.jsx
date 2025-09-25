import {
  MapPin,
  Calendar,
  CheckCircle,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const ProjectsSectionComponent = ({ projectsData, visibleCards }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12">
      {projectsData.map((project, index) => (
        <div
          key={index}
          className={`group transition-all duration-700 ease-out transform ${
            visibleCards.includes(index)
              ? "opacity-100 translate-y-0 scale-100"
              : "opacity-0 translate-y-12 scale-95"
          }`}
          style={{ transitionDelay: `${index * 150}ms` }}
        >
          <div className="bg-white dark:bg-gray-800 hover:cursor-pointer rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-200 dark:border-gray-700 group-hover:border-orange-300 dark:group-hover:border-orange-600 group-hover:-translate-y-2 h-full">
            {/* Project Header */}
            <div
              className={`bg-gradient-to-r ${project.color} p-6 sm:p-8 text-white relative overflow-hidden`}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-4xl sm:text-5xl group-hover:scale-110 transition-transform duration-300">
                    <Avatar className="w-10 h-10 border-4 border-white shadow-lg">
                      <AvatarImage
                        src={project.image}
                        alt={project.client}
                        className="object-cover bg-white"
                      />
                      <AvatarFallback className="bg-white/20 text-white font-bold text-xl">
                        {project.client.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      project.status === "Completed"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {project.status}
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold mb-2 leading-tight">
                  {project.title}
                </h3>
                <div className="flex items-center text-sm opacity-90 mb-2">
                  <MapPin className="w-4 h-4 mr-1" />
                  {project.location}
                </div>
                <p className="text-sm opacity-90">Client: {project.client}</p>
              </div>
            </div>

            {/* Project Details */}
            <div className="p-6 sm:p-8 space-y-6">

              {/* Description */}
              <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base leading-relaxed">
                {project.description}
              </p>

              {/* Services */}
              <div>
                <h4 className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">
                  Services Provided:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {project.services.map((service, serviceIndex) => (
                    <span
                      key={serviceIndex}
                      className="px-3 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300 text-xs font-medium rounded-full"
                    >
                      {service}
                    </span>
                  ))}
                </div>
              </div>

              {/* Key Highlights */}
              <div>
                <h4 className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-3">
                  Key Highlights:
                </h4>
                <div className="space-y-2">
                  {project.highlights
                    .slice(0, 2)
                    .map((highlight, highlightIndex) => (
                      <div
                        key={highlightIndex}
                        className="flex items-center text-sm text-gray-600 dark:text-gray-300"
                      >
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                        {highlight}
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProjectsSectionComponent;
