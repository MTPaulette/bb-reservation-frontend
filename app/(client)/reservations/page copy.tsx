import  Title from "../../components/Title"
import  SelectFilter from "../../components/SelectFilter"

export default function Reservations() {
  const communityItems = [
    { name: "Articless", href: "/products"},
    { name: "Evènement", href: "/event"},
    { name: "Repertoire", href: "/repository"},
  ];

  const allFilters = [
    { label: "Agence", placeholder: "Selectionner une agence", items: ["Tout", "Elig Essono", "Etoa Meki"] },
    { label: "Agence", placeholder: "Selectionner une agence", items: ["Tout", "Elig Essono", "Etoa Meki"] },
    { label: "Agence", placeholder: "Selectionner une agence", items: ["Tout", "Elig Essono", "Etoa Meki"] },
    { label: "Agence", placeholder: "Selectionner une agence", items: ["Tout", "Elig Essono", "Etoa Meki"] },
  ];

  return (
    <>
    <div className="">
      <Title>Réservations</Title>
      <p className="text-secondary text-small md:text-medium">Cherche à travers tous les ressources et trouve celui qui convient le mieux à tes besoins.</p>
      
      <div className="flex w-full flex-wrap items-end justify-between md:justify-normal md:flex-nowrapp mt-8 mb-6 md:mb-0 gap-x-4 gap-y-6">
        {allFilters.map((filter, index) => (
          <SelectFilter
            key={index} placement="outside" label={filter.label} placeholder={filter.placeholder}
            items={filter.items}
          />
        ))}
      </div>

    </div>
    </>
  );
}
