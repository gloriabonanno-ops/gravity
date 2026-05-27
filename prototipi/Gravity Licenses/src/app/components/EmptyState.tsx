export function EmptyState({ 
  message,
  imageSrc
}: { 
  message: string;
  imageSrc?: string;
}) {
  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center',
      padding: '48px 24px',
      textAlign: 'center'
    }}>
      {imageSrc && (
        <img 
          src={imageSrc} 
          alt="Empty state" 
          style={{ 
            width: '200px', 
            height: 'auto', 
            marginBottom: '16px' 
          }} 
        />
      )}
      <div style={{ fontSize: '14px', color: '#8c8c8c' }}>
        {message}
      </div>
    </div>
  );
}