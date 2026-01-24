import { FileText, Download } from 'lucide-react';

export default function PublicDisclosurePage() {
  const documents = [
    { name: "Affiliation Certificate", date: "2024-01-01" },
    { name: "Building Safety Certificate", date: "2023-12-15" },
    { name: "Fire Safety Certificate", date: "2023-11-20" },
    { name: "Water & Sanitation Certificate", date: "2024-02-10" },
    { name: "Fee Structure", date: "2024-03-01" },
    { name: "Academic Calendar", date: "2024-03-01" },
    { name: "School Management Committee", date: "2023-08-05" },
    { name: "Parents Teachers Association", date: "2023-08-10" },
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold font-serif mb-8 text-primary-900">Mandatory Public Disclosure</h1>
      <p className="mb-8 text-gray-600">
        In compliance with CBSE norms, the following documents are made available for public viewing.
      </p>

      <div className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
        <ul className="divide-y divide-gray-200">
           {documents.map((doc, idx) => (
             <li key={idx} className="p-4 flex items-center justify-between hover:bg-gray-50">
               <div className="flex items-center">
                 <div className="bg-red-50 text-red-600 p-2 rounded-lg mr-4">
                   <FileText className="w-5 h-5" />
                 </div>
                 <div>
                   <p className="font-semibold text-gray-800">{doc.name}</p>
                   <p className="text-xs text-gray-500">Last updated: {doc.date}</p>
                 </div>
               </div>
               <button className="flex items-center text-primary-600 hover:text-primary-800 text-sm font-medium">
                 <Download className="w-4 h-4 mr-2" /> Download
               </button>
             </li>
           ))}
        </ul>
      </div>
    </div>
  );
}
