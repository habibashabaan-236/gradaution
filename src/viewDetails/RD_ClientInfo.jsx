import React from 'react';
import { UserCircle } from 'lucide-react';

function RD_ClientInfo({ clientData }) {
  return (
    <div className="p-2 h-100">
      <h6 className="text-primary border-bottom pb-2 mb-3 d-flex align-items-center gap-2">
        <UserCircle size={18} /> بيانات صاحب الجهاز
      </h6>
      <div className="small mb-1">الاسم: <span className="fw-bold">{clientData?.name}</span></div>
      <div className="small">التواصل: <span className="fw-bold" dir="ltr">{clientData?.contact}</span></div>
    </div>
  );
}
export default RD_ClientInfo;