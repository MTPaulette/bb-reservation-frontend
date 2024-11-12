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

export const columnsClient = [
  {name_en: "NAME", name_fr: "NOM", uid: "lastname", sortable: true},
  {name_en: "EMAIL", name_fr: "EMAIL", uid: "email", sortable: true},
  {name_en: "ROLE", name_fr: "ROLE", uid: "role"},
  {name_en: "PHONENUMBER", name_fr: "TELEPHONE", uid: "phonenumber"},
  {name_en: "STATUS", name_fr: "STATUS", uid: "status", sortable: true},
  {name_en: "ACTIONS", name_fr: "ACTIONS", uid: "actions"},
];


export const columnsStaff = [
  {name_en: "NAME", name_fr: "NOM", uid: "lastname", sortable: true},
  {name_en: "EMAIL", name_fr: "EMAIL", uid: "email", sortable: true},
  {name_en: "ROLE", name_fr: "ROLE", uid: "role", sortable: true},
  {name_en: "PHONENUMBER", name_fr: "TELEPHONE", uid: "phonenumber"},
  {name_en: "WORK AT", name_fr: "TRAVAILLE A", uid: "agency", sortable: true},
  {name_en: "STATUS", name_fr: "STATUS", uid: "status", sortable: true},
  {name_en: "ACTIONS", name_fr: "ACTIONS", uid: "actions"},
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