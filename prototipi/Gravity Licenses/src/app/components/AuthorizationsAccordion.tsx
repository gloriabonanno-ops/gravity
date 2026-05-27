import { Collapse, Tag, Pagination, Input, Checkbox } from 'antd';
import { DownOutlined, SearchOutlined, CheckCircleFilled } from '@ant-design/icons';
import { AuthorizationData } from '../data/authorizationsData';
import type { CollapseProps } from 'antd';
import { useState, useEffect } from 'react';

interface AuthorizationsAccordionProps {
  data: AuthorizationData[];
  selectedKeys: string[];
  onSelectionChange: (keys: string[]) => void;
}

export function AuthorizationsAccordion({ data, selectedKeys, onSelectionChange }: AuthorizationsAccordionProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState('');
  const [pageSize, setPageSize] = useState(5);
  const [activeKeys, setActiveKeys] = useState<string[]>([]);

  // Set first accordion as open when data changes (when drawer opens)
  useEffect(() => {
    if (data.length > 0) {
      setActiveKeys([data[0].key]);
    }
  }, [data]);

  const handleSelect = (key: string) => {
    if (selectedKeys.includes(key)) {
      onSelectionChange([]); // Deselect
    } else {
      onSelectionChange([key]); // Single selection only
    }
  };

  // Filter data based on search text
  const filteredData = data.filter((auth) => {
    if (!searchText) return true;
    
    const searchLower = searchText.toLowerCase();
    
    return (
      auth.authorizationCategory.toLowerCase().includes(searchLower) ||
      auth.issuingAuthority.toLowerCase().includes(searchLower) ||
      auth.protocolNumber.toLowerCase().includes(searchLower) ||
      (auth.expirationDate && auth.expirationDate.toLowerCase().includes(searchLower)) ||
      auth.status.toLowerCase().includes(searchLower)
    );
  });

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedData = filteredData.slice(startIndex, endIndex);
  
  const items: CollapseProps['items'] = paginatedData.map((auth) => {
    const isSelected = selectedKeys.includes(auth.key);

    return {
      key: auth.key,
      label: (
        <div style={{ width: '100%', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
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
              fontSize: '13px'
            }}>
              <span>
                <span style={{ color: 'rgba(0, 0, 0, 0.45)' }}>Ente Emittente:</span>{' '}
                <span style={{ color: 'rgba(0, 0, 0, 0.85)' }}>{auth.issuingAuthority}</span>
              </span>
              <div style={{ fontSize: '12px', color: 'rgba(0, 0, 0, 0.45)', display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
                {auth.expirationDate && (
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ color: 'rgba(0, 0, 0, 0.45)' }}>Scadenza:</span>
                    <span style={{ color: 'rgba(0, 0, 0, 0.85)' }}>{auth.expirationDate}</span>
                  </span>
                )}
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ color: 'rgba(0, 0, 0, 0.45)' }}>Stato:</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <div style={{ 
                      width: '6px', 
                      height: '6px', 
                      borderRadius: '50%', 
                      backgroundColor: auth.isActive ? '#52c41a' : '#ff4d4f'
                    }} />
                    <span style={{ color: 'rgba(0, 0, 0, 0.85)' }}>{auth.status}</span>
                  </div>
                </span>
              </div>
            </div>
          </div>
          {isSelected && (
            <div style={{ 
              paddingTop: '2px', 
              paddingLeft: '16px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '13px',
              color: '#3E00FB',
              fontWeight: 500
            }}>
              <CheckCircleFilled style={{ fontSize: '16px' }} />
              <span>Selezionata</span>
            </div>
          )}
        </div>
      ),
      children: (
        <div style={{ padding: '8px 0' }}>
          {/* Table with border */}
          <div style={{ 
            border: '1px solid #d9d9d9',
            borderRadius: '6px',
            overflow: 'hidden'
          }}>
            {/* Table header */}
            <div style={{ 
              display: 'grid',
              gridTemplateColumns: '3fr 3fr 2fr 2fr 40px',
              padding: '8px 16px',
              fontWeight: 500,
              fontSize: '12px',
              color: 'rgba(0, 0, 0, 0.65)',
              backgroundColor: '#fafafa',
              borderBottom: '1px solid #f0f0f0'
            }}>
              <div>Tipo Autorizzazione</div>
              <div>Ente Emittente</div>
              <div>Numero Protocollo</div>
              <div>Data Scadenza</div>
              <div></div>
            </div>

            {/* Table row */}
            <div 
              style={{ 
                display: 'grid',
                gridTemplateColumns: '3fr 3fr 2fr 2fr 40px',
                padding: '12px 16px',
                backgroundColor: isSelected ? '#f9f7ff' : 'transparent',
                cursor: 'pointer',
                transition: 'background-color 0.2s',
                alignItems: 'center'
              }}
              onClick={() => handleSelect(auth.key)}
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
              <div style={{ fontSize: '13px', color: 'rgba(0, 0, 0, 0.85)' }}>
                {auth.authorizationCategory}
              </div>
              <div style={{ fontSize: '13px', color: 'rgba(0, 0, 0, 0.85)' }}>
                {auth.issuingAuthority}
              </div>
              <div style={{ fontSize: '13px', color: 'rgba(0, 0, 0, 0.65)' }}>
                {auth.protocolNumber}
              </div>
              <div style={{ fontSize: '13px', color: auth.expirationDate ? 'rgba(0, 0, 0, 0.85)' : '#bfbfbf' }}>
                {auth.expirationDate || 'N/D'}
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Checkbox 
                  checked={isSelected}
                  onChange={(e) => {
                    e.stopPropagation();
                    handleSelect(auth.key);
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      ),
      className: isSelected ? 'auth-selected' : '',
    };
  });

  return (
    <div>
      <style>{`
        .auth-selected > .ant-collapse-header {
          background-color: #f9f7ff !important;
        }
      `}</style>
      
      {/* Search bar */}
      <Input
        placeholder="Cerca autorizzazione..."
        prefix={<SearchOutlined style={{ color: 'rgba(0, 0, 0, 0.45)' }} />}
        value={searchText}
        onChange={(e) => {
          setSearchText(e.target.value);
          setCurrentPage(1); // Reset to first page on search
        }}
        style={{ marginBottom: '16px' }}
        allowClear
      />
      
      {/* Helper text */}
      <div style={{ 
        marginBottom: '16px',
        padding: '12px 16px',
        backgroundColor: '#f6f7f9',
        borderRadius: '6px',
        fontSize: '13px',
        color: 'rgba(0, 0, 0, 0.65)',
        lineHeight: '1.5'
      }}>
        Seleziona un'autorizzazione da collegare all'impianto
      </div>
      
      <Collapse 
        items={items}
        expandIcon={({ isActive }) => (
          <DownOutlined 
            rotate={isActive ? 180 : 0} 
            style={{ fontSize: '10px', color: 'rgba(0, 0, 0, 0.45)' }}
          />
        )}
        ghost={false}
        style={{
          backgroundColor: '#fff',
          border: '1px solid #d9d9d9',
          borderRadius: '6px'
        }}
        activeKey={activeKeys}
        onChange={(keys) => setActiveKeys(keys as string[])}
      />
      
      {filteredData.length > 0 && (
        <div style={{ 
          display: 'flex', 
          justifyContent: 'flex-end', 
          padding: '16px 0',
          borderTop: '1px solid #f0f0f0',
          marginTop: '16px'
        }}>
          <Pagination
            current={currentPage}
            total={filteredData.length}
            pageSize={pageSize}
            onChange={(page) => setCurrentPage(page)}
            onShowSizeChange={(_, size) => {
              setPageSize(size);
              setCurrentPage(1);
            }}
            showSizeChanger={true}
            pageSizeOptions={['5', '10', '20', '50']}
            size="small"
          />
        </div>
      )}
    </div>
  );
}
