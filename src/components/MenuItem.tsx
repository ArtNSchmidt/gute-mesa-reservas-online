
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
        "border-none shadow-none bg-transparent hover:bg-black/[0.02] transition-colors", 
        className
      )}
    >
      <CardHeader className="p-4">
        <CardTitle className="text-xl font-medium text-neutral-800">{title}</CardTitle>
      </CardHeader>
      {description && (
        <CardContent className="pt-0 px-4 pb-4 text-neutral-600 text-sm">
          <p>{description}</p>
        </CardContent>
      )}
    </Card>
  );
};

export default MenuItem;
