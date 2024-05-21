export interface User {
  email: string;
  dateOfPurchase: string;
  username: string;
  adventure_stories_history: string[];
  fantasy_stories_history: string[];
  horror_stories_history: string[];
  language: string;
  parentalPassword?: string;
  phoneNum: string;
  plan: boolean;
  romance_stories_history: string[];
  timeLimit: number;
}