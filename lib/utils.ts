export const capitalize = (str: string) => {
  return str? str.charAt(0).toUpperCase() + str.slice(1): "";
}

export const formatCurrency = (amount: number) => {
  return (amount / 100).toLocaleString('fr-FR', {
    style: 'currency',
    currency: 'XAF',
  });
};

export const getUsername = (lastname: string, firstname: string) => {
  return capitalize(firstname)+" "+lastname.toUpperCase();
}

export const getToken = () => {
  // const token = sessionStorage.getItem("user");
  //const token = "2|GkscTcM21RErmT1mCtPDAAlene1wEpaRBwSGjrAM7c0220c8";
  const token = "4|ietyUgzpOqzbVTFk8raNf1ozhNnnYS40fmg919wkef2c0f9b";

  //client
  //const token = "2|vVhhYcKaZCOln2CLhuWVYxVRMxzscAtK2E4L93Hv33851da1";
  return token; 
};