import { useState } from 'react';
import { Layout, Typography, Tabs, Button, Avatar, Badge, Row, Col, Divider, Drawer, Modal, Carousel, Input, Space, Dropdown, App as AntApp, ConfigProvider, message as antdMessage, Tag } from 'antd';
import { BellOutlined, LeftOutlined, EditOutlined, ExpandOutlined, CopyOutlined, PlusOutlined, SaveOutlined } from '@ant-design/icons';
import { InfoCard } from './components/InfoCard';
import { EmptyState } from './components/EmptyState';
import { GrantsAccordion } from './components/GrantsAccordion';
import { AuthorizationsList } from './components/AuthorizationsList';
import { PermitCard } from './components/PermitCard';
import { grantsData } from './data/grantsData';
import { authorizationsData } from './data/authorizationsData';
import { carouselImages, coverImage } from './constants/carouselImages';
import logoImage from 'figma:asset/66d787a11db7280487f429c82ebd2e4e89827a47.png';
import amatLogo from 'figma:asset/64750b4a93ab8e1de18bcd0c03f4b303dc012351.png';
import mapMarker from 'figma:asset/777fe4d5a9a40bda4849dc9e349564d863af9baf.png';
import emptyStateImage from 'figma:asset/a9c8511acd372dfcc4460b33e276f84004257f9f.png';
import './index.css';

const { Header, Content } = Layout;
const { Title, Text } = Typography;

// Main application component
export default function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#3E00FB',
        },
      }}
    >
      <AntApp>
        <AppContent />
      </AntApp>
    </ConfigProvider>
  );
}

function AppContent() {
  const { modal, message } = AntApp.useApp();
  const [activeTab, setActiveTab] = useState('2');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerType, setDrawerType] = useState<'concessione' | 'autorizzazione' | null>(null);
  const [isReplaceMode, setIsReplaceMode] = useState(false);
  const [photoModalOpen, setPhotoModalOpen] = useState(false);
  const [mapModalOpen, setMapModalOpen] = useState(false);
  const [selectedRowKey, setSelectedRowKey] = useState<string | null>(null);
  const [selectedAuthKeys, setSelectedAuthKeys] = useState<string[]>([]);
  const [cimasaCode, setCimasaCode] = useState<string>('');
  const [tipoSuolo, setTipoSuolo] = useState<string>('Privato');
  const [progettista, setProgettista] = useState<string>('Studio Tecnico Associato Rossi & Partners');
  const [acciaoArmatura, setAcciaoArmatura] = useState<string>('8450C fa44a - ø12~16mm');
  const [accountNumber, setAccountNumber] = useState<string | null>(null);
  const [expirationDate, setExpirationDate] = useState<string | null>(null);
  const [currentGrantKey, setCurrentGrantKey] = useState<string | null>(null);
  const [addedPermits, setAddedPermits] = useState<Array<{
    id: string;
    permitType: 'concessione' | 'autorizzazione';
    documentType: string;
    documentId: string;
    accountNumber?: string;
    authorizationCategory?: 'Comunale' | 'Genio Civile';
    state: string;
    isActive: boolean;
  }>>([]);
  const [isEditingIdentityCard, setIsEditingIdentityCard] = useState(false);
  const [isEditingProject, setIsEditingProject] = useState(false);
  
  // Track modified fields
  const [modifiedFields, setModifiedFields] = useState<Set<string>>(new Set());
  const [originalValues, setOriginalValues] = useState<Record<string, string>>({
    cimasaCode: '',
    tipoSuolo: 'Privato',
    progettista: 'Studio Tecnico Associato Rossi & Partners',
    acciaoArmatura: '8450C fa44a - ø12~16mm'
  });
  
  // Handle input change and track modifications
  const handleInputChange = (fieldName: string, value: string) => {
    const newModifiedFields = new Set(modifiedFields);
    
    if (value !== originalValues[fieldName]) {
      newModifiedFields.add(fieldName);
    } else {
      newModifiedFields.delete(fieldName);
    }
    
    setModifiedFields(newModifiedFields);
    
    // Update the specific field value
    switch (fieldName) {
      case 'cimasaCode':
        setCimasaCode(value);
        break;
      case 'tipoSuolo':
        setTipoSuolo(value);
        break;
      case 'progettista':
        setProgettista(value);
        break;
      case 'acciaoArmatura':
        setAcciaoArmatura(value);
        break;
    }
  };
  
  // Function to close drawer and reset state
  const handleCloseDrawer = () => {
    setDrawerOpen(false);
    setSelectedRowKey(null);
    setSelectedAuthKeys([]);
    setIsReplaceMode(false);
  };
  
  const handleCopyCoordinates = () => {
    const text = 'Via Libertà, 36, Palermo (PA)';
    
    // Try modern clipboard API first
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text)
        .then(() => {
          message.success('Coordinate copiate con successo');
        })
        .catch(() => {
          // Fallback to legacy method
          fallbackCopyText(text);
        });
    } else {
      // Use legacy method
      fallbackCopyText(text);
    }
  };
  
  const fallbackCopyText = (text: string) => {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand('copy');
      message.success('Coordinate copiate con successo');
    } catch (err) {
      message.error('Impossibile copiare il testo');
    }
    textArea.remove();
  };
  
  // Function to add permit
  const handleAddPermit = () => {
    if (drawerType === 'autorizzazione') {
      // Handle authorizations - changed to single selection
      if (selectedAuthKeys.length === 0) {
        message.warning('Per favore seleziona un\'autorizzazione prima di continuare');
        return;
      }

      const newAuthorizations = selectedAuthKeys.map(authKey => {
        const auth = authorizationsData.find(a => a.key === authKey);
        if (!auth) return null;

        return {
          id: authKey,
          permitType: 'autorizzazione' as const,
          documentType: auth.authorizationCategory,
          documentId: auth.protocolNumber,
          authorizationCategory: auth.authorizationCategory,
          state: auth.status,
          isActive: auth.isActive
        };
      }).filter(a => a !== null);

      setAddedPermits([...addedPermits, ...newAuthorizations]);
      handleCloseDrawer();
      message.success(`Autorizzazione aggiunta con successo`);
      return;
    }

    // Handle concessione
    if (!selectedRowKey) {
      message.warning('Per favore seleziona un\'utenza prima di continuare');
      return;
    }

    // Find the selected grant and utility
    let selectedGrant: any = null;
    let selectedUtility: any = null;

    for (const grant of grantsData) {
      const utility = grant.utilities.find((u: any) => {
        const utilityKey = `${grant.key}-${u.utilityNumber}`;
        return utilityKey === selectedRowKey;
      });
      if (utility) {
        selectedGrant = grant;
        selectedUtility = utility;
        break;
      }
    }

    if (!selectedGrant || !selectedUtility) {
      return;
    }

    const newPermit = {
      id: selectedRowKey,
      permitType: 'concessione',
      documentType: selectedGrant.documentType,
      documentId: selectedGrant.documentId,
      accountNumber: selectedUtility.utilityNumber,
      state: selectedGrant.status || 'Attiva',
      isActive: selectedGrant.status === 'Attiva'
    };

    // If in replace mode, show confirmation modal
    if (isReplaceMode) {
      const oldUtilityNumber = accountNumber || 'N/D';
      const newUtilityNumber = selectedUtility.utilityNumber;
      const oldCimasaCode = cimasaCode || 'N/D';
      const newCimasaCode = (selectedUtility.cimasaCode && selectedUtility.cimasaCode !== 'Non specificata') ? selectedUtility.cimasaCode : 'N/D';

      modal.confirm({
        title: 'Conferma Sostituzione Concessione',
        icon: null,
        width: 520,
        centered: true,
        content: (
          <div style={{ marginTop: '16px' }}>
            <Text>Una volta confermato, il Numero Utenza e il Codice Cimasa verranno modificati come segue:</Text>
            <div style={{ 
              marginTop: '20px',
              padding: '16px',
              background: '#fafafa',
              borderRadius: '8px',
              border: '1px solid #f0f0f0'
            }}>
              <Row gutter={[16, 12]} key="modal-comparison-row">
                <Col span={8} key="modal-header-field">
                  <Text strong style={{ fontSize: '13px' }}>Campo</Text>
                </Col>
                <Col span={8} key="modal-header-old">
                  <Text strong style={{ fontSize: '13px' }}>Valore Precedente</Text>
                </Col>
                <Col span={8} key="modal-header-new">
                  <Text strong style={{ fontSize: '13px' }}>Nuovo Valore</Text>
                </Col>
                
                <Col span={24} key="modal-divider">
                  <Divider style={{ margin: '4px 0' }} />
                </Col>

                <Col span={8} key="modal-utility-label">
                  <Text style={{ fontSize: '13px' }}>Numero Utenza</Text>
                </Col>
                <Col span={8} key="modal-utility-old">
                  <Text style={{ fontSize: '13px', color: oldUtilityNumber === 'N/D' ? '#bfbfbf' : '#000' }}>
                    {oldUtilityNumber}
                  </Text>
                </Col>
                <Col span={8} key="modal-utility-new">
                  <Text style={{ fontSize: '13px', color: '#3E00FB', fontWeight: 500 }}>
                    {newUtilityNumber}
                  </Text>
                </Col>

                <Col span={8} key="modal-cimasa-label">
                  <Text style={{ fontSize: '13px' }}>Codice Cimasa</Text>
                </Col>
                <Col span={8} key="modal-cimasa-old">
                  <Text style={{ fontSize: '13px', color: oldCimasaCode === 'N/D' ? '#bfbfbf' : '#000' }}>
                    {oldCimasaCode}
                  </Text>
                </Col>
                <Col span={8} key="modal-cimasa-new">
                  <Text style={{ fontSize: '13px', color: newCimasaCode === 'N/D' ? '#bfbfbf' : '#3E00FB', fontWeight: newCimasaCode === 'N/D' ? 400 : 500 }}>
                    {newCimasaCode}
                  </Text>
                </Col>
              </Row>
            </div>
          </div>
        ),
        okText: 'Conferma Sostituzione',
        cancelText: 'Annulla',
        okButtonProps: {
          style: { backgroundColor: '#3E00FB' }
        },
        onOk: () => {
          // Proceed with replacement
          setAddedPermits([newPermit]);
          setAccountNumber(selectedUtility.utilityNumber);
          // Only set cimasa code if it exists and is not "Non specificata"
          setCimasaCode(
            selectedUtility.cimasaCode && selectedUtility.cimasaCode !== 'Non specificata'
              ? selectedUtility.cimasaCode
              : ''
          );
          setExpirationDate(selectedUtility.expirationDate || null);
          handleCloseDrawer();
          message.success('Concessione sostituita con successo');
        }
      });
    } else {
      // Add new permit without confirmation
      setAddedPermits([...addedPermits, newPermit]);
      setAccountNumber(selectedUtility.utilityNumber);
      // Only set cimasa code if it exists and is not "Non specificata"
      setCimasaCode(
        selectedUtility.cimasaCode && selectedUtility.cimasaCode !== 'Non specificata'
          ? selectedUtility.cimasaCode
          : ''
      );
      setExpirationDate(selectedUtility.expirationDate || null);
      handleCloseDrawer();
    }
  };
  
  // Function to remove permit
  const handleRemovePermit = (permitId: string) => {
    const permit = addedPermits.find(p => p.id === permitId);
    
    if (!permit) return;
    
    // Remove the permit (works for both concessione and autorizzazione)
    const updatedPermits = addedPermits.filter(p => p.id !== permitId);
    setAddedPermits(updatedPermits);
    
    // If it's a concessione, reset related fields
    if (permit.permitType === 'concessione') {
      setAccountNumber(null);
      setCimasaCode('');
      setExpirationDate(null);
      message.success('Concessione scollegata con successo');
    } else {
      message.success('Autorizzazione rimossa con successo');
    }
  };
  
  return (
    <>
      <Layout style={{ minHeight: '100vh', background: '#f5f5f5' }}>
        <Layout>
          {/* Header */}
          <Header style={{ 
            background: '#fff', 
            padding: '0 24px',
            borderBottom: '1px solid #f0f0f0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: '56px',
            position: 'sticky',
            top: 0,
            zIndex: 99
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <img src={logoImage} alt="GRAVITY" style={{ height: '24px' }} />
              </div>
              
              <Tabs 
                activeKey="header-tab-2"
                items={[
                  { key: 'header-tab-1', label: 'Panoramica' },
                  { key: 'header-tab-2', label: 'Inventario' }
                ]}
                style={{ marginBottom: 0 }}
              />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <Badge dot>
                <BellOutlined style={{ fontSize: '18px', color: '#595959' }} />
              </Badge>
              <Avatar size={32} src="https://i.pravatar.cc/150?img=33" />
            </div>
          </Header>

          <Content style={{ background: '#f5f5f5' }}>
            {/* Cover Image */}
            <div style={{ position: 'relative', height: '200px', overflow: 'hidden' }}>
              <div style={{ 
                height: '200px',
                background: `url(${coverImage}) center/cover`,
                position: 'relative'
              }}>
                <Button
                  style={{
                    position: 'absolute',
                    top: 16,
                    left: 16,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                  onClick={() => setPhotoModalOpen(true)}
                >
                  <ExpandOutlined style={{ fontSize: '12px' }} />
                  Visualizza Gallery
                </Button>
              </div>
            </div>

            {/* Main Content */}
            <div style={{ padding: '16px 24px' }}>
              {/* Single Large Container */}
              <div style={{ 
                background: 'white', 
                borderRadius: '8px',
                padding: '20px 24px',
                marginTop: '-80px',
                position: 'relative',
                zIndex: 10
              }}>
                {/* Header row with Back button, Title, and Actions */}
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center', 
                  marginBottom: '20px' 
                }}>
                  {/* Left: Back button */}
                  <div style={{ flex: 1 }}>
                    <Button type="link" icon={<LeftOutlined />} style={{ padding: 0, height: 'auto', color: '#3E00FB' }}>
                      Torna al Parco Impianti
                    </Button>
                  </div>
                  
                  {/* Center: Title and Tag */}
                  <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
                    <Title level={4} style={{ margin: 0 }}>Pensilina_LibertàPA01</Title>
                    <Tag color="green" style={{ border: '1px solid rgba(0, 0, 0, 0.1)' }}>OOH</Tag>
                  </div>
                  
                  {/* Right: New Event button */}
                  <div style={{ flex: 1, display: 'flex', gap: '12px', alignItems: 'center', justifyContent: 'flex-end' }}>
                    <Button icon={<EditOutlined />}>Modifica</Button>
                  </div>
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <Row gutter={24} key="main-info-row">
                    {/* Map section */}
                    <Col span={6} key="map-section" style={{ display: 'flex', flexDirection: 'column' }}>
                      <div 
                        style={{ 
                          flex: 1,
                          borderRadius: '8px',
                          position: 'relative',
                          overflow: 'hidden',
                          background: '#fafafa',
                          cursor: 'pointer',
                          boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.06)'
                        }}
                        onClick={() => setMapModalOpen(true)}
                      >
                        <iframe
                          width="100%"
                          height="100%"
                          style={{ 
                            border: 0, 
                            display: 'block',
                            filter: 'grayscale(1) brightness(1.1) contrast(0.9) hue-rotate(200deg) saturate(0.2)',
                            pointerEvents: 'none'
                          }}
                          src="https://www.openstreetmap.org/export/embed.html?bbox=13.3605%2C38.1252%2C13.3625%2C38.1262&layer=mapnik"
                          title="Mappa di Via Libertà, 36, Palermo"
                        />
                        <img 
                          src={mapMarker} 
                          alt="Marker" 
                          style={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -100%)',
                            width: '32px',
                            height: 'auto',
                            zIndex: 1000,
                            pointerEvents: 'none'
                          }}
                        />
                      </div>
                      <div style={{ 
                        marginTop: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                      }}>
                        <Text style={{ fontSize: '13px', color: '#000' }}>
                          Via Libertà, 36, Palermo (PA)
                        </Text>
                        <CopyOutlined 
                          style={{ fontSize: '16px', color: '#595959', cursor: 'pointer' }} 
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCopyCoordinates();
                          }} 
                        />
                      </div>
                    </Col>

                    {/* Info sections */}
                    <Col span={18} key="info-sections">
                      <Row gutter={[16, 16]} key="info-cards-row"> 
                        {/* Owner */}
                        <Col span={6} key="info-owner">
                          <InfoCard
                            title="Proprietario"
                            value={
                              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <div style={{
                                  width: '32px',
                                  height: '32px',
                                  borderRadius: '50%',
                                  backgroundColor: '#f5f5f5',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  overflow: 'hidden'
                                }}>
                                  <img src={amatLogo} alt="AMAT" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                </div>
                                <span style={{ fontSize: '14px' }}>AMAT S.p.A.</span>
                              </div>
                            }
                            subtitle="Fornito da terzi"
                          />
                        </Col>

                        {/* System Type */}
                        <Col span={6} key="info-system-type">
                          <InfoCard
                            title="Tipo Impianto"
                            value="Pensilina"
                            subtitle="4 facce"
                          />
                        </Col>

                        {/* Status */}
                        <Col span={6} key="info-status">
                          <InfoCard
                            title="Stato"
                            value={
                              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                <div style={{ 
                                  width: '10px', 
                                  height: '10px', 
                                  borderRadius: '50%', 
                                  backgroundColor: '#1890ff' 
                                }} />
                                <span>Attivo</span>
                              </div>
                            }
                            subtitle="Attivo dal 31/12/2025"
                          />
                        </Col>

                        {/* Price */}
                        <Col span={6} key="info-price">
                          <InfoCard
                            title="Prezzo Totale"
                            value="€1.450,00"
                            subtitle="Tariffa a quattordicina"
                          />
                        </Col>

                        {/* Cimasa Code */}
                        <Col span={6} key="info-cimasa">
                          <InfoCard
                            title="Codice Cimasa"
                            value={
                              cimasaCode ? (
                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                  <span>{cimasaCode}</span>
                                  <CopyOutlined style={{ fontSize: '14px', color: '#8c8c8c', cursor: 'pointer' }} />
                                </div>
                              ) : (
                                <span style={{ color: '#bfbfbf' }}>N/D</span>
                              )
                            }
                            subtitle={cimasaCode ? 'Fornito da permesso' : undefined}
                          />
                        </Col>

                        {/* Account Number */}
                        <Col span={6} key="info-account">
                          <InfoCard
                            title="Numero Utenza"
                            value={
                              accountNumber ? (
                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                  <span>{accountNumber}</span>
                                  <CopyOutlined style={{ fontSize: '14px', color: '#8c8c8c', cursor: 'pointer' }} />
                                </div>
                              ) : (
                                <span style={{ color: '#bfbfbf' }}>N/D</span>
                              )
                            }
                            subtitle={expirationDate ? `Scadenza: ${expirationDate}` : undefined}
                          />
                        </Col>

                        {/* Land */}
                        <Col span={6} key="info-land">
                          <InfoCard
                            title="Suolo"
                            value="Privato"
                            subtitle="Categoria: Speciale"
                          />
                        </Col>

                        {/* Area Code */}
                        <Col span={6} key="info-area">
                          <InfoCard
                            title="Codice Area"
                            value="2"
                            subtitle="Classe Municipale: II"
                          />
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </div>

                <Divider />

                {/* Tabs Section */}
                <div>
                  <Tabs
                    activeKey={activeTab}
                    onChange={setActiveTab}
                    items={[
                      { key: '1', label: 'Storico Eventi' },
                      { key: '2', label: 'Dati Amministrativi' },
                      { key: '3', label: 'Dati Tecnici' },
                      { key: '4', label: 'Cespiti e Dispositivi' },
                      { key: '5', label: 'Assegnazione Squadre' }
                    ]}
                  />

                  <div style={{ marginTop: '16px' }}>
                    {activeTab === '2' ? (
                      <>
                        {/* Land Section */}
                        <div style={{ marginBottom: '24px' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                            <Title level={5} style={{ margin: 0 }}>Scheda identificativa</Title>
                            {!isEditingIdentityCard ? (
                              <Button 
                                icon={<EditOutlined />} 
                                onClick={() => setIsEditingIdentityCard(true)}
                              >
                                Modifica
                              </Button>
                            ) : (
                              <Space>
                                <Button onClick={() => setIsEditingIdentityCard(false)}>
                                  Annulla
                                </Button>
                                <Button 
                                  type="primary" 
                                  icon={<SaveOutlined />}
                                  onClick={() => {
                                    setIsEditingIdentityCard(false);
                                    message.success('Modifiche salvate con successo');
                                  }}
                                >
                                  Salva
                                </Button>
                              </Space>
                            )}
                          </div>
                          <Row gutter={[16, 16]} key="identity-row">
                            <Col span={6} key="identity-cimasa">
                              <div key="identity-cimasa-wrapper" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                <Text type="secondary" style={{ fontSize: '13px' }}>Codice Cimasa</Text>
                                <Input 
                                  value={cimasaCode} 
                                  placeholder="N/D"
                                  readOnly={!isEditingIdentityCard}
                                  variant={isEditingIdentityCard ? "outlined" : "borderless"}
                                  onChange={(e) => handleInputChange('cimasaCode', e.target.value)}
                                  style={{ 
                                    cursor: isEditingIdentityCard ? 'text' : 'default',
                                    backgroundColor: '#fff',
                                    color: cimasaCode ? 'rgba(0, 0, 0, 0.85)' : '#bfbfbf'
                                  }} 
                                  className={`readonly-input ${modifiedFields.has('cimasaCode') ? 'input-modified' : ''}`}
                                />
                              </div>
                            </Col>
                            <Col span={6} key="identity-suolo">
                              <div key="identity-suolo-wrapper" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                <Text type="secondary" style={{ fontSize: '13px' }}>Tipo suolo</Text>
                                <Input 
                                  value={tipoSuolo} 
                                  readOnly={!isEditingIdentityCard}
                                  variant={isEditingIdentityCard ? "outlined" : "borderless"}
                                  onChange={(e) => handleInputChange('tipoSuolo', e.target.value)}
                                  style={{ 
                                    cursor: isEditingIdentityCard ? 'text' : 'default',
                                    backgroundColor: '#fff'
                                  }}
                                  className={`readonly-input ${modifiedFields.has('tipoSuolo') ? 'input-modified' : ''}`}
                                />
                              </div>
                            </Col>
                          </Row>
                        </div>

                        <Divider />

                        {/* Licenses Section */}
                        <div style={{ marginBottom: '24px' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                            <Title level={5}>Permessi</Title>
                            <Dropdown
                              menu={{
                                items: [
                                  {
                                    key: 'concessione',
                                    label: 'Collega Concessione',
                                    onClick: () => {
                                      setDrawerType('concessione');
                                      setDrawerOpen(true);
                                    }
                                  },
                                  {
                                    key: 'autorizzazione',
                                    label: 'Collega Autorizzazione',
                                    onClick: () => {
                                      setDrawerType('autorizzazione'); // Changed to open authorization drawer
                                      setDrawerOpen(true);
                                    }
                                  }
                                ]
                              }}
                              disabled={accountNumber !== null}
                            >
                              <Button 
                                icon={<PlusOutlined />}
                                disabled={accountNumber !== null}
                              />
                            </Dropdown>
                          </div>
                          {addedPermits.length > 0 ? (
                            <Row gutter={[16, 16]} key="permits-row">
                              {addedPermits.map((permit) => (
                                <Col span={8} key={permit.id}>
                                  <PermitCard
                                    permitType={permit.permitType}
                                    documentType={permit.documentType}
                                    documentId={permit.documentId}
                                    accountNumber={permit.accountNumber}
                                    authorizationCategory={permit.authorizationCategory}
                                    state={permit.state}
                                    isActive={permit.isActive}
                                    onReplace={() => {
                                      setDrawerType('concessione');
                                      setDrawerOpen(true);
                                      setIsReplaceMode(true);
                                    }}
                                    onRemove={() => handleRemovePermit(permit.id)}
                                  />
                                </Col>
                              ))}
                            </Row>
                          ) : (
                            <EmptyState 
                              message="Aggiungi un permesso per collegarlo all'impianto"
                              imageSrc={emptyStateImage}
                            />
                          )}
                        </div>

                        <Divider />

                        {/* Project Section */}
                        <div>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                            <Title level={5} style={{ margin: 0 }}>Progetto</Title>
                            {!isEditingProject ? (
                              <Button 
                                icon={<EditOutlined />} 
                                onClick={() => setIsEditingProject(true)}
                              >
                                Modifica
                              </Button>
                            ) : (
                              <Space>
                                <Button onClick={() => setIsEditingProject(false)}>
                                  Annulla
                                </Button>
                                <Button 
                                  type="primary" 
                                  icon={<SaveOutlined />}
                                  onClick={() => {
                                    setIsEditingProject(false);
                                    message.success('Modifiche salvate con successo');
                                  }}
                                >
                                  Salva
                                </Button>
                              </Space>
                            )}
                          </div>
                          <Row gutter={[24, 16]} key="project-section-row">
                            {/* Riga 1: Progettista, Geologo, D.L., C.S.E. */}
                            <Col span={6} key="project-progettista">
                              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                <Text type="secondary" style={{ fontSize: '13px' }}>Progettista</Text>
                                <Input 
                                  value={progettista}
                                  readOnly={!isEditingProject}
                                  variant={isEditingProject ? "outlined" : "borderless"}
                                  onChange={(e) => handleInputChange('progettista', e.target.value)}
                                  style={{ 
                                    cursor: isEditingProject ? 'text' : 'default',
                                    backgroundColor: '#fff'
                                  }} 
                                  className={`readonly-input ${modifiedFields.has('progettista') ? 'input-modified' : ''}`}
                                />
                              </div>
                            </Col>
                            <Col span={6} key="project-geologo">
                              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                <Text type="secondary" style={{ fontSize: '13px' }}>Geologo</Text>
                                <Input 
                                  defaultValue="Dott. Geol. Giuseppe Marino" 
                                  readOnly={!isEditingProject}
                                  variant={isEditingProject ? "outlined" : "borderless"}
                                  style={{ 
                                    cursor: isEditingProject ? 'text' : 'default',
                                    backgroundColor: '#fff'
                                  }} 
                                  className="readonly-input"
                                />
                              </div>
                            </Col>
                            <Col span={6} key="project-direttore-lavori">
                              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                <Text type="secondary" style={{ fontSize: '13px' }}>D.L. (Direttore Lavori)</Text>
                                <Input 
                                  defaultValue="Ing. Alessandro Bianchi" 
                                  readOnly={!isEditingProject}
                                  variant={isEditingProject ? "outlined" : "borderless"}
                                  style={{ 
                                    cursor: isEditingProject ? 'text' : 'default',
                                    backgroundColor: '#fff'
                                  }} 
                                  className="readonly-input"
                                />
                              </div>
                            </Col>
                            <Col span={6} key="project-cse">
                              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                <Text type="secondary" style={{ fontSize: '13px' }}>C.S.E. (Coordinatore Sicurezza Esecuzione)</Text>
                                <Input 
                                  defaultValue="Ing. Laura Conti" 
                                  readOnly={!isEditingProject}
                                  variant={isEditingProject ? "outlined" : "borderless"}
                                  style={{ 
                                    cursor: isEditingProject ? 'text' : 'default',
                                    backgroundColor: '#fff'
                                  }} 
                                  className="readonly-input"
                                />
                              </div>
                            </Col>

                            {/* Riga 2: Laboratorio, Tecniche utilizzate */}
                            <Col span={6} key="project-laboratorio">
                              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                <Text type="secondary" style={{ fontSize: '13px' }}>Laboratorio</Text>
                                <Input 
                                  defaultValue="Lab. Prova Materiali Sicilia - Cert. 2024/PA0145" 
                                  readOnly={!isEditingProject}
                                  variant={isEditingProject ? "outlined" : "borderless"}
                                  style={{ 
                                    cursor: isEditingProject ? 'text' : 'default',
                                    backgroundColor: '#fff'
                                  }} 
                                  className="readonly-input"
                                />
                              </div>
                            </Col>
                            <Col span={6} key="project-tecniche-utilizzate">
                              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                <Text type="secondary" style={{ fontSize: '13px' }}>Tecniche utilizzate</Text>
                                <Input 
                                  defaultValue="Fondazioni profonde, struttura in c.a." 
                                  readOnly={!isEditingProject}
                                  variant={isEditingProject ? "outlined" : "borderless"}
                                  style={{ 
                                    cursor: isEditingProject ? 'text' : 'default',
                                    backgroundColor: '#fff'
                                  }} 
                                  className="readonly-input"
                                />
                              </div>
                            </Col>

                            {/* Riga 3: Acciaio armatura, Acciaio strutturale, Calcestruzzo */}
                            <Col span={6} key="project-acciaio-armatura">
                              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                <Text type="secondary" style={{ fontSize: '13px' }}>Acciaio armatura</Text>
                                <Input 
                                  value={acciaoArmatura}
                                  readOnly={!isEditingProject}
                                  variant={isEditingProject ? "outlined" : "borderless"}
                                  onChange={(e) => handleInputChange('acciaoArmatura', e.target.value)}
                                  style={{ 
                                    cursor: isEditingProject ? 'text' : 'default',
                                    backgroundColor: '#fff'
                                  }} 
                                  className={`readonly-input ${modifiedFields.has('acciaoArmatura') ? 'input-modified' : ''}`}
                                />
                              </div>
                            </Col>
                            <Col span={6} key="project-acciaio-strutturale">
                              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                <Text type="secondary" style={{ fontSize: '13px' }}>Acciaio strutturale</Text>
                                <Input 
                                  defaultValue="S355JR - IPE 200" 
                                  readOnly={!isEditingProject}
                                  variant={isEditingProject ? "outlined" : "borderless"}
                                  style={{ 
                                    cursor: isEditingProject ? 'text' : 'default',
                                    backgroundColor: '#fff'
                                  }} 
                                  className="readonly-input"
                                />
                              </div>
                            </Col>
                            <Col span={6} key="project-calcestruzzo">
                              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                <Text type="secondary" style={{ fontSize: '13px' }}>Calcestruzzo</Text>
                                <Input 
                                  defaultValue="C30/37 - Rck 37 N/mm²" 
                                  readOnly={!isEditingProject}
                                  variant={isEditingProject ? "outlined" : "borderless"}
                                  style={{ 
                                    cursor: isEditingProject ? 'text' : 'default',
                                    backgroundColor: '#fff'
                                  }} 
                                  className="readonly-input"
                                />
                              </div>
                            </Col>

                            {/* Riga 4: Data installazione, Collaudatore */}
                            <Col span={6} key="project-data-installazione">
                              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                <Text type="secondary" style={{ fontSize: '13px' }}>Data installazione</Text>
                                <Input 
                                  defaultValue="20/11/2023" 
                                  readOnly={!isEditingProject}
                                  variant={isEditingProject ? "outlined" : "borderless"}
                                  style={{ 
                                    cursor: isEditingProject ? 'text' : 'default',
                                    backgroundColor: '#fff'
                                  }} 
                                  className="readonly-input"
                                />
                              </div>
                            </Col>
                            <Col span={6} key="project-collaudatore">
                              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                <Text type="secondary" style={{ fontSize: '13px' }}>Collaudatore</Text>
                                <Input 
                                  defaultValue="Ing. Stefano Messina" 
                                  readOnly={!isEditingProject}
                                  variant={isEditingProject ? "outlined" : "borderless"}
                                  style={{ 
                                    cursor: isEditingProject ? 'text' : 'default',
                                    backgroundColor: '#fff'
                                  }} 
                                  className="readonly-input"
                                />
                              </div>
                            </Col>
                          </Row>
                        </div>
                      </>
                    ) : (
                      <div style={{ minHeight: '400px' }}></div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </Content>
        </Layout>
      </Layout>

      {/* Drawer for adding Permesso */}
      <Drawer
        title={
          drawerType === 'concessione' 
            ? (isReplaceMode ? 'Sostituisci Concessione' : 'Collega Concessione')
            : 'Collega Autorizzazione'
        }
        placement="right"
        styles={{ 
          body: { padding: '24px' },
          wrapper: { width: '70%' }
        }}
        onClose={handleCloseDrawer}
        open={drawerOpen}
        extra={
          <div style={{ display: 'flex', gap: '12px' }}>
            <Button onClick={handleCloseDrawer}>Annulla</Button>
            <Button 
              type={
                (drawerType === 'concessione' && selectedRowKey) || 
                (drawerType === 'autorizzazione' && selectedAuthKeys.length > 0)
                  ? "primary" 
                  : "default"
              }
              icon={<PlusOutlined />}
              disabled={
                (drawerType === 'concessione' && !selectedRowKey) || 
                (drawerType === 'autorizzazione' && selectedAuthKeys.length === 0)
              }
              onClick={handleAddPermit}
            >
              Aggiungi
            </Button>
          </div>
        }
      >
        {drawerType === 'concessione' ? (
          <GrantsAccordion 
            data={grantsData}
            selectedRowKey={selectedRowKey}
            onRowSelect={setSelectedRowKey}
            currentGrantKey={currentGrantKey}
            isReplaceMode={isReplaceMode}
            currentUtilityId={addedPermits.length > 0 && addedPermits[0].permitType === 'concessione' ? addedPermits[0].id : null}
          />
        ) : (
          <AuthorizationsList
            data={authorizationsData}
            selectedKeys={selectedAuthKeys}
            onSelectionChange={setSelectedAuthKeys}
          />
        )}
      </Drawer>

      {/* Photo Gallery Modal */}
      <Modal
        title="Galleria Foto Impianto"
        open={photoModalOpen}
        onCancel={() => setPhotoModalOpen(false)}
        footer={null}
        width={800}
      >
        <Carousel autoplay arrows>
          {carouselImages.map((img, idx) => (
            <div key={`carousel-${idx}-${img.substring(0, 50)}`}>
              <div style={{ 
                height: '500px',
                background: `url(${img}) center/contain no-repeat`,
                backgroundColor: '#000'
              }} />
            </div>
          ))}
        </Carousel>
      </Modal>

      {/* Map Modal */}
      <Modal
        title="Mappa - Pensilina_LibertàPA01"
        open={mapModalOpen}
        onCancel={() => setMapModalOpen(false)}
        footer={null}
        width={1000}
        className="map-modal"
      >
        <div style={{ height: '600px', position: 'relative', borderRadius: '8px', overflow: 'hidden', background: '#fafafa' }}>
          <iframe
            width="100%"
            height="100%"
            style={{ 
              border: 0, 
              display: 'block',
              filter: 'grayscale(1) brightness(1.1) contrast(0.9) hue-rotate(200deg) saturate(0.2)',
            }}
            src="https://www.openstreetmap.org/export/embed.html?bbox=13.3595%2C38.1247%2C13.3635%2C38.1267&layer=mapnik"
            title="Mappa di Via Libertà, 36, Palermo"
          />
          <img 
            src={mapMarker} 
            alt="Marker" 
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -100%)',
              width: '48px',
              height: 'auto',
              zIndex: 1000,
              pointerEvents: 'none'
            }}
          />
        </div>
      </Modal>
    </>
  );
}