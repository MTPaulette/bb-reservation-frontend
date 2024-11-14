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
  const token = "1|m7JTmi3XnG3MqwGpMtXpkCMgkokQgkVUZ2vpSVkB77a0683c";

  //client
  //const token = "2|vVhhYcKaZCOln2CLhuWVYxVRMxzscAtK2E4L93Hv33851da1";
  return token; 
};