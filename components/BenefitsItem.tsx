import { FC } from 'react';
import { LucideIcon, Mic, Smile, Brain } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface BenefitsItemProps {
  title: string;
  description: string;
  icon: string;
}

const iconMap: Record<string, LucideIcon> = {
  Mic,
  Smile,
  Brain,
};

const BenefitsItem: FC<BenefitsItemProps> = ({ title, description, icon }) => {
  const IconComponent = iconMap[icon];

  return (
    <div className="w-full md:w-1/3 px-4 mb-8">
      <Card className="shadow-lg">
        <CardHeader className="flex justify-center">
          {IconComponent && <IconComponent className="h-12 w-12 text-indigo-600" />}
        </CardHeader>
        <CardContent className="text-center">
          <CardTitle className="text-xl font-semibold text-gray-900 mb-2">{title}</CardTitle>
          <p className="text-gray-700">{description}</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default BenefitsItem;
