
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
    <section id="reservation" className="py-20 bg-restaurant-light-green">
      <div className="container mx-auto px-4">
        <h2 className="section-heading centered-section-heading text-center">Faça sua Reserva</h2>
        
        <div className="max-w-3xl mx-auto">
          <Card className="bg-white shadow-lg">
            <CardContent className="p-6 md:p-8">
              <Form {...form}>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                  
                  <Separator className="my-6" />
                  
                  <MenuItemSelect 
                    categories={menuData}
                    selectedItems={formData.menu_items || []}
                    onAddItem={handleAddMenuItem}
                    onRemoveItem={handleRemoveMenuItem}
                    onUpdateQuantity={handleUpdateMenuItemQuantity}
                  />
                  
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
