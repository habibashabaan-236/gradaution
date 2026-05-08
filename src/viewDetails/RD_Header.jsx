import React from 'react';
import { QrCode } from 'lucide-react';

function RD_Header({ brandName, ticketId, subtitle }) {
  return (
    <div className="d-flex justify-content-between align-items-start mb-4 border-bottom pb-3">
      <div className="text-center">
        <div className="bg-light p-2 border rounded">
          <QrCode size={55} color="#2563eb" />
        </div>
        <small className="text-muted d-block mt-1" style={{ fontSize: '10px' }}>تتبع الحالة</small>
      </div>
      <div className="text-start">
        <h4 className="fw-bold mb-0" style={{ color: '#2563eb' }}>{brandName || "مركز الصيانة"}</h4>
        <p className="text-muted small mb-2">{subtitle}</p>
        <div className="badge bg-light text-dark border">رقم الإيصال: {ticketId}</div>
      </div>
    </div>
  );
}
export default RD_Header;