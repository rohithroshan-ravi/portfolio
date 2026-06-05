<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

This is a Next.js portfolio website project for Rohithroshan R.

## Project Overview

- **Framework**: Next.js 14 with React 18
- **Language**: TypeScript
- **Styling**: Tailwind CSS with PostCSS
- **Type**: Full-stack web application

## Project Structure

```
portfolio/
├── app/                    # Next.js app directory
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── Hero.tsx
│   ├── About.tsx
│   ├── Experience.tsx
│   ├── Skills.tsx
│   ├── Projects.tsx
│   └── Contact.tsx
├── public/                # Static assets
├── package.json           # Dependencies
├── tsconfig.json          # TypeScript config
├── next.config.js         # Next.js config
├── tailwind.config.ts     # Tailwind config
└── postcss.config.js      # PostCSS config
```

## Development Guidelines

- Use functional components with hooks
- TypeScript for type safety
- Tailwind CSS for styling
- React client components with `'use client'` where needed
- SEO optimization with Next.js metadata
- Responsive design first approach

## Key Features

- Smooth animations and transitions
- Dark theme with gradient accents
- Mobile-responsive design
- Contact form integration
- Project showcase
- Skill proficiency display

## Deployment

- **Recommended**: Vercel (one-click deployment from Git)
- **Alternative**: GitHub Pages (requires static export)

## Common Commands

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
