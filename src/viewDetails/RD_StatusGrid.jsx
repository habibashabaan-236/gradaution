import React from 'react';

function RD_StatusGrid({ timeline, currentPhase, docRef }) {
  return (
    <div className="row g-0 text-center py-3 bg-light rounded shadow-sm border">
      {timeline?.map((item, index) => (
        <div key={index} className="col-3 border-start">
          <small className="text-muted d-block">{item.label}</small>
          <strong className="small">{item.date}</strong>
        </div>
      ))}
      <div className="col-3 border-start">
        <small className="text-muted d-block">الحالة</small>
        <strong className="small text-primary">{currentPhase}</strong>
      </div>
      <div className="col-3">
        <small className="text-muted d-block">المرجع</small>
        <strong className="small text-secondary">{docRef}</strong>
      </div>
    </div>
  );
}
export default RD_StatusGrid;