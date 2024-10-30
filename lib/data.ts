

import { formatCurrency } from "@/lib/utils";


export const _agencies = [
  'Elig Essono',
  'Etoa-Meki'
]

export const _service_types = [
  'service',
  'space',
  'equipment'
]

export const _validities = [
  '01 hour',
  'midday',
  '01 day',
  '01 week',
  '01 month',
  'pack',
  '01 year'
]

export function fetchCardData() {
  try {
    const numberOfInvoices = 78;
    const numberOfCustomers = 298;
    const totalPaidInvoices = formatCurrency(217000);
    const totalPendingInvoices = formatCurrency(378500);

    return {
      numberOfCustomers,
      numberOfInvoices,
      totalPaidInvoices,
      totalPendingInvoices,
    };
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch card data.');
  }
}

export function fetchRessources(page: number) {
  try {
    /*
    const data = await sql<CustomerField>`
      SELECT
        id,
        name
      FROM customers
      ORDER BY name ASC
    `;

    const customers = data.rows;
    */
    return page;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all customers.');
  }
}

export function fetchLatestInvoices() {
  try {
  const latestInvoices = [
    {
      id: 1,
      image_url: "/images/brain-orange-400.png",
      name: "invoice",
      email: "client@contact.fr",
      amount: formatCurrency(217000)
    },
    {
      id: 2,
      image_url: "/images/brain-orange-400.png",
      name: "invoice",
      email: "client@contact.fr",
      amount: formatCurrency(217000)
    },
    {
      id: 3,
      image_url: "/images/brain-orange-400.png",
      name: "invoice",
      email: "client@contact.fr",
      amount: formatCurrency(10500)
    },
    {
      id: 4,
      image_url: "/images/brain-orange-400.png",
      name: "invoice",
      email: "client@contact.fr",
      amount: formatCurrency(7000)
    },
    {
      id: 5,
      image_url: "/images/brain-orange-400.png",
      name: "invoice",
      email: "client@contact.fr",
      amount: formatCurrency(21700)
    }
  ];

  return latestInvoices;
} catch (err) {
  console.error('Database Error:', err);
  throw new Error('Failed to fetch all customers.');
}
}