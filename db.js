/* ============================================================
   NEW SANSKAR ACADEMY — SHARED LOCAL DATABASE (db.js)
   Uses localStorage so every page (index, login, staff, student,
   admin) reads/writes the SAME data on this browser (client-side
   demo DB, not a real server DB).
   Include this file on every page BEFORE your page's own <script>.
   ============================================================ */

const DB_KEY = 'nsa_school_db_v1';
const SESSION_KEY = 'nsa_session_v1';

/* ---------- SEED DATA (used only the first time, or after Reset) ---------- */
function seedDB() {
  return {
    users: {
      admin: [
        { id: 'admin', password: 'admin123', name: 'Dr. R. Sharma', title: 'Principal / Director' }
      ],
      staff: [
        { id: 't001', password: 'staff123', name: 'Mrs. S. Verma', type: 'ct', class: '8A', subject: 'Science' },
        { id: 't002', password: 'staff123', name: 'Mr. A. Singh', type: 'ct', class: '9A', subject: 'Mathematics' },
        { id: 't003', password: 'staff123', name: 'Ms. P. Gupta', type: 'ct', class: '10A', subject: 'English' }
      ],
      students: [
        // Class 8A
        { id: 'S8A01', password: 'stud123', name: 'Aarav Patel', class: '8A', roll: 1, father: 'Mr. Rajesh Patel', mother: 'Mrs. Sunita Patel', contact: '98765 43210' },
        { id: 'S8A02', password: 'stud123', name: 'Priya Singh', class: '8A', roll: 2, father: 'Mr. Harish Singh', mother: 'Mrs. Kavita Singh', contact: '98765 12345' },
        { id: 'S8A03', password: 'stud123', name: 'Rahul Kumar', class: '8A', roll: 3, father: 'Mr. Suresh Kumar', mother: 'Mrs. Meena Kumar', contact: '98123 45678' },
        { id: 'S8A04', password: 'stud123', name: 'Sneha Jain', class: '8A', roll: 4, father: 'Mr. Manish Jain', mother: 'Mrs. Anita Jain', contact: '99000 11223' },
        // Class 9A
        { id: 'S9A01', password: 'stud123', name: 'Kabir Mehta', class: '9A', roll: 1, father: 'Mr. Anil Mehta', mother: 'Mrs. Rekha Mehta', contact: '97000 22334' },
        { id: 'S9A02', password: 'stud123', name: 'Isha Verma', class: '9A', roll: 2, father: 'Mr. Dinesh Verma', mother: 'Mrs. Pooja Verma', contact: '97000 55667' },
        { id: 'S9A03', password: 'stud123', name: 'Yash Malhotra', class: '9A', roll: 3, father: 'Mr. Vinod Malhotra', mother: 'Mrs. Seema Malhotra', contact: '96000 33445' },
        // Class 10A
        { id: 'S10A01', password: 'stud123', name: 'Anaya Kapoor', class: '10A', roll: 1, father: 'Mr. Rohit Kapoor', mother: 'Mrs. Neha Kapoor', contact: '95000 66778' },
        { id: 'S10A02', password: 'stud123', name: 'Dev Sharma', class: '10A', roll: 2, father: 'Mr. Ajay Sharma', mother: 'Mrs. Ritu Sharma', contact: '95000 88990' },
        { id: 'S10A03', password: 'stud123', name: 'Riya Chauhan', class: '10A', roll: 3, father: 'Mr. Sanjay Chauhan', mother: 'Mrs. Komal Chauhan', contact: '94000 11778' }
      ]
    },

    subjects: ['Hindi', 'English', 'Maths', 'Science', 'SocialSci'],

    // Every class shares the same two test names so "auto comparison" has something to compare.
    tests: ['Monthly Test 1', 'Monthly Test 2'],

    // key: "<class>_<date>"  ->  { studentId: {status, reason, note, lateBy} }
    attendance: {
      '8A_2026-08-13': {
        S8A01: { status: 'present' },
        S8A02: { status: 'present' },
        S8A03: { status: 'absent', reason: 'Fever', note: 'Medical certificate submitted' },
        S8A04: { status: 'late', lateBy: '15' }
      }
    },

    // key: "<class>_<test>_<studentId>" -> { Subject: { o, t } }
    marks: {
      '8A_Monthly Test 1_S8A01': { Hindi: { o: 72, t: 100 }, English: { o: 80, t: 100 }, Maths: { o: 88, t: 100 }, Science: { o: 85, t: 100 }, SocialSci: { o: 70, t: 100 } },
      '8A_Monthly Test 2_S8A01': { Hindi: { o: 78, t: 100 }, English: { o: 85, t: 100 }, Maths: { o: 92, t: 100 }, Science: { o: 88, t: 100 }, SocialSci: { o: 72, t: 100 } },
      '8A_Monthly Test 1_S8A02': { Hindi: { o: 70, t: 100 }, English: { o: 88, t: 100 }, Maths: { o: 75, t: 100 }, Science: { o: 80, t: 100 }, SocialSci: { o: 65, t: 100 } },
      '8A_Monthly Test 2_S8A02': { Hindi: { o: 65, t: 100 }, English: { o: 90, t: 100 }, Maths: { o: 78, t: 100 }, Science: { o: 82, t: 100 }, SocialSci: { o: 68, t: 100 } }
    },

    // key: "<teacherId>_<studentId>" -> [{from:'teacher'|'parent', msg, time}]
    chat: {
      't001_S8A01': [
        { from: 'teacher', msg: 'Aarav ka maths improve ho rha hai, last test me 92 aaye hain!', time: '2026-08-13T10:00:00' },
        { from: 'parent', msg: 'Bahut achha! Mera baccha maths me weak hai, kya extra classes hain?', time: '2026-08-13T10:30:00' },
        { from: 'teacher', msg: 'Haan, Mon-Wed 4PM extra maths class hai. Main schedule bhej dunga.', time: '2026-08-13T11:15:00' },
        { from: 'parent', msg: 'Thank you mam!', time: '2026-08-13T11:20:00' }
      ]
    },

    // Admin controls per-student visibility of results and fees.
    // Missing entry = default visible (showResults:true, showFees:true).
    studentSettings: {
      S8A03: { showResults: false, showFees: true, resultLockReason: 'Fees pending (Q3 not paid)' }
    },

    // key: studentId -> { total, quarters: { Q1:{amount,paid,date,method}, ... } }
    fees: {
      S8A01: { total: 25000, quarters: { Q1: { amount: 6250, paid: true, date: '2026-04-10', method: 'UPI' }, Q2: { amount: 6250, paid: true, date: '2026-07-15', method: 'Cash' }, Q3: { amount: 6250, paid: false }, Q4: { amount: 6250, paid: false } } },
      S8A02: { total: 25000, quarters: { Q1: { amount: 6250, paid: true, date: '2026-04-12', method: 'Bank' }, Q2: { amount: 6250, paid: true, date: '2026-07-18', method: 'UPI' }, Q3: { amount: 6250, paid: true, date: '2026-08-01', method: 'UPI' }, Q4: { amount: 6250, paid: false } } },
      S8A03: { total: 25000, quarters: { Q1: { amount: 6250, paid: true, date: '2026-04-09', method: 'Cash' }, Q2: { amount: 6250, paid: false }, Q3: { amount: 6250, paid: false }, Q4: { amount: 6250, paid: false } } }
    },

    // Posted by admin — targeted + time-windowed. null visibleUntil = forever.
    notices: [
      {
        id: 'N1', title: 'Parent-Teacher Meeting', desc: 'All parents are requested to attend the PTM scheduled on 25th August 2026 to discuss half-yearly performance.',
        category: 'event', targetClasses: ['ALL'], targetAudience: 'all',
        visibleFrom: '2026-08-10T00:00:00', visibleUntil: null, isPinned: true, createdAt: '2026-08-10T07:30:00'
      },
      {
        id: 'N2', title: 'Annual Sports Day', desc: 'The Annual Sports Day will be held on 15th August. Students interested should register with the sports department by 12th August.',
        category: 'general', targetClasses: ['ALL'], targetAudience: 'all',
        visibleFrom: '2026-08-05T00:00:00', visibleUntil: null, isPinned: false, createdAt: '2026-08-05T09:00:00'
      }
    ],

    gallery: [
      { id: 'G1', url: 'https://z-cdn-media.chatglm.cn/files/04c767cd-1c13-4a4e-9011-34fd9961de88.png?auth_key=1886449124-e5f6ba766d034c77af1d45200aa3a970-0-132ee08959cb2ea5545ba1b77f583fa4', caption: 'Main Building' },
      { id: 'G2', url: 'https://z-cdn-media.chatglm.cn/files/c5f7f86f-d63d-4b50-8716-b6f71ad2e7bb.png?auth_key=1886449124-21a3c2d4063a4cab9532d1d8757a3f1a-0-bd27e24eea173b651d67a658e3d57b78', caption: 'Green Campus' }
    ],

    siteContent: {
      title: 'New Sanskar Academy High Secondary School',
      motto: 'Knowledge is Power, Education is Life',
      about: 'Established in 2005, New Sanskar Academy High Secondary School has been a beacon of holistic education at Dhannad Khurd, Pithampur — blending traditional values with modern pedagogy.',
      logoUrl: 'https://z-cdn-media.chatglm.cn/files/86ea5126-69b9-4081-b946-64aa0a44bd93.png?auth_key=1886449124-077c5874f267495baec4b40eaeb6d993-0-a4f5d6545971547cd066013f776aca37'
    },

    // Base annual fee per class — admin can edit; classes not listed here default to ₹25,000.
    classFees: {},

    activityLog: [
      { type: 'staff_added', text: 'Ms. P. Gupta added as Class Teacher (10A)', time: '2026-08-09T10:00:00' },
      { type: 'marks_uploaded', text: 'Marks uploaded for Class 8A — Monthly Test 2', time: '2026-08-12T14:00:00' },
      { type: 'notice_posted', text: 'Notice posted: Parent-Teacher Meeting', time: '2026-08-10T07:30:00' }
    ]
  };
}

/* ---------- CORE LOAD / SAVE ---------- */
const DB = {
  load() {
    let raw = localStorage.getItem(DB_KEY);
    if (!raw) {
      const seeded = seedDB();
      localStorage.setItem(DB_KEY, JSON.stringify(seeded));
      return seeded;
    }
    try {
      const parsed = JSON.parse(raw);
      // Fill in any new fields added by later versions of this file, without wiping existing data.
      const fresh = seedDB();
      let changed = false;
      ['studentSettings', 'fees', 'gallery', 'siteContent', 'activityLog', 'classFees'].forEach(key => {
        if (parsed[key] === undefined) { parsed[key] = fresh[key]; changed = true; }
      });
      if (changed) localStorage.setItem(DB_KEY, JSON.stringify(parsed));
      return parsed;
    } catch (e) {
      const seeded = seedDB();
      localStorage.setItem(DB_KEY, JSON.stringify(seeded));
      return seeded;
    }
  },

  save(db) {
    localStorage.setItem(DB_KEY, JSON.stringify(db));
  },

  // Wipes everything and reseeds — useful while testing.
  reset() {
    const seeded = seedDB();
    localStorage.setItem(DB_KEY, JSON.stringify(seeded));
    return seeded;
  },

  /* ---------- AUTH ---------- */
  authenticate(role, id, password) {
    const db = this.load();
    const list = db.users[role] || [];
    const match = list.find(u => u.id.toLowerCase() === String(id).trim().toLowerCase() && u.password === password);
    return match || null;
  },

  setSession(user, role) {
    const session = { role, id: user.id, name: user.name, class: user.class || null, subject: user.subject || null };
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    return session;
  },

  getSession() {
    const raw = localStorage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  },

  clearSession() {
    localStorage.removeItem(SESSION_KEY);
  },

  /* ---------- ACTIVITY LOG ---------- */
  logActivity(type, text) {
    const db = this.load();
    if (!db.activityLog) db.activityLog = [];
    db.activityLog.unshift({ type, text, time: new Date().toISOString() });
    db.activityLog = db.activityLog.slice(0, 50);
    this.save(db);
  },

  getRecentActivity(limit) {
    const db = this.load();
    return (db.activityLog || []).slice(0, limit || 5);
  },

  /* ---------- STUDENTS / CLASSES ---------- */
  getClassStudents(cls) {
    const db = this.load();
    return db.users.students.filter(s => s.class === cls).sort((a, b) => a.roll - b.roll);
  },

  getStudentById(studentId) {
    const db = this.load();
    return db.users.students.find(s => s.id === studentId) || null;
  },

  getAllStudents() {
    const db = this.load();
    return db.users.students.slice().sort((a, b) => a.class.localeCompare(b.class) || a.roll - b.roll);
  },

  getTeacherByClass(cls) {
    const db = this.load();
    return db.users.staff.find(t => t.class === cls) || null;
  },

  getTeacherById(teacherId) {
    const db = this.load();
    return db.users.staff.find(t => t.id === teacherId) || null;
  },

  getAllStaff() {
    const db = this.load();
    return db.users.staff.slice();
  },

  // Every distinct class that has a teacher and/or a student.
  getClasses() {
    const db = this.load();
    const set = new Set();
    db.users.staff.forEach(t => { if (t.class) set.add(t.class); });
    db.users.students.forEach(s => { if (s.class) set.add(s.class); });
    return Array.from(set).sort();
  },

  /* ---------- ADMIN: CREATE / EDIT / DELETE STAFF ---------- */
  generateStaffId(type) {
    const db = this.load();
    const prefix = type === 'hw' ? 'hw' : 't';
    let n = 1;
    let id;
    do {
      id = prefix + String(n).padStart(3, '0');
      n++;
    } while (db.users.staff.some(s => s.id === id));
    return id;
  },

  addStaff({ name, subject, type, cls }) {
    const db = this.load();
    const id = this.generateStaffId(type);
    const staff = { id, password: 'staff123', name, type: type || 'ct', class: type === 'hw' ? null : (cls || null), subject: subject || '' };
    db.users.staff.push(staff);
    this.save(db);
    this.logActivity('staff_added', name + ' added as ' + (type === 'hw' ? 'Homework Team' : ('Class Teacher (' + (cls || '—') + ')')));
    return staff;
  },

  updateStaff(id, updates) {
    const db = this.load();
    const staff = db.users.staff.find(s => s.id === id);
    if (!staff) return null;
    Object.assign(staff, updates);
    this.save(db);
    return staff;
  },

  resetStaffPassword(id, newPassword) {
    return this.updateStaff(id, { password: newPassword });
  },

  deleteStaff(id) {
    const db = this.load();
    db.users.staff = db.users.staff.filter(s => s.id !== id);
    this.save(db);
  },

  /* ---------- ADMIN: CREATE / EDIT / DELETE STUDENTS ---------- */
  generateStudentId(cls) {
    const db = this.load();
    const inClass = db.users.students.filter(s => s.class === cls);
    let roll = inClass.length + 1;
    let id;
    do {
      id = 'S' + cls + String(roll).padStart(2, '0');
      roll++;
    } while (db.users.students.some(s => s.id === id));
    return { id, roll: roll - 1 };
  },

  addStudent({ name, cls, father, mother, contact }) {
    const db = this.load();
    const { id, roll } = this.generateStudentId(cls);
    const student = { id, password: 'stud123', name, class: cls, roll, father: father || '', mother: mother || '', contact: contact || '' };
    db.users.students.push(student);
    this.save(db);
    this.logActivity('student_added', name + ' added to Class ' + cls);
    return student;
  },

  updateStudent(id, updates) {
    const db = this.load();
    const student = db.users.students.find(s => s.id === id);
    if (!student) return null;
    Object.assign(student, updates);
    this.save(db);
    return student;
  },

  resetStudentPassword(id, newPassword) {
    return this.updateStudent(id, { password: newPassword });
  },

  deleteStudent(id) {
    const db = this.load();
    db.users.students = db.users.students.filter(s => s.id !== id);
    delete db.studentSettings[id];
    delete db.fees[id];
    this.save(db);
  },

  /* ---------- ADMIN: RESULT / FEE VISIBILITY CONTROL ---------- */
  getStudentSettings(studentId) {
    const db = this.load();
    return db.studentSettings[studentId] || { showResults: true, showFees: true, resultLockReason: null };
  },

  setResultVisibility(studentId, visible, reason) {
    const db = this.load();
    if (!db.studentSettings[studentId]) db.studentSettings[studentId] = { showResults: true, showFees: true, resultLockReason: null };
    db.studentSettings[studentId].showResults = visible;
    db.studentSettings[studentId].resultLockReason = visible ? null : (reason || 'Locked by admin');
    this.save(db);
  },

  setFeeVisibility(studentId, visible) {
    const db = this.load();
    if (!db.studentSettings[studentId]) db.studentSettings[studentId] = { showResults: true, showFees: true, resultLockReason: null };
    db.studentSettings[studentId].showFees = visible;
    this.save(db);
  },

  bulkLockResultsForPendingFees() {
    const db = this.load();
    let count = 0;
    db.users.students.forEach(s => {
      const summary = this.getFeeSummary(s.id);
      if (summary.due > 0) {
        if (!db.studentSettings[s.id]) db.studentSettings[s.id] = { showResults: true, showFees: true, resultLockReason: null };
        db.studentSettings[s.id].showResults = false;
        db.studentSettings[s.id].resultLockReason = 'Fees pending (₹' + summary.due + ' due)';
        count++;
      }
    });
    this.save(db);
    return count;
  },

  bulkUnlockAllResults() {
    const db = this.load();
    let count = 0;
    Object.keys(db.studentSettings).forEach(id => {
      if (db.studentSettings[id].showResults === false) count++;
      db.studentSettings[id].showResults = true;
      db.studentSettings[id].resultLockReason = null;
    });
    this.save(db);
    return count;
  },

  /* ---------- FEES ---------- */
  // Base annual fee per class — set by admin. Falls back to ₹25,000 for a class with no fee set yet.
  getClassFee(cls) {
    const db = this.load();
    return (db.classFees && db.classFees[cls]) || 25000;
  },

  setClassFee(cls, amount) {
    const db = this.load();
    if (!db.classFees) db.classFees = {};
    db.classFees[cls] = amount;
    this.save(db);
  },

  getAllClassFees() {
    const db = this.load();
    return db.classFees || {};
  },

  defaultFeeRecord(total) {
    const q = Math.round(total / 4);
    return { total, quarters: { Q1: { amount: q, paid: false }, Q2: { amount: q, paid: false }, Q3: { amount: q, paid: false }, Q4: { amount: q, paid: false } } };
  },

  getFees(studentId) {
    const db = this.load();
    if (db.fees[studentId]) return db.fees[studentId];
    const student = this.getStudentById(studentId);
    const total = student ? this.getClassFee(student.class) : 25000;
    return this.defaultFeeRecord(total);
  },

  getFeeSummary(studentId) {
    const fees = this.getFees(studentId);
    let paid = 0;
    Object.values(fees.quarters).forEach(q => { if (q.paid) paid += q.amount; });
    return { total: fees.total, paid, due: fees.total - paid };
  },

  recordFeePayment(studentId, quarter, amount, method, date) {
    const db = this.load();
    if (!db.fees[studentId]) db.fees[studentId] = this.getFees(studentId);
    db.fees[studentId].quarters[quarter] = { amount: amount, paid: true, date: date || new Date().toISOString().slice(0, 10), method: method || 'Cash' };
    this.save(db);
    this.logActivity('fee_recorded', '₹' + amount + ' (' + quarter + ') recorded for ' + (this.getStudentById(studentId) || {}).name);
  },

  // Admin gives a student a custom total fee (scholarship / sibling discount / concession).
  // Already-paid quarters keep their recorded amount; the remaining balance is split across unpaid quarters.
  setStudentFeeOverride(studentId, newTotal, reason) {
    const db = this.load();
    const current = this.getFees(studentId);
    let paidSum = 0;
    const unpaidKeys = [];
    Object.keys(current.quarters).forEach(k => {
      if (current.quarters[k].paid) paidSum += current.quarters[k].amount;
      else unpaidKeys.push(k);
    });
    const remaining = Math.max(0, newTotal - paidSum);
    const perQuarter = unpaidKeys.length ? Math.round(remaining / unpaidKeys.length) : 0;
    const newQuarters = Object.assign({}, current.quarters);
    unpaidKeys.forEach(k => { newQuarters[k] = Object.assign({}, newQuarters[k], { amount: perQuarter }); });
    db.fees[studentId] = { total: newTotal, quarters: newQuarters, discountReason: reason || null };
    this.save(db);
    this.logActivity('fee_recorded', 'Custom fee ₹' + newTotal + ' set for ' + (this.getStudentById(studentId) || {}).name + (reason ? ' (' + reason + ')' : ''));
  },

  clearStudentFeeOverride(studentId) {
    const db = this.load();
    const student = this.getStudentById(studentId);
    if (!student) return;
    const classTotal = this.getClassFee(student.class);
    db.fees[studentId] = this.defaultFeeRecord(classTotal);
    this.save(db);
  },

  /* ---------- ATTENDANCE ---------- */
  getAttendance(cls, date) {
    const db = this.load();
    return db.attendance[cls + '_' + date] || {};
  },

  saveAttendance(cls, date, data) {
    const db = this.load();
    db.attendance[cls + '_' + date] = data;
    this.save(db);
  },

  isHoliday(cls, date) {
    const rec = this.getAttendance(cls, date);
    const vals = Object.values(rec);
    return vals.length > 0 && vals.every(v => v.status === 'holiday');
  },

  getAttendanceHistory(cls, limit) {
    const db = this.load();
    const prefix = cls + '_';
    return Object.keys(db.attendance)
      .filter(k => k.startsWith(prefix))
      .sort().reverse()
      .slice(0, limit || 10)
      .map(k => ({ date: k.slice(prefix.length), data: db.attendance[k] }));
  },

  // All attendance rows for one student across every date recorded (for the student dashboard).
  getStudentAttendance(cls, studentId) {
    const db = this.load();
    const prefix = cls + '_';
    const out = {};
    Object.keys(db.attendance).forEach(k => {
      if (k.startsWith(prefix) && db.attendance[k][studentId]) {
        out[k.slice(prefix.length)] = db.attendance[k][studentId];
      }
    });
    return out;
  },

  /* ---------- MARKS ---------- */
  getSubjects() {
    return this.load().subjects;
  },

  getTests() {
    return this.load().tests;
  },

  // Teacher/admin can create a new test (e.g. "Monthly Test 3", "Half Yearly").
  addTest(name) {
    const db = this.load();
    if (!db.tests.includes(name)) {
      db.tests.push(name);
      this.save(db);
    }
    return db.tests;
  },

  getMarks(cls, test, studentId) {
    const db = this.load();
    return db.marks[cls + '_' + test + '_' + studentId] || null;
  },

  saveMark(cls, test, studentId, subject, obtained, total) {
    const db = this.load();
    const key = cls + '_' + test + '_' + studentId;
    if (!db.marks[key]) db.marks[key] = {};
    db.marks[key][subject] = { o: obtained, t: total || 100 };
    this.save(db);
  },

  // All marks for a student across all tests (for the student dashboard).
  getStudentAllMarks(cls, studentId) {
    const db = this.load();
    const out = {};
    (db.tests || []).forEach(test => {
      const m = db.marks[cls + '_' + test + '_' + studentId];
      if (m) out[test] = m;
    });
    return out;
  },

  /* ---------- CHAT ---------- */
  getChat(teacherId, studentId) {
    const db = this.load();
    return db.chat[teacherId + '_' + studentId] || [];
  },

  addChatMessage(teacherId, studentId, from, msg) {
    const db = this.load();
    const key = teacherId + '_' + studentId;
    if (!db.chat[key]) db.chat[key] = [];
    db.chat[key].push({ from, msg, time: new Date().toISOString() });
    this.save(db);
  },

  // Admin: read-only summary of every conversation across the school.
  getAllChatsSummary() {
    const db = this.load();
    return Object.keys(db.chat).map(key => {
      const idx = key.indexOf('_');
      const teacherId = key.slice(0, idx);
      const studentId = key.slice(idx + 1);
      const teacher = this.getTeacherById(teacherId);
      const student = this.getStudentById(studentId);
      const msgs = db.chat[key];
      const last = msgs.length ? msgs[msgs.length - 1] : null;
      return {
        teacherId, studentId,
        teacherName: teacher ? teacher.name : teacherId,
        studentName: student ? student.name : studentId,
        cls: student ? student.class : '—',
        lastMsg: last ? last.msg : '',
        lastTime: last ? last.time : null,
        unreadByStaff: last ? last.from === 'parent' : false,
        count: msgs.length
      };
    }).sort((a, b) => (b.lastTime || '').localeCompare(a.lastTime || ''));
  },

  /* ---------- NOTICES (admin posts with targeting + timer) ---------- */
  getAllNotices() {
    const db = this.load();
    return db.notices.slice().sort((a, b) => (b.createdAt || '').localeCompare(a.createdAt || ''));
  },

  addNotice(notice) {
    const db = this.load();
    const id = 'N' + (db.notices.length ? Math.max(...db.notices.map(n => parseInt(n.id.slice(1)) || 0)) + 1 : 1);
    const full = Object.assign({
      id,
      targetClasses: ['ALL'],
      targetAudience: 'all',
      visibleFrom: new Date().toISOString(),
      visibleUntil: null,
      isPinned: false,
      createdAt: new Date().toISOString()
    }, notice, { id });
    db.notices.push(full);
    this.save(db);
    this.logActivity('notice_posted', 'Notice posted: ' + full.title);
    return full;
  },

  updateNotice(id, updates) {
    const db = this.load();
    const n = db.notices.find(x => x.id === id);
    if (!n) return null;
    Object.assign(n, updates);
    this.save(db);
    return n;
  },

  deleteNotice(id) {
    const db = this.load();
    db.notices = db.notices.filter(n => n.id !== id);
    this.save(db);
  },

  togglePinNotice(id) {
    const db = this.load();
    const n = db.notices.find(x => x.id === id);
    if (!n) return;
    n.isPinned = !n.isPinned;
    this.save(db);
  },

  noticeStatus(n) {
    const now = new Date();
    const from = n.visibleFrom ? new Date(n.visibleFrom) : null;
    const until = n.visibleUntil ? new Date(n.visibleUntil) : null;
    if (from && now < from) return 'scheduled';
    if (until && now > until) return 'expired';
    return 'visible';
  },

  // Used by staff/student dashboards to only show notices meant for them, within the time window.
  getVisibleNotices(role, cls) {
    const db = this.load();
    const now = new Date();
    return db.notices.filter(n => {
      const from = n.visibleFrom ? new Date(n.visibleFrom) : null;
      const until = n.visibleUntil ? new Date(n.visibleUntil) : null;
      if (from && now < from) return false;
      if (until && now > until) return false;
      if (n.targetAudience === 'students_only' && role !== 'student') return false;
      if (n.targetAudience === 'staff_only' && role !== 'staff') return false;
      if (n.targetClasses && n.targetClasses[0] !== 'ALL' && role === 'student') {
        if (n.targetClasses.indexOf(cls) === -1) return false;
      }
      return true;
    }).sort((a, b) => {
      if (a.isPinned && !b.isPinned) return -1;
      if (!a.isPinned && b.isPinned) return 1;
      return (b.createdAt || '').localeCompare(a.createdAt || '');
    });
  },

  /* Backwards-compatible plain getter (used by earlier pages) */
  getNotices() {
    return this.load().notices;
  },

  /* ---------- WEBSITE MANAGER ---------- */
  getSiteContent() {
    return this.load().siteContent;
  },

  saveSiteContent(content) {
    const db = this.load();
    db.siteContent = Object.assign(db.siteContent, content);
    this.save(db);
  },

  getGallery() {
    return this.load().gallery;
  },

  addGalleryPhoto(url, caption) {
    const db = this.load();
    const id = 'G' + (db.gallery.length ? Math.max(...db.gallery.map(g => parseInt(g.id.slice(1)) || 0)) + 1 : 1);
    db.gallery.push({ id, url, caption: caption || '' });
    this.save(db);
  },

  deleteGalleryPhoto(id) {
    const db = this.load();
    db.gallery = db.gallery.filter(g => g.id !== id);
    this.save(db);
  },

  /* ---------- ADMIN DASHBOARD STATS (all computed live from real data) ---------- */
  getStats() {
    const db = this.load();
    return {
      totalStudents: db.users.students.length,
      totalStaff: db.users.staff.length,
      activeClasses: this.getClasses().length,
      activeNotices: this.getAllNotices().filter(n => this.noticeStatus(n) === 'visible').length
    };
  },

  getAlerts() {
    const db = this.load();
    const lockedCount = db.users.students.filter(s => this.getStudentSettings(s.id).showResults === false).length;
    const unreadByStaff = this.getAllChatsSummary().filter(c => c.unreadByStaff).length;
    const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    const staffThisWeek = (db.activityLog || []).filter(a => a.type === 'staff_added' && new Date(a.time) > weekAgo).length;
    return { lockedCount, unreadByStaff, staffThisWeek };
  },

  /* ---------- GRADE HELPERS (shared everywhere so numbers always match) ---------- */
  calcGrade(marks) {
    if (marks >= 91) return { grade: 'A+', color: '#34d399' };
    if (marks >= 81) return { grade: 'A', color: '#10b981' };
    if (marks >= 71) return { grade: 'B+', color: '#fbbf24' };
    if (marks >= 61) return { grade: 'B', color: '#f59e0b' };
    if (marks >= 51) return { grade: 'C+', color: '#fb923c' };
    if (marks >= 41) return { grade: 'C', color: '#f97316' };
    if (marks >= 33) return { grade: 'D', color: '#ef4444' };
    return { grade: 'F', color: '#dc2626' };
  }
};

// Make sure the DB exists as soon as this file loads on any page.
DB.load();
