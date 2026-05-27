export interface AuthorizationData {
  key: string;
  authorizationCategory: 'Autorizzazione Comunale' | 'Genio Civile';
  issuingAuthority: string;
  protocolNumber: string;
  stipulationDate?: string;
  expirationDate: string;
  cup: string;
  status: string;
  isActive: boolean;
}

export const authorizationsData: AuthorizationData[] = [
  {
    key: '1',
    authorizationCategory: 'Autorizzazione Comunale',
    issuingAuthority: 'Comune di Palermo',
    protocolNumber: 'Prot. 23456/2023',
    stipulationDate: '15/01/2023',
    expirationDate: '30/06/2025',
    cup: 'J39D23000450001',
    status: 'Attiva',
    isActive: true
  },
  {
    key: '2',
    authorizationCategory: 'Autorizzazione Comunale',
    issuingAuthority: 'Soprintendenza Belle Arti',
    protocolNumber: 'Prot. 34567/2022',
    stipulationDate: '10/03/2022',
    expirationDate: '15/03/2024',
    cup: 'J38C22001230001',
    status: 'Scaduta',
    isActive: false
  },
  {
    key: '3',
    authorizationCategory: 'Autorizzazione Comunale',
    issuingAuthority: 'Comando Provinciale VVF Palermo',
    protocolNumber: 'Prot. 45678/2023',
    stipulationDate: '05/06/2023',
    expirationDate: '20/09/2025',
    cup: 'J37D23000890002',
    status: 'Attiva',
    isActive: true
  },
  {
    key: '4',
    authorizationCategory: 'Autorizzazione Comunale',
    issuingAuthority: 'ARPA Sicilia',
    protocolNumber: 'Prot. 56789/2023',
    stipulationDate: '20/08/2023',
    expirationDate: '31/12/2027',
    cup: 'J36D23001120003',
    status: 'Attiva',
    isActive: true
  },
  {
    key: '5',
    authorizationCategory: 'Autorizzazione Comunale',
    issuingAuthority: 'E-Distribuzione',
    protocolNumber: 'Prot. 67890/2022',
    stipulationDate: '12/11/2022',
    expirationDate: '28/02/2025',
    cup: 'J35C22000780004',
    status: 'Attiva',
    isActive: true
  },
  {
    key: '6',
    authorizationCategory: 'Autorizzazione Comunale',
    issuingAuthority: 'Comune di Palermo',
    protocolNumber: 'Prot. 78901/2021',
    stipulationDate: '18/09/2021',
    expirationDate: '10/01/2024',
    cup: 'J35C21000340004',
    status: 'Scaduta',
    isActive: false
  },
  {
    key: '7',
    authorizationCategory: 'Autorizzazione Comunale',
    issuingAuthority: 'Città Metropolitana di Palermo',
    protocolNumber: 'Prot. 89012/2023',
    stipulationDate: '22/04/2023',
    expirationDate: '31/08/2026',
    cup: 'J34D23000670005',
    status: 'Attiva',
    isActive: true
  },
  {
    key: '8',
    authorizationCategory: 'Autorizzazione Comunale',
    issuingAuthority: 'Comune di Palermo',
    protocolNumber: 'Prot. 01234/2024',
    stipulationDate: '08/01/2024',
    expirationDate: '15/05/2024',
    cup: 'J33C24000120007',
    status: 'Scaduta',
    isActive: false
  },
  {
    key: '9',
    authorizationCategory: 'Genio Civile',
    issuingAuthority: 'Ufficio del Genio Civile di Palermo',
    protocolNumber: 'Prot. 11223/2023',
    stipulationDate: '30/05/2023',
    expirationDate: '31/12/2026',
    cup: 'J33D23000920006',
    status: 'Attiva',
    isActive: true
  }
];