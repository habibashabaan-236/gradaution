import React, { useState, useMemo } from 'react';
import { Package, Banknote, ReceiptText, X, Plus, Trash2, DollarSign, Hash, Truck, Calendar, 
  CheckCircle, MoreVertical, Search, Filter, ChevronRight, ChevronLeft } from 'lucide-react';

// --- 1.  كروت الإحصائيات ---
const StatCard = ({ title, value, icon, iconColor, bgColor }) => (
  <div style={{ backgroundColor: '#eceeee', borderRadius: '12px', padding: '30px 24px', flex: '1', display: 'flex', justifyContent: 'space-between', alignItems: 'center', direction: 'rtl' }}>
    <div style={{ textAlign: 'right' }}>
      <p style={{ color: '#69475c', fontSize: '15px', fontWeight: '600', margin: '0 0 10px 0' }}>{title}</p>
      <h2 style={{ color: '#1e293b', fontSize: '36px', fontWeight: 'bold', margin: 0 }}>{value}</h2>
    </div>
    <div style={{ backgroundColor: bgColor, color: iconColor, padding: '10px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {icon}
    </div>
  </div>
);

// --- 2. المكون المنبثق للفاتورة (PurchaseInvoiceModal) ---
const PurchaseInvoiceModal = ({ isOpen, onClose, onSaveInvoice }) => {
  const [items, setItems] = useState([]);
  const [formData, setFormData] = useState({ name: '', cost: '', qty: '', supplier: '', date: '' });
  const [extraData, setExtraData] = useState({ buyer: '', receiver: '' });

  if (!isOpen) return null;

  const handleAddItem = () => {
    if (!formData.name || !formData.cost || !formData.qty) {
      alert("يرجى إكمال بيانات القطعة (الاسم، التكلفة، الكمية)");
      return;
    }

    const newItem = {
      id: Date.now(),
      name: formData.name,
      supplier: formData.supplier || 'مورد عام',
      date: formData.date || new Date().toISOString().split('T')[0],
      price: parseFloat(formData.cost),
      qty: parseInt(formData.qty),
      total: parseFloat(formData.cost) * parseInt(formData.qty)
    };

    setItems([...items, newItem]);
    setFormData({ name: '', cost: '', qty: '', supplier: '', date: '' });
  };

  const removeItem = (id) => setItems(items.filter(item => item.id !== id));
  const totalInvoice = items.reduce((acc, item) => acc + item.total, 0);

  const handleFinalSave = () => {
    if (items.length > 0) {
      const finalData = items.map(item => ({
        ...item,
        buyer: extraData.buyer || 'غير محدد',
        recipient: extraData.receiver || 'غير محدد'
      }));
      
      onSaveInvoice(finalData); 
      setItems([]);
      setExtraData({ buyer: '', receiver: '' });
      onClose();
    } else {
      alert("لا يمكن حفظ فاتورة فارغة");
    }
  };

  return (
    <div style={overlayStyle}>
      <div style={modalContainer}>
        <div style={headerStyle}>
          <div style={{ textAlign: 'right' }}>
            <h2 style={{ color: '#003a8c', margin: 0, fontSize: '18px', fontWeight: 'bold' }}>تسجيل فاتورة شراء</h2>
          </div>
          <X onClick={onClose} style={{ cursor: 'pointer', color: '#64748b' }} size={22} />
        </div>

        <div style={{ padding: '20px 30px' }}>
          <div style={formCardStyle}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <div style={{ width: '100%' }}>
                <label style={labelStyle}>اسم القطعة</label>
                <div style={inputWrapper}>
                  <Package size={16} color="#94a3b8" />
                  <input type="text" placeholder="مثال : شاشة iPhone 13 Pro Max" style={inputBase} value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
                </div>
              </div>

              <div style={{ display: 'flex', gap: '15px' }}>
                <div style={{ flex: 1 }}>
                  <label style={labelStyle}>التكلفة</label>
                  <div style={inputWrapper}>
                    <DollarSign size={16} color="#94a3b8" />
                    <input type="number" placeholder="0.00" style={inputBase} value={formData.cost}
                     onChange={(e) => setFormData({...formData, cost: e.target.value})} />
                  </div>
                </div>
                <div style={{ flex: 1 }}>
                  <label style={labelStyle}>الكمية</label>
                  <div style={inputWrapper}>
                    <Hash size={16} color="#94a3b8" />
                    <input type="number" placeholder="1" style={inputBase} value={formData.qty} onChange={(e) => 
                      setFormData({...formData, qty: e.target.value})} />
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '15px' }}>
                <div style={{ flex: 1 }}>
                  <label style={labelStyle}>المورد</label>
                  <div style={inputWrapper}>
                    <Truck size={16} color="#94a3b8" />
                    <input type="text" placeholder="اسم المورد" style={inputBase} value={formData.supplier} onChange={(e) => setFormData({...formData, supplier: e.target.value})} />
                  </div>
                </div>
                <div style={{ flex: 1 }}>
                  <label style={labelStyle}>تاريخ الشراء</label>
                  <div style={inputWrapper}>
                    <Calendar size={16} color="#94a3b8" />
                    <input type="date" style={inputBase} value={formData.date} onChange={(e) => setFormData({...formData, date: e.target.value})} />
                  </div>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
              <button style={addButton} onClick={handleAddItem}>
                <Plus size={16} /> إضافة للفاتورة
              </button>
            </div>
          </div>

          <div style={tableCardStyle}>
            <div style={tableHeaderTitle}>
              <ReceiptText size={18} color="#003a8c" />
              <span style={{ fontWeight: 'bold', color: '#003a8c' }}>الفاتورة</span>
            </div>
            
            <div style={scrollWrapperStyle}>
              <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: 0 }}>
                <thead style={stickyHeaderStyle}>
                  <tr>
                    <th style={thStyle}>القطعة</th>
                    <th style={thStyle}>الكمية</th>
                    <th style={thStyle}>سعر الوحدة</th>
                    <th style={thStyle}>الإجمالي</th>
                    <th style={{ ...thStyle, textAlign: 'center' }}>إجراء</th>
                  </tr>
                </thead>
                <tbody>
                  {items.length === 0 ? (
                    <tr><td colSpan="5" style={{ textAlign: 'center', padding: '20px', color: '#94a3b8' }}>لا توجد عناصر مضافة بعد</td></tr>
                  ) : (
                    items.map(item => (
                      <tr key={item.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                        <td style={tdStyle}>
                            <div style={{ fontWeight: '600', color: '#1e293b' }}>{item.name}</div>
                            <div style={{ fontSize: '11px', color: '#64748b' }}>{item.supplier} | {item.date}</div>
                        </td>
                        <td style={{ ...tdStyle, textAlign: 'center' }}>{item.qty}</td>
                        <td style={{ ...tdStyle, textAlign: 'center' }}>{item.price.toLocaleString()} ج.م</td>
                        <td style={{ ...tdStyle, textAlign: 'center', fontWeight: 'bold', color: '#003a8c' }}>{item.total.toLocaleString()} ج.م</td>
                        <td style={{ ...tdStyle, textAlign: 'center' }}>
                          <Trash2 size={16} color="#ef4444" style={{ cursor: 'pointer' }} onClick={() => removeItem(item.id)} />
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
            
            <div style={summaryRowStyle}>
               <div style={summaryItem}>
                  <span style={summaryLabel}>مشتري القطع:</span>
                  <input 
                    style={summaryInputBox} 
                    placeholder="اسم المشتري..."
                    value={extraData.buyer} 
                    onChange={(e) => setExtraData({...extraData, buyer: e.target.value})} 
                  />
               </div>
               <div style={summaryItem}>
                  <span style={summaryLabel}>مستلم القطع:</span>
                  <input 
                    style={summaryInputBox} 
                    placeholder="اسم المستلم..."
                    value={extraData.receiver} 
                    onChange={(e) => setExtraData({...extraData, receiver: e.target.value})} 
                  />
               </div>
               <div style={summaryTotalSection}>
                  <span style={{ color: '#444', fontSize: '13px' }}>الإجمالي الكلي:</span>
                  <span style={{ color: '#003a8c', fontSize: '18px', fontWeight: 'bold', marginRight: '10px' }}>{totalInvoice.toLocaleString()} ج.م</span>
               </div>
            </div>
          </div>
        </div>

        <div style={finalFooterStyle}>
            <button style={saveBtnStyle} onClick={handleFinalSave}>
              <CheckCircle size={16} /> حفظ الفاتورة
            </button>
            <button onClick={onClose} style={cancelBtnStyle}>إلغاء</button>
        </div>
      </div>
    </div>
  );
};

// --- 3. مكون جدول المخزون (InventoryTable) ---
const InventoryTable = ({ data = [], onDeleteItem }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [fromDate, setFromDate] = useState("2026-01-01"); 
  const [toDate, setToDate] = useState("2026-12-31");     
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;

  const filteredData = data.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.recipient.toLowerCase().includes(searchTerm.toLowerCase());
    const itemDate = item.date; 
    const isWithinDate = itemDate >= fromDate && itemDate <= toDate;
    return matchesSearch && isWithinDate;
  });

  const totalItems = filteredData.length;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const displayStart = totalItems === 0 ? 0 : indexOfFirstItem + 1;
  const displayEnd = Math.min(indexOfLastItem, totalItems);

  return (
    <div style={{ direction: 'rtl', marginTop: '80px' }}>
      <hr />
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: '20px', marginBottom: '40px' }}>
        <div style={{ position: 'relative', flex: 1 }}>
          <input 
            type="text" 
            placeholder="البحث بالاسم أو المستلم..." 
            value={searchTerm}
            onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
            style={{ width: '100%', padding: '12px 40px 12px 15px', borderRadius: '10px', border: '1px solid #e2e8f0', outline: 'none' }}
          />
          <Search size={20} style={{ position: 'absolute', right: '12px', top: '12px', color: '#94a3b8' }} />
        </div>

        <div style={{ display: 'flex', gap: '10px', alignItems: 'center', backgroundColor: '#f8fafc', padding: '8px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '13px', color: '#64748b' }}>
            <span>من:</span>
            <input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} style={{ border: 'none', background: 'transparent', outline: 'none' }} />
            <span>| إلى:</span>
            <input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} style={{ border: 'none', background: 'transparent', outline: 'none' }} />
        <button style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '8px', 
            backgroundColor: '#e2e8f0', 
            border: 'none', 
            padding: '10px 20px', 
            borderRadius: '10px', 
            cursor: 'pointer',
            color: '#1e293b',
            fontWeight: '600',
            fontSize: '14px'
          }}>
            <Filter size={16} />
            تصفية
          </button>
          </div>
        </div>
      </div>

      <div style={{ backgroundColor: 'white', borderRadius: '15px', padding: '20px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'right' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #f1f5f9', color: '#64748b', fontSize: '14px' }}>
              <th style={{ padding: '15px 10px' }}>القطعة</th>
              <th style={{ padding: '15px 10px' }}>التكلفة</th>
              <th style={{ padding: '15px 10px' }}>الكمية المتوفرة</th>
              <th style={{ padding: '15px 10px' }}>الحالة</th>
              <th style={{ padding: '15px 10px' }}>تاريخ الشراء</th>
              <th style={{ padding: '15px 10px' }}>المورد</th>
              <th style={{ padding: '15px 10px' }}>مستلم القطعة</th>
              <th style={{ padding: '15px 10px' }}>إجراءات</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.length === 0 ? (
                <tr><td colSpan="8" style={{ textAlign: 'center', padding: '30px', color: '#94a3b8' }}>لا توجد بيانات تطابق البحث</td></tr>
            ) : (
                currentItems.map((item) => (
                <tr key={item.id} style={{ borderBottom: '1px solid #f1f5f9', fontSize: '14px' }}>
                    <td style={{ padding: '15px 10px' }}>
                    <div style={{ fontWeight: 'bold' }}>{item.name}</div>
                    <div style={{ fontSize: '11px', color: '#94a3b8' }}>{item.sku}</div>
                    </td>
                    <td style={{ padding: '15px 10px' }}>{item.cost}</td>
                    <td style={{ padding: '15px 10px' }}>{item.qty}</td>
                    <td style={{ padding: '15px 10px' }}>
                    <span style={{ padding: '4px 10px', borderRadius: '20px', fontSize: '12px', color: 'white', backgroundColor: item.status === "لم تستخدم" ? "#2563eb" : "#86198f" }}>
                        {item.status}
                    </span>
                    </td>
                    <td style={{ padding: '15px 10px' }}>{item.date}</td>
                    <td style={{ padding: '15px 10px' }}>{item.supplier}</td>
                    <td style={{ padding: '15px 10px' }}>{item.recipient}</td>
                    <td style={{ padding: '15px 10px' }}>
                      <Trash2 
                        size={18} 
                        style={{ cursor: 'pointer', color: '#ef4444' }} 
                        onClick={() => onDeleteItem(item.id)} 
                      />
                    </td>
                </tr>
                ))
            )}
          </tbody>
        </table>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px' }}>
          <div style={{ color: '#64748b', fontSize: '14px' }}>
            عرض {displayStart} إلى {displayEnd} من {totalItems} عنصر
          </div>
          <div style={{ display: 'flex', gap: '5px' }}>
             <button onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} style={{ padding: '5px', border: '1px solid #e2e8f0', background: 'white', borderRadius: '5px' }}><ChevronRight size={16}/></button>
             <button style={{ padding: '5px 12px', background: '#003a8c', color: 'white', border: 'none', borderRadius: '5px' }}>{currentPage}</button>
             <button onClick={() =>
               setCurrentPage(prev => Math.min(prev + 1, Math.ceil(totalItems/itemsPerPage)))} 
               style={{ padding: '5px', border: '1px solid #e2e8f0', background: 'white', borderRadius: '5px' }}>
                <ChevronLeft size={16}/></button>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- 4. الصفحة الرئيسية (WarehouseManagement) ---
const WarehouseManagement = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inventory, setInventory] = useState([]); 

  const stats = useMemo(() => {
    const totalQty = inventory.reduce((acc, item) => acc + item.qty, 0);
    const totalValue = inventory.reduce((acc, item) => {
        const numericPrice = typeof item.price === 'number' ? item.price : 0;
        return acc + (numericPrice * item.qty);
    }, 0);
    return { totalQty, totalValue };
  }, [inventory]);

  const handleSaveInvoice = (newItems) => {
    const formattedItems = newItems.map(item => ({
      ...item,
      sku: `SKU-${Math.floor(Math.random() * 10000)}`, 
      status: "لم تستخدم", 
      cost: `${item.price.toLocaleString()} ج.م` 
    }));
    setInventory(prev => [...prev, ...formattedItems]);
  };

  // دالة الحذف النهائية
  const handleDeleteItem = (id) => {
    if (window.confirm("هل أنتِ متأكدة من حذف هذه القطعة من المخزون؟")) {
      setInventory(prev => prev.filter(item => item.id !== id));
    }
  };

  return (
    <div style={{ direction: 'rtl', padding: '30px 40px', backgroundColor: '#f8fafc', minHeight: '100vh' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
        <div style={{ textAlign: 'right' }}>
          <h1 style={{ color: '#003a8c', fontSize: '34px', fontWeight: 'bold', margin: 0 }}>إدارة المخزون</h1>
          <p style={{ color: '#64748b', fontSize: '18px', marginTop: '8px' }}>مراقبة وتحديث قطع الغيار والأدوات</p>
        </div>
        <button onClick={() => setIsModalOpen(true)} style={mainBtn}>
          <span>تسجيل فاتورة شراء</span>
          <ReceiptText size={20} />
        </button>
      </div>

      <div style={{ display: 'flex', gap: '24px', justifyContent: 'flex-start', maxWidth: '70%', marginBottom: '30px' }}>
        <StatCard title="إجمالي القطع" value={stats.totalQty.toLocaleString()} icon={<Package size={22} />} iconColor="#2563eb" bgColor="#dbeafe" />
        <StatCard title="قيمة المخزون" value={`${stats.totalValue.toLocaleString()} ج.م`} 
        icon={<Banknote size={22} />} iconColor="#0891b2" bgColor="#e0f2fe" />
      </div>

      <PurchaseInvoiceModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSaveInvoice={handleSaveInvoice}
      />

      {/* تمرير دالة الحذف هنا */}
      <InventoryTable data={inventory} onDeleteItem={handleDeleteItem} />
    </div>
  );
};

// الستايلات (Styles)
const mainBtn = { backgroundColor: '#0a47a3', color: 'white', border: 'none', padding: '12px 24px', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', fontSize: '17px', fontWeight: '500' };
const overlayStyle = { position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'flex-start', padding: '40px 0', overflowY: 'auto', zIndex: 1000 };
const modalContainer = { backgroundColor: '#fff', width: '900px', borderRadius: '12px', overflow: 'hidden', marginBottom: '40px' };
const headerStyle = { padding: '15px 25px', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between' };
const formCardStyle = { backgroundColor: '#fff', padding: '20px', borderRadius: '10px', border: '1px solid #e2e8f0', marginBottom: '20px' };
const labelStyle = { display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: 'bold', color: '#475569', textAlign: 'right' };
const inputWrapper = { display: 'flex', alignItems: 'center', gap: '10px', backgroundColor: '#f1f5f9', padding: '10px 15px', borderRadius: '6px', flexDirection: 'row-reverse' };
const inputBase = { border: 'none', background: 'transparent', width: '100%', outline: 'none', textAlign: 'right', fontSize: '14px' };
const addButton = { backgroundColor: '#dbeafe', color: '#1e40af', border: 'none', padding: '10px 20px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', display: 'flex', gap: '8px'};
const tableCardStyle = { border: '1px solid #e2e8f0', padding: '20px', borderRadius: '10px', backgroundColor: '#fff' };
const tableHeaderTitle = { display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'flex-start', marginBottom: '15px' };
const scrollWrapperStyle = { maxHeight: '200px', overflowY: 'auto', border: '1px solid #f1f5f9', borderRadius: '6px' };
const stickyHeaderStyle = { position: 'sticky', top: 0, backgroundColor: '#fff', zIndex: 10 };
const thStyle = { padding: '12px 10px', textAlign: 'right', color: '#64748b', fontSize: '12px' };
const tdStyle = { padding: '12px 10px', color: '#334155', fontSize: '13px' };
const summaryRowStyle = { marginTop: '15px', backgroundColor: '#f8fafc', padding: '15px 20px', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' };
const summaryItem = { display: 'flex', alignItems: 'center', gap: '10px' };
const summaryLabel = { fontSize: '13px', color: '#64748b' };
const summaryInputBox = { backgroundColor: '#e2e8f0', border: 'none', padding: '6px 12px', borderRadius: '4px', fontSize: '13px', fontWeight: 'bold', textAlign: 'center', width: '150px' };
const summaryTotalSection = { display: 'flex', alignItems: 'center' };
const finalFooterStyle = { padding: '20px 30px', display: 'flex', gap: '20px', borderTop: '1px solid #f1f5f9', justifyContent: 'flex-end' };
const saveBtnStyle = { backgroundColor: '#003a8c', color: 'white', padding: '12px 30px', borderRadius: '6px', border: 'none', cursor: 'pointer', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '10px' };
const cancelBtnStyle = { background: 'none', border: 'none', color: '#003a8c', fontWeight: 'bold', cursor: 'pointer' };

export default WarehouseManagement;