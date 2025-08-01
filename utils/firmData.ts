import { Firm } from '../types/firm';
import fs from 'fs';
import path from 'path';

function mergeSources(firm: Firm, sources: any): Firm {
  if (!sources) return firm;
  
  const mergedFirm = JSON.parse(JSON.stringify(firm)) as Firm;
  
  // Merge top-level sources
  if (sources.platforms && typeof sources.platforms === 'string') {
    mergedFirm.platforms_source = sources.platforms;
  }
  if (sources.funded_amount) {
    mergedFirm.funded_amount_source = sources.funded_amount;
  }
  if (sources.eval_amount) {
    mergedFirm.eval_amount_source = sources.eval_amount;
  }
  if (sources.payout_methods) {
    mergedFirm.payout_methods_source = sources.payout_methods;
  }
  
  if (!sources.purchase_options) return mergedFirm;
  
  for (let i = 0; i < mergedFirm.purchase_options.length; i++) {
    const option = mergedFirm.purchase_options[i];
    const sourceOption = sources.purchase_options?.[i];
    
    if (!sourceOption) continue;
    
    for (let j = 0; j < option.account_sizes.length; j++) {
      const accountSize = option.account_sizes[j];
      const sourceAccountSize = sourceOption.account_sizes?.[j];
      
      if (!sourceAccountSize) continue;
      
      // Merge evaluation rules sources
      if (accountSize.evaluation_rules && sourceAccountSize.evaluation_rules?.sources) {
        accountSize.evaluation_rules.sources = sourceAccountSize.evaluation_rules.sources;
      }
      
      // Merge funded rules sources
      if (accountSize.funded_rules && sourceAccountSize.funded_rules?.sources) {
        accountSize.funded_rules.sources = sourceAccountSize.funded_rules.sources;
        
        // Merge payout rules sources
        if (accountSize.funded_rules.payout_rules && sourceAccountSize.funded_rules.payout_rules?.sources) {
          accountSize.funded_rules.payout_rules.sources = sourceAccountSize.funded_rules.payout_rules.sources;
        }
      }
    }
  }
  
  return mergedFirm;
}

// Create URL-friendly firm names
export function getFirmSlug(firmName: string): string {
  const slugMap: { [key: string]: string } = {
    'General': 'general',
    'Alpha Futures': 'alpha',
    'Apex Trader Funding': 'apex',
    'Day Traders': 'daytraders',
    'FundedNext Futures': 'fundednext',
    'FundingTicks': 'fundticks',
    'Lucid Trading': 'lucid',
    'My Funded Futures': 'mffu',
    'Take Profit Trader': 'tpt',
    'Topstep': 'topstep',
    'Tradeify': 'tradeify',
  };
  
  return slugMap[firmName] || firmName.toLowerCase().replace(/\s+/g, '');
}

// Get firm name from slug
function getFirmNameFromSlug(slug: string): string | null {
  const slugMap: { [key: string]: string } = {
    'general': 'General',
    'alpha': 'Alpha Futures',
    'apex': 'Apex Trader Funding',
    'daytraders': 'Day Traders',
    'fundednext': 'FundedNext Futures',
    'fundticks': 'FundingTicks',
    'lucid': 'Lucid Trading',
    'mffu': 'My Funded Futures',
    'tpt': 'Take Profit Trader',
    'topstep': 'Topstep',
    'tradeify': 'Tradeify',
  };
  
  return slugMap[slug] || null;
}

export function getAllFirms(): Firm[] {
  const firmsDirectory = path.join(process.cwd(), 'firms');
  const firmFiles = fs.readdirSync(firmsDirectory).filter(file => file.endsWith('.json') && !file.includes('_sources'));
  
  const firms: Firm[] = [];
  
  for (const file of firmFiles) {
    try {
      const filePath = path.join(firmsDirectory, file);
      const fileContent = fs.readFileSync(filePath, 'utf8');
      const firmData = JSON.parse(fileContent) as Firm;
      
      // Try to load corresponding sources file
      const sourcesFileName = file.replace('.json', '_sources.json');
      const sourcesFilePath = path.join(firmsDirectory, sourcesFileName);
      
      if (fs.existsSync(sourcesFilePath)) {
        try {
          const sourcesContent = fs.readFileSync(sourcesFilePath, 'utf8');
          const sourcesData = JSON.parse(sourcesContent);
          const mergedFirm = mergeSources(firmData, sourcesData);
          firms.push(mergedFirm);
        } catch (error) {
          console.error(`Error loading sources for ${file}:`, error);
          firms.push(firmData);
        }
      } else {
        firms.push(firmData);
      }
    } catch (error) {
      console.error(`Error loading firm data from ${file}:`, error);
    }
  }
  
  return firms;
}

export function getFirmByName(firmName: string): Firm | null {
  const firms = getAllFirms();
  return firms.find(firm => firm.name === firmName) || null;
}

export function getFirmNames(): string[] {
  const firms = getAllFirms();
  return firms.map(firm => firm.name);
}

export function getFirmSlugs(): string[] {
  const firmNames = getFirmNames();
  return firmNames.map(name => getFirmSlug(name));
}

export function getFirmNameFromSlugHelper(slug: string): string | null {
  return getFirmNameFromSlug(slug);
} 