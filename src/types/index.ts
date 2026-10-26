export type LanguageCode = 'en' | 'ta' | 'hi' | 'te' | 'ml' | 'kn' | 'bn';

export interface LanguageOption {
  code: LanguageCode;
  nativeName: string;
  englishName: string;
  setupLabel: string;
  bcp47Candidates: string[];
  voiceKeywords: string[];
}

export enum RiskLevel {
  HIGH_RISK = 'HIGH_RISK',
  SUSPICIOUS = 'SUSPICIOUS',
  NO_OBVIOUS_SIGNS = 'NO_OBVIOUS_SIGNS',
}

export type EventChannel = 'sms' | 'whatsapp' | 'call';

export type PhoneScreenId =
  | 'lock'
  | 'home'
  | 'messages'
  | 'whatsapp'
  | 'phone'
  | 'contacts'
  | 'camera'
  | 'gallery'
  | 'settings'
  | 'eldershield';

export type WallpaperId = 'misty_dawn' | 'deep_ocean' | 'warm_twilight';

export type ScamCategoryId =
  | 'bank_impersonation'
  | 'otp_pin_theft'
  | 'upi_scam'
  | 'fake_kyc'
  | 'phishing_link'
  | 'parcel_delivery_scam'
  | 'lottery_prize_scam'
  | 'fake_job_offer'
  | 'investment_scam'
  | 'govt_benefit_scam'
  | 'police_legal_threat'
  | 'electricity_threat'
  | 'fake_loan_offer'
  | 'suspicious_app_install'
  | 'remote_access_scam'
  | 'urgent_financial_request'
  | 'ordinary_message';

export type WarningSignId =
  | 'impersonates_bank'
  | 'requests_otp_or_pin'
  | 'suspicious_upi_collect'
  | 'fake_kyc_threat'
  | 'suspicious_link'
  | 'fake_parcel_fee'
  | 'unrealistic_prize_lottery'
  | 'unrealistic_job_income'
  | 'guaranteed_investment_return'
  | 'fake_government_scheme'
  | 'legal_or_police_intimidation'
  | 'tonight_utility_cutoff'
  | 'upfront_loan_fee'
  | 'apk_file_download'
  | 'remote_screen_sharing_app'
  | 'urgent_pressure_tactic'
  | 'unverified_callback_number'
  | 'caller_org_impersonation';

export interface SamplePhoneScenario {
  id: string;
  channel: EventChannel;
  senderName: string;
  phoneNumber: string;
  /**
   * For SMS/WhatsApp: the incoming message text.
   * For Call: the simulated caller claim / spoken pitch or call context.
   */
  content: string;
  /**
   * Optional suspicious highlight snippet if specific to a call claim
   */
  callClaimSummary?: string;
  scenarioLanguage: LanguageCode;
}

export interface ClassificationResult {
  riskLevel: RiskLevel;
  heuristicScore: number;
  category: ScamCategoryId;
  warningSigns: WarningSignId[];
  matchedPhrases: string[];
  /** Short lead sentence, e.g. "This message may be fraudulent." */
  leadWarning: string;
  /** Dynamic explanation of why this specific message/call is suspicious */
  reasonText: string;
  /** Recommended safe action in selected language */
  safetyAdvice: string;
  /** Combined calm text spoken by speech synthesis */
  spokenScript: string;
  /** Honest demo disclaimer */
  cautionNote: string;
  engineType: 'local-rule-engine' | 'external-api';
}

export interface StoredPhoneEvent {
  instanceId: string;
  scenarioId: string;
  channel: EventChannel;
  senderName: string;
  phoneNumber: string;
  content: string;
  receivedAtIso: string;
  read: boolean;
  callOutcome?: 'ringing' | 'answered' | 'declined' | 'missed';
}

export interface ProcessedPhoneEvent extends StoredPhoneEvent {
  classification: ClassificationResult;
}

export type VoicePlaybackState =
  | 'idle'
  | 'speaking'
  | 'muted'
  | 'blocked_autoplay'
  | 'voice_unavailable'
  | 'unsupported_browser'
  | 'error';

export type TextSizeLevel = 'normal' | 'large';

export interface UserPreferences {
  setupCompleted: boolean;
  language: LanguageCode;
  voiceEnabled: boolean;
  ringtoneEnabled: boolean;
  speechRate: number;
  textSize: TextSizeLevel;
  wallpaper: WallpaperId;
}

export interface CapturedPhoto {
  id: string;
  titleKey: 'tea' | 'garden' | 'park' | 'snapshot';
  imageUrl?: string;
  capturedAtIso: string;
}

export interface ClassifierRequest {
  channel: EventChannel;
  senderName: string;
  phoneNumber: string;
  content: string;
  targetLanguage: LanguageCode;
}

export interface IScamClassifierService {
  readonly engineType: 'local-rule-engine' | 'external-api';
  classify(request: ClassifierRequest): Promise<ClassificationResult>;
  classifySync(request: ClassifierRequest): ClassificationResult;
}
