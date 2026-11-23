import { db, isFirebaseInitialized } from '../config/firebase.js';

// In-memory persistent state initialized with seed data matching user's reference UI
let inMemoryDb = {
  courses: [
    {
      id: 'course_vb_01',
      title: 'Visual Basic & Application Architecture',
      code: 'VB-204',
      shortTitle: 'Visual Basic',
      instructor: 'L. Hilpert',
      facultyId: 'demo_faculty_001',
      department: 'Software Engineering',
      description: 'Foundations of event-driven programming, component development, and GUI architecture.',
      schedule: 'Tuesday 9:30 - 12:30',
      enrolledCount: 24,
      maxSeats: 30,
      status: 'published',
      progress: 80,
      points: 20,
      createdAt: '2026-10-10T09:00:00Z'
    },
    {
      id: 'course_uiux_02',
      title: 'UI/UX Design Systems & Cognitive Ergonomics',
      code: 'DS-106',
      shortTitle: 'UI/UX Design',
      instructor: 'D. Goldner',
      facultyId: 'demo_faculty_001',
      department: 'Design & Human-Computer Interaction',
      description: 'User-centered design principles, wireframing, high-fidelity design systems, and usability heuristics.',
      schedule: 'Thursday 13:00 - 16:00',
      enrolledCount: 28,
      maxSeats: 30,
      status: 'published',
      progress: 20,
      points: 5,
      createdAt: '2026-10-12T10:00:00Z'
    },
    {
      id: 'course_seo_03',
      title: 'Search Engine Optimization & Digital Growth',
      code: 'MK-102',
      shortTitle: 'SEO',
      instructor: 'A. Fischer',
      facultyId: 'demo_faculty_002',
      department: 'Digital Media & Analytics',
      description: 'Technical SEO, indexing semantics, structured schema, and search performance analytics.',
      schedule: 'Wednesday 14:00 - 17:00',
      enrolledCount: 15,
      maxSeats: 25,
      status: 'published',
      progress: 0,
      points: 5,
      createdAt: '2026-10-14T11:00:00Z'
    },
    {
      id: 'course_js_04',
      title: 'Modern JavaScript & Reactive Systems',
      code: 'CS-302',
      shortTitle: 'JavaScript',
      instructor: 'Dr. Evelyn Sharma',
      facultyId: 'demo_faculty_001',
      department: 'Computer Science',
      description: 'Asynchronous event loops, closures, functional patterns, and browser runtime performance.',
      schedule: 'Monday 10:00 - 13:00',
      enrolledCount: 30,
      maxSeats: 30,
      status: 'published',
      progress: 70,
      points: 20,
      createdAt: '2026-10-15T09:00:00Z'
    }
  ],

  enrollments: [
    { id: 'enr_01', studentId: 'demo_student_001', courseId: 'course_vb_01', enrolledAt: '2026-10-15T09:00:00Z' },
    { id: 'enr_02', studentId: 'demo_student_001', courseId: 'course_uiux_02', enrolledAt: '2026-10-15T09:00:00Z' },
    { id: 'enr_03', studentId: 'demo_student_001', courseId: 'course_seo_03', enrolledAt: '2026-10-16T10:00:00Z' },
    { id: 'enr_04', studentId: 'demo_student_001', courseId: 'course_js_04', enrolledAt: '2026-10-16T11:00:00Z' }
  ],

  objectives: [
    {
      id: 'obj_01',
      courseId: 'course_vb_01',
      title: 'Recall Event-Driven Primitives',
      description: 'Identify handlers, listeners, and dispatch cycles in the runtime environment.',
      bloomsLevel: 1,
      bloomsLevelName: 'Remember',
      relatedTopics: ['Event Loops', 'Delegates'],
      expectedCompetency: 'Foundational Knowledge',
      status: 'approved'
    },
    {
      id: 'obj_02',
      courseId: 'course_vb_01',
      title: 'Explain GUI State Synchronization',
      description: 'Explain bidirectional binding and component state lifecycles.',
      bloomsLevel: 2,
      bloomsLevelName: 'Understand',
      relatedTopics: ['State Binding', 'Component Trees'],
      expectedCompetency: 'Conceptual Comprehension',
      status: 'approved'
    },
    {
      id: 'obj_03',
      courseId: 'course_vb_01',
      title: 'Implement Interactive Form Validators',
      description: 'Apply regex patterns and asynchronous validation logic to user input dialogs.',
      bloomsLevel: 3,
      bloomsLevelName: 'Apply',
      relatedTopics: ['Validation Logic', 'Form Controls'],
      expectedCompetency: 'Procedural Execution',
      status: 'approved'
    },
    {
      id: 'obj_04',
      courseId: 'course_vb_01',
      title: 'Analyze Memory Leaks in Event Subscriptions',
      description: 'Deconstruct unmanaged listener chains to eliminate circular references and memory bloat.',
      bloomsLevel: 4,
      bloomsLevelName: 'Analyze',
      relatedTopics: ['Memory Profiling', 'Garbage Collection'],
      expectedCompetency: 'Analytical Rigor',
      status: 'approved'
    },
    {
      id: 'obj_05',
      courseId: 'course_vb_01',
      title: 'Evaluate UI Architecture Scalability',
      description: 'Critique MVVM vs MVC paradigms for responsive modular enterprise systems.',
      bloomsLevel: 5,
      bloomsLevelName: 'Evaluate',
      relatedTopics: ['MVVM vs MVC', 'Design Patterns'],
      expectedCompetency: 'Critical Appraisal',
      status: 'approved'
    },
    {
      id: 'obj_06',
      courseId: 'course_vb_01',
      title: 'Design End-to-End Enterprise Desktop Suite',
      description: 'Synthesize custom controls, theme engines, and database abstraction layers into a unified tool.',
      bloomsLevel: 6,
      bloomsLevelName: 'Create',
      relatedTopics: ['System Synthesis', 'Custom Controls'],
      expectedCompetency: 'Original Innovation',
      status: 'approved'
    }
  ],

  assessments: [
    {
      id: 'asm_vb_01',
      courseId: 'course_vb_01',
      courseTitle: 'Visual Basic',
      title: 'Visual Basic Comprehensive Midterm Exam',
      tag: 'VISUAL BASIC',
      postedDate: 'Monday 19.10.2026',
      dueDate: 'Wednesday',
      points: 20,
      durationMinutes: 45,
      status: 'published',
      completionPercent: 80,
      commentsCount: 2,
      attachmentsCount: 3,
      questions: [
        {
          id: 'q1',
          questionText: 'Which event handler is fired immediately prior to a form being displayed on the screen?',
          questionType: 'mcq',
          options: ['Form_Load', 'Form_Initialize', 'Form_Activate', 'Form_Paint'],
          correctAnswer: 'Form_Load',
          maxMarks: 5,
          bloomsLevel: 1,
          bloomsLevelName: 'Remember',
          explanation: 'Form_Load triggers when the window is loaded into memory before rendering.'
        },
        {
          id: 'q2',
          questionText: 'Select all features that characterize managed event delegation in modular GUI applications:',
          questionType: 'multi_select',
          options: [
            'Loose coupling between publisher and subscriber',
            'Synchronous or asynchronous event propagation',
            'Direct memory pointer manipulation',
            'Multicast notification support'
          ],
          correctAnswer: 'Loose coupling between publisher and subscriber, Synchronous or asynchronous event propagation, Multicast notification support',
          maxMarks: 5,
          bloomsLevel: 2,
          bloomsLevelName: 'Understand',
          explanation: 'Event delegates enable decoupled, multicast notifications without unsafe direct pointers.'
        },
        {
          id: 'q3',
          questionText: 'Describe how a circular reference between an event publisher and a long-lived subscriber leads to memory leaks, and how weak event patterns prevent it.',
          questionType: 'short_answer',
          correctAnswer: 'The publisher retains a reference to the subscriber in its invocation list, preventing garbage collection. Weak references decouple the retention.',
          markingRubric: 'Identifies invocation list retention and explains weak reference collection.',
          maxMarks: 5,
          bloomsLevel: 4,
          bloomsLevelName: 'Analyze',
          explanation: 'Subscribers remain alive in memory as long as publishers hold active delegate handles.'
        },
        {
          id: 'q4',
          questionText: 'Critique the decision to use Data Binding over manual imperative UI updates in high-frequency trading dashboards.',
          questionType: 'long_answer',
          markingRubric: 'Evaluates throughput overhead of reflection/change notifications versus code maintainability.',
          maxMarks: 5,
          bloomsLevel: 5,
          bloomsLevelName: 'Evaluate',
          explanation: 'High-frequency rendering may bypass heavy reflection bindings in favor of direct hardware-accelerated canvas writes.'
        }
      ]
    },
    {
      id: 'asm_wf_02',
      courseId: 'course_uiux_02',
      courseTitle: 'Workflow Strategy',
      title: 'Workflow Strategy & User Journey Mapping',
      tag: 'WORKFLOW STRATEGY',
      postedDate: 'Monday 19.10.2026',
      dueDate: 'Wednesday',
      points: 5,
      durationMinutes: 30,
      status: 'published',
      completionPercent: 0,
      commentsCount: 2,
      attachmentsCount: 0,
      questions: [
        {
          id: 'qw1',
          questionText: 'In Nielsen Norman heuristics, what does Visibility of System Status dictate?',
          questionType: 'mcq',
          options: [
            'The system should always keep users informed through appropriate feedback within reasonable time.',
            'All database queries must be logged in plain text.',
            'Navigation menus must always remain sticky on scroll.',
            'Dark mode must be the default interface setting.'
          ],
          correctAnswer: 'The system should always keep users informed through appropriate feedback within reasonable time.',
          maxMarks: 5,
          bloomsLevel: 2,
          bloomsLevelName: 'Understand',
          explanation: 'Clear, continuous feedback prevents user anxiety and maintains perceived responsiveness.'
        }
      ]
    },
    {
      id: 'asm_ux_03',
      courseId: 'course_uiux_02',
      courseTitle: 'UI/UX Design',
      title: 'Design System Tokens & Accessibility Heuristics',
      tag: 'UI/UX DESIGN',
      postedDate: 'Monday 19.10.2026',
      dueDate: 'Wednesday',
      points: 5,
      durationMinutes: 20,
      status: 'published',
      completionPercent: 20,
      commentsCount: 1,
      attachmentsCount: 1,
      questions: [
        {
          id: 'qux1',
          questionText: 'What is the minimum WCAG 2.1 AA contrast ratio required for normal body text against its background?',
          questionType: 'mcq',
          options: ['3:1', '4.5:1', '7:1', '10:1'],
          correctAnswer: '4.5:1',
          maxMarks: 5,
          bloomsLevel: 1,
          bloomsLevelName: 'Remember',
          explanation: 'WCAG AA requires 4.5:1 for regular text and 3:1 for large text.'
        }
      ]
    }
  ],

  // Graded assessment history matching the UI
  historyAssessments: [
    { id: 'h1', subject: 'SEO', score: 0, maxScore: 5, status: 'CORRECTION PENDING', statusType: 'pending', dueDate: 'Due Friday 23.10.2026', submittedDate: 'Handed Thursday 22.10.2026' },
    { id: 'h2', subject: 'JAVASCRIPT', score: 14, maxScore: 20, status: 'GREAT', statusType: 'great', dueDate: 'Due Friday 23.10.2026', submittedDate: 'Handed Thursday 22.10.2026' },
    { id: 'h3', subject: 'HTML', score: 0, maxScore: 20, status: 'HANDED THURSDAY', statusType: 'neutral', dueDate: 'Due Friday 23.10.2026', submittedDate: 'Handed Thursday 22.10.2026' }
  ],

  // Weekly classes schedule matching the Gantt chart in the screenshot
  timetable: [
    {
      day: 'MONDAY',
      slots: [
        { id: 't_m1', title: 'JavaScript & Systems', code: 'CS-302', startHour: 12, endHour: 15, color: '#00b894' },
        { id: 't_m2', title: 'Lab Practice', code: 'CS-302L', startHour: 18, endHour: 20, color: '#00b894' }
      ]
    },
    {
      day: 'TUESDAY',
      slots: [
        { id: 't_tu1', title: 'Visual Basic (2/4)', code: 'VB-204', instructor: 'Lilian Hilpert', time: 'Tuesday 9:30 - 12:30', startHour: 11, endHour: 15, color: '#00b894', active: true },
        { id: 't_tu2', title: 'Application Architecture', code: 'VB-204L', startHour: 16, endHour: 19, color: '#00b894' }
      ]
    },
    {
      day: 'WEDNESDAY',
      slots: [
        { id: 't_w1', title: 'SEO & Growth Analytics', code: 'MK-102', startHour: 11, endHour: 15, color: '#00b894' },
        { id: 't_w2', title: 'Digital Marketing Review', code: 'MK-102', startHour: 18, endHour: 20, color: '#00b894' }
      ]
    },
    {
      day: 'THURSDAY',
      slots: [
        { id: 't_th1', title: 'UI/UX Design Systems', code: 'DS-106', startHour: 18, endHour: 20, color: '#00b894' }
      ]
    },
    {
      day: 'FRIDAY',
      slots: [
        { id: 't_f1', title: 'Case Study & Lab Review', code: 'CS-401', startHour: 11, endHour: 12, color: '#00b894' }
      ]
    }
  ],

  // Live Group Study Chat messages
  chatMessages: [
    {
      id: 'msg_01',
      sender: 'Cate Laurence',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80',
      time: '4:00 PM',
      text: 'Hello welcome to the group! ✨'
    },
    {
      id: 'msg_02',
      sender: 'Carl Maria',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
      time: '4:03 PM',
      text: 'Thank you Cate, looking forward to study 🙌'
    },
    {
      id: 'msg_03',
      sender: 'Anke Fischer',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&auto=format&fit=crop&q=80',
      time: '4:04 PM',
      text: 'Can anyone help explain Level 4 Analysis in the Visual Basic homework?'
    },
    {
      id: 'msg_04',
      sender: 'LearnSphere AI',
      isAI: true,
      avatar: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100&auto=format&fit=crop&q=80',
      time: '4:05 PM',
      text: 'Hi Anke! In Level 4 (Analyze), you deconstruct why circular references in unmanaged event delegates cause memory leaks. Check out the homework card on the right!'
    }
  ],

  // Student Competency Mastery Data (Average 15.7/20 or 78.5%)
  competencyScores: [
    { assessment: 'Quiz 1', score: 14, max: 20 },
    { assessment: 'Lab 1', score: 16, max: 20 },
    { assessment: 'Case Study', score: 20, max: 20, active: true },
    { assessment: 'Midterm', score: 12, max: 20 },
    { assessment: 'Quiz 2', score: 14, max: 20 },
    { assessment: 'Project', score: 18, max: 20 },
    { assessment: 'Final Prep', score: 16, max: 20 }
  ]
};

// Data access methods
export const getCourses = async () => inMemoryDb.courses;
export const getCourseById = async (id) => inMemoryDb.courses.find(c => c.id === id);

export const enrollInCourse = async ({ studentId, courseId }) => {
  const existing = inMemoryDb.enrollments.find(e => e.studentId === studentId && e.courseId === courseId);
  if (existing) {
    throw new Error('Student is already enrolled in this course');
  }
  const newEnrollment = {
    id: 'enr_' + Date.now(),
    studentId,
    courseId,
    enrolledAt: new Date().toISOString()
  };
  inMemoryDb.enrollments.push(newEnrollment);
  const course = inMemoryDb.courses.find(c => c.id === courseId);
  if (course) course.enrolledCount = (course.enrolledCount || 0) + 1;
  return newEnrollment;
};

export const getObjectivesForCourse = async (courseId) => {
  return inMemoryDb.objectives.filter(o => !courseId || o.courseId === courseId);
};

export const saveObjectives = async (newObjectives) => {
  newObjectives.forEach(obj => {
    inMemoryDb.objectives.push({
      id: 'obj_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4),
      status: 'approved',
      ...obj
    });
  });
  return inMemoryDb.objectives;
};

export const getAssessments = async (courseId) => {
  return inMemoryDb.assessments.filter(a => !courseId || a.courseId === courseId);
};

export const getAssessmentById = async (id, isStudent = false) => {
  const asm = inMemoryDb.assessments.find(a => a.id === id);
  if (!asm) return null;
  if (isStudent) {
    // Redact answers and rubrics for students
    return {
      ...asm,
      questions: asm.questions.map(q => ({
        id: q.id,
        questionText: q.questionText,
        questionType: q.questionType,
        options: q.options,
        maxMarks: q.maxMarks,
        bloomsLevel: q.bloomsLevel,
        bloomsLevelName: q.bloomsLevelName
      }))
    };
  }
  return asm;
};

export const saveAssessment = async (assessmentData) => {
  const newAsm = {
    id: 'asm_' + Date.now(),
    completionPercent: 0,
    status: 'published',
    commentsCount: 0,
    attachmentsCount: 0,
    ...assessmentData
  };
  inMemoryDb.assessments.push(newAsm);
  return newAsm;
};

export const getTimetable = async () => inMemoryDb.timetable;
export const getCompetencyScores = async () => inMemoryDb.competencyScores;
export const getHistoryAssessments = async () => inMemoryDb.historyAssessments;
export const getChatMessages = async () => inMemoryDb.chatMessages;

export const postChatMessage = async (msg) => {
  const newMsg = {
    id: 'msg_' + Date.now(),
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    ...msg
  };
  inMemoryDb.chatMessages.push(newMsg);
  return newMsg;
};

export default inMemoryDb;
