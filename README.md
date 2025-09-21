# 🚀 MVX Portfolio Manager

<div align="center">
  <img src="https://raw.githubusercontent.com/multiversx/mx-brand-resources/main/logos/svg/multiversx_logo.svg" width="200" alt="MultiversX Logo">
  
  <h3>AI-Powered MultiversX Portfolio Management Dashboard</h3>
  
  <p>
    <strong>Real-time portfolio tracking • AI-powered blockchain operations • Advanced analytics</strong>
  </p>
  
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)](https://typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-000000?logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![MultiversX](https://img.shields.io/badge/MultiversX-23F7DD?logo=multiversx&logoColor=white)](https://multiversx.com/)

</div>

## ✨ Features

### 🎯 Core Functionality

- **Real-time Portfolio Tracking** - Monitor your MultiversX assets with live price updates
- **Multi-Wallet Support** - Manage multiple wallets from a single dashboard
- **Token Management** - Track EGLD, ESDT tokens, and NFTs
- **Transaction History** - Comprehensive transaction tracking and analysis
- **Portfolio Analytics** - Advanced charts and performance metrics

### 🤖 AI-Powered Features

- **AI Assistant** - Natural language blockchain operations
- **Smart Insights** - AI-generated portfolio recommendations
- **Market Analysis** - Intelligent market trend predictions
- **Risk Assessment** - Automated portfolio risk evaluation

### 📊 Advanced Analytics

- **Performance Metrics** - ROI, P&L, and portfolio performance tracking
- **Historical Data** - Long-term portfolio performance analysis
- **Custom Dashboards** - Personalized analytics views
- **Export Reports** - Generate detailed portfolio reports

### 🔧 Developer Features

- **MultiversX SDK Integration** - Built with official MultiversX tools
- **RESTful API** - Headless portfolio management
- **Webhook Support** - Real-time transaction notifications
- **Plugin Architecture** - Extensible with custom modules

## 🛠️ Technology Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS, Headless UI
- **Blockchain**: MultiversX SDK, MultiversX Agent Kit
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js
- **API**: REST API with OpenAPI documentation
- **Deployment**: Vercel, Docker support
- **Caching**: Redis for performance optimization
- **AI**: OpenAI GPT integration for smart features

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm
- PostgreSQL database
- Redis server (optional, for caching)
- MultiversX wallet for testing

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/Gzeu/mvx-portfolio-manager.git
cd mvx-portfolio-manager
```

2. **Install dependencies**
```bash
npm install
```

3. **Environment setup**
```bash
cp .env.example .env.local
```

Configure your environment variables:
```env
# MultiversX Network Configuration
NEXT_PUBLIC_MULTIVERSX_NETWORK=mainnet
NEXT_PUBLIC_MULTIVERSX_API_URL=https://api.multiversx.com
NEXT_PUBLIC_MULTIVERSX_GATEWAY_URL=https://gateway.multiversx.com

# Database
DATABASE_URL="postgresql://user:password@localhost:5432/mvx_portfolio"

# Authentication
NEXTAUTH_SECRET="your-nextauth-secret"
NEXTAUTH_URL="http://localhost:3000"
```

4. **Database setup**
```bash
npx prisma migrate dev
npx prisma generate
```

5. **Start development server**
```bash
npm run dev
```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📖 Usage Guide

### 🔗 Connecting Your Wallet

1. Click "Connect Wallet" in the top-right corner
2. Choose your preferred wallet (Web Wallet, Extension, Hardware)
3. Authorize the connection
4. Your portfolio will automatically sync

### 📊 Portfolio Overview

The main dashboard provides:
- **Total Portfolio Value** - Real-time USD value
- **Asset Breakdown** - Pie chart of your holdings
- **24h Performance** - Daily gains/losses
- **Top Movers** - Best and worst performing assets

### 🤖 Using the AI Assistant

1. Click the AI chat icon in the bottom-right
2. Ask questions like:
   - "What's my portfolio performance this month?"
   - "Should I diversify my holdings?"
   - "Send 10 EGLD to address erd1..."
   - "What are the trending tokens?"

### 📈 Analytics and Reports

- **Performance Tab**: View ROI, P&L charts, and historical data
- **Transactions**: Filter and export transaction history
- **Reports**: Generate PDF/CSV portfolio reports
- **Alerts**: Set price alerts and portfolio notifications

## 🔧 API Documentation

### Authentication

All API endpoints require authentication via JWT tokens:

```bash
Authorization: Bearer <your-jwt-token>
```

### Core Endpoints

#### Get Portfolio Summary

```http
GET /api/portfolio/summary
```

Response:
```json
{
  "totalValue": 15420.50,
  "assets": [
    {
      "identifier": "EGLD",
      "balance": "12.5",
      "value": 750.25,
      "percentage": 4.87
    }
  ],
  "performance": {
    "24h": 2.34,
    "7d": -1.23,
    "30d": 15.67
  }
}
```

#### Get Transaction History

```http
GET /api/transactions?limit=50&offset=0
```

#### AI Query

```http
POST /api/ai/query
Content-Type: application/json

{
  "query": "What's my portfolio performance?",
  "context": "portfolio_analysis"
}
```

For complete API documentation, visit `/api/docs` when running the application.

## 🌐 MultiversX Integration

### Network Configuration

The application supports all MultiversX networks:
- **Mainnet** (production)
- **Devnet** (development)
- **Testnet** (testing)

Switch networks in the `.env` file:
```env
NEXT_PUBLIC_MULTIVERSX_NETWORK=mainnet|devnet|testnet
```

### Supported Wallets

- **MultiversX Web Wallet**
- **MultiversX DeFi Wallet** (Extension)
- **Ledger Hardware Wallet**
- **MultiversX Mobile Wallet** (via WalletConnect)
- **xPortal Mobile App**

### Smart Contract Interactions

The platform supports:
- Native EGLD transfers
- ESDT token operations
- NFT/SFT management
- Smart contract calls
- Staking operations
- DeFi protocol interactions

## 🖼️ Screenshots

### Dashboard Overview
*Portfolio dashboard showing real-time asset values and performance metrics*

### AI Assistant
*AI-powered chat interface for natural language blockchain operations*

### Analytics Dashboard
*Advanced portfolio analytics with interactive charts and insights*

### Transaction History
*Comprehensive transaction tracking with filtering and export options*

📸 Screenshots coming soon! This project is actively being developed.

## 🚀 Deployment

### Vercel (Recommended)

1. Connect your repository to Vercel
2. Configure environment variables in Vercel dashboard
3. Deploy automatically on every git push

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Gzeu/mvx-portfolio-manager)

### Docker

1. **Build the image**
```bash
docker build -t mvx-portfolio-manager .
```

2. **Run the container**
```bash
docker run -p 3000:3000 mvx-portfolio-manager
```

### Manual Deployment

1. **Build for production**
```bash
npm run build
```

2. **Start the application**
```bash
npm start
```

## 🤝 Contributing

We welcome contributions from the community! Here's how you can help:

### Development Setup

1. Fork the repository
2. Create a feature branch
```bash
git checkout -b feature/amazing-feature
```
3. Make your changes
4. Run tests
```bash
npm run test
npm run lint
```
5. Commit your changes
```bash
git commit -m 'Add amazing feature'
```
6. Push to your branch
```bash
git push origin feature/amazing-feature
```
7. Open a Pull Request

### Code Style

- Use TypeScript for all new code
- Follow ESLint and Prettier configurations
- Write tests for new features
- Update documentation for API changes
- Follow conventional commit messages

### Reporting Issues

Found a bug? Have a feature request?

1. Check existing issues to avoid duplicates
2. Create a detailed issue with:
   - Clear description
   - Steps to reproduce
   - Expected vs actual behavior
   - Environment details
   - Screenshots if applicable

### Feature Requests

We love new ideas! When requesting features:
- **Describe the use case** clearly
- **Explain the expected behavior**
- **Consider the impact** on existing users
- **Suggest implementation** if you have ideas

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **MultiversX Team** - For the excellent blockchain infrastructure and SDK
- **Next.js Team** - For the amazing React framework
- **Tailwind CSS** - For the utility-first CSS framework
- **Vercel** - For the seamless deployment platform
- **Community Contributors** - For making this project better

## 📞 Support & Community

- **Documentation**: [docs.multiversx.com](https://docs.multiversx.com)
- **Discord**: [MultiversX Community](https://discord.gg/multiversx)
- **Twitter**: [@MultiversX](https://twitter.com/MultiversX)
- **Telegram**: [MultiversX Official](https://t.me/MultiversX)

### Project Links

- **Repository**: [github.com/Gzeu/mvx-portfolio-manager](https://github.com/Gzeu/mvx-portfolio-manager)
- **Issues**: [Report bugs and request features](https://github.com/Gzeu/mvx-portfolio-manager/issues)
- **Discussions**: [Join community discussions](https://github.com/Gzeu/mvx-portfolio-manager/discussions)

---

<div align="center">
  <p><strong>Built with ❤️ for the MultiversX ecosystem</strong></p>
  <p>Made by <a href="https://github.com/Gzeu">@Gzeu</a> • Licensed under MIT</p>
</div>

🚀 Ready for deployment!
