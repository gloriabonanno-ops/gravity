import { Input, Typography } from 'antd';

const { Text } = Typography;

interface ReadOnlyFieldProps {
  label: string;
  value: string;
}

export function ReadOnlyField({ label, value }: ReadOnlyFieldProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <Text type="secondary" style={{ fontSize: '13px' }}>{label}</Text>
      <Input 
        defaultValue={value} 
        readOnly 
        style={{ 
          cursor: 'default',
          backgroundColor: '#fff'
        }} 
        className="readonly-input"
      />
    </div>
  );
}
