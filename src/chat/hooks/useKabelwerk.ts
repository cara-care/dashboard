import * as React from 'react';
import { KabelwerkContext } from '../KabelwerkContext';

const useKabelwerk = () => {
  const context = React.useContext(KabelwerkContext);

  return context;
};

export default useKabelwerk;
