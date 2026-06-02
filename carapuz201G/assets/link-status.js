(function(){
  const LABELS={
    en:{invite:"➕ Invite Status",contact:"💬 Support Status",inviteTitle:"Discord OAuth invite is not configured yet.",contactTitle:"Public Discord support invite is not configured yet."},
    ru:{invite:"➕ Статус инвайта",contact:"💬 Статус поддержки",inviteTitle:"OAuth-инвайт Discord пока не настроен.",contactTitle:"Публичная ссылка поддержки Discord пока не настроена."},
    uk:{invite:"➕ Статус інвайта",contact:"💬 Статус підтримки",inviteTitle:"OAuth-інвайт Discord поки не налаштований.",contactTitle:"Публічне посилання підтримки Discord поки не налаштоване."},
    de:{invite:"➕ Invite-Status",contact:"💬 Support-Status",inviteTitle:"Discord-OAuth-Einladung ist noch nicht konfiguriert.",contactTitle:"Öffentliche Discord-Support-Einladung ist noch nicht konfiguriert."},
    fr:{invite:"➕ Statut invitation",contact:"💬 Statut support",inviteTitle:"L'invitation OAuth Discord n'est pas encore configurée.",contactTitle:"L'invitation publique Discord de support n'est pas encore configurée."},
    es:{invite:"➕ Estado invitación",contact:"💬 Estado soporte",inviteTitle:"La invitación OAuth de Discord aún no está configurada.",contactTitle:"La invitación pública de soporte de Discord aún no está configurada."}
  };
  const VS_RE=/[\uFE0E\uFE0F]/g;
  const EMOJI_RE=new RegExp('(?:\\p{Regional_Indicator}{2}|[#*0-9]\\uFE0F?\\u20E3|(?:\\p{Emoji_Presentation}|\\p{Extended_Pictographic})(?:\\uFE0F|\\uFE0E)?|[\\u26A1\\u26A0\\u2705\\u274C\\u25B6\\u2B06\\u2B07\\u2600\\u2601\\u2614\\u26C5\\u26C8])','gu');
  function langBase(){
    return (document.documentElement.lang||"en").toLowerCase().split("-")[0];
  }
  function copy(){
    return LABELS[langBase()]||LABELS.en;
  }
  function plainLabel(text){
    EMOJI_RE.lastIndex=0;
    return (text||"").replace(EMOJI_RE,"").replace(VS_RE,"").replace(/\s+/g," ").trim();
  }
  function setLabel(a,label){
    if(plainLabel(a.textContent)===plainLabel(label))return false;
    a.textContent=label;
    return true;
  }
  function rewrite(){
    const c=copy();
    let changed=false;
    document.querySelectorAll('a[href$="#invite"],a[href="#invite"]').forEach(a=>{
      if(setLabel(a,c.invite))changed=true;
      a.title=c.inviteTitle;
      a.removeAttribute("target");
      a.rel="";
    });
    document.querySelectorAll('a[href$="#contact"],a[href="#contact"]').forEach(a=>{
      if(setLabel(a,c.contact))changed=true;
      a.title=c.contactTitle;
      a.removeAttribute("target");
      a.rel="";
    });
    if(changed&&window.SiteIcons)window.SiteIcons.refresh();
  }
  document.addEventListener("DOMContentLoaded",()=>{
    rewrite();
    const obs=new MutationObserver(()=>rewrite());
    obs.observe(document.body,{childList:true,subtree:true,characterData:true,attributes:true,attributeFilter:["lang"]});
  });
})();
