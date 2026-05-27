import { Collapse, Tag, Pagination, Input, Checkbox } from 'antd';
import { DownOutlined, SearchOutlined, CheckCircleFilled } from '@ant-design/icons';
import { GrantData } from '../data/grantsData';
import type { CollapseProps } from 'antd';
import { useState, useEffect } from 'react';

interface GrantsAccordionProps {
  data: GrantData[];
  selectedRowKey: string | null;
  onRowSelect: (key: string) => void;
  currentGrantKey?: string | null;
  isReplaceMode?: boolean;
  currentUtilityId?: string | null;
}

const ITEMS_PER_PAGE = 10;

export function GrantsAccordion({ data, selectedRowKey, onRowSelect, currentGrantKey, isReplaceMode, currentUtilityId }: GrantsAccordionProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState('');
  const [pageSize, setPageSize] = useState(5);
  const [activeKeys, setActiveKeys] = useState<string[]>([]);

  // Set first accordion as open when data changes (when drawer opens)
  useEffect(() => {
    if (data.length > 0) {
      // If there's a current grant key, open that grant; otherwise open the first one
      const keyToOpen = currentGrantKey && data.some(g => g.key === currentGrantKey) 
        ? currentGrantKey 
        : data[0].key;
      setActiveKeys([keyToOpen]);
    }
  }, [data, currentGrantKey]);

  // Auto-select current utility in replace mode
  useEffect(() => {
    if (isReplaceMode && currentUtilityId && !selectedRowKey) {
      onRowSelect(currentUtilityId);
    }
  }, [isReplaceMode, currentUtilityId, selectedRowKey, onRowSelect]);

  const handleSelect = (key: string | null) => {
    onRowSelect(key);
  };

  // Filter data based on search text
  const filteredData = data.filter((grant) => {
    if (!searchText) return true;
    
    const searchLower = searchText.toLowerCase();
    
    // Search in grant fields
    const grantMatch = 
      grant.documentType.toLowerCase().includes(searchLower) ||
      grant.documentId.toLowerCase().includes(searchLower) ||
      grant.issuingAuthority.toLowerCase().includes(searchLower) ||
      (grant.issueDate && grant.issueDate.toLowerCase().includes(searchLower));
    
    // Search in utilities
    const utilityMatch = grant.utilities.some((utility) => 
      utility.utilityNumber.toLowerCase().includes(searchLower) ||
      utility.propertyTax.toLowerCase().includes(searchLower) ||
      (utility.connectedTo && utility.connectedTo.some((tag) => 
        tag.toLowerCase().includes(searchLower)
      ))
    );
    
    return grantMatch || utilityMatch;
  });

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedData = filteredData.slice(startIndex, endIndex);
  
  const items: CollapseProps['items'] = paginatedData.map((grant) => {
    // Check if any utility from this grant is selected
    const isGrantSelected = grant.utilities.some((utility) => {
      const utilityKey = `${grant.key}-${utility.utilityNumber}`;
      return selectedRowKey === utilityKey;
    });

    return {
      key: grant.key,
      label: (
        <div style={{ width: '100%', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
          <div style={{ flex: 1 }}>
            {/* First row: Document Type and ID */}
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '12px',
              fontSize: '14px',
              marginBottom: '8px'
            }}>
              <span style={{ fontWeight: 500, color: 'rgba(0, 0, 0, 0.85)' }}>
                {grant.documentType}
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
                {grant.documentId}
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
                <span style={{ color: 'rgba(0, 0, 0, 0.45)' }}>Tipo concessione:</span>{' '}
                <span style={{ color: 'rgba(0, 0, 0, 0.85)' }}>Pubblica</span>
              </span>
              <span>
                <span style={{ color: 'rgba(0, 0, 0, 0.45)' }}>Ente Emittente:</span>{' '}
                <span style={{ color: 'rgba(0, 0, 0, 0.85)' }}>{grant.issuingAuthority}</span>
              </span>
              <div style={{ fontSize: '12px', color: 'rgba(0, 0, 0, 0.45)', display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
                {grant.expirationDate && (
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ color: 'rgba(0, 0, 0, 0.45)' }}>Scadenza:</span>
                    <span style={{ color: 'rgba(0, 0, 0, 0.85)' }}>{grant.expirationDate}</span>
                  </span>
                )}
                {grant.status && (
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ color: 'rgba(0, 0, 0, 0.45)' }}>Stato:</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <div style={{ 
                        width: '6px', 
                        height: '6px', 
                        borderRadius: '50%', 
                        backgroundColor: grant.status === 'Attiva' ? '#52c41a' : '#ff4d4f'
                      }} />
                      <span style={{ color: 'rgba(0, 0, 0, 0.85)' }}>{grant.status}</span>
                    </div>
                  </span>
                )}
              </div>
            </div>
          </div>
          {isGrantSelected && (
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
              gridTemplateColumns: '2fr 2fr 2fr 4fr 40px',
              padding: '8px 16px',
              fontWeight: 500,
              fontSize: '12px',
              color: 'rgba(0, 0, 0, 0.65)',
              backgroundColor: '#fafafa',
              borderBottom: '1px solid #f0f0f0'
            }}>
              <div>Numero Utenza</div>
              <div>Codice Cimasa</div>
              <div>Canone Patrimoniale</div>
              <div>Aggiunta a:</div>
              <div></div>
            </div>

            {/* Table rows */}
            {grant.utilities && grant.utilities.length > 0 ? (
              grant.utilities.map((utility, index) => {
                const utilityKey = `${grant.key}-${utility.utilityNumber}`;
                const isSelected = selectedRowKey === utilityKey;
                
                return (
                  <div 
                    key={utilityKey}
                    style={{ 
                      display: 'grid',
                      gridTemplateColumns: '2fr 2fr 2fr 4fr 40px',
                      padding: '12px 16px',
                      borderBottom: index < grant.utilities.length - 1 ? '1px solid #f0f0f0' : 'none',
                      backgroundColor: isSelected ? '#f9f7ff' : 'transparent',
                      cursor: 'pointer',
                      transition: 'background-color 0.2s',
                      alignItems: 'center'
                    }}
                    onClick={() => {
                      if (isSelected) {
                        handleSelect(null);
                      } else {
                        handleSelect(utilityKey);
                      }
                    }}
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
                      {utility.utilityNumber}
                    </div>
                    <div style={{ fontSize: '13px', color: utility.cimasaCode === 'Non specificata' || !utility.cimasaCode ? '#bfbfbf' : 'rgba(0, 0, 0, 0.85)' }}>
                      {utility.cimasaCode && utility.cimasaCode !== 'Non specificata' ? utility.cimasaCode : 'N/D'}
                    </div>
                    <div style={{ fontSize: '13px', color: 'rgba(0, 0, 0, 0.85)' }}>
                      {utility.propertyTax} / anno
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
                      {utility.connectedTo && utility.connectedTo.length > 0 ? (
                        utility.connectedTo.map((tag, idx) => (
                          <Tag 
                            key={`${utilityKey}-tag-${idx}`}
                            style={{ 
                              margin: 0,
                              border: '1px solid #d9d9d9',
                              borderRadius: '4px',
                              fontSize: '12px',
                              padding: '2px 8px'
                            }}
                          >
                            {tag}
                          </Tag>
                        ))
                      ) : (
                        <span style={{ color: 'rgba(0, 0, 0, 0.45)', fontSize: '13px' }}>
                          Nessun impianto aggiunto
                        </span>
                      )}
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                      <Checkbox 
                        checked={isSelected}
                        onChange={(e) => {
                          e.stopPropagation();
                          if (isSelected) {
                            handleSelect(null); // Deselect if already selected
                          } else {
                            handleSelect(utilityKey);
                          }
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
                Nessuna utenza disponibile
              </div>
            )}
          </div>
        </div>
      ),
      className: isGrantSelected ? 'grant-selected' : '',
    };
  });

  return (
    <div>
      <style>{`
        .grant-selected > .ant-collapse-header {
          background-color: #f9f7ff !important;
        }
      `}</style>
      
      {/* Search bar */}
      <Input
        placeholder="Cerca concessione..."
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
        Seleziona una concessione e scegli il numero utenza che vuoi collegare all'impianto
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