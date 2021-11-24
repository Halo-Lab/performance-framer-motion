import { useEffect } from 'react';

// eslint-disable-next-line react-hooks/exhaustive-deps
const useEffectOnce = (fun: (...args: any) => any) => useEffect(fun, []);

export { useEffectOnce };
