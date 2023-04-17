import { createContext } from 'react';

export const PreLoaderContext = createContext({
    EnablePreLoader: (() => console.log("pre loader enabled")),
    DisablePreLoader: (() => console.log("pre loader disabled")),
});