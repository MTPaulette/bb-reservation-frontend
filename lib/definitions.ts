// This file contains type definitions for your data.
// It describes the shape of the data, and what data type each property should accept.
// For simplicity of teaching, we're manually defining these types.
// However, these types are generated automatically if you're using an ORM such as Prisma.
export type AuthUserType = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export type UserFormType = {
  lastname: string,
  firstname: string,
  email: string,
  password: string,
  phonenumber: string,
  role_id: string,
  agency_id: number|undefined;
};

export type ConfirmPasswordType = {
  password: string
}

export type SuspensionFormType = {
  password: string;
  reason_for_suspension_en: string;
  reason_for_suspension_fr: string;
}

export type UserType = {
  id: number;
  lastname: string;
  firstname: string;
  email: string;
  password: string;
  phonenumber: string;
  image: string|undefined;
  status: string;
  role_id: number;
  work_at: string
};

export type AgencyType = {
  id: number;
  name: string;
  address: string;
  email: string;
  phonenumber: string;
  status: string;
  reason_for_suspension_en: string;
  reason_for_suspension_fr: string;
  openingdays: []
};

export type AgencyFormType = {
  name: string;
  address: string;
  email: string;
  phonenumber: string;
  status: string;
  reason_for_suspension_en: string;
  reason_for_suspension_fr: string;
  openingdays: []
};


export type TableColunmsType = ({
  name: string;
  uid: string;
  sortable: boolean;
} | {
  name: string;
  uid: string;
  sortable?: undefined;
});

export type StatusUserType = {
  name: string;
  uid: string;
};

export type HorairesType = {
  monday: {
    from: string;
    to: string;
  };
  tuesday: {
    from: string;
    to: string;
  };
  wednesday: {
    from: string;
    to: string;
  };
  thursday: {
    from: string;
    to: string;
  };
  friday: {
    from: string;
    to: string;
  };
  saturday: {
    from: string;
    to: string;
  };
}

export type LogType = {
  id: number;
  description: string;
  url: string;
  method: string;
  ip: string;
  agent: string;
  user_id: number;
  created_at: Date;
  updated_at: Date;
  firstname: string;
  lastname: string;
}

export type CharacteristicType = {
  id: number;
  name_en: string;
  name_fr: string;
};

export type CharacteristicFormType = {
  name_en: string;
  name_fr: string;
};

export type ImageType = {
  id: number;
  src: string;
}

export type SpaceType = {
  id: number;
  name: string;
  description_en: null;
  description_fr: null;
  nb_place: number;
  characteristics: CharacteristicType[];
  images: ImageType[];
}

export type SpaceFormType = {
  name: string;
  description_en: null;
  description_fr: null;
  nb_place: number;
  characteristics: CharacteristicType[];
  images: ImageType[];
};














export type Customer = {
  id: string;
  name: string;
  email: string;
  image_url: string;
};

export type Invoice = {
  id: string;
  customer_id: string;
  amount: number;
  date: string;
  // In TypeScript, this is called a string union type.
  // It means that the "status" property can only be one of the two strings: 'pending' or 'paid'.
  status: 'pending' | 'paid';
};

export type Revenue = {
  month: string;
  revenue: number;
};

export type LatestInvoice = {
  id: string;
  name: string;
  image_url: string;
  email: string;
  amount: string;
};

// The database returns a number for amount, but we later format it to a string with the formatCurrency function
export type LatestInvoiceRaw = Omit<LatestInvoice, 'amount'> & {
  amount: number;
};

export type InvoicesTable = {
  id: string;
  customer_id: string;
  name: string;
  email: string;
  image_url: string;
  date: string;
  amount: number;
  status: 'pending' | 'paid';
};

export type CustomersTableType = {
  id: string;
  name: string;
  email: string;
  image_url: string;
  total_invoices: number;
  total_pending: number;
  total_paid: number;
};

export type FormattedCustomersTable = {
  id: string;
  name: string;
  email: string;
  image_url: string;
  total_invoices: number;
  total_pending: string;
  total_paid: string;
};

export type CustomerField = {
  id: string;
  name: string;
};

export type InvoiceForm = {
  id: string;
  customer_id: string;
  amount: number;
  status: 'pending' | 'paid';
};





export type BRAND = {
  logo: string;
  name: string;
  visitors: number;
  revenues: string;
  sales: number;
  conversion: number;
};

export type CardItemProps = {
  imageSrc?: string;
  name?: string;
  role?: string;
  cardImageSrc?: string;
  cardTitle?: string;
  cardContent?: string;
};

export type Chat = {
  avatar: string;
  name: string;
  text: string;
  time: number;
  textCount: number;
  dot: number;
};

export type Country = {
  name: string;
  flag: string;
  percentage: number;
};

export type FAQ = {
  header: string;
  id: number;
  text: string;
};

// import { FAQ } from "./faq";

export type FaqItem = {
  active: number | null;
  handleToggle: (index: number) => void;
  faq: FAQ;
};

export type Lead = {
  avatar: string;
  name: string;
  email: string;
  project: string;
  duration: number;
  status: string;
};

export type Package = {
  name: string;
  price: number;
  invoiceDate: string;
  status: string;
};

export type Product = {
  image: string;
  name: string;
  category: string;
  price: number;
  sold: number;
  profit: number;
};
