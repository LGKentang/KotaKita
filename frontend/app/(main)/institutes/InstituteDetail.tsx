 const InstituteDetail = ({ institute , onBack } : any) => {
    return (
      <div className="bg-white p-8 rounded-lg shadow-lg w-4/5 md:w-2/3">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          {institute.logo && <img src={institute.logo} className="w-12 h-12 inline mr-2" />}
          {institute.name}
        </h2>
        <p className="text-gray-700 mb-6">{institute.description}</p>
  
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Projects</h3>
        <ul className="space-y-4">
          {institute.projects.map((project : any) => (
            <li key={project.id} className="bg-gray-50 p-4 rounded-lg shadow-sm">
              <h4 className="font-bold text-gray-800">{project.name}</h4>
              <p className="text-gray-600">{project.description}</p>
            </li>
          ))}
        </ul>
  
        <button onClick={onBack} className="mt-6 text-blue-500 hover:underline">
          Back to Institutes
        </button>
      </div>
    );
  };

export default InstituteDetail;