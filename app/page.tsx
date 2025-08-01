import { getFirmNames, getFirmSlug } from '../utils/firmData';
import Link from 'next/link';
import Image from 'next/image';

export default function HomePage() {
  const firmNames = getFirmNames();

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

  return (
    <div className="min-h-screen bg-gray-900 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            Prop Trading Firms
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Compare trading firms, programs, and find the best fit for your trading style
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {firmNames.map((firmName) => {
            const logoPath = getFirmLogo(firmName);
            const isGeneral = firmName === "General";
            
            return (
              <Link
                key={firmName}
                href={`/firm/${getFirmSlug(firmName)}/`}
                className="block group"
              >
                <div className={`rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border-2 ${
                  isGeneral 
                    ? 'bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200 hover:border-blue-400' 
                    : 'bg-white border-gray-200 hover:border-blue-400'
                }`}>
                  <div className="flex items-center mb-4">
                    {logoPath && !isGeneral ? (
                      <div className="w-12 h-12 mr-4 flex-shrink-0">
                        <Image
                          src={logoPath}
                          alt={`${firmName} logo`}
                          width={48}
                          height={48}
                          className="w-full h-full object-contain"
                        />
                      </div>
                    ) : isGeneral ? (
                      <div className="w-12 h-12 mr-4 flex-shrink-0 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                    ) : (
                      <div className="w-12 h-12 mr-4 flex-shrink-0 bg-gray-200 rounded-lg flex items-center justify-center">
                        <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                      </div>
                    )}
                    <div className="flex-1">
                      <h3 className={`text-lg font-semibold transition-colors duration-200 ${
                        isGeneral 
                          ? 'text-blue-800 group-hover:text-blue-900' 
                          : 'text-gray-900 group-hover:text-blue-600'
                      }`}>
                        {isGeneral ? "General FAQ" : firmName}
                      </h3>
                    </div>
                  </div>
                  <p className={`text-sm ${
                    isGeneral ? 'text-blue-700' : 'text-gray-600'
                  }`}>
                    {isGeneral 
                      ? "Compare firms and find answers to common questions"
                      : "View programs, rules, and detailed information"
                    }
                  </p>
                  <div className="mt-4 flex items-center text-xs text-gray-500">
                    <span className="inline-flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                      View Details
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {firmNames.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">
              No firms found. Add firm data files to the firms directory.
            </p>
          </div>
        )}
      </div>
    </div>
  );
} 