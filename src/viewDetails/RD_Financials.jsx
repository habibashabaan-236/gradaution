import React from 'react';

function RD_Financials({ billing, assignment }) {
  const netAmount = (billing?.subtotal || 0) - (billing?.deposit || 0);
  return (
    <div className="mt-4 pt-3 border-top">
      <div className="row mb-3 text-center small text-muted">
        <div className="col-4 border-start">المسؤول: <strong>{assignment?.staffName}</strong></div>
        <div className="col-4 border-start">التخصص: <strong>{assignment?.dept}</strong></div>
        <div className="col-4">المستوى: <span className="badge bg-warning text-dark">{assignment?.priority}</span></div>
      </div>
      
      <div className="d-flex justify-content-end">
        <div style={{ minWidth: '260px' }}>
          <div className="d-flex justify-content-between small mb-1"><span>تكلفة الخدمة:</span><span>{billing?.subtotal} ج.م</span></div>
          <div className="d-flex justify-content-between small mb-3 text-muted"><span>دفع مسبق:</span><span>{billing?.deposit} ج.م</span></div>
          <div className="p-3 bg-primary text-white rounded-3 text-center shadow">
            <small className="d-block mb-1">صافي المبلغ المستحق</small>
            <div className="h4 mb-0 fw-bold">{netAmount} ج.م</div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default RD_Financials;