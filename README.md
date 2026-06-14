# Furqan Zaheer — Personal Portfolio

A personal engineering portfolio showcasing projects, skills, and experience. Built with modern web technologies and deployed on Vercel.

**Live site:** [portfolio-inky-two-28.vercel.app](https://portfolio-inky-two-28.vercel.app)

## Tech Stack

- **Framework:** Next.js 14
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Auth:** NextAuth.js
- **Deployment:** Vercel

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/furqazaheervi6/portfolio.git
cd portfolio

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Fill in the required values in .env.local

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint |

## Project Structure

```
portfolio/
├── app/          # Next.js App Router pages and layouts
├── .env.example  # Example environment variables
├── next.config.js
├── tailwind.config.ts
└── tsconfig.json
```

## License

MIT
