
import React from 'react';

type MenuSectionProps = {
  title: string;
  children: React.ReactNode;
};

const MenuSection: React.FC<MenuSectionProps> = ({ title, children }) => {
  return (
    <section className="mb-20">
      <h2 className="text-3xl mb-10 font-cormorant font-bold text-gute-dark-blue text-center relative after:content-[''] after:absolute after:w-16 after:h-[2px] after:bg-gute-royal-blue after:-bottom-3 after:left-1/2 after:-translate-x-1/2">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {children}
      </div>
    </section>
  );
};

export default MenuSection;
