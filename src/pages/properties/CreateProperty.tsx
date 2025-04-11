import PropertyForm from '@/components/properties/PropertyForm';

export default function CreateProperty() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">List a New Property</h1>
      <PropertyForm />
    </div>
  );
}
