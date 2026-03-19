export type LearningResource = {
  title: string;
  url: string;
  type: 'docs' | 'course' | 'tutorial' | 'roadmap';
  free: boolean;
};

export const LEARNING_RESOURCES: Record<string, LearningResource[]> = {
  React: [
    {
      title: 'React Official Docs',
      url: 'https://react.dev',
      type: 'docs',
      free: true,
    },
    {
      title: 'React - freeCodeCamp',
      url: 'https://www.freecodecamp.org/learn/front-end-development-libraries/',
      type: 'course',
      free: true,
    },
    {
      title: 'React Roadmap',
      url: 'https://roadmap.sh/react',
      type: 'roadmap',
      free: true,
    },
  ],
  'Next.js': [
    {
      title: 'Next.js Official Docs',
      url: 'https://nextjs.org/docs',
      type: 'docs',
      free: true,
    },
    {
      title: 'Next.js Learn',
      url: 'https://nextjs.org/learn',
      type: 'course',
      free: true,
    },
  ],
  TypeScript: [
    {
      title: 'TypeScript Official Docs',
      url: 'https://www.typescriptlang.org/docs',
      type: 'docs',
      free: true,
    },
    {
      title: 'TypeScript Roadmap',
      url: 'https://roadmap.sh/typescript',
      type: 'roadmap',
      free: true,
    },
    {
      title: 'TypeScript - freeCodeCamp',
      url: 'https://www.freecodecamp.org/news/learn-typescript-beginners-guide/',
      type: 'tutorial',
      free: true,
    },
  ],
  'Vue.js': [
    {
      title: 'Vue.js Official Docs',
      url: 'https://vuejs.org/guide',
      type: 'docs',
      free: true,
    },
    {
      title: 'Vue Roadmap',
      url: 'https://roadmap.sh/vue',
      type: 'roadmap',
      free: true,
    },
  ],
  Angular: [
    {
      title: 'Angular Official Docs',
      url: 'https://angular.dev',
      type: 'docs',
      free: true,
    },
    {
      title: 'Angular Roadmap',
      url: 'https://roadmap.sh/angular',
      type: 'roadmap',
      free: true,
    },
  ],
  'Node.js': [
    {
      title: 'Node.js Official Docs',
      url: 'https://nodejs.org/docs',
      type: 'docs',
      free: true,
    },
    {
      title: 'Node.js Roadmap',
      url: 'https://roadmap.sh/nodejs',
      type: 'roadmap',
      free: true,
    },
    {
      title: 'Node.js - freeCodeCamp',
      url: 'https://www.freecodecamp.org/learn/back-end-development-and-apis/',
      type: 'course',
      free: true,
    },
  ],
  NestJS: [
    {
      title: 'NestJS Official Docs',
      url: 'https://docs.nestjs.com',
      type: 'docs',
      free: true,
    },
    {
      title: 'NestJS Course - freeCodeCamp',
      url: 'https://www.youtube.com/watch?v=pcX97ZrTE6M',
      type: 'course',
      free: true,
    },
  ],
  Python: [
    {
      title: 'Python Official Docs',
      url: 'https://docs.python.org/3/',
      type: 'docs',
      free: true,
    },
    {
      title: 'Python Roadmap',
      url: 'https://roadmap.sh/python',
      type: 'roadmap',
      free: true,
    },
    {
      title: 'Python - freeCodeCamp',
      url: 'https://www.freecodecamp.org/learn/scientific-computing-with-python/',
      type: 'course',
      free: true,
    },
  ],
  Docker: [
    {
      title: 'Docker Official Docs',
      url: 'https://docs.docker.com',
      type: 'docs',
      free: true,
    },
    {
      title: 'Docker Roadmap',
      url: 'https://roadmap.sh/docker',
      type: 'roadmap',
      free: true,
    },
    {
      title: 'Docker - freeCodeCamp',
      url: 'https://www.freecodecamp.org/news/the-docker-handbook/',
      type: 'tutorial',
      free: true,
    },
  ],
  Kubernetes: [
    {
      title: 'Kubernetes Official Docs',
      url: 'https://kubernetes.io/docs',
      type: 'docs',
      free: true,
    },
    {
      title: 'Kubernetes Roadmap',
      url: 'https://roadmap.sh/kubernetes',
      type: 'roadmap',
      free: true,
    },
    {
      title: 'Kubernetes - freeCodeCamp',
      url: 'https://www.freecodecamp.org/news/learn-kubernetes-in-under-3-hours/',
      type: 'tutorial',
      free: true,
    },
  ],
  AWS: [
    {
      title: 'AWS Documentation',
      url: 'https://docs.aws.amazon.com',
      type: 'docs',
      free: true,
    },
    {
      title: 'AWS Roadmap',
      url: 'https://roadmap.sh/aws',
      type: 'roadmap',
      free: true,
    },
    {
      title: 'AWS Cloud Practitioner - freeCodeCamp',
      url: 'https://www.freecodecamp.org/news/pass-the-aws-certified-cloud-practitioner-exam/',
      type: 'course',
      free: true,
    },
  ],
  'Google Cloud': [
    {
      title: 'Google Cloud Docs',
      url: 'https://cloud.google.com/docs',
      type: 'docs',
      free: true,
    },
    {
      title: 'Google Cloud Skills Boost',
      url: 'https://cloudskillsboost.google',
      type: 'course',
      free: true,
    },
  ],
  Azure: [
    {
      title: 'Azure Docs',
      url: 'https://learn.microsoft.com/azure',
      type: 'docs',
      free: true,
    },
    {
      title: 'Azure Fundamentals - Microsoft Learn',
      url: 'https://learn.microsoft.com/en-us/training/paths/azure-fundamentals/',
      type: 'course',
      free: true,
    },
  ],
  PostgreSQL: [
    {
      title: 'PostgreSQL Official Docs',
      url: 'https://www.postgresql.org/docs/',
      type: 'docs',
      free: true,
    },
    {
      title: 'PostgreSQL - freeCodeCamp',
      url: 'https://www.freecodecamp.org/news/postgresql-full-course/',
      type: 'course',
      free: true,
    },
  ],
  MongoDB: [
    {
      title: 'MongoDB Docs',
      url: 'https://www.mongodb.com/docs/',
      type: 'docs',
      free: true,
    },
    {
      title: 'MongoDB University',
      url: 'https://learn.mongodb.com',
      type: 'course',
      free: true,
    },
  ],
  Redis: [
    {
      title: 'Redis Docs',
      url: 'https://redis.io/docs',
      type: 'docs',
      free: true,
    },
    {
      title: 'Redis University',
      url: 'https://university.redis.com',
      type: 'course',
      free: true,
    },
  ],
  Terraform: [
    {
      title: 'Terraform Docs',
      url: 'https://developer.hashicorp.com/terraform/docs',
      type: 'docs',
      free: true,
    },
    {
      title: 'Terraform Roadmap',
      url: 'https://roadmap.sh/terraform',
      type: 'roadmap',
      free: true,
    },
  ],
  'GitHub Actions': [
    {
      title: 'GitHub Actions Docs',
      url: 'https://docs.github.com/actions',
      type: 'docs',
      free: true,
    },
    {
      title: 'GitHub Actions - freeCodeCamp',
      url: 'https://www.freecodecamp.org/news/learn-github-actions/',
      type: 'tutorial',
      free: true,
    },
  ],
  'React Native': [
    {
      title: 'React Native Docs',
      url: 'https://reactnative.dev/docs/getting-started',
      type: 'docs',
      free: true,
    },
    {
      title: 'React Native Roadmap',
      url: 'https://roadmap.sh/react-native',
      type: 'roadmap',
      free: true,
    },
  ],
  Flutter: [
    {
      title: 'Flutter Docs',
      url: 'https://docs.flutter.dev',
      type: 'docs',
      free: true,
    },
    {
      title: 'Flutter - freeCodeCamp',
      url: 'https://www.freecodecamp.org/news/learn-flutter-full-course/',
      type: 'course',
      free: true,
    },
  ],
  Java: [
    {
      title: 'Java Documentation',
      url: 'https://docs.oracle.com/en/java/',
      type: 'docs',
      free: true,
    },
    {
      title: 'Java Roadmap',
      url: 'https://roadmap.sh/java',
      type: 'roadmap',
      free: true,
    },
  ],
  'Spring Boot': [
    {
      title: 'Spring Boot Docs',
      url: 'https://spring.io/projects/spring-boot',
      type: 'docs',
      free: true,
    },
    {
      title: 'Spring Boot - freeCodeCamp',
      url: 'https://www.freecodecamp.org/news/spring-boot-tutorial/',
      type: 'tutorial',
      free: true,
    },
  ],
  'C#': [
    {
      title: 'C# Documentation',
      url: 'https://learn.microsoft.com/dotnet/csharp/',
      type: 'docs',
      free: true,
    },
    {
      title: 'C# Roadmap',
      url: 'https://roadmap.sh/csharp',
      type: 'roadmap',
      free: true,
    },
  ],
  Go: [
    {
      title: 'Go Official Docs',
      url: 'https://go.dev/doc/',
      type: 'docs',
      free: true,
    },
    {
      title: 'Go Roadmap',
      url: 'https://roadmap.sh/golang',
      type: 'roadmap',
      free: true,
    },
    {
      title: 'Go - freeCodeCamp',
      url: 'https://www.freecodecamp.org/news/go-beginners-handbook/',
      type: 'tutorial',
      free: true,
    },
  ],
  Kotlin: [
    {
      title: 'Kotlin Docs',
      url: 'https://kotlinlang.org/docs',
      type: 'docs',
      free: true,
    },
    {
      title: 'Kotlin - JetBrains Academy',
      url: 'https://hyperskill.org/tracks/18',
      type: 'course',
      free: true,
    },
  ],
  PHP: [
    {
      title: 'PHP Docs',
      url: 'https://www.php.net/docs.php',
      type: 'docs',
      free: true,
    },
    {
      title: 'PHP Roadmap',
      url: 'https://roadmap.sh/php',
      type: 'roadmap',
      free: true,
    },
  ],
  GraphQL: [
    {
      title: 'GraphQL Official Docs',
      url: 'https://graphql.org/learn/',
      type: 'docs',
      free: true,
    },
    {
      title: 'GraphQL Roadmap',
      url: 'https://roadmap.sh/graphql',
      type: 'roadmap',
      free: true,
    },
  ],
  Jest: [
    {
      title: 'Jest Official Docs',
      url: 'https://jestjs.io/docs/getting-started',
      type: 'docs',
      free: true,
    },
    {
      title: 'Testing JavaScript - Kent C. Dodds',
      url: 'https://testingjavascript.com',
      type: 'course',
      free: false,
    },
  ],
  Linux: [
    {
      title: 'Linux Roadmap',
      url: 'https://roadmap.sh/linux',
      type: 'roadmap',
      free: true,
    },
    {
      title: 'Linux - freeCodeCamp',
      url: 'https://www.freecodecamp.org/news/introduction-to-linux/',
      type: 'course',
      free: true,
    },
  ],
};
