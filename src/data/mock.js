// Mock data for portfolio
import project1 from '../assets/image/s1.png';
import project2 from '../assets/image/s2.png';
import project3 from '../assets/image/s3.png';
import project4 from '../assets/image/imgsli.png';
import project5 from '../assets/image/itsimg.png';
import project6 from '../assets/image/wedimg1.png';
import project7 from '../assets/image/wedimg.png';
import figma1 from '../assets/image/f1.png';
import figma2 from '../assets/image/f2.png';
import figma3 from '../assets/image/apperp.png';

export const portfolioData = {
  personal: {
    name: "Aswanth Krishna A S",
    title: "Full Stack Developer / Software Designer / UI/UX Developer / Front End Developer",
    tagline: "Full Stack Developer / Software Designer / UI/UX Developer / Front End Developer",
    bio: "I'm a passionate Full Stack Developer with 3+ years of experience in building high-performance, functional, and user-centric digital experiences. My work blends robust backend architecture with creative frontend design, bringing together the technical and artistic sides of modern web development.",
    location: "",
    email: "aswanth.thalayal12@gmail.com",
    resume: "#"
  },

  social: {
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    twitter: "https://twitter.com",
    dribbble: "https://dribbble.com"
  },

  projects: {
    website: [
      {
        id: 1,
        title: "Preethy Boutique",
        description: "A modern e-commerce boutique platform built with React, Vite, and Node.js for a seamless shopping experience.",
        image: project1,
        technologies: ["React", "Vite", "SCSS", "Node.js", "UI"],
        link: "https://preethy-boutique.minutedesigns.in/",
        github: ""
      },
      {
        id: 2,
        title: "Hills and Cruise",
        description: "A dynamic tour and travels package website featuring dark/white themes and parallax effects.",
        image: project2,
        technologies: ["React", "GSAP", "Parallax", "Node.js", "Dark/White Theme"],
        link: "https://hillsandcruise.in/",
        github: ""
      },
      {
        id: 3,
        title: "Minute Store",
        description: "A premium e-commerce platform for luxury chairs, featuring dynamic product displays and a modern Tailwind UI design.",
        image: project3,
        technologies: ["React", "Node.js", "Tailwind UI", "Dynamic Content"],
        link: "https://minutestore.in/",
        github: ""
      },
      {
        id: 4,
        title: "Silmed Scientific",
        description: "A simple and interactive learning website built with Angular, designed to provide users with an easy, fast, and engaging online learning experience.",
        image: project4,
        technologies: ["Angular", "CSS"],
        link: "https://www.silmedscientific.com/home",
        github: ""
      },
      {
        id: 5,
        title: "ItsMe Pics",
        description: "ItsMe Pics is an e-commerce website for selling customized photo frames, built with React Vite and Node.js, with Bootstrap used for responsive and attractive styling.",
        image: project5,
        technologies: ["React", "Vite", "Node.js", "Bootstrap"],
        link: "https://itsmepics.com/",
        github: ""
      },
      {
        id: 6,
        title: "Wedding Invitation",
        description: "A beautiful and responsive wedding invitation website built with React and CSS, designed to showcase wedding details, event schedules, photos, and special moments in an elegant and engaging way.",
        image: project6,
        technologies: ["React", "CSS"],
        link: "https://openinvitation.netlify.app/",
        github: ""
      },
      {
        id: 7,
        title: "Wedding Invitation",
        description: "A beautiful and responsive wedding invitation website built with React and CSS, designed to showcase wedding details, event schedules, photos, and special moments in an elegant and engaging way.",
        image: project7,
        technologies: ["React", "CSS"],
        link: "https://weddinginvitationopen.netlify.app/",
        github: ""
      }
    ],
    figma: [
      {
        id: 4,
        title: "UI/UX Designs Portfolio",
        description: "A comprehensive collection of modern UI/UX designs showcasing user-centric design principles.",
        image: figma1,
        technologies: ["Figma", "UI/UX", "Prototyping"],
        link: "https://www.figma.com/proto/dL8purA3eRt4PPrbMZ9SM1/UI-UX-Designs?node-id=212-3&starting-point-node-id=212%3A3",
        github: ""
      },
      {
        id: 5,
        title: "Alpha Trades - Delivery Personnel",
        description: "A specialized UI design for delivery personnel application, focusing on efficiency and ease of use.",
        image: figma2,
        technologies: ["Figma", "App Design", "UX Research"],
        link: "https://www.figma.com/proto/CwfcoAa4VpmHFinhEwuZOV/Alpha-trades---Delivery-Personnel?node-id=1-2&t=2Vpn42cTphPTMdWr-0&scaling=scale-down&content-scaling=fixed&page-id=0%3A1",
        github: ""
      },
      {
        id: 6,
        title: "Manuel Hatchery - ERP Mobile App",
        description: "A modern ERP-based mobile application UI design for hatchery management, focusing on egg inventory, tracking, and incubator operations.",
        image: figma3,
        technologies: ["Figma", "App Design", "ERP", "UX Research"],
        link: "https://www.figma.com/proto/18FNGVcglOPNn7IdRAspG7/Manuel-Hatchery-Egg?node-id=2-109&t=2kX2y6unbn6B3jbP-0&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1",
        github: ""
      }
    ]
  },

  skills: [
    {
      category: "Frontend Development",
      items: [
        {
          name: "React.js",
          experience: "3 Years",
          description: "With three years of experience in React.js, I have built and maintained dynamic, responsive web applications, implemented state management, optimized performance, and collaborated with teams to enhance user interfaces and functionality."
        },
        {
          name: "HTML5",
          experience: "3 Years",
          description: "With three years of experience in HTML5, I have created responsive, user-friendly web pages, utilized semantic elements for better SEO, integrated multimedia content, and ensured cross-browser compatibility and accessibility standards compliance."
        },
        {
          name: "CSS",
          experience: "3 Years",
          description: "With three years of experience in CSS, I have designed visually appealing, responsive layouts, utilized Flexbox and Grid for modern designs, optimized styles for performance, and implemented animations to enhance user experience."
        },
        {
          name: "Bootstrap",
          experience: "3 Years",
          description: "With three years of experience in Bootstrap, I have built responsive, mobile-first web pages, utilized pre-designed components, customized themes, ensured cross-browser compatibility, and streamlined development with the framework's grid system and utilities."
        },
        {
          name: "jQuery",
          experience: "3 Years",
          description: "With three years of experience in jQuery, I have enhanced web interactivity, simplified DOM manipulation, managed events, implemented animations, and improved AJAX functionality for seamless user experiences across different browsers."
        },
        {
          name: "Ionic",
          experience: "6 Months",
          description: "With six months of experience in Ionic, I have streamlined DOM manipulation, handled events, created animations, and leveraged AJAX for dynamic content updates, enhancing overall website interactivity and performance."
        },
        {
          name: "SCSS",
          experience: "3 Years",
          description: "With three years of experience in SCSS, I've organized stylesheets efficiently using nesting and variables, utilized mixins for reusable code, implemented inheritance and modularization, and optimized CSS compilation for improved project maintainability."
        },
        {
          name: "Tailwind CSS",
          experience: "3 Years",
          description: "With three years of experience in Tailwind CSS, I have rapidly built modern, responsive user interfaces using its utility-first approach, ensuring maintainable and scalable design systems directly within the markup."
        },
        {
          name: "Material UI",
          experience: "3 Years",
          description: "With three years of experience in Material UI, I have developed accessible and consistent React applications by leveraging its comprehensive library of pre-built components and customization options."
        }
      ]
    },
    {
      category: "Backend Development",
      items: [
        {
          name: "Node.js",
          experience: "3 Years",
          description: "With three years of experience in Node.js, I have developed server-side applications, built RESTful APIs, managed databases with MongoDB, implemented authentication, and ensured efficient performance and scalability for web services."
        },
        {
          name: "MySQL",
          experience: "3 Years",
          description: "With three years of experience in MySQL, I have designed and managed databases, written complex queries, optimized performance, ensured data integrity, and collaborated on database schema design to support application requirements."
        },
        {
          name: "MongoDB",
          experience: "3 Years",
          description: "With three years of experience in MongoDB, I have designed NoSQL databases, implemented CRUD operations, optimized queries, handled data replication and sharding, and integrated MongoDB with various backend frameworks for scalable applications."
        }
      ]
    },
    {
      category: "Design & Tools",
      items: [
        {
          name: "Figma",
          experience: "3 Years",
          description: "With three years of experience in Figma, I've designed user interfaces collaboratively, created wireframes and prototypes, maintained design systems, and ensured seamless handoff to developers, facilitating efficient product development workflows."
        },
        {
          name: "Canva",
          experience: "3 Years",
          description: "With three years of experience in Canva, I have created visually engaging graphics, presentations, and social media assets, utilizing its vast library of templates and tools to deliver professional designs efficiently."
        },
        {
          name: "Logo Sketch",
          experience: "3 Years",
          description: "With three years of experience in Logo Sketching, I have conceptualized unique brand identities, translating abstract ideas into tangible visual representations through hand-drawn sketches and refinements."
        },
        {
          name: "SketchBook",
          experience: "3 Years",
          description: "With three years of experience in SketchBook, I have utilized digital sketching tools to create detailed illustrations, concept art, and design drafts, streamlining the transition from idea to digital asset."
        }
      ]
    }
  ],

  services: [
    {
      title: "Web Development",
      description: "Custom web applications built with modern technologies and best practices.",
      icon: "Code"
    },
    {
      title: "UI/UX Design",
      description: "User-centered design solutions that combine aesthetics with functionality.",
      icon: "Palette"
    },
    {
      title: "Animation & Interactions",
      description: "Smooth, engaging animations that bring websites to life using GSAP and WebGL.",
      icon: "Sparkles"
    },
    {
      title: "Performance Optimization",
      description: "Lightning-fast websites optimized for speed and user experience.",
      icon: "Zap"
    }
  ],

  experience: [
    {
      id: 1,
      title: "Senior Frontend Developer",
      period: "2022 - Present",
      description: "Leading frontend development for enterprise applications, mentoring junior developers, and implementing modern React architectures.",
      technologies: ["React", "TypeScript", "GraphQL", "AWS"]
    },
    {
      id: 2,
      title: "Full Stack Developer",
      period: "2020 - 2022",
      description: "Developed and maintained multiple client projects, from concept to deployment, focusing on scalable solutions.",
      technologies: ["Next.js", "Node.js", "MongoDB", "Docker"]
    },
    {
      id: 3,
      title: "UI/UX Developer",
      period: "2019 - 2020",
      description: "Created interactive prototypes and implemented pixel-perfect designs with smooth animations.",
      technologies: ["React", "GSAP", "Figma", "Adobe XD"]
    }
  ],

  testimonials: [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Product Manager",
      company: "InnovateLabs",
      content: "Alex delivered exceptional work on our project. Their attention to detail and creative problem-solving exceeded our expectations.",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150"
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "CTO",
      company: "FutureTech",
      content: "Working with Alex was a game-changer for our startup. Their technical expertise and design sensibility are unmatched.",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150"
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      role: "Creative Director",
      company: "Artisan Digital",
      content: "Alex's ability to blend beautiful design with robust functionality is remarkable. Highly recommend for any creative project.",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150"
    }
  ]
};
