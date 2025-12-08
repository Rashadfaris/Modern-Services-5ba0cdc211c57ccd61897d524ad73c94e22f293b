import { LucideIcon } from 'lucide-react';

interface ValueCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export function ValueCard({ icon: Icon, title, description }: ValueCardProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow text-center">
      <div className="w-16 h-16 bg-[#C8A75B] rounded-full flex items-center justify-center mx-auto mb-4">
        <Icon size={32} className="text-white" />
      </div>
      <h3 className="text-[#0A1A2F] text-lg font-semibold mb-3">{title}</h3>
      <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
    </div>
  );
}

