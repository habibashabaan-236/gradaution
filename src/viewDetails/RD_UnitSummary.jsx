import React from 'react';
import { TabletSmartphone } from 'lucide-react';

function RD_UnitSummary({ unitInfo }) {
  return (
    <div className="p-2 h-100">
      <h6 className="text-primary border-bottom pb-2 mb-3 d-flex align-items-center gap-2">
        <TabletSmartphone size={18} /> تفاصيل الوحدة
      </h6>
      <div className="small mb-2">الموديل: <span className="fw-bold">{unitInfo?.model}</span></div>
      <div className="p-2 rounded" style={{ backgroundColor: '#fff5f5', borderRight: '4px solid #ef4444' }}>
        <small className="text-danger fw-bold">الشكوى: {unitInfo?.faultDesc}</small>
      </div>
    </div>
  );
}
export default RD_UnitSummary;