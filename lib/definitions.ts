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
  phonenumber: string | undefined,
  language: string | undefined,
  role_id: string,
  agency_id: number | undefined;
};

export type ConfirmPasswordType = {
  password: string
}

export type SuspensionFormType = {
  password: string;
  reason_for_suspension_en: string;
  reason_for_suspension_fr: string;
}

export type CancellationFormType = {
  password: string;
  reason_for_cancellation: string;
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

export type ImageType = ({
  id: number;
  src: string;
} | {
  id: number;
  src: string;
  space_id: number;
  created_at: Date;
  updated_at: Date;
})

export type SpaceType = {
  id: number;
  name: string;
  description_en: undefined;
  description_fr: undefined;
  nb_place: number;
  characteristics: CharacteristicType[];
  images: ImageType[];
}

export type SpaceFormType = {
  name: string;
  description_en: undefined;
  description_fr: undefined;
  nb_place: number;
  characteristics: CharacteristicType[];
  images: ImageType[];
};

export type RessourceType = {
  id: number;
  price_hour: number;
  price_midday: number | undefined;
  price_day: number | undefined;
  price_week: number | undefined;
  price_month: number | undefined;
  quantity: number;
  agency_id: number;
  space_id: number;
  created_by: number;
  created_at: Date;
  updated_at: Date;
  agency: string;
  space: string;
  nb_place: number;
  parent_firstname: string;
  parent_lastname:  string;
}

export type RessourceFormType = {
  price_hour: string;
  price_midday: string;
  price_day: string;
  price_week: string;
  price_month: string;
  quantity: string;
  agency_id: string;
  space_id: string;
}

export type columnsTabsType = {
  name_en: string;
  name_fr: string;
  uid: string;
  sortable: boolean;
}

export type CouponType = {
  id: number;
  name: string;
  code: string;
  total_usage: number;
  status: string;
  expired_on: Date;
  percent: number | undefined;
  amount: number | undefined;
  note_en: string;
  note_fr: string;
  created_by: CreatedByType;
  created_at: Date;
  updated_at: Date;
}

export type CreatedByType = {
  id: number;
  lastname: string;
  firstname: string;
}

export type CouponFormType = {
  name: string;
  total_usage: number | string;
  percent: number | string | undefined;
  amount: number | string | undefined;
  expired_on: Date | string;
  note_en: string;
  note_fr: string;
}

export type OptionType = {
  id:    number;
  name:  string;
  value: string;
}

export type HolidayType = {
  date: string;
}

export type ReservationFormType = {
  client_id: number | string;
  ressource_id: number | string;
  validity: string;
  midday_period: string | undefined;
  start_date: string;
  end_date: string | undefined;
  start_hour: string;
  end_hour: string;
  coupon: string | undefined;
}

export type ReservationType = {
  id:           number;
  ressource_id: number;
  client_id:    number;
  start_date:   Date;
  end_date:     Date;
  start_hour:   string;
  end_hour:     string;
  state:        string;
  initial_amount:   number;
  amount_due:   number;
  note:      string | undefined;
  reason_for_cancellation:      string | undefined;
  coupon_id:    number | undefined;
  created_by:   CreatedByType;
  cancelled_by: string | undefined;
  cancelled_at: string | undefined;
  created_at:   Date;
  updated_at:   Date;
  ressource:    RessourceType_2;
  client:       CreatedByType;
  coupon:       SampleCouponType | undefined;
  payments:     unknown[];
}

export type RessourceType_2 = {
  id:           number;
  price_hour:   number;
  price_midday: number | undefined;
  price_day:    number;
  price_week:   undefined;
  price_month:  number | undefined;
  quantity:     number;
  agency_id:    number;
  space_id:     number;
  created_by:   number;
  created_at:   Date;
  updated_at:   Date;
  space:        SampleAgencyType;
  agency:       SampleAgencyType;
}

export type SampleCouponType = {
  id:   number;
  name: string;
  code: string;
}

export type SampleAgencyType = {
  id:   number;
  name: string;
}

export type Reservation_draftType = {
  ressource_id:   number;
  client_id:      number;
  start_date:     string;
  end_date:       string;
  start_hour:     string;
  end_hour:       string;
  initial_amount: number;
  amount_due:     number;
  coupon_id:      number;
  created_by:     number;
}

export type PaymentType = {
  id:             number;
  amount:         number;
  payment_method: string;
  payment_status: string | undefined;
  transaction_id: string | undefined;
  bill_number:    string | undefined;
  reservation_id: number;
  processed_by:   CreatedByType;
  created_at:     Date;
  updated_at:     Date;
}

export type PaymentFormType = {
  amount:         number | string;
  payment_method: string;
  // payment_status: string | undefined;
  transaction_id: string | undefined;
  bill_number:    string | undefined;
  note:           string | undefined;
}

export type ChartType = {
  series: {
    name: string;
    data: number[];
  }[];
}














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
  active: number | undefined;
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
