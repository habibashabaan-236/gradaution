import React from 'react';
// استيراد المكونات من المجلد الجديد viewdetails
import RD_Header from '../components/viewdetails/RD_Header';
import RD_StatusGrid from '../components/viewdetails/RD_StatusGrid';
import RD_ClientInfo from '../components/viewdetails/RD_ClientInfo';
import RD_UnitSummary from '../components/viewdetails/RD_UnitSummary';
import RD_Financials from '../components/viewdetails/RD_Financials';
import RD_TermsFooter from '../components/viewdetails/RD_TermsFooter';

function ViewReceipt({ data }) {
  // بيانات افتراضية في حالة عدم تمرير 'data' عشان الصفحة تشتغل فوراً
  const defaultData = {
    brand: "عباد الرحمن - وحدة التشخيص الذكي",
    ticket: "ALX-77492-B",
    subtitle: "إيصال الخدمة المعتمد",
    timeline: [
      { label: "تاريخ الاستلام", date: "24 أكتوبر 2024" },
      { label: "التسليم المتوقع", date: "27 أكتوبر 2024" }
    ],
    currentPhase: "جاري التشخيص",
    docRef: "882-AX-Q",
    client: { name: "محمد الفايد", contact: "+20 1202432356" },
    unit: { model: "17 Pro Max - برتقالي", faultDesc: "وميض في الشاشة بعد الاستخدام المطول" },
    billing: { subtotal: 2450, deposit: 0 },
    assignment: { staffName: "أحمد رضا", dept: "مدير النظام", priority: "متقدم" },
    policies: [
      "جميع الإصلاحات تخضع لضمان عباد الرحمن لمدة 90 يوماً.",
      "الأجهزة المتروكة لأكثر من 30 يوماً تفرض عليها رسوم تخزين.",
      "النسخ الاحتياطي للبيانات مسؤولية العميل.",
      "الأضرار المادية تخرج الجهاز من الضمان."
    ]
  };

  // نستخدم البيانات الممررة (props) أو البيانات الافتراضية
  const receipt = data || defaultData;

  return (
    <div className="container py-5">
      {/* استخدام كلاس card-custom من ملف index.css الخاص بكِ */}
      <div className="card-custom p-4 shadow-sm bg-white mx-auto" style={{ maxWidth: '950px' }}>
        
        {/* 1. رأس الإيصال */}
        <RD_Header 
          brandName={receipt.brand} 
          ticketId={receipt.ticket} 
          subtitle={receipt.subtitle} 
        />

        {/* 2. توزيع المواعيد والحالة */}
        <RD_StatusGrid 
          timeline={receipt.timeline} 
          currentPhase={receipt.currentPhase} 
          docRef={receipt.docRef} 
        />

        {/* 3. تفاصيل العميل والوحدة */}
        <div className="row mt-4 g-4">
          <div className="col-md-6 border-start">
            <RD_ClientInfo clientData={receipt.client} />
          </div>
          <div className="col-md-6">
            <RD_UnitSummary unitInfo={receipt.unit} />
          </div>
        </div>

        {/* 4. الحسابات والمسؤولين */}
        <RD_Financials 
          billing={receipt.billing} 
          assignment={receipt.assignment} 
        />

        {/* 5. تذييل الإيصال (الشروط) */}
        <RD_TermsFooter policyItems={receipt.policies} />
        
      </div>
    </div>
  );
}

export default ViewReceipt;