import { initializeApp } from 'firebase/app';
import { getFirestore, collection, doc, setDoc, writeBatch } from 'firebase/firestore';
import * as dotenv from 'dotenv';
import * as path from 'path';

// Load environment variables from .env.local or .env
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

// Firebase config
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_LEARN_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_LEARN_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_LEARN_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_LEARN_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_LEARN_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_LEARN_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app, 'default');

// ========================================
// MODULES DATA
// ========================================

const modulesData = [
  {
    id: 'career-mapping',
    title: 'Career Mapping & Personal Branding',
    description: 'Build a strong foundation by understanding your career goals, strengths, and how to position yourself professionally.',
    weekRange: 'Week 1-2',
    order: 1,
    published: true,
    lessons: [
      {
        id: 'lesson-1',
        title: 'Understanding Your Career Goals',
        description: 'Identify your long-term career aspirations and create a roadmap to achieve them.',
        contentType: 'video',
        videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        duration: 15,
        order: 1,
        content: '<h2>Welcome to ASAP!</h2><p>In this lesson, you\'ll learn how to identify your career goals and create a strategic plan to achieve them.</p><h3>Key Topics:</h3><ul><li>Self-assessment techniques</li><li>Setting SMART career goals</li><li>Creating your 5-year career roadmap</li></ul>',
        resources: [
          {
            title: 'Career Goals Worksheet',
            description: 'A practical worksheet to map out your career objectives',
            fileUrl: 'https://example.com/career-goals.pdf',
          },
        ],
      },
      {
        id: 'lesson-2',
        title: 'Personal SWOT Analysis',
        description: 'Analyze your Strengths, Weaknesses, Opportunities, and Threats to position yourself strategically.',
        contentType: 'article',
        articleUrl: 'https://example.com/swot-analysis-guide',
        duration: 20,
        order: 2,
        content: '<h2>Personal SWOT Analysis</h2><p>Understanding your competitive advantages is crucial for career success.</p><h3>Framework:</h3><ul><li><strong>Strengths:</strong> What unique skills do you bring?</li><li><strong>Weaknesses:</strong> What areas need development?</li><li><strong>Opportunities:</strong> What market trends can you leverage?</li><li><strong>Threats:</strong> What challenges might you face?</li></ul>',
        resources: [],
      },
      {
        id: 'lesson-3',
        title: 'Building Your Personal Brand',
        description: 'Create a compelling professional identity that stands out to employers and peers.',
        contentType: 'video',
        videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        duration: 25,
        order: 3,
        content: '<h2>Your Personal Brand</h2><p>Your personal brand is how you present yourself professionally to the world.</p><h3>Key Elements:</h3><ul><li>Professional online presence</li><li>Consistent messaging across platforms</li><li>Unique value proposition</li><li>Authentic storytelling</li></ul>',
        resources: [
          {
            title: 'Personal Brand Canvas',
            description: 'Template to define your brand identity',
            fileUrl: 'https://example.com/brand-canvas.pdf',
          },
        ],
      },
      {
        id: 'lesson-4',
        title: 'Crafting Your Professional Story',
        description: 'Learn to tell your story in a way that resonates with recruiters and hiring managers.',
        contentType: 'article',
        articleUrl: 'https://example.com/storytelling-guide',
        duration: 18,
        order: 4,
        content: '<h2>The Power of Storytelling</h2><p>Your professional story is your secret weapon in interviews and networking.</p><h3>Story Structure:</h3><ul><li>Where you started (background)</li><li>Key turning points (experience)</li><li>Where you\'re going (goals)</li><li>Why this opportunity matters (motivation)</li></ul>',
        resources: [],
      },
      {
        id: 'lesson-5',
        title: 'Creating Your Career Portfolio',
        description: 'Build a portfolio that showcases your skills, projects, and achievements.',
        contentType: 'pdf',
        pdfUrl: 'https://example.com/portfolio-guide.pdf',
        duration: 30,
        order: 5,
        content: '<h2>Portfolio Essentials</h2><p>A strong portfolio sets you apart from other candidates.</p><h3>What to Include:</h3><ul><li>Best projects with context and results</li><li>Quantifiable achievements</li><li>Skills demonstration</li><li>Case studies (for some fields)</li><li>Testimonials and recommendations</li></ul>',
        resources: [
          {
            title: 'Portfolio Template',
            description: 'Ready-to-use portfolio structure',
            fileUrl: 'https://example.com/portfolio-template.zip',
          },
        ],
      },
    ],
  },
  {
    id: 'professional-communication',
    title: 'Professional Communication',
    description: 'Master the art of communicating effectively in professional settings, from emails to presentations.',
    weekRange: 'Week 3-4',
    order: 2,
    published: true,
    lessons: [
      {
        id: 'lesson-1',
        title: 'Email Etiquette for Professionals',
        description: 'Write clear, concise, and professional emails that get responses.',
        contentType: 'article',
        articleUrl: 'https://example.com/email-etiquette',
        duration: 15,
        order: 1,
        content: '<h2>Professional Email Communication</h2><p>Email is your primary business communication tool.</p><h3>Best Practices:</h3><ul><li>Clear subject lines</li><li>Professional greetings</li><li>Concise body (max 3 paragraphs)</li><li>Clear call-to-action</li><li>Professional signature</li></ul>',
        resources: [
          {
            title: 'Email Templates Pack',
            description: '10 professional email templates',
            fileUrl: 'https://example.com/email-templates.pdf',
          },
        ],
      },
      {
        id: 'lesson-2',
        title: 'Virtual Meeting Mastery',
        description: 'Present yourself professionally in virtual meetings and video calls.',
        contentType: 'video',
        videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        duration: 20,
        order: 2,
        content: '<h2>Virtual Meeting Excellence</h2><p>Remote work makes video call skills essential.</p><h3>Key Tips:</h3><ul><li>Professional background and lighting</li><li>Camera positioning (eye level)</li><li>Active listening signals</li><li>Clear and concise speaking</li><li>Mute when not speaking</li></ul>',
        resources: [],
      },
      {
        id: 'lesson-3',
        title: 'Presentation Skills',
        description: 'Deliver compelling presentations that engage and persuade your audience.',
        contentType: 'video',
        videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        duration: 25,
        order: 3,
        content: '<h2>Presentation Excellence</h2><p>Great presentations can advance your career.</p><h3>Structure:</h3><ul><li>Strong opening (hook)</li><li>Clear agenda</li><li>3-5 key points max</li><li>Stories and examples</li><li>Powerful closing with CTA</li></ul>',
        resources: [
          {
            title: 'Presentation Template',
            description: 'Professional slide deck template',
            fileUrl: 'https://example.com/presentation.pptx',
          },
        ],
      },
      {
        id: 'lesson-4',
        title: 'Business Writing Fundamentals',
        description: 'Write professional documents, reports, and proposals that get results.',
        contentType: 'article',
        articleUrl: 'https://example.com/business-writing',
        duration: 22,
        order: 4,
        content: '<h2>Business Writing</h2><p>Clear writing = clear thinking.</p><h3>Principles:</h3><ul><li>Know your audience</li><li>Start with the conclusion</li><li>Use active voice</li><li>Short sentences and paragraphs</li><li>Edit ruthlessly</li></ul>',
        resources: [],
      },
      {
        id: 'lesson-5',
        title: 'Cross-Cultural Communication',
        description: 'Navigate cultural differences in professional communication effectively.',
        contentType: 'article',
        articleUrl: 'https://example.com/cross-cultural',
        duration: 18,
        order: 5,
        content: '<h2>Global Communication</h2><p>Working across cultures requires awareness and adaptation.</p><h3>Key Considerations:</h3><ul><li>Direct vs. indirect communication styles</li><li>Hierarchy and formality</li><li>Time perception (polychronic vs. monochronic)</li><li>Non-verbal communication differences</li></ul>',
        resources: [],
      },
    ],
  },
  {
    id: 'interview-preparation',
    title: 'Interview Preparation & Success',
    description: 'Ace your interviews with proven strategies for research, preparation, and performance.',
    weekRange: 'Week 5-6',
    order: 3,
    published: true,
    lessons: [
      {
        id: 'lesson-1',
        title: 'Company Research Strategies',
        description: 'Research companies effectively to stand out in interviews.',
        contentType: 'video',
        videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        duration: 15,
        order: 1,
        content: '<h2>Research Like a Pro</h2><p>Deep company research gives you a competitive edge.</p><h3>What to Research:</h3><ul><li>Company mission and values</li><li>Recent news and announcements</li><li>Products/services and competitors</li><li>Company culture and employee reviews</li><li>Interviewer\'s background (LinkedIn)</li></ul>',
        resources: [
          {
            title: 'Company Research Checklist',
            description: 'Systematic approach to research',
            fileUrl: 'https://example.com/research-checklist.pdf',
          },
        ],
      },
      {
        id: 'lesson-2',
        title: 'Mastering Behavioral Questions',
        description: 'Use the STAR method to answer behavioral interview questions effectively.',
        contentType: 'video',
        videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        duration: 25,
        order: 2,
        content: '<h2>STAR Method</h2><p>Structure your answers for maximum impact.</p><h3>STAR Framework:</h3><ul><li><strong>Situation:</strong> Set the context</li><li><strong>Task:</strong> Describe the challenge</li><li><strong>Action:</strong> Explain what YOU did</li><li><strong>Result:</strong> Share the outcome (quantify!)</li></ul>',
        resources: [
          {
            title: 'Common Behavioral Questions',
            description: '50 questions with STAR examples',
            fileUrl: 'https://example.com/behavioral-questions.pdf',
          },
        ],
      },
      {
        id: 'lesson-3',
        title: 'Technical Interview Preparation',
        description: 'Prepare for technical assessments and coding challenges.',
        contentType: 'article',
        articleUrl: 'https://example.com/technical-prep',
        duration: 30,
        order: 3,
        content: '<h2>Technical Interviews</h2><p>Practice and preparation are key.</p><h3>Preparation Steps:</h3><ul><li>Review fundamental concepts</li><li>Practice coding problems daily</li><li>Mock interviews with peers</li><li>Think aloud during problem-solving</li><li>Ask clarifying questions</li></ul>',
        resources: [],
      },
      {
        id: 'lesson-4',
        title: 'Questions to Ask Interviewers',
        description: 'Ask smart questions that demonstrate your interest and research.',
        contentType: 'article',
        articleUrl: 'https://example.com/interview-questions',
        duration: 12,
        order: 4,
        content: '<h2>Your Questions Matter</h2><p>Great questions show engagement and help you evaluate fit.</p><h3>Question Categories:</h3><ul><li>Role expectations and success metrics</li><li>Team dynamics and culture</li><li>Growth and development opportunities</li><li>Company direction and challenges</li></ul>',
        resources: [
          {
            title: '25 Questions to Ask',
            description: 'Categorized question bank',
            fileUrl: 'https://example.com/questions-to-ask.pdf',
          },
        ],
      },
      {
        id: 'lesson-5',
        title: 'Post-Interview Follow-Up',
        description: 'Make a lasting impression with effective follow-up strategies.',
        contentType: 'video',
        videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        duration: 10,
        order: 5,
        content: '<h2>Follow-Up Strategy</h2><p>The interview isn\'t over when you leave.</p><h3>Follow-Up Steps:</h3><ul><li>Send thank-you email within 24 hours</li><li>Reference specific conversation points</li><li>Reiterate your interest</li><li>Provide any additional information promised</li><li>Connect on LinkedIn (after offer/rejection)</li></ul>',
        resources: [],
      },
    ],
  },
  {
    id: 'networking-linkedin',
    title: 'Networking & LinkedIn Optimization',
    description: 'Build meaningful professional relationships and optimize your online presence.',
    weekRange: 'Week 7-8',
    order: 4,
    published: true,
    lessons: [
      {
        id: 'lesson-1',
        title: 'Building a Powerful LinkedIn Profile',
        description: 'Optimize every section of your LinkedIn profile to attract opportunities.',
        contentType: 'video',
        videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        duration: 20,
        order: 1,
        content: '<h2>LinkedIn Profile Optimization</h2><p>Your LinkedIn is your online resume and portfolio.</p><h3>Key Sections:</h3><ul><li>Professional headshot</li><li>Compelling headline (not just job title)</li><li>Summary that tells your story</li><li>Rich experience descriptions with results</li><li>Skills endorsements and recommendations</li></ul>',
        resources: [
          {
            title: 'LinkedIn Profile Checklist',
            description: 'Complete optimization guide',
            fileUrl: 'https://example.com/linkedin-checklist.pdf',
          },
        ],
      },
      {
        id: 'lesson-2',
        title: 'Strategic Networking Fundamentals',
        description: 'Build genuine professional relationships that advance your career.',
        contentType: 'article',
        articleUrl: 'https://example.com/networking-guide',
        duration: 18,
        order: 2,
        content: '<h2>Networking Mindset</h2><p>Networking is about giving, not just taking.</p><h3>Principles:</h3><ul><li>Focus on building relationships, not collecting contacts</li><li>Offer value before asking for favors</li><li>Follow up and stay in touch</li><li>Be authentic and curious</li><li>Think long-term</li></ul>',
        resources: [],
      },
      {
        id: 'lesson-3',
        title: 'Informational Interviews',
        description: 'Conduct informational interviews to learn about roles and companies.',
        contentType: 'video',
        videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        duration: 15,
        order: 3,
        content: '<h2>Informational Interviews</h2><p>Learn from professionals in roles you aspire to.</p><h3>Process:</h3><ul><li>Identify people to talk to</li><li>Craft a respectful outreach message</li><li>Prepare thoughtful questions</li><li>Take notes and follow up</li><li>Express gratitude</li></ul>',
        resources: [
          {
            title: 'Informational Interview Template',
            description: 'Email template and question guide',
            fileUrl: 'https://example.com/info-interview.pdf',
          },
        ],
      },
      {
        id: 'lesson-4',
        title: 'Building Your Professional Network',
        description: 'Strategies for expanding and nurturing your professional network.',
        contentType: 'article',
        articleUrl: 'https://example.com/network-building',
        duration: 16,
        order: 4,
        content: '<h2>Growing Your Network</h2><p>Your network is your net worth.</p><h3>Strategies:</h3><ul><li>Attend industry events and conferences</li><li>Join professional associations</li><li>Participate in online communities</li><li>Reconnect with alumni</li><li>Volunteer and give back</li></ul>',
        resources: [],
      },
      {
        id: 'lesson-5',
        title: 'Personal Brand on Social Media',
        description: 'Manage your professional presence across social media platforms.',
        contentType: 'video',
        videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        duration: 14,
        order: 5,
        content: '<h2>Social Media Strategy</h2><p>Your digital footprint matters to employers.</p><h3>Best Practices:</h3><ul><li>Google yourself regularly</li><li>Consistent professional image across platforms</li><li>Share valuable content in your field</li><li>Engage thoughtfully with others\' posts</li><li>Privacy settings for personal accounts</li></ul>',
        resources: [],
      },
    ],
  },
  {
    id: 'job-search-strategy',
    title: 'Job Search Strategy & Execution',
    description: 'Develop and execute a systematic job search strategy that lands offers.',
    weekRange: 'Week 9-10',
    order: 5,
    published: true,
    lessons: [
      {
        id: 'lesson-1',
        title: 'Creating Your Job Search Plan',
        description: 'Build a structured, organized approach to your job search.',
        contentType: 'article',
        articleUrl: 'https://example.com/job-search-plan',
        duration: 20,
        order: 1,
        content: '<h2>Strategic Job Search</h2><p>Treat your job search like a project with clear goals and milestones.</p><h3>Plan Components:</h3><ul><li>Target companies list</li><li>Application tracker</li><li>Daily/weekly goals</li><li>Networking targets</li><li>Skills to develop</li></ul>',
        resources: [
          {
            title: 'Job Search Tracker',
            description: 'Spreadsheet to organize your search',
            fileUrl: 'https://example.com/job-tracker.xlsx',
          },
        ],
      },
      {
        id: 'lesson-2',
        title: 'Resume & CV Optimization',
        description: 'Create ATS-friendly resumes that get you past filters and impress recruiters.',
        contentType: 'video',
        videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        duration: 25,
        order: 2,
        content: '<h2>Resume Best Practices</h2><p>Your resume has 6 seconds to make an impression.</p><h3>Key Elements:</h3><ul><li>Clear formatting (ATS-friendly)</li><li>Quantified achievements</li><li>Action verbs</li><li>Tailored to each job</li><li>Keywords from job description</li></ul>',
        resources: [
          {
            title: 'Resume Templates Pack',
            description: '5 ATS-friendly templates',
            fileUrl: 'https://example.com/resume-templates.zip',
          },
        ],
      },
      {
        id: 'lesson-3',
        title: 'Cover Letter Mastery',
        description: 'Write compelling cover letters that complement your resume.',
        contentType: 'article',
        articleUrl: 'https://example.com/cover-letters',
        duration: 15,
        order: 3,
        content: '<h2>Effective Cover Letters</h2><p>A great cover letter tells your story and shows fit.</p><h3>Structure:</h3><ul><li>Attention-grabbing opening</li><li>Why this company (show research)</li><li>Why you (relevant experience)</li><li>Value you\'ll bring</li><li>Strong closing with CTA</li></ul>',
        resources: [
          {
            title: 'Cover Letter Templates',
            description: '3 proven templates',
            fileUrl: 'https://example.com/cover-letters.pdf',
          },
        ],
      },
      {
        id: 'lesson-4',
        title: 'Navigating Job Boards & Applications',
        description: 'Use job boards effectively and maximize your application success rate.',
        contentType: 'video',
        videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        duration: 18,
        order: 4,
        content: '<h2>Job Board Strategy</h2><p>Quality over quantity in applications.</p><h3>Best Practices:</h3><ul><li>Set up job alerts</li><li>Apply early (within 24-48 hours)</li><li>Customize each application</li><li>Track all applications</li><li>Follow up after 1 week</li></ul>',
        resources: [],
      },
      {
        id: 'lesson-5',
        title: 'Negotiating Your Offer',
        description: 'Negotiate salary and benefits confidently to get what you deserve.',
        contentType: 'video',
        videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        duration: 22,
        order: 5,
        content: '<h2>Salary Negotiation</h2><p>Negotiation is expected - don\'t leave money on the table.</p><h3>Strategy:</h3><ul><li>Research market rates</li><li>Wait for written offer</li><li>Express enthusiasm first</li><li>Ask for more (with justification)</li><li>Consider total compensation</li><li>Get everything in writing</li></ul>',
        resources: [
          {
            title: 'Negotiation Scripts',
            description: 'Email templates for negotiation',
            fileUrl: 'https://example.com/negotiation.pdf',
          },
        ],
      },
    ],
  },
];

// ========================================
// RESOURCES DATA
// ========================================

const resourcesData = [
  // JOBS (10)
  {
    id: 'job-1',
    type: 'job',
    title: 'Software Engineer - Backend',
    description: 'Join our engineering team to build scalable backend systems serving millions of users across Africa.',
    category: 'Technology',
    company: 'Flutterwave',
    location: 'Lagos, Nigeria',
    jobType: 'full-time',
    salary: '$40,000 - $60,000',
    deadline: new Date('2026-05-31'),
    url: 'https://flutterwave.com/careers',
    imageUrl: 'https://via.placeholder.com/400x200?text=Flutterwave',
    published: true,
    order: 1,
  },
  {
    id: 'job-2',
    type: 'job',
    title: 'Product Manager',
    description: 'Lead product strategy and execution for our fintech solutions across East Africa.',
    category: 'Product',
    company: 'Jumia',
    location: 'Nairobi, Kenya',
    jobType: 'full-time',
    salary: '$35,000 - $50,000',
    deadline: new Date('2026-06-15'),
    url: 'https://jumia.com/careers',
    imageUrl: 'https://via.placeholder.com/400x200?text=Jumia',
    published: true,
    order: 2,
  },
  {
    id: 'job-3',
    type: 'job',
    title: 'Data Analyst',
    description: 'Analyze user behavior and market trends to drive business decisions.',
    category: 'Data & Analytics',
    company: 'Andela',
    location: 'Remote',
    jobType: 'contract',
    salary: '$30,000 - $45,000',
    deadline: new Date('2026-05-20'),
    url: 'https://andela.com/careers',
    imageUrl: 'https://via.placeholder.com/400x200?text=Andela',
    published: true,
    order: 3,
  },
  {
    id: 'job-4',
    type: 'job',
    title: 'UX/UI Designer',
    description: 'Design beautiful, intuitive experiences for our mobile and web platforms.',
    category: 'Design',
    company: 'Paystack',
    location: 'Lagos, Nigeria',
    jobType: 'full-time',
    salary: '$32,000 - $48,000',
    deadline: new Date('2026-06-30'),
    url: 'https://paystack.com/careers',
    imageUrl: 'https://via.placeholder.com/400x200?text=Paystack',
    published: true,
    order: 4,
  },
  {
    id: 'job-5',
    type: 'job',
    title: 'Marketing Manager',
    description: 'Lead growth marketing initiatives across Sub-Saharan Africa.',
    category: 'Marketing',
    company: 'Chipper Cash',
    location: 'Accra, Ghana',
    jobType: 'full-time',
    salary: '$38,000 - $55,000',
    deadline: new Date('2026-05-25'),
    url: 'https://chippercash.com/careers',
    imageUrl: 'https://via.placeholder.com/400x200?text=Chipper+Cash',
    published: true,
    order: 5,
  },
  {
    id: 'job-6',
    type: 'job',
    title: 'Business Development Associate',
    description: 'Identify and develop partnerships with enterprise clients across Africa.',
    category: 'Sales & Business Development',
    company: 'Kuda Bank',
    location: 'Lagos, Nigeria',
    jobType: 'full-time',
    salary: '$28,000 - $42,000',
    deadline: new Date('2026-06-10'),
    url: 'https://kuda.com/careers',
    imageUrl: 'https://via.placeholder.com/400x200?text=Kuda',
    published: true,
    order: 6,
  },
  {
    id: 'job-7',
    type: 'job',
    title: 'DevOps Engineer',
    description: 'Build and maintain cloud infrastructure for high-scale applications.',
    category: 'Technology',
    company: 'Interswitch',
    location: 'Lagos, Nigeria',
    jobType: 'full-time',
    salary: '$45,000 - $65,000',
    deadline: new Date('2026-05-18'),
    url: 'https://interswitch.com/careers',
    imageUrl: 'https://via.placeholder.com/400x200?text=Interswitch',
    published: true,
    order: 7,
  },
  {
    id: 'job-8',
    type: 'job',
    title: 'Customer Success Manager',
    description: 'Ensure customer satisfaction and drive product adoption.',
    category: 'Customer Success',
    company: 'Brass',
    location: 'Remote',
    jobType: 'full-time',
    salary: '$30,000 - $45,000',
    deadline: new Date('2026-06-05'),
    url: 'https://trybrass.com/careers',
    imageUrl: 'https://via.placeholder.com/400x200?text=Brass',
    published: true,
    order: 8,
  },
  {
    id: 'job-9',
    type: 'job',
    title: 'Content Writer',
    description: 'Create compelling content for our blog, social media, and marketing campaigns.',
    category: 'Content & Communications',
    company: 'TechCabal',
    location: 'Remote',
    jobType: 'contract',
    salary: '$20,000 - $30,000',
    deadline: new Date('2026-05-28'),
    url: 'https://techcabal.com/careers',
    imageUrl: 'https://via.placeholder.com/400x200?text=TechCabal',
    published: true,
    order: 9,
  },
  {
    id: 'job-10',
    type: 'job',
    title: 'Financial Analyst Intern',
    description: '6-month internship in our finance team working on budgeting and forecasting.',
    category: 'Finance',
    company: 'Access Bank',
    location: 'Lagos, Nigeria',
    jobType: 'internship',
    salary: '$800 - $1,200/month',
    deadline: new Date('2026-05-15'),
    url: 'https://accessbankplc.com/careers',
    imageUrl: 'https://via.placeholder.com/400x200?text=Access+Bank',
    published: true,
    order: 10,
  },

  // TOOLKITS (10)
  {
    id: 'toolkit-1',
    type: 'toolkit',
    title: 'ATS-Friendly Resume Template Pack',
    description: '5 professionally designed resume templates optimized for Applicant Tracking Systems. Includes templates for entry-level, experienced, technical, and creative roles.',
    category: 'Career Documents',
    fileType: 'docx',
    url: 'https://example.com/resume-templates.zip',
    imageUrl: 'https://via.placeholder.com/400x200?text=Resume+Templates',
    published: true,
    order: 11,
  },
  {
    id: 'toolkit-2',
    type: 'toolkit',
    title: 'Interview Preparation Workbook',
    description: 'Complete guide with 100+ common interview questions, STAR method examples, and company research templates.',
    category: 'Interview Prep',
    fileType: 'pdf',
    url: 'https://example.com/interview-workbook.pdf',
    imageUrl: 'https://via.placeholder.com/400x200?text=Interview+Prep',
    published: true,
    order: 12,
  },
  {
    id: 'toolkit-3',
    type: 'toolkit',
    title: 'Personal Branding Toolkit',
    description: 'Build your professional brand with templates for LinkedIn optimization, personal website, and social media strategy.',
    category: 'Personal Branding',
    fileType: 'pdf',
    url: 'https://example.com/branding-toolkit.pdf',
    imageUrl: 'https://via.placeholder.com/400x200?text=Personal+Branding',
    published: true,
    order: 13,
  },
  {
    id: 'toolkit-4',
    type: 'toolkit',
    title: 'Career Development Plan Template',
    description: 'Strategic planning template to map your 1, 3, and 5-year career goals with actionable steps.',
    category: 'Career Planning',
    fileType: 'xlsx',
    url: 'https://example.com/career-plan.xlsx',
    imageUrl: 'https://via.placeholder.com/400x200?text=Career+Plan',
    published: true,
    order: 14,
  },
  {
    id: 'toolkit-5',
    type: 'toolkit',
    title: 'Networking Email Templates',
    description: '20 proven email templates for networking, informational interviews, and follow-ups.',
    category: 'Networking',
    fileType: 'pdf',
    url: 'https://example.com/networking-emails.pdf',
    imageUrl: 'https://via.placeholder.com/400x200?text=Email+Templates',
    published: true,
    order: 15,
  },
  {
    id: 'toolkit-6',
    type: 'toolkit',
    title: 'Portfolio Website Template',
    description: 'Ready-to-use portfolio website template (HTML/CSS) to showcase your projects and skills.',
    category: 'Portfolio',
    fileType: 'zip',
    url: 'https://example.com/portfolio-template.zip',
    imageUrl: 'https://via.placeholder.com/400x200?text=Portfolio+Template',
    published: true,
    order: 16,
  },
  {
    id: 'toolkit-7',
    type: 'toolkit',
    title: 'Salary Negotiation Guide',
    description: 'Complete guide to researching salaries, preparing your case, and negotiating offers.',
    category: 'Negotiation',
    fileType: 'pdf',
    url: 'https://example.com/salary-negotiation.pdf',
    imageUrl: 'https://via.placeholder.com/400x200?text=Salary+Guide',
    published: true,
    order: 17,
  },
  {
    id: 'toolkit-8',
    type: 'toolkit',
    title: 'Job Search Tracker Spreadsheet',
    description: 'Organized spreadsheet to track applications, interviews, follow-ups, and offers.',
    category: 'Job Search',
    fileType: 'xlsx',
    url: 'https://example.com/job-tracker.xlsx',
    imageUrl: 'https://via.placeholder.com/400x200?text=Job+Tracker',
    published: true,
    order: 18,
  },
  {
    id: 'toolkit-9',
    type: 'toolkit',
    title: 'Professional Email Signature Generator',
    description: 'Create professional email signatures with templates and customization guide.',
    category: 'Professional Communication',
    fileType: 'docx',
    url: 'https://example.com/email-signature.docx',
    imageUrl: 'https://via.placeholder.com/400x200?text=Email+Signature',
    published: true,
    order: 19,
  },
  {
    id: 'toolkit-10',
    type: 'toolkit',
    title: 'Cover Letter Template Pack',
    description: '5 cover letter templates for different situations: cold application, referral, career change, internship, and senior roles.',
    category: 'Career Documents',
    fileType: 'docx',
    url: 'https://example.com/cover-letters.zip',
    imageUrl: 'https://via.placeholder.com/400x200?text=Cover+Letters',
    published: true,
    order: 20,
  },

  // VIDEOS (10)
  {
    id: 'video-1',
    type: 'video',
    title: 'How to Ace Your Next Interview',
    description: 'Expert tips on interview preparation, body language, and answering tough questions.',
    category: 'Interview Skills',
    duration: 18,
    platform: 'youtube',
    url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    imageUrl: 'https://via.placeholder.com/400x200?text=Interview+Tips',
    published: true,
    order: 21,
  },
  {
    id: 'video-2',
    type: 'video',
    title: 'Building Your Personal Brand on LinkedIn',
    description: 'Step-by-step guide to creating a LinkedIn profile that attracts recruiters.',
    category: 'Personal Branding',
    duration: 22,
    platform: 'youtube',
    url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    imageUrl: 'https://via.placeholder.com/400x200?text=LinkedIn+Guide',
    published: true,
    order: 22,
  },
  {
    id: 'video-3',
    type: 'video',
    title: 'Networking Strategies for Introverts',
    description: 'Practical networking tips for people who find social events challenging.',
    category: 'Networking',
    duration: 15,
    platform: 'youtube',
    url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    imageUrl: 'https://via.placeholder.com/400x200?text=Networking+Tips',
    published: true,
    order: 23,
  },
  {
    id: 'video-4',
    type: 'video',
    title: 'Resume Mistakes to Avoid in 2026',
    description: 'Common resume mistakes that get applications rejected and how to fix them.',
    category: 'Resume Writing',
    duration: 12,
    platform: 'youtube',
    url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    imageUrl: 'https://via.placeholder.com/400x200?text=Resume+Mistakes',
    published: true,
    order: 24,
  },
  {
    id: 'video-5',
    type: 'video',
    title: 'Career Transitions: How to Switch Industries',
    description: 'Navigate career changes successfully with proven strategies and frameworks.',
    category: 'Career Development',
    duration: 25,
    platform: 'youtube',
    url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    imageUrl: 'https://via.placeholder.com/400x200?text=Career+Change',
    published: true,
    order: 25,
  },
  {
    id: 'video-6',
    type: 'video',
    title: 'Salary Negotiation Masterclass',
    description: 'Negotiate your worth with confidence using proven tactics from recruiters.',
    category: 'Negotiation',
    duration: 20,
    platform: 'youtube',
    url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    imageUrl: 'https://via.placeholder.com/400x200?text=Salary+Negotiation',
    published: true,
    order: 26,
  },
  {
    id: 'video-7',
    type: 'video',
    title: 'Remote Work Best Practices',
    description: 'Thrive in remote work environments with productivity tips and communication strategies.',
    category: 'Professional Skills',
    duration: 16,
    platform: 'youtube',
    url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    imageUrl: 'https://via.placeholder.com/400x200?text=Remote+Work',
    published: true,
    order: 27,
  },
  {
    id: 'video-8',
    type: 'video',
    title: 'Tech Career Paths in Africa',
    description: 'Overview of technology career opportunities and growth paths across African markets.',
    category: 'Career Exploration',
    duration: 30,
    platform: 'youtube',
    url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    imageUrl: 'https://via.placeholder.com/400x200?text=Tech+Careers',
    published: true,
    order: 28,
  },
  {
    id: 'video-9',
    type: 'video',
    title: 'Building a Portfolio That Gets You Hired',
    description: 'Create a compelling portfolio that showcases your skills and attracts employers.',
    category: 'Portfolio Development',
    duration: 19,
    platform: 'youtube',
    url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    imageUrl: 'https://via.placeholder.com/400x200?text=Portfolio+Guide',
    published: true,
    order: 29,
  },
  {
    id: 'video-10',
    type: 'video',
    title: 'Entrepreneurship 101: From Idea to Launch',
    description: 'Fundamentals of starting and growing a business in African markets.',
    category: 'Entrepreneurship',
    duration: 35,
    platform: 'youtube',
    url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    imageUrl: 'https://via.placeholder.com/400x200?text=Entrepreneurship',
    published: true,
    order: 30,
  },

  // ARTICLES (10)
  {
    id: 'article-1',
    type: 'article',
    title: 'The Ultimate Guide to Landing Your First Tech Job in Nigeria',
    description: 'Comprehensive guide covering job search strategies, skill development, and interview preparation specific to the Nigerian tech market.',
    category: 'Job Search',
    url: 'https://techcabal.com/guide-to-tech-jobs',
    imageUrl: 'https://via.placeholder.com/400x200?text=Tech+Jobs+Guide',
    published: true,
    order: 31,
  },
  {
    id: 'article-2',
    type: 'article',
    title: '10 Soft Skills Every Professional Needs in 2026',
    description: 'Essential soft skills that employers value most and how to develop them.',
    category: 'Professional Development',
    url: 'https://example.com/soft-skills-2026',
    imageUrl: 'https://via.placeholder.com/400x200?text=Soft+Skills',
    published: true,
    order: 32,
  },
  {
    id: 'article-3',
    type: 'article',
    title: 'How to Build a Professional Network from Scratch',
    description: 'Step-by-step strategies for building meaningful professional relationships.',
    category: 'Networking',
    url: 'https://example.com/networking-guide',
    imageUrl: 'https://via.placeholder.com/400x200?text=Networking',
    published: true,
    order: 33,
  },
  {
    id: 'article-4',
    type: 'article',
    title: 'African Startups to Watch in 2026',
    description: 'Emerging African startups that are hiring and shaping the future of the continent.',
    category: 'Industry Insights',
    url: 'https://example.com/african-startups-2026',
    imageUrl: 'https://via.placeholder.com/400x200?text=Startups',
    published: true,
    order: 34,
  },
  {
    id: 'article-5',
    type: 'article',
    title: 'Understanding Remote Work Culture in Global Companies',
    description: 'What to expect when working for international companies remotely from Africa.',
    category: 'Remote Work',
    url: 'https://example.com/remote-work-culture',
    imageUrl: 'https://via.placeholder.com/400x200?text=Remote+Culture',
    published: true,
    order: 35,
  },
  {
    id: 'article-6',
    type: 'article',
    title: 'The STAR Method: Master Behavioral Interviews',
    description: 'In-depth guide to using the STAR framework for answering behavioral questions.',
    category: 'Interview Skills',
    url: 'https://example.com/star-method-guide',
    imageUrl: 'https://via.placeholder.com/400x200?text=STAR+Method',
    published: true,
    order: 36,
  },
  {
    id: 'article-7',
    type: 'article',
    title: 'Career Pivots: Success Stories from African Professionals',
    description: 'Inspiring stories of professionals who successfully changed careers in Africa.',
    category: 'Career Development',
    url: 'https://example.com/career-pivot-stories',
    imageUrl: 'https://via.placeholder.com/400x200?text=Career+Stories',
    published: true,
    order: 37,
  },
  {
    id: 'article-8',
    type: 'article',
    title: 'Understanding Startup Equity and Stock Options',
    description: 'What you need to know about equity compensation when joining startups.',
    category: 'Compensation',
    url: 'https://example.com/startup-equity-guide',
    imageUrl: 'https://via.placeholder.com/400x200?text=Equity+Guide',
    published: true,
    order: 38,
  },
  {
    id: 'article-9',
    type: 'article',
    title: 'The Future of Work in Africa: 2026 Report',
    description: 'Trends, opportunities, and challenges shaping the African job market.',
    category: 'Industry Insights',
    url: 'https://example.com/future-of-work-africa',
    imageUrl: 'https://via.placeholder.com/400x200?text=Future+of+Work',
    published: true,
    order: 39,
  },
  {
    id: 'article-10',
    type: 'article',
    title: 'Mental Health and Career Wellness for Young Professionals',
    description: 'Managing stress, avoiding burnout, and maintaining work-life balance.',
    category: 'Wellness',
    url: 'https://example.com/career-wellness',
    imageUrl: 'https://via.placeholder.com/400x200?text=Wellness',
    published: true,
    order: 40,
  },
];

// ========================================
// SEED FUNCTIONS
// ========================================

async function seedModules() {
  console.log('🌱 Starting to seed modules...\n');
  
  for (const moduleData of modulesData) {
    try {
      const { lessons, ...moduleInfo } = moduleData;
      
      // Create module document
      const moduleRef = doc(db, 'modules', moduleData.id);
      await setDoc(moduleRef, moduleInfo);
      console.log(`✅ Created module: ${moduleData.title}`);
      
      // Create lessons subcollection
      for (const lesson of lessons) {
        const lessonRef = doc(db, 'modules', moduleData.id, 'lessons', lesson.id);
        await setDoc(lessonRef, lesson);
      }
      console.log(`   📚 Added ${lessons.length} lessons\n`);
      
    } catch (error) {
      console.error(`❌ Error creating module ${moduleData.id}:`, error);
    }
  }
  
  console.log('✅ Modules seeding complete!\n');
}

async function seedResources() {
  console.log('🌱 Starting to seed resources...\n');
  
  // Use batched writes for better performance
  let batch = writeBatch(db);
  let operationCount = 0;
  
  for (const resource of resourcesData) {
    try {
      const resourceRef = doc(db, 'resources', resource.id);
      batch.set(resourceRef, resource);
      operationCount++;
      
      // Firestore batch limit is 500 operations
      if (operationCount === 500) {
        await batch.commit();
        batch = writeBatch(db);
        operationCount = 0;
      }
      
      console.log(`✅ Queued resource: ${resource.title}`);
    } catch (error) {
      console.error(`❌ Error creating resource ${resource.id}:`, error);
    }
  }
  
  // Commit remaining operations
  if (operationCount > 0) {
    await batch.commit();
  }
  
  console.log('\n✅ Resources seeding complete!\n');
}

// ========================================
// MAIN EXECUTION
// ========================================

async function main() {
  console.log('🚀 Starting seed script...\n');
  console.log('📊 Data to seed:');
  console.log(`   - ${modulesData.length} modules`);
  console.log(`   - ${modulesData.reduce((sum, m) => sum + m.lessons.length, 0)} lessons`);
  console.log(`   - ${resourcesData.length} resources\n`);
  
  try {
    await seedModules();
    await seedResources();
    
    console.log('🎉 SEED COMPLETE! All data has been added to Firestore.');
    console.log('\n📍 Next steps:');
    console.log('   1. Check Firebase Console to verify data');
    console.log('   2. Visit /learn/admin/modules to see modules');
    console.log('   3. Visit /learn/resources to see resource hub');
    console.log('   4. Start using the platform!\n');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Seed script failed:', error);
    process.exit(1);
  }
}

main();
