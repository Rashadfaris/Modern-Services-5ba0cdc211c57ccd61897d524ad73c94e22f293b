import { LucideIcon } from 'lucide-react';
import { Button } from './ui/button';

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  features: string[];
  onLearnMore: () => void;
}

export function ServiceCard({ icon: Icon, title, description, features, onLearnMore }: ServiceCardProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow flex flex-col h-full">
      <div className="w-12 h-12 bg-[#C8A75B] rounded-full flex items-center justify-center mb-4">
        <Icon size={24} className="text-white" />
      </div>
      <h3 className="text-[#0A1A2F] text-xl font-semibold mb-3">{title}</h3>
      <p className="text-gray-600 mb-4 leading-relaxed flex-grow">{description}</p>
      <ul className="space-y-2 mb-6">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start space-x-2 text-sm text-gray-700">
            <span className="text-[#C8A75B] mt-1">•</span>
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      <Button
        onClick={onLearnMore}
        variant="outline"
        className="mt-auto border-[#C8A75B] text-[#C8A75B] hover:bg-[#C8A75B] hover:text-white"
      >
        Learn More
      </Button>
    </div>
  );
}

