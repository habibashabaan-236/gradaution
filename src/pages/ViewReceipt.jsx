import React from 'react';
import RD_Header from '../viewDetails/RD_Header';
import RD_StatusGrid from '../viewDetails/RD_StatusGrid';
import RD_ClientInfo from '../viewDetails/RD_ClientInfo';
import RD_UnitSummary from '../viewDetails/RD_UnitSummary';
import RD_Financials from '../viewDetails/RD_Financials';
import RD_Terms from '../viewdetails/RD_Terms';
import RD_Footer from '../viewDetails/RD_Footer';

function ViewReceipt({ data = {} }) {
  
  return (
    <div className="container py-5">
      <div className="card-custom p-4 shadow-sm bg-white mx-auto" style={{ maxWidth: '1070px'}}>
        
        {/* 1. الهيدر */}
        <RD_Header 
          brandName={data?.brand || "---"} 
          ticketId={data?.ticket || "---"} 
          trackLink={data?.trackLink || "---"} 
        />

        {/* 2. شبكة الحالة والمواعيد */}
        <RD_StatusGrid receiptData={{
          receivedDate: data?.receivedDate || "---",
          expectedDate: data?.expectedDate || "---",
          status: data?.status || "---",
          ticketId: data?.docRef || "---"
        }} />

        {/* 3تفاصيل العميل والجهاز ا */}
<div className="row mt-4 g-4">
  <div className="col-md-6 border-start">
    <RD_ClientInfo 
      name={data?.client?.name} 
      contact={data?.client?.contact} 
    />
  </div>
 
     {/*  4-موديل الجهاز ووصف العطل ه */}
  <div className="col-md-6">
    <RD_UnitSummary 
      model={data?.unit?.model} 
      fault={data?.unit?.faultDesc} 
    />
  </div>
</div>

     {/* 5. الحسابات والمسؤولين - بعتنا كل فتفوتة لوحدها */}
<RD_Financials 
  staffName={data?.assignment?.staffName}
  dept={data?.assignment?.dept}
  priority={data?.assignment?.priority}
  subtotal={data?.billing?.subtotal}
  deposit={data?.billing?.deposit}
/>

        {/* 6. الفوتر */}
        <RD_Footer 
          ticketId={data?.docRef || "---"} 
          phone={data?.branchPhone || "---"} 
          address={data?.branchAddress || "---"} 
        />
        
      </div>
    </div>
  );
}

export default ViewReceipt;