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

export const Hours = [
  { id: 1, hour: '05:00' },
  { id: 2, hour: '06:00' },
  { id: 3, hour: '07:00' },
  { id: 4, hour: '08:00' },
  { id: 5, hour: '09:00' },
  { id: 6, hour: '10:00' },
  { id: 7, hour: '11:00' },
  { id: 8, hour: '12:00' },
  { id: 9, hour: '13:00' },
  { id: 10, hour: '14:00' },
  { id: 11, hour: '15:00' },
  { id: 12, hour: '16:00' },
  { id: 13, hour: '17:00' },
  { id: 14, hour: '18:00' },
  { id: 15, hour: '19:00' },
  { id: 16, hour: '20:00' },
  { id: 17, hour: '21:00' },
  { id: 18, hour: '22:00' },
];

export const Months = [
  {name_en: "January", name_fr: "Janvier"},
  {name_en: "February", name_fr: "Février"},
  {name_en: "March", name_fr: "Mars"},
  {name_en: "April", name_fr: "Avril"},
  {name_en: "May", name_fr: "Mai"},
  {name_en: "June", name_fr: "Juin"},
  {name_en: "July", name_fr: "Juillet"},
  {name_en: "August", name_fr: "Aout"},
  {name_en: "September", name_fr: "Septembre"},
  {name_en: "October", name_fr: "Octobre"},
  {name_en: "November", name_fr: "Novembre"},
  {name_en: "December", name_fr: "Décembre"},
];

export const statusUser = [
  {name_en: "Active", name_fr: "Actif", uid: "active"},
  {name_en: "Suspended", name_fr: "Suspendu(e)", uid: "suspended"},
];

export const statusCoupon = [
  {name_en: "Active", name_fr: "Actif", uid: "active"},
  {name_en: "Expired", name_fr: "Expiré", uid: "expired"},
];

export const statusPayment = [];

export const statusReservation = [
  {name_en: "Pending", name_fr: "Sollicitée", uid: "pending"},
  {name_en: "Partially paid", name_fr: "Partiellement payée", uid: "partially_paid"},
  {name_en: "Confirmed", name_fr: "Confirmée", uid: "confirmed"},
  {name_en: "Totally Paid", name_fr: "Totalement payée", uid: "totally_paid"},
  {name_en: "Cancelled", name_fr: "Annulée", uid: "cancelled"},
];

export const statusReservationTable = [
  {name_en: "Pending", name_fr: "Sollicitée", uid: "pending"},
  {name_en: "Partially paid", name_fr: "Partiellement payée", uid: "partially paid"},
  {name_en: "Confirmed", name_fr: "Confirmée", uid: "confirmed"},
  {name_en: "Totally Paid", name_fr: "Totalement payée", uid: "totally paid"},
  {name_en: "Cancelled", name_fr: "Annulée", uid: "cancelled"},
];

// export const statusOptions = [
//   {name: "Active", uid: "active"},
//   {name: "Paused", uid: "paused"},
//   {name: "Vacation", uid: "vacation"},
// ];

export const roles = [
  {id: 1, name: "admin"},
  // {id: 2, name: "client"},
  {id: 3, name: "superadmin"},
]

export const agencies = [
  {id: 1, name: "Elig Essono"},
  {id: 2, name: "Etoa-Meki"},
]


export const languages = [
  {name_en: "English", name_fr: "Anglais", uid: "en"},
  {name_en: "French", name_fr: "Francais", uid: "fr"}
]

export const columnsClient = [
  {name_en: "NAME", name_fr: "NOM", uid: "lastname", sortable: true},
  {name_en: "EMAIL", name_fr: "EMAIL", uid: "email", sortable: true},
  {name_en: "ROLE", name_fr: "ROLE", uid: "role"},
  {name_en: "PHONENUMBER", name_fr: "TELEPHONE", uid: "phonenumber"},
  {name_en: "LANGUAGE", name_fr: "LANGUE", uid: "language", sortable: true},
  {name_en: "STATUS", name_fr: "STATUS", uid: "status", sortable: true},
  {name_en: "CREATED BY", name_fr: "CREE PAR", uid: "created_by"},
  {name_en: "CREATED AT", name_fr: "CREE LE", uid: "created_at"},
  {name_en: "ACTIONS", name_fr: "ACTIONS", uid: "actions"},
];

export const columnsStaff = [
  {name_en: "NAME", name_fr: "NOM", uid: "lastname", sortable: true},
  {name_en: "EMAIL", name_fr: "EMAIL", uid: "email", sortable: true},
  {name_en: "ROLE", name_fr: "ROLE", uid: "role", sortable: true},
  {name_en: "PHONENUMBER", name_fr: "TELEPHONE", uid: "phonenumber"},
  {name_en: "LANGUAGE", name_fr: "LANGUE", uid: "language", sortable: true},
  {name_en: "WORK AT", name_fr: "TRAVAILLE A", uid: "agency", sortable: true},
  {name_en: "STATUS", name_fr: "STATUS", uid: "status", sortable: true},
  {name_en: "CREATED BY", name_fr: "CREE PAR", uid: "created_by"},
  {name_en: "CREATED AT", name_fr: "CREE LE", uid: "created_at"},
  {name_en: "ACTIONS", name_fr: "ACTIONS", uid: "actions"},
];

export const columnsAgency = [
  {name_en: "NAME", name_fr: "NOM", uid: "name", sortable: true},
  {name_en: "ADDRESS", name_fr: "ADRESSE", uid: "address"},
  {name_en: "CONTACT", name_fr: "CONTACT", uid: "contact"},
  // {name_en: "PHONENUMBER", name_fr: "TELEPHONE", uid: "phonenumber"},
  {name_en: "STATUS", name_fr: "STATUS", uid: "status", sortable: true},
  {name_en: "OPENING DAYS", name_fr: "JOURS D'OUVERTURE", uid: "openingdays"},
  {name_en: "CREATED AT", name_fr: "CREE LE", uid: "created_at"},
  {name_en: "CREATED BY", name_fr: "CREE PAR", uid: "created_by"},
  {name_en: "ACTIONS", name_fr: "ACTIONS", uid: "actions"},
];

export const columnsLog = [
  {name_en: "DESCRIPTION", name_fr: "DESCRIPTION", uid: "description", sortable: true},
  {name_en: "URL", name_fr: "URL", uid: "url"},
  {name_en: "METHOD", name_fr: "METHODE", uid: "method"},
  {name_en: "IP", name_fr: "IP", uid: "ip"},
  {name_en: "AGENT", name_fr: "AGENT", uid: "agent"},
  {name_en: "AUTHOR", name_fr: "AUTEUR", uid: "author"},
  {name_en: "DATE", name_fr: "DATE", uid: "created_at"},
];

export const columnsRole = [
  {name_en: "ROLE", name_fr: "ROLE", uid: "role", sortable: true},
  {name_en: "PERMISSIONS", name_fr: "PERMISSIONS", uid: "permissions", sortable: true},
];

export const columnsCharacteristic = [
  {name_en: "CHARACTERISTICS", name_fr: "CARACTERISTIQUES", uid: "characteristic", sortable: true},
  {name_en: "ACTIONS", name_fr: "ACTIONS", uid: "actions"},
];

export const columnsSpace = [
  {name_en: "NAME", name_fr: "NOM", uid: "name", sortable: true},
  {name_en: "NB PLACE", name_fr: "NB PLACE", uid: "nb_place", sortable: true},
  {name_en: "IMAGES", name_fr: "IMAGES", uid: "images"},
  {name_en: "CHARACTERISTICS", name_fr: "CARACTERISTIQUES", uid: "characteristics"},
  {name_en: "CREATED AT", name_fr: "CREE LE", uid: "created_at"},
  {name_en: "ACTIONS", name_fr: "ACTIONS", uid: "actions"},
];

export const columnsRessource = [
  {name_en: "SPACE", name_fr: "ESPACE", uid: "space", sortable: true},
  {name_en: "PRICE", name_fr: "PRIX", uid: "price"},
  {name_en: "NB PLACE", name_fr: "NB PLACE", uid: "nb_place", sortable: true},
  {name_en: "QUANTITY", name_fr: "QUANTITE", uid: "quantity", sortable: true},
  {name_en: "AGENCY", name_fr: "AGENCE", uid: "agency", sortable: true},
  {name_en: "CREATED BY", name_fr: "CREE PAR", uid: "created_by"},
  {name_en: "CREATED AT", name_fr: "CREE LE", uid: "created_at"},
  {name_en: "ACTIONS", name_fr: "ACTIONS", uid: "actions"},
];

export const validitiesName = [
  {name_en: "Hour", name_fr: "Heure", uid: "hour"},
  {name_en: "Midday", name_fr: "Demi-journée", uid: "midday"},
  {name_en: "Day", name_fr: "Journée", uid: "day"},
  {name_en: "Week", name_fr: "Semaine", uid: "week"},
  {name_en: "Month", name_fr: "Mois", uid: "month"},
]

export const paymentMethods = [
  {name_en: "Bank", name_fr: "Carte bancaire", uid: "Bank"},
  {name_en: "Cash", name_fr: "Cash", uid: "Cash"},
  {name_en: "MTN Money", name_fr: "MTN Money", uid: "MTN Money"},
  {name_en: "Orange Money", name_fr: "Orange Money", uid: "Orange Money"},
]

export const middayPeriods = [
  {name_en: "Morning (08h-13h)", name_fr: "En matinée (08h-13h)", uid: "morning"},
  {name_en: "Afternoon (13h-18h)", name_fr: "En soirée (13h-18h)", uid: "afternoon"},
]

export const availableStats = [
  {name_en: "General stat.", name_fr: "Stat. Généraux", uid: "Generals stat."},
  {name_en: "Users stat.", name_fr: "Stat. Utilisateurs", uid: "Users stat."},
  {name_en: "Payments stat.", name_fr: "Stat. Paiements", uid: "Payments stat."},
  {name_en: "Reservations stat.", name_fr: "Stat. Réservations", uid: "Reservations stat."},
]

export const columns = [
  {name: "NAME", uid: "name"},
  {name: "ROLE", uid: "role"},
  {name: "STATUS", uid: "status"},
  {name: "ACTIONS", uid: "actions"},
];

export const columnsCoupon = [
  {name_en: "NAME", name_fr: "NOM", uid: "name", sortable: true},
  {name_en: "TYPE OF COUPON", name_fr: "TYPE DE COUPON", uid: "coupon_type"},
  {name_en: "VALUE", name_fr: "VALEUR", uid: "value"},
  {name_en: "EXPIRE ON", name_fr: "EXPIRE LE", uid: "expired_on", sortable: true},
  {name_en: "STATUS", name_fr: "STATUS", uid: "status", sortable: true},
  {name_en: "TOTAL USAGE", name_fr: "USAGE TOTAL", uid: "total_usage", sortable: true},
  {name_en: "SENDING TO", name_fr: "ENVOYE A", uid: "sending_to"},
  {name_en: "CREATED BY", name_fr: "CREE PAR", uid: "created_by"},
  {name_en: "CREATED AT", name_fr: "CREE LE", uid: "created_at"},
  {name_en: "ACTIONS", name_fr: "ACTIONS", uid: "actions"},
];


export const columnsPayment = [
  {name_en: "RESERVATION_ID", name_fr: "RESERVATION_ID", uid: "reservation_id", sortable: true},
  {name_en: "AMOUNT", name_fr: "AMOUNT", uid: "amount", sortable: true},
  {name_en: "METHOD", name_fr: "METHOD", uid: "payment_method", sortable: true},
  {name_en: "STATUS", name_fr: "STATUS", uid: "payment_status", sortable: true},
  {name_en: "TRANSACTION ID", name_fr: "TRANSACTION ID", uid: "transaction_id", sortable: true},
  {name_en: "BILL NUMBER", name_fr: "NUM. FACTURE", uid: "bill_number", sortable: true},
  {name_en: "PROCESSED BY", name_fr: "EFFECTUE PAR", uid: "processed_by"},
  {name_en: "CREATED AT", name_fr: "CREE LE", uid: "created_at"}
];


export const columnsReservation = [
  {name_en: "ID", name_fr: "ID", uid: "id", sortable: true},
  {name_en: "RESSOURCE", name_fr: "RESSOURCE", uid: "ressource", sortable: true},
  {name_en: "CLIENT", name_fr: "CLIENT", uid: "client", sortable: true},
  {name_en: "DATE", name_fr: "DATE", uid: "date"},
  {name_en: "HOUR", name_fr: "HEURE", uid: "hour"},
  {name_en: "INITIAL AMOUNT", name_fr: "MONTANT INITIAL", uid: "initial_amount", sortable: true},
  {name_en: "AMOUNT DUE", name_fr: "MONTANT RESTANT", uid: "amount_due", sortable: true},
  {name_en: "STATE", name_fr: "ETAT", uid: "state", sortable: true},
  {name_en: "COUPON", name_fr: "COUPON", uid: "coupon", sortable: true},
  {name_en: "AGENCY", name_fr: "AGENCE", uid: "agency", sortable: true},
  {name_en: "CREATED BY", name_fr: "CREE PAR", uid: "created_by"},
  {name_en: "CREATED AT", name_fr: "CREE LE", uid: "created_at"},
  {name_en: "ACTIONS", name_fr: "ACTIONS", uid: "actions"},
];

export const columnsCurrentReservation = [
  {name_en: "RESSOURCE", name_fr: "RESSOURCE", uid: "ressource", sortable: true},
  {name_en: "CLIENT", name_fr: "CLIENT", uid: "client", sortable: true},
  {name_en: "DATE", name_fr: "DATE", uid: "date"},
  {name_en: "AMOUNT", name_fr: "MONTANT", uid: "amount", sortable: true},
  {name_en: "AGENCY", name_fr: "AGENCE", uid: "agency", sortable: true},
];

/*
  * ======================== tabs columns
*/
export const columnsTabsStaffCoupon = [
  {name_en: "NAME", name_fr: "NOM", uid: "name", sortable: true},
  {name_en: "TOTAL USAGE", name_fr: "USAGE TOTAL", uid: "total_usage", sortable: true},
  {name_en: "STATUS", name_fr: "STATUS", uid: "status", sortable: true},
  {name_en: "VALUE", name_fr: "VALEUR", uid: "value"},
  {name_en: "EXPIRE ON", name_fr: "EXPIRE LE", uid: "expired_on", sortable: true},
  {name_en: "CREATED AT", name_fr: "CREE LE", uid: "created_at"},
];

export const columnsTabsClientCoupon = [
  {name_en: "NAME", name_fr: "NOM", uid: "name", sortable: true},
  {name_en: "TOTAL USAGE", name_fr: "USAGE TOTAL", uid: "total_usage", sortable: true},
  {name_en: "STATUS", name_fr: "STATUS", uid: "status", sortable: true},
  {name_en: "VALUE", name_fr: "VALEUR", uid: "value"},
  {name_en: "EXPIRE ON", name_fr: "EXPIRE LE", uid: "expired_on", sortable: true},
  {name_en: "CREATED BY", name_fr: "CREE PAR", uid: "created_by"},
  {name_en: "CREATED AT", name_fr: "CREE LE", uid: "created_at"},
  {name_en: "ACTIONS", name_fr: "ACTIONS", uid: "actions"},
];
export const columnsTabsStaffAgency = [
  {name_en: "NAME", name_fr: "NOM", uid: "lastname", sortable: true},
  {name_en: "EMAIL", name_fr: "EMAIL", uid: "email", sortable: true},
  {name_en: "PHONENUMBER", name_fr: "TELEPHONE", uid: "phonenumber"},
  {name_en: "LANGUAGE", name_fr: "LANGUE", uid: "language", sortable: true},
  {name_en: "STATUS", name_fr: "STATUS", uid: "status", sortable: true},
  {name_en: "CREATED BY", name_fr: "CREE PAR", uid: "created_by"},
  {name_en: "CREATED AT", name_fr: "CREE LE", uid: "created_at"},
  {name_en: "ACTIONS", name_fr: "ACTIONS", uid: "actions"},
];

export const columnsTabsStaffStaff = [
  {name_en: "NAME", name_fr: "NOM", uid: "lastname", sortable: true},
  {name_en: "EMAIL", name_fr: "EMAIL", uid: "email", sortable: true},
  {name_en: "PHONENUMBER", name_fr: "TELEPHONE", uid: "phonenumber"},
  {name_en: "LANGUAGE", name_fr: "LANGUE", uid: "language", sortable: true},
  {name_en: "STATUS", name_fr: "STATUS", uid: "status", sortable: true},
  {name_en: "WORK AT", name_fr: "TRAVAILLE A", uid: "agency", sortable: true},
  {name_en: "CREATED AT", name_fr: "CREE LE", uid: "created_at"},
  {name_en: "ACTIONS", name_fr: "ACTIONS", uid: "actions"},
];

export const columnsTabsClientStaff = [
  {name_en: "NAME", name_fr: "NOM", uid: "lastname", sortable: true},
  {name_en: "EMAIL", name_fr: "EMAIL", uid: "email", sortable: true},
  {name_en: "PHONENUMBER", name_fr: "TELEPHONE", uid: "phonenumber"},
  {name_en: "LANGUAGE", name_fr: "LANGUE", uid: "language", sortable: true},
  {name_en: "STATUS", name_fr: "STATUS", uid: "status", sortable: true},
  {name_en: "CREATED AT", name_fr: "CREE LE", uid: "created_at"},
  {name_en: "ACTIONS", name_fr: "ACTIONS", uid: "actions"},
];

export const columnsTabsRessource = [
  {name_en: "SPACE", name_fr: "ESPACE", uid: "space", sortable: true},
  {name_en: "PRICE", name_fr: "PRIX", uid: "price"},
  {name_en: "NB PLACE", name_fr: "NB PLACE", uid: "nb_place", sortable: true},
  {name_en: "QUANTITY", name_fr: "QUANTITE", uid: "quantity", sortable: true},
  {name_en: "CREATED AT", name_fr: "CREE LE", uid: "created_at"},
  {name_en: "ACTIONS", name_fr: "ACTIONS", uid: "actions"},
];

export const columnsTabsReservation= [
  {name_en: "ID", name_fr: "ID", uid: "id", sortable: true},
  {name_en: "RESSOURCE", name_fr: "RESSOURCE", uid: "ressource", sortable: true},
  {name_en: "CLIENT", name_fr: "CLIENT", uid: "client", sortable: true},
  {name_en: "DATE", name_fr: "DATE", uid: "date"},
  {name_en: "HOUR", name_fr: "HEURE", uid: "hour"},
  {name_en: "AMOUNT", name_fr: "MONTANT", uid: "amount", sortable: true},
  {name_en: "STATE", name_fr: "ETAT", uid: "state", sortable: true},
  {name_en: "AGENCY", name_fr: "AGENCE", uid: "agency", sortable: true},
  {name_en: "ACTIONS", name_fr: "ACTIONS", uid: "actions"},
];

/*
  * ======================== end tabs columns
*/
