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
  const token = "2|jLwITbJzBmm48FZrJRavlas1g5QikM6POPfXuF0Ma8947d48";

  //client
  //const token = "3|FeLbpKq2b6OjW9frg3ypQZLcBq7MMAnEsqGturbh883a773d";
  return token; 
};