import React from 'react';

export const Loader: React.FC = () => (
  <div className='car-animation relative w-full h-16 mb-6 overflow-hidden'>
    <div className='car absolute top-4 left-0 text-primary font-dos leading-none'>
      {/* ASCII Car Art */}
      <pre className='text-left'>
        {`   ______
/|_||_\\\`.__
(   _    _ _\\
=\`-(_)--(_)-' `}
      </pre>
    </div>
  </div>
);
