import { Checkbox, Input, Switch, Tag } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { AuthorizationData } from '../data/authorizationsData';
import { useState, useMemo } from 'react';

interface AuthorizationsListProps {
  data: AuthorizationData[];
  selectedKeys: string[];
  onSelectionChange: (keys: string[]) => void;
}

export function AuthorizationsList({ data, selectedKeys, onSelectionChange }: AuthorizationsListProps) {
  const [searchText, setSearchText] = useState('');
  const [showOnlySelected, setShowOnlySelected] = useState(false);

  const handleToggle = (key: string) => {
    if (selectedKeys.includes(key)) {
      onSelectionChange(selectedKeys.filter(k => k !== key));
    } else {
      onSelectionChange([...selectedKeys, key]);
    }
  };

  // Filter data based on search text
  const filteredData = useMemo(() => {
    let result = data;

    // Apply search filter
    if (searchText) {
      const searchLower = searchText.toLowerCase();
      result = result.filter((auth) =>
        auth.authorizationCategory.toLowerCase().includes(searchLower) ||
        auth.issuingAuthority.toLowerCase().includes(searchLower) ||
        auth.protocolNumber.toLowerCase().includes(searchLower) ||
        (auth.expirationDate && auth.expirationDate.toLowerCase().includes(searchLower))
      );
    }

    // Apply "show only selected" filter
    if (showOnlySelected) {
      result = result.filter((auth) => selectedKeys.includes(auth.key));
    }

    return result;
  }, [data, searchText, showOnlySelected, selectedKeys]);

  return (
    <div>
      {/* Intro text */}
      <div style={{ 
        marginBottom: '16px',
        padding: '12px 16px',
        backgroundColor: '#f6f7f9',
        borderRadius: '6px',
        fontSize: '13px',
        color: 'rgba(0, 0, 0, 0.65)',
        lineHeight: '1.5'
      }}>
        Seleziona tutte le autorizzazioni da collegare a questo impianto
      </div>
      
      {/* Search bar */}
      <Input
        placeholder="Cerca autorizzazione"
        prefix={<SearchOutlined style={{ color: 'rgba(0, 0, 0, 0.45)' }} />}
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        style={{ marginBottom: '16px' }}
        allowClear
      />
      
      {/* Total count and filter switch */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: '16px'
      }}>
        <div style={{ fontSize: '14px' }}>
          <span style={{ fontWeight: 600 }}>Totale:</span> {filteredData.length}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '13px', color: 'rgba(0, 0, 0, 0.65)' }}>Mostra solo i selezionati</span>
          <Switch 
            size="small"
            checked={showOnlySelected}
            onChange={setShowOnlySelected}
          />
        </div>
      </div>
      
      {/* List of authorizations */}
      <div style={{ 
        border: '1px solid #d9d9d9',
        borderRadius: '6px',
        overflow: 'hidden'
      }}>
        {filteredData.length > 0 ? (
          filteredData.map((auth, index) => {
            const isSelected = selectedKeys.includes(auth.key);
            
            return (
              <div 
                key={auth.key}
                style={{ 
                  padding: '16px',
                  borderBottom: index < filteredData.length - 1 ? '1px solid #f0f0f0' : 'none',
                  backgroundColor: isSelected ? '#f9f7ff' : 'transparent',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s',
                  display: 'flex',
                  alignItems: 'flex-start',
                  justifyContent: 'space-between',
                  gap: '16px'
                }}
                onClick={() => handleToggle(auth.key)}
                onMouseEnter={(e) => {
                  if (!isSelected) {
                    e.currentTarget.style.backgroundColor = '#fafafa';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isSelected) {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }
                }}
              >
                <div style={{ flex: 1 }}>
                  {/* First row: Authorization Category and Protocol Number */}
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '12px',
                    fontSize: '14px',
                    marginBottom: '8px'
                  }}>
                    <span style={{ fontWeight: 500, color: 'rgba(0, 0, 0, 0.85)' }}>
                      {auth.authorizationCategory}
                    </span>
                    <Tag style={{ 
                      margin: 0, 
                      border: '1px solid #d9d9d9',
                      borderRadius: '4px',
                      color: 'rgba(0, 0, 0, 0.65)',
                      backgroundColor: '#fafafa',
                      fontSize: '13px',
                      padding: '2px 8px'
                    }}>
                      {auth.protocolNumber}
                    </Tag>
                  </div>
                  
                  {/* Second row: Metadata */}
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '24px',
                    fontSize: '12px',
                    color: 'rgba(0, 0, 0, 0.45)',
                    flexWrap: 'wrap'
                  }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span>Ente Emittente:</span>
                      <span style={{ color: 'rgba(0, 0, 0, 0.85)' }}>{auth.issuingAuthority}</span>
                    </span>
                    {auth.stipulationDate && (
                      <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span>Data Stipula:</span>
                        <span style={{ color: 'rgba(0, 0, 0, 0.85)' }}>{auth.stipulationDate}</span>
                      </span>
                    )}
                    {auth.expirationDate && (
                      <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span>Data Scadenza:</span>
                        <span style={{ color: 'rgba(0, 0, 0, 0.85)' }}>{auth.expirationDate}</span>
                      </span>
                    )}
                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span>CUP:</span>
                      <span style={{ color: 'rgba(0, 0, 0, 0.85)' }}>{auth.cup}</span>
                    </span>
                  </div>
                </div>
                
                <div style={{ display: 'flex', alignItems: 'flex-start', paddingTop: '2px' }}>
                  <Checkbox 
                    checked={isSelected}
                    onChange={(e) => {
                      e.stopPropagation();
                      handleToggle(auth.key);
                    }}
                  />
                </div>
              </div>
            );
          })
        ) : (
          <div style={{ 
            padding: '24px 16px', 
            textAlign: 'center',
            color: 'rgba(0, 0, 0, 0.45)',
            fontSize: '13px'
          }}>
            {showOnlySelected 
              ? 'Nessuna autorizzazione selezionata'
              : 'Nessuna autorizzazione disponibile'
            }
          </div>
        )}
      </div>
    </div>
  );
}