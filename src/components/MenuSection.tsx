
import React from 'react';

type MenuSectionProps = {
  title: string;
  children: React.ReactNode;
};

const MenuSection: React.FC<MenuSectionProps> = ({ title, children }) => {
  return (
    <section className="mb-16">
      <h2 className="text-3xl mb-8 font-playfair text-center relative after:content-[''] after:absolute after:w-12 after:h-[2px] after:bg-neutral-400 after:-bottom-3 after:left-1/2 after:-translate-x-1/2">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {children}
      </div>
    </section>
  );
};

export default MenuSection;
