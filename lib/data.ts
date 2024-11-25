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


export const statusUser = [
  {name_en: "Active", name_fr: "Actif", uid: "active"},
  {name_en: "Suspended", name_fr: "Suspendu(e)", uid: "suspended"},
];

export const statusOptions = [
  {name: "Active", uid: "active"},
  {name: "Paused", uid: "paused"},
  {name: "Vacation", uid: "vacation"},
];

export const roles = [
  {id: 1, name: "admin"},
  // {id: 2, name: "client"},
  {id: 3, name: "superadmin"},
]

export const agencies = [
  {id: 1, name: "Elig Essono"},
  {id: 2, name: "Etoa-Meki"},
]

export const columnsClient = [
  {name_en: "NAME", name_fr: "NOM", uid: "lastname", sortable: true},
  {name_en: "EMAIL", name_fr: "EMAIL", uid: "email", sortable: true},
  {name_en: "ROLE", name_fr: "ROLE", uid: "role"},
  {name_en: "PHONENUMBER", name_fr: "TELEPHONE", uid: "phonenumber"},
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
  {name_en: "Hour", name_fr: "Heure"},
  {name_en: "Midday", name_fr: "Demi-journée"},
  {name_en: "Day", name_fr: "Journée"},
  {name_en: "Week", name_fr: "Semaine"},
  {name_en: "Month", name_fr: "Mois"},
]

export const columns = [
  {name: "NAME", uid: "name"},
  {name: "ROLE", uid: "role"},
  {name: "STATUS", uid: "status"},
  {name: "ACTIONS", uid: "actions"},
];

export const columnsTabsStaff = [
  {name_en: "NAME", name_fr: "NOM", uid: "lastname"},
  {name_en: "EMAIL", name_fr: "EMAIL", uid: "email"},
  {name_en: "PHONENUMBER", name_fr: "TELEPHONE", uid: "phonenumber"},
  {name_en: "STATUS", name_fr: "STATUS", uid: "status"},
  {name_en: "CREATED AT", name_fr: "CREE LE", uid: "created_at"},
];

export const columnsStaffRessource = [
  {name_en: "SPACE", name_fr: "ESPACE", uid: "space"},
  {name_en: "PRICE", name_fr: "PRIX", uid: "price"},
  {name_en: "NB PLACE", name_fr: "NB PLACE", uid: "nb_place"},
  {name_en: "QUANTITY", name_fr: "QUANTITE", uid: "quantity"},
  // {name_en: "CREATED BY", name_fr: "CREE PAR", uid: "created_by"},
  {name_en: "CREATED AT", name_fr: "CREE LE", uid: "created_at"},
];
