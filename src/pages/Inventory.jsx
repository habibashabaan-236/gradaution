import React from 'react';
import WarehouseManagement from '../Inventory/WarehouseManagement';

const Inventory = () => {
  return (
    <div style={{ padding: '20px', backgroundColor: '#f8f9fa', minHeight: '100vh' }}>

      <div className="inventory-stats-section">
        <WarehouseManagement />
      </div>

    </div>
  );
};

export default Inventory;