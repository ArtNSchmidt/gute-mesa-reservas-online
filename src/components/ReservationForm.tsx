
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { useReservationForm } from '@/hooks/useReservationForm';
import PersonalInfoFields from '@/components/reservation/PersonalInfoFields';
import ReservationDetailFields from '@/components/reservation/ReservationDetailFields';
import SpecialRequestsField from '@/components/reservation/SpecialRequestsField';
import SubmitButton from '@/components/reservation/SubmitButton';
import MenuItemSelect from '@/components/reservation/MenuItemSelect';
import { Form } from '@/components/ui/form';
import { menuData } from '@/utils/menuData';
import { Separator } from '@/components/ui/separator';

const ReservationForm: React.FC = () => {
  const {
    form,
    formData,
    isSubmitting,
    handleChange,
    handleSubmit,
    handleAddMenuItem,
    handleRemoveMenuItem,
    handleUpdateMenuItemQuantity,
    today,
    maxDateString,
    formState
  } = useReservationForm();

  return (
    <section id="reservation" className="py-24 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
      {/* Elementos decorativos */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-gute-royal-blue via-gute-soft-green to-gute-light-yellow"></div>
      <div className="absolute -top-20 -left-20 w-40 h-40 rounded-full bg-gute-soft-pink/5 z-0"></div>
      <div className="absolute -bottom-24 -right-24 w-48 h-48 rounded-full bg-gute-royal-blue/5 z-0"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <h2 className="section-heading centered-section-heading text-center text-gute-dark-blue">Reserve sua Mesa</h2>
        <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
          Planeje sua visita à Taberna do Gute e tenha uma experiência gastronômica inesquecível. Nosso chef está ansioso para recebê-lo.
        </p>
        
        <div className="max-w-3xl mx-auto">
          <Card className="bg-white shadow-elegant border-none rounded-xl overflow-hidden">
            <CardContent className="p-8 md:p-10">
              <Form {...form}>
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <PersonalInfoFields 
                      formData={formData} 
                      handleChange={handleChange}
                      errors={formState.errors}
                    />
                    
                    <ReservationDetailFields 
                      formData={formData} 
                      handleChange={handleChange} 
                      today={today} 
                      maxDateString={maxDateString}
                      errors={formState.errors} 
                    />
                  </div>
                  
                  <SpecialRequestsField 
                    value={formData.special_requests || ''} 
                    onChange={handleChange} 
                  />
                  
                  <Separator className="my-8" />
                  
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="text-lg font-cormorant font-semibold mb-4 text-gute-dark-blue">Pré-selecione itens do cardápio (opcional)</h3>
                    <MenuItemSelect 
                      categories={menuData}
                      selectedItems={formData.menu_items || []}
                      onAddItem={handleAddMenuItem}
                      onRemoveItem={handleRemoveMenuItem}
                      onUpdateQuantity={handleUpdateMenuItemQuantity}
                    />
                  </div>
                  
                  <SubmitButton isSubmitting={isSubmitting} />
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ReservationForm;
