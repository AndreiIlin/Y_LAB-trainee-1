import Store from '@src/store/index.js';
import React from 'react';

/**
 * Контекст для Store
 * @type {React.Context<Store>}
 */
export const StoreContext = React.createContext<Store>({} as Store);
