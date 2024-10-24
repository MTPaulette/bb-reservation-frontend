export const capitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export const formatCurrency = (amount: number) => {
  return (amount / 100).toLocaleString('fr-FR', {
    style: 'currency',
    currency: 'XAF',
  });
};