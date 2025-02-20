import React, { CSSProperties } from 'react';
import { ClipLoader } from 'react-spinners';

const override: CSSProperties = {
  display: 'block',
  margin: '0 auto',
  borderColor: 'green',
};

export const Loader = () => {
  return (
    <ClipLoader
      cssOverride={override}
      size={150}
      aria-label="Loading Spinner"
      data-testid="loader"
    />
  );
};
