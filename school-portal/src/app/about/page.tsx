export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold font-serif mb-8 text-primary-900">About Our School</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
        <div>
           <p className="text-lg text-gray-700 leading-relaxed mb-6">
             S.E.C. Railway Hr. Sec. School No. 2, located near the Bilaspur Railway Station, has been a beacon of knowledge and character building for decades. Affiliated with the CBSE, we pride ourselves on a curriculum that blends academic rigor with co-curricular excellence.
           </p>
           <p className="text-lg text-gray-700 leading-relaxed">
             Our mission is to nurture young minds into responsible citizens who can contribute positively to society. We believe in inclusive education where every child is given the opportunity to shine.
           </p>
        </div>
        <div className="bg-gray-200 h-80 rounded-xl shadow-lg flex items-center justify-center">
           <span className="text-gray-500 font-semibold">School Building Image</span>
        </div>
      </div>

      <div className="bg-primary-50 p-8 rounded-xl border border-primary-100 mb-16">
        <h2 className="text-2xl font-bold mb-4 text-primary-800">School Information</h2>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
          <li className="flex items-center"><span className="font-semibold w-40">Affiliation No:</span> 3380002</li>
          <li className="flex items-center"><span className="font-semibold w-40">School Code:</span> 19050</li>
          <li className="flex items-center"><span className="font-semibold w-40">Address:</span> Near Bilaspur Railway Station, Budhwari Bazar, Bilaspur – 495004 (C.G.)</li>
          <li className="flex items-center"><span className="font-semibold w-40">Phone:</span> 07752-242506 / 9752876606</li>
          <li className="flex items-center"><span className="font-semibold w-40">Email:</span> pplhmbsp@gmail.com</li>
        </ul>
      </div>

      <div className="mb-16">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Our Vision & Mission</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           <div className="bg-white p-6 shadow-md rounded-lg border-l-4 border-accent">
             <h3 className="text-xl font-bold mb-3">Vision</h3>
             <p className="text-gray-600">To be a center of excellence in education, fostering innovation, integrity, and social responsibility.</p>
           </div>
           <div className="bg-white p-6 shadow-md rounded-lg border-l-4 border-primary-600">
             <h3 className="text-xl font-bold mb-3">Mission</h3>
             <p className="text-gray-600">To provide a safe and stimulating environment where students are encouraged to reach their full potential.</p>
           </div>
        </div>
      </div>
    </div>
  );
}
