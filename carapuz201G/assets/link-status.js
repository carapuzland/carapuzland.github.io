(function(){
  const LABELS={
    en:{invite:"➕ Invite Status",contact:"💬 Support Status",inviteTitle:"Discord OAuth invite is not configured yet.",contactTitle:"Public Discord support invite is not configured yet."},
    ru:{invite:"➕ Статус инвайта",contact:"💬 Статус поддержки",inviteTitle:"OAuth-инвайт Discord пока не настроен.",contactTitle:"Публичная ссылка поддержки Discord пока не настроена."},
    uk:{invite:"➕ Статус інвайта",contact:"💬 Статус підтримки",inviteTitle:"OAuth-інвайт Discord поки не налаштований.",contactTitle:"Публічне посилання підтримки Discord поки не налаштоване."},
    de:{invite:"➕ Invite-Status",contact:"💬 Support-Status",inviteTitle:"Discord-OAuth-Einladung ist noch nicht konfiguriert.",contactTitle:"Öffentliche Discord-Support-Einladung ist noch nicht konfiguriert."},
    fr:{invite:"➕ Statut invitation",contact:"💬 Statut support",inviteTitle:"L'invitation OAuth Discord n'est pas encore configurée.",contactTitle:"L'invitation publique Discord de support n'est pas encore configurée."},
    es:{invite:"➕ Estado invitación",contact:"💬 Estado soporte",inviteTitle:"La invitación OAuth de Discord aún no está configurada.",contactTitle:"La invitación pública de soporte de Discord aún no está configurada."}
  };
  function langBase(){
    return (document.documentElement.lang||"en").toLowerCase().split("-")[0];
  }
  function copy(){
    return LABELS[langBase()]||LABELS.en;
  }
  function rewrite(){
    const c=copy();
    document.querySelectorAll('a[href$="#invite"],a[href="#invite"]').forEach(a=>{
      if(a.textContent!==c.invite)a.textContent=c.invite;
      a.title=c.inviteTitle;
      a.removeAttribute("target");
      a.rel="";
    });
    document.querySelectorAll('a[href$="#contact"],a[href="#contact"]').forEach(a=>{
      if(a.textContent!==c.contact)a.textContent=c.contact;
      a.title=c.contactTitle;
      a.removeAttribute("target");
      a.rel="";
    });
  }
  document.addEventListener("DOMContentLoaded",()=>{
    rewrite();
    const obs=new MutationObserver(()=>rewrite());
    obs.observe(document.body,{childList:true,subtree:true,characterData:true,attributes:true,attributeFilter:["lang"]});
  });
})();
