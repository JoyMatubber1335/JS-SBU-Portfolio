import { SkillSet } from '../../payload-types'

export const skillSetsSeed: Partial<SkillSet>[] = [
  {
    title: 'Full Stack Development',
    description: [
      {
        children: [
          {
            text: 'Comprehensive expertise in end-to-end application development, from database design to user interfaces. Proficient in modern JavaScript frameworks and backend technologies.',
          },
        ],
      },
    ],
    skillType: 'full-stack',
    technologies: [
      { technology: 'React' },
      { technology: 'Node.js' },
      { technology: 'Express' },
      { technology: 'MongoDB' },
      { technology: 'TypeScript' },
      { technology: 'Next.js' },
    ],
    order: 10,
  },
  {
    title: 'UI/UX Research',
    description: [
      {
        children: [
          {
            text: 'User-centric design approach with focus on creating intuitive and engaging interfaces. Experience in conducting user research, prototyping, and implementing responsive designs.',
          },
        ],
      },
    ],
    skillType: 'ui-ux',
    technologies: [
      { technology: 'Figma' },
      { technology: 'Adobe XD' },
      { technology: 'User Testing' },
      { technology: 'Wireframing' },
      { technology: 'Prototyping' },
      { technology: 'Accessibility' },
    ],
    order: 20,
  },
  {
    title: 'System Architecture',
    description: [
      {
        children: [
          {
            text: 'Designing scalable and maintainable software systems with a focus on performance, security, and extensibility. Experience in microservices, serverless architectures, and distributed systems.',
          },
        ],
      },
    ],
    skillType: 'system-architecture',
    technologies: [
      { technology: 'Microservices' },
      { technology: 'API Design' },
      { technology: 'System Integration' },
      { technology: 'Scalability' },
      { technology: 'Design Patterns' },
      { technology: 'Event-Driven Architecture' },
    ],
    order: 30,
  },
  {
    title: 'Cloud Native Apps',
    description: [
      {
        children: [
          {
            text: 'Developing applications optimized for cloud environments with expertise in containerization, orchestration, and cloud service integration.',
          },
        ],
      },
    ],
    skillType: 'cloud-native',
    technologies: [
      { technology: 'AWS' },
      { technology: 'Azure' },
      { technology: 'Docker' },
      { technology: 'Kubernetes' },
      { technology: 'Serverless' },
      { technology: 'CI/CD' },
    ],
    order: 40,
  },
  {
    title: 'Machine Learning Implementation',
    description: [
      {
        children: [
          {
            text: 'Integrating machine learning capabilities into applications with practical experience in implementing ML models for production environments.',
          },
        ],
      },
    ],
    skillType: 'machine-learning',
    technologies: [
      { technology: 'TensorFlow' },
      { technology: 'PyTorch' },
      { technology: 'Natural Language Processing' },
      { technology: 'Computer Vision' },
      { technology: 'Predictive Analytics' },
      { technology: 'ML APIs' },
    ],
    order: 50,
  },
  {
    title: 'Performance Optimization',
    description: [
      {
        children: [
          {
            text: 'Enhancing application speed, responsiveness, and resource efficiency through code optimization, caching strategies, and performance testing.',
          },
        ],
      },
    ],
    skillType: 'performance-optimization',
    technologies: [
      { technology: 'Load Testing' },
      { technology: 'Profiling' },
      { technology: 'Caching' },
      { technology: 'Resource Optimization' },
      { technology: 'Database Tuning' },
      { technology: 'Frontend Performance' },
    ],
    order: 60,
  },
]; 