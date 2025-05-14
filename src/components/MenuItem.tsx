
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type MenuItemProps = {
  title: string;
  description?: string;
  className?: string;
};

const MenuItem: React.FC<MenuItemProps> = ({ 
  title, 
  description, 
  className 
}) => {
  return (
    <Card 
      className={cn(
        "border border-gray-100 shadow-sm hover:shadow-elegant bg-white hover:bg-gray-50/80 transition-all duration-300 rounded-lg", 
        className
      )}
    >
      <CardHeader className="p-4">
        <CardTitle className="text-xl font-medium font-cormorant text-gute-dark-blue">{title}</CardTitle>
      </CardHeader>
      {description && (
        <CardContent className="pt-0 px-4 pb-4 text-gray-600 text-sm">
          <p>{description}</p>
        </CardContent>
      )}
    </Card>
  );
};

export default MenuItem;
