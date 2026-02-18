// src/lib/mockData/modules.ts

import { Module } from '@/types/learn';

/**
 * Mock Modules Data
 * 
 * This data matches the structure from the Stitch UI.
 * We'll use this for frontend development, then swap to Firestore later .
 */

export const MOCK_MODULES: Module[] = [
  {
    id: 'career-mapping',
    title: 'Career Mapping',
    description: 'Identifying trajectory and strategic positioning.',
    weekRange: 'Weeks 1-2',
    order: 1,
    lessons: [
      {
        id: 'lesson-1',
        title: 'Decoding Corporate Culture',
        description: 'Understanding organizational dynamics and workplace culture',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // Placeholder
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
            title: 'The Multi-National Dynamics',
            description: 'Essential reading on global corporate structures',
            fileUrl: '/mock-resources/module1-reading1.pdf',
            type: 'pdf',
            pages: 12
          },
          {
            title: 'Harvard Business Review: Networking',
            description: 'External article on professional networking strategies',
            fileUrl: 'https://hbr.org/networking-guide',
            type: 'link'
          }
        ]
      },
      {
        id: 'lesson-2',
        title: 'Professional Networking Fundamentals',
        description: 'Building meaningful professional relationships',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        duration: 22,
        order: 2,
        content: `
          <h2>Building Your Professional Network</h2>
          <p>Networking is about creating mutually beneficial relationships, not just collecting contacts.</p>
        `,
        resources: []
      },
      {
        id: 'lesson-3',
        title: 'Industry Research & Analysis',
        description: 'How to research industries and companies effectively',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        duration: 20,
        order: 3,
        content: `
          <h2>Strategic Industry Research</h2>
          <p>Learn frameworks for analyzing industries and identifying career opportunities.</p>
        `,
        resources: []
      },
      {
        id: 'lesson-4',
        title: 'Personal Branding Essentials',
        description: 'Crafting your professional identity',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        duration: 19,
        order: 4,
        content: `
          <h2>Your Professional Brand</h2>
          <p>Building a compelling personal brand that opens doors.</p>
        `,
        resources: []
      },
      {
        id: 'lesson-5',
        title: 'Career Trajectory Planning',
        description: 'Mapping your 5-year career path',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        duration: 25,
        order: 5,
        content: `
          <h2>Strategic Career Planning</h2>
          <p>Create a actionable roadmap for your professional journey.</p>
        `,
        resources: []
      }
    ]
  },
  {
    id: 'corporate-awareness',
    title: 'Corporate Awareness',
    description: 'Navigating high-stakes business environments.',
    weekRange: 'Weeks 3-4',
    order: 2,
    lessons: [
      {
        id: 'lesson-1',
        title: 'Business Etiquette Fundamentals',
        description: 'Professional conduct in corporate settings',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        duration: 17,
        order: 1,
        content: `<h2>Corporate Etiquette</h2><p>Essential professional behaviors...</p>`,
        resources: []
      },
      {
        id: 'lesson-2',
        title: 'Understanding Organizational Structures',
        description: 'How companies are organized and why it matters',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        duration: 21,
        order: 2,
        content: `<h2>Org Structures</h2><p>Different organizational models...</p>`,
        resources: []
      },
      {
        id: 'lesson-3',
        title: 'Stakeholder Management',
        description: 'Identifying and managing key relationships',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        duration: 23,
        order: 3,
        content: `<h2>Stakeholder Mapping</h2><p>Who matters and why...</p>`,
        resources: []
      },
      {
        id: 'lesson-4',
        title: 'Corporate Communication',
        description: 'Writing and speaking in professional contexts',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        duration: 18,
        order: 4,
        content: `<h2>Professional Communication</h2><p>Email, presentations, meetings...</p>`,
        resources: []
      },
      {
        id: 'lesson-5',
        title: 'Navigating Office Politics',
        description: 'Understanding power dynamics ethically',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        duration: 24,
        order: 5,
        content: `<h2>Office Politics</h2><p>Navigate without compromising integrity...</p>`,
        resources: []
      }
    ]
  },
  {
    id: 'design-thinking',
    title: 'Design Thinking',
    description: 'Human-centric problem solving for impact.',
    weekRange: 'Weeks 5-6',
    order: 3,
    lessons: [
      {
        id: 'lesson-1',
        title: 'Introduction to Design Thinking',
        description: 'Understanding the design thinking framework',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        duration: 20,
        order: 1,
        content: `<h2>Design Thinking Basics</h2><p>Empathy, ideation, prototyping...</p>`,
        resources: []
      },
      {
        id: 'lesson-2',
        title: 'Empathy & User Research',
        description: 'Understanding user needs deeply',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        duration: 22,
        order: 2,
        content: `<h2>User Research</h2><p>Interview techniques, observation...</p>`,
        resources: []
      },
      {
        id: 'lesson-3',
        title: 'Problem Definition',
        description: 'Framing the right problem to solve',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        duration: 19,
        order: 3,
        content: `<h2>Problem Framing</h2><p>How to define impactful problems...</p>`,
        resources: []
      },
      {
        id: 'lesson-4',
        title: 'Ideation & Brainstorming',
        description: 'Generating creative solutions',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        duration: 21,
        order: 4,
        content: `<h2>Ideation Techniques</h2><p>Brainstorming methods that work...</p>`,
        resources: []
      },
      {
        id: 'lesson-5',
        title: 'Prototyping & Testing',
        description: 'Bringing ideas to life quickly',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        duration: 26,
        order: 5,
        content: `<h2>Rapid Prototyping</h2><p>Test before you invest...</p>`,
        resources: []
      }
    ]
  },
  {
    id: 'leadership-teamwork',
    title: 'Leadership & Teamwork',
    description: 'Driving collaborative excellence and vision.',
    weekRange: 'Weeks 7-8',
    order: 4,
    lessons: [
      {
        id: 'lesson-1',
        title: 'Leadership Fundamentals',
        description: 'Core principles of effective leadership',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        duration: 20,
        order: 1,
        content: `<h2>What Makes a Leader</h2><p>Leadership vs management...</p>`,
        resources: []
      },
      {
        id: 'lesson-2',
        title: 'Team Dynamics',
        description: 'Understanding how teams function',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        duration: 23,
        order: 2,
        content: `<h2>Team Development</h2><p>Forming, storming, norming, performing...</p>`,
        resources: []
      },
      {
        id: 'lesson-3',
        title: 'Conflict Resolution',
        description: 'Managing disagreements constructively',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        duration: 21,
        order: 3,
        content: `<h2>Healthy Conflict</h2><p>Turning tension into progress...</p>`,
        resources: []
      },
      {
        id: 'lesson-4',
        title: 'Delegation & Empowerment',
        description: 'Getting things done through others',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        duration: 18,
        order: 4,
        content: `<h2>Effective Delegation</h2><p>Trust and accountability...</p>`,
        resources: []
      },
      {
        id: 'lesson-5',
        title: 'Vision & Strategy',
        description: 'Setting direction and inspiring action',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        duration: 24,
        order: 5,
        content: `<h2>Strategic Vision</h2><p>From vision to execution...</p>`,
        resources: []
      }
    ]
  },
  {
    id: 'action-planning',
    title: 'Action Planning',
    description: 'Executing complex projects with precision.',
    weekRange: 'Weeks 9-12',
    order: 5,
    lessons: [
      {
        id: 'lesson-1',
        title: 'Project Management Basics',
        description: 'Fundamentals of managing projects',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        duration: 22,
        order: 1,
        content: `<h2>PM Fundamentals</h2><p>Scope, time, cost, quality...</p>`,
        resources: []
      },
      {
        id: 'lesson-2',
        title: 'Goal Setting & OKRs',
        description: 'Setting measurable objectives',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        duration: 19,
        order: 2,
        content: `<h2>Objectives & Key Results</h2><p>The OKR framework...</p>`,
        resources: []
      },
      {
        id: 'lesson-3',
        title: 'Execution & Accountability',
        description: 'Following through on commitments',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        duration: 20,
        order: 3,
        content: `<h2>Getting It Done</h2><p>From planning to shipping...</p>`,
        resources: []
      },
      {
        id: 'lesson-4',
        title: 'Metrics & Impact Measurement',
        description: 'Tracking progress and outcomes',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        duration: 21,
        order: 4,
        content: `<h2>What Gets Measured</h2><p>Choosing the right KPIs...</p>`,
        resources: []
      },
      {
        id: 'lesson-5',
        title: 'Continuous Improvement',
        description: 'Learning and iterating',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        duration: 23,
        order: 5,
        content: `<h2>Kaizen Mindset</h2><p>Always improving, never settling...</p>`,
        resources: []
      }
    ]
  }
];