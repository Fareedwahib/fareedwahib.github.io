import { Injectable } from '@nestjs/common';
import { name } from 'ejs';

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
      name: 'Fareed Wahib',
      background:'https://www.pexels.com/photo/people-hacking-a-computer-system-5380649/',
      image: '/static/images/profile.jpeg',
      title: 'Junior Backend Developer',
      bio: 'Currently a student with a strong passion for backend development. Despite being in school, I have gained practical experience building APIs and scalable backend systems using modern technologies.',
      skills: [
      { name: 'NestJS', level: 60 },
      { name: 'Node.js', level: 70 },
      { name: 'TypeScript', level: 58 },
      { name: 'PostgreSQL', level: 85 },
      { name: 'MongoDB', level: 80 },
      { name: 'Redis', level: 25 },
      { name: 'Docker', level: 12 },
      // { name: 'AWS', level: 78 },
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
      email: 'inboxwizard160@gmail.com',
      contact: '+256 700 000 000',
      name:'Hacker',
      github: 'https://github.com/fareedwahib',
      linkedin: 'https://linkedin.com/in/fareedwahib',
      location: 'Kampala, Uganda',
      },
    };
  }
}