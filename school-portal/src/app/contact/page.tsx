import { Mail, Phone, MapPin, Clock } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold font-serif mb-8 text-primary-900">Contact Us</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
         {/* Contact Info */}
         <div className="space-y-8">
            <div className="flex items-start">
               <div className="bg-primary-100 p-3 rounded-full mr-4 text-primary-600">
                 <MapPin className="w-6 h-6" />
               </div>
               <div>
                 <h3 className="font-bold text-lg mb-1">Address</h3>
                 <p className="text-gray-600">Near Bilaspur Railway Station, Budhwari Bazar,<br />Bilaspur – 495004 (C.G.)</p>
               </div>
            </div>

            <div className="flex items-start">
               <div className="bg-primary-100 p-3 rounded-full mr-4 text-primary-600">
                 <Phone className="w-6 h-6" />
               </div>
               <div>
                 <h3 className="font-bold text-lg mb-1">Phone</h3>
                 <p className="text-gray-600">07752-242506 / 9752876606</p>
               </div>
            </div>

            <div className="flex items-start">
               <div className="bg-primary-100 p-3 rounded-full mr-4 text-primary-600">
                 <Mail className="w-6 h-6" />
               </div>
               <div>
                 <h3 className="font-bold text-lg mb-1">Email</h3>
                 <p className="text-gray-600">pplhmbsp@gmail.com</p>
               </div>
            </div>

             <div className="flex items-start">
               <div className="bg-primary-100 p-3 rounded-full mr-4 text-primary-600">
                 <Clock className="w-6 h-6" />
               </div>
               <div>
                 <h3 className="font-bold text-lg mb-1">Office Hours</h3>
                 <p className="text-gray-600">Monday - Saturday: 8:00 AM - 2:00 PM</p>
               </div>
            </div>
         </div>

         {/* Form */}
         <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
            <h3 className="text-xl font-bold mb-6">Send us a message</h3>
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <div>
                   <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                   <input type="text" className="w-full border-gray-300 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 border p-2" />
                 </div>
                 <div>
                   <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                   <input type="email" className="w-full border-gray-300 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 border p-2" />
                 </div>
              </div>
              <div>
                 <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                 <input type="text" className="w-full border-gray-300 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 border p-2" />
              </div>
              <div>
                 <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                 <textarea rows={4} className="w-full border-gray-300 rounded-lg shadow-sm focus:border-primary-500 focus:ring-primary-500 border p-2"></textarea>
              </div>
              <button type="button" className="w-full bg-primary-600 text-white py-2 rounded-lg font-bold hover:bg-primary-700">Send Message</button>
            </form>
         </div>
      </div>
    </div>
  );
}
