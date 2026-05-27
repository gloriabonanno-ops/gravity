export interface Utility {
  utilityNumber: string;
  propertyTax: string;
  connectedTo?: string[];
  cimasaCode?: string;
  expirationDate?: string;
}

export interface GrantData {
  key: string;
  grantType: string;
  issuingAuthority: string;
  registrationNumber: string;
  documentType: string;
  documentId: string;
  totalPropertyTax: string;
  issueDate?: string;
  expirationDate?: string;
  status?: string;
  isActive?: boolean;
  utilities: Utility[];
}

export const grantsData: GrantData[] = [
  {
    key: '1',
    grantType: 'Pubblico',
    issuingAuthority: 'Comune di Catania',
    registrationNumber: '47294664857',
    documentType: 'Atto Amministrativo',
    documentId: 'Pos. 74322 del 15/04/2004',
    totalPropertyTax: '1.000,00 €',
    issueDate: '10/12/2021',
    expirationDate: '10/12/2031',
    status: 'Attiva',
    isActive: true,
    utilities: [
      { 
        utilityNumber: 'DB45PL', 
        propertyTax: '1.050,60 €',
        connectedTo: ['PalinaButterfly_10LaMatla', '+20'],
        cimasaCode: 'P5847',
        expirationDate: '10/12/2031'
      }
    ]
  },
  {
    key: '2',
    grantType: 'Pubblico',
    issuingAuthority: 'Comune di Messina',
    registrationNumber: '47294664857',
    documentType: 'Determinazione Dirigenziale',
    documentId: 'Det. 74322 del 15/04/2004',
    totalPropertyTax: '2.000,00 €',
    issueDate: '15/06/2020',
    expirationDate: '15/06/2030',
    status: 'Attiva',
    isActive: true,
    utilities: [
      { utilityNumber: 'PF569KJ', propertyTax: '920,00 €', cimasaCode: 'P6021', expirationDate: '15/06/2030' },
      { utilityNumber: 'RT257IL9', propertyTax: '190,00 €', cimasaCode: 'Non specificata', expirationDate: '15/06/2030' }
    ]
  },
  {
    key: '3',
    grantType: 'Pubblico',
    issuingAuthority: 'Comune di Trapani',
    registrationNumber: '',
    documentType: 'Atto Amministrativo',
    documentId: 'Det. 74322 del 15/04/2004',
    totalPropertyTax: '3.500,00 €',
    issueDate: '22/03/2019',
    status: 'Scaduta',
    isActive: false,
    utilities: [
      { utilityNumber: 'UT-004-2024', propertyTax: '1.500,00 €', cimasaCode: 'P7342' },
      { utilityNumber: 'UT-005-2024', propertyTax: '2.000,00 €', cimasaCode: 'P7343' }
    ]
  },
  {
    key: '4',
    grantType: 'Pubblico',
    issuingAuthority: 'Comune di Agrigento',
    registrationNumber: '',
    documentType: 'Atto Notarile',
    documentId: 'N. 74322 del 15/04/2004',
    totalPropertyTax: '4.750,00 €',
    issueDate: '08/09/2018',
    status: 'Attiva',
    isActive: true,
    utilities: [
      { utilityNumber: 'UT-006-2024', propertyTax: '2.250,00 €', cimasaCode: 'Non specificata' },
      { utilityNumber: 'UT-007-2024', propertyTax: '1.500,00 €', cimasaCode: 'P8901' },
      { utilityNumber: 'UT-008-2024', propertyTax: '1.000,00 €', connectedTo: ['ImplantoCT_01'], cimasaCode: 'P8902' }
    ]
  },
  {
    key: '5',
    grantType: 'Privato',
    issuingAuthority: 'Condominio "Alba"',
    registrationNumber: '47294664857',
    documentType: 'Delibera',
    documentId: 'N. 74322 del 15/04/2004',
    totalPropertyTax: '5.200,00 €',
    status: 'Scaduta',
    isActive: false,
    utilities: [
      { utilityNumber: 'UT-009-2024', propertyTax: '5.200,00 €', cimasaCode: 'Non specificata' }
    ]
  },
  {
    key: '6',
    grantType: 'Pubblico',
    issuingAuthority: 'Comune di Siracusa',
    registrationNumber: '',
    documentType: 'Atto Amministrativo',
    documentId: 'Pos. 74322 del 15/04/2004',
    totalPropertyTax: '6.300,00 €',
    status: 'Attiva',
    isActive: true,
    utilities: [
      { utilityNumber: 'UT-010-2024', propertyTax: '3.000,00 €', cimasaCode: 'P9245' },
      { utilityNumber: 'UT-011-2024', propertyTax: '3.300,00 €', cimasaCode: 'P9246' }
    ]
  },
  {
    key: '7',
    grantType: 'Privato',
    issuingAuthority: 'Condominio "Nenni"',
    registrationNumber: '57295473958',
    documentType: 'Delibera',
    documentId: 'N. 74322 del 15/04/2004',
    totalPropertyTax: '7.800,00 €',
    status: 'Attiva',
    isActive: true,
    utilities: [
      { utilityNumber: 'UT-012-2024', propertyTax: '2.600,00 €', cimasaCode: 'P1023' },
      { utilityNumber: 'UT-013-2024', propertyTax: '2.600,00 €', cimasaCode: 'Non specificata' },
      { utilityNumber: 'UT-014-2024', propertyTax: '2.600,00 €', cimasaCode: 'P1025' }
    ]
  },
  {
    key: '8',
    grantType: 'Pubblico',
    issuingAuthority: 'Comune di Enna',
    registrationNumber: '47294664857',
    documentType: 'Determinazione Dirigenziale',
    documentId: 'Det. 74322 del 15/04/2004',
    totalPropertyTax: '8.900,00 €',
    status: 'Attiva',
    isActive: true,
    utilities: [
      { utilityNumber: 'UT-015-2024', propertyTax: '4.000,00 €', cimasaCode: 'P2134' },
      { utilityNumber: 'UT-016-2024', propertyTax: '4.900,00 €', cimasaCode: 'P2135' }
    ]
  },
  {
    key: '9',
    grantType: 'Pubblico',
    issuingAuthority: 'Comune di Ragusa',
    registrationNumber: '47294664857',
    documentType: 'Atto Amministrativo',
    documentId: 'Pos. 74322 del 15/04/2004',
    totalPropertyTax: '9.999,99 €',
    status: 'Attiva',
    isActive: true,
    utilities: [
      { utilityNumber: 'UT-017-2024', propertyTax: '9.999,99 €', cimasaCode: 'Non specificata' }
    ]
  },
  {
    key: '10',
    grantType: 'Privato',
    issuingAuthority: 'Mauro Pezzati',
    registrationNumber: '47385377483',
    documentType: 'Contratto di Locazione',
    documentId: 'N. 74322 del 15/04/2004',
    totalPropertyTax: '10.500,00 €',
    status: 'Attiva',
    isActive: true,
    utilities: [
      { utilityNumber: 'UT-018-2024', propertyTax: '5.000,00 €', cimasaCode: 'P3456' },
      { utilityNumber: 'UT-019-2024', propertyTax: '3.500,00 €', cimasaCode: 'P3457' },
      { utilityNumber: 'UT-020-2024', propertyTax: '2.000,00 €', cimasaCode: 'Non specificata' }
    ]
  },
  {
    key: '11',
    grantType: 'Pubblico',
    issuingAuthority: 'Comune di Palermo',
    registrationNumber: '48395738274',
    documentType: 'Atto Amministrativo',
    documentId: 'Pos. 82145 del 22/08/2005',
    totalPropertyTax: '11.250,00 €',
    status: 'Attiva',
    isActive: true,
    utilities: [
      { utilityNumber: 'UT-021-2024', propertyTax: '6.000,00 €', cimasaCode: 'P4567' },
      { utilityNumber: 'UT-022-2024', propertyTax: '5.250,00 €', cimasaCode: 'P4568' }
    ]
  },
  {
    key: '12',
    grantType: 'Pubblico',
    issuingAuthority: 'Comune di Caltanissetta',
    registrationNumber: '49284738294',
    documentType: 'Determinazione Dirigenziale',
    documentId: 'Det. 93847 del 10/11/2006',
    totalPropertyTax: '12.400,00 €',
    status: 'Scaduta',
    isActive: false,
    utilities: [
      { utilityNumber: 'UT-023-2024', propertyTax: '7.200,00 €', cimasaCode: 'Non specificata' },
      { utilityNumber: 'UT-024-2024', propertyTax: '5.200,00 €', cimasaCode: 'P5678' }
    ]
  },
  {
    key: '13',
    grantType: 'Privato',
    issuingAuthority: 'Condominio \"Sole\"',
    registrationNumber: '50293847562',
    documentType: 'Delibera',
    documentId: 'N. 38475 del 18/03/2007',
    totalPropertyTax: '13.600,00 €',
    status: 'Attiva',
    isActive: true,
    utilities: [
      { utilityNumber: 'UT-025-2024', propertyTax: '13.600,00 €', cimasaCode: 'P6789' }
    ]
  },
  {
    key: '14',
    grantType: 'Pubblico',
    issuingAuthority: 'Comune di Marsala',
    registrationNumber: '51384756294',
    documentType: 'Atto Amministrativo',
    documentId: 'Pos. 47583 del 05/06/2008',
    totalPropertyTax: '14.750,00 €',
    status: 'Attiva',
    isActive: true,
    utilities: [
      { utilityNumber: 'UT-026-2024', propertyTax: '8.000,00 €', cimasaCode: 'Non specificata' },
      { utilityNumber: 'UT-027-2024', propertyTax: '4.000,00 €', cimasaCode: 'P7890' },
      { utilityNumber: 'UT-028-2024', propertyTax: '2.750,00 €', cimasaCode: 'P7891' }
    ]
  },
  {
    key: '15',
    grantType: 'Pubblico',
    issuingAuthority: 'Comune di Gela',
    registrationNumber: '52475836294',
    documentType: 'Atto Notarile',
    documentId: 'N. 65432 del 14/09/2009',
    totalPropertyTax: '15.900,00 €',
    status: 'Scaduta',
    isActive: false,
    utilities: [
      { utilityNumber: 'UT-029-2024', propertyTax: '9.500,00 €', cimasaCode: 'P8912' },
      { utilityNumber: 'UT-030-2024', propertyTax: '6.400,00 €', cimasaCode: 'Non specificata' }
    ]
  },
  {
    key: '16',
    grantType: 'Privato',
    issuingAuthority: 'Rossi Immobiliare S.r.l.',
    registrationNumber: '53584736291',
    documentType: 'Contratto di Locazione',
    documentId: 'N. 74829 del 20/12/2010',
    totalPropertyTax: '16.500,00 €',
    status: 'Attiva',
    isActive: true,
    utilities: [
      { utilityNumber: 'UT-031-2024', propertyTax: '8.500,00 €', cimasaCode: 'P9123' },
      { utilityNumber: 'UT-032-2024', propertyTax: '8.000,00 €', cimasaCode: 'P9124' }
    ]
  },
  {
    key: '17',
    grantType: 'Pubblico',
    issuingAuthority: 'Comune di Alcamo',
    registrationNumber: '54673829102',
    documentType: 'Determinazione Dirigenziale',
    documentId: 'Det. 58392 del 07/04/2011',
    totalPropertyTax: '17.800,00 €',
    status: 'Attiva',
    isActive: true,
    utilities: [
      { utilityNumber: 'UT-033-2024', propertyTax: '10.000,00 €', cimasaCode: 'P1234' },
      { utilityNumber: 'UT-034-2024', propertyTax: '4.800,00 €', cimasaCode: 'Non specificata' },
      { utilityNumber: 'UT-035-2024', propertyTax: '3.000,00 €', cimasaCode: 'P1236' }
    ]
  },
  {
    key: '18',
    grantType: 'Pubblico',
    issuingAuthority: 'Comune di Vittoria',
    registrationNumber: '55748392014',
    documentType: 'Atto Amministrativo',
    documentId: 'Pos. 69384 del 16/07/2012',
    totalPropertyTax: '18.900,00 €',
    status: 'Attiva',
    isActive: true,
    utilities: [
      { utilityNumber: 'UT-036-2024', propertyTax: '11.000,00 €', cimasaCode: 'P2345' },
      { utilityNumber: 'UT-037-2024', propertyTax: '7.900,00 €', cimasaCode: 'P2346' }
    ]
  },
  {
    key: '19',
    grantType: 'Privato',
    issuingAuthority: 'Condominio \"Mare\"',
    registrationNumber: '56839201475',
    documentType: 'Delibera',
    documentId: 'N. 81234 del 25/10/2013',
    totalPropertyTax: '19.500,00 €',
    status: 'Scaduta',
    isActive: false,
    utilities: [
      { utilityNumber: 'UT-038-2024', propertyTax: '19.500,00 €', cimasaCode: 'Non specificata' }
    ]
  },
  {
    key: '20',
    grantType: 'Pubblico',
    issuingAuthority: 'Comune di Bagheria',
    registrationNumber: '57920384756',
    documentType: 'Atto Amministrativo',
    documentId: 'Pos. 92847 del 08/01/2014',
    totalPropertyTax: '20.750,00 €',
    status: 'Attiva',
    isActive: true,
    utilities: [
      { utilityNumber: 'UT-039-2024', propertyTax: '12.000,00 €', cimasaCode: 'P3456' },
      { utilityNumber: 'UT-040-2024', propertyTax: '8.750,00 €', cimasaCode: 'Non specificata' }
    ]
  },
  {
    key: '21',
    grantType: 'Pubblico',
    issuingAuthority: 'Comune di Modica',
    registrationNumber: '58103948572',
    documentType: 'Determinazione Dirigenziale',
    documentId: 'Det. 73948 del 19/05/2015',
    totalPropertyTax: '21.900,00 €',
    status: 'Attiva',
    isActive: true,
    utilities: [
      { utilityNumber: 'UT-041-2024', propertyTax: '13.500,00 €', cimasaCode: 'P4567' },
      { utilityNumber: 'UT-042-2024', propertyTax: '5.400,00 €', cimasaCode: 'P4568' },
      { utilityNumber: 'UT-043-2024', propertyTax: '3.000,00 €', cimasaCode: 'Non specificata' }
    ]
  },
  {
    key: '22',
    grantType: 'Privato',
    issuingAuthority: 'Bianchi Giuseppe',
    registrationNumber: '59284756301',
    documentType: 'Contratto di Locazione',
    documentId: 'N. 64829 del 28/08/2016',
    totalPropertyTax: '22.500,00 €',
    status: 'Attiva',
    isActive: true,
    utilities: [
      { utilityNumber: 'UT-044-2024', propertyTax: '15.000,00 €', cimasaCode: 'P5678' },
      { utilityNumber: 'UT-045-2024', propertyTax: '7.500,00 €', cimasaCode: 'P5679' }
    ]
  },
  {
    key: '23',
    grantType: 'Pubblico',
    issuingAuthority: 'Comune di Acireale',
    registrationNumber: '60395847261',
    documentType: 'Atto Notarile',
    documentId: 'N. 85764 del 11/11/2017',
    totalPropertyTax: '23.800,00 €',
    status: 'Attiva',
    isActive: true,
    utilities: [
      { utilityNumber: 'UT-046-2024', propertyTax: '14.000,00 €', cimasaCode: 'Non specificata' },
      { utilityNumber: 'UT-047-2024', propertyTax: '9.800,00 €', cimasaCode: 'P6789' }
    ]
  },
  {
    key: '24',
    grantType: 'Pubblico',
    issuingAuthority: 'Comune di Mazara del Vallo',
    registrationNumber: '61485937402',
    documentType: 'Atto Amministrativo',
    documentId: 'Pos. 97562 del 23/02/2018',
    totalPropertyTax: '24.950,00 €',
    status: 'Attiva',
    isActive: true,
    utilities: [
      { utilityNumber: 'UT-048-2024', propertyTax: '16.000,00 €', cimasaCode: 'P7890' },
      { utilityNumber: 'UT-049-2024', propertyTax: '5.950,00 €', cimasaCode: 'P7891' },
      { utilityNumber: 'UT-050-2024', propertyTax: '3.000,00 €', cimasaCode: 'Non specificata' }
    ]
  },
  {
    key: '25',
    grantType: 'Privato',
    issuingAuthority: 'Condominio \"Giardino\"',
    registrationNumber: '62594837561',
    documentType: 'Delibera',
    documentId: 'N. 78453 del 05/06/2019',
    totalPropertyTax: '25.600,00 €',
    status: 'Attiva',
    isActive: true,
    utilities: [
      { utilityNumber: 'UT-051-2024', propertyTax: '25.600,00 €', cimasaCode: 'P8901' }
    ]
  }
];