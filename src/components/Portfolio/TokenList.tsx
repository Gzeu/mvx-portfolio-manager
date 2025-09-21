import React, { useState, useMemo } from 'react';
import { usePortfolio } from '../../hooks/usePortfolio';
import { formatCurrency, formatPercentage } from '../../utils/formatting';

interface Token {
  identifier: string;
  name: string;
  ticker: string;
  balance: string;
  decimals: number;
  valueUsd: number;
  priceUsd: number;
  change24h: number;
  logoUrl?: string;
}

interface TokenListProps {
  address?: string;
}

const TokenList: React.FC<TokenListProps> = ({ address }) => {
  const { tokens, isLoading, error, refreshPortfolio } = usePortfolio(address);
  const [sortBy, setSortBy] = useState<'value' | 'balance' | 'change'>('value');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredAndSortedTokens = useMemo(() => {
    let filtered = tokens?.filter(token => 
      token.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      token.ticker.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

    filtered.sort((a, b) => {
      let aValue, bValue;
      
      switch (sortBy) {
        case 'value':
          aValue = a.valueUsd;
          bValue = b.valueUsd;
          break;
        case 'balance':
          aValue = parseFloat(a.balance) / Math.pow(10, a.decimals);
          bValue = parseFloat(b.balance) / Math.pow(10, b.decimals);
          break;
        case 'change':
          aValue = a.change24h;
          bValue = b.change24h;
          break;
        default:
          aValue = a.valueUsd;
          bValue = b.valueUsd;
      }
      
      return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
    });

    return filtered;
  }, [tokens, searchTerm, sortBy, sortOrder]);

  const handleSort = (newSortBy: 'value' | 'balance' | 'change') => {
    if (sortBy === newSortBy) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(newSortBy);
      setSortOrder('desc');
    }
  };

  if (isLoading) {
    return (
      <div className="token-list-container">
        <div className="token-list-header">
          <h3>Token Holdings</h3>
        </div>
        <div className="loading-skeleton">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="token-skeleton">
              <div className="skeleton-item small circle"></div>
              <div className="skeleton-item medium"></div>
              <div className="skeleton-item large"></div>
              <div className="skeleton-item small"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="token-list-container error">
        <div className="error-message">
          <h3>Error loading tokens</h3>
          <p>{error}</p>
          <button onClick={refreshPortfolio} className="retry-button">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="token-list-container">
      <div className="token-list-header">
        <h3>Token Holdings ({filteredAndSortedTokens.length})</h3>
        <div className="token-controls">
          <div className="search-container">
            <input
              type="text"
              placeholder="Search tokens..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
          <button onClick={refreshPortfolio} className="refresh-button">
            <svg width="16" height="16" viewBox="0 0 24 24">
              <path d="M17.65 6.35A7.958 7.958 0 0 0 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08A5.99 5.99 0 0 1 12 18c-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/>
            </svg>
          </button>
        </div>
      </div>

      {filteredAndSortedTokens.length === 0 ? (
        <div className="empty-state">
          <p>No tokens found</p>
          {searchTerm && (
            <button onClick={() => setSearchTerm('')} className="clear-search-button">
              Clear search
            </button>
          )}
        </div>
      ) : (
        <div className="token-table">
          <div className="token-table-header">
            <div className="token-header-cell token-cell">Token</div>
            <div 
              className={`token-header-cell balance-cell sortable ${sortBy === 'balance' ? 'active' : ''}`}
              onClick={() => handleSort('balance')}
            >
              Balance
              {sortBy === 'balance' && (
                <span className={`sort-arrow ${sortOrder}`}>
                  {sortOrder === 'asc' ? '↑' : '↓'}
                </span>
              )}
            </div>
            <div 
              className={`token-header-cell value-cell sortable ${sortBy === 'value' ? 'active' : ''}`}
              onClick={() => handleSort('value')}
            >
              Value
              {sortBy === 'value' && (
                <span className={`sort-arrow ${sortOrder}`}>
                  {sortOrder === 'asc' ? '↑' : '↓'}
                </span>
              )}
            </div>
            <div 
              className={`token-header-cell change-cell sortable ${sortBy === 'change' ? 'active' : ''}`}
              onClick={() => handleSort('change')}
            >
              24h Change
              {sortBy === 'change' && (
                <span className={`sort-arrow ${sortOrder}`}>
                  {sortOrder === 'asc' ? '↑' : '↓'}
                </span>
              )}
            </div>
          </div>
          
          <div className="token-table-body">
            {filteredAndSortedTokens.map((token) => {
              const balance = parseFloat(token.balance) / Math.pow(10, token.decimals);
              const isPositiveChange = token.change24h >= 0;
              
              return (
                <div key={token.identifier} className="token-row">
                  <div className="token-cell">
                    <div className="token-info">
                      {token.logoUrl ? (
                        <img 
                          src={token.logoUrl} 
                          alt={token.name}
                          className="token-logo"
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display = 'none';
                          }}
                        />
                      ) : (
                        <div className="token-logo-placeholder">
                          {token.ticker.charAt(0)}
                        </div>
                      )}
                      <div className="token-details">
                        <div className="token-name">{token.name}</div>
                        <div className="token-ticker">{token.ticker}</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="balance-cell">
                    <div className="balance-value">
                      {balance.toLocaleString(undefined, {
                        maximumFractionDigits: balance < 1 ? 8 : 2
                      })}
                    </div>
                  </div>
                  
                  <div className="value-cell">
                    <div className="value-amount">{formatCurrency(token.valueUsd)}</div>
                    <div className="token-price">
                      {formatCurrency(token.priceUsd)} per {token.ticker}
                    </div>
                  </div>
                  
                  <div className="change-cell">
                    <div className={`change-value ${isPositiveChange ? 'positive' : 'negative'}`}>
                      {isPositiveChange ? '+' : ''}{formatPercentage(token.change24h)}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default TokenList;
