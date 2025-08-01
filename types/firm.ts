// New simplified data structure focusing on purchase options and account-specific rules

export interface PayoutRules {
  minimum_days: number | null;
  minimum_profit_per_day: number | null;
  minimum_payout: number | null;
  maximum_payout: number | null;
  payout_split: number | null; // e.g., 100 for 100%, 70 for 70/30 split
  sources?: {
    minimum_days?: string | null;
    minimum_profit_per_day?: string | null;
    minimum_payout?: string | null;
    maximum_payout?: string | null;
    payout_split?: string | null;
  };
}

export interface EvaluationRules {
  profit_target: number | null;
  max_drawdown: number;
  drawdown_mode: "end_of_day" | "intraday" | "static" | null;
  daily_drawdown: number | string | null;
  max_position: number;
  micro_scaling: string | null;
  consistency_rule: number | null;
  scaling_rule: string | null;
  reset_cost: number | string | null;
  price: number | null;
  minimum_days: number | null;
  trading_hours: string | null;
  sources?: {
    profit_target?: string | null;
    max_drawdown?: string | null;
    drawdown_mode?: string | null;
    daily_drawdown?: string | null;
    max_position?: string | null;
    micro_scaling?: string | null;
    consistency_rule?: string | null;
    scaling_rule?: string | null;
    reset_cost?: string | null;
    price?: string | null;
    minimum_days?: string | null;
    trading_hours?: string | null;
  };
}

export interface FundedRules {
  max_drawdown: number;
  drawdown_mode: "end_of_day" | "intraday" | "static";
  profit_target: number;
  daily_drawdown: number | string | null;
  max_position: number;
  micro_scaling: string | null;
  consistency_rule: number | null;
  scaling_rule: string | null;
  activation_fee: number | null;
  reset_cost: number | string | null;
  trading_hours: string | null;
  payout_rules: PayoutRules;
  sources?: {
    max_drawdown?: string | null;
    drawdown_mode?: string | null;
    profit_target?: string | null;
    daily_drawdown?: string | null;
    max_position?: string | null;
    micro_scaling?: string | null;
    consistency_rule?: string | null;
    scaling_rule?: string | null;
    activation_fee?: string | null;
    reset_cost?: string | null;
    trading_hours?: string | null;
  };
}

export interface AccountSize {
  size: number; // e.g., 50000 for $50k
  price: {
    amount: number;
    type: "monthly" | "one_time";
  };
  evaluation_rules?: EvaluationRules;
  funded_rules?: FundedRules;
}

export interface PurchaseOption {
  name: string; // e.g., "Scale", "Pro"
  type: "evaluation" | "funded" | "general";
  account_sizes: AccountSize[];
}

export interface FAQItem {
  question: string;
  answer: string;
  source?: string;
}

export interface Firm {
  name: string;
  purchase_options: PurchaseOption[];
  platforms: string[];
  funded_amount: string | number;
  eval_amount: string | number;
  platforms_source?: string;
  funded_amount_source?: string;
  eval_amount_source?: string;
  support_options: {
    help_center?: string;
    email?: string;
    phone?: string;
    discord?: string;
    live_chat?: string;
    other?: string;
  };
  payout_methods?: string[];
  payout_methods_source?: string;
  faq?: FAQItem[];
} 