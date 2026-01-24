export default function StaffPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold font-serif mb-8 text-primary-900">Our Staff</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Principal */}
        <div className="col-span-1 md:col-span-2 lg:col-span-3 flex justify-center mb-8">
           <div className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-primary-600 text-center max-w-md w-full">
              <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">Photo</div>
              <h2 className="text-xl font-bold text-gray-800">Sri M.L. Dhruw</h2>
              <p className="text-primary-600 font-medium">Principal</p>
              <p className="text-sm text-gray-500 mt-2">M.A., B.Ed</p>
           </div>
        </div>

        {/* Teachers */}
        {[1, 2, 3, 4, 5, 6].map((i) => (
           <div key={i} className="bg-white p-6 rounded-xl shadow border border-gray-100 flex items-center">
              <div className="w-16 h-16 bg-gray-200 rounded-full mr-4 flex-shrink-0 flex items-center justify-center text-xs">Photo</div>
              <div>
                <h3 className="font-bold text-gray-800">Teacher Name {i}</h3>
                <p className="text-sm text-primary-600">Senior Teacher</p>
                <p className="text-xs text-gray-500">M.Sc, B.Ed (Mathematics)</p>
              </div>
           </div>
        ))}
      </div>
    </div>
  );
}
