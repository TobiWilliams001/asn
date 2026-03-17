import { Module } from '@/types/learn';


export const MOCK_MODULES: Module[] = [
  {
    id: 'career-mapping',
    title: 'Career Mapping & Personal Branding',
    description: 'Identifying trajectory and strategic positioning.',
    weekRange: 'Weeks 1-2',
    order: 1,
    lessons: [
      {
        id: 'lesson-1',
        title: 'Understanding Corporate Culture',
        description: 'Learn how organizational culture shapes workplace dynamics and career success',
        contentType: 'video',
        videoUrl: 'https://www.youtube.com/embed/7cPJq3BXOXM', // TED: The puzzle of motivation
        duration: 18,
        order: 1,
        content: `
          <h2>Understanding Corporate Culture</h2>
          <p>Corporate culture encompasses the values, beliefs, and behaviors that determine how a company's employees and management interact and handle business transactions.</p>
          
          <h3>Key Concepts:</h3>
          <ul>
            <li>Organizational values and mission alignment</li>
            <li>Communication patterns and hierarchy</li>
            <li>Decision-making processes</li>
            <li>Work environment and employee expectations</li>
          </ul>

          <h3>Why This Matters:</h3>
          <p>Understanding corporate culture helps you navigate professional environments effectively and identify organizations where you'll thrive.</p>
        `,
        resources: [
          {
            title: 'Corporate Culture Framework',
            description: 'Essential reading on organizational culture models',
            fileUrl: '/resources/culture-framework.pdf',
            type: 'pdf',
            pages: 8
          }
        ]
      },
      {
        id: 'lesson-2',
        title: 'The Art of Professional Networking',
        description: 'Building meaningful connections that advance your career',
        contentType: 'article',
        articleUrl: 'https://hbr.org/2016/05/learn-to-love-networking',
        duration: 10,
        order: 2,
        content: `
          <h2>Professional Networking Strategies</h2>
          <p>Networking isn't about collecting contacts—it's about building mutually beneficial relationships that create value for both parties.</p>
          
          <h3>Core Principles:</h3>
          <ul>
            <li>Give before you ask</li>
            <li>Focus on quality over quantity</li>
            <li>Follow up and maintain relationships</li>
            <li>Be authentic and genuine</li>
          </ul>
        `,
        resources: [
          {
            title: 'Networking Email Templates',
            description: 'Professional templates for outreach and follow-up',
            fileUrl: '/resources/networking-templates.pdf',
            type: 'pdf',
            pages: 5
          }
        ]
      },
      {
        id: 'lesson-3',
        title: 'Personal Branding Fundamentals',
        description: 'Crafting a professional identity that opens doors',
        contentType: 'video',
        videoUrl: 'https://www.youtube.com/embed/K0GGR_PGVDQ', // Personal branding
        duration: 22,
        order: 3,
        content: `
          <h2>Building Your Professional Brand</h2>
          <p>Your personal brand is what people say about you when you're not in the room. Learn to shape that narrative intentionally.</p>
        `,
        resources: []
      },
      {
        id: 'lesson-4',
        title: 'LinkedIn Profile Optimization',
        description: 'Transform your LinkedIn into a career accelerator',
        contentType: 'article',
        articleUrl: 'https://www.themuse.com/advice/the-31-best-linkedin-profile-tips-for-job-seekers',
        duration: 12,
        order: 4,
        content: `
          <h2>LinkedIn Best Practices</h2>
          <p>Your LinkedIn profile is often the first impression recruiters and hiring managers have of you. Make it count.</p>
          
          <h3>Optimization Checklist:</h3>
          <ul>
            <li>Professional headshot</li>
            <li>Compelling headline beyond job title</li>
            <li>Achievement-focused summary</li>
            <li>Quantified accomplishments in experience</li>
            <li>Relevant skills and endorsements</li>
          </ul>
        `,
        resources: [
          {
            title: 'LinkedIn Profile Checklist',
            description: 'Step-by-step optimization guide',
            fileUrl: '/resources/linkedin-checklist.pdf',
            type: 'pdf',
            pages: 4
          }
        ]
      },
      {
        id: 'lesson-5',
        title: 'Career Trajectory Planning',
        description: 'Mapping your 5-year professional roadmap',
        contentType: 'video',
        videoUrl: 'https://www.youtube.com/embed/YMPzDiraNnA', // Career planning
        duration: 25,
        order: 5,
        content: `
          <h2>Strategic Career Planning</h2>
          <p>Create an actionable roadmap that aligns your skills, passions, and market opportunities.</p>
          
          <h3>Planning Framework:</h3>
          <ul>
            <li>Assess current state (skills, experience, network)</li>
            <li>Define desired future state (role, industry, impact)</li>
            <li>Identify gaps and development areas</li>
            <li>Create 90-day action plans</li>
            <li>Build accountability systems</li>
          </ul>
        `,
        resources: [
          {
            title: 'Career Roadmap Template',
            description: 'Interactive planning worksheet',
            fileUrl: '/resources/career-roadmap-template.pdf',
            type: 'pdf',
            pages: 12
          }
        ]
      }
    ]
  },
  {
    id: 'corporate-awareness',
    title: 'Corporate Awareness & Professional Etiquette',
    description: 'Navigating high-stakes business environments.',
    weekRange: 'Weeks 3-4',
    order: 2,
    lessons: [
      {
        id: 'lesson-1',
        title: 'Business Etiquette Essentials',
        description: 'Master the unwritten rules of professional conduct',
        contentType: 'video',
        videoUrl: 'https://www.youtube.com/embed/Pf3zsUjDa7A', // Business etiquette
        duration: 17,
        order: 1,
        content: `<h2>Corporate Etiquette</h2><p>Professional conduct that builds credibility and respect.</p>`,
        resources: []
      },
      {
        id: 'lesson-2',
        title: 'Understanding Organizational Structures',
        description: 'How companies are organized and why it matters',
        contentType: 'article',
        articleUrl: 'https://www.forbes.com/sites/forbeshumanresourcescouncil/2021/11/15/understanding-organizational-structures/',
        duration: 8,
        order: 2,
        content: `<h2>Org Structures</h2><p>Different organizational models and their implications.</p>`,
        resources: []
      },
      {
        id: 'lesson-3',
        title: 'Stakeholder Management Fundamentals',
        description: 'Identifying and managing key relationships',
        contentType: 'video',
        videoUrl: 'https://www.youtube.com/embed/lhja0e-3RUA', // Stakeholder management
        duration: 23,
        order: 3,
        content: `<h2>Stakeholder Mapping</h2><p>Who matters and why in organizational success.</p>`,
        resources: [
          {
            title: 'Stakeholder Mapping Template',
            description: 'Visual framework for relationship management',
            fileUrl: '/resources/stakeholder-map.pdf',
            type: 'pdf',
            pages: 3
          }
        ]
      },
      {
        id: 'lesson-4',
        title: 'Professional Communication Mastery',
        description: 'Writing and speaking in corporate contexts',
        contentType: 'article',
        articleUrl: 'https://www.grammarly.com/blog/professional-email/',
        duration: 10,
        order: 4,
        content: `<h2>Communication Excellence</h2><p>Email, presentations, and meeting effectiveness.</p>`,
        resources: [
          {
            title: 'Email Writing Best Practices',
            description: 'Templates and frameworks for professional communication',
            fileUrl: '/resources/email-guide.pdf',
            type: 'pdf',
            pages: 15
          }
        ]
      },
      {
        id: 'lesson-5',
        title: 'Navigating Office Politics',
        description: 'Understanding power dynamics ethically',
        contentType: 'video',
        videoUrl: 'https://www.youtube.com/embed/qYvXk_bqlBk', // Office politics
        duration: 24,
        order: 5,
        content: `<h2>Office Politics</h2><p>Navigate without compromising integrity and values.</p>`,
        resources: []
      }
    ]
  },
  {
    id: 'design-thinking',
    title: 'Design Thinking & Problem Solving',
    description: 'Human-centric problem solving for impact.',
    weekRange: 'Weeks 5-7',
    order: 3,
    lessons: [
      {
        id: 'lesson-1',
        title: 'Introduction to Design Thinking',
        description: 'Understanding the design thinking framework',
        contentType: 'video',
        videoUrl: 'https://www.youtube.com/embed/_r0VX-aU_T8', // Design thinking intro
        duration: 20,
        order: 1,
        content: `<h2>Design Thinking Basics</h2><p>Empathy, ideation, and prototyping for innovation.</p>`,
        resources: []
      },
      {
        id: 'lesson-2',
        title: 'Empathy & User Research',
        description: 'Understanding user needs deeply through research',
        contentType: 'article',
        articleUrl: 'https://medium.com/design-leadership-notebook/empathy-in-design-thinking-a-practical-guide-e6f8d0c1d5a7',
        duration: 12,
        order: 2,
        content: `<h2>User Research</h2><p>Interview techniques and observation methods.</p>`,
        resources: []
      },
      {
        id: 'lesson-3',
        title: 'Problem Definition & Framing',
        description: 'Framing the right problem to solve',
        contentType: 'video',
        videoUrl: 'https://www.youtube.com/embed/McaQYHWsgxc', // Problem framing
        duration: 19,
        order: 3,
        content: `<h2>Problem Framing</h2><p>How to define impactful problems worth solving.</p>`,
        resources: [
          {
            title: 'Problem Statement Template',
            description: 'Framework for defining solvable problems',
            fileUrl: '/resources/problem-statement.pdf',
            type: 'pdf',
            pages: 6
          }
        ]
      },
      {
        id: 'lesson-4',
        title: 'Ideation & Brainstorming',
        description: 'Generating creative solutions systematically',
        contentType: 'video',
        videoUrl: 'https://www.youtube.com/embed/W1h5L_0rFz8', // Brainstorming techniques
        duration: 21,
        order: 4,
        content: `<h2>Ideation Techniques</h2><p>Brainstorming methods that actually work.</p>`,
        resources: []
      },
      {
        id: 'lesson-5',
        title: 'Prototyping & Testing',
        description: 'Bringing ideas to life quickly for validation',
        contentType: 'video',
        videoUrl: 'https://www.youtube.com/embed/Q4MzT2MEDHA', // Rapid prototyping
        duration: 26,
        order: 5,
        content: `<h2>Rapid Prototyping</h2><p>Test before you invest—fail fast, learn faster.</p>`,
        resources: []
      }
    ]
  },
  {
    id: 'leadership-teamwork',
    title: 'Leadership & Influence',
    description: 'Driving collaborative excellence and vision.',
    weekRange: 'Weeks 8-10',
    order: 4,
    lessons: [
      {
        id: 'lesson-1',
        title: 'Leadership Fundamentals',
        description: 'Core principles of effective leadership',
        contentType: 'video',
        videoUrl: 'https://www.youtube.com/embed/fW8amMCVAJQ', // Simon Sinek leadership
        duration: 20,
        order: 1,
        content: `<h2>What Makes a Leader</h2><p>Leadership vs management—understanding the difference.</p>`,
        resources: []
      },
      {
        id: 'lesson-2',
        title: 'Team Dynamics & Development',
        description: 'Understanding how high-performing teams function',
        contentType: 'article',
        articleUrl: 'https://hbr.org/2016/01/the-secrets-of-great-teamwork',
        duration: 15,
        order: 2,
        content: `<h2>Team Development</h2><p>Forming, storming, norming, performing—the team journey.</p>`,
        resources: []
      },
      {
        id: 'lesson-3',
        title: 'Conflict Resolution Strategies',
        description: 'Managing disagreements constructively',
        contentType: 'video',
        videoUrl: 'https://www.youtube.com/embed/v4sby5j4UwY', // Conflict resolution
        duration: 21,
        order: 3,
        content: `<h2>Healthy Conflict</h2><p>Turning tension into progress and innovation.</p>`,
        resources: []
      },
      {
        id: 'lesson-4',
        title: 'Delegation & Empowerment',
        description: 'Getting things done through others effectively',
        contentType: 'article',
        articleUrl: 'https://www.atlassian.com/work-management/project-management/delegation',
        duration: 9,
        order: 4,
        content: `<h2>Effective Delegation</h2><p>Building trust and accountability in teams.</p>`,
        resources: []
      },
      {
        id: 'lesson-5',
        title: 'Vision & Strategic Thinking',
        description: 'Setting direction and inspiring action',
        contentType: 'video',
        videoUrl: 'https://www.youtube.com/embed/u4ZoJKF_VuA', // Strategic thinking
        duration: 24,
        order: 5,
        content: `<h2>Strategic Vision</h2><p>From vision to execution—making strategy real.</p>`,
        resources: []
      }
    ]
  },
  {
    id: 'action-planning',
    title: 'Action Planning & Execution',
    description: 'Executing complex projects with precision.',
    weekRange: 'Weeks 11-12',
    order: 5,
    lessons: [
      {
        id: 'lesson-1',
        title: 'Project Management Fundamentals',
        description: 'Core principles of managing projects successfully',
        contentType: 'video',
        videoUrl: 'https://www.youtube.com/embed/ZKOL-rZ79gs', // Project management basics
        duration: 22,
        order: 1,
        content: `<h2>PM Fundamentals</h2><p>Scope, time, cost, quality—the project management triangle.</p>`,
        resources: []
      },
      {
        id: 'lesson-2',
        title: 'Goal Setting with OKRs',
        description: 'Setting measurable objectives that drive results',
        contentType: 'article',
        articleUrl: 'https://www.whatmatters.com/faqs/okr-meaning-definition-example',
        duration: 11,
        order: 2,
        content: `<h2>Objectives & Key Results</h2><p>The OKR framework used by Google and top companies.</p>`,
        resources: [
          {
            title: 'OKR Template & Guide',
            description: 'Complete framework for setting effective OKRs',
            fileUrl: '/resources/okr-template.pdf',
            type: 'pdf',
            pages: 10
          }
        ]
      },
      {
        id: 'lesson-3',
        title: 'Execution & Accountability',
        description: 'Following through on commitments consistently',
        contentType: 'video',
        videoUrl: 'https://www.youtube.com/embed/arj7oStGLkU', // Execution
        duration: 20,
        order: 3,
        content: `<h2>Getting It Done</h2><p>From planning to shipping—execution excellence.</p>`,
        resources: []
      },
      {
        id: 'lesson-4',
        title: 'Metrics & Impact Measurement',
        description: 'Tracking progress and measuring outcomes',
        contentType: 'article',
        articleUrl: 'https://www.tableau.com/learn/articles/what-are-key-performance-indicators',
        duration: 10,
        order: 4,
        content: `<h2>What Gets Measured</h2><p>Choosing the right KPIs for meaningful progress.</p>`,
        resources: []
      },
      {
        id: 'lesson-5',
        title: 'Continuous Improvement',
        description: 'Learning and iterating for sustained excellence',
        contentType: 'video',
        videoUrl: 'https://www.youtube.com/embed/UQrPVmcgJJk', // Kaizen
        duration: 23,
        order: 5,
        content: `<h2>Kaizen Mindset</h2><p>Always improving, never settling—the path to mastery.</p>`,
        resources: []
      }
    ]
  }
];