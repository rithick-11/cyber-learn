import { Topic } from '../types';

export const topics: Topic[] = [
  {
    id: 'networking',
    title: 'Networking',
    description: 'Learn about network protocols, architecture, and security fundamentals',
    icon: 'Network',
    progress: 0,
    modules: [
      {
        id: 'net-1',
        title: 'TCP/IP Fundamentals',
        description: 'Understanding the basics of TCP/IP protocol suite',
        completed: false,
        xp: 100,
        content: `# TCP/IP Fundamentals

TCP/IP (Transmission Control Protocol/Internet Protocol) is the foundation of the internet. Let's explore its key components:

## The TCP/IP Protocol Suite

1. Application Layer
   - HTTP/HTTPS for web browsing
   - FTP for file transfer
   - SMTP/POP3/IMAP for email
   - DNS for domain name resolution

2. Transport Layer
   - TCP: Connection-oriented, reliable delivery
   - UDP: Connectionless, fast but unreliable
   - Port numbers and sockets

3. Internet Layer
   - IP addressing and routing
   - ICMP for network diagnostics
   - IPv4 vs IPv6

4. Network Access Layer
   - Ethernet and WiFi
   - MAC addresses
   - Physical transmission

## Key Concepts

- Three-way handshake
- Flow control and congestion control
- Packet structure and headers
- Subnetting and CIDR notation`,
        quiz: [
          {
            question: 'Which layer of the TCP/IP model handles reliable data delivery?',
            options: ['Application Layer', 'Transport Layer', 'Internet Layer', 'Network Access Layer'],
            correctAnswer: 1
          },
          {
            question: 'What is the purpose of the three-way handshake?',
            options: [
              'To encrypt data transmission',
              'To establish a reliable connection between hosts',
              'To resolve domain names',
              'To assign IP addresses'
            ],
            correctAnswer: 1
          }
        ]
      },
      {
        id: 'net-2',
        title: 'OSI Model',
        description: 'Deep dive into the OSI model layers',
        completed: false,
        xp: 150,
        content: `# The OSI Model

The OSI (Open Systems Interconnection) model is a conceptual framework used to understand network interactions.

## The Seven Layers

1. Physical Layer (Layer 1)
   - Electrical and physical specifications
   - Binary transmission
   - Hardware requirements

2. Data Link Layer (Layer 2)
   - MAC addressing
   - Error detection and correction
   - Frame synchronization

3. Network Layer (Layer 3)
   - Logical addressing (IP)
   - Routing
   - Path determination

4. Transport Layer (Layer 4)
   - End-to-end connections
   - Reliability
   - Flow control

5. Session Layer (Layer 5)
   - Session establishment
   - Maintenance and termination
   - Authentication

6. Presentation Layer (Layer 6)
   - Data translation
   - Encryption/Decryption
   - Format conversion

7. Application Layer (Layer 7)
   - User interface
   - Application services
   - Protocol definitions

## Key Concepts

- Encapsulation and de-encapsulation
- Protocol Data Units (PDUs)
- Layer independence
- Interface between layers`,
        quiz: [
          {
            question: 'How many layers are in the OSI model?',
            options: ['4', '5', '6', '7'],
            correctAnswer: 3
          },
          {
            question: 'Which layer handles routing between networks?',
            options: ['Data Link Layer', 'Network Layer', 'Transport Layer', 'Session Layer'],
            correctAnswer: 1
          }
        ]
      }
    ]
  },
  {
    id: 'app-security',
    title: 'Application Security',
    description: 'Explore web application vulnerabilities and secure coding practices',
    icon: 'Shield',
    progress: 0,
    modules: [
      {
        id: 'app-1',
        title: 'OWASP Top 10',
        description: 'Understanding common web application vulnerabilities',
        completed: false,
        xp: 200,
        content: `# OWASP Top 10 Web Application Security Risks

The OWASP Top 10 is a powerful awareness document for web application security.

## Common Vulnerabilities

1. Injection
   - SQL Injection
   - Command Injection
   - Prevention techniques

2. Broken Authentication
   - Session management
   - Password policies
   - Multi-factor authentication

3. Sensitive Data Exposure
   - Encryption at rest
   - Encryption in transit
   - Data classification

4. XML External Entities (XXE)
   - XML processing
   - Entity expansion
   - Prevention strategies

5. Broken Access Control
   - Authorization vs Authentication
   - Role-based access control
   - Principle of least privilege

## Best Practices

- Input validation
- Output encoding
- Secure configuration
- Regular security testing`,
        quiz: [
          {
            question: 'What is the most common type of injection attack?',
            options: ['XSS', 'SQL Injection', 'Command Injection', 'LDAP Injection'],
            correctAnswer: 1
          },
          {
            question: 'Which of these is NOT a proper defense against injection attacks?',
            options: [
              'Input validation',
              'Parameterized queries',
              'Stored procedures',
              'Client-side validation only'
            ],
            correctAnswer: 3
          }
        ]
      }
    ]
  },
  {
    id: 'physical-security',
    title: 'Physical Security',
    description: 'Learn about physical security controls and best practices',
    icon: 'Lock',
    progress: 0,
    modules: [
      {
        id: 'phys-1',
        title: 'Access Control',
        description: 'Physical access control systems and methods',
        completed: false,
        xp: 100,
        content: `# Physical Access Control Systems

Physical security is the first line of defense in protecting assets.

## Access Control Methods

1. Authentication Factors
   - Something you have (card, key)
   - Something you know (PIN)
   - Something you are (biometrics)

2. Biometric Systems
   - Fingerprint recognition
   - Facial recognition
   - Retinal scanning
   - Error rates and accuracy

3. Card-Based Systems
   - Magnetic stripe
   - Proximity cards
   - Smart cards
   - Security features

4. Environmental Design
   - Natural surveillance
   - Territorial reinforcement
   - Natural access control
   - Target hardening

## Security Zones

- Public areas
- Reception areas
- Operations areas
- Restricted areas
- High-security areas`,
        quiz: [
          {
            question: 'Which is NOT one of the three main authentication factors?',
            options: [
              'Something you have',
              'Something you know',
              'Something you are',
              'Something you do'
            ],
            correctAnswer: 3
          },
          {
            question: 'What is tailgating in physical security?',
            options: [
              'Following too closely on the road',
              'Following an authorized person through a secure door',
              'Using multiple authentication factors',
              'Monitoring access logs'
            ],
            correctAnswer: 1
          }
        ]
      }
    ]
  },
  {
    id: 'risk-assessment',
    title: 'Risk Assessment',
    description: 'Master the art of identifying and evaluating security risks',
    icon: 'AlertTriangle',
    progress: 0,
    modules: [
      {
        id: 'risk-1',
        title: 'Risk Analysis',
        description: 'Methods for analyzing and quantifying risks',
        completed: false,
        xp: 150,
        content: `# Risk Analysis Fundamentals

Understanding how to identify, assess, and manage security risks.

## Risk Assessment Process

1. Asset Identification
   - Critical assets
   - Asset value
   - Asset classification

2. Threat Assessment
   - Threat sources
   - Threat capabilities
   - Threat motivation

3. Vulnerability Analysis
   - Vulnerability identification
   - Vulnerability scoring
   - Impact assessment

4. Risk Calculation
   - Quantitative analysis
   - Qualitative analysis
   - Risk matrices

## Risk Treatment

- Risk acceptance
- Risk mitigation
- Risk transfer
- Risk avoidance

## Documentation

- Risk register
- Treatment plans
- Monitoring and review
- Incident response plans`,
        quiz: [
          {
            question: 'What is the formula for calculating risk?',
            options: [
              'Risk = Threat + Vulnerability',
              'Risk = Threat × Vulnerability × Impact',
              'Risk = Threat - Vulnerability',
              'Risk = Impact ÷ Threat'
            ],
            correctAnswer: 1
          },
          {
            question: 'Which is NOT a valid risk treatment option?',
            options: [
              'Risk acceptance',
              'Risk mitigation',
              'Risk elimination',
              'Risk transfer'
            ],
            correctAnswer: 2
          }
        ]
      }
    ]
  }
];