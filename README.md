# TrustVote Client

<p align="center">
  <img src="https://your-logo-link-here.com" alt="TrustVote Logo" width="100"> <!-- Optional: Add your project logo here -->
</p>

<p align="center">
   <a href="https://hamad-portfolio.vercel.app/" target="_blank">
      <img src="https://i.imgur.com/PY46yqx.png" alt="Portfolio" width="20" height="20">
   </a>
   <a href="https://www.linkedin.com/in/hamadullah16/" target="_blank">
      <img src="https://cdn-icons-png.flaticon.com/256/174/174857.png" alt="LinkedIn" width="20" height="20">
   </a>
   <a href="mailto:hamadullah16@gmail.com">
      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Gmail_icon_%282020%29.svg/2560px-Gmail_icon_%282020%29.svg.png" alt="Gmail" width="20" height="20">
   </a>
</p>

---

## 🚀 About TrustVote

TrustVote is a decentralized electronic voting platform that uses blockchain technology to ensure secure, transparent, and tamper-proof elections. This repository contains the **client-side** code built with **Next.js**, **React**, **TypeScript**, and other modern web technologies.

### ✨ Key Features
- 🔐 **Decentralized Voting**: Ensures secure and immutable vote recording on the Solana blockchain.
- 🗳️ **Real-Time Voting Counts**: Live updates of voting results using **Socket.io**.
- 🌐 **Google Authentication**: Secured user login with Google via **NextAuth.js**.
- 🕒 **Automated Voting Sessions**: Scheduled voting with **node-scheduler**.
- 🧑‍💻 **Modern UI**: Built with **TailwindCSS**, **ShadCN**, and **Framer Motion** for a seamless user experience.

---

## 🛠️ Tech Stack

| **Frontend**            | **Backend (API)**             |
|-------------------------|-------------------------------|
| Next.js (React)         | Node.js (Express)             |
| TypeScript              | MongoDB                       |
| TailwindCSS, ShadCN     | Socket.io                     |
| Framer Motion           | Solana Web3.js (Solana SDK)   |
| NextAuth.js             |                               |

---

## 📦 Installation & Setup

### Prerequisites
- [Node.js](https://nodejs.org/) (v18.x recommended)
- [Git](https://git-scm.com/)
- [Yarn](https://yarnpkg.com/) (or npm)

### Clone the Repository
```bash
git clone https://github.com/HamadUllah16/trustvote-client.git
cd trustvote-client

Install Dependencies

yarn install
# or if you prefer npm
npm install

Configure Environment Variables

Create a .env.local file in the root directory and add the following:

NEXT_PUBLIC_API_URL=http://localhost:4000/api
NEXT_PUBLIC_SOCKET_URL=http://localhost:4000
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your-google-client-id
NEXT_PUBLIC_GOOGLE_CLIENT_SECRET=your-google-client-secret

Run the Development Server

yarn dev
# or
npm run dev

Visit http://localhost:3000 to access the application.

📂 Project Structure

trustvote-client/
├── public/                # Static assets
├── src/
│   ├── components/        # Reusable UI components
│   ├── pages/             # Next.js pages (routes)
│   ├── hooks/             # Custom React hooks
│   ├── contexts/          # React Context for global state
│   ├── utils/             # Helper functions
│   ├── services/          # API calls (Axios)
│   ├── styles/            # Global styles (Tailwind)
│   └── types/             # TypeScript types
├── .env.local             # Environment variables
├── next.config.js         # Next.js configuration
└── package.json           # Project dependencies

🤝 Contributing

Contributions are welcome! To get started:

    Fork this repository.
    Create a new branch: git checkout -b feature/your-feature-name.
    Commit your changes: git commit -m 'Add feature'.
    Push to the branch: git push origin feature/your-feature-name.
    Open a Pull Request.


