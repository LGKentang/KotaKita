
const InstituteCard = ({ institute, onClick } : any) => {
    return (
      <div
        key={institute.id}
        onClick={() => onClick(institute)}
        className="bg-white p-6 mb-6 rounded-lg shadow-lg cursor-pointer hover:bg-gray-50 transition duration-300"
      >
        <div className="flex items-center">
          {institute.logo && <img src={institute.logo} alt={institute.name} className="w-12 h-12 mr-4" />}
          <h2 className="text-2xl font-semibold text-gray-800">{institute.name}</h2>
        </div>
        <p className="text-gray-600">{institute.description}</p>
      </div>
    );
};
export default InstituteCard;