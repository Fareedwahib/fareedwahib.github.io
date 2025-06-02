import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHealth(): object {
    return {
      status: 'OK',
      timestamp: new Date().toISOString(),
      message: 'Portfolio API is running successfully',
    };
  }

  getPortfolioData(): object {
    return {
      name: 'Your Name',
      title: 'Backend Developer',
      bio: 'Passionate backend developer with expertise in NestJS, Node.js, and building scalable APIs.',
      skills: [
        { name: 'NestJS', level: 90 },
        { name: 'Node.js', level: 95 },
        { name: 'TypeScript', level: 88 },
        { name: 'PostgreSQL', level: 85 },
        { name: 'MongoDB', level: 80 },
        { name: 'Redis', level: 75 },
        { name: 'Docker', level: 82 },
        { name: 'AWS', level: 78 },
      ],
      experience: [
        {
          year: '2023 - Present',
          position: 'Senior Backend Developer',
          description: 'Building scalable microservices and APIs using NestJS and TypeScript.',
        },
        {
          year: '2022 - 2023',
          position: 'Backend Developer',
          description: 'Developed RESTful APIs and implemented database optimization strategies.',
        },
        {
          year: '2021 - 2022',
          position: 'Junior Developer',
          description: 'Started my journey in backend development with Node.js and Express.',
        },
      ],
      projects: [
        {
          name: 'E-commerce API',
          description: 'Built a comprehensive e-commerce backend with payment integration.',
          technologies: ['NestJS', 'PostgreSQL', 'Redis', 'Stripe'],
        },
        {
          name: 'Real-time Chat System',
          description: 'Developed a scalable real-time messaging system with WebSocket support.',
          technologies: ['NestJS', 'Socket.io', 'MongoDB', 'JWT'],
        },
        {
          name: 'Task Management API',
          description: 'Created a robust task management system with role-based access control.',
          technologies: ['NestJS', 'TypeORM', 'PostgreSQL', 'JWT'],
        },
      ],
      contact: {
        email: 'your.email@example.com',
        github: 'https://github.com/yourusername',
        linkedin: 'https://linkedin.com/in/yourusername',
        location: 'Your City, Country',
      },
    };
  }
}