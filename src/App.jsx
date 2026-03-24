import React, { useState } from 'react';
import { 
  MapPin, Phone, Mail, ChevronRight, Star, 
  Compass, User, Clock, Map, 
  Download, TreePine, Droplets,
  Heart, Baby
} from 'lucide-react';

// ==========================================
// INLINE SOCIAL ICONS (Bypasses Lucide missing exports)
// ==========================================
const FacebookIcon = ({ size = 24, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
);
const TwitterIcon = ({ size = 24, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
);
const InstagramIcon = ({ size = 24, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
);
const YoutubeIcon = ({ size = 24, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M2.5 7.1A2.8 2.8 0 0 1 5.3 4.3h13.4a2.8 2.8 0 0 1 2.8 2.8v9.8a2.8 2.8 0 0 1-2.8 2.8H5.3a2.8 2.8 0 0 1-2.8-2.8V7.1z"/><path d="m9.5 15.3 6-3.8-6-3.8v7.6z"/></svg>
);

// ==========================================
// SHARED COMPONENTS (Used on multiple pages)
// ==========================================

const TourCard = ({ image, title, nights, days, price }) => (
  <div className="bg-white rounded-lg overflow-hidden shadow-lg border border-gray-100 flex flex-col">
    <div className="h-48 overflow-hidden relative">
      <img src={image} alt={title} className="w-full h-full object-cover" />
      <div className="absolute top-0 left-0 bg-yellow-400 text-xs font-bold px-3 py-1 rounded-br-lg">
        {nights}N / {days}D
      </div>
    </div>
    <div className="p-5 flex-grow flex flex-col justify-between text-center relative">
        <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-white rounded-full p-2 shadow-md">
            <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center text-white">
                <Compass size={20} />
            </div>
        </div>
      <div className="mt-6">
        <h3 className="font-bold text-lg mb-2">{title}</h3>
        <p className="text-gray-500 text-sm mb-4">Starting from</p>
        <p className="font-bold text-xl text-yellow-600 mb-4">{price}</p>
      </div>
      <button className="bg-gray-900 text-white py-2 px-4 rounded hover:bg-yellow-500 hover:text-black transition-colors text-sm font-semibold">
        VIEW DETAILS
      </button>
    </div>
  </div>
);

const IntlTourCard = ({ image, title, subtitle }) => (
  <div className="relative h-80 rounded-lg overflow-hidden group cursor-pointer">
    <img src={image} alt={title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
    <div className="absolute bottom-0 w-full p-4 text-center">
      <h3 className="text-yellow-400 font-bold text-xl uppercase tracking-wider">{title}</h3>
      <p className="text-white text-sm">{subtitle}</p>
      <button className="mt-3 bg-yellow-400 text-black text-xs font-bold py-1 px-4 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        EXPLORE
      </button>
    </div>
  </div>
);

const TopBar = () => (
  <div className="bg-black text-white text-xs py-1.5 px-4 flex justify-between items-center hidden md:flex">
    <div className="flex gap-4">
      <span className="flex items-center gap-1"><Phone size={12} /> +94 77 123 4567</span>
      <span className="flex items-center gap-1"><Mail size={12} /> info@lumaholidays.com</span>
    </div>
    <div className="flex gap-4">
       <span className="cursor-pointer hover:text-yellow-400 transition">B2B Login</span>
       <span className="cursor-pointer hover:text-yellow-400 transition">Pay Online</span>
    </div>
  </div>
);

const Navbar = ({ currentPage, setCurrentPage }) => (
  <nav className="bg-white sticky top-0 z-50 shadow-sm border-b border-gray-100">
    <div className="max-w-7xl mx-auto flex justify-between items-center h-20">
      {/* Logo Area */}
      <div 
        onClick={() => setCurrentPage('home')}
        className="bg-[#FFCC00] h-full flex items-center justify-center px-8 cursor-pointer"
      >
        <div className="text-black font-black text-2xl tracking-tighter leading-none flex flex-col items-center">
          <span>LUMA HOLIDAYS</span>
          <span className="text-[10px] tracking-widest font-normal uppercase mt-1">Sri Lanka's No.1</span>
        </div>
      </div>
      
      {/* Links */}
      <div className="hidden lg:flex gap-8 font-semibold text-sm">
        <button onClick={() => setCurrentPage('home')} className={`${currentPage === 'home' ? 'text-yellow-500 border-b-2 border-yellow-500 pb-1' : 'hover:text-yellow-500 transition'}`}>HOME</button>
        <button className="hover:text-yellow-500 transition">ABOUT US</button>
        <button className="hover:text-yellow-500 transition">DESTINATIONS</button>
        <button className="hover:text-yellow-500 transition">TOURS</button>
        <button onClick={() => setCurrentPage('asia')} className={`${currentPage === 'asia' ? 'text-yellow-500 border-b-2 border-yellow-500 pb-1' : 'hover:text-yellow-500 transition'}`}>PACKAGES</button>
        <button className="hover:text-yellow-500 transition">CONTACT US</button>
      </div>

      {/* Right Button */}
      <div className="hidden md:flex items-center gap-4 pr-4">
        {currentPage === 'home' ? (
          <button className="bg-black text-white text-sm font-bold py-2 px-6 rounded-md hover:bg-yellow-500 hover:text-black transition">
            ENQUIRE NOW
          </button>
        ) : (
          <div className="flex items-center gap-2 font-bold text-sm bg-yellow-50 px-4 py-2 rounded-md border border-yellow-200">
            <Phone size={16} className="text-yellow-600" />
            <span className="text-yellow-700">+94 77 123 4567</span>
          </div>
        )}
      </div>
    </div>
  </nav>
);

const Footer = () => (
  <>
    <div className="bg-white border-y border-gray-200 py-6">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-gray-100 rounded flex items-center justify-center">
            <Mail className="text-yellow-500" size={24} />
          </div>
          <div>
            <h4 className="font-bold text-gray-800">Get Updates & Offers</h4>
            <p className="text-xs text-gray-500">Subscribe to our newsletter</p>
          </div>
        </div>
        <div className="flex w-full md:w-1/2 max-w-md">
          <input type="email" placeholder="Email Address" className="w-full border border-gray-300 rounded-l px-4 py-3 text-sm focus:outline-none" />
          <button className="bg-black text-white px-6 py-3 rounded-r text-sm font-bold hover:bg-gray-800 transition">SUBSCRIBE</button>
        </div>
      </div>
    </div>

    <footer className="bg-[#1e1e1e] text-gray-300 py-16 text-sm">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-10 border-b border-gray-800 pb-12">
        <div>
          <h4 className="text-white font-serif font-bold text-lg mb-6 pb-2 inline-block relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-1/2 after:h-0.5 after:bg-yellow-500">Corporate Office</h4>
          <div className="space-y-4">
            <p className="opacity-70 leading-relaxed">No 1, Luma Tower,<br/>Main Corporate Road,<br/>Colombo 03, Sri Lanka.<br/>Zip: 00300</p>
            <div className="mt-6">
              <p className="text-gray-500 text-xs uppercase font-bold tracking-wider mb-1">Phone</p>
              <p className="text-white text-base font-semibold">+94 77 123 4567</p>
            </div>
          </div>
        </div>
        <div>
          <h4 className="text-white font-serif font-bold text-lg mb-6 pb-2 inline-block relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-1/2 after:h-0.5 after:bg-yellow-500">Head Office</h4>
          <div className="space-y-4">
            <p className="opacity-70 leading-relaxed">45, Heritage Street,<br/>Central District,<br/>Kandy, Sri Lanka.<br/>Zip: 20000</p>
            <div className="mt-6">
                <p className="text-gray-500 text-xs uppercase font-bold tracking-wider mb-1">Email</p>
                <p className="text-white text-base font-semibold">info@lumaholidays.com</p>
            </div>
          </div>
        </div>
        <div className="md:col-span-2">
          <h4 className="text-white font-serif font-bold text-lg mb-6 pb-2 inline-block relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-1/2 after:h-0.5 after:bg-yellow-500">Our Branches</h4>
          <div className="grid grid-cols-2 gap-x-4 gap-y-3 opacity-70">
            <p className="hover:text-yellow-400 cursor-pointer transition">Colombo</p>
            <p className="hover:text-yellow-400 cursor-pointer transition">Galle</p>
            <p className="hover:text-yellow-400 cursor-pointer transition">Kandy</p>
            <p className="hover:text-yellow-400 cursor-pointer transition">Jaffna</p>
            <p className="hover:text-yellow-400 cursor-pointer transition">Negombo</p>
            <p className="hover:text-yellow-400 cursor-pointer transition">Nuwara Eliya</p>
            <p className="hover:text-yellow-400 cursor-pointer transition">Trincomalee</p>
            <p className="hover:text-yellow-400 cursor-pointer transition">Matara</p>
          </div>
          <div className="mt-10">
            <p className="text-gray-500 text-xs uppercase font-bold tracking-wider mb-3">Connect With Us</p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full border border-gray-600 flex items-center justify-center hover:bg-yellow-500 hover:text-black hover:border-yellow-500 transition"><FacebookIcon size={18} /></a>
              <a href="#" className="w-10 h-10 rounded-full border border-gray-600 flex items-center justify-center hover:bg-yellow-500 hover:text-black hover:border-yellow-500 transition"><TwitterIcon size={18} /></a>
              <a href="#" className="w-10 h-10 rounded-full border border-gray-600 flex items-center justify-center hover:bg-yellow-500 hover:text-black hover:border-yellow-500 transition"><InstagramIcon size={18} /></a>
              <a href="#" className="w-10 h-10 rounded-full border border-gray-600 flex items-center justify-center hover:bg-yellow-500 hover:text-black hover:border-yellow-500 transition"><YoutubeIcon size={18} /></a>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 mt-8 flex flex-col md:flex-row justify-between items-center text-xs opacity-50 gap-4">
        <p>Copyright &copy; {new Date().getFullYear()} Luma Holidays. All Rights Reserved.</p>
        <div className="flex gap-6">
          <a href="#" className="hover:text-white transition">Privacy Policy</a>
          <a href="#" className="hover:text-white transition">Terms & Conditions</a>
          <a href="#" className="hover:text-white transition">Cancellation Policy</a>
        </div>
      </div>
    </footer>
  </>
);

// ==========================================
// HOME PAGE COMPONENT
// ==========================================
const HomePage = ({ setCurrentPage }) => {
  const DestinationCard = ({ image, title, colSpan, rowSpan }) => (
    <div onClick={() => setCurrentPage('asia')} className={`relative group overflow-hidden rounded-lg cursor-pointer ${colSpan} ${rowSpan}`}>
      <img src={image} alt={title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300"></div>
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-yellow-400 px-6 py-2 rounded shadow-md text-black font-bold whitespace-nowrap">
        {title}
      </div>
    </div>
  );

  return (
    <div>
      {/* Hero Section */}
      <div className="relative h-[60vh] md:h-[80vh] flex items-center justify-center">
        <img src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&q=80&w=2074" alt="Hero" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 text-center text-white px-4">
          <p className="text-yellow-400 tracking-[0.3em] text-sm md:text-base font-semibold mb-4 uppercase">Let's Explore</p>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 font-serif italic">travel, worldclass</h1>
          <p className="max-w-2xl mx-auto text-sm md:text-base opacity-90 leading-relaxed">
            Experience the world like never before with Luma Holidays. We craft unforgettable journeys tailored just for you.
          </p>
        </div>
      </div>

      {/* Popular Destinations Grid */}
      <section className="py-16 max-w-7xl mx-auto px-4">
        <h2 className="text-center text-2xl md:text-3xl font-bold mb-10 flex items-center justify-center gap-2">
          <MapPin className="text-yellow-500" /> POPULAR DESTINATIONS
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[250px] md:auto-rows-[290px]">
          <DestinationCard image="https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80&w=800" title="BALI" colSpan="md:col-span-2" rowSpan="md:row-span-2" />
          <DestinationCard image="https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&q=80&w=800" title="THAILAND" colSpan="md:col-span-2" rowSpan="md:row-span-1" />
          <DestinationCard image="https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&q=80&w=800" title="SINGAPORE" colSpan="md:col-span-1" rowSpan="md:row-span-1" />
          <DestinationCard image="https://images.unsplash.com/photo-1504214208698-ea1916a2195a?auto=format&fit=crop&q=80&w=800" title="MALAYSIA" colSpan="md:col-span-1" rowSpan="md:row-span-1" />
          <DestinationCard image="https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&q=80&w=800" title="VIETNAM" colSpan="md:col-span-2" rowSpan="md:row-span-1" />
        </div>
      </section>

      {/* Award Banner */}
      <section className="bg-[#FFCC00] py-12 px-4 relative overflow-hidden">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-8 relative z-10">
          <div className="w-32 md:w-48 flex-shrink-0">
             <img src="https://cdn-icons-png.flaticon.com/512/3112/3112946.png" alt="Trophy" className="w-full drop-shadow-xl" />
          </div>
          <div className="text-center md:text-left text-black">
            <h2 className="text-2xl md:text-4xl font-black mb-4 leading-tight">Luma Holidays been awarded the<br/>Best Travel Company in Sri Lanka</h2>
            <p className="text-sm md:text-base font-medium opacity-80 max-w-3xl">
              We are proud to be recognized for our outstanding service and commitment to providing the best travel experiences.
            </p>
          </div>
        </div>
      </section>

      {/* Popular Tour Packages */}
      <section className="bg-gray-100 py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-2 flex items-center justify-center gap-2">
              <MapPin className="text-yellow-500" /> POPULAR TOUR PACKAGES
            </h2>
            <p className="text-gray-500 text-sm">Explore our top-rated travel packages</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <TourCard 
              image="https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80&w=600"
              title="Beautiful Bali" price="$ 899" nights="4" days="5" 
            />
            <TourCard 
              image="https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&q=80&w=600"
              title="Amazing Thailand" price="$ 650" nights="5" days="6" 
            />
            <TourCard 
              image="https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&q=80&w=600"
              title="Singapore Fling" price="$ 1,150" nights="3" days="4" 
            />
            <TourCard 
              image="https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&q=80&w=600"
              title="Vietnam Vibes" price="$ 950" nights="6" days="7" 
            />
          </div>
        </div>
      </section>

      {/* Trending Destinations */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <h2 className="text-center text-3xl font-bold mb-12 uppercase">Trending Destinations</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <IntlTourCard 
            image="https://images.unsplash.com/photo-1522083111308-4122d2c1cb08?auto=format&fit=crop&q=80&w=600"
            title="DUBAI" subtitle="City of Gold"
          />
          <IntlTourCard 
            image="https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&q=80&w=600"
            title="SINGAPORE" subtitle="Lion City"
          />
          <IntlTourCard 
            image="https://images.unsplash.com/photo-1508009603885-50cf7cbf0d80?auto=format&fit=crop&q=80&w=600"
            title="BALI" subtitle="Island of Gods"
          />
          <IntlTourCard 
            image="https://images.unsplash.com/photo-1513622470522-26cb336d3e3f?auto=format&fit=crop&q=80&w=600"
            title="EUROPE" subtitle="Grand Tour"
          />
        </div>
      </section>

      {/* Reviews */}
      <section className="bg-gray-50 py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-2xl font-bold mb-2">What Our Clients Say</h2>
              <div className="flex items-center gap-2">
                <span className="font-bold text-xl">4.8</span>
                <div className="flex text-yellow-400"><Star size={16} fill="currentColor"/><Star size={16} fill="currentColor"/><Star size={16} fill="currentColor"/><Star size={16} fill="currentColor"/><Star size={16} fill="currentColor"/></div>
                <span className="text-sm text-gray-500">Based on Google Reviews</span>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow border border-gray-100">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center"><User size={20} className="text-gray-500" /></div>
                  <div><h4 className="font-bold text-sm">Rahul Sharma</h4><p className="text-xs text-gray-500">2 weeks ago</p></div>
                </div>
                <div className="flex text-yellow-400"><Star size={14} fill="currentColor" /><Star size={14} fill="currentColor" /><Star size={14} fill="currentColor" /><Star size={14} fill="currentColor" /><Star size={14} fill="currentColor" /></div>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">Our trip to Bali organized by Luma Holidays was absolutely fantastic. Everything from the hotels to the driver was perfectly arranged.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow border border-gray-100">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center"><User size={20} className="text-gray-500" /></div>
                  <div><h4 className="font-bold text-sm">Priya Patel</h4><p className="text-xs text-gray-500">1 month ago</p></div>
                </div>
                <div className="flex text-yellow-400"><Star size={14} fill="currentColor" /><Star size={14} fill="currentColor" /><Star size={14} fill="currentColor" /><Star size={14} fill="currentColor" /><Star size={14} fill="currentColor" /></div>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">Booked a family trip to Dubai. The itinerary was well planned giving us enough time to relax and explore. The local support was excellent.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow border border-gray-100">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center"><User size={20} className="text-gray-500" /></div>
                  <div><h4 className="font-bold text-sm">Vikram Singh</h4><p className="text-xs text-gray-500">3 months ago</p></div>
                </div>
                <div className="flex text-yellow-400"><Star size={14} fill="currentColor" /><Star size={14} fill="currentColor" /><Star size={14} fill="currentColor" /><Star size={14} fill="currentColor" /><Star size={14} fill="currentColor" /></div>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">Highly professional team. They understood our requirements and customized the package perfectly within our budget. A big thumbs up to the team.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

// ==========================================
// ASIA DESTINATION PAGE COMPONENT
// ==========================================
const AsiaPage = ({ setCurrentPage }) => {
  const TourPackageCard = ({ image, title, duration }) => (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100 group cursor-pointer hover:shadow-md transition-shadow">
      <div className="h-48 overflow-hidden relative">
        <img src={image} alt={title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
      </div>
      <div className="p-4">
        <h3 className="font-bold text-gray-800 text-sm mb-3 leading-snug group-hover:text-yellow-600 transition-colors">{title}</h3>
        <div className="flex items-center gap-2 text-yellow-500 text-xs font-semibold">
          <Clock size={14} /><span>{duration}</span>
        </div>
      </div>
    </div>
  );

  const PopularDestinationCard = ({ image, title, className }) => (
    <div className={`relative group overflow-hidden cursor-pointer ${className}`}>
      <img src={image} alt={title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors duration-300"></div>
      <div className="absolute inset-0 flex items-center justify-center">
        <h3 className="text-white text-xl md:text-3xl font-serif font-bold tracking-wide drop-shadow-lg text-center px-4">
          {title} <br/> <span className="text-yellow-400 text-sm md:text-lg font-sans uppercase tracking-widest mt-2 block opacity-0 group-hover:opacity-100 transition-opacity duration-300">Explore</span>
        </h3>
      </div>
    </div>
  );

  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      {/* Breadcrumbs */}
      <div className="text-xs text-gray-500 mb-6 flex items-center gap-2">
        <button onClick={() => setCurrentPage('home')} className="hover:text-yellow-500">Home</button>
        <ChevronRight size={12} />
        <span className="hover:text-yellow-500 cursor-pointer">Packages</span>
        <ChevronRight size={12} />
        <span className="hover:text-yellow-500 cursor-pointer">International Packages</span>
        <ChevronRight size={12} />
        <span className="text-gray-800 font-medium">Asia Tour Packages</span>
      </div>

      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-6">
        <div className="flex items-start gap-6">
          <div className="text-center">
            <div className="text-4xl font-black text-yellow-400 leading-none">50+</div>
            <div className="text-xs font-bold text-gray-500 uppercase tracking-widest mt-1">Tour<br/>Packages</div>
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-2">Asia Tour Packages</h1>
            <div className="flex items-center gap-2 text-sm bg-gray-50 inline-flex px-3 py-1 rounded-full border border-gray-100">
              <span className="font-bold text-gray-800">4.9/5</span>
              <div className="flex text-yellow-400">
                <Star size={14} fill="currentColor" /><Star size={14} fill="currentColor" /><Star size={14} fill="currentColor" /><Star size={14} fill="currentColor" /><Star size={14} fill="currentColor" />
              </div>
              <span className="text-gray-500 ml-1">based on 1250+ reviews</span>
            </div>
          </div>
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <button className="flex-1 md:flex-none bg-yellow-400 text-black px-6 py-2.5 rounded text-sm font-bold shadow-sm hover:bg-yellow-500 transition">Enquire Now</button>
          <button className="flex-1 md:flex-none bg-teal-500 text-white px-6 py-2.5 rounded text-sm font-bold shadow-sm flex items-center justify-center gap-2 hover:bg-teal-600 transition">
            <Download size={16} /> Download Brochure
          </button>
        </div>
      </div>

      {/* Hero Section Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 mb-16 items-start">
        <div className="lg:col-span-2 flex flex-col">
          <div className="rounded-2xl overflow-hidden h-[350px] md:h-[450px] mb-5">
            <img src="https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&q=80&w=1200" alt="Asia Panorama" className="w-full h-full object-cover" />
          </div>
          <div className="flex flex-col sm:flex-row justify-between items-center bg-white gap-4">
            <div className="text-gray-900 text-sm md:text-base">
              <span className="font-bold">One of the Architectural Wonders: </span>
              <span className="font-normal text-gray-600">Marina Bay Sands</span>
            </div>
            <button className="bg-[#FFCC00] text-black px-8 py-3 rounded-md text-sm font-medium hover:bg-yellow-500 transition w-full sm:w-auto shadow-sm">
              View All Packages
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-10">
          <div className="bg-[#fcfcfc] border border-gray-100 rounded-xl p-6 shadow-sm">
            <h3 className="font-serif text-xl text-gray-900 pb-4 border-b border-gray-200 mb-5">Sri Lanka's No.1 Travel Brand</h3>
            <div className="grid grid-cols-2 gap-y-6 gap-x-4">
              <div><p className="font-medium text-gray-900 text-base">Mount Everest</p><p className="text-xs text-gray-500 mt-1">Highest Peak</p></div>
              <div><p className="font-medium text-gray-900 text-base">Yangtze</p><p className="text-xs text-gray-500 mt-1">Longest River</p></div>
              <div><p className="font-medium text-gray-900 text-base">Borneo</p><p className="text-xs text-gray-500 mt-1">Largest Island</p></div>
              <div><p className="font-medium text-gray-900 text-base">Lake Baikal</p><p className="text-xs text-gray-500 mt-1">Deepest Lake</p></div>
            </div>
          </div>
          <div>
            <h3 className="font-serif text-[1.35rem] text-gray-900 mb-6">Essential Tips for Travelling to Asia</h3>
            <div className="space-y-5">
              <div className="flex gap-4 items-center">
                <div className="w-9 h-9 rounded-full bg-[#FFCC00] flex items-center justify-center shrink-0"><Map size={18} className="text-black" /></div>
                <p className="text-sm text-gray-500 leading-snug">The Gobi Desert is the largest desert region in Asia.</p>
              </div>
              <div className="flex gap-4 items-center">
                <div className="w-9 h-9 rounded-full bg-[#FFCC00] flex items-center justify-center shrink-0"><TreePine size={18} className="text-black" /></div>
                <p className="text-sm text-gray-500 leading-snug">Cherry blossoms, known as Sakura, are iconic in Japan.</p>
              </div>
              <div className="flex gap-4 items-center">
                <div className="w-9 h-9 rounded-full bg-[#FFCC00] flex items-center justify-center shrink-0"><Droplets size={18} className="text-black" /></div>
                <p className="text-sm text-gray-500 leading-snug">The Yangtze River is the longest river in Asia.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Visitor Statistics Section */}
      <section className="mb-20">
        <h2 className="text-[1.75rem] font-serif text-[#1e1e24] mb-8">Asia - Visitors Statistics</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-y-10 gap-x-8 items-center bg-white border border-gray-100 rounded-xl p-8 shadow-sm">
          
          {/* Column 1: Map */}
          <div className="flex justify-center md:border-r border-transparent">
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Asia_blank_map.svg/800px-Asia_blank_map.svg.png" 
              alt="Asia Map" 
              className="w-full max-w-[180px]"
              style={{ filter: 'brightness(0) saturate(100%) invert(18%) sepia(19%) saturate(1081%) hue-rotate(205deg) brightness(96%) contrast(89%)' }} 
            />
          </div>

          {/* Column 2: Annually */}
          <div className="md:border-l border-yellow-400 md:pl-8 h-full flex flex-col justify-center">
            <h4 className="text-lg text-gray-800 mb-2 font-medium">Annually</h4>
            <p className="text-4xl md:text-5xl font-bold text-[#1e1e24] mb-6 tracking-tight">10,00,00,000</p>
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-3">
                 <div className="text-yellow-400"><User size={32} className="fill-current" /></div>
                 <div>
                   <p className="text-xs text-gray-500 font-bold uppercase mb-0.5">Male</p>
                   <p className="text-lg font-bold text-gray-800 leading-none">51%</p>
                 </div>
              </div>
              <div className="flex items-center gap-3">
                 <div className="text-[#3b3a4a]"><User size={32} className="fill-current" /></div>
                 <div>
                   <p className="text-xs text-gray-500 font-bold uppercase mb-0.5">Female</p>
                   <p className="text-lg font-bold text-gray-800 leading-none">49%</p>
                 </div>
              </div>
            </div>
          </div>

          {/* Column 3: By Purpose */}
          <div className="md:border-l border-yellow-400 md:pl-8 h-full flex flex-col justify-center">
            <h4 className="text-lg text-gray-800 mb-6 font-medium">By Purpose</h4>
            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-4 mb-3">
                  <div className="text-[#1e1e24]">
                    <Heart size={24} strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className="font-bold text-[#1e1e24] leading-none mb-1">Couples</p>
                    <p className="text-[13px] text-gray-500 leading-none">For Newlywed Vacations</p>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1.5">
                  <div className="bg-yellow-400 h-1.5 rounded-full" style={{ width: '85%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex items-center gap-4 mb-3">
                  <div className="text-[#1e1e24]">
                    <Baby size={24} strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className="font-bold text-[#1e1e24] leading-none mb-1">Family</p>
                    <p className="text-[13px] text-gray-500 leading-none">For Family Vacations</p>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1.5">
                  <div className="bg-yellow-400 h-1.5 rounded-full" style={{ width: '60%' }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Column 4: Top Visitors from Sri Lanka */}
          <div className="md:border-l border-yellow-400 md:pl-8 h-full flex flex-col justify-center">
            <h4 className="text-lg text-gray-800 mb-6 font-medium">Top Visitors from Sri Lanka</h4>
            <ul className="grid grid-cols-2 gap-y-4 gap-x-4 text-[15px] text-[#1e1e24] font-medium">
              <li className="flex items-center gap-2.5"><span className="w-2 h-2 rounded-full bg-yellow-400 shrink-0"></span> Colombo</li>
              <li className="flex items-center gap-2.5"><span className="w-2 h-2 rounded-full bg-yellow-400 shrink-0"></span> Kandy</li>
              <li className="flex items-center gap-2.5"><span className="w-2 h-2 rounded-full bg-yellow-400 shrink-0"></span> Gampaha</li>
              <li className="flex items-center gap-2.5"><span className="w-2 h-2 rounded-full bg-yellow-400 shrink-0"></span> Galle</li>
              <li className="flex items-center gap-2.5"><span className="w-2 h-2 rounded-full bg-yellow-400 shrink-0"></span> Negombo</li>
              <li className="flex items-center gap-2.5"><span className="w-2 h-2 rounded-full bg-yellow-400 shrink-0"></span> Kurunegala</li>
              <li className="flex items-center gap-2.5"><span className="w-2 h-2 rounded-full bg-yellow-400 shrink-0"></span> Jaffna</li>
              <li className="flex items-center gap-2.5"><span className="w-2 h-2 rounded-full bg-yellow-400 shrink-0"></span> Matara</li>
            </ul>
          </div>

        </div>
      </section>

      {/* Tour Packages Grid */}
      <section className="mb-20">
        <h2 className="text-2xl font-serif font-bold text-gray-900 mb-8 border-b border-gray-200 pb-3">View All Asia Tour Packages</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <TourPackageCard image="https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80&w=600" title="Mesmerizing Bali: Beaches & Temples" duration="5 Nights / 6 Days" />
            <TourPackageCard image="https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&q=80&w=600" title="Classic Thailand: Bangkok Getaway" duration="4 Nights / 5 Days" />
            <TourPackageCard image="https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&q=80&w=600" title="Discover the Magic of Singapore" duration="4 Nights / 5 Days" />
            <TourPackageCard image="https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&q=80&w=600" title="Vietnam Odyssey: Hanoi to Ho Chi Minh" duration="6 Nights / 7 Days" />
        </div>
      </section>

      {/* Popular Packages Grid (Masonry) */}
      <section className="mb-20">
        <h2 className="text-2xl font-serif font-bold text-gray-900 mb-8 border-b border-gray-200 pb-3">Popular Packages</h2>
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4 h-auto md:h-[600px]">
            <PopularDestinationCard className="md:col-span-3 md:row-span-1 h-64 md:h-auto rounded-lg" image="https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&q=80&w=800" title="Thailand Tour Packages" />
            <PopularDestinationCard className="md:col-span-3 md:row-span-1 h-64 md:h-auto rounded-lg" image="https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80&w=800" title="Bali Tour Packages" />
            <PopularDestinationCard className="md:col-span-2 md:row-span-1 h-64 md:h-auto rounded-lg" image="https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&q=80&w=800" title="Japan Tour Packages" />
            <PopularDestinationCard className="md:col-span-2 md:row-span-1 h-64 md:h-auto rounded-lg" image="https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&q=80&w=800" title="Vietnam Tour Packages" />
            <PopularDestinationCard className="md:col-span-2 md:row-span-1 h-64 md:h-auto rounded-lg" image="https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&q=80&w=800" title="Singapore Tour Packages" />
        </div>
      </section>

      {/* Form */}
      <section className="bg-gray-50 rounded-2xl border border-gray-100 overflow-hidden shadow-sm relative mb-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 relative z-10">
          <div className="p-12 flex flex-col justify-center items-center text-center lg:border-r border-gray-200">
            <h3 className="text-3xl font-serif font-bold text-gray-900 mb-10">Stay Connected!</h3>
            <div className="mb-10">
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto text-yellow-600 mb-4"><Phone size={24} /></div>
              <p className="text-gray-500 text-sm mb-1 uppercase tracking-widest font-bold">Call Us</p>
              <p className="text-xl font-bold text-gray-800">+94 77 123 4567</p>
            </div>
            <div>
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto text-yellow-600 mb-4"><Mail size={24} /></div>
              <p className="text-gray-500 text-sm mb-1 uppercase tracking-widest font-bold">Email Us</p>
              <p className="text-xl font-bold text-gray-800">info@lumaholidays.com</p>
            </div>
          </div>
          <div className="p-10 lg:p-12 bg-white">
            <h3 className="text-2xl font-serif font-bold text-gray-900 mb-8 text-center">Book Your Dream Tour Today!</h3>
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input type="text" placeholder="Name *" className="w-full border border-gray-300 px-4 py-3 rounded text-sm focus:outline-none focus:border-yellow-400" required />
                <input type="email" placeholder="Email Address *" className="w-full border border-gray-300 px-4 py-3 rounded text-sm focus:outline-none focus:border-yellow-400" required />
              </div>
              <input type="text" placeholder="Tour Destination *" className="w-full border border-gray-300 px-4 py-3 rounded text-sm focus:outline-none focus:border-yellow-400" required />
              <button type="button" className="w-full bg-yellow-400 text-black font-bold text-lg py-4 rounded shadow mt-4 hover:bg-yellow-500 transition">
                SUBMIT
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
};

// ==========================================
// MAIN APP (Handles routing between pages)
// ==========================================
export default function App() {
  // Simple state to toggle between pages. Default is 'home'
  const [currentPage, setCurrentPage] = useState('home');

  return (
    <div className="font-sans text-gray-800 bg-white min-h-screen flex flex-col">
      <TopBar />
      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      
      {/* Render the selected page */}
      <div className="flex-grow">
        {currentPage === 'home' ? (
          <HomePage setCurrentPage={setCurrentPage} />
        ) : (
          <AsiaPage setCurrentPage={setCurrentPage} />
        )}
      </div>

      <Footer />
    </div>
  );
}