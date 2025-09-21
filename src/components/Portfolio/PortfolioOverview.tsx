import React, { useEffect } from 'react';
import { usePortfolio } from '../../hooks/usePortfolio';
import { formatCurrency, formatPercentage } from '../../utils/formatting';

interface PortfolioOverviewProps {
  address?: string;
}

const PortfolioOverview: React.FC<PortfolioOverviewProps> = ({ address }) => {
  const { 
    totalValue, 
    totalTokens, 
    dayChange, 
    dayChangePercentage,
    isLoading,
    error,
    refreshPortfolio 
  } = usePortfolio(address);

  useEffect(() => {
    if (address) {
      refreshPortfolio();
    }
  }, [address, refreshPortfolio]);

  if (isLoading) {
    return (
      <div className="portfolio-overview-container">
        <div className="loading-skeleton">
          <div className="skeleton-item large"></div>
          <div className="skeleton-item medium"></div>
          <div className="skeleton-item small"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="portfolio-overview-container error">
        <div className="error-message">
          <h3>Error loading portfolio</h3>
          <p>{error}</p>
          <button onClick={refreshPortfolio} className="retry-button">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const isPositiveChange = dayChange >= 0;

  return (
    <div className="portfolio-overview-container">
      <div className="portfolio-header">
        <h2>Portfolio Overview</h2>
        <button onClick={refreshPortfolio} className="refresh-button">
          <svg width="16" height="16" viewBox="0 0 24 24">
            <path d="M17.65 6.35A7.958 7.958 0 0 0 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08A5.99 5.99 0 0 1 12 18c-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/>
          </svg>
          Refresh
        </button>
      </div>
      
      <div className="portfolio-metrics">
        <div className="metric-card primary">
          <div className="metric-label">Total Portfolio Value</div>
          <div className="metric-value large">
            {formatCurrency(totalValue)}
          </div>
        </div>
        
        <div className="metric-card">
          <div className="metric-label">24h Change</div>
          <div className={`metric-value ${isPositiveChange ? 'positive' : 'negative'}`}>
            {isPositiveChange ? '+' : ''}{formatCurrency(dayChange)}
            <span className="percentage">
              ({isPositiveChange ? '+' : ''}{formatPercentage(dayChangePercentage)})
            </span>
          </div>
        </div>
        
        <div className="metric-card">
          <div className="metric-label">Total Tokens</div>
          <div className="metric-value">
            {totalTokens}
          </div>
        </div>
      </div>
      
      <div className="portfolio-chart-container">
        {/* Chart component will be added here */}
        <div className="chart-placeholder">
          <p>Portfolio performance chart coming soon</p>
        </div>
      </div>
    </div>
  );
};

export default PortfolioOverview;
