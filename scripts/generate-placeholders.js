const fs = require('fs');
const path = require('path');

// Create the projects directory if it doesn't exist
const projectsDir = path.join(process.cwd(), 'public', 'images', 'projects');
if (!fs.existsSync(projectsDir)) {
    fs.mkdirSync(projectsDir, { recursive: true });
}

const projects = [
    {
        name: 'metaflags',
        title: 'MetaFlags',
        subtitle: 'Decentralized Feature Flags',
        color: '#6366f1',
        textColor: '#ffffff',
        description: 'On-chain feature management • Gasless interactions'
    },
    {
        name: 'factfinder-ai',
        title: 'FactFinder AI',
        subtitle: 'Enterprise Fact-Checking',
        color: '#2563eb',
        textColor: '#ffffff',
        description: '99.2% accuracy rate • 1M+ claims verified'
    },
    {
        name: 'wayfinder-dashboard',
        title: 'Wayfinder Dashboard',
        subtitle: 'DeFi Analytics Platform',
        color: '#10b981',
        textColor: '#ffffff',
        description: 'Portfolio tracking • $2M+ assets managed'
    },
    {
        name: 'prompt-optimizer',
        title: 'Prompt Optimizer',
        subtitle: 'AI Cost Reduction',
        color: '#8b5cf6',
        textColor: '#ffffff',
        description: 'Intelligent caching • 60% cost savings'
    },
    {
        name: 'nft-marketplace',
        title: 'NFT Marketplace',
        subtitle: 'Decentralized Trading',
        color: '#f59e0b',
        textColor: '#ffffff',
        description: 'Smart contracts • Royalty management'
    },
    {
        name: 'health-ai',
        title: 'Health AI Assistant',
        subtitle: 'Medical Diagnosis AI',
        color: '#ec4899',
        textColor: '#ffffff',
        description: 'Computer vision • HIPAA compliant'
    },
    {
        name: 'defi-aggregator',
        title: 'DeFi Yield Aggregator',
        subtitle: 'Automated Yield Farming',
        color: '#06b6d4',
        textColor: '#ffffff',
        description: 'Multi-protocol • Auto-compounding'
    },
    {
        name: 'code-review-ai',
        title: 'Code Review AI',
        subtitle: 'Intelligent Code Analysis',
        color: '#64748b',
        textColor: '#ffffff',
        description: 'Bug detection • Standards enforcement'
    }
];

// Generate SVG placeholders
projects.forEach(project => {
    const svg = `
<svg width="1200" height="800" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg-${project.name}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${project.color};stop-opacity:1" />
      <stop offset="100%" style="stop-color:${project.color};stop-opacity:0.8" />
    </linearGradient>
    <filter id="shadow">
      <feDropShadow dx="0" dy="4" stdDeviation="8" flood-opacity="0.2"/>
    </filter>
  </defs>
  
  <!-- Background -->
  <rect width="1200" height="800" fill="url(#bg-${project.name})"/>
  
  <!-- Grid pattern -->
  <defs>
    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="${project.textColor}" stroke-width="0.5" opacity="0.1"/>
    </pattern>
  </defs>
  <rect width="1200" height="800" fill="url(#grid)"/>
  
  <!-- Main content area -->
  <rect x="60" y="60" width="1080" height="680" rx="12" fill="${project.textColor}" opacity="0.08" filter="url(#shadow)"/>
  
  <!-- Header bar -->
  <rect x="80" y="80" width="1040" height="60" rx="8" fill="${project.textColor}" opacity="0.12"/>
  
  <!-- Navigation dots -->
  <circle cx="110" cy="110" r="6" fill="${project.textColor}" opacity="0.3"/>
  <circle cx="130" cy="110" r="6" fill="${project.textColor}" opacity="0.3"/>
  <circle cx="150" cy="110" r="6" fill="${project.textColor}" opacity="0.3"/>
  
  <!-- Content blocks -->
  <rect x="80" y="160" width="480" height="200" rx="8" fill="${project.textColor}" opacity="0.12"/>
  <rect x="580" y="160" width="280" height="96" rx="8" fill="${project.textColor}" opacity="0.12"/>
  <rect x="580" y="264" width="280" height="96" rx="8" fill="${project.textColor}" opacity="0.12"/>
  <rect x="880" y="160" width="240" height="200" rx="8" fill="${project.textColor}" opacity="0.12"/>
  
  <!-- Chart area -->
  <rect x="80" y="380" width="1040" height="260" rx="8" fill="${project.textColor}" opacity="0.06"/>
  
  <!-- Chart bars -->
  <rect x="120" y="560" width="40" height="60" rx="4" fill="${project.textColor}" opacity="0.2"/>
  <rect x="180" y="520" width="40" height="100" rx="4" fill="${project.textColor}" opacity="0.25"/>
  <rect x="240" y="480" width="40" height="140" rx="4" fill="${project.textColor}" opacity="0.3"/>
  <rect x="300" y="440" width="40" height="180" rx="4" fill="${project.textColor}" opacity="0.35"/>
  <rect x="360" y="500" width="40" height="120" rx="4" fill="${project.textColor}" opacity="0.25"/>
  
  <!-- Title -->
  <text x="600" y="450" text-anchor="middle" font-family="system-ui, -apple-system, sans-serif" font-size="48" font-weight="bold" fill="${project.textColor}">
    ${project.title}
  </text>
  
  <!-- Subtitle -->
  <text x="600" y="490" text-anchor="middle" font-family="system-ui, -apple-system, sans-serif" font-size="24" font-weight="500" fill="${project.textColor}" opacity="0.8">
    ${project.subtitle}
  </text>
  
  <!-- Description -->
  <text x="600" y="530" text-anchor="middle" font-family="system-ui, -apple-system, sans-serif" font-size="18" fill="${project.textColor}" opacity="0.7">
    ${project.description}
  </text>
  
  <!-- Decorative elements -->
  <circle cx="1050" cy="150" r="30" fill="${project.textColor}" opacity="0.1"/>
  <circle cx="150" cy="650" r="20" fill="${project.textColor}" opacity="0.15"/>
  <rect x="900" y="500" width="60" height="4" rx="2" fill="${project.textColor}" opacity="0.3"/>
  <rect x="900" y="520" width="80" height="4" rx="2" fill="${project.textColor}" opacity="0.25"/>
  <rect x="900" y="540" width="100" height="4" rx="2" fill="${project.textColor}" opacity="0.2"/>
</svg>`.trim();

    const filePath = path.join(projectsDir, `${project.name}.svg`);
    fs.writeFileSync(filePath, svg);
    console.log(`Generated: ${project.name}.svg`);
});

console.log(`\n✅ Generated ${projects.length} placeholder images in public/images/projects/`);
console.log('\n📁 Generated files:');
projects.forEach(project => {
    console.log(`   - ${project.name}.svg`);
});