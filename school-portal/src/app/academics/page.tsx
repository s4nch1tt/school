export default function AcademicsPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold font-serif mb-8 text-primary-900">Academics</h1>

      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">Academic Calendar</h2>
        <div className="bg-white shadow overflow-hidden rounded-lg border border-gray-200">
           <table className="min-w-full divide-y divide-gray-200">
             <thead className="bg-gray-50">
               <tr>
                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Month</th>
                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Activities / Events</th>
               </tr>
             </thead>
             <tbody className="bg-white divide-y divide-gray-200">
               <tr>
                 <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">April</td>
                 <td className="px-6 py-4 text-sm text-gray-500">New Session Begins, House Formation</td>
               </tr>
               <tr>
                 <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">May</td>
                 <td className="px-6 py-4 text-sm text-gray-500">Unit Test I, Summer Vacation begins</td>
               </tr>
               <tr>
                 <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">July</td>
                 <td className="px-6 py-4 text-sm text-gray-500">School Reopens, Van Mahotsav</td>
               </tr>
               {/* Add more rows */}
             </tbody>
           </table>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">Recent Results</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           <div className="bg-green-50 p-6 rounded-lg border border-green-200">
             <h3 className="text-xl font-bold text-green-800 mb-2">Class X (2023-24)</h3>
             <p className="text-green-700 mb-4">100% Pass Percentage. Top scorer secured 98.2%.</p>
             <button className="text-sm font-bold text-green-900 hover:underline">Download Toppers List</button>
           </div>
           <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
             <h3 className="text-xl font-bold text-blue-800 mb-2">Class XII (2023-24)</h3>
             <p className="text-blue-700 mb-4">Science Stream Topper: 97.5%. Commerce Stream Topper: 96%.</p>
             <button className="text-sm font-bold text-blue-900 hover:underline">Download Toppers List</button>
           </div>
        </div>
      </div>
    </div>
  );
}
