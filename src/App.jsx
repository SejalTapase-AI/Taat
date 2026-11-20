import React, { useEffect, useMemo, useState } from "react";
import {
  LayoutDashboard, CalendarDays, QrCode, ReceiptText, Wallet,
  Utensils, Bell, Search, ChevronDown, Check, CheckCheck,
  Clock3, CircleUserRound, Languages, LogOut, Menu, X,
  ArrowUpRight, IndianRupee, Users, TrendingUp, ShieldCheck,
  CalendarOff, ScanLine, FileText, Settings, Plus, CheckCircle2,
  AlertCircle, Smartphone, Home, History, CreditCard, Download
} from "lucide-react";

const copy = {
  en: {
    dashboard:"Dashboard", plan:"Plan & Skip", scan:"Seat Scan", receipts:"Skip Receipts",
    fees:"Fees & Reports", welcome:"Good evening", subtitle:"Here’s what’s happening at your mess today.",
    activePlan:"Active plan", monthly:"Monthly • Lunch + Dinner", attendance:"Attendance this month",
    meals:"Meals remaining", credits:"Skip credits", quick:"Quick actions", skipMeal:"Skip a meal",
    bookSeat:"Check in", viewFees:"View fees", today:"Today’s meals", lunch:"Lunch", dinner:"Dinner",
    served:"Served", upcoming:"Upcoming", skipped:"Skipped", recent:"Recent activity",
    student:"Student", owner:"Mess owner", signout:"Sign out", language:"मराठी",
    planTitle:"Your meal plan", planSub:"Manage your meals and send a skip request before the cut-off.",
    cutoff:"Skip cut-off", lunchCut:"Lunch · 9:00 AM", dinnerCut:"Dinner · 3:00 PM",
    chooseDate:"Choose date", chooseMeal:"Select meal", reason:"Reason (optional)", sendSkip:"Submit skip request",
    scanTitle:"Seat check-in", scanSub:"Choose your assigned seat to simulate a QR check-in.",
    seat:"Seat", available:"Available", occupied:"Occupied", checkin:"Confirm check-in",
    ownerTitle:"Owner verification", ownerSub:"Review student skip requests and verify them in one tap.",
    pending:"Pending", verified:"Verified", all:"All requests", verify:"Verify receipt",
    feesTitle:"Fees & reports", feesSub:"A clear monthly view of attendance, skips and payments.",
    totalFee:"Monthly plan fee", paid:"Paid this month", due:"Balance due", skips:"Approved skips",
    paymentHistory:"Payment history", month:"November 2026", download:"Download report",
    noRequests:"No skip requests yet.", noActivity:"Your recent activity will appear here.",
    loginTitle:"Welcome to Taat", loginSub:"Your mess, made simpler.", name:"Your name",
    enterName:"Enter your name", continue:"Continue", role:"Continue as",
    studentHome:"Student workspace", ownerHome:"Owner workspace", signInNote:"Prototype sign-in — no password required.",
    requestSent:"Skip request submitted", requestDesc:"Your receipt has been created and sent to the mess owner.",
    done:"Done", cancel:"Cancel", status:"Status", amount:"Amount", date:"Date",
    scanDemo:"QR scan simulation", scanDemoText:"In the live product, point your camera at the QR sticker on your seat.",
    checkedIn:"You’re checked in!", checkedText:"Your attendance has been recorded for this meal.",
    seatTaken:"This seat is already occupied. Choose another seat.",
    noPlan:"No active plan", paidLabel:"Paid", pendingLabel:"Pending", nav:"Workspace",
    ownerStats:"Today at a glance", students:"Active students", mealsToday:"Meals expected",
    attendanceToday:"Checked in today", pendingSkips:"Pending skips", manage:"Manage",
    languageLabel:"Language", welcomeBack:"Welcome back"
  },
  mr: {
    dashboard:"डॅशबोर्ड", plan:"प्लॅन आणि स्किप", scan:"सीट स्कॅन", receipts:"स्किप पावत्या",
    fees:"फी आणि रिपोर्ट", welcome:"शुभ संध्याकाळ", subtitle:"आज तुमच्या मेसमध्ये काय सुरू आहे ते पाहा.",
    activePlan:"सक्रिय प्लॅन", monthly:"मासिक • दुपारचे + रात्रीचे जेवण", attendance:"या महिन्यातील उपस्थिती",
    meals:"शिल्लक जेवणे", credits:"स्किप क्रेडिट्स", quick:"जलद कृती", skipMeal:"जेवण स्किप करा",
    bookSeat:"हजेरी लावा", viewFees:"फी पहा", today:"आजची जेवणे", lunch:"दुपारचे जेवण", dinner:"रात्रीचे जेवण",
    served:"पूर्ण", upcoming:"येणार", skipped:"स्किप केले", recent:"अलीकडील हालचाली",
    student:"विद्यार्थी", owner:"मेस मालक", signout:"बाहेर पडा", language:"English",
    planTitle:"तुमचा जेवणाचा प्लॅन", planSub:"कट-ऑफ वेळेपूर्वी जेवण स्किप करण्याची विनंती पाठवा.",
    cutoff:"स्किप करण्याची अंतिम वेळ", lunchCut:"दुपारचे जेवण · सकाळी ९:००", dinnerCut:"रात्रीचे जेवण · दुपारी ३:००",
    chooseDate:"तारीख निवडा", chooseMeal:"जेवण निवडा", reason:"कारण (ऐच्छिक)", sendSkip:"स्किप विनंती पाठवा",
    scanTitle:"सीट हजेरी", scanSub:"QR स्कॅनची चाचणी करण्यासाठी तुमची सीट निवडा.",
    seat:"सीट", available:"उपलब्ध", occupied:"भरलेली", checkin:"हजेरी निश्चित करा",
    ownerTitle:"मालक पडताळणी", ownerSub:"विद्यार्थ्यांच्या स्किप विनंत्या तपासा आणि एका टॅपमध्ये पडताळा.",
    pending:"प्रलंबित", verified:"पडताळले", all:"सर्व विनंत्या", verify:"पावती पडताळा",
    feesTitle:"फी आणि रिपोर्ट", feesSub:"उपस्थिती, स्किप आणि पेमेंटचा मासिक तपशील.",
    totalFee:"मासिक प्लॅन फी", paid:"या महिन्यात भरले", due:"बाकी रक्कम", skips:"मंजूर स्किप",
    paymentHistory:"पेमेंट इतिहास", month:"नोव्हेंबर २०२६", download:"रिपोर्ट डाउनलोड",
    noRequests:"अजून स्किप विनंत्या नाहीत.", noActivity:"अलीकडील हालचाली येथे दिसतील.",
    loginTitle:"Taat मध्ये स्वागत", loginSub:"तुमची मेस, आता अधिक सोपी.", name:"तुमचे नाव",
    enterName:"तुमचे नाव टाका", continue:"पुढे जा", role:"म्हणून पुढे जा",
    studentHome:"विद्यार्थी विभाग", ownerHome:"मालक विभाग", signInNote:"प्रोटोटाइप लॉगिन — पासवर्डची गरज नाही.",
    requestSent:"स्किप विनंती पाठवली", requestDesc:"तुमची पावती तयार झाली आहे आणि मेस मालकाला पाठवली आहे.",
    done:"झाले", cancel:"रद्द करा", status:"स्थिती", amount:"रक्कम", date:"तारीख",
    scanDemo:"QR स्कॅन चाचणी", scanDemoText:"प्रत्यक्ष अॅपमध्ये सीटवरील QR स्टिकर कॅमेऱ्याने स्कॅन करा.",
    checkedIn:"तुमची हजेरी लागली!", checkedText:"या जेवणासाठी तुमची उपस्थिती नोंदवली आहे.",
    seatTaken:"ही सीट आधीच भरलेली आहे. दुसरी सीट निवडा.",
    noPlan:"सक्रिय प्लॅन नाही", paidLabel:"भरले", pendingLabel:"प्रलंबित", nav:"कार्य विभाग",
    ownerStats:"आजचा आढावा", students:"सक्रिय विद्यार्थी", mealsToday:"अपेक्षित जेवणे",
    attendanceToday:"आज हजेरी लावली", pendingSkips:"प्रलंबित स्किप", manage:"व्यवस्थापन",
    languageLabel:"भाषा", welcomeBack:"पुन्हा स्वागत"
  }
};

const initialReceipts = [
  { id: 1048, name: "Aarav Patil", meal: "Lunch", date: "19 Nov 2026", time: "8:42 AM", reason: "College event", status: "Pending" },
  { id: 1047, name: "Mira Shah", meal: "Dinner", date: "19 Nov 2026", time: "1:18 PM", reason: "Going home", status: "Pending" },
  { id: 1046, name: "Rohan Kale", meal: "Lunch", date: "19 Nov 2026", time: "8:10 AM", reason: "Personal", status: "Verified" }
];

function App() {
  const [language, setLanguage] = useState("en");
  const [user, setUser] = useState(() => localStorage.getItem("taat-user") || "");
  const [role, setRole] = useState(() => localStorage.getItem("taat-role") || "student");
  const [page, setPage] = useState("dashboard");
  const [mobileNav, setMobileNav] = useState(false);
  const [receipts, setReceipts] = useState(() => {
    try { return JSON.parse(localStorage.getItem("taat-receipts")) || initialReceipts; }
    catch { return initialReceipts; }
  });
  const [seatStatus, setSeatStatus] = useState({});
  const [selectedSeat, setSelectedSeat] = useState(5);
  const [checkedIn, setCheckedIn] = useState(false);
  const [meal, setMeal] = useState("Lunch");
  const [skipDate, setSkipDate] = useState("2026-11-20");
  const [reason, setReason] = useState("");
  const [toast, setToast] = useState("");
  const [showReceipt, setShowReceipt] = useState(false);
  const [lastReceipt, setLastReceipt] = useState(null);
  const [filter, setFilter] = useState("All");
  const t = copy[language];

  useEffect(() => localStorage.setItem("taat-receipts", JSON.stringify(receipts)), [receipts]);
  useEffect(() => { if (user) localStorage.setItem("taat-user", user); }, [user]);
  useEffect(() => localStorage.setItem("taat-role", role), [role]);

  const notify = (message) => { setToast(message); window.setTimeout(() => setToast(""), 2800); };
  const navItems = role === "student"
    ? [["dashboard", LayoutDashboard, t.dashboard], ["plan", CalendarDays, t.plan], ["scan", QrCode, t.scan], ["fees", Wallet, t.fees]]
    : [["dashboard", LayoutDashboard, t.dashboard], ["receipts", ReceiptText, t.receipts], ["fees", Wallet, t.fees]];

  const pendingCount = receipts.filter(r => r.status === "Pending").length;
  const filteredReceipts = receipts.filter(r => filter === "All" || r.status === filter);

  function submitSkip(e) {
    e.preventDefault();
    const id = Math.max(1000, ...receipts.map(r => Number(r.id) || 0)) + 1;
    const dateLabel = new Date(skipDate + "T12:00:00").toLocaleDateString(language === "mr" ? "mr-IN" : "en-IN", { day:"numeric", month:"short", year:"numeric" });
    const item = { id, name: user || "Student", meal, date: dateLabel, time: new Date().toLocaleTimeString([], {hour:"2-digit", minute:"2-digit"}), reason: reason || "Not specified", status: "Pending" };
    setReceipts(prev => [item, ...prev]);
    setLastReceipt(item); setShowReceipt(true); setReason("");
  }

  function verifyReceipt(id) {
    setReceipts(prev => prev.map(r => r.id === id ? { ...r, status: "Verified" } : r));
    notify(language === "mr" ? "पावती पडताळली!" : "Receipt verified successfully.");
  }

  function checkIn() {
    if (seatStatus[selectedSeat]) { notify(t.seatTaken); return; }
    setSeatStatus(prev => ({ ...prev, [selectedSeat]: true }));
    setCheckedIn(true);
  }

  function logout() {
    localStorage.removeItem("taat-user"); localStorage.removeItem("taat-role");
    setUser(""); setPage("dashboard"); setMobileNav(false);
  }

  if (!user) return <Login language={language} setLanguage={setLanguage} role={role} setRole={setRole} onLogin={setUser} />;

  return (
    <div className="app-shell">
      <aside className={`sidebar ${mobileNav ? "open" : ""}`}>
        <div className="brand"><div className="brand-mark"><Utensils size={21}/></div><div><strong>taat<span>.</span></strong><small>SMART MESS</small></div><button className="icon-btn mobile-close" onClick={() => setMobileNav(false)}><X/></button></div>
        <div className="workspace-label">{t.nav}</div>
        <nav>{navItems.map(([id, Icon, label]) => <button key={id} className={`nav-link ${page === id ? "active" : ""}`} onClick={() => {setPage(id);setMobileNav(false);}}><Icon size={18}/><span>{label}</span>{id === "receipts" && pendingCount > 0 && <em>{pendingCount}</em>}</button>)}</nav>
        <div className="sidebar-bottom">
          <div className="help-card"><div className="help-icon"><ShieldCheck size={18}/></div><strong>{language === "mr" ? "तुमची माहिती सुरक्षित" : "Your records, secure"}</strong><p>{language === "mr" ? "उपस्थिती आणि फीचा स्पष्ट हिशोब." : "Clear records for every meal."}</p></div>
          <button className="profile-mini" onClick={() => setRole(role === "student" ? "owner" : "student")}><div className="avatar">{user.slice(0,1).toUpperCase()}</div><div className="profile-copy"><strong>{user}</strong><small>{role === "student" ? t.student : t.owner}</small></div><ChevronDown size={16}/></button>
          <button className="logout" onClick={logout}><LogOut size={16}/>{t.signout}</button>
        </div>
      </aside>

      <main className="main-area">
        <header className="topbar">
          <button className="icon-btn hamburger" onClick={() => setMobileNav(true)}><Menu/></button>
          <div className="crumb"><span>TAAT</span><b>/</b>{navItems.find(n => n[0] === page)?.[2] || t.dashboard}</div>
          <div className="top-actions">
            <button className="language-btn" onClick={() => setLanguage(language === "en" ? "mr" : "en")}><Languages size={16}/>{t.language}</button>
            <button className="notification-btn" onClick={() => {setPage(role === "student" ? "plan" : "receipts");}}><Bell size={18}/>{role === "owner" && pendingCount > 0 && <i/>}</button>
            <div className="top-avatar">{user.slice(0,1).toUpperCase()}</div>
          </div>
        </header>

        <div className="content-wrap">
          {page === "dashboard" && <Dashboard t={t} role={role} user={user} receipts={receipts} setPage={setPage} />}
          {page === "plan" && <Plan t={t} meal={meal} setMeal={setMeal} skipDate={skipDate} setSkipDate={setSkipDate} reason={reason} setReason={setReason} submitSkip={submitSkip} />}
          {page === "scan" && <SeatScan t={t} selectedSeat={selectedSeat} setSelectedSeat={setSelectedSeat} seatStatus={seatStatus} checkIn={checkIn} checkedIn={checkedIn} setCheckedIn={setCheckedIn} />}
          {page === "receipts" && <Receipts t={t} receipts={filteredReceipts} filter={filter} setFilter={setFilter} verifyReceipt={verifyReceipt} />}
          {page === "fees" && <Fees t={t} role={role} />}
        </div>
        <footer className="footer"><span>© 2026 Taat · Smart Mess Management</span><span>Made for simpler mess routines <span className="heart">♥</span></span></footer>
      </main>

      {mobileNav && <div className="scrim" onClick={() => setMobileNav(false)}/>}
      {toast && <div className="toast"><CheckCircle2 size={18}/>{toast}</div>}
      {showReceipt && lastReceipt && <Modal onClose={() => setShowReceipt(false)}><div className="receipt-success"><div className="success-icon"><Check size={28}/></div><span className="eyebrow">TAAT · SKIP RECEIPT</span><h2>{t.requestSent}</h2><p>{t.requestDesc}</p><div className="receipt-ticket"><div><small>RECEIPT ID</small><strong>#{lastReceipt.id}</strong></div><span className="status-pill pending">{t.pending}</span><hr/><div className="ticket-row"><span>{t.name}</span><strong>{lastReceipt.name}</strong></div><div className="ticket-row"><span>{t.date}</span><strong>{lastReceipt.date}</strong></div><div className="ticket-row"><span>{t.chooseMeal}</span><strong>{lastReceipt.meal}</strong></div><div className="ticket-row"><span>{t.status}</span><strong>{t.pending}</strong></div></div><button className="primary-btn full" onClick={() => {setShowReceipt(false);setPage("dashboard");}}>{t.done}<ArrowUpRight size={17}/></button></div></Modal>}
    </div>
  );
}

function Login({ language, setLanguage, role, setRole, onLogin }) {
  const [name, setName] = useState("");
  const t = copy[language];
  return <div className="login-page">
    <div className="login-art"><div className="art-top"><div className="brand light"><div className="brand-mark"><Utensils size={21}/></div><div><strong>taat<span>.</span></strong><small>SMART MESS</small></div></div><button className="language-btn light-btn" onClick={() => setLanguage(language === "en" ? "mr" : "en")}><Languages size={16}/>{t.language}</button></div>
      <div className="art-copy"><span className="eyebrow">LESS PAPER. MORE CLARITY.</span><h1>A better way<br/>to <em>meal manage.</em></h1><p>One simple space for meal skips, seat check-ins and mess payments.</p><div className="art-stats"><div><strong>01</strong><span>Skip in a tap</span></div><div><strong>02</strong><span>Scan your seat</span></div><div><strong>03</strong><span>Track every rupee</span></div></div></div>
      <div className="floating-food"><div className="food-plate"><span>🍛</span></div><div className="food-note"><CheckCircle2 size={16}/> Meal plan active</div></div>
      <div className="art-bottom">ताट · Your mess, made simpler.</div>
    </div>
    <div className="login-panel"><div className="login-card"><span className="eyebrow">GET STARTED</span><h2>{t.loginTitle}</h2><p>{t.loginSub}</p><label>{t.name}</label><div className="name-input"><CircleUserRound size={18}/><input value={name} onChange={e => setName(e.target.value)} placeholder={t.enterName} onKeyDown={e => e.key === "Enter" && name.trim() && onLogin(name.trim())}/></div><label>{t.role}</label><div className="role-select"><button className={role === "student" ? "selected" : ""} onClick={() => setRole("student")}><Smartphone size={18}/><span>{t.student}<small>{t.studentHome}</small></span>{role === "student" && <CheckCircle2 size={17}/>}</button><button className={role === "owner" ? "selected" : ""} onClick={() => setRole("owner")}><Utensils size={18}/><span>{t.owner}<small>{t.ownerHome}</small></span>{role === "owner" && <CheckCircle2 size={17}/>}</button></div><button className="primary-btn full login-submit" disabled={!name.trim()} onClick={() => onLogin(name.trim())}>{t.continue}<ArrowUpRight size={18}/></button><div className="login-note"><ShieldCheck size={15}/>{t.signInNote}</div></div><div className="login-footer">MIT Academy of Engineering · Prototyping Project</div></div>
  </div>;
}

function PageHeading({eyebrow, title, subtitle, action}) {
  return <div className="page-heading"><div><span className="eyebrow">{eyebrow}</span><h1>{title}</h1><p>{subtitle}</p></div>{action}</div>;
}
function StatCard({icon:Icon,label,value,detail,tone="blue"}) {
  return <div className="stat-card"><div className={`stat-icon ${tone}`}><Icon size={19}/></div><div className="stat-info"><span>{label}</span><strong>{value}</strong><small>{detail}</small></div><ArrowUpRight className="stat-arrow" size={17}/></div>;
}
function Dashboard({t,role,user,receipts,setPage}) {
  const recent = receipts.slice(0,3);
  return <><PageHeading eyebrow={role === "student" ? "STUDENT OVERVIEW" : "OWNER OVERVIEW"} title={`${t.welcome}, ${user.split(" ")[0]} 👋`} subtitle={t.subtitle} action={<div className="date-chip"><CalendarDays size={16}/> Thursday, 19 Nov 2026</div>}/>
    {role === "student" ? <>
      <div className="hero-plan"><div className="hero-plan-copy"><span className="eyebrow">YOUR CURRENT PLAN</span><h2>Good food. No confusion.</h2><p>{t.monthly} · Valid until 30 Nov 2026</p><button className="hero-link" onClick={() => setPage("plan")}>{t.plan} <ArrowUpRight size={16}/></button></div><div className="hero-bowl">🍲</div><div className="hero-orbit orbit-one"/><div className="hero-orbit orbit-two"/></div>
      <div className="stats-grid"><StatCard icon={CalendarDays} label={t.attendance} value="32 / 38" detail="84% attendance" tone="blue"/><StatCard icon={Utensils} label={t.meals} value="44" detail="Across 22 days" tone="green"/><StatCard icon={Wallet} label={t.credits} value="06" detail="Available this month" tone="violet"/></div>
      <div className="dashboard-columns"><section className="panel meals-panel"><div className="section-head"><div><h3>{t.today}</h3><p>Thursday, 19 November</p></div><span className="live-tag"><i/> TODAY</span></div><div className="meal-row"><div className="meal-emoji">☀️</div><div className="meal-detail"><strong>{t.lunch}</strong><small>12:00 PM – 2:30 PM</small></div><span className="meal-status served"><Check size={13}/>{t.served}</span></div><div className="meal-row"><div className="meal-emoji">🌙</div><div className="meal-detail"><strong>{t.dinner}</strong><small>7:00 PM – 9:30 PM</small></div><span className="meal-status upcoming"><Clock3 size={13}/>{t.upcoming}</span></div><button className="text-action" onClick={() => setPage("plan")}>{t.skipMeal}<ArrowUpRight size={16}/></button></section>
      <section className="panel activity-panel"><div className="section-head"><div><h3>{t.recent}</h3><p>Your latest mess updates</p></div><History size={18} className="muted-icon"/></div>{recent.length ? recent.map(r => <div className="activity-row" key={r.id}><div className="activity-icon"><CalendarOff size={16}/></div><div><strong>{r.meal} skip request</strong><small>{r.date} · #{r.id}</small></div><span className={`status-pill ${r.status.toLowerCase()}`}>{r.status}</span></div>) : <p className="empty-state">{t.noActivity}</p>}</section></div>
    </> : <>
      <div className="owner-banner"><div><span className="eyebrow">MESS CONTROL CENTRE</span><h2>Your mess, at a glance.</h2><p>Keep attendance, meal planning and payments in sync.</p></div><div className="owner-banner-icon"><Utensils size={40}/></div></div>
      <div className="stats-grid four"><StatCard icon={Users} label={t.students} value="36" detail="+4 this semester" tone="blue"/><StatCard icon={Utensils} label={t.mealsToday} value="68" detail="Lunch + dinner" tone="green"/><StatCard icon={ScanLine} label={t.attendanceToday} value="42" detail="Across both meals" tone="violet"/><StatCard icon={CalendarOff} label={t.pendingSkips} value={String(receipts.filter(r=>r.status==="Pending").length).padStart(2,"0")} detail="Needs your review" tone="orange"/></div>
      <div className="panel owner-requests"><div className="section-head"><div><h3>Requests needing attention</h3><p>Verify a skip receipt in one tap</p></div><button className="text-action" onClick={() => setPage("receipts")}>View all <ArrowUpRight size={16}/></button></div>{receipts.filter(r=>r.status==="Pending").slice(0,3).map(r=><div className="activity-row" key={r.id}><div className="avatar small">{r.name[0]}</div><div className="activity-name"><strong>{r.name}</strong><small>{r.meal} · {r.date} · #{r.id}</small></div><span className="status-pill pending">Pending</span><button className="outline-btn compact" onClick={()=>setPage("receipts")}>Review</button></div>)}</div>
    </>}
  </>;
}
function Plan({t,meal,setMeal,skipDate,setSkipDate,reason,setReason,submitSkip}) {
  return <><PageHeading eyebrow="MEAL MANAGEMENT" title={t.planTitle} subtitle={t.planSub}/><div className="plan-layout"><section className="panel plan-form"><div className="section-head"><div><h3>Request a meal skip</h3><p>Your request is timestamped and shared with the owner.</p></div><div className="form-icon"><CalendarOff size={19}/></div></div><form onSubmit={submitSkip}><label>{t.chooseDate}</label><input className="field" type="date" value={skipDate} min="2026-11-19" onChange={e=>setSkipDate(e.target.value)} required/><label>{t.chooseMeal}</label><div className="meal-choice"><button type="button" className={meal==="Lunch"?"chosen":""} onClick={()=>setMeal("Lunch")}><span>☀️</span><strong>{t.lunch}</strong><small>12:00 PM – 2:30 PM</small></button><button type="button" className={meal==="Dinner"?"chosen":""} onClick={()=>setMeal("Dinner")}><span>🌙</span><strong>{t.dinner}</strong><small>7:00 PM – 9:30 PM</small></button></div><label>{t.reason}</label><textarea className="field textarea" rows="3" placeholder="e.g. Going home, college event..." value={reason} onChange={e=>setReason(e.target.value)}/><button className="primary-btn full" type="submit">{t.sendSkip}<ArrowUpRight size={17}/></button></form></section><aside className="panel cutoff-panel"><div className="cutoff-art">⏰</div><span className="eyebrow">PLEASE NOTE</span><h3>{t.cutoff}</h3><p>Submit your skip request before the meal preparation cut-off.</p><div className="cutoff-time"><div><span>☀️</span><strong>{t.lunchCut}</strong></div><div><span>🌙</span><strong>{t.dinnerCut}</strong></div></div><div className="info-note"><AlertCircle size={16}/> Requests after the cut-off may not be eligible for a meal credit.</div></aside></div></>;
}
function SeatScan({t,selectedSeat,setSelectedSeat,seatStatus,checkIn,checkedIn,setCheckedIn}) {
  return <><PageHeading eyebrow="ATTENDANCE" title={t.scanTitle} subtitle={t.scanSub}/><div className="scan-layout"><section className="panel seat-panel"><div className="section-head"><div><h3>Choose your seat</h3><p>Table A · Main dining area</p></div><span className="live-tag"><i/> LIVE DEMO</span></div><div className="seat-grid">{Array.from({length:12},(_,i)=>i+1).map(n=><button key={n} className={`seat ${seatStatus[n]?"taken":selectedSeat===n?"selected":""}`} onClick={()=>{setSelectedSeat(n);setCheckedIn(false);}} disabled={seatStatus[n]}><span>{n}</span><small>{seatStatus[n]?"Taken":"Seat"}</small></button>)}</div><div className="seat-legend"><span><i className="legend-free"/>Available</span><span><i className="legend-selected"/>Selected</span><span><i className="legend-taken"/>Occupied</span></div></section><aside className="panel qr-panel"><div className="qr-illustration"><div className="qr-frame"><QrCode size={86}/><span>TAAT · A{selectedSeat}</span></div></div><span className="eyebrow">{t.scanDemo}</span><h3>{t.seat} A-{selectedSeat}</h3><p>{t.scanDemoText}</p><button className="primary-btn full" onClick={checkIn} disabled={!!seatStatus[selectedSeat]}>{t.checkin}<ArrowUpRight size={17}/></button></aside></div>{checkedIn&&<Modal onClose={()=>setCheckedIn(false)}><div className="receipt-success"><div className="success-icon"><Check size={28}/></div><h2>{t.checkedIn}</h2><p>{t.checkedText}</p><div className="checkin-ticket"><QrCode size={42}/><div><strong>Seat A-{selectedSeat}</strong><small>Lunch · 19 Nov 2026</small></div><span className="status-pill verified">Present</span></div><button className="primary-btn full" onClick={()=>setCheckedIn(false)}>{t.done}</button></div></Modal>}</>;
}
function Receipts({t,receipts,filter,setFilter,verifyReceipt}) {
  return <><PageHeading eyebrow="OWNER WORKSPACE" title={t.ownerTitle} subtitle={t.ownerSub} action={<div className="date-chip"><ReceiptText size={16}/>{receipts.length} requests</div>}/><section className="panel receipts-panel"><div className="section-head"><div><h3>Skip request inbox</h3><p>Each request includes a time-stamped receipt.</p></div><div className="filter-tabs">{["All","Pending","Verified"].map(f=><button key={f} className={filter===f?"active":""} onClick={()=>setFilter(f)}>{f}</button>)}</div></div>{receipts.length===0?<div className="empty-large"><ReceiptText size={30}/><strong>{t.noRequests}</strong><span>New student requests will show up here.</span></div>:<div className="table-wrap"><table><thead><tr><th>STUDENT</th><th>MEAL & DATE</th><th>RECEIPT</th><th>TIME</th><th>STATUS</th><th>ACTION</th></tr></thead><tbody>{receipts.map(r=><tr key={r.id}><td><div className="table-person"><div className="avatar small">{r.name[0]}</div><strong>{r.name}</strong></div></td><td><strong>{r.meal}</strong><small className="table-sub">{r.date}</small></td><td>#{r.id}<small className="table-sub">{r.reason}</small></td><td>{r.time}</td><td><span className={`status-pill ${r.status.toLowerCase()}`}>{r.status}</span></td><td>{r.status==="Pending"?<button className="verify-btn" onClick={()=>verifyReceipt(r.id)}><Check size={14}/>{t.verify}</button>:<span className="verified-text"><CheckCheck size={15}/> Verified</span>}</td></tr>)}</tbody></table></div>}</section></>;
}
function Fees({t,role}) {
  return <><PageHeading eyebrow="PAYMENTS & INSIGHTS" title={t.feesTitle} subtitle={t.feesSub} action={<button className="outline-btn" onClick={()=>window.print()}><Download size={16}/>{t.download}</button>}/><div className="stats-grid"><StatCard icon={IndianRupee} label={t.totalFee} value="₹2,500" detail="Monthly meal plan" tone="blue"/><StatCard icon={CheckCircle2} label={t.paid} value="₹2,500" detail="Paid on 02 Nov 2026" tone="green"/><StatCard icon={Wallet} label={t.due} value="₹0" detail="No pending balance" tone="violet"/></div><div className="fees-layout"><section className="panel"><div className="section-head"><div><h3>{t.paymentHistory}</h3><p>{t.month}</p></div><CreditCard size={20} className="muted-icon"/></div><div className="payment-row"><div className="payment-icon"><IndianRupee size={17}/></div><div><strong>Monthly mess plan</strong><small>02 Nov 2026 · UPI payment</small></div><div className="payment-amount"><strong>₹2,500</strong><span className="status-pill verified">Paid</span></div></div><div className="payment-row"><div className="payment-icon"><CalendarOff size={17}/></div><div><strong>{t.skips}</strong><small>Approved meal skips this month</small></div><div className="payment-amount"><strong>06 meals</strong><span className="muted-small">Credit balance</span></div></div></section><section className="panel fee-summary"><span className="eyebrow">MONTHLY SUMMARY</span><h3>November 2026</h3><div className="summary-line"><span>Plan fee</span><strong>₹2,500</strong></div><div className="summary-line"><span>Amount paid</span><strong>₹2,500</strong></div><div className="summary-line"><span>Balance</span><strong className="green-text">₹0</strong></div><div className="progress-track"><span/></div><small className="muted-small">100% of this month’s fee paid</small></section></div></>;
}
function Modal({children,onClose}) { return <div className="modal-backdrop" onClick={onClose}><div className="modal-card" onClick={e=>e.stopPropagation()}><button className="modal-close" onClick={onClose}><X size={19}/></button>{children}</div></div>; }

export default App;