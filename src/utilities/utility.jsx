import React, { useEffect, useState } from 'react';


// ---------- Utilities ----------
const uid = () => Math.random().toString(36).slice(2, 9);


function useLocalStorage(key, initial) {
const [state, setState] = useState(() => {
try {
const raw = localStorage.getItem(key);
return raw ? JSON.parse(raw) : initial;
} catch (e) {
return initial;
}
});


useEffect(() => {
try {
localStorage.setItem(key, JSON.stringify(state));
} catch (e) {
console.warn('localStorage write failed', e);
}
}, [key, state]);


return [state, setState];
}
export { uid, useLocalStorage };