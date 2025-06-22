import React from 'react';
import { Star, Quote } from 'lucide-react';

const Testimonials: React.FC = () => {
  const testimonials = [
    {
      id: 1,
      name: 'Sarah Johnson',
      role: 'Graduate Student',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg',
      rating: 5,
      comment: 'RoomFinder made it so easy to find the perfect room near my university. The process was smooth and the landlord was verified. Highly recommend!',
    },
    {
      id: 2,
      name: 'Michael Chen',
      role: 'Software Engineer',
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg',
      rating: 5,
      comment: 'As a property owner, RoomFinder has been incredible for managing my listings. The platform attracts quality tenants and the booking system is seamless.',
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      role: 'Marketing Professional',
      avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg',
      rating: 5,
      comment: 'Found my dream apartment in downtown within a week! The search filters are amazing and saved me so much time. The virtual tours were a game-changer.',
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            What Our Users Say
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Join thousands of satisfied tenants and landlords who trust RoomFinder
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-white rounded-2xl shadow-lg p-8 relative">
              <Quote className="absolute top-6 left-6 h-8 w-8 text-blue-200" />
              
              <div className="pt-6">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                
                <p className="text-gray-700 mb-6 leading-relaxed">
                  "{testimonial.comment}"
                </p>
                
                <div className="flex items-center">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;