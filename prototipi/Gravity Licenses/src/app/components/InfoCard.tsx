import { Typography } from 'antd';
import { ReactNode } from 'react';

const { Text } = Typography;

interface InfoCardProps {
  title: string;
  value: ReactNode;
  subtitle?: string;
}

export function InfoCard({ title, value, subtitle }: InfoCardProps) {
  return (
    <div style={{ 
      border: '1px solid #e8e8e8', 
      borderRadius: '6px', 
      padding: '12px',
      height: '100px',
      background: '#fff',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between'
    }}>
      <div>
        <Text style={{ fontSize: '12px', display: 'block', marginBottom: '6px', color: '#000', fontWeight: 600 }}>
          {title}
        </Text>
        <div style={{ fontSize: '16px', fontWeight: 500, lineHeight: '1.3' }}>
          {value}
        </div>
      </div>
      {subtitle && (
        <Text type="secondary" style={{ fontSize: '11px', display: 'block', marginTop: 'auto', paddingTop: '4px' }}>
          {subtitle}
        </Text>
      )}
    </div>
  );
}