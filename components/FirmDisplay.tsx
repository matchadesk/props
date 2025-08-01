import React from 'react';
import { Firm, EvaluationRules, FundedRules, PayoutRules, AccountSize, PurchaseOption, FAQItem } from '../types/firm';
import Link from 'next/link';
import Image from 'next/image';

interface FirmDisplayProps {
  firm: Firm;
}

const FirmDisplay: React.FC<FirmDisplayProps> = ({ firm }) => {
  const getFirmLogo = (firmName: string) => {
    const logoMap: { [key: string]: string } = {
      'Apex Trader Funding': '/logos/apex.png',
      'Day Traders': '/logos/daytraders.png',
      'FundedNext Futures': '/logos/fundednext.png',
      'FundingTicks': '/logos/fundticks.png',
      'Lucid Trading': '/logos/lucid.png',
      'My Funded Futures': '/logos/mffu.png',
      'Topstep': '/logos/topstep.png',
      'Take Profit Trader': '/logos/tpt.png',
      'Tradeify': '/logos/tradeify.png',
      'Alpha Futures': '/logos/alpha.png',
    };
    return logoMap[firmName] || null;
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatAccountSize = (size: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(size);
  };

  const renderClickableLabel = (label: string, source?: string | null) => {
    if (source) {
      return (
        <a 
          href={source} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-gray-600 cursor-pointer border-b border-gray-400 border-opacity-30 hover:border-opacity-50"
        >
          {label}
        </a>
      );
    }
    return <span className="text-gray-600">{label}</span>;
  };

  const renderValue = (value: any, formatFn?: (val: any) => string | React.ReactNode) => {
    if (value === null || value === undefined || value === '') {
      return (
        <div className="flex items-center text-red-500 justify-end">
          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
          <span className="text-sm">None</span>
        </div>
      );
    }
    
    if (formatFn) {
      const formatted = formatFn(value);
      if (typeof formatted === 'string') {
        return <span className="font-medium text-gray-900 break-words">{formatted}</span>;
      }
      return formatted;
    }
    
    return <span className="font-medium text-gray-900 break-words">{value}</span>;
  };

  const renderEvaluationRules = (rules: EvaluationRules) => (
    <div className="space-y-2 text-sm">
      <div className="flex justify-between items-start">
        <span className="text-gray-600 flex-shrink-0 mr-2">{renderClickableLabel("Profit Target:", rules.sources?.profit_target)}</span>
        <div className="text-right flex-1">{renderValue(rules.profit_target, (val: number) => formatCurrency(val))}</div>
      </div>
      <div className="flex justify-between items-start">
        <span className="text-gray-600 flex-shrink-0 mr-2">{renderClickableLabel("Max Drawdown:", rules.sources?.max_drawdown)}</span>
        <div className="text-right flex-1">{renderValue(rules.max_drawdown, (val: number) => formatCurrency(val))}</div>
      </div>
      <div className="flex justify-between items-start">
        <span className="text-gray-600 flex-shrink-0 mr-2">{renderClickableLabel("Drawdown Mode:", rules.sources?.drawdown_mode)}</span>
        <div className="text-right flex-1">{renderValue(rules.drawdown_mode, (val: string) => val?.replace('_', ' ').replace(/\b\w/g, (l: string) => l.toUpperCase()))}</div>
      </div>
      <div className="flex justify-between items-start">
        <span className="text-gray-600 flex-shrink-0 mr-2">{renderClickableLabel("Daily Drawdown:", rules.sources?.daily_drawdown)}</span>
        <div className="text-right flex-1">{renderValue(rules.daily_drawdown, (val: number | string) => {
          if (typeof val === 'string') return val;
          if (typeof val === 'number') return formatCurrency(val);
          return val;
        })}</div>
      </div>
      <div className="flex justify-between items-start">
        <span className="text-gray-600 flex-shrink-0 mr-2">{renderClickableLabel("Max Position:", rules.sources?.max_position)}</span>
        <div className="text-right flex-1">{renderValue(rules.max_position, (val: number) => `${val} contracts`)}</div>
      </div>
      <div className="flex justify-between items-start">
        <span className="text-gray-600 flex-shrink-0 mr-2">{renderClickableLabel("Micro Scaling:", rules.sources?.micro_scaling)}</span>
        <div className="text-right flex-1">{renderValue(rules.micro_scaling)}</div>
      </div>
      <div className="flex justify-between items-start">
        <span className="text-gray-600 flex-shrink-0 mr-2">{renderClickableLabel("Consistency Rule:", rules.sources?.consistency_rule)}</span>
        <div className="text-right flex-1">{renderValue(rules.consistency_rule, (val: number) => `${val}%`)}</div>
      </div>
      {rules.scaling_rule && rules.scaling_rule.length > 50 ? (
        <div className="flex flex-col">
          <span className="text-gray-600 mb-1">{renderClickableLabel("Scaling Rule:", rules.sources?.scaling_rule)}</span>
          <div className="pl-2">{renderValue(rules.scaling_rule, (val: string) => (<span className="text-sm leading-relaxed text-gray-900">{val}</span>))}</div>
        </div>
      ) : (
        <div className="flex justify-between items-start">
          <span className="text-gray-600 flex-shrink-0 mr-2">{renderClickableLabel("Scaling Rule:", rules.sources?.scaling_rule)}</span>
          <div className="text-right flex-1">{renderValue(rules.scaling_rule, (val: string) => (<span className="text-sm text-gray-900">{val}</span>))}</div>
        </div>
      )}
      {rules.reset_cost && (
        <div className="flex justify-between items-start">
          <span className="text-gray-600 flex-shrink-0 mr-2">{renderClickableLabel("Reset Cost:", rules.sources?.reset_cost)}</span>
          <div className="text-right flex-1">{renderValue(rules.reset_cost, (val: number | string) => typeof val === 'number' ? formatCurrency(val) : val)}</div>
        </div>
      )}
      {rules.trading_hours && (
        <div className="flex justify-between items-start">
          <span className="text-gray-600 flex-shrink-0 mr-2">{renderClickableLabel("Trading Hours:", rules.sources?.trading_hours)}</span>
          <div className="text-right flex-1">{renderValue(rules.trading_hours)}</div>
        </div>
      )}
    </div>
  );

  const renderFundedRules = (rules: FundedRules, fundedAccountName?: string) => (
    <div className="space-y-2 text-sm">
      <div className="flex justify-between items-start">
        <span className="text-gray-600 flex-shrink-0 mr-2">{renderClickableLabel("Max Drawdown:", rules.sources?.max_drawdown)}</span>
        <div className="text-right flex-1">{renderValue(rules.max_drawdown, (val: number) => formatCurrency(val))}</div>
      </div>
      <div className="flex justify-between items-start">
        <span className="text-gray-600 flex-shrink-0 mr-2">{renderClickableLabel("Daily Drawdown:", rules.sources?.daily_drawdown)}</span>
        <div className="text-right flex-1">{renderValue(rules.daily_drawdown, (val: number | string) => {
          if (typeof val === 'string') return val;
          if (typeof val === 'number') return formatCurrency(val);
          return val;
        })}</div>
      </div>
      <div className="flex justify-between items-start">
        <span className="text-gray-600 flex-shrink-0 mr-2">{renderClickableLabel("Drawdown Mode:", rules.sources?.drawdown_mode)}</span>
        <div className="text-right flex-1">{renderValue(rules.drawdown_mode, (val: string) => val?.replace('_', ' ').replace(/\b\w/g, (l: string) => l.toUpperCase()))}</div>
      </div>
      <div className="flex justify-between items-start">
        <span className="text-gray-600 flex-shrink-0 mr-2">{renderClickableLabel("Profit Target:", rules.sources?.profit_target)}</span>
        <div className="text-right flex-1">{renderValue(rules.profit_target, (val: number) => formatCurrency(val))}</div>
      </div>
      <div className="flex justify-between items-start">
        <span className="text-gray-600 flex-shrink-0 mr-2">{renderClickableLabel("Max Position:", rules.sources?.max_position)}</span>
        <div className="text-right flex-1">{renderValue(rules.max_position, (val: number) => `${val} contracts`)}</div>
      </div>
      <div className="flex justify-between items-start">
        <span className="text-gray-600 flex-shrink-0 mr-2">{renderClickableLabel("Micro Scaling:", rules.sources?.micro_scaling)}</span>
        <div className="text-right flex-1">{renderValue(rules.micro_scaling)}</div>
      </div>
      <div className="flex justify-between items-start">
        <span className="text-gray-600 flex-shrink-0 mr-2">{renderClickableLabel("Consistency Rule:", rules.sources?.consistency_rule)}</span>
        <div className="text-right flex-1">{renderValue(rules.consistency_rule, (val: number) => `${val}%`)}</div>
      </div>
      {rules.scaling_rule && rules.scaling_rule.length > 50 ? (
        <div className="flex flex-col">
          <span className="text-gray-600 mb-1">{renderClickableLabel("Scaling Rule:", rules.sources?.scaling_rule)}</span>
          <div className="pl-2">{renderValue(rules.scaling_rule, (val: string) => (<span className="text-sm leading-relaxed text-gray-900">{val}</span>))}</div>
        </div>
      ) : (
        <div className="flex justify-between items-start">
          <span className="text-gray-600 flex-shrink-0 mr-2">{renderClickableLabel("Scaling Rule:", rules.sources?.scaling_rule)}</span>
          <div className="text-right flex-1">{renderValue(rules.scaling_rule, (val: string) => (<span className="text-sm text-gray-900">{val}</span>))}</div>
        </div>
      )}
      {rules.reset_cost && (
        <div className="flex justify-between items-start">
          <span className="text-gray-600 flex-shrink-0 mr-2">{renderClickableLabel("Reset Cost:", rules.sources?.reset_cost)}</span>
          <div className="text-right flex-1">{renderValue(rules.reset_cost, (val: number | string) => typeof val === 'number' ? formatCurrency(val) : val)}</div>
        </div>
      )}
      {rules.trading_hours && (
        <div className="flex justify-between items-start">
          <span className="text-gray-600 flex-shrink-0 mr-2">{renderClickableLabel("Trading Hours:", rules.sources?.trading_hours)}</span>
          <div className="text-right flex-1">{renderValue(rules.trading_hours)}</div>
        </div>
      )}
    </div>
  );

  const renderPayoutRules = (rules: PayoutRules) => (
    <div className="space-y-2 text-sm">
      <div className="flex justify-between items-start">
        <span className="text-gray-600 flex-shrink-0 mr-2">{renderClickableLabel("Minimum Days:", rules.sources?.minimum_days)}</span>
        <div className="text-right flex-1">{renderValue(rules.minimum_days)}</div>
      </div>
      <div className="flex justify-between items-start">
        <span className="text-gray-600 flex-shrink-0 mr-2">{renderClickableLabel("Min Profit/Day:", rules.sources?.minimum_profit_per_day)}</span>
        <div className="text-right flex-1">{renderValue(rules.minimum_profit_per_day, (val: number) => formatCurrency(val))}</div>
      </div>
      <div className="flex justify-between items-start">
        <span className="text-gray-600 flex-shrink-0 mr-2">{renderClickableLabel("Minimum Payout:", rules.sources?.minimum_payout)}</span>
        <div className="text-right flex-1">{renderValue(rules.minimum_payout, (val: number) => formatCurrency(val))}</div>
      </div>
      <div className="flex justify-between items-start">
        <span className="text-gray-600 flex-shrink-0 mr-2">{renderClickableLabel("Maximum Payout:", rules.sources?.maximum_payout)}</span>
        <div className="text-right flex-1">{renderValue(rules.maximum_payout, (val: number) => formatCurrency(val))}</div>
      </div>
      <div className="flex justify-between items-start">
        <span className="text-gray-600 flex-shrink-0 mr-2">{renderClickableLabel("Payout Split:", rules.sources?.payout_split)}</span>
        <div className="text-right flex-1">{renderValue(rules.payout_split, (val: number) => `${val}%`)}</div>
      </div>
    </div>
  );

  const renderAccountSize = (accountSize: AccountSize, fundedAccountName?: string) => (
    <div key={accountSize.size} className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200 w-full max-w-[400px] flex-shrink-0">
      <div className="flex justify-between items-center mb-4">
        <h4 className="text-lg font-semibold text-gray-900">
          {formatAccountSize(accountSize.size)} Account
        </h4>
        <div className="text-right">
          <div className="text-lg font-bold text-blue-600">
            {formatCurrency(accountSize.price.amount)}
          </div>
          <div className="text-sm text-gray-600 capitalize">
            {accountSize.price.type.replace('_', ' ')}
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {/* Evaluation Rules */}
        {accountSize.evaluation_rules && (
          <div>
            <h5 className="font-medium text-gray-900 mb-2 flex items-center">
              <div className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></div>
              Evaluation Rules
            </h5>
            <div className="bg-gray-50 rounded p-3 border-l-4 border-yellow-500">
              {renderEvaluationRules(accountSize.evaluation_rules)}
            </div>
          </div>
        )}

        {/* Funded Rules */}
        {accountSize.funded_rules && (
          <div>
            {/* Funded Account Header */}
            {fundedAccountName && (
              <div className="flex justify-between items-center mb-4">
                <h5 className="font-medium text-gray-900 flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  {fundedAccountName} Account Rules
                </h5>
                <div className="flex items-center space-x-2">
                  <span className="px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-800 border border-green-200">
                    Funded
                  </span>
                  <div className="text-right">
                    <div className="text-lg font-medium text-gray-900">
                      {accountSize.funded_rules.activation_fee ? formatCurrency(accountSize.funded_rules.activation_fee) : 'No fee'}
                    </div>
                    <div className="text-xs text-gray-600">
                      {accountSize.funded_rules.activation_fee ? 'one-time' : ''}
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            <div className="bg-gray-50 rounded p-3 border-l-4 border-green-500">
              {renderFundedRules(accountSize.funded_rules, fundedAccountName)}
            </div>
          </div>
        )}

        {/* Payout Rules (if separate from funded rules) */}
        {accountSize.funded_rules?.payout_rules && (
          <div>
            <h5 className="font-medium text-gray-900 mb-2 flex items-center">
              <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
              Payout Rules
            </h5>
            <div className="bg-gray-50 rounded p-3 border-l-4 border-blue-500">
              {renderPayoutRules(accountSize.funded_rules.payout_rules)}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const renderFAQItem = (faqItem: FAQItem, index: number) => (
    <div key={index} className="border-b border-gray-200 last:border-b-0">
      <div className="py-4">
        <h4 className="text-lg font-medium text-gray-900 mb-2">{faqItem.question}</h4>
        <div className="text-gray-700 leading-relaxed">
          {faqItem.answer}
          {faqItem.source && (
            <div className="mt-2">
              <a 
                href={faqItem.source} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 text-sm inline-flex items-center"
              >
                Learn more
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderPlatformsSection = () => {
    if (!firm.platforms || firm.platforms.length === 0) return null;
    
    return (
      <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
          <svg className="w-6 h-6 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          Trading Platforms & Account Limits
        </h3>
        <div className="space-y-4">
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-2 flex items-center">
              <span className="mr-2">Supported Platforms</span>
              {firm.platforms && firm.platforms.length > 0 && (
                <a 
                  href={firm.platforms_source || "#"} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 text-sm inline-flex items-center"
                >
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              )}
            </h4>
            <div className="flex flex-wrap gap-2">
              {firm.platforms.map((platform, index) => (
                <span 
                  key={index}
                  className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium border border-blue-200"
                >
                  {platform}
                </span>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="text-sm font-semibold text-gray-700 mb-1 flex items-center">
                <span className="mr-2">Max Funded Accounts</span>
                {firm.funded_amount_source && (
                  <a 
                    href={firm.funded_amount_source} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 text-sm inline-flex items-center"
                  >
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                )}
              </h4>
              <p className="text-lg font-bold text-gray-900">{firm.funded_amount}</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="text-sm font-semibold text-gray-700 mb-1 flex items-center">
                <span className="mr-2">Max Evaluation Accounts</span>
                {firm.eval_amount_source && (
                  <a 
                    href={firm.eval_amount_source} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 text-sm inline-flex items-center"
                  >
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                )}
              </h4>
              <p className="text-lg font-bold text-gray-900">{firm.eval_amount}</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderSupportSection = () => {
    if (!firm.support_options) return null;
    
    return (
      <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
          <svg className="w-6 h-6 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
          Support & Contact Options
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {firm.support_options.help_center && (
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="text-sm font-semibold text-gray-700 mb-1">Help Center</h4>
              <a 
                href={firm.support_options.help_center} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 text-sm inline-flex items-center"
              >
                Visit Help Center
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          )}
          {firm.support_options.email && (
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="text-sm font-semibold text-gray-700 mb-1">Email Support</h4>
              <a 
                href={`mailto:${firm.support_options.email}`}
                className="text-blue-600 hover:text-blue-800 text-sm"
              >
                {firm.support_options.email}
              </a>
            </div>
          )}
          {firm.support_options.phone && (
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="text-sm font-semibold text-gray-700 mb-1">Phone Support</h4>
              <span className="text-sm text-gray-900">{firm.support_options.phone}</span>
            </div>
          )}
          {firm.support_options.discord && (
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="text-sm font-semibold text-gray-700 mb-1">Discord Community</h4>
              <a 
                href={firm.support_options.discord} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 text-sm inline-flex items-center"
              >
                Join Discord
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          )}
          {firm.support_options.live_chat && (
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="text-sm font-semibold text-gray-700 mb-1">Live Chat</h4>
              <span className="text-sm text-gray-900">{firm.support_options.live_chat}</span>
            </div>
          )}
          {firm.support_options.other && (
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="text-sm font-semibold text-gray-700 mb-1">Other Options</h4>
              <span className="text-sm text-gray-900">{firm.support_options.other}</span>
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderPayoutMethodsSection = () => {
    if (!firm.payout_methods || firm.payout_methods.length === 0) return null;
    
    return (
      <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
          <svg className="w-6 h-6 mr-2 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
          </svg>
          Payout Methods
        </h3>
        <div className="space-y-3">
          <div className="flex flex-wrap gap-2">
            {firm.payout_methods.map((method, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium border border-purple-200"
              >
                {method}
              </span>
            ))}
          </div>
          {firm.payout_methods_source && (
            <div className="mt-3">
              <a
                href={firm.payout_methods_source}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 text-sm inline-flex items-center"
              >
                View Payout Details
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderFAQSection = () => {
    if (!firm.faq || firm.faq.length === 0) return null;
    
    return (
      <div className={`rounded-lg p-6 border shadow-sm ${
        firm.name === "General" 
          ? "bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200" 
          : "bg-white border-gray-200"
      }`}>
        <h3 className={`text-xl font-bold mb-6 flex items-center ${
          firm.name === "General" 
            ? "text-blue-800" 
            : "text-gray-900"
        }`}>
          <svg className={`w-6 h-6 mr-2 ${
            firm.name === "General" 
              ? "text-blue-600" 
              : "text-blue-600"
          }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {firm.name === "General" ? "General Questions" : "Frequently Asked Questions"}
        </h3>
        <div className="space-y-0">
          {firm.faq.map((faqItem, index) => renderFAQItem(faqItem, index))}
        </div>
      </div>
    );
  };

  const renderPurchaseOption = (option: PurchaseOption) => {
    const fundedAccountName = option.name.includes('Full Account') ? 'PA' : 'Funded';
    
    return (
      <div key={option.name} className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-gray-900">{option.name}</h3>
          <span className={`px-3 py-1 rounded text-sm font-medium ${
            option.type === 'evaluation' ? 'bg-yellow-100 text-yellow-800 border border-yellow-200' :
            option.type === 'funded' ? 'bg-green-100 text-green-800 border border-green-200' :
            'bg-blue-100 text-blue-800 border border-blue-200'
          }`}>
            {option.type.charAt(0).toUpperCase() + option.type.slice(1)}
          </span>
        </div>
        
        <div className="overflow-x-auto">
          <div className="flex gap-4" style={{ minWidth: `${option.account_sizes.length * 420}px` }}>
            {option.account_sizes.map((accountSize) => renderAccountSize(accountSize, fundedAccountName))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-900 p-4">
      <div className="max-w-[1310px] mx-auto">
        <div className="mb-8">
          <div className="flex items-center">
            {firm.name !== "General" && getFirmLogo(firm.name) && (
              <div className="w-16 h-16 mr-4 flex-shrink-0">
                <Image
                  src={getFirmLogo(firm.name)!}
                  alt={`${firm.name} logo`}
                  width={64}
                  height={64}
                  className="w-full h-full object-contain"
                />
              </div>
            )}
            <div className="flex-1">
              <h1 className={`text-3xl font-bold mt-4 ${
                firm.name === "General" 
                  ? "text-blue-400 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent" 
                  : "text-white"
              }`}>
                {firm.name === "General" ? "General FAQ" : firm.name}
              </h1>
              {firm.name === "General" && (
                <p className="text-gray-300 mt-2 text-lg">
                  Common questions and comparisons across all prop trading firms
                </p>
              )}
            </div>
          </div>
        </div>
        
        <div className="space-y-6">
          {firm.name !== "General" && renderPlatformsSection()}
          {firm.name !== "General" && renderSupportSection()}
          {firm.name !== "General" && renderPayoutMethodsSection()}
          {firm.purchase_options.map(renderPurchaseOption)}
          {renderFAQSection()}
        </div>
      </div>
    </div>
  );
};

export default FirmDisplay; 