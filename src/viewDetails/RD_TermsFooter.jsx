import React from 'react';

function RD_TermsFooter({ policyItems }) {
  return (
    <div className="mt-4 p-3 bg-light rounded text-muted border-top" style={{ fontSize: '10px' }}>
      <div className="row">
        {policyItems?.map((text, i) => (
          <div key={i} className="col-md-6 mb-1">• {text}</div>
        ))}
      </div>
    </div>
  );
}
export default RD_TermsFooter;