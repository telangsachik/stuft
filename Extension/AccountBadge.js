import{c as n,o as r,u as d,j as e,D as l,R as i,B as u}from"./index.js";import{S as p}from"./stringUtil.js";/**
 * @license lucide-react v0.400.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const x=n("Wallet",[["path",{d:"M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1",key:"18etb6"}],["path",{d:"M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4",key:"xoc0q4"}]]),S=r(()=>{const{zondStore:s}=d(),{activeAccount:{accountAddress:a}}=s,{prefix:o,addressSplit:t}=p.getSplitAddress(a),c=`${o}${t[0]}...${t[t.length-1]}`;return!!a&&e.jsx(l,{to:i.ACCOUNT_LIST,children:e.jsxs(u,{variant:"outline",className:"flex items-center gap-2 rounded-full px-4 py-2 text-foreground",children:[e.jsx(x,{className:"h-4 w-4"}),c]})})});export{S as default};
