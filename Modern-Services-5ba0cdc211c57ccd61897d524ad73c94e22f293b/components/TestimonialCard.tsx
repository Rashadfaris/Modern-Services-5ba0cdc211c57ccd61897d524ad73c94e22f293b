import { Star } from 'lucide-react';

interface TestimonialCardProps {
  name: string;
  role: string;
  content: string;
  rating?: number;
  date?: string;
}

export function TestimonialCard({ name, role, content, rating = 5, date }: TestimonialCardProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow h-full flex flex-col">
      <div className="flex items-center space-x-1 mb-4">
        {[...Array(rating)].map((_, i) => (
          <Star key={i} size={16} className="text-[#C8A75B] fill-[#C8A75B]" />
        ))}
      </div>
      <p className="text-gray-700 mb-6 leading-relaxed flex-grow italic">"{content}"</p>
      <div className="border-t border-gray-200 pt-4">
        <div className="font-semibold text-[#0A1A2F]">{name}</div>
        <div className="text-sm text-gray-500">{role}</div>
        {date && (
          <div className="text-xs text-gray-400 mt-1">Submitted: {date}</div>
        )}
      </div>
    </div>
  );
}

