(function(){
  'use strict';

  const VS_RE=/[\uFE0E\uFE0F]/g;
  const EMOJI_RE=new RegExp('(?:\\p{Regional_Indicator}{2}|[#*0-9]\\uFE0F?\\u20E3|(?:\\p{Emoji_Presentation}|\\p{Extended_Pictographic})(?:\\uFE0F|\\uFE0E)?|[\\u26A1\\u26A0\\u2705\\u274C\\u25B6\\u2B06\\u2B07\\u2600\\u2601\\u2614\\u26C5\\u26C8])','gu');
  const SKIP=new Set(['\u00A9','\u00AE']);

  const cp=seq=>seq.split(' ').map(h=>String.fromCodePoint(parseInt(h,16))).join('');
  const flagPairs=[
    ['1F1EC 1F1E7','GB'],['1F1FA 1F1F8','US'],['1F1FA 1F1E6','UA'],['1F1F7 1F1FA','RU'],
    ['1F1E7 1F1FE','BY'],['1F1E7 1F1EC','BG'],['1F1ED 1F1F7','HR'],['1F1E8 1F1FF','CZ'],
    ['1F1E9 1F1F0','DK'],['1F1F3 1F1F1','NL'],['1F1EA 1F1EA','EE'],['1F1EB 1F1EE','FI'],
    ['1F1EB 1F1F7','FR'],['1F1E9 1F1EA','DE'],['1F1EC 1F1F7','GR'],['1F1ED 1F1FA','HU'],
    ['1F1EE 1F1EA','IE'],['1F1EE 1F1F9','IT'],['1F1F1 1F1FB','LV'],['1F1F1 1F1F9','LT'],
    ['1F1F2 1F1F9','MT'],['1F1F5 1F1F1','PL'],['1F1F5 1F1F9','PT'],['1F1F7 1F1F4','RO'],
    ['1F1F8 1F1F0','SK'],['1F1F8 1F1EE','SI'],['1F1EA 1F1F8','ES'],['1F1F8 1F1EA','SE'],
    ['1F1E8 1F1E6','CA'],['1F1E7 1F1EA','BE'],['1F1E6 1F1F9','AT'],['1F1F1 1F1FA','LU'],['1F1E8 1F1FE','CY']
  ];
  const FLAG_FOR=new Map(flagPairs.map(([seq,code])=>[cp(seq),code]));

  const iconPairs=[
    ['1F3DD','island'],['1F319','moon'],['1F313','moon'],['1F4AC','chat'],['2795','plus'],
    ['1F4D6','book'],['1F6E1','shield'],['1F4B0','coin'],['1F3F0','castle'],['1F3AB','ticket'],
    ['2705','check'],['1F527','tool'],['1F3B5','music'],['1F3B6','music'],['1F9E0','brain'],
    ['2139','info'],['26A1','bolt'],['1F4CB','clipboard'],['1F4E1','antenna'],['2699','gear'],
    ['1F3D7','building'],['1F4BE','save'],['1F512','lock'],['1F3AF','target'],['1F680','rocket'],
    ['1F4A1','bulb'],['1F6E0','tools'],['1F41B','bug'],['1F4E8','mail'],['1F4DC','scroll'],
    ['1F52E','forecast'],['1F310','globe'],['1F30D','globe'],['1F4CD','pin'],['1F4C5','calendar'],
    ['1F324','weather'],['1F321','thermometer'],['1F446','pointer'],['2600','sun'],['26C5','weather'],
    ['2601','cloud'],['1F32B','cloud'],['1F326','rain'],['1F327','rain'],['1F328','snow'],
    ['2744','snow'],['26C8','storm'],['1F4A8','wind'],['1F4A7','droplet'],['1F4CA','chart'],
    ['1F4C8','trend'],['1F4C9','trend-down'],['1F9ED','compass'],['1F305','sunrise'],['1F307','sunset'],
    ['1F9E3','clothes'],['1F9E5','clothes'],['1F454','clothes'],['1F455','clothes'],['1F975','hot'],
    ['1F976','cold'],['2614','umbrella'],['2702','scissors'],['1F534','red-dot'],['1F7E2','green-dot'],
    ['1F7E1','yellow-dot'],['1F504','refresh'],['1F4DD','edit'],['1F4C4','file'],['1F50D','search'],
    ['26A0','warning'],['274C','x'],['1F3AE','game'],['1F3AC','video'],['1F4F9','video'],
    ['1F4F8','camera'],['1F4F7','camera'],['1F5BC','image'],['1F30A','wave'],['26F5','boat'],
    ['1F41A','shell'],['1F334','palm'],['1F420','fish'],['1F419','image'],['1F4E6','box'],
    ['2708','plane'],['1F4B3','card'],['1F550','clock'],['1F31E','sun'],['1F917','spark'],
    ['27A1','arrow-right'],['2B06','arrow-up'],['2B07','arrow-down'],['25B6','play'],
    ['1F3D3','activity'],['23F3','hourglass'],['23F1','stopwatch']
  ];
  const ICON_FOR=new Map();
  iconPairs.forEach(([seq,name])=>{
    const raw=cp(seq);
    ICON_FOR.set(raw,name);
    ICON_FOR.set(raw.replace(VS_RE,''),name);
  });

  function pathFor(name){
    switch(name){
      case 'island': return '<path d="M4 17c3-2 13-2 16 0"/><path d="M8 16c1-5 4-8 8-10"/><path d="M12 6c-2-1-5 0-6 2 3 0 5 1 6 3"/><path d="M13 6c2-2 5-2 7 0-3 1-5 3-6 5"/>';
      case 'moon': return '<path d="M20 14.5A8 8 0 1 1 10.5 4a6.5 6.5 0 0 0 9.5 10.5z"/>';
      case 'chat': return '<path d="M5 6h14v9H8l-4 4V6z"/>';
      case 'plus': return '<path d="M12 5v14M5 12h14"/>';
      case 'book': return '<path d="M5 4h8a3 3 0 0 1 3 3v15H8a3 3 0 0 0-3 3V4z"/><path d="M16 7h3v15h-3"/>';
      case 'shield': return '<path d="M12 3l8 3v6c0 5-3.5 8-8 10-4.5-2-8-5-8-10V6l8-3z"/>';
      case 'coin': return '<circle cx="12" cy="12" r="8"/><path d="M12 7v10M9 10c1-2 6-2 6 1 0 3-6 1-6 4 0 2 4 3 6 1"/>';
      case 'castle': return '<path d="M5 21V8l3 2 4-3 4 3 3-2v13"/><path d="M8 21v-6h8v6M4 8V4h4v4M16 8V4h4v4"/>';
      case 'ticket': return '<path d="M4 8a2 2 0 0 1 2-2h16v5a2 2 0 0 0 0 4v5H6a2 2 0 0 1-2-2v-5a2 2 0 0 0 0-4V8z"/><path d="M10 8v8"/>';
      case 'check': return '<path d="M4 12l5 5L20 6"/>';
      case 'tool': return '<path d="M14 7l3-3 3 3-3 3"/><path d="M15 9L6 18l-2 2"/>';
      case 'music': return '<path d="M9 18V6l11-2v12"/><circle cx="7" cy="18" r="2"/><circle cx="18" cy="16" r="2"/>';
      case 'brain': return '<path d="M9 4a4 4 0 0 0-4 4v8a4 4 0 0 0 4 4"/><path d="M15 4a4 4 0 0 1 4 4v8a4 4 0 0 1-4 4"/><path d="M9 8h6M8 13h8M10 18h4"/>';
      case 'info': return '<circle cx="12" cy="12" r="9"/><path d="M12 10v7M12 7h.01"/>';
      case 'bolt': return '<path d="M13 2L4 14h8l-1 8 9-13h-8l1-7z"/>';
      case 'clipboard': return '<path d="M8 4h8v4H8z"/><path d="M6 6H5v18h14V6h-1"/><path d="M8 13h8M8 17h6"/>';
      case 'antenna': return '<path d="M12 19V9"/><path d="M8 13a4 4 0 0 1 8 0"/><path d="M5 10a8 8 0 0 1 14 0"/><circle cx="12" cy="21" r="2"/>';
      case 'gear': return '<circle cx="12" cy="12" r="3"/><path d="M12 2v4M12 18v4M2 12h4M18 12h4M4.9 4.9l2.8 2.8M16.3 16.3l2.8 2.8M19.1 4.9l-2.8 2.8M7.7 16.3l-2.8 2.8"/>';
      case 'building': return '<path d="M5 21V8l7-5 7 5v13"/><path d="M9 21v-8h6v8M9 9h.01M15 9h.01"/>';
      case 'save': return '<path d="M5 3h14l2 2v18H3V5l2-2z"/><path d="M7 3v7h10V3M8 23v-8h8v8"/>';
      case 'lock': return '<rect x="5" y="10" width="14" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/>';
      case 'target': return '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>';
      case 'rocket': return '<path d="M5 15c5-1 9-5 10-10l4-2-2 4c-1 5-5 9-10 10l-3 3 1-5z"/><path d="M9 18l-4 4"/>';
      case 'bulb': return '<path d="M8 14a6 6 0 1 1 8 0c-1 1-1 2-1 3H9c0-1 0-2-1-3z"/><path d="M9 21h6M10 18h4"/>';
      case 'tools': return '<path d="M14 7l3-3 3 3-3 3"/><path d="M4 20l8-8"/><path d="M6 4l4 4"/>';
      case 'bug': return '<path d="M8 10h8v8a4 4 0 0 1-8 0v-8z"/><path d="M9 10V7a3 3 0 0 1 6 0v3M4 13h4M16 13h4M4 17h4M16 17h4"/>';
      case 'mail': return '<path d="M3 6h18v14H3z"/><path d="M3 7l9 7 9-7"/>';
      case 'scroll': return '<path d="M7 4h12v15a3 3 0 0 1-3 3H6a3 3 0 0 0 3-3V6a2 2 0 0 0-2-2z"/><path d="M5 19h11M10 8h7M10 12h7"/>';
      case 'forecast': return '<circle cx="12" cy="10" r="6"/><path d="M7 20h10M9 16l-2 4M15 16l2 4"/>';
      case 'globe': return '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18"/>';
      case 'pin': return '<path d="M12 22s7-6 7-12a7 7 0 0 0-14 0c0 6 7 12 7 12z"/><circle cx="12" cy="10" r="2"/>';
      case 'calendar': return '<rect x="4" y="5" width="18" height="17" rx="2"/><path d="M8 3v4M18 3v4M4 11h18"/>';
      case 'weather': return '<path d="M8 16h10a4 4 0 0 0 0-8 6 6 0 0 0-11-1"/><path d="M4 16a4 4 0 0 1 4-4"/><path d="M6 4V2M3 7H1M5 5L3.5 3.5"/>';
      case 'thermometer': return '<path d="M10 14.5V5a2 2 0 0 1 4 0v9.5a4 4 0 1 1-4 0z"/>';
      case 'pointer': return '<path d="M10 3v10l-3-3-2 2 7 7 5-5-2-2-3 3V3z"/>';
      case 'sun': return '<circle cx="12" cy="12" r="4"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M19.8 4.2l-2.1 2.1M6.3 17.7l-2.1 2.1"/>';
      case 'cloud': return '<path d="M6 18h12a4 4 0 0 0 0-8 6 6 0 0 0-11-1A4 4 0 0 0 6 18z"/>';
      case 'rain': return '<path d="M6 14h12a4 4 0 0 0 0-8 6 6 0 0 0-11-1"/><path d="M8 18l-1 3M12 18l-1 3M16 18l-1 3"/>';
      case 'snow': return '<path d="M6 14h12a4 4 0 0 0 0-8 6 6 0 0 0-11-1"/><path d="M8 19h.01M12 21h.01M16 19h.01"/>';
      case 'storm': return '<path d="M6 14h12a4 4 0 0 0 0-8 6 6 0 0 0-11-1"/><path d="M13 15l-3 5h4l-2 3"/>';
      case 'wind': return '<path d="M4 8h11a3 3 0 1 0-3-3"/><path d="M4 13h15a3 3 0 1 1-3 3"/><path d="M4 18h8"/>';
      case 'droplet': return '<path d="M12 3s6 7 6 11a6 6 0 0 1-12 0c0-4 6-11 6-11z"/>';
      case 'chart': return '<path d="M4 20h18"/><path d="M7 17V9M12 17V5M17 17v-7"/>';
      case 'trend': return '<path d="M4 17l6-6 4 4 6-8"/><path d="M15 7h5v5"/>';
      case 'trend-down': return '<path d="M4 7l6 6 4-4 6 8"/><path d="M15 17h5v-5"/>';
      case 'compass': return '<circle cx="12" cy="12" r="9"/><path d="M15 9l-2 6-6 2 2-6 6-2z"/>';
      case 'sunrise': return '<path d="M4 18h16M12 4v8M8 12l4-4 4 4M6 14a6 6 0 0 1 12 0"/>';
      case 'sunset': return '<path d="M4 18h16M12 14V6M8 10l4 4 4-4M6 14a6 6 0 0 1 12 0"/>';
      case 'clothes': return '<path d="M8 4l4 3 4-3 4 4-3 3v10H7V11L4 8l4-4z"/>';
      case 'hot': return '<path d="M12 3s5 5 5 10a5 5 0 0 1-10 0c0-5 5-10 5-10z"/><path d="M9 18h6"/>';
      case 'cold': return '<path d="M12 3v18M5 7l14 10M19 7L5 17"/>';
      case 'umbrella': return '<path d="M4 12a8 8 0 0 1 16 0H4z"/><path d="M12 12v6a3 3 0 0 0 6 0"/>';
      case 'scissors': return '<circle cx="6" cy="7" r="3"/><circle cx="6" cy="17" r="3"/><path d="M9 8l11 9M9 16l11-9"/>';
      case 'red-dot': return '<circle cx="12" cy="12" r="7" fill="currentColor"/>';
      case 'green-dot': return '<circle cx="12" cy="12" r="7" fill="currentColor"/>';
      case 'yellow-dot': return '<circle cx="12" cy="12" r="7" fill="currentColor"/>';
      case 'refresh': return '<path d="M20 7v6h-6"/><path d="M4 17v-6h6"/><path d="M19 13a7 7 0 0 0-12-5L4 11M5 11a7 7 0 0 0 12 5l3-3"/>';
      case 'edit': return '<path d="M4 20h4l12-12-4-4L4 16v4z"/><path d="M14 6l4 4"/>';
      case 'file': return '<path d="M6 3h9l5 5v18H6z"/><path d="M15 3v6h6M9 14h9M9 18h7"/>';
      case 'search': return '<circle cx="11" cy="11" r="7"/><path d="M16 16l5 5"/>';
      case 'warning': return '<path d="M12 3l10 18H2L12 3z"/><path d="M12 9v5M12 18h.01"/>';
      case 'x': return '<path d="M6 6l12 12M18 6L6 18"/>';
      case 'game': return '<path d="M5 10h14l2 8a3 3 0 0 1-5 2l-2-2h-4l-2 2a3 3 0 0 1-5-2l2-8z"/><path d="M8 14h4M10 12v4M17 14h.01"/>';
      case 'video': return '<rect x="4" y="6" width="14" height="12" rx="2"/><path d="M18 10l5-3v10l-5-3"/>';
      case 'camera': return '<path d="M5 8h4l2-3h4l2 3h4v14H5z"/><circle cx="13" cy="15" r="4"/>';
      case 'image': return '<rect x="4" y="5" width="18" height="16" rx="2"/><path d="M8 17l4-4 3 3 2-2 4 5"/><circle cx="9" cy="10" r="1"/>';
      case 'wave': return '<path d="M3 16c4 3 8-3 12 0 3 2 5 1 7-1"/><path d="M3 20c4 3 8-3 12 0 3 2 5 1 7-1"/>';
      case 'boat': return '<path d="M12 3v14"/><path d="M12 5l6 7h-6"/><path d="M12 7l-5 5h5"/><path d="M4 18c4 3 12 3 16 0"/>';
      case 'shell': return '<path d="M4 18c1-7 5-12 12-12 3 0 6 2 6 5 0 6-7 9-18 7z"/><path d="M9 17l6-10M13 18l3-11M17 17l1-8"/>';
      case 'palm': return '<path d="M12 21c1-5 1-10 0-15"/><path d="M12 6c-3-2-6-2-9 0 4 1 6 2 9 5"/><path d="M12 6c3-3 7-3 10-1-4 1-6 3-9 6"/>';
      case 'fish': return '<path d="M4 12c4-5 11-5 16 0-5 5-12 5-16 0z"/><path d="M20 12l3-3v6l-3-3z"/><circle cx="9" cy="11" r="1"/>';
      case 'box': return '<path d="M4 8l8-4 8 4v10l-8 4-8-4V8z"/><path d="M4 8l8 4 8-4M12 12v10"/>';
      case 'plane': return '<path d="M3 11l20-8-8 20-4-9-8-3z"/><path d="M11 14l4-4"/>';
      case 'card': return '<rect x="3" y="6" width="20" height="14" rx="2"/><path d="M3 10h20M7 16h4"/>';
      case 'clock': return '<circle cx="12" cy="12" r="9"/><path d="M12 7v6l4 2"/>';
      case 'spark': return '<path d="M12 2l2.2 6.8L21 11l-6.8 2.2L12 21l-2.2-7.8L3 11l6.8-2.2L12 2z"/>';
      case 'arrow-right': return '<path d="M4 12h16M14 6l6 6-6 6"/>';
      case 'arrow-up': return '<path d="M12 20V4M6 10l6-6 6 6"/>';
      case 'arrow-down': return '<path d="M12 4v16M6 14l6 6 6-6"/>';
      case 'play': return '<path d="M7 5v18l15-9L7 5z" fill="currentColor"/>';
      case 'activity': return '<path d="M4 13h4l3-8 4 16 3-8h4"/>';
      case 'hourglass': return '<path d="M6 3h12M6 21h12M8 3c0 5 4 5 4 9s-4 4-4 9M16 3c0 5-4 5-4 9s4 4 4 9"/>';
      case 'stopwatch': return '<circle cx="12" cy="13" r="8"/><path d="M12 13V8M9 2h6M12 2v3"/>';
      default: return '<path d="M12 2l2.2 6.8L21 11l-6.8 2.2L12 21l-2.2-7.8L3 11l6.8-2.2L12 2z"/>';
    }
  }

  function injectStyle(){
    if(document.getElementById('siteIconStyle'))return;
    const style=document.createElement('style');
    style.id='siteIconStyle';
    style.textContent=[
      '.site-icon{display:inline-flex;align-items:center;justify-content:center;width:1.08em;height:1.08em;vertical-align:-.16em;margin:0 .12em;color:currentColor;flex:none}',
      '.site-icon svg{display:block;width:100%;height:100%;stroke:currentColor;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;fill:none}',
      '.site-icon[data-tone="red"]{color:#ef4444}.site-icon[data-tone="green"]{color:#22c55e}.site-icon[data-tone="yellow"]{color:#eab308}',
      '.site-flag{width:auto;min-width:2.25em;height:1.35em;padding:0 .3em;border-radius:.28em;border:1px solid currentColor;background:linear-gradient(135deg,rgba(255,255,255,.22),rgba(255,255,255,.04));font-size:.58em;font-weight:900;letter-spacing:.04em;line-height:1;color:currentColor}',
      'button .site-icon,.btn .site-icon,a .site-icon,.badge .site-icon{vertical-align:-.2em}',
      '.site-icon-only{margin:0}'
    ].join('');
    document.head.appendChild(style);
  }

  function makeIcon(name){
    const span=document.createElement('span');
    span.className='site-icon';
    span.setAttribute('aria-hidden','true');
    if(name==='red-dot')span.dataset.tone='red';
    if(name==='green-dot')span.dataset.tone='green';
    if(name==='yellow-dot')span.dataset.tone='yellow';
    span.innerHTML='<svg viewBox="0 0 24 24">'+pathFor(name)+'</svg>';
    return span;
  }

  function makeFlag(code){
    const span=document.createElement('span');
    span.className='site-icon site-flag';
    span.setAttribute('aria-hidden','true');
    span.textContent=code;
    return span;
  }

  function replacement(raw){
    const plain=raw.replace(VS_RE,'');
    if(SKIP.has(raw)||SKIP.has(plain))return null;
    const flag=FLAG_FOR.get(raw);
    if(flag)return makeFlag(flag);
    return makeIcon(ICON_FOR.get(raw)||ICON_FOR.get(plain)||'spark');
  }

  function optionText(text){
    EMOJI_RE.lastIndex=0;
    return text.replace(EMOJI_RE,m=>{
      const plain=m.replace(VS_RE,'');
      if(SKIP.has(m)||SKIP.has(plain))return m;
      const flag=FLAG_FOR.get(m);
      return flag?flag+' ':'';
    }).replace(/\s{2,}/g,' ').trim();
  }

  function cleanTitle(text){
    EMOJI_RE.lastIndex=0;
    return text.replace(EMOJI_RE,m=>{
      const plain=m.replace(VS_RE,'');
      return SKIP.has(m)||SKIP.has(plain)?m:'';
    }).replace(/\s{2,}/g,' ').trim();
  }

  function hasEmoji(text){
    EMOJI_RE.lastIndex=0;
    return EMOJI_RE.test(text);
  }

  function replaceTextNode(node){
    const parent=node.parentElement;
    if(!parent||parent.closest('script,style,textarea,code,pre,svg,.site-icon'))return;
    if(parent.tagName==='OPTION')return;
    const text=node.nodeValue;
    if(!text||!hasEmoji(text))return;

    const frag=document.createDocumentFragment();
    let last=0;
    EMOJI_RE.lastIndex=0;
    for(const match of text.matchAll(EMOJI_RE)){
      const raw=match[0], index=match.index;
      if(index>last)frag.appendChild(document.createTextNode(text.slice(last,index)));
      const repl=replacement(raw);
      frag.appendChild(repl||document.createTextNode(raw));
      last=index+raw.length;
    }
    if(last<text.length)frag.appendChild(document.createTextNode(text.slice(last)));
    node.replaceWith(frag);
  }

  function sanitizeOptions(root){
    const scope=root.nodeType===1?root:document;
    if(scope.matches&&scope.matches('option'))scope.textContent=optionText(scope.textContent);
    if(scope.querySelectorAll){
      scope.querySelectorAll('option').forEach(opt=>{
        const clean=optionText(opt.textContent);
        if(clean!==opt.textContent)opt.textContent=clean;
      });
    }
  }

  let processing=false;
  function process(root){
    if(!root)return;
    if(processing)return;
    processing=true;
    try{
      injectStyle();
      sanitizeOptions(root);
      if(document.title)document.title=cleanTitle(document.title);
      const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT,{
        acceptNode(node){
          const p=node.parentElement;
          if(!p||p.closest('script,style,textarea,code,pre,svg,.site-icon')||p.tagName==='OPTION')return NodeFilter.FILTER_REJECT;
          if(!node.nodeValue||!hasEmoji(node.nodeValue))return NodeFilter.FILTER_REJECT;
          return NodeFilter.FILTER_ACCEPT;
        }
      });
      const nodes=[];
      while(walker.nextNode())nodes.push(walker.currentNode);
      nodes.forEach(replaceTextNode);
    }finally{
      processing=false;
    }
  }

  let scheduled=false;
  function schedule(delay=0){
    if(scheduled)return;
    scheduled=true;
    setTimeout(()=>{
      scheduled=false;
      process(document.body);
    },delay);
  }

  function runStartupPasses(){
    let count=0;
    const tick=()=>{
      process(document.body);
      count+=1;
      if(count<10)setTimeout(tick,250);
    };
    tick();
  }

  let observer=null;
  function nodeMayContainEmoji(node){
    if(!node)return false;
    if(node.nodeType===Node.TEXT_NODE)return hasEmoji(node.nodeValue||'');
    if(node.nodeType!==Node.ELEMENT_NODE)return false;
    if(node.closest&&node.closest('script,style,textarea,code,pre,svg,.site-icon'))return false;
    return hasEmoji(node.textContent||'');
  }

  function startObserver(){
    if(observer||!document.body)return;
    observer=new MutationObserver(mutations=>{
      if(processing)return;
      let shouldRefresh=false;
      for(const mutation of mutations){
        if(mutation.type==='characterData'){
          shouldRefresh=nodeMayContainEmoji(mutation.target);
        }else if(mutation.type==='childList'){
          for(const node of mutation.addedNodes){
            if(nodeMayContainEmoji(node)){
              shouldRefresh=true;
              break;
            }
          }
        }
        if(shouldRefresh)break;
      }
      if(shouldRefresh)schedule(30);
    });
    observer.observe(document.body,{subtree:true,childList:true,characterData:true});
  }

  function init(){
    window.SiteIcons={refresh:()=>process(document.body)};
    startObserver();
    runStartupPasses();
    ['click','change','input','keyup'].forEach(type=>{
      document.addEventListener(type,()=>schedule(0),true);
    });
    window.addEventListener('load',()=>schedule(0),{once:true});
  }

  if(document.readyState==='complete')setTimeout(init,0);
  else document.addEventListener('DOMContentLoaded',()=>setTimeout(init,0),{once:true});
})();
