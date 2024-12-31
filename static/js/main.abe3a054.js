/*! For license information please see main.abe3a054.js.LICENSE.txt */
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
`,hW=dt`
  0% {
    stroke-dasharray: 1px, 200px;
    stroke-dashoffset: 0;
  }

  50% {
    stroke-dasharray: 100px, 200px;
    stroke-dashoffset: -15px;
  }

  100% {
    stroke-dasharray: 100px, 200px;
    stroke-dashoffset: -125px;
  }
`,fW="string"!==typeof pW?ct`
        animation: ${pW} 1.4s linear infinite;
      `:null,mW="string"!==typeof hW?ct`
        animation: ${hW} 1.4s ease-in-out infinite;
      `:null,gW=Ma("span",{name:"MuiCircularProgress",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.root,t[n.variant],t[`color${rW(n.color)}`]]}})(Pa((e=>{let{theme:t}=e;return{display:"inline-block",variants:[{props:{variant:"determinate"},style:{transition:t.transitions.create("transform")}},{props:{variant:"indeterminate"},style:fW||{animation:`${pW} 1.4s linear infinite`}},...Object.entries(t.palette).filter(lW()).map((e=>{let[n]=e;return{props:{color:n},style:{color:(t.vars||t).palette[n].main}}}))]}}))),yW=Ma("svg",{name:"MuiCircularProgress",slot:"Svg",overridesResolver:(e,t)=>t.svg})({display:"block"}),bW=Ma("circle",{name:"MuiCircularProgress",slot:"Circle",overridesResolver:(e,t)=>{const{ownerState:n}=e;return[t.circle,t[`circle${rW(n.variant)}`],n.disableShrink&&t.circleDisableShrink]}})(Pa((e=>{let{theme:t}=e;return{stroke:"currentColor",variants:[{props:{variant:"determinate"},style:{transition:t.transitions.create("stroke-dashoffset")}},{props:{variant:"indeterminate"},style:{strokeDasharray:"80px, 200px",strokeDashoffset:0}},{props:e=>{let{ownerState:t}=e;return"indeterminate"===t.variant&&!t.disableShrink},style:mW||{animation:`${hW} 1.4s ease-in-out infinite`}}]}}))),vW=B.forwardRef((function(e,t){const n=Hr({props:e,name:"MuiCircularProgress"}),{className:r,color:a="primary",disableShrink:o=!1,size:i=40,style:s,thickness:u=3.6,value:l=0,variant:c="indeterminate",...d}=n,p={...n,color:a,disableShrink:o,size:i,thickness:u,value:l,variant:c},h=(e=>{const{classes:t,variant:n,color:r,disableShrink:a}=e;return Fa({root:["root",n,`color${rW(r)}`],svg:["svg"],circle:["circle",`circle${rW(n)}`,a&&"circleDisableShrink"]},cW,t)})(p),f={},m={},g={};if("determinate"===c){const e=2*Math.PI*((dW-u)/2);f.strokeDasharray=e.toFixed(3),g["aria-valuenow"]=Math.round(l),f.strokeDashoffset=`${((100-l)/100*e).toFixed(3)}px`,m.transform="rotate(-90deg)"}return(0,pt.jsx)(gW,{className:na(h.root,r),style:{width:i,height:i,...m,...s},ownerState:p,ref:t,role:"progressbar",...g,...d,children:(0,pt.jsx)(yW,{className:h.svg,ownerState:p,viewBox:"22 22 44 44",children:(0,pt.jsx)(bW,{className:h.circle,style:f,ownerState:p,cx:dW,cy:dW,r:(dW-u)/2,fill:"none",strokeWidth:u})})})})),xW=vW,wW="SourceViewer",kW={root:`${wW}-root`,sourcePlayback:`${wW}-sourcePlayback`},SW=Ma("div")((e=>{let{theme:t}=e;return{[`&.${kW.root}`]:{position:"relative",display:"flex",justifyContent:"center",alignItems:"center",[t.breakpoints.down("xs")]:{width:0,overflow:"hidden"},[t.breakpoints.up("sm")]:{flex:1,borderRightWidth:1,borderRightStyle:"solid",borderRightColor:t.palette.divider}},[`& .${kW.sourcePlayback}`]:{objectFit:"cover"}}}));const IW=function(e){const[t,n]=(0,B.useState)(!1),[r,a]=(0,B.useState)(!1),o=(0,B.useRef)(null);return(0,B.useEffect)((()=>{!async function(){try{const e={video:!0},t=await navigator.mediaDevices.getUserMedia(e);if(o.current)return void(o.current.srcObject=t)}catch(e){console.error("Error opening video camera.",e)}n(!1),a(!0)}()}),[t]),(0,pt.jsxs)(SW,{className:kW.root,children:[t&&(0,pt.jsx)(xW,{}),r?(0,pt.jsx)(uW,{fontSize:"large"}):(0,pt.jsx)("video",{ref:o,className:kW.sourcePlayback,hidden:t,autoPlay:!0,playsInline:!0,controls:!1,muted:!0,loop:!0,onLoadedData:function(t){const r=t.target;n(!1),requestAnimationFrame((async function t(){await e.onFrame(r),requestAnimationFrame(t)}))}})]})},CW="ViewerCard",_W={root:`${CW}-root`,noOutput:`${CW}-noOutput`,avatar:`${CW}-avatar`},NW=Ma(Wa)((e=>{let{theme:t}=e;return{[`&.${_W.root}`]:{},[`&.${_W.noOutput}`]:{flex:1,display:"flex",justifyContent:"center",alignItems:"center"},[`&.${_W.avatar}`]:{width:t.spacing(20),height:t.spacing(20)}}}));const TW=function(){const e=qz(),t=Kz(),{canvasRef:n,render:r}=Qz(e,t);return(0,pt.jsxs)(NW,{className:_W.root,children:[(0,pt.jsx)(IW,{onFrame:r}),(0,pt.jsx)(nW,{canvasRef:n})]})},EW={root:"App-root",resourceSelectionCards:"App-resourceSelectionCards"},$W=Ma("div")((e=>{let{theme:t}=e;return{[`&.${EW.root}`]:{display:"grid",[t.breakpoints.up("xs")]:{margin:t.spacing(1),gap:t.spacing(1),gridTemplateColumns:"1fr"},[t.breakpoints.up("md")]:{margin:t.spacing(2),gap:t.spacing(2),gridTemplateColumns:"repeat(2, 1fr)"},[t.breakpoints.up("lg")]:{gridTemplateColumns:"repeat(3, 1fr)"}},[`& .${EW.resourceSelectionCards}`]:{display:"flex",flexDirection:"column"}}}));const AW=function(){return(0,pt.jsx)($W,{className:EW.root,children:(0,pt.jsx)(TW,{})})};function RW(){return(0,pt.jsxs)(Sa,{sx:{display:"flex"},children:[(0,pt.jsx)(Jr,{}),(0,pt.jsx)(AW,{})]})}const OW=e=>{e&&e instanceof Function&&n.e(453).then(n.bind(n,453)).then((t=>{let{getCLS:n,getFID:r,getFCP:a,getLCP:o,getTTFB:i}=t;n(e),r(e),a(e),o(e),i(e)}))};ea.createRoot(document.getElementById("root")).render((0,pt.jsxs)(B.StrictMode,{children:[(0,pt.jsx)(Jr,{}),(0,pt.jsx)(RW,{}),","]})),OW()})()})();
//# sourceMappingURL=main.abe3a054.js.map