import React, { useState } from 'react';
import { 
  MapPin, Phone, Mail, ChevronRight, Star, 
  Compass, User, Clock, Map, 
  Download, TreePine, Droplets,
  Heart, Baby
} from 'lucide-react';

// ==========================================
// CENTRALIZED TOUR DATA (The "Database")
// ==========================================
const packagesData = {
  // --- Standard Asia Packages ---
  'bali': {
    title: "Mesmerizing Bali Escapade",
    country: "Bali",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80&w=2000",
    duration: "5 Nights / 6 Days",
    locations: "Ubud, Kuta, Nusa Penida",
    price: "LKR 265,000",
    overview: "Experience the magic of Bali with our carefully curated 5-night package. From the lush cultural heartland of Ubud to the pristine beaches of Nusa Penida and the thrilling water sports of Tanjung Benoa, this tour offers the perfect blend of adventure, culture, and relaxation. Immerse yourself in the Island of the Gods with expert guides, comfortable stays, and seamless transfers.",
    itinerary: [
      { day: 1, title: "Arrival in Bali & Check-in", desc: "Welcome to the Island of the Gods! Upon your arrival at Ngurah Rai International Airport, our representative will greet you and transfer you to your hotel. Spend the rest of the day at leisure." },
      { day: 2, title: "Full Day Kintamani Volcano & Ubud Tour", desc: "After breakfast, head to Kintamani to enjoy breathtaking views of the active Mount Batur volcano and its crater lake. En route, visit the Tegalalang Rice Terraces and a traditional coffee plantation." },
      { day: 3, title: "Water Sports at Tanjung Benoa & Uluwatu Sunset", desc: "Get ready for an adrenaline rush at Tanjung Benoa beach with included water sports (Banana Boat, Parasailing, Jet Ski). Proceed to Uluwatu Temple for sunset." },
      { day: 4, title: "Nusa Penida Island Tour", desc: "Take a fast boat from Sanur to the beautiful island of Nusa Penida. Explore Kelingking Beach, Broken Beach, and Angel's Billabong." },
      { day: 5, title: "Leisure Day / Optional Tanah Lot Tour", desc: "Enjoy a free day to shop in Seminyak, relax at beach clubs, or indulge in a traditional Balinese Spa treatment." },
      { day: 6, title: "Departure from Bali", desc: "Enjoy your final breakfast at the hotel before our driver transfers you to the airport." }
    ],
    inclusions: ['5 Nights accommodation in 4-star hotel', 'Daily breakfast at the hotel', 'Return Airport Transfers (Private)', 'Full day Kintamani & Ubud tour', 'Nusa Penida Island tour with lunch', 'Water sports package', 'English speaking driver/guide'],
    exclusions: ['International Airfare', 'Visa on Arrival fees', 'Travel Insurance', 'Meals not mentioned', 'Personal expenses']
  },
  'thailand': {
    title: "Amazing Thailand & Pattaya Getaway",
    country: "Thailand",
    image: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&q=80&w=2000",
    duration: "5 Nights / 6 Days",
    locations: "Bangkok, Pattaya, Coral Island",
    price: "LKR 195,000",
    overview: "Discover the vibrant contrast of Thailand! Experience the neon-lit bustling streets, majestic grand temples, and floating markets of Bangkok, seamlessly paired with the sun-kissed beaches and vibrant nightlife of Pattaya. This package offers the ultimate balance of culture, shopping, and tropical relaxation.",
    itinerary: [
      { day: 1, title: "Arrival in Bangkok & Transfer to Pattaya", desc: "Sawasdee! Arrive at Suvarnabhumi Airport, where you'll be greeted and driven to the coastal city of Pattaya. Check into your hotel and enjoy the evening at leisure." },
      { day: 2, title: "Coral Island Tour with Lunch", desc: "Hop on a speedboat to the beautiful Coral Island (Koh Larn). Enjoy snorkeling, parasailing, or simply relax on the white sands. Enjoy a traditional Thai lunch." },
      { day: 3, title: "Pattaya to Bangkok & Temple Tour", desc: "After breakfast, check out and drive back to Bangkok. En route, enjoy a half-day city tour visiting the Golden Buddha and Marble Temple." },
      { day: 4, title: "Safari World & Marine Park", desc: "Spend a full day at Safari World. Drive through the open zoo to see wild animals close up, and enjoy thrilling shows at the Marine Park." },
      { day: 5, title: "Shopping & Leisure", desc: "Enjoy a free day for shopping at MBK Center, Siam Paragon, or the famous Chatuchak Weekend Market." },
      { day: 6, title: "Departure from Bangkok", desc: "After breakfast, complete your check-out process and head to the airport for your flight back home." }
    ],
    inclusions: ['2 Nights in Pattaya', '3 Nights in Bangkok', 'Daily breakfast', 'Coral Island Tour with Lunch', 'Bangkok Temple Tour', 'Safari World tickets', 'Airport Transfers'],
    exclusions: ['International Airfare', 'National Park fees', 'Travel Insurance', 'Optional tours']
  },
  'singapore': {
    title: "Singapore Fling & Sentosa Magic",
    country: "Singapore",
    image: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&q=80&w=2000",
    duration: "3 Nights / 4 Days",
    locations: "Singapore City, Sentosa Island",
    price: "LKR 345,000",
    overview: "Step into the future with our Singapore Fling package. Explore the breathtaking Gardens by the Bay, ride the thrilling attractions at Universal Studios, and experience the unmatched cleanliness and culinary diversity of this spectacular island city-state.",
    itinerary: [
      { day: 1, title: "Arrival & Night Safari", desc: "Arrive at Changi Airport. In the evening, experience the world's first nocturnal zoo at the Singapore Night Safari." },
      { day: 2, title: "Half Day City Tour & Gardens by the Bay", desc: "See the Merlion, Marina Bay Sands, and Chinatown. In the evening, explore the magnificent Cloud Forest and Flower Dome at Gardens by the Bay." },
      { day: 3, title: "Sentosa Island Tour", desc: "Take a cable car to Sentosa Island. Enjoy Madame Tussauds, S.E.A. Aquarium, and the spectacular Wings of Time night show." },
      { day: 4, title: "Departure", desc: "Enjoy some last-minute shopping at Orchard Road or the Jewel at Changi Airport before your flight home." }
    ],
    inclusions: ['3 Nights in a 4-star central hotel', 'Daily breakfast', 'Night Safari tickets', 'Sentosa Island Pass', 'Gardens by the Bay entry', 'Return airport transfers'],
    exclusions: ['Airfare', 'Visa fees', 'Lunch & Dinner', 'Personal expenses']
  },
  'vietnam': {
    title: "Vietnam Odyssey: Hanoi to Ho Chi Minh",
    country: "Vietnam",
    image: "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&q=80&w=2000",
    duration: "6 Nights / 7 Days",
    locations: "Hanoi, Halong Bay, Ho Chi Minh City",
    price: "LKR 285,000",
    overview: "Journey from the historical north to the bustling south of Vietnam. Cruise through the emerald waters of Halong Bay, explore the ancient streets of Hanoi, and discover the vibrant energy and Cu Chi tunnels near Ho Chi Minh City.",
    itinerary: [
      { day: 1, title: "Arrival in Hanoi", desc: "Arrive at Noi Bai International Airport. Transfer to your hotel. Evening at leisure to explore the Old Quarter." },
      { day: 2, title: "Hanoi City Tour", desc: "Visit the Ho Chi Minh Mausoleum, One Pillar Pagoda, Temple of Literature, and enjoy a traditional Water Puppet Show." },
      { day: 3, title: "Halong Bay Overnight Cruise", desc: "Drive to Halong Bay and board a traditional junk boat. Cruise among the limestone karsts, visit caves, and enjoy a seafood dinner onboard." },
      { day: 4, title: "Halong Bay to Ho Chi Minh City", desc: "Enjoy morning Tai Chi on the deck. Disembark and transfer to Hanoi airport for a short flight to Ho Chi Minh City." },
      { day: 5, title: "Cu Chi Tunnels & City Tour", desc: "Explore the fascinating Cu Chi Tunnels network. Afternoon visit to the War Remnants Museum, Notre Dame Cathedral, and Ben Thanh Market." },
      { day: 6, title: "Mekong Delta Excursion", desc: "Take a boat trip through the Mekong Delta, visit traditional villages, and taste local fruits and honey tea." },
      { day: 7, title: "Departure", desc: "Transfer to Tan Son Nhat International Airport for your departure flight." }
    ],
    inclusions: ['Accommodation with breakfast', 'Overnight Halong Bay Cruise', 'Domestic flight (Hanoi to HCM)', 'Tours with English speaking guide', 'Airport transfers'],
    exclusions: ['International Airfare', 'Visa stamping fees', 'Travel Insurance']
  },

  // --- Sri Lanka Standard Packages ---
  'sl-classic': {
    title: "Classic Sri Lanka Explorer",
    country: "Sri Lanka",
    image: "https://images.unsplash.com/photo-1588598198321-16d1ba25eb92?auto=format&fit=crop&q=80&w=2000",
    duration: "7 Nights / 8 Days",
    locations: "Colombo, Kandy, Nuwara Eliya, Yala, Bentota",
    price: "LKR 180,000",
    overview: "Embark on an unforgettable journey through the teardrop island. This classic tour takes you from the bustling streets of Colombo to the sacred temples of Kandy, the rolling tea estates of Nuwara Eliya, the wild jungles of Yala, and finally, the golden beaches of Bentota.",
    itinerary: [
      { day: 1, title: "Arrival in Colombo", desc: "Welcome to Sri Lanka! Transfer to your hotel in Colombo. Enjoy an evening city tour including the Gangaramaya Temple and Galle Face Green." },
      { day: 2, title: "Pinnawala & Kandy", desc: "Drive to Kandy, stopping at the Pinnawala Elephant Orphanage. In the evening, visit the Temple of the Sacred Tooth Relic." },
      { day: 3, title: "Nuwara Eliya Tea Gardens", desc: "Take a scenic drive to Nuwara Eliya. Visit a working tea factory, stroll through Victoria Park, and enjoy the cool climate." },
      { day: 4, title: "Ella Train Ride", desc: "Experience one of the world's most beautiful train journeys from Nanu Oya to Ella. Visit the Nine Arches Bridge." },
      { day: 5, title: "Yala National Park Safari", desc: "Drive down to Yala. Embark on an exciting afternoon jeep safari to spot leopards, elephants, and sloth bears." },
      { day: 6, title: "Bentota Beach Relaxation", desc: "Travel along the south coast to Bentota. Spend the afternoon relaxing on the golden sandy beaches." },
      { day: 7, title: "Madu River Safari", desc: "Enjoy a boat ride on the Madu River and visit a local turtle conservation project." },
      { day: 8, title: "Departure", desc: "Transfer to Bandaranaike International Airport for your flight home." }
    ],
    inclusions: ['7 Nights accommodation in 4-star hotels', 'Daily Breakfast and Dinner', 'AC Vehicle with Chauffeur Guide', 'Train tickets to Ella', 'Yala Jeep Safari'],
    exclusions: ['Entrance fees to sites', 'Lunch', 'Camera permits', 'Personal expenses']
  },
  'sl-wildlife': {
    title: "Ultimate Wildlife Safari",
    country: "Sri Lanka",
    image: "https://images.unsplash.com/photo-1614088820819-216e9c403eb6?auto=format&fit=crop&q=80&w=2000",
    duration: "5 Nights / 6 Days",
    locations: "Wilpattu, Minneriya, Udawalawe, Yala",
    price: "LKR 165,000",
    overview: "A dream itinerary for nature lovers and wildlife photographers. Journey through Sri Lanka's most famous national parks to spot the elusive Sri Lankan leopard, massive herds of wild elephants, sloth bears, and diverse birdlife.",
    itinerary: [
      { day: 1, title: "Wilpattu National Park", desc: "Transfer from the airport to Wilpattu. Enjoy an afternoon safari in Sri Lanka's largest national park, known for its natural lakes." },
      { day: 2, title: "Transfer to Sigiriya", desc: "Morning at leisure. Travel to the dry zone and check into a jungle lodge near Sigiriya." },
      { day: 3, title: "Minneriya Elephant Gathering", desc: "Spend the afternoon in Minneriya National Park, witnessing the spectacular gathering of wild elephants around the reservoir." },
      { day: 4, title: "Udawalawe Safari", desc: "Travel south to Udawalawe. Take a safari renowned for guaranteed elephant sightings and visit the Elephant Transit Home." },
      { day: 5, title: "Yala Leopard Safari", desc: "Head to Yala National Park for a full-day safari adventure, tracking the highest density of leopards in the world." },
      { day: 6, title: "Departure", desc: "Return to Colombo or the airport for departure." }
    ],
    inclusions: ['5 Nights accommodation in Jungle Lodges', 'Breakfast and Dinner', '4x4 Jeep Safaris in 4 Parks', 'Naturalist Guide'],
    exclusions: ['Park Entrance Fees', 'Lunch', 'Camera equipment rentals']
  },

  // ==========================================
  // HONEYMOON PACKAGES (The 6 New Packages)
  // ==========================================
  'hm-maldives': {
    title: "Maldives Overwater Romance",
    region: "Honeymoon",
    regionPage: "honeymoon",
    country: "Maldives",
    isHoneymoon: true,
    image: "https://images.unsplash.com/photo-1512100356356-de1b84283e18?auto=format&fit=crop&q=80&w=2000",
    duration: "4 Nights / 5 Days",
    locations: "Male, Private Atoll",
    price: "LKR 450,000",
    overview: "Experience unparalleled luxury in a private overwater villa surrounded by crystal-clear turquoise waters. This quintessential honeymoon package is designed for pure romance, featuring private dining, world-class spa treatments, and vibrant coral reefs right at your doorstep.",
    itinerary: [
      { day: 1, title: "Arrival & Speedboat Transfer", desc: "Arrive at Male International Airport. Our representative will assist you with a scenic speedboat or seaplane transfer to your luxury island resort. Enjoy a romantic welcome with champagne." },
      { day: 2, title: "Overwater Villa & Snorkeling", desc: "Wake up to panoramic ocean views. Spend the morning snorkeling directly from your private deck. In the evening, enjoy a private beach dinner under the stars." },
      { day: 3, title: "Couples Spa & Sunset Cruise", desc: "Indulge in a signature 90-minute couples Balinese massage at the resort's overwater spa. Later, embark on a sunset Dolphin watching cruise." },
      { day: 4, title: "Leisure & Island Hopping", desc: "A free day to relax. Take a kayak out, try stand-up paddleboarding, or book an optional island-hopping excursion to meet local Maldivians." },
      { day: 5, title: "Departure", desc: "Enjoy a final floating breakfast in your private pool before transferring back to Male Airport for your onward flight." }
    ],
    inclusions: ['4 Nights in an Overwater Villa', 'All-Inclusive Meal Plan (Breakfast, Lunch, Dinner)', 'Return Speedboat/Seaplane Transfers', 'One Romantic Candlelight Dinner', 'Sunset Dolphin Cruise'],
    exclusions: ['International Airfare', 'Green Tax (if applicable)', 'Premium alcoholic beverages', 'Motorized water sports']
  },
  'hm-bali': {
    title: "Bali Private Pool Villa Honeymoon",
    region: "Honeymoon",
    regionPage: "honeymoon",
    country: "Bali",
    isHoneymoon: true,
    image: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&q=80&w=2000",
    duration: "6 Nights / 7 Days",
    locations: "Ubud, Seminyak",
    price: "LKR 310,000",
    overview: "The ultimate Balinese romantic getaway. Split your time between the lush, jungle-fringed serenity of a private pool villa in Ubud, and the chic, sunset-drenched beach clubs of Seminyak. Specially curated for newlyweds.",
    itinerary: [
      { day: 1, title: "Welcome to Ubud", desc: "Arrive in Bali. Transfer to your luxury jungle resort in Ubud. Your private villa will be decorated with a romantic floral bed setup." },
      { day: 2, title: "Ubud Swing & Tegalalang", desc: "Experience the famous Bali Jungle Swing together. Visit the stunning Tegalalang Rice Terraces and enjoy a private organic coffee tasting." },
      { day: 3, title: "Floating Breakfast & Spa", desc: "Start the day with an iconic floating breakfast in your private pool. In the afternoon, enjoy a traditional 2-hour couples flower bath and spa treatment." },
      { day: 4, title: "Transfer to Seminyak & Tanah Lot", desc: "Check out and head towards the coast. En route, visit the iconic Tanah Lot temple to watch the sunset over the ocean. Check into your Seminyak villa." },
      { day: 5, title: "Beach Clubs & Sunset Dinners", desc: "Spend the day lounging at famous beach clubs like Potato Head or Ku De Ta. In the evening, enjoy a romantic seafood dinner on Jimbaran Beach." },
      { day: 6, title: "Leisure & Shopping", desc: "A free day to explore the boutique shops, artisan cafes, and vibrant streets of Seminyak hand-in-hand." },
      { day: 7, title: "Departure", desc: "Check out at noon and transfer to Ngurah Rai Airport with beautiful memories." }
    ],
    inclusions: ['3 Nights Ubud Pool Villa', '3 Nights Seminyak Villa', 'Daily Breakfast (1 Floating Breakfast)', 'Couples Spa Treatment', 'Private AC Vehicle transfers', 'Romantic Bed Decoration'],
    exclusions: ['Airfare', 'Visa on Arrival', 'Lunch & Dinner (except Jimbaran)', 'Personal shopping']
  },
  'hm-phuket': {
    title: "Phuket & Krabi Romantic Escape",
    region: "Honeymoon",
    regionPage: "honeymoon",
    country: "Thailand",
    isHoneymoon: true,
    image: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&q=80&w=2000",
    duration: "5 Nights / 6 Days",
    locations: "Phuket, Phi Phi Islands, Krabi",
    price: "LKR 265,000",
    overview: "Sail through the emerald waters of the Andaman Sea on this spectacular Thai honeymoon. Experience the vibrant nightlife of Phuket, the stunning limestone karsts of Phi Phi, and the secluded romantic beaches of Krabi.",
    itinerary: [
      { day: 1, title: "Arrival in Phuket", desc: "Arrive at Phuket Airport. Transfer to your beachfront resort. Enjoy a relaxing evening walk along Patong or Karon beach." },
      { day: 2, title: "Phi Phi Island Speedboat Tour", desc: "Take a thrilling speedboat ride to the Phi Phi Islands. Snorkel in crystal clear waters, visit Maya Bay, and enjoy a buffet lunch on the island." },
      { day: 3, title: "Transfer to Krabi", desc: "Check out and take a scenic ferry or speedboat across the bay to the stunning coastal province of Krabi. Check into your romantic resort." },
      { day: 4, title: "Krabi 4-Islands Tour", desc: "Embark on the famous 4-Islands tour via traditional longtail boat. Visit Phra Nang Cave, Tup Island, Chicken Island, and Poda Island. Enjoy a picnic lunch." },
      { day: 5, title: "Romantic Dinner & Leisure", desc: "Spend the day relaxing by the pool or visiting the local night markets. In the evening, enjoy a special romantic dinner arranged by your hotel." },
      { day: 6, title: "Departure from Krabi", desc: "Enjoy breakfast before taking a private transfer to Krabi International Airport for your flight home." }
    ],
    inclusions: ['2 Nights Phuket', '3 Nights Krabi', 'Daily Breakfast', 'Phi Phi Speedboat Tour', 'Krabi 4-Island Tour', 'Inter-city Ferry Tickets', 'Airport Transfers'],
    exclusions: ['Airfare', 'National Park Fees (payable directly)', 'Travel Insurance', 'Meals not specified']
  },
  'hm-langkawi': {
    title: "Langkawi Island Paradise Honeymoon",
    region: "Honeymoon",
    regionPage: "honeymoon",
    country: "Malaysia",
    isHoneymoon: true,
    image: "https://images.unsplash.com/photo-1596422846543-75c6fc197f0a?auto=format&fit=crop&q=80&w=2000",
    duration: "4 Nights / 5 Days",
    locations: "Langkawi Island",
    price: "LKR 210,000",
    overview: "Known as the Jewel of Kedah, Langkawi is a serene archipelago offering pristine beaches, lush mangroves, and duty-free shopping. This peaceful itinerary is tailored for couples wanting to escape the crowds and connect with nature.",
    itinerary: [
      { day: 1, title: "Arrival in Langkawi", desc: "Welcome to Malaysia! Transfer to your romantic beach resort in Langkawi. The evening is yours to relax by the Andaman Sea." },
      { day: 2, title: "Cable Car & Sky Bridge", desc: "Take the steepest cable car ride in the world up Mount Machinchang. Walk hand-in-hand across the breathtaking curved Sky Bridge hanging above the jungle." },
      { day: 3, title: "Mangrove Safari & Sunset Cruise", desc: "Morning boat safari through the Kilim Karst Geoforest Park to see eagles and limestone caves. In the late afternoon, board a yacht for a spectacular Sunset Dinner Cruise with a BBQ." },
      { day: 4, title: "Island Hopping & Duty-Free Shopping", desc: "Take a half-day island hopping tour to the Lake of the Pregnant Maiden. Spend the afternoon duty-free shopping in Kuah Town." },
      { day: 5, title: "Departure", desc: "Enjoy your final Malaysian breakfast before transferring to Langkawi International Airport." }
    ],
    inclusions: ['4 Nights in a 4-star Beach Resort', 'Daily Breakfast', 'Sunset Yacht Dinner Cruise', 'Cable Car & Sky Bridge Tickets', 'Mangrove Boat Tour', 'Private Transfers'],
    exclusions: ['Airfare', 'Malaysian Tourism Tax', 'Personal expenses', 'Lunch']
  },
  'hm-vietnam': {
    title: "Vietnam Romantic Getaway",
    region: "Honeymoon",
    regionPage: "honeymoon",
    country: "Vietnam",
    isHoneymoon: true,
    image: "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&q=80&w=2000",
    duration: "6 Nights / 7 Days",
    locations: "Hanoi, Halong Bay, Hoi An",
    price: "LKR 295,000",
    overview: "A journey of timeless charm. Cruise the emerald waters of Halong Bay under the stars, and stroll through the lantern-lit, ancient streets of Hoi An. This itinerary blends profound culture with deep romantic experiences.",
    itinerary: [
      { day: 1, title: "Arrival in Hanoi", desc: "Arrive in the historic capital of Hanoi. Transfer to a boutique hotel in the Old Quarter. Enjoy a welcome dinner at a fine-dining Vietnamese restaurant." },
      { day: 2, title: "Halong Bay Overnight Cruise", desc: "Drive to Halong Bay. Board a luxury traditional junk boat. Enjoy a romantic seafood lunch as you cruise past limestone islands. Sunset cocktails on the top deck." },
      { day: 3, title: "Fly to Da Nang & Hoi An", desc: "Wake up early for Tai Chi on the deck. Disembark and transfer straight to the airport for a short flight to Da Nang. Drive to the ancient town of Hoi An." },
      { day: 4, title: "Hoi An Lanterns & Boat Ride", desc: "Explore the yellow-walled, UNESCO-listed streets of Hoi An. In the evening, take a private rowboat ride on the Hoai River and release a paper lantern for good luck." },
      { day: 5, title: "Ba Na Hills & Golden Bridge", desc: "Take a day trip to the misty Ba Na Hills. Ride the cable car and walk across the famous Golden Bridge held up by giant stone hands." },
      { day: 6, title: "Couples Cooking Class", desc: "Visit a local market to buy fresh ingredients, then take a private boat to a cooking school where you'll learn to make authentic Vietnamese dishes together." },
      { day: 7, title: "Departure", desc: "Transfer to Da Nang International Airport for your flight back home." }
    ],
    inclusions: ['2 Nights Hanoi, 1 Night Cruise, 3 Nights Hoi An', 'Domestic Flight (Hanoi-Da Nang)', 'Luxury Halong Bay Cruise with all meals', 'Ba Na Hills Tickets', 'Cooking Class', 'Private Guides & Transfers'],
    exclusions: ['International Airfare', 'Visa fees', 'Travel Insurance']
  },
  'hm-srilanka': {
    title: "Sri Lanka South Coast Romance",
    region: "Honeymoon",
    regionPage: "honeymoon",
    country: "Sri Lanka",
    isHoneymoon: true,
    image: "https://images.unsplash.com/photo-1544365558-35aa4afcf11f?auto=format&fit=crop&q=80&w=2000",
    duration: "6 Nights / 7 Days",
    locations: "Bentota, Mirissa, Galle",
    price: "LKR 210,000",
    overview: "Celebrate your love on the pristine golden shores of Sri Lanka's south coast. Enjoy luxury beachfront resorts, romantic candlelight dinners, sunset cruises, and the laid-back tropical vibe perfect for newlyweds.",
    itinerary: [
      { day: 1, title: "Arrival & Bentota Relaxation", desc: "Receive a romantic welcome at the airport. Transfer to a luxury resort in Bentota. Spend the day unwinding by the sea." },
      { day: 2, title: "Madu River & Couples Spa", desc: "Enjoy a private boat safari on the Madu River. Return to the hotel for a relaxing 60-minute couples Ayurvedic spa treatment." },
      { day: 3, title: "Transfer to Mirissa", desc: "Drive down to the palm-fringed beaches of Mirissa. Enjoy an evening walking along the beach and dining at seafood shacks." },
      { day: 4, title: "Whale Watching & Sunset", desc: "Early morning private boat tour to spot Blue Whales and Dolphins. Watch the sunset from Coconut Tree Hill." },
      { day: 5, title: "Galle Fort Heritage Walk", desc: "Visit the historic Galle Dutch Fort. Walk hand-in-hand through the cobbled streets, boutique shops, and cafes." },
      { day: 6, title: "Leisure Beach Day", desc: "A completely free day to swim, sunbathe, and enjoy a special candlelight dinner arranged by the beach." },
      { day: 7, title: "Departure", desc: "Check out and enjoy a comfortable transfer back to the airport." }
    ],
    inclusions: ['6 Nights in 4/5-star Beach Resorts', 'Breakfast and 1 Romantic Dinner', 'Couples Spa Treatment', 'Whale Watching Tour', 'Private Car Transfer'],
    exclusions: ['Other meals', 'Personal shopping', 'Additional activities']
  }
};

// ==========================================
// DYNAMIC DESTINATION DATA
// ==========================================
const destinationData = {
  'bali': {
    name: 'Bali', packagesCount: '25+',
    heroImage: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80&w=1200',
    wonder: 'Uluwatu Temple',
    highlights: [{ label: 'Mount Agung', desc: 'Highest Peak' }, { label: 'Ayung', desc: 'Longest River' }, { label: 'Nusa Penida', desc: 'Largest Island' }, { label: 'Lake Batur', desc: 'Largest Lake' }],
    tips: ['Nyepi (Day of Silence) is strictly observed; the airport closes for 24 hours.', 'Dress modestly when visiting temples; sarongs are usually required.', 'Tap water is not safe to drink; always stick to bottled water.'],
    stats: { annually: '6,200,000+', male: '48%', female: '52%', couples: '85%', family: '55%', topVisitors: ['Colombo', 'Gampaha', 'Kandy', 'Negombo', 'Galle', 'Kurunegala', 'Matara', 'Jaffna'] }
  },
  'thailand': {
    name: 'Thailand', packagesCount: '40+',
    heroImage: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&q=80&w=1200',
    wonder: 'The Grand Palace',
    highlights: [{ label: 'Doi Inthanon', desc: 'Highest Peak' }, { label: 'Chao Phraya', desc: 'Major River' }, { label: 'Phuket', desc: 'Largest Island' }, { label: 'Songkhla Lake', desc: 'Largest Lake' }],
    tips: ['Never touch anyone on the head, as it is considered sacred.', 'Always negotiate prices before getting into a Tuk-Tuk.', 'Look for street food stalls where locals are eating for the best quality.'],
    stats: { annually: '39,800,000+', male: '55%', female: '45%', couples: '70%', family: '50%', topVisitors: ['Colombo', 'Gampaha', 'Kandy', 'Kurunegala', 'Negombo', 'Galle', 'Matara', 'Jaffna'] }
  },
  'singapore': {
    name: 'Singapore', packagesCount: '15+',
    heroImage: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&q=80&w=1200',
    wonder: 'Marina Bay Sands',
    highlights: [{ label: 'Bukit Timah', desc: 'Highest Point' }, { label: 'Kallang River', desc: 'Longest River' }, { label: 'Pulau Tekong', desc: 'Largest Island' }, { label: 'Marina Reservoir', desc: 'Largest Reservoir' }],
    tips: ['Chewing gum is banned and heavily fined.', 'The MRT (subway) is the most efficient way to get around.', 'Eat at Hawker Centres for cheap, authentic local food.'],
    stats: { annually: '19,100,000+', male: '51%', female: '49%', couples: '60%', family: '85%', topVisitors: ['Colombo', 'Kandy', 'Gampaha', 'Galle', 'Negombo', 'Kurunegala', 'Jaffna', 'Matara'] }
  },
  'vietnam': {
    name: 'Vietnam', packagesCount: '20+',
    heroImage: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&q=80&w=1200',
    wonder: 'Halong Bay',
    highlights: [{ label: 'Fansipan', desc: 'Highest Peak' }, { label: 'Mekong', desc: 'Longest River' }, { label: 'Phu Quoc', desc: 'Largest Island' }, { label: 'Ba Be Lake', desc: 'Largest Lake' }],
    tips: ['When crossing the street, walk slowly and steadily.', 'Download the "Grab" app for safe and cheap rides.', 'Try Pho and Banh Mi from street vendors.'],
    stats: { annually: '18,000,000+', male: '47%', female: '53%', couples: '65%', family: '45%', topVisitors: ['Colombo', 'Kandy', 'Negombo', 'Galle', 'Gampaha', 'Matara', 'Jaffna', 'Kurunegala'] }
  },
  'sri-lanka': {
    name: 'Sri Lanka', packagesCount: '10+',
    heroImage: 'https://images.unsplash.com/photo-1588598198321-16d1ba25eb92?auto=format&fit=crop&q=80&w=1200',
    wonder: 'Sigiriya Rock Fortress',
    highlights: [{ label: 'Pidurutalagala', desc: 'Highest Peak' }, { label: 'Mahaweli', desc: 'Longest River' }, { label: 'Mannar', desc: 'Major Island' }, { label: 'Kala Wewa', desc: 'Largest Reservoir' }],
    tips: ['Always remove shoes and hats before entering Buddhist temples.', 'Do not turn your back to a Buddha statue for a photograph.', 'The train ride from Kandy to Ella is a must-do scenic journey.'],
    stats: { annually: '2,000,000+', male: '45%', female: '55%', couples: '70%', family: '65%', topVisitors: ['India', 'UK', 'Russia', 'Germany', 'France', 'Australia', 'China', 'USA'] }
  }
};

// ==========================================
// INLINE ICONS (Bypasses Lucide missing exports)
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
const CheckIcon = ({ size = 20, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}><polyline points="20 6 9 17 4 12"/></svg>
);
const XIcon = ({ size = 20, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
);

// ==========================================
// SHARED COMPONENTS (Used on multiple pages)
// ==========================================

const MegaMenuSection = ({ title, items, highlight, onTitleClick, onItemClick }) => (
  <div className="mb-6">
    <h4 
      onClick={onTitleClick}
      className={`font-bold text-[15px] mb-3 ${highlight ? 'bg-[#FFCC00] py-1.5 px-3 -mx-3 text-black' : 'border-b border-gray-200 pb-1 text-gray-900'} ${onTitleClick ? 'cursor-pointer hover:bg-yellow-500 transition-colors' : ''}`}
    >
      {title}
    </h4>
    <ul className="space-y-1.5">
      {items.map(item => (
        <li 
          key={item} 
          onClick={() => onItemClick && onItemClick(item.toLowerCase().replace(/\s+/g, '-'))}
          className="flex items-center gap-2.5 text-[13px] text-gray-600 hover:text-black cursor-pointer group/item transition-colors"
        >
          <span className="w-[5px] h-[5px] bg-gray-400 rounded-full group-hover/item:bg-[#FFCC00] transition-colors shrink-0"></span> {item}
        </li>
      ))}
    </ul>
  </div>
);

const TourCard = ({ image, title, nights, days, price, onClick }) => (
  <div onClick={onClick} className={`bg-white rounded-lg overflow-hidden shadow-lg border border-gray-100 flex flex-col ${onClick ? 'cursor-pointer hover:shadow-xl transition-shadow' : ''}`}>
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

const IntlTourCard = ({ image, title, subtitle, onClick }) => (
  <div onClick={onClick} className={`relative h-80 rounded-lg overflow-hidden group ${onClick ? 'cursor-pointer' : ''}`}>
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

const TourPackageCard = ({ image, title, duration, onClick }) => (
  <div onClick={onClick} className={`bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100 group transition-shadow ${onClick ? 'cursor-pointer hover:shadow-md' : ''}`}>
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

const PopularDestinationCard = ({ image, title, className, onClick }) => (
  <div onClick={onClick} className={`relative group overflow-hidden ${className} ${onClick ? 'cursor-pointer' : ''}`}>
    <img src={image} alt={title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors duration-300"></div>
    <div className="absolute inset-0 flex items-center justify-center">
      <h3 className="text-white text-xl md:text-3xl font-serif font-bold tracking-wide drop-shadow-lg text-center px-4">
        {title} <br/> <span className="text-yellow-400 text-sm md:text-lg font-sans uppercase tracking-widest mt-2 block opacity-0 group-hover:opacity-100 transition-opacity duration-300">Explore</span>
      </h3>
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

const Navbar = ({ currentPage, setCurrentPage }) => {
  const seAsia = ['Bali', 'Cambodia', 'Indonesia', 'Malaysia', 'Philippines', 'Singapore', 'Thailand', 'Vietnam'];
  const eastAsia = ['China', 'Hong Kong', 'Japan', 'South Korea', 'Taiwan', 'Kazakhstan', 'Uzbekistan'];
  const island = ['Madagascar', 'Maldives', 'Mauritius', 'Reunion', 'Sri Lanka'];
  const honeymoon = ['Maldives', 'Bali', 'Phuket', 'Langkawi', 'Krabi', 'Thailand', 'Sri Lanka', 'Singapore', 'Malaysia', 'Koh Samui'];

  const isPackagePage = currentPage === 'asia' || currentPage.startsWith('dest-') || currentPage.startsWith('pkg-');

  return (
    <nav className="bg-white sticky top-0 z-50 shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto flex justify-between items-center h-20 relative">
        {/* Logo Area */}
        <div 
          onClick={() => setCurrentPage('home')}
          className="bg-[#FFCC00] h-full flex items-center justify-center px-6 lg:px-8 cursor-pointer shrink-0"
        >
          <div className="text-black font-black text-xl lg:text-2xl tracking-tighter leading-none flex flex-col items-center">
            <span>LUMA HOLIDAYS</span>
            <span className="text-[9px] lg:text-[10px] tracking-widest font-normal uppercase mt-1">Sri Lanka's No.1</span>
          </div>
        </div>
        
        {/* Navigation Links with Mega Menu */}
        <div className="hidden lg:flex font-bold text-[12px] xl:text-[13px] tracking-wide h-full items-center text-gray-800 ml-auto">
          <button onClick={() => setCurrentPage('home')} className="px-2 xl:px-4 h-full hover:text-yellow-500 transition uppercase">HOME</button>
          <button className="px-2 xl:px-4 h-full hover:text-yellow-500 transition uppercase">COMPANY</button>
          <button className="px-2 xl:px-4 h-full hover:text-yellow-500 transition uppercase">GROUP TOURS</button>
          
          {/* Packages Dropdown Trigger */}
          <div className="group h-full flex items-center static">
            <button 
              className={`px-4 xl:px-6 h-full flex items-center transition-colors uppercase ${isPackagePage && currentPage !== 'honeymoon' ? 'bg-[#FFCC00] text-black' : 'group-hover:bg-[#FFCC00] group-hover:text-black'}`}
            >
              PACKAGES
            </button>

            {/* Mega Menu Container */}
            <div className="absolute top-20 left-0 w-full bg-white shadow-2xl border-t-2 border-yellow-400 p-8 rounded-b-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 grid grid-cols-3 gap-6 xl:gap-8 cursor-default z-50 max-h-[85vh] overflow-y-auto text-left">
              
              {/* Column 1 */}
              <div>
                <MegaMenuSection 
                  title="Southeast Asia" 
                  items={seAsia} 
                  onItemClick={(id) => setCurrentPage(`dest-${id}`)}
                />
              </div>

              {/* Column 2 */}
              <div>
                <MegaMenuSection 
                  title="East & Central Asia" 
                  items={eastAsia} 
                  onItemClick={(id) => setCurrentPage(`dest-${id}`)}
                />
                <div className="mt-6">
                  <MegaMenuSection 
                    title="Indian Ocean" 
                    items={island} 
                    onItemClick={(id) => setCurrentPage(`dest-${id}`)}
                  />
                </div>
              </div>

              {/* Column 3 */}
              <div className="flex flex-col h-full">
                <MegaMenuSection 
                  title="Honeymoon (Asia)" 
                  items={honeymoon} 
                  onItemClick={(id) => setCurrentPage(`dest-${id}`)}
                />
                <div className="mt-auto pt-6 pb-2">
                  <button 
                    onClick={() => setCurrentPage('dest-bali')}
                    className="w-full bg-[#111] text-[#FFCC00] font-bold py-3 px-4 rounded-sm text-sm hover:bg-black transition-colors shadow-md"
                  >
                    View All Packages
                  </button>
                </div>
              </div>

            </div>
          </div>

          <button 
            onClick={() => setCurrentPage('dest-sri-lanka')} 
            className={`px-2 xl:px-4 h-full transition uppercase ${currentPage === 'dest-sri-lanka' ? 'text-yellow-500 border-b-2 border-yellow-500 pb-1' : 'hover:text-yellow-500'}`}
          >
            SRI LANKA
          </button>
          <button 
            onClick={() => setCurrentPage('honeymoon')}
            className={`px-2 xl:px-4 h-full transition uppercase ${currentPage === 'honeymoon' ? 'text-yellow-500 border-b-2 border-yellow-500 pb-1' : 'hover:text-yellow-500'}`}
          >
            HONEYMOON
          </button>
          <button className="px-2 xl:px-4 h-full hover:text-yellow-500 transition uppercase">WEDDING</button>
          <button className="px-2 xl:px-4 h-full hover:text-yellow-500 transition uppercase">CONTACT</button>
        </div>
      </div>
    </nav>
  );
};

const Footer = ({ setCurrentPage }) => (
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
          <h4 className="text-white font-serif font-bold text-lg mb-6 pb-2 inline-block relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-1/2 after:h-0.5 after:bg-yellow-500">Top Destinations</h4>
          <div className="grid grid-cols-2 gap-x-4 gap-y-3 opacity-70">
            <p onClick={() => setCurrentPage('dest-bali')} className="hover:text-yellow-400 cursor-pointer transition">Bali Packages</p>
            <p onClick={() => setCurrentPage('dest-thailand')} className="hover:text-yellow-400 cursor-pointer transition">Thailand Packages</p>
            <p onClick={() => setCurrentPage('dest-singapore')} className="hover:text-yellow-400 cursor-pointer transition">Singapore Packages</p>
            <p onClick={() => setCurrentPage('dest-vietnam')} className="hover:text-yellow-400 cursor-pointer transition">Vietnam Packages</p>
            <p onClick={() => setCurrentPage('dest-maldives')} className="hover:text-yellow-400 cursor-pointer transition">Maldives Packages</p>
            <p onClick={() => setCurrentPage('dest-japan')} className="hover:text-yellow-400 cursor-pointer transition">Japan Packages</p>
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
// DYNAMIC PACKAGE DETAIL PAGE
// ==========================================
const PackageDetailPage = ({ setCurrentPage, packageId }) => {
  const pkg = packagesData[packageId] || packagesData['bali'];

  return (
    <main className="bg-gray-50 pb-16">
      {/* Hero Section */}
      <div className="relative h-[50vh] md:h-[60vh] overflow-hidden">
        <img src={pkg.image} alt={pkg.country} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
        <div className="absolute bottom-0 w-full max-w-7xl mx-auto px-4 pb-12 left-0 right-0">
          <div className="text-xs text-yellow-400 mb-4 flex items-center gap-2 font-bold tracking-widest uppercase">
            <button onClick={() => setCurrentPage('home')} className="hover:text-white transition">Home</button>
            <ChevronRight size={12} className="text-white" />
            <button onClick={() => setCurrentPage(pkg.regionPage ? pkg.regionPage : `dest-${pkg.country.toLowerCase().replace(/\s+/g, '-')}`)} className="hover:text-white transition">{pkg.region ? pkg.region : pkg.country}</button>
            <ChevronRight size={12} className="text-white" />
            <span className="text-white">{pkg.title}</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-4">{pkg.title}</h1>
          <div className="flex flex-wrap gap-4 text-sm font-medium text-white">
             <span className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-full flex items-center gap-2"><Clock size={16} className="text-yellow-400"/> {pkg.duration}</span>
             <span className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-full flex items-center gap-2"><MapPin size={16} className="text-yellow-400"/> {pkg.locations}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="text-2xl font-serif font-bold text-gray-900 mb-4">Tour Overview</h2>
              <p className="text-gray-600 leading-relaxed">{pkg.overview}</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="text-2xl font-serif font-bold text-gray-900 mb-8">Tour Itinerary</h2>
              <div className="space-y-8 relative before:absolute before:inset-0 before:ml-[19px] before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-yellow-400 before:to-yellow-100">
                {pkg.itinerary.map((item, index) => (
                  <div key={index} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-yellow-400 text-black font-bold shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                      {item.day}
                    </div>
                    <div className="w-[calc(100%-3rem)] md:w-[calc(50%-2.5rem)] bg-gray-50 p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                      <h3 className="font-bold text-lg text-gray-900 mb-2">Day {item.day}: {item.title}</h3>
                      <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-8">
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <span className="text-green-500 bg-green-50 p-1.5 rounded-full"><CheckIcon size={18} /></span> Inclusions
                </h3>
                <ul className="space-y-3">
                  {pkg.inclusions.map((inc, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-gray-600">
                      <CheckIcon size={16} className="text-green-500 shrink-0 mt-0.5" />
                      <span>{inc}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <span className="text-red-500 bg-red-50 p-1.5 rounded-full"><XIcon size={18} /></span> Exclusions
                </h3>
                <ul className="space-y-3">
                   {pkg.exclusions.map((exc, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-gray-600">
                      <XIcon size={16} className="text-red-500 shrink-0 mt-0.5" />
                      <span>{exc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Sticky Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-28 bg-white p-8 rounded-2xl shadow-xl border border-yellow-200 border-t-4 border-t-yellow-400">
              <div className="text-center mb-8 border-b border-gray-100 pb-6">
                <p className="text-gray-500 font-medium mb-1">Starting from</p>
                <h2 className="text-4xl font-black text-gray-900">{pkg.price}<span className="text-base text-gray-500 font-normal"> / person</span></h2>
              </div>
              <h3 className="text-xl font-bold mb-6 text-center">Enquire About This Tour</h3>
              <form className="space-y-4">
                <input type="text" placeholder="Full Name *" className="w-full border border-gray-300 p-3 rounded-lg text-sm focus:outline-none focus:border-yellow-400" required />
                <input type="email" placeholder="Email Address *" className="w-full border border-gray-300 p-3 rounded-lg text-sm focus:outline-none focus:border-yellow-400" required />
                <div className="flex border border-gray-300 rounded-lg overflow-hidden focus-within:border-yellow-400">
                  <span className="bg-gray-50 px-3 py-3 border-r border-gray-300 text-sm text-gray-600 flex items-center">+94</span>
                  <input type="tel" placeholder="Phone Number *" className="w-full px-3 py-3 text-sm focus:outline-none" required />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <input type="text" placeholder="Travel Date" onFocus={(e) => e.target.type = 'date'} onBlur={(e) => e.target.value === '' ? e.target.type = 'text' : null} className="w-full border border-gray-300 p-3 rounded-lg text-sm focus:outline-none focus:border-yellow-400" />
                  <input type="number" placeholder="Guests" min="1" className="w-full border border-gray-300 p-3 rounded-lg text-sm focus:outline-none focus:border-yellow-400" />
                </div>
                <textarea placeholder="Special Requests..." rows="3" className="w-full border border-gray-300 p-3 rounded-lg text-sm focus:outline-none focus:border-yellow-400"></textarea>
                <button type="button" className="w-full bg-yellow-400 text-black font-bold py-4 rounded-lg hover:bg-yellow-500 transition shadow-md mt-2 text-lg">SEND ENQUIRY</button>
              </form>
              <div className="mt-6 flex items-center justify-center gap-2 text-sm text-gray-500">
                <Phone size={16} className="text-yellow-500" /> Need help? <span className="font-bold text-gray-800">+94 77 123 4567</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

// ==========================================
// DYNAMIC DESTINATION PAGE
// ==========================================
const DestinationPage = ({ setCurrentPage, destId }) => {
  const dest = destinationData[destId] || {
    name: destId.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
    packagesCount: '10+',
    heroImage: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&q=80&w=1200',
    wonder: 'Local Heritage Sites',
    highlights: [{ label: 'Scenic Mountains', desc: 'Highest Peak' }, { label: 'Main River', desc: 'Longest River' }, { label: 'Coastal Islands', desc: 'Largest Island' }, { label: 'Central Lake', desc: 'Largest Lake' }],
    tips: ['Always carry a little local currency for small purchases.', 'Respect the local customs and dress codes.', 'Try the local street food for an authentic experience.'],
    stats: { annually: '5,000,000+', male: '50%', female: '50%', couples: '70%', family: '60%', topVisitors: ['Colombo', 'Kandy', 'Gampaha', 'Galle', 'Negombo', 'Kurunegala', 'Jaffna', 'Matara'] }
  };

  const destPackages = Object.entries(packagesData).filter(([key, pkg]) => pkg.country.toLowerCase() === dest.name.toLowerCase() && !pkg.isHoneymoon);
  const displayPackages = destPackages.length > 0 ? destPackages : Object.entries(packagesData).filter(([key, pkg]) => !pkg.isHoneymoon);

  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      {/* Breadcrumbs */}
      <div className="text-xs text-gray-500 mb-6 flex items-center gap-2">
        <button onClick={() => setCurrentPage('home')} className="hover:text-yellow-500">Home</button>
        <ChevronRight size={12} />
        <span className="text-gray-800 font-medium">Destinations</span>
        <ChevronRight size={12} />
        <span className="text-gray-800 font-medium">{dest.name} Tour Packages</span>
      </div>

      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-6">
        <div className="flex items-start gap-6">
          <div className="text-center">
            <div className="text-4xl font-black text-yellow-400 leading-none">{dest.packagesCount}</div>
            <div className="text-xs font-bold text-gray-500 uppercase tracking-widest mt-1">Tour<br/>Packages</div>
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-2">{dest.name} Tour Packages</h1>
            <div className="flex items-center gap-2 text-sm bg-gray-50 inline-flex px-3 py-1 rounded-full border border-gray-100">
              <span className="font-bold text-gray-800">4.9/5</span>
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
              </div>
              <span className="text-gray-500 ml-1">based on reviews</span>
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
            <img src={dest.heroImage} alt={dest.name} className="w-full h-full object-cover" />
          </div>
          <div className="flex flex-col sm:flex-row justify-between items-center bg-white gap-4">
            <div className="text-gray-900 text-sm md:text-base">
              <span className="font-bold">Architectural Wonder: </span>
              <span className="font-normal text-gray-600">{dest.wonder}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-10">
          <div className="bg-[#fcfcfc] border border-gray-100 rounded-xl p-6 shadow-sm">
            <h3 className="font-serif text-xl text-gray-900 pb-4 border-b border-gray-200 mb-5">Explore {dest.name}</h3>
            <div className="grid grid-cols-2 gap-y-6 gap-x-4">
              {dest.highlights.map((h, i) => (
                <div key={i}>
                  <p className="font-medium text-gray-900 text-base">{h.label}</p>
                  <p className="text-xs text-gray-500 mt-1">{h.desc}</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="font-serif text-[1.35rem] text-gray-900 mb-6">Essential Tips for {dest.name}</h3>
            <div className="space-y-5">
              {dest.tips.map((t, i) => (
                <div key={i} className="flex gap-4 items-center">
                  <div className="w-9 h-9 rounded-full bg-[#FFCC00] flex items-center justify-center shrink-0">
                    {i === 0 ? <Map size={18} className="text-black" /> : i === 1 ? <TreePine size={18} className="text-black" /> : <Droplets size={18} className="text-black" />}
                  </div>
                  <p className="text-sm text-gray-500 leading-snug">{t}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Visitor Statistics Section */}
      <section className="mb-20">
        <h2 className="text-[1.75rem] font-serif text-[#1e1e24] mb-8">{dest.name} - Visitors Statistics</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-y-10 gap-x-4 lg:gap-x-6 xl:gap-x-8 items-center bg-white border border-gray-100 rounded-xl p-6 xl:p-8 shadow-sm">
          
          <div className="flex justify-center md:border-r border-transparent min-w-0">
            <img 
              src="https://www.svgrepo.com/show/281694/map-asia.svg" 
              alt="Map" 
              className="w-full max-w-[140px] xl:max-w-[160px] opacity-90"
              style={{ filter: 'brightness(0) saturate(100%) invert(18%) sepia(19%) saturate(1081%) hue-rotate(205deg) brightness(96%) contrast(89%)' }} 
              onError={(e) => { e.target.onerror = null; e.target.src = "https://upload.wikimedia.org/wikipedia/commons/8/8c/Asia_blank_map.svg"; }}
            />
          </div>

          <div className="md:border-l border-yellow-400 md:pl-4 xl:pl-8 h-full flex flex-col justify-center min-w-0">
            <h4 className="text-base xl:text-lg text-gray-800 mb-2 font-medium">Annually</h4>
            <p className="text-3xl xl:text-[2.5rem] font-bold text-[#1e1e24] mb-6 tracking-tighter truncate" title={dest.stats.annually}>{dest.stats.annually}</p>
            <div className="flex items-center gap-3 xl:gap-6">
              <div className="flex items-center gap-2">
                 <div className="text-yellow-400"><User size={28} className="fill-current w-6 h-6 xl:w-8 xl:h-8" /></div>
                 <div>
                   <p className="text-[10px] xl:text-xs text-gray-500 font-bold uppercase mb-0.5">Male</p>
                   <p className="text-sm xl:text-lg font-bold text-gray-800 leading-none">{dest.stats.male}</p>
                 </div>
              </div>
              <div className="flex items-center gap-2">
                 <div className="text-[#3b3a4a]"><User size={28} className="fill-current w-6 h-6 xl:w-8 xl:h-8" /></div>
                 <div>
                   <p className="text-[10px] xl:text-xs text-gray-500 font-bold uppercase mb-0.5">Female</p>
                   <p className="text-sm xl:text-lg font-bold text-gray-800 leading-none">{dest.stats.female}</p>
                 </div>
              </div>
            </div>
          </div>

          <div className="md:border-l border-yellow-400 md:pl-4 xl:pl-8 h-full flex flex-col justify-center min-w-0">
            <h4 className="text-base xl:text-lg text-gray-800 mb-6 font-medium">By Purpose</h4>
            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="text-[#1e1e24]"><Heart size={20} strokeWidth={1.5} className="xl:w-6 xl:h-6" /></div>
                  <div className="min-w-0">
                    <p className="font-bold text-[#1e1e24] leading-none mb-1 text-sm xl:text-base truncate">Couples</p>
                    <p className="text-[11px] xl:text-[13px] text-gray-500 leading-none truncate">For Vacations</p>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1.5">
                  <div className="bg-yellow-400 h-1.5 rounded-full" style={{ width: dest.stats.couples }}></div>
                </div>
              </div>
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="text-[#1e1e24]"><Baby size={20} strokeWidth={1.5} className="xl:w-6 xl:h-6" /></div>
                  <div className="min-w-0">
                    <p className="font-bold text-[#1e1e24] leading-none mb-1 text-sm xl:text-base truncate">Family</p>
                    <p className="text-[11px] xl:text-[13px] text-gray-500 leading-none truncate">For Vacations</p>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1.5">
                  <div className="bg-yellow-400 h-1.5 rounded-full" style={{ width: dest.stats.family }}></div>
                </div>
              </div>
            </div>
          </div>

          <div className="md:border-l border-yellow-400 md:pl-4 xl:pl-8 h-full flex flex-col justify-center min-w-0">
            <h4 className="text-base xl:text-lg text-gray-800 mb-6 font-medium">Top Visitors from Sri Lanka</h4>
            <ul className="grid grid-cols-2 gap-y-3 xl:gap-y-4 gap-x-2 xl:gap-x-4 text-[13px] xl:text-[15px] text-[#1e1e24] font-medium">
              {dest.stats.topVisitors.map((city, i) => (
                <li key={i} className="flex items-center gap-2 truncate">
                  <span className="w-1.5 h-1.5 xl:w-2 xl:h-2 rounded-full bg-yellow-400 shrink-0"></span> {city}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Tour Packages Grid */}
      <section className="mb-20">
        <h2 className="text-2xl font-serif font-bold text-gray-900 mb-8 border-b border-gray-200 pb-3">
          {destPackages.length > 0 ? `View All ${dest.name} Tour Packages` : `Popular Tour Packages in Asia`}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {displayPackages.map(([key, pkg]) => (
               <TourPackageCard 
                 key={key}
                 onClick={() => setCurrentPage(`pkg-${key}`)} 
                 image={pkg.image} 
                 title={pkg.title} 
                 duration={pkg.duration} 
               />
            ))}
        </div>
      </section>

      {/* Popular Packages Grid (Masonry) */}
      <section className="mb-20">
        <h2 className="text-2xl font-serif font-bold text-gray-900 mb-8 border-b border-gray-200 pb-3">Popular Packages</h2>
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4 h-auto md:h-[600px]">
            <PopularDestinationCard onClick={() => setCurrentPage('pkg-thailand')} className="md:col-span-3 md:row-span-1 h-64 md:h-auto rounded-lg" image="https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&q=80&w=800" title="Thailand Tour Packages" />
            <PopularDestinationCard onClick={() => setCurrentPage('pkg-bali')} className="md:col-span-3 md:row-span-1 h-64 md:h-auto rounded-lg" image="https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80&w=800" title="Bali Tour Packages" />
            <PopularDestinationCard onClick={() => setCurrentPage('dest-japan')} className="md:col-span-2 md:row-span-1 h-64 md:h-auto rounded-lg" image="https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&q=80&w=800" title="Japan Tour Packages" />
            <PopularDestinationCard onClick={() => setCurrentPage('pkg-vietnam')} className="md:col-span-2 md:row-span-1 h-64 md:h-auto rounded-lg" image="https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&q=80&w=800" title="Vietnam Tour Packages" />
            <PopularDestinationCard onClick={() => setCurrentPage('pkg-singapore')} className="md:col-span-2 md:row-span-1 h-64 md:h-auto rounded-lg" image="https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&q=80&w=800" title="Singapore Tour Packages" />
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
// HONEYMOON PAGE COMPONENT
// ==========================================
const HoneymoonPage = ({ setCurrentPage }) => {
  // Filter the database to only show Honeymoon packages
  const honeymoonPackages = Object.entries(packagesData).filter(([key, pkg]) => pkg.isHoneymoon);

  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      {/* Breadcrumbs */}
      <div className="text-xs text-gray-500 mb-6 flex items-center gap-2">
        <button onClick={() => setCurrentPage('home')} className="hover:text-yellow-500">Home</button>
        <ChevronRight size={12} />
        <span className="text-gray-800 font-medium">Honeymoon Packages</span>
      </div>

      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-6">
        <div className="flex items-start gap-6">
          <div className="text-center">
            <div className="text-4xl font-black text-pink-500 leading-none">6+</div>
            <div className="text-xs font-bold text-gray-500 uppercase tracking-widest mt-1">Romantic<br/>Escapes</div>
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-2">Honeymoon Packages in Asia</h1>
            <p className="text-sm text-gray-500 max-w-xl">Curated, unforgettable romantic getaways designed exclusively for couples to celebrate their love across the most stunning destinations in Asia.</p>
          </div>
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <button className="flex-1 md:flex-none bg-pink-500 text-white px-6 py-2.5 rounded text-sm font-bold shadow-sm hover:bg-pink-600 transition">Enquire Now</button>
        </div>
      </div>

      {/* Hero Section */}
      <div className="rounded-2xl overflow-hidden h-[400px] md:h-[500px] mb-16 relative">
        <img src="https://images.unsplash.com/photo-1544365558-35aa4afcf11f?auto=format&fit=crop&q=80&w=1200" alt="Honeymoon Romance" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4">
           <Heart size={48} className="text-pink-400 mb-4 fill-current" />
           <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4 drop-shadow-md">Begin Your Forever</h2>
           <p className="text-lg md:text-xl font-medium drop-shadow-md">Luxurious stays, private transfers, and intimate experiences.</p>
        </div>
      </div>

      {/* Why Choose Us for Honeymoons */}
      <section className="mb-16 bg-pink-50 p-8 md:p-12 rounded-2xl border border-pink-100">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-serif font-bold text-gray-900 mb-2">The Luma Honeymoon Promise</h2>
          <p className="text-gray-600 text-sm">We handle every detail so you can focus on each other.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
           <div className="text-center">
             <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto text-pink-500 shadow-sm mb-4"><Heart size={28} /></div>
             <h3 className="font-bold text-gray-900 mb-2">Romantic Touches</h3>
             <p className="text-xs text-gray-500 leading-relaxed">Complimentary room decorations, couples massages, and special honeymoon cakes upon arrival.</p>
           </div>
           <div className="text-center">
             <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto text-pink-500 shadow-sm mb-4"><Star size={28} /></div>
             <h3 className="font-bold text-gray-900 mb-2">Private Experiences</h3>
             <p className="text-xs text-gray-500 leading-relaxed">Enjoy private candlelight dinners on the beach and exclusive sunset cruises just for two.</p>
           </div>
           <div className="text-center">
             <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto text-pink-500 shadow-sm mb-4"><MapPin size={28} /></div>
             <h3 className="font-bold text-gray-900 mb-2">Secluded Locations</h3>
             <p className="text-xs text-gray-500 leading-relaxed">We select the finest luxury boutique resorts and private pool villas away from the crowds.</p>
           </div>
           <div className="text-center">
             <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto text-pink-500 shadow-sm mb-4"><Compass size={28} /></div>
             <h3 className="font-bold text-gray-900 mb-2">Seamless Travel</h3>
             <p className="text-xs text-gray-500 leading-relaxed">Private VIP airport transfers and dedicated chauffeurs to ensure zero stress during your trip.</p>
           </div>
        </div>
      </section>

      {/* The 6 Honeymoon Packages Grid */}
      <section className="mb-20">
        <h2 className="text-2xl font-serif font-bold text-gray-900 mb-8 border-b border-gray-200 pb-3">Curated Honeymoon Packages</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {honeymoonPackages.map(([key, pkg]) => (
               <TourCard 
                 key={key}
                 onClick={() => setCurrentPage(`pkg-${key}`)} 
                 image={pkg.image} 
                 title={pkg.title} 
                 price={pkg.price}
                 nights={pkg.duration.charAt(0)}
                 days={pkg.duration.split('/ ')[1].charAt(0)}
               />
            ))}
        </div>
      </section>

    </main>
  );
};


// ==========================================
// HOME PAGE COMPONENT
// ==========================================
const HomePage = ({ setCurrentPage }) => {
  const DestinationCard = ({ image, title, colSpan, rowSpan, onClick }) => (
    <div onClick={onClick} className={`relative group overflow-hidden rounded-lg ${colSpan} ${rowSpan} ${onClick ? 'cursor-pointer' : ''}`}>
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
          <DestinationCard image="https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80&w=800" title="BALI" colSpan="md:col-span-2" rowSpan="md:row-span-2" onClick={() => setCurrentPage('dest-bali')} />
          <DestinationCard image="https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&q=80&w=800" title="THAILAND" colSpan="md:col-span-2" rowSpan="md:row-span-1" onClick={() => setCurrentPage('dest-thailand')} />
          <DestinationCard image="https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&q=80&w=800" title="SINGAPORE" colSpan="md:col-span-1" rowSpan="md:row-span-1" onClick={() => setCurrentPage('dest-singapore')} />
          <DestinationCard image="https://images.unsplash.com/photo-1504214208698-ea1916a2195a?auto=format&fit=crop&q=80&w=800" title="MALAYSIA" colSpan="md:col-span-1" rowSpan="md:row-span-1" onClick={() => setCurrentPage('dest-malaysia')} />
          <DestinationCard image="https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&q=80&w=800" title="VIETNAM" colSpan="md:col-span-2" rowSpan="md:row-span-1" onClick={() => setCurrentPage('dest-vietnam')} />
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
              title="Beautiful Bali" price="LKR 265,000" nights="4" days="5" 
              onClick={() => setCurrentPage('pkg-bali')}
            />
            <TourCard 
              image="https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&q=80&w=600"
              title="Amazing Thailand" price="LKR 195,000" nights="5" days="6" 
              onClick={() => setCurrentPage('pkg-thailand')}
            />
            <TourCard 
              image="https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&q=80&w=600"
              title="Singapore Fling" price="LKR 345,000" nights="3" days="4" 
              onClick={() => setCurrentPage('pkg-singapore')}
            />
            <TourCard 
              image="https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&q=80&w=600"
              title="Vietnam Vibes" price="LKR 285,000" nights="6" days="7" 
              onClick={() => setCurrentPage('pkg-vietnam')}
            />
          </div>
        </div>
      </section>

      {/* Trending Destinations */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <h2 className="text-center text-3xl font-bold mb-12 uppercase">Trending Destinations</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <IntlTourCard 
            image="https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&q=80&w=600"
            title="JAPAN" subtitle="Land of the Rising Sun" onClick={() => setCurrentPage('dest-japan')}
          />
          <IntlTourCard 
            image="https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&q=80&w=600"
            title="SINGAPORE" subtitle="Lion City" onClick={() => setCurrentPage('dest-singapore')}
          />
          <IntlTourCard 
            image="https://images.unsplash.com/photo-1508009603885-50cf7cbf0d80?auto=format&fit=crop&q=80&w=600"
            title="BALI" subtitle="Island of Gods" onClick={() => setCurrentPage('dest-bali')}
          />
          <IntlTourCard 
            image="https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&q=80&w=600"
            title="VIETNAM" subtitle="Timeless Charm" onClick={() => setCurrentPage('dest-vietnam')}
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
// MAIN APP (Handles routing between pages)
// ==========================================
export default function App() {
  const [currentPage, setCurrentPage] = useState('home');

  return (
    <div className="font-sans text-gray-800 bg-white min-h-screen flex flex-col">
      <TopBar />
      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      
      {/* Render the selected page */}
      <div className="flex-grow">
        {currentPage === 'home' && <HomePage setCurrentPage={setCurrentPage} />}
        
        {currentPage === 'honeymoon' && <HoneymoonPage setCurrentPage={setCurrentPage} />}
        
        {/* Dynamic Destination Pages (e.g. dest-bali, dest-thailand) */}
        {currentPage.startsWith('dest-') && (
           <DestinationPage 
              setCurrentPage={setCurrentPage} 
              destId={currentPage.replace('dest-', '')} 
           />
        )}

        {/* Dynamic Individual Package Details (e.g. pkg-bali) */}
        {currentPage.startsWith('pkg-') && (
           <PackageDetailPage 
              setCurrentPage={setCurrentPage} 
              packageId={currentPage.replace('pkg-', '')} 
           />
        )}
      </div>

      <Footer setCurrentPage={setCurrentPage} />
    </div>
  );
}