import React, { useEffect, useState } from 'react';
import './style/style.css';

function LoadingSpinner({
  size,
}: {
  size: 'xs' | 'sm' | 'md' | 'lg' | 'page';
}) {
  return <span className={`loader-${size}`}></span>;
}

export default LoadingSpinner;
