import { Insight } from '../../payload-types'

export const insightsSeed: Partial<Insight>[] = [
  {
    title: 'Modern Web Performance Optimization Techniques',
    type: 'blog',
    summary: 'Explore the latest techniques and best practices for optimizing web application performance in 2023.',
    slug: 'web-performance-optimization-techniques',
    tags: [
      { tag: 'Performance' },
      { tag: 'Web Development' },
      { tag: 'Frontend' },
    ],
    contentType: 'internal',
    content: [
      {
        children: [
          {
            text: 'Web performance is more critical than ever in today\'s competitive digital landscape. This article covers modern optimization techniques including code splitting, lazy loading, image optimization, and more.',
          },
        ],
      },
      {
        children: [
          {
            text: 'Performance optimization is not just about speed—it\'s about delivering a seamless user experience that keeps visitors engaged and converts them into customers.',
          },
        ],
      },
    ],
    publishedAt: new Date().toISOString(),
  },
  {
    title: 'Building Cloud-Native Applications with Kubernetes',
    type: 'tutorial',
    summary: 'Learn how to design, deploy and manage containerized applications using Kubernetes for scalable cloud solutions.',
    slug: 'kubernetes-cloud-native-tutorial',
    tags: [
      { tag: 'Kubernetes' },
      { tag: 'Cloud' },
      { tag: 'DevOps' },
    ],
    videoType: 'embed',
    videoEmbed: 'https://www.youtube.com/watch?v=QJ4fODH6DXI',
    tutorialContent: [
      {
        children: [
          {
            text: 'This tutorial walks you through setting up a Kubernetes cluster and deploying your first containerized application. We\'ll cover important concepts like pods, services, deployments, and how to manage your infrastructure as code.',
          },
        ],
      },
    ],
    publishedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 1 week ago
  },
  {
    title: 'Introduction to Machine Learning with TensorFlow',
    type: 'tutorial',
    summary: 'A beginner-friendly guide to implementing machine learning models using TensorFlow and JavaScript.',
    slug: 'machine-learning-tensorflow-intro',
    tags: [
      { tag: 'Machine Learning' },
      { tag: 'TensorFlow' },
      { tag: 'JavaScript' },
    ],
    videoType: 'embed',
    videoEmbed: 'https://www.youtube.com/watch?v=tPYj3fFJGjk',
    tutorialContent: [
      {
        children: [
          {
            text: 'This tutorial introduces the fundamentals of machine learning and how to implement basic models using TensorFlow.js. Perfect for web developers looking to add AI capabilities to their applications.',
          },
        ],
      },
    ],
    publishedAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(), // 2 weeks ago
  },
  {
    title: 'Microservices Architecture: Patterns and Best Practices',
    type: 'blog',
    summary: 'Dive into microservices architecture patterns, communication strategies, and implementation considerations.',
    slug: 'microservices-architecture-patterns',
    tags: [
      { tag: 'Architecture' },
      { tag: 'Microservices' },
      { tag: 'System Design' },
    ],
    contentType: 'external',
    externalLink: 'https://microservices.io/patterns/microservices.html',
    publishedAt: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000).toISOString(), // 3 weeks ago
  },
]; 