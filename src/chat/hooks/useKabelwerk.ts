import * as React from 'react';
import { KabelwerkContext } from '../contexts/KabelwerkContext';

const useKabelwerk = () => {
  const context = React.useContext(KabelwerkContext);

  return context;
};

export default useKabelwerk;
