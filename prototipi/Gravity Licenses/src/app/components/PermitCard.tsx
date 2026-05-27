import { Card, Tag, Dropdown, Popconfirm } from 'antd';
import { MoreOutlined, FileTextOutlined, ThunderboltOutlined, EyeOutlined, SwapOutlined, DeleteOutlined, TagsOutlined } from '@ant-design/icons';

interface PermitCardProps {
  permitType: 'concessione' | 'autorizzazione';
  documentType: string;
  documentId: string;
  accountNumber?: string;
  authorizationCategory?: 'Comunale' | 'Genio Civile';
  state: string;
  isActive: boolean;
  onReplace?: () => void;
  onRemove?: () => void;
}

export function PermitCard({ permitType, documentType, documentId, accountNumber, authorizationCategory, state, isActive, onReplace, onRemove }: PermitCardProps) {
  // Build menu items based on permit type
  const menuItems = [
    {
      key: 'view',
      label: 'Visualizza',
      icon: <EyeOutlined />
    },
    // Only show "Sostituisci" for concessione
    ...(permitType === 'concessione' ? [{
      key: 'replace',
      label: 'Sostituisci',
      icon: <SwapOutlined />,
      onClick: onReplace
    }] : []),
    {
      key: 'remove',
      label: (
        <Popconfirm
          title="Rimuovi Autorizzazione"
          description="Sei sicuro di voler rimuovere questa autorizzazione?"
          onConfirm={(e) => {
            e?.stopPropagation();
            onRemove?.();
          }}
          okText="Rimuovi"
          cancelText="Annulla"
          okButtonProps={{ danger: true }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', width: '100%' }}>
            <DeleteOutlined />
            <span>Rimuovi</span>
          </div>
        </Popconfirm>
      ),
      danger: true
    }
  ];

  return (
    <Card
      style={{
        borderRadius: '8px',
        border: '1px solid #d9d9d9',
        marginBottom: '16px'
      }}
      styles={{ body: { padding: '16px 12px' } }}
    >
      {/* Header with Title and Document Info */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ fontSize: '13px', fontWeight: 600, color: 'rgba(0, 0, 0, 0.85)' }}>
            {permitType === 'concessione' ? 'Concessione' : 'Autorizzazione'}
          </span>
          <span style={{ color: 'rgba(0, 0, 0, 0.25)', fontSize: '13px' }}>|</span>
          <span style={{ fontSize: '13px', color: 'rgba(0, 0, 0, 0.85)' }}>
            Atto Amministrativo
          </span>
          <Tag style={{ 
            margin: 0, 
            border: '1px solid #d9d9d9',
            borderRadius: '4px',
            color: 'rgba(0, 0, 0, 0.65)',
            backgroundColor: '#fafafa',
            fontSize: '12px',
            padding: '2px 6px'
          }}>
            {documentId}
          </Tag>
        </div>
        <Dropdown menu={{ items: menuItems }} trigger={['click']}>
          <MoreOutlined style={{ fontSize: '16px', color: '#595959', cursor: 'pointer' }} />
        </Dropdown>
      </div>

      {/* Content: Typology (for autorizzazione), Account Number (for concessione) and State */}
      <div style={{ display: 'flex', alignItems: 'stretch' }}>
        {/* Typology - only for autorizzazione */}
        {permitType === 'autorizzazione' && authorizationCategory && (
          <>
            <div style={{ flex: 1 }}>
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '4px',
                marginBottom: '4px',
                color: 'rgba(0, 0, 0, 0.45)',
                fontSize: '13px'
              }}>
                <TagsOutlined style={{ fontSize: '14px' }} />
                <span>Tipologia:</span>
              </div>
              <div style={{ fontSize: '15px', color: 'rgba(0, 0, 0, 0.85)', fontWeight: 500 }}>
                {authorizationCategory}
              </div>
            </div>

            <div style={{ 
              width: '1px', 
              backgroundColor: '#f0f0f0', 
              margin: '0 12px',
              alignSelf: 'stretch'
            }} />
          </>
        )}

        {/* Account Number - only for concessione */}
        {permitType === 'concessione' && accountNumber && (
          <>
            <div style={{ flex: 1 }}>
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '4px',
                marginBottom: '4px',
                color: 'rgba(0, 0, 0, 0.45)',
                fontSize: '13px'
              }}>
                <FileTextOutlined style={{ fontSize: '14px' }} />
                <span>Numero Utenza:</span>
              </div>
              <div style={{ fontSize: '15px', color: 'rgba(0, 0, 0, 0.85)', fontWeight: 500 }}>
                {accountNumber}
              </div>
            </div>

            <div style={{ 
              width: '1px', 
              backgroundColor: '#f0f0f0', 
              margin: '0 12px',
              alignSelf: 'stretch'
            }} />
          </>
        )}

        {/* State */}
        <div style={{ flex: 1 }}>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '4px',
            marginBottom: '4px',
            color: 'rgba(0, 0, 0, 0.45)',
            fontSize: '13px'
          }}>
            <ThunderboltOutlined style={{ fontSize: '14px' }} />
            <span>Stato</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <div style={{ 
              width: '8px', 
              height: '8px', 
              borderRadius: '50%', 
              backgroundColor: isActive ? '#52c41a' : '#d9d9d9'
            }} />
            <span style={{ fontSize: '15px', color: 'rgba(0, 0, 0, 0.85)', fontWeight: 500 }}>
              {state}
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
}