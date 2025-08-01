import { Link } from "react-router-dom";
import { HiOutlineLocationMarker } from "react-icons/hi";

const UniversityCard = ({ university }) => (
  <div className="px-2 py-4">
    <Link
      to={`/universities/${university.slug}/overview`}
      className="block bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden group"
    >
      <div className="relative">
        <img
          src={university.image}
          alt={university.name}
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {university.logo && (
          <img
            src={university.logo}
            alt={`${university.name} logo`}
            className="absolute top-3 right-3 w-14 h-14 object-contain bg-white/90 backdrop-blur-sm rounded-full border-2 border-white shadow-lg p-1"
          />
        )}
      </div>
      <div className="p-4">
        <h3
          className="text-lg font-bold text-gray-800 truncate"
          title={university.name}
        >
          {university.name}
        </h3>
        <div className="flex items-center text-gray-500 mt-2">
          <HiOutlineLocationMarker className="w-5 h-5 mr-1 flex-shrink-0" />
          <p className="text-sm truncate">{university.country.name}</p>
        </div>
      </div>
    </Link>
  </div>
);

export default UniversityCard;
