export default function AdmissionPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold font-serif mb-8 text-primary-900">Admissions</h1>

      <div className="bg-white p-8 rounded-xl shadow-md border border-gray-200 mb-12">
         <h2 className="text-2xl font-bold mb-4">Admission Procedure</h2>
         <p className="text-gray-700 mb-4">
           Admissions are open for Class I to IX and Class XI (Science/Commerce). Application forms can be obtained from the school office during working hours or downloaded below.
         </p>
         <ul className="list-disc pl-5 space-y-2 text-gray-700 mb-6">
           <li>Forms are available from 1st March to 31st March.</li>
           <li>Entrance test for Class IX will be held on 15th April.</li>
           <li>Admissions are subject to availability of seats.</li>
         </ul>
         <button className="bg-primary-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-primary-700 transition-colors">
           Download Admission Form
         </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-bold mb-4">Documents Required</h2>
          <ul className="bg-gray-50 p-6 rounded-lg border border-gray-200 space-y-3 text-sm">
             <li className="flex items-center">✓ Birth Certificate (Original + Copy)</li>
             <li className="flex items-center">✓ Transfer Certificate (Original)</li>
             <li className="flex items-center">✓ Marksheet of previous class</li>
             <li className="flex items-center">✓ 3 Passport size photographs</li>
             <li className="flex items-center">✓ Aadhar Card copy</li>
          </ul>
        </div>
        <div>
           <h2 className="text-2xl font-bold mb-4">Age Criteria</h2>
           <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 text-sm">
             <p className="mb-2"><span className="font-bold">Class I:</span> 5 to 7 years as on 31st March.</p>
             <p className="mb-2"><span className="font-bold">Class II:</span> 6 to 8 years.</p>
             <p className="text-gray-500 italic mt-4">Note: Age relaxation is not applicable.</p>
           </div>
        </div>
      </div>
    </div>
  );
}
