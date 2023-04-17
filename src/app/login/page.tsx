import Image from 'next/image';
import React from 'react';

import LoginHero from '../clientLib';

export default function index() {
  return (
    <div className="flex justify-center my-10">
      <LoginHero title="Almost there!" />
    </div>
  );
}
