import {
  LanguageCode,
  LanguageOption,
  ScamCategoryId,
  WarningSignId,
} from '../types';

export const LANGUAGE_OPTIONS: LanguageOption[] = [
  {
    code: 'en',
    nativeName: 'English',
    englishName: 'English',
    setupLabel: 'English',
    bcp47Candidates: ['en-IN', 'en-GB', 'en-US', 'en'],
    voiceKeywords: ['english', 'india', 'rishi', 'veena', 'heera', 'ravi'],
  },
  {
    code: 'ta',
    nativeName: 'தமிழ்',
    englishName: 'Tamil',
    setupLabel: 'தமிழ் — Tamil',
    bcp47Candidates: ['ta-IN', 'ta-LK', 'ta-SG', 'ta-MY', 'ta'],
    voiceKeywords: ['tamil', 'தமிழ்', 'valluvar', 'pallavi'],
  },
  {
    code: 'hi',
    nativeName: 'हिन्दी',
    englishName: 'Hindi',
    setupLabel: 'हिन्दी — Hindi',
    bcp47Candidates: ['hi-IN', 'hi'],
    voiceKeywords: ['hindi', 'हिन्दी', 'हिंदी', 'lekha', 'madhur', 'swara', 'kalpana', 'hemant'],
  },
  {
    code: 'te',
    nativeName: 'తెలుగు',
    englishName: 'Telugu',
    setupLabel: 'తెలుగు — Telugu',
    bcp47Candidates: ['te-IN', 'te'],
    voiceKeywords: ['telugu', 'తెలుగు', 'shruti', 'mohan'],
  },
  {
    code: 'ml',
    nativeName: 'മലയാളം',
    englishName: 'Malayalam',
    setupLabel: 'മലയാളം — Malayalam',
    bcp47Candidates: ['ml-IN', 'ml'],
    voiceKeywords: ['malayalam', 'മലയാളം', 'sobhana', 'midhun'],
  },
  {
    code: 'kn',
    nativeName: 'ಕನ್ನಡ',
    englishName: 'Kannada',
    setupLabel: 'ಕನ್ನಡ — Kannada',
    bcp47Candidates: ['kn-IN', 'kn'],
    voiceKeywords: ['kannada', 'ಕನ್ನಡ', 'sapna', 'gagan'],
  },
  {
    code: 'bn',
    nativeName: 'বাংলা',
    englishName: 'Bengali',
    setupLabel: 'বাংলা — Bengali',
    bcp47Candidates: ['bn-IN', 'bn-BD', 'bn'],
    voiceKeywords: ['bengali', 'bangla', 'বাংলা', 'tanishaa', 'bashkar'],
  },
];

export interface PhoneTranslations {
  // Initial Setup Screen inside Phone
  setupTitle: string;
  setupSubtitle: string;
  setupChooseLanguage: string;
  setupStartBtn: string;

  // Simulation Disclaimer (Section 11)
  demoDisclaimer: string;

  // Lock Screen & Home Screen
  lockScreenStatus: string;
  tapToUnlock: string;
  noNewNotifications: string;
  shieldWidgetActive: string;
  shieldWidgetPaused: string;
  shieldWidgetSubtitle: string;
  folderSafetyTools: string;

  // App Labels
  appPhone: string;
  appMessages: string;
  appWhatsApp: string;
  appContacts: string;
  appSettings: string;
  appCamera: string;
  appGallery: string;
  appElderShield: string;

  // Notification Shade & Quick Settings
  quickSettingsTitle: string;
  tileWifi: string;
  tileAutoSim: string;
  tileVoice: string;
  tileRingtone: string;
  tileLargeText: string;
  tileLockPhone: string;
  stateOn: string;
  stateOff: string;
  stateActive: string;
  statePaused: string;
  notificationsHeader: string;
  clearNotificationsBtn: string;
  nowTimestamp: string;

  // Android Navigation Bar & Recents
  navBack: string;
  navHome: string;
  navRecents: string;
  recentsEmpty: string;
  closeAllAppsBtn: string;

  // Full-Screen ElderShield Scam Alert (Section 5)
  scamWarningTitle: string;
  suspiciousNoticeTitle: string;
  msgFraudulentLead: string;
  callFraudulentLead: string;
  reasonPrefix: string;
  suspiciousRequestLabel: string;
  safetyAdvicePrefix: string;
  demoAssessmentNote: string;
  btnIUnderstand: string;
  btnViewMessageDetails: string;
  btnViewCallDetails: string;
  btnDismissAlert: string;

  // Voice Narration Controls & Status
  voicePlayingStatus: string;
  voiceReadyStatus: string;
  voiceMutedStatus: string;
  voiceAutoplayPrompt: string;
  enableVoiceTapBtn: string;
  voiceUnavailableStatus: string;
  voiceUnsupportedStatus: string;
  replayVoiceBtn: string;
  muteVoiceBtn: string;
  unmuteVoiceBtn: string;

  // Incoming & Active Call Screen (Section 7)
  incomingCallLabel: string;
  callConnectedLabel: string;
  callEndedLabel: string;
  answerCallBtn: string;
  declineCallBtn: string;
  endCallBtn: string;
  ringtoneOnLabel: string;
  ringtoneMutedLabel: string;
  suspiciousCallBannerTitle: string;
  ordinaryCallNeutralNote: string;
  openFullWarningBtn: string;

  // Messages & WhatsApp Apps
  messagesEmpty: string;
  whatsappSimSubtitle: string;
  whatsappEmpty: string;
  viewScamWarningBtn: string;
  quickReplyVerify: string;
  quickReplyThanks: string;
  youSenderLabel: string;

  // Phone Dialer, Contacts, Camera, Gallery, ElderShield History
  tabRecents: string;
  tabContacts: string;
  tabKeypad: string;
  callActionBtn: string;
  messageActionBtn: string;
  dialBtn: string;
  noRecentCalls: string;
  contactRoleSon: string;
  contactRoleDaughter: string;
  contactRoleDoctor: string;
  contactRoleBankHelpline: string;
  contactRoleCyberHelpline: string;
  cameraSimulatedNote: string;
  cameraCaptureBtn: string;
  cameraSavedToast: string;
  galleryPhotoTea: string;
  galleryPhotoGarden: string;
  galleryPhotoPark: string;
  galleryPhotoSnapshot: string;
  elderShieldCenterDesc: string;
  flaggedEventsHeader: string;
  allEventsHeader: string;

  // Settings App
  settingsLanguageSection: string;
  settingsSimulationSection: string;
  settingsAutoSimDesc: string;
  pauseSimBtn: string;
  resumeSimBtn: string;
  sendNextEventBtn: string;
  restartSimBtn: string;
  settingsVoiceSection: string;
  speechSpeedLabel: string;
  speedSlow: string;
  speedCalm: string;
  speedNormal: string;
  testVoiceBtn: string;
  testVoiceSample: string;
  settingsDisplaySection: string;
  largeTextToggleLabel: string;
  wallpaperLabel: string;
  wallpaperDawn: string;
  wallpaperOcean: string;
  wallpaperTwilight: string;
  resetSetupBtn: string;
  confirmResetPrompt: string;
  confirmYesBtn: string;
  cancelBtn: string;

  // Risk Levels
  riskHigh: string;
  riskSuspicious: string;
  riskNoObvious: string;

  // Scam Categories
  categories: Record<ScamCategoryId, string>;

  // Dynamic Reason Clauses per WarningSignId
  warningSignReasons: Record<WarningSignId, string>;

  // Recommended Safety Advice per ScamCategoryId
  safetyAdviceByCategory: Record<ScamCategoryId, string>;

  // Ordinary Message Caution
  ordinaryMessageNote: string;
}

const en: PhoneTranslations = {
  setupTitle: 'ElderShield Protection',
  setupSubtitle: 'Select your preferred language once. Your virtual phone will automatically detect and read scam warnings aloud.',
  setupChooseLanguage: 'Select Language',
  setupStartBtn: 'Start',

  demoDisclaimer:
    'Demo mode: This phone uses fictional messages and simulated calls. It does not monitor real SMS, WhatsApp, or phone calls.',

  lockScreenStatus: 'ElderShield Active',
  tapToUnlock: 'Tap to unlock phone',
  noNewNotifications: 'No new notifications yet. Simulated events will arrive automatically.',
  shieldWidgetActive: 'ElderShield Active',
  shieldWidgetPaused: 'Simulation Paused',
  shieldWidgetSubtitle: 'Automatic SMS, WhatsApp & Call scam check',
  folderSafetyTools: 'Safety & Tools',

  appPhone: 'Phone',
  appMessages: 'Messages',
  appWhatsApp: 'WhatsApp',
  appContacts: 'Contacts',
  appSettings: 'Settings',
  appCamera: 'Camera',
  appGallery: 'Gallery',
  appElderShield: 'ElderShield',

  quickSettingsTitle: 'Quick Settings',
  tileWifi: 'Wi-Fi',
  tileAutoSim: 'Simulation',
  tileVoice: 'Voice Alert',
  tileRingtone: 'Ringtone',
  tileLargeText: 'Large Text',
  tileLockPhone: 'Lock Screen',
  stateOn: 'On',
  stateOff: 'Off',
  stateActive: 'Active',
  statePaused: 'Paused',
  notificationsHeader: 'Notifications',
  clearNotificationsBtn: 'Clear all',
  nowTimestamp: 'Now',

  navBack: 'Back',
  navHome: 'Home',
  navRecents: 'Recent apps',
  recentsEmpty: 'No open apps right now',
  closeAllAppsBtn: 'Return to Home',

  scamWarningTitle: 'SCAM WARNING',
  suspiciousNoticeTitle: 'SUSPICIOUS ALERT',
  msgFraudulentLead: 'This message may be fraudulent.',
  callFraudulentLead: 'This caller may be impersonating a trusted organization.',
  reasonPrefix: 'Reason:',
  suspiciousRequestLabel: 'Suspicious content detected:',
  safetyAdvicePrefix: 'Safety advice:',
  demoAssessmentNote:
    'Demo risk assessment only — not a guarantee. Even messages without obvious signs can be deceptive.',
  btnIUnderstand: 'I Understand',
  btnViewMessageDetails: 'View Message Details',
  btnViewCallDetails: 'View Call Details',
  btnDismissAlert: 'Dismiss Alert',

  voicePlayingStatus: 'Speaking warning now...',
  voiceReadyStatus: 'Voice narration ready',
  voiceMutedStatus: 'Voice narration muted',
  voiceAutoplayPrompt: 'Tap once to allow automatic voice warnings in your browser.',
  enableVoiceTapBtn: 'Enable Voice',
  voiceUnavailableStatus: 'Voice pack unavailable on this device. Full written warning is shown below.',
  voiceUnsupportedStatus: 'Speech synthesis is not supported by this browser.',
  replayVoiceBtn: 'Replay',
  muteVoiceBtn: 'Mute',
  unmuteVoiceBtn: 'Unmute',

  incomingCallLabel: 'Simulated Incoming Call',
  callConnectedLabel: 'Simulated Call Connected',
  callEndedLabel: 'Call Ended',
  answerCallBtn: 'Answer',
  declineCallBtn: 'Decline',
  endCallBtn: 'End Call',
  ringtoneOnLabel: 'Ringtone On',
  ringtoneMutedLabel: 'Ringtone Silent',
  suspiciousCallBannerTitle: 'ElderShield Warning: Possible Caller Impersonation',
  ordinaryCallNeutralNote:
    'No scam claims detected in this simulated call. Always verify unexpected requests independently.',
  openFullWarningBtn: 'Show Full Warning',

  messagesEmpty: 'No SMS messages yet. Fictional messages will arrive automatically.',
  whatsappSimSubtitle: 'Simulated chat · Not real WhatsApp',
  whatsappEmpty: 'No simulated WhatsApp chats yet.',
  viewScamWarningBtn: 'Open Scam Warning',
  quickReplyVerify: 'I will check on the official number.',
  quickReplyThanks: 'Thank you, noted.',
  youSenderLabel: 'You',

  tabRecents: 'Recents',
  tabContacts: 'Contacts',
  tabKeypad: 'Keypad',
  callActionBtn: 'Call',
  messageActionBtn: 'Message',
  dialBtn: 'Simulated Call',
  noRecentCalls: 'No simulated calls yet.',
  contactRoleSon: 'Son (Saved Family)',
  contactRoleDaughter: 'Daughter (Saved Family)',
  contactRoleDoctor: 'Family Clinic',
  contactRoleBankHelpline: 'Official Bank Helpline (Demo)',
  contactRoleCyberHelpline: 'National Cyber Helpline Info',
  cameraSimulatedNote: 'Simulated Camera Preview (No camera permission used)',
  cameraCaptureBtn: 'Take Snapshot',
  cameraSavedToast: 'Saved simulated snapshot to Gallery',
  galleryPhotoTea: 'Morning Tea on Balcony',
  galleryPhotoGarden: 'Home Marigold Garden',
  galleryPhotoPark: 'Morning Park Walk',
  galleryPhotoSnapshot: 'Camera Snapshot',
  elderShieldCenterDesc: 'Review simulated scam alerts and notification history.',
  flaggedEventsHeader: 'Flagged Warnings',
  allEventsHeader: 'All Simulated Events',

  settingsLanguageSection: 'Language',
  settingsSimulationSection: 'ElderShield Simulation',
  settingsAutoSimDesc: 'Automatically receive fictional SMS, WhatsApp, and phone call scenarios.',
  pauseSimBtn: 'Pause Simulation',
  resumeSimBtn: 'Resume Simulation',
  sendNextEventBtn: 'Simulate Next Event Now',
  restartSimBtn: 'Restart Simulation',
  settingsVoiceSection: 'Voice Narration',
  speechSpeedLabel: 'Speech Speed',
  speedSlow: 'Slow',
  speedCalm: 'Calm',
  speedNormal: 'Normal',
  testVoiceBtn: 'Test Voice',
  testVoiceSample: 'ElderShield security warning voice is active and clear.',
  settingsDisplaySection: 'Display & Accessibility',
  largeTextToggleLabel: 'Extra Large Phone Text',
  wallpaperLabel: 'Home Wallpaper',
  wallpaperDawn: 'Misty Dawn',
  wallpaperOcean: 'Deep Ocean',
  wallpaperTwilight: 'Warm Twilight',
  resetSetupBtn: 'Reset Language Setup',
  confirmResetPrompt: 'Reset phone history and return to initial language selection?',
  confirmYesBtn: 'Reset',
  cancelBtn: 'Cancel',

  riskHigh: 'High Risk',
  riskSuspicious: 'Suspicious',
  riskNoObvious: 'No Obvious Warning Signs',

  categories: {
    bank_impersonation: 'Bank Impersonation',
    otp_pin_theft: 'OTP or PIN Request',
    upi_scam: 'UPI Payment or Refund Scam',
    fake_kyc: 'Fake KYC Update',
    phishing_link: 'Suspicious Phishing Link',
    parcel_delivery_scam: 'Fake Parcel Fee',
    lottery_prize_scam: 'Lottery or Prize Scam',
    fake_job_offer: 'Fake Job Offer',
    investment_scam: 'Investment Promise Scam',
    govt_benefit_scam: 'Government Scheme Impersonation',
    police_legal_threat: 'Police or Legal Threat Scam',
    electricity_threat: 'Electricity Disconnection Threat',
    fake_loan_offer: 'Fake Instant Loan',
    suspicious_app_install: 'Dangerous App File Request',
    remote_access_scam: 'Remote Screen-Sharing Scam',
    urgent_financial_request: 'Urgent Money Request',
    ordinary_message: 'Ordinary Notification',
  },

  warningSignReasons: {
    impersonates_bank: 'The sender claims your bank account or card will be blocked to frighten you.',
    requests_otp_or_pin: 'It asks for your secret OTP, PIN, password, or card CVV.',
    suspicious_upi_collect: 'It asks you to enter a UPI PIN to receive money or a refund.',
    fake_kyc_threat: 'It threatens account suspension unless you update KYC or PAN urgently.',
    suspicious_link: 'It includes an unverified link designed to capture personal or bank details.',
    fake_parcel_fee: 'It demands a fee to release or redeliver a held parcel.',
    unrealistic_prize_lottery: 'It promises unexpected lottery winnings or cash prizes.',
    unrealistic_job_income: 'It promises high daily income for simple online tasks.',
    guaranteed_investment_return: 'It promises guaranteed, risk-free doubled money.',
    fake_government_scheme: 'It uses a government pension or subsidy name to appear official.',
    legal_or_police_intimidation: 'It threatens police arrest, cybercrime charges, or legal warrants.',
    tonight_utility_cutoff: 'It threatens to cut off your home electricity tonight.',
    upfront_loan_fee: 'It demands an upfront processing fee for an instant loan.',
    apk_file_download: 'It asks you to install an unsafe APK application file.',
    remote_screen_sharing_app: 'It asks you to install a remote-access app like AnyDesk or QuickSupport.',
    urgent_pressure_tactic: 'It creates artificial urgency so you act before verifying.',
    unverified_callback_number: 'It pressures you to call an unverified phone number.',
    caller_org_impersonation: 'The caller claims to represent a bank, police unit, government office, or utility board.',
  },

  safetyAdviceByCategory: {
    bank_impersonation:
      'Do not click links or share bank details. Call the official number printed on the back of your bank card or visit your branch.',
    otp_pin_theft:
      'Never share your OTP, PIN, CVV, or password with anyone. Officials never ask for them.',
    upi_scam:
      'Do not enter your UPI PIN. Entering a UPI PIN always deducts money from your account.',
    fake_kyc:
      'Do not open the link. Verify KYC status only in person at your bank branch.',
    phishing_link:
      'Do not tap the link. Ask a trusted family member before opening unfamiliar websites.',
    parcel_delivery_scam:
      'Do not pay any fee via message links. Check deliveries only inside the official shopping app.',
    lottery_prize_scam:
      'Ignore this message and never pay fees or taxes to claim an unexpected prize.',
    fake_job_offer:
      'Do not join unknown chat groups or pay registration deposits for online task jobs.',
    investment_scam:
      'Do not send money. Consult your bank directly before making any investment.',
    govt_benefit_scam:
      'Do not share Aadhaar, OTP, or bank details. Check benefits at an official government center.',
    police_legal_threat:
      'Hang up or ignore immediately. Police never demand money or conduct digital arrests by phone or chat. Speak to family.',
    electricity_threat:
      'Do not pay or call numbers inside the message. Check the customer care number on your printed electricity bill.',
    fake_loan_offer:
      'Never pay upfront loan fees or upload ID documents to unknown links.',
    suspicious_app_install:
      'Never download or install APK files sent through SMS or WhatsApp.',
    remote_access_scam:
      'Never install AnyDesk, QuickSupport, or TeamViewer for an unknown caller. They can view your screen and OTPs.',
    urgent_financial_request:
      'Pause and call your family member directly on their saved phone number before sending money.',
    ordinary_message:
      'No obvious scam signs detected, though always verify unexpected requests independently.',
  },

  ordinaryMessageNote:
    'Demo risk assessment: No obvious scam indicators were found, though a message with no obvious signs can still be deceptive if unexpected.',
};

const ta: PhoneTranslations = {
  setupTitle: 'எல்டர்ஷீல்ட் பாதுகாப்பு',
  setupSubtitle: 'உங்கள் மொழியை ஒருமுறை தேர்ந்தெடுக்கவும். போலி அழைப்புகள் மற்றும் மோசடிச் செய்திகளைத் தொலைபேசி தானாகக் கண்டறிந்து குரலில் எச்சரிக்கும்.',
  setupChooseLanguage: 'மொழியைத் தேர்ந்தெடுக்கவும்',
  setupStartBtn: 'தொடங்கு',

  demoDisclaimer:
    'மாதிரி நிலை: இந்தத் தொலைபேசி கற்பனைச் செய்திகளையும் மாதிரி அழைப்புகளையும் பயன்படுத்துகிறது. உண்மையான SMS, வாட்ஸ்அப் அல்லது அழைப்புகளைக் கண்காணிக்காது.',

  lockScreenStatus: 'எல்டர்ஷீல்ட் பாதுகாப்பு செயலில்',
  tapToUnlock: 'திறக்க இங்கே தொடவும்',
  noNewNotifications: 'புதிய அறிவிப்புகள் இல்லை. மாதிரிச் செய்திகள் தானாக வரும்.',
  shieldWidgetActive: 'எல்டர்ஷீல்ட் செயலில்',
  shieldWidgetPaused: 'மாதிரி நிறுத்தப்பட்டுள்ளது',
  shieldWidgetSubtitle: 'தானியங்கி SMS, வாட்ஸ்அப் மற்றும் அழைப்புப் பாதுகாப்பு',
  folderSafetyTools: 'பாதுகாப்பு & கருவிகள்',

  appPhone: 'அழைப்பு',
  appMessages: 'செய்திகள்',
  appWhatsApp: 'வாட்ஸ்அப்',
  appContacts: 'தொடர்புகள்',
  appSettings: 'அமைப்புகள்',
  appCamera: 'கேமரா',
  appGallery: 'படங்கள்',
  appElderShield: 'எல்டர்ஷீல்ட்',

  quickSettingsTitle: 'விரைவு அமைப்புகள்',
  tileWifi: 'வைஃபை',
  tileAutoSim: 'மாதிரி இயக்கம்',
  tileVoice: 'குரல் எச்சரிக்கை',
  tileRingtone: 'மணி ஒலி',
  tileLargeText: 'பெரிய எழுத்து',
  tileLockPhone: 'திரைப் பூட்டு',
  stateOn: 'ஆன்',
  stateOff: 'ஆஃப்',
  stateActive: 'செயலில்',
  statePaused: 'நிறுத்தம்',
  notificationsHeader: 'அறிவிப்புகள்',
  clearNotificationsBtn: 'அனைத்தையும் அழி',
  nowTimestamp: 'இப்போது',

  navBack: 'பின்செல்',
  navHome: 'முகப்பு',
  navRecents: 'சமீபத்தியவை',
  recentsEmpty: 'திறந்த செயலிகள் எதுவும் இல்லை',
  closeAllAppsBtn: 'முகப்புத் திரைக்குச் செல்',

  scamWarningTitle: 'மோசடி எச்சரிக்கை',
  suspiciousNoticeTitle: 'சந்தேக எச்சரிக்கை',
  msgFraudulentLead: 'இந்தச் செய்தி மோசடியானதாக இருக்கலாம்.',
  callFraudulentLead: 'அழைப்பவர் வங்கி அல்லது அரசு அதிகாரி போல நடித்து ஏமாற்றக்கூடும்.',
  reasonPrefix: 'காரணம்:',
  suspiciousRequestLabel: 'கண்டறியப்பட்ட ஆபத்தான பகுதி:',
  safetyAdvicePrefix: 'பாதுகாப்பு ஆலோசனை:',
  demoAssessmentNote:
    'இது மாதிரி இடர் மதிப்பீடு மட்டுமே — உறுதியான உத்தரவாதம் அல்ல. சாதாரணமாகத் தோன்றும் செய்தியிலும் கவனம் தேவை.',
  btnIUnderstand: 'புரிந்துகொண்டேன்',
  btnViewMessageDetails: 'செய்தி விவரங்களைப் பார்',
  btnViewCallDetails: 'அழைப்பு விவரங்களைப் பார்',
  btnDismissAlert: 'எச்சரிக்கையை மூடு',

  voicePlayingStatus: 'எச்சரிக்கை குரலில் வாசிக்கப்படுகிறது...',
  voiceReadyStatus: 'குரல் விளக்கம் தயார்',
  voiceMutedStatus: 'குரல் ஒலி நிறுத்தப்பட்டுள்ளது',
  voiceAutoplayPrompt: 'தானியங்கி குரல் எச்சரிக்கையை அனுமதிக்க ஒருமுறை தொடவும்.',
  enableVoiceTapBtn: 'குரலை இயக்கு',
  voiceUnavailableStatus: 'இந்தச் சாதனத்தில் தமிழ் குரல் வசதி இல்லை. கீழே உள்ள எழுத்து எச்சரிக்கையைப் படிக்கவும்.',
  voiceUnsupportedStatus: 'இந்த உலாவியில் குரல் வாசிப்பு வசதி இல்லை.',
  replayVoiceBtn: 'மீண்டும் கேள்',
  muteVoiceBtn: 'ஒலி நிறுத்து',
  unmuteVoiceBtn: 'ஒலி இயக்கு',

  incomingCallLabel: 'மாதிரி உள்வரும் அழைப்பு',
  callConnectedLabel: 'மாதிரி அழைப்பு இணைக்கப்பட்டது',
  callEndedLabel: 'அழைப்பு முடிந்தது',
  answerCallBtn: 'ஏற்கவும்',
  declineCallBtn: 'நிராகரி',
  endCallBtn: 'துண்டி',
  ringtoneOnLabel: 'மணி ஒலி ஆன்',
  ringtoneMutedLabel: 'மௌன நிலை',
  suspiciousCallBannerTitle: 'எல்டர்ஷீல்ட் எச்சரிக்கை: போலி அதிகாரி அழைப்பாக இருக்கலாம்',
  ordinaryCallNeutralNote:
    'இந்த மாதிரி அழைப்பில் வெளிப்படையான மோசடி அறிகுறி இல்லை. அறிமுகமில்லாத கோரிக்கைகளை நேரில் சரிபார்க்கவும்.',
  openFullWarningBtn: 'முழு எச்சரிக்கையைப் பார்',

  messagesEmpty: 'இன்னும் குறுஞ்செய்திகள் இல்லை. கற்பனைச் செய்திகள் தானாக வரும்.',
  whatsappSimSubtitle: 'மாதிரி உரையாடல் · உண்மையான வாட்ஸ்அப் அல்ல',
  whatsappEmpty: 'இன்னும் மாதிரி வாட்ஸ்அப் செய்திகள் இல்லை.',
  viewScamWarningBtn: 'மோசடி எச்சரிக்கையைப் பார்',
  quickReplyVerify: 'நேரில் சரிபார்த்துக் கொள்கிறேன்.',
  quickReplyThanks: 'நன்றி, தெரிந்துகொண்டேன்.',
  youSenderLabel: 'நீங்கள்',

  tabRecents: 'சமீபத்தியவை',
  tabContacts: 'தொடர்புகள்',
  tabKeypad: 'எண் பலகை',
  callActionBtn: 'அழை',
  messageActionBtn: 'செய்தி',
  dialBtn: 'மாதிரி அழைப்பு',
  noRecentCalls: 'மாதிரி அழைப்புகள் எதுவும் இல்லை.',
  contactRoleSon: 'மகன் (குடும்பம்)',
  contactRoleDaughter: 'மகள் (குடும்பம்)',
  contactRoleDoctor: 'குடும்ப மருத்துவமனை',
  contactRoleBankHelpline: 'வங்கி அதிகாரப்பூர்வ உதவி எண் (மாதிரி)',
  contactRoleCyberHelpline: 'சைபர் பாதுகாப்பு உதவித் தகவல்',
  cameraSimulatedNote: 'மாதிரி கேமரா காட்சி (கேமரா அனுமதி கேட்கப்படவில்லை)',
  cameraCaptureBtn: 'படம் எடு',
  cameraSavedToast: 'மாதிரிப் படம் சேமிக்கப்பட்டது',
  galleryPhotoTea: 'காலைத் தேநீர்',
  galleryPhotoGarden: 'வீட்டுப் பூந்தோட்டம்',
  galleryPhotoPark: 'பூங்கா நடைப்பயிற்சி',
  galleryPhotoSnapshot: 'கேமரா படம்',
  elderShieldCenterDesc: 'கண்டறியப்பட்ட மோசடி எச்சரிக்கைகள் மற்றும் அறிவிப்பு வரலாறு.',
  flaggedEventsHeader: 'மோசடி எச்சரிக்கைகள்',
  allEventsHeader: 'அனைத்து மாதிரி நிகழ்வுகள்',

  settingsLanguageSection: 'மொழி',
  settingsSimulationSection: 'எல்டர்ஷீல்ட் மாதிரி இயக்கம்',
  settingsAutoSimDesc: 'கற்பனையான SMS, வாட்ஸ்அப் மற்றும் அழைப்புகளைத் தானாகப் பெறவும்.',
  pauseSimBtn: 'மாதிரியை இடைநிறுத்து',
  resumeSimBtn: 'மாதிரியைத் தொடர்',
  sendNextEventBtn: 'அடுத்த நிகழ்வை இப்போதே காட்டு',
  restartSimBtn: 'முதலில் இருந்து தொடங்கு',
  settingsVoiceSection: 'குரல் எச்சரிக்கை அமைப்பு',
  speechSpeedLabel: 'வாசிக்கும் வேகம்',
  speedSlow: 'மெதுவாக',
  speedCalm: 'நிதானமாக',
  speedNormal: 'சாதாரண',
  testVoiceBtn: 'குரலைச் சோதி',
  testVoiceSample: 'வணக்கம். எல்டர்ஷீல்ட் பாதுகாப்பு எச்சரிக்கைக் குரல் தெளிவாகச் செயல்படுகிறது.',
  settingsDisplaySection: 'திரை மற்றும் எழுத்து அளவு',
  largeTextToggleLabel: 'மிகப் பெரிய எழுத்து அளவு',
  wallpaperLabel: 'முகப்புப் பின்னணி',
  wallpaperDawn: 'காலை மலைத்தொடர்',
  wallpaperOcean: 'ஆழ்கடல் நீலம்',
  wallpaperTwilight: 'மாலை வெளிச்சம்',
  resetSetupBtn: 'மொழி அமைப்பை மீட்டமை',
  confirmResetPrompt: 'தொலைபேசி வரலாற்றை அழித்து முதல் மொழித் தேர்வுக்குத் திரும்பவா?',
  confirmYesBtn: 'மீட்டமை',
  cancelBtn: 'வேண்டாம்',

  riskHigh: 'அதிக ஆபத்து',
  riskSuspicious: 'சந்தேகத்திற்குரியது',
  riskNoObvious: 'வெளிப்படையான ஆபத்து இல்லை',

  categories: {
    bank_impersonation: 'வங்கி பெயரில் போலி எச்சரிக்கை',
    otp_pin_theft: 'OTP அல்லது PIN திருட்டு',
    upi_scam: 'UPI பணம் அல்லது ரீஃபண்ட் மோசடி',
    fake_kyc: 'போலி KYC புதுப்பிப்பு',
    phishing_link: 'போலி இணைய இணைப்பு',
    parcel_delivery_scam: 'போலி பார்சல் கட்டணம்',
    lottery_prize_scam: 'லாட்டரி மற்றும் பரிசு மோசடி',
    fake_job_offer: 'போலி வேலை வாய்ப்பு',
    investment_scam: 'இரட்டிப்பு லாப முதலீட்டு ஆசை',
    govt_benefit_scam: 'அரசுத் திட்டம் பெயரில் மோசடி',
    police_legal_threat: 'போலீஸ் அல்லது சட்ட மிரட்டல்',
    electricity_threat: 'மின்சாரம் துண்டிப்பு மிரட்டல்',
    fake_loan_offer: 'போலி உடனடிக் கடன்',
    suspicious_app_install: 'ஆபத்தான செயலி (APK) கோரிக்கை',
    remote_access_scam: 'திரை பகிர்வு (Remote App) மோசடி',
    urgent_financial_request: 'அவசர பணக் கோரிக்கை',
    ordinary_message: 'சாதாரண தகவல்',
  },

  warningSignReasons: {
    impersonates_bank: 'உங்களைப் பயமுறுத்த வங்கிக் கணக்கு அல்லது அட்டை முடக்கப்படும் என்று கூறுகிறது.',
    requests_otp_or_pin: 'உங்கள் ரகசிய OTP, PIN, கடவுச்சொல் அல்லது CVV எண்ணைக் கேட்கிறது.',
    suspicious_upi_collect: 'பணம் அல்லது ரீஃபண்ட் பெறுவதற்காக UPI PIN எண்ணை உள்ளிடச் சொல்கிறது.',
    fake_kyc_threat: 'உடனடியாக KYC புதுப்பிக்காவிட்டால் கணக்கு முடங்கும் என்று மிரட்டுகிறது.',
    suspicious_link: 'தனிப்பட்ட மற்றும் வங்கி விவரங்களைத் திருடும் சந்தேகமான இணைய இணைப்பு உள்ளது.',
    fake_parcel_fee: 'பார்சலை டெலிவரி செய்யச் சிறிய கட்டணம் செலுத்தும்படி கேட்கிறது.',
    unrealistic_prize_lottery: 'நீங்கள் பங்கேற்காத குலுக்கல் அல்லது லாட்டரி பரிசு விழுந்ததாக ஆசை காட்டுகிறது.',
    unrealistic_job_income: 'எளிய ஆன்லைன் வேலைக்குத் தினமும் பெரிய வருமானம் தருவதாகக் கூறுகிறது.',
    guaranteed_investment_return: 'குறுகிய காலத்தில் பணம் இரட்டிப்பாகும் என்று உறுதியளிக்கிறது.',
    fake_government_scheme: 'நம்பிக்கை ஏற்படுத்துவதற்காக அரசு ஓய்வூதியம் அல்லது உதவித்தொகை பெயரைப் பயன்படுத்துகிறது.',
    legal_or_police_intimidation: 'போலீஸ் கைது அல்லது டிஜிட்டல் அரெஸ்ட் வாரண்ட் என்று பயமுறுத்துகிறது.',
    tonight_utility_cutoff: 'இன்றிரவே வீட்டு மின்சாரம் துண்டிக்கப்படும் என்று பதற்றத்தை ஏற்படுத்துகிறது.',
    upfront_loan_fee: 'உடனடிக் கடன் தருவதாகக் கூறி முன்பணக் கட்டணம் கேட்கிறது.',
    apk_file_download: 'பாதுகாப்பற்ற APK செயலி கோப்பைப் பதிவிறக்கச் சொல்கிறது.',
    remote_screen_sharing_app: 'AnyDesk அல்லது QuickSupport போன்ற திரை பகிர்வு செயலியை நிறுவச் சொல்கிறது.',
    urgent_pressure_tactic: 'சரிபார்க்க நேரம் கொடுக்காமல் உடனடியாகச் செயல்படும்படி அவசரப்படுத்துகிறது.',
    unverified_callback_number: 'உறுதிப்படுத்தப்படாத தனிப்பட்ட எண்ணை அழைக்கும்படி அழுத்தம் தருகிறது.',
    caller_org_impersonation: 'அழைப்பவர் வங்கி, காவல்துறை, அரசு அலுவலகம் அல்லது மின்வாரிய அதிகாரி போலப் பேசுகிறார்.',
  },

  safetyAdviceByCategory: {
    bank_impersonation:
      'இணைப்பைத் தொட வேண்டாம், வங்கி விவரங்களைப் பகிர வேண்டாம். உங்கள் வங்கி அட்டையின் பின்புறம் உள்ள அதிகாரப்பூர்வ எண்ணை அழைக்கவும் அல்லது நேரில் வங்கிக்குச் செல்லவும்.',
    otp_pin_theft:
      'உங்கள் OTP, PIN, CVV அல்லது கடவுச்சொல்லை யாரிடமும் கூற வேண்டாம். அதிகாரிகள் ஒருபோதும் இவற்றைக் கேட்க மாட்டார்கள்.',
    upi_scam:
      'UPI PIN எண்ணைப் போட வேண்டாம். UPI PIN உள்ளிட்டால் உங்கள் கணக்கிலிருந்து பணம் வெளியே செல்லும்.',
    fake_kyc:
      'இணைப்பைத் திறக்க வேண்டாம். வங்கி கிளைக்கு நேரில் சென்று மட்டுமே KYC விவரத்தைச் சரிபார்க்கவும்.',
    phishing_link:
      'இந்த இணைய இணைப்பைத் தொட வேண்டாம். குடும்ப உறுப்பினரிடம் கேட்டு உறுதிப்படுத்தவும்.',
    parcel_delivery_scam:
      'செய்தி இணைப்புகள் வழியாகப் பார்சல் கட்டணம் செலுத்த வேண்டாம். அதிகாரப்பூர்வ ஷாப்பிங் செயலியில் மட்டும் பார்க்கவும்.',
    lottery_prize_scam:
      'இந்தச் செய்தியைப் புறக்கணிக்கவும். பரிசு பெறுவதற்காக எங்கும் பணம் செலுத்த வேண்டாம்.',
    fake_job_offer:
      'தெரியாத வாட்ஸ்அப் குழுக்களில் இணையவோ முன்பணம் கட்டவோ வேண்டாம்.',
    investment_scam:
      'பணம் அனுப்ப வேண்டாம். எந்த முதலீட்டிற்கும் முன் உங்கள் வங்கியில் நேரில் விசாரிக்கவும்.',
    govt_benefit_scam:
      'ஆதார், OTP அல்லது வங்கி விவரங்களைப் பகிர வேண்டாம். அரசு சேவை மையத்தில் நேரில் விசாரிக்கவும்.',
    police_legal_threat:
      'பதற்றமடையாமல் அழைப்பைத் துண்டிக்கவும். காவல்துறை தொலைபேசியில் பணம் கேட்கவோ டிஜிட்டல் கைது செய்யவோ மாட்டார்கள். குடும்பத்தினரிடம் கூறவும்.',
    electricity_threat:
      'செய்தியில் உள்ள எண்ணை அழைக்க வேண்டாம். உங்கள் மின் கட்டண ரசீதில் உள்ள அதிகாரப்பூர்வ எண்ணைத் தொடர்பு கொள்ளவும்.',
    fake_loan_offer:
      'கடன் முன்பணம் செலுத்த வேண்டாம், அடையாள ஆவணங்களைப் பதிவேற்ற வேண்டாம்.',
    suspicious_app_install:
      'SMS அல்லது வாட்ஸ்அப் வழியாக வரும் APK கோப்புகளை ஒருபோதும் நிறுவ வேண்டாம்.',
    remote_access_scam:
      'அறிமுகமில்லாதவர் சொன்னால் AnyDesk அல்லது QuickSupport செயலியை நிறுவ வேண்டாம். இதன்மூலம் உங்கள் திரையையும் OTP-யையும் பார்க்க முடியும்.',
    urgent_financial_request:
      'பணம் அனுப்பும் முன், ஏற்கனவே சேமித்து வைத்துள்ள எண்ணில் குடும்பத்தினரை நேரில் அழைத்துப் பேசவும்.',
    ordinary_message:
      'வெளிப்படையான மோசடி அறிகுறி இல்லை; இருப்பினும் எதிர்பாராத கோரிக்கைகளைச் சரிபார்க்கவும்.',
  },

  ordinaryMessageNote:
    'மாதிரி மதிப்பீடு: வெளிப்படையான மோசடி அறிகுறிகள் இல்லை, ஆனாலும் அறிமுகமில்லாத செய்திகளில் கவனம் தேவை.',
};

const hi: PhoneTranslations = {
  setupTitle: 'एल्डरशील्ड सुरक्षा',
  setupSubtitle: 'एक बार अपनी भाषा चुनें। यह वर्चुअल फ़ोन संदिग्ध संदेशों और कॉलों को पहचानकर आपकी भाषा में चेतावनी सुनाएगा।',
  setupChooseLanguage: 'भाषा चुनें',
  setupStartBtn: 'शुरू करें',

  demoDisclaimer:
    'डेमो मोड: यह फ़ोन काल्पनिक संदेशों और नकली कॉलों का उपयोग करता है। यह आपके असली SMS, व्हाट्सऐप या फ़ोन कॉल की निगरानी नहीं करता है।',

  lockScreenStatus: 'एल्डरशील्ड सुरक्षा चालू',
  tapToUnlock: 'फ़ोन खोलने के लिए टैप करें',
  noNewNotifications: 'अभी कोई नई सूचना नहीं है। काल्पनिक संदेश अपने आप आएंगे।',
  shieldWidgetActive: 'एल्डरशील्ड सक्रिय',
  shieldWidgetPaused: 'सिमुलेशन रुका है',
  shieldWidgetSubtitle: 'स्वचालित SMS, व्हाट्सऐप और कॉल सुरक्षा जांच',
  folderSafetyTools: 'सुरक्षा और साधन',

  appPhone: 'फ़ोन',
  appMessages: 'संदेश',
  appWhatsApp: 'व्हाट्सऐप',
  appContacts: 'संपर्क',
  appSettings: 'सेटिंग्स',
  appCamera: 'कैमरा',
  appGallery: 'गैलरी',
  appElderShield: 'एल्डरशील्ड',

  quickSettingsTitle: 'त्वरित सेटिंग्स',
  tileWifi: 'वाई-फ़ाई',
  tileAutoSim: 'सिमुलेशन',
  tileVoice: 'आवाज़ चेतावनी',
  tileRingtone: 'रिंगटोन',
  tileLargeText: 'बड़े अक्षर',
  tileLockPhone: 'स्क्रीन लॉक',
  stateOn: 'चालू',
  stateOff: 'बंद',
  stateActive: 'सक्रिय',
  statePaused: 'रुका हुआ',
  notificationsHeader: 'सूचनाएं',
  clearNotificationsBtn: 'सब हटाएं',
  nowTimestamp: 'अभी',

  navBack: 'पीछे',
  navHome: 'होम',
  navRecents: 'हाल के ऐप',
  recentsEmpty: 'कोई ऐप खुला नहीं है',
  closeAllAppsBtn: 'होम स्क्रीन पर जाएं',

  scamWarningTitle: 'धोखाधड़ी चेतावनी',
  suspiciousNoticeTitle: 'संदिग्ध चेतावनी',
  msgFraudulentLead: 'यह संदेश धोखाधड़ी भरा हो सकता है।',
  callFraudulentLead: 'यह कॉलर किसी बैंक, पुलिस या सरकारी संस्था के नाम पर ठगी कर सकता है।',
  reasonPrefix: 'कारण:',
  suspiciousRequestLabel: 'पहचाना गया संदिग्ध हिस्सा:',
  safetyAdvicePrefix: 'सुरक्षा सलाह:',
  demoAssessmentNote:
    'यह केवल डेमो जोखिम आकलन है — सौ प्रतिशत गारंटी नहीं। सामान्य दिखने वाले संदेशों में भी सावधानी रखें।',
  btnIUnderstand: 'मैं समझ गया',
  btnViewMessageDetails: 'संदेश विवरण देखें',
  btnViewCallDetails: 'कॉल विवरण देखें',
  btnDismissAlert: 'चेतावनी बंद करें',

  voicePlayingStatus: 'चेतावनी बोलकर सुनाई जा रही है...',
  voiceReadyStatus: 'आवाज़ चेतावनी तैयार है',
  voiceMutedStatus: 'आवाज़ बंद है',
  voiceAutoplayPrompt: 'स्वचालित आवाज़ चेतावनी शुरू करने के लिए एक बार टैप करें।',
  enableVoiceTapBtn: 'आवाज़ चालू करें',
  voiceUnavailableStatus: 'इस डिवाइस पर हिन्दी आवाज़ उपलब्ध नहीं है। नीचे लिखित चेतावनी पढ़ें।',
  voiceUnsupportedStatus: 'इस ब्राउज़र में आवाज़ की सुविधा उपलब्ध नहीं है।',
  replayVoiceBtn: 'फिर सुनें',
  muteVoiceBtn: 'म्यूट करें',
  unmuteVoiceBtn: 'आवाज़ खोलें',

  incomingCallLabel: 'काल्पनिक इनकमिंग कॉल',
  callConnectedLabel: 'काल्पनिक कॉल चालू',
  callEndedLabel: 'कॉल समाप्त',
  answerCallBtn: 'उठाएं',
  declineCallBtn: 'काटें',
  endCallBtn: 'कॉल काटें',
  ringtoneOnLabel: 'रिंगटोन चालू',
  ringtoneMutedLabel: 'रिंगटोन शांत',
  suspiciousCallBannerTitle: 'एल्डरशील्ड चेतावनी: नकली अधिकारी कॉल की आशंका',
  ordinaryCallNeutralNote:
    'इस काल्पनिक कॉल में कोई स्पष्ट धोखाधड़ी का दावा नहीं मिला। अनजान बातों की हमेशा पुष्टि करें।',
  openFullWarningBtn: 'पूरी चेतावनी देखें',

  messagesEmpty: 'अभी कोई SMS नहीं है। काल्पनिक संदेश अपने आप आएंगे।',
  whatsappSimSubtitle: 'काल्पनिक चैट · असली व्हाट्सऐप नहीं',
  whatsappEmpty: 'अभी कोई काल्पनिक व्हाट्सऐप चैट नहीं है।',
  viewScamWarningBtn: 'धोखाधड़ी चेतावनी देखें',
  quickReplyVerify: 'मैं आधिकारिक नंबर से पता कर लूँगा।',
  quickReplyThanks: 'धन्यवाद, ठीक है।',
  youSenderLabel: 'आप',

  tabRecents: 'हाल की कॉल',
  tabContacts: 'संपर्क',
  tabKeypad: 'कीपैड',
  callActionBtn: 'कॉल',
  messageActionBtn: 'संदेश',
  dialBtn: 'काल्पनिक कॉल करें',
  noRecentCalls: 'अभी कोई काल्पनिक कॉल नहीं आई है।',
  contactRoleSon: 'बेटा (परिवार)',
  contactRoleDaughter: 'बेटी (परिवार)',
  contactRoleDoctor: 'पारिवारिक क्लिनिक',
  contactRoleBankHelpline: 'आधिकारिक बैंक हेल्पलाइन (डेमो)',
  contactRoleCyberHelpline: 'साइबर सुरक्षा हेल्पलाइन जानकारी',
  cameraSimulatedNote: 'काल्पनिक कैमरा दृश्य (कैमरा अनुमति नहीं ली गई)',
  cameraCaptureBtn: 'फ़ोटो लें',
  cameraSavedToast: 'काल्पनिक फ़ोटो गैलरी में सहेजी गई',
  galleryPhotoTea: 'सुबह की चाय',
  galleryPhotoGarden: 'घर का बगीचा',
  galleryPhotoPark: 'सुबह की सैर',
  galleryPhotoSnapshot: 'कैमरा स्नैपशॉट',
  elderShieldCenterDesc: 'पकड़ी गई धोखाधड़ी चेतावनियां और सूचना इतिहास देखें।',
  flaggedEventsHeader: 'संदिग्ध चेतावनियां',
  allEventsHeader: 'सभी काल्पनिक घटनाएं',

  settingsLanguageSection: 'भाषा',
  settingsSimulationSection: 'एल्डरशील्ड सिमुलेशन',
  settingsAutoSimDesc: 'काल्पनिक SMS, व्हाट्सऐप और फ़ोन कॉल अपने आप प्राप्त करें।',
  pauseSimBtn: 'सिमुलेशन रोकें',
  resumeSimBtn: 'सिमुलेशन शुरू करें',
  sendNextEventBtn: 'अगली घटना अभी दिखाएं',
  restartSimBtn: 'शुरू से चलाएं',
  settingsVoiceSection: 'आवाज़ में चेतावनी',
  speechSpeedLabel: 'बोलने की गति',
  speedSlow: 'धीमा',
  speedCalm: 'आरामदायक',
  speedNormal: 'सामान्य',
  testVoiceBtn: 'आवाज़ परखें',
  testVoiceSample: 'नमस्ते। एल्डरशील्ड सुरक्षा चेतावनी की आवाज़ स्पष्ट रूप से काम कर रही है।',
  settingsDisplaySection: 'दिखावट और अक्षर आकार',
  largeTextToggleLabel: 'अतिरिक्त बड़े अक्षर',
  wallpaperLabel: 'होम वॉलपेपर',
  wallpaperDawn: 'सुबह की पहाड़ियां',
  wallpaperOcean: 'गहरा सागर',
  wallpaperTwilight: 'शाम की आभा',
  resetSetupBtn: 'भाषा सेटअप रीसेट करें',
  confirmResetPrompt: 'फ़ोन इतिहास मिटाकर प्रारंभिक भाषा चयन स्क्रीन पर लौटें?',
  confirmYesBtn: 'रीसेट करें',
  cancelBtn: 'रद्द करें',

  riskHigh: 'उच्च जोखिम',
  riskSuspicious: 'संदिग्ध',
  riskNoObvious: 'कोई स्पष्ट चेतावनी संकेत नहीं',

  categories: {
    bank_impersonation: 'बैंक के नाम पर नकली संदेश',
    otp_pin_theft: 'OTP या PIN की मांग',
    upi_scam: 'UPI भुगतान या रिफंड ठगी',
    fake_kyc: 'नकली KYC अपडेट',
    phishing_link: 'संदिग्ध नकली लिंक',
    parcel_delivery_scam: 'नकली पार्सल शुल्क',
    lottery_prize_scam: 'लॉटरी या इनाम का झांसा',
    fake_job_offer: 'नकली नौकरी प्रस्ताव',
    investment_scam: 'दोगुने मुनाफ़े का झांसा',
    govt_benefit_scam: 'सरकारी योजना के नाम पर ठगी',
    police_legal_threat: 'नकली पुलिस या कानूनी धमकी',
    electricity_threat: 'बिजली काटने की धमकी',
    fake_loan_offer: 'नकली तुरंत लोन',
    suspicious_app_install: 'खतरनाक ऐप (APK) इंस्टॉल की मांग',
    remote_access_scam: 'स्क्रीन-शेयरिंग ऐप ठगी',
    urgent_financial_request: 'तुरंत पैसे की मांग',
    ordinary_message: 'सामान्य सूचना',
  },

  warningSignReasons: {
    impersonates_bank: 'आपको डराने के लिए बैंक खाता या कार्ड बंद होने का दावा किया गया है।',
    requests_otp_or_pin: 'इसमें आपका गोपनीय OTP, PIN, पासवर्ड या CVV मांगा जा रहा है।',
    suspicious_upi_collect: 'पैसे या रिफंड पाने के नाम पर UPI PIN डालने को कहा गया है।',
    fake_kyc_threat: 'तुरंत KYC या PAN अपडेट न करने पर खाता बंद करने की धमकी दी गई है।',
    suspicious_link: 'इसमें निजी या बैंक जानकारी चुराने वाला अनजान लिंक दिया गया है।',
    fake_parcel_fee: 'रुके हुए पार्सल को भेजने के नाम पर शुल्क मांगा जा रहा है।',
    unrealistic_prize_lottery: 'बिना भाग लिए बड़ी लॉटरी या इनाम जीतने का लालच दिया गया है।',
    unrealistic_job_income: 'आसान ऑनलाइन काम के बदले रोज़ हज़ारों रुपये देने का झांसा है।',
    guaranteed_investment_return: 'कम समय में बिना जोखिम पैसा दोगुना करने का दावा किया गया है।',
    fake_government_scheme: 'भरोसा जीतने के लिए सरकारी पेंशन या सब्सिडी का नाम लिया गया है।',
    legal_or_police_intimidation: 'पुलिस केस, साइबर अपराध या डिजिटल अरेस्ट का डर दिखाया जा रहा है।',
    tonight_utility_cutoff: 'आज रात घर की बिजली काटने की धमकी देकर घबराहट पैदा की जा रही है।',
    upfront_loan_fee: 'तुरंत लोन देने के नाम पर पहले प्रोसेसिंग फीस मांगी जा रही है।',
    apk_file_download: 'फोन में असुरक्षित APK ऐप फ़ाइल इंस्टॉल करने को कहा जा रहा है।',
    remote_screen_sharing_app: 'AnyDesk या QuickSupport जैसा स्क्रीन दिखाने वाला ऐप डालने को कहा गया है।',
    urgent_pressure_tactic: 'बिना सोचे तुरंत कदम उठाने के लिए जल्दबाज़ी और दबाव बनाया जा रहा है।',
    unverified_callback_number: 'संदेश में दिए गए किसी अनजान नंबर पर कॉल करने को कहा जा रहा है।',
    caller_org_impersonation: 'कॉल करने वाला खुद को बैंक, पुलिस, सरकारी विभाग या बिजली बोर्ड का अधिकारी बता रहा है।',
  },

  safetyAdviceByCategory: {
    bank_impersonation:
      'किसी लिंक को न छुएं और बैंक जानकारी साझा न करें। अपने बैंक कार्ड के पीछे लिखे आधिकारिक नंबर पर कॉल करें या शाखा में जाएं।',
    otp_pin_theft:
      'अपना OTP, PIN, CVV या पासवर्ड किसी को न बताएं। असली अधिकारी कभी ये नहीं मांगते।',
    upi_scam:
      'अपना UPI PIN न डालें। याद रखें, UPI PIN डालने से हमेशा आपके खाते से पैसा कटता है।',
    fake_kyc:
      'लिंक बिल्कुल न खोलें। केवल अपनी बैंक शाखा में जाकर KYC की पुष्टि करें।',
    phishing_link:
      'इस लिंक पर टैप न करें। किसी भरोसेमंद परिवार के सदस्य से सलाह लें।',
    parcel_delivery_scam:
      'संदेश के लिंक से कोई शुल्क न दें। केवल असली शॉपिंग ऐप में जाकर अपना ऑर्डर देखें।',
    lottery_prize_scam:
      'इस संदेश को अनदेखा करें। इनाम पाने के नाम पर कभी कोई शुल्क न भरें।',
    fake_job_offer:
      'अनजान ग्रुप में न जुड़ें और ऑनलाइन काम के लिए कोई पंजीकरण पैसा न दें।',
    investment_scam:
      'पैसे न भेजें। किसी भी निवेश से पहले सीधे अपने बैंक में बात करें।',
    govt_benefit_scam:
      'आधार, OTP या बैंक विवरण न दें। सरकारी सेवा केंद्र पर जाकर योजना की जांच करें।',
    police_legal_threat:
      'घबराएं नहीं और तुरंत कॉल काट दें। असली पुलिस फोन पर पैसे नहीं मांगती और न ही डिजिटल अरेस्ट करती है। परिवार को बताएं।',
    electricity_threat:
      'संदेश में लिखे नंबर पर कॉल न करें। अपने छपे हुए बिजली बिल पर दिए आधिकारिक नंबर पर संपर्क करें।',
    fake_loan_offer:
      'लोन के लिए पहले से कोई शुल्क न दें और अपने दस्तावेज़ अनजान लिंक पर न भेजें।',
    suspicious_app_install:
      'SMS या व्हाट्सऐप पर आई किसी भी APK फ़ाइल को कभी डाउनलोड या इंस्टॉल न करें।',
    remote_access_scam:
      'अनजान व्यक्ति के कहने पर AnyDesk या QuickSupport ऐप कभी न डालें। इससे वे आपकी स्क्रीन और OTP देख सकते हैं।',
    urgent_financial_request:
      'पैसे भेजने से पहले रुकें और अपने फोन में पहले से सेव नंबर पर परिवार के सदस्य से सीधे बात करें।',
    ordinary_message:
      'कोई स्पष्ट धोखाधड़ी संकेत नहीं मिला, फिर भी अनजान अनुरोधों की पुष्टि अवश्य करें।',
  },

  ordinaryMessageNote:
    'डेमो आकलन: कोई स्पष्ट धोखाधड़ी संकेत नहीं मिला, लेकिन अनपेक्षित संदेशों में सावधानी आवश्यक है।',
};

const te: PhoneTranslations = {
  setupTitle: 'ఎల్డర్‌షీల్డ్ రక్షణ',
  setupSubtitle: 'మీ భాషను ఒక్కసారి ఎంచుకోండి. ఈ వర్చువల్ ఫోన్ మోసపూరిత సందేశాలు మరియు కాల్స్‌ను గుర్తించి మీ భాషలో హెచ్చరిక వినిపిస్తుంది.',
  setupChooseLanguage: 'భాషను ఎంచుకోండి',
  setupStartBtn: 'ప్రారంభించు',

  demoDisclaimer:
    'డెమో మోడ్: ఈ ఫోన్ కల్పిత సందేశాలు మరియు నమూనా కాల్స్‌ను ఉపయోగిస్తుంది. ఇది మీ నిజమైన SMS, వాట్సాప్ లేదా ఫోన్ కాల్స్‌ను గమనించదు.',

  lockScreenStatus: 'ఎల్డర్‌షీల్డ్ రక్షణ ఆన్‌లో ఉంది',
  tapToUnlock: 'ఫోన్ తెరవడానికి ఇక్కడ నొక్కండి',
  noNewNotifications: 'కొత్త నోటిఫికేషన్లు లేవు. కల్పిత సందేశాలు ఆటోమేటిక్‌గా వస్తాయి.',
  shieldWidgetActive: 'ఎల్డర్‌షీల్డ్ సక్రియం',
  shieldWidgetPaused: 'సిమ్యులేషన్ ఆపబడింది',
  shieldWidgetSubtitle: 'ఆటోమేటిక్ SMS, వాట్సాప్ & కాల్ భద్రతా తనిఖీ',
  folderSafetyTools: 'భద్రత & సాధనాలు',

  appPhone: 'ఫోన్',
  appMessages: 'సंदేశాలు'.replace('సंदేశాలు', 'సందేశాలు'),
  appWhatsApp: 'వాట్సాప్',
  appContacts: 'కాంటాక్ట్స్',
  appSettings: 'సెట్టింగ్‌లు',
  appCamera: 'కెమెరా',
  appGallery: 'గ్యాలరీ',
  appElderShield: 'ఎల్డర్‌షీల్డ్',

  quickSettingsTitle: 'త్వరిత సెట్టింగ్‌లు',
  tileWifi: 'వై-ఫై',
  tileAutoSim: 'సిమ్యులేషన్',
  tileVoice: 'వాయిస్ హెచ్చరిక',
  tileRingtone: 'రింగ్‌టోన్',
  tileLargeText: 'పెద్ద అక్షరాలు',
  tileLockPhone: 'స్క్రీన్ లాక్',
  stateOn: 'ఆన్',
  stateOff: 'ఆఫ్',
  stateActive: 'ఆన్‌లో ఉంది',
  statePaused: 'ఆగింది',
  notificationsHeader: 'నోటిఫికేషన్లు',
  clearNotificationsBtn: 'అన్నీ తొలగించు',
  nowTimestamp: 'ఇప్పుడే',

  navBack: 'వెనుకకు',
  navHome: 'హోమ్',
  navRecents: 'ఇటీవలి యాప్స్',
  recentsEmpty: 'తెరిచిన యాప్స్ లేవు',
  closeAllAppsBtn: 'హోమ్ స్క్రీన్‌కు వెళ్లు',

  scamWarningTitle: 'మోసం హెచ్చరిక',
  suspiciousNoticeTitle: 'అనుమానాస్పద హెచ్చరిక',
  msgFraudulentLead: 'ఈ సందేశం మోసపూరితమైనది కావచ్చు.',
  callFraudulentLead: 'కాలర్ బ్యాంకు, పోలీస్ లేదా ప్రభుత్వ అధికారి పేరుతో మోసం చేస్తుండవచ్చు.',
  reasonPrefix: 'కారణం:',
  suspiciousRequestLabel: 'గుర్తించిన అనుమానాస్పద అంశం:',
  safetyAdvicePrefix: 'భద్రతా సలహా:',
  demoAssessmentNote:
    'ఇది డెమో ప్రమాద అంచనా మాత్రమే — పూర్తి హామీ కాదు. సాధారణంగా కనిపించే సందేశాలలో కూడా జాగ్రత్త అవసరం.',
  btnIUnderstand: 'నాకు అర్థమైంది',
  btnViewMessageDetails: 'సందేశ వివరాలు చూడండి',
  btnViewCallDetails: 'కాల్ వివరాలు చూడండి',
  btnDismissAlert: 'హెచ్చరిక మూసివేయి',

  voicePlayingStatus: 'హెచ్చరిక చదివి వినిపిస్తోంది...',
  voiceReadyStatus: 'వాయిస్ వివరణ సిద్ధంగా ఉంది',
  voiceMutedStatus: 'వాయిస్ మ్యూట్ చేయబడింది',
  voiceAutoplayPrompt: 'ఆటోమేటిక్ వాయిస్ హెచ్చరికల కోసం ఒక్కసారి ఇక్కడ నొక్కండి.',
  enableVoiceTapBtn: 'వాయిస్ ఆన్ చేయండి',
  voiceUnavailableStatus: 'ఈ పరికరంలో తెలుగు వాయిస్ అందుబాటులో లేదు. క్రింది రాతపూర్వక హెచ్చరికను చదవండి.',
  voiceUnsupportedStatus: 'ఈ బ్రౌజర్‌లో వాయిస్ సదుపాయం లేదు.',
  replayVoiceBtn: 'మళ్లీ వినండి',
  muteVoiceBtn: 'మ్యూట్',
  unmuteVoiceBtn: 'అన్‌మ్యూట్',

  incomingCallLabel: 'నమూనా ఇన్‌కమింగ్ కాల్',
  callConnectedLabel: 'నమూనా కాల్ కనెక్ట్ అయింది',
  callEndedLabel: 'కాల్ ముగిసింది',
  answerCallBtn: 'లిఫ్ట్ చేయి',
  declineCallBtn: 'కట్ చేయి',
  endCallBtn: 'కాల్ ముగించు',
  ringtoneOnLabel: 'రింగ్‌టోన్ ఆన్',
  ringtoneMutedLabel: 'సైలెంట్',
  suspiciousCallBannerTitle: 'ఎల్డర్‌షీల్డ్ హెచ్చరిక: నకిలీ అధికారి కాల్ అయ్యే అవకాశం',
  ordinaryCallNeutralNote:
    'ఈ నమూనా కాల్‌లో మోసపూరిత సంకేతాలు కనిపించలేదు. అనుకోని అభ్యర్థనలను ఎల్లప్పుడూ సరిచూసుకోండి.',
  openFullWarningBtn: 'పూర్తి హెచ్చరిక చూడండి',

  messagesEmpty: 'ఇంకా SMS సందేశాలు లేవు. కల్పిత సందేశాలు దానంతట అవే వస్తాయి.',
  whatsappSimSubtitle: 'నమూనా చాట్ · నిజమైన వాట్సాప్ కాదు',
  whatsappEmpty: 'ఇంకా నమూనా వాట్సాప్ సందేశాలు లేవు.',
  viewScamWarningBtn: 'మోసం హెచ్చరిక చూడండి',
  quickReplyVerify: 'నేను అధికారిక నంబర్ ద్వారా సరిచూసుకుంటాను.',
  quickReplyThanks: 'ధన్యవాదాలు, చూశాను.',
  youSenderLabel: 'మీరు',

  tabRecents: 'ఇటీవలివి',
  tabContacts: 'కాంటాక్ట్స్',
  tabKeypad: 'కీప్యాడ్',
  callActionBtn: 'కాల్',
  messageActionBtn: 'సందేశం',
  dialBtn: 'నమూనా కాల్ చేయి',
  noRecentCalls: 'ఇంకా నమూనా కాల్స్ లేవు.',
  contactRoleSon: 'కుమారుడు (కుటుంబం)',
  contactRoleDaughter: 'కుమార్తె (కుటుంబం)',
  contactRoleDoctor: 'ఫ్యామిలీ క్లినిక్',
  contactRoleBankHelpline: 'అధికారిక బ్యాంకు హెల్ప్‌లైన్ (డెమో)',
  contactRoleCyberHelpline: 'సైబర్ భద్రతా హెల్ప్‌లైన్ సమాచారం',
  cameraSimulatedNote: 'నమూనా కెమెరా వ్యూ (కెమెరా అనుమతి తీసుకోలేదు)',
  cameraCaptureBtn: 'ఫోటో తీయి',
  cameraSavedToast: 'నమూనా ఫోటో గ్యాలరీలో సేవ్ అయింది',
  galleryPhotoTea: 'ఉదయం టీ సమయం',
  galleryPhotoGarden: 'ఇంటి పూల తోట',
  galleryPhotoPark: 'పార్క్ నడక',
  galleryPhotoSnapshot: 'కెమెరా ఫోటో',
  elderShieldCenterDesc: 'గుర్తించిన మోసం హెచ్చరికలు మరియు నోటిఫికేషన్ చరిత్ర.',
  flaggedEventsHeader: 'మోసం హెచ్చరికలు',
  allEventsHeader: 'అన్ని నమూనా సంఘటనలు',

  settingsLanguageSection: 'భాష',
  settingsSimulationSection: 'ఎల్డర్‌షీల్డ్ సిమ్యులేషన్',
  settingsAutoSimDesc: 'కల్పిత SMS, వాట్సాప్ మరియు ఫోన్ కాల్ దృశ్యాలను ఆటోమేటిక్‌గా పొందండి.',
  pauseSimBtn: 'సిమ్యులేషన్ ఆపండి',
  resumeSimBtn: 'సిమ్యులేషన్ కొనసాగించండి',
  sendNextEventBtn: 'తదుపరి సంఘటన ఇప్పుడే చూపించు',
  restartSimBtn: 'మొదటి నుండి ప్రారంభించు',
  settingsVoiceSection: 'వాయిస్ వివరణ',
  speechSpeedLabel: 'మాట్లాడే వేగం',
  speedSlow: 'నెమ్మదిగా',
  speedCalm: 'నిదానంగా',
  speedNormal: 'సాధారణం',
  testVoiceBtn: 'వాయిస్ పరీక్షించు',
  testVoiceSample: 'నమస్కారం. ఎల్డర్‌షీల్డ్ భద్రతా హెచ్చరిక వాయిస్ స్పష్టంగా పనిచేస్తోంది.',
  settingsDisplaySection: 'డిస్‌ప్లే & అక్షర పరిమాణం',
  largeTextToggleLabel: 'చాలా పెద్ద అక్షరాలు',
  wallpaperLabel: 'హోమ్ వాల్‌పేపర్',
  wallpaperDawn: 'ఉదయపు కొండలు',
  wallpaperOcean: 'లోతైన సముద్రం',
  wallpaperTwilight: 'సాయంత్రపు వెలుగు',
  resetSetupBtn: 'భాష సెటప్ రీసెట్ చేయండి',
  confirmResetPrompt: 'ఫోన్ చరిత్రను తొలగించి మొదటి భాష ఎంపిక స్క్రీన్‌కు వెళ్లాలా?',
  confirmYesBtn: 'రీసెట్ చేయి',
  cancelBtn: 'రద్దు చేయి',

  riskHigh: 'అధిక ప్రమాదం',
  riskSuspicious: 'అనుమానాస్పదం',
  riskNoObvious: 'స్పష్టమైన హెచ్చరిక సంకేతాలు లేవు',

  categories: {
    bank_impersonation: 'బ్యాంకు పేరుతో నకిలీ హెచ్చరిక',
    otp_pin_theft: 'OTP లేదా PIN అభ్యర్థన',
    upi_scam: 'UPI చెల్లింపు లేదా రీఫండ్ మోసం',
    fake_kyc: 'నకిలీ KYC అప్‌డేట్',
    phishing_link: 'మోసపూరిత లింక్',
    parcel_delivery_scam: 'నకిలీ పార్శిల్ రుసుము',
    lottery_prize_scam: 'లాటరీ లేదా బహుమతి మోసం',
    fake_job_offer: 'నకిలీ ఉద్యోగ ఆఫర్',
    investment_scam: 'రెట్టింపు లాభాల పెట్టుబడి మోసం',
    govt_benefit_scam: 'ప్రభుత్వ పథకం పేరుతో మోసం',
    police_legal_threat: 'నకిలీ పోలీస్ లేదా చట్టపరమైన బెదిరింపు',
    electricity_threat: 'కరెంట్ కట్ చేస్తామనే బెదిరింపు',
    fake_loan_offer: 'నకిలీ తక్షణ లోన్',
    suspicious_app_install: 'ప్రమాదకర యాప్ (APK) ఇన్‌స్టాల్ అభ్యర్థన',
    remote_access_scam: 'స్క్రీన్ షేరింగ్ యాప్ మోసం',
    urgent_financial_request: 'అత్యవసర డబ్బు అభ్యర్థన',
    ordinary_message: 'సాధారణ సమాచారం',
  },

  warningSignReasons: {
    impersonates_bank: 'మిమ్మల్ని భయపెట్టడానికి మీ బ్యాంకు ఖాతా లేదా కార్డు బ్లాక్ అవుతుందని చెబుతోంది.',
    requests_otp_or_pin: 'మీ రహస్య OTP, PIN, పాస్‌వర్డ్ లేదా కార్డు CVV అడుగుతోంది.',
    suspicious_upi_collect: 'డబ్బు లేదా రీఫండ్ రావడానికి UPI PIN ఎంటర్ చేయమని చెబుతోంది.',
    fake_kyc_threat: 'వెంటనే KYC లేదా PAN అప్‌డేట్ చేయకపోతే ఖాతా నిలిచిపోతుందని బెదిరిస్తోంది.',
    suspicious_link: 'వ్యక్తిగత లేదా బ్యాంకు వివరాలు దొంగిలించే అనుమానాస్పద లింక్ ఇందులో ఉంది.',
    fake_parcel_fee: 'పార్శిల్ డెలివరీ కోసం రుసుము చెల్లించాలని కోరుతోంది.',
    unrealistic_prize_lottery: 'మీరు పాల్గొనని లాటరీ లేదా భారీ బహుమతి గెలిచారని ఆశ చూపుతోంది.',
    unrealistic_job_income: 'చిన్న ఆన్‌లైన్ పనులకు రోజుకు వేల రూపాయల ఆదాయం అని చెబుతోంది.',
    guaranteed_investment_return: 'తక్కువ సమయంలో డబ్బు రెట్టింపు అవుతుందని హామీ ఇస్తోంది.',
    fake_government_scheme: 'నమ్మకం కలిగించడానికి ప్రభుత్వ పెన్షన్ లేదా సబ్సిడీ పేరును వాడుకుంటోంది.',
    legal_or_police_intimidation: 'పోలీస్ అరెస్ట్ లేదా డిజిటల్ అరెస్ట్ వారెంట్ అని భయపెడుతోంది.',
    tonight_utility_cutoff: 'ఈ రాత్రే ఇంటి కరెంట్ కట్ చేస్తామని తొందరపెడుతోంది.',
    upfront_loan_fee: 'తక్షణ లోన్ కోసం ముందుగా ప్రాసెసింగ్ ఫీజు అడుగుతోంది.',
    apk_file_download: 'ప్రమాదకరమైన APK యాప్ ఫైల్ ఇన్‌స్టాల్ చేయమని కోరుతోంది.',
    remote_screen_sharing_app: 'AnyDesk లేదా QuickSupport వంటి స్క్రీన్ షేరింగ్ యాప్ వేయమంటోంది.',
    urgent_pressure_tactic: 'మీరు సరిచూసుకోకుండా వెంటనే స్పందించాలని తొందరపెడుతోంది.',
    unverified_callback_number: 'నిర్ధారణ లేని ప్రైవేట్ నంబర్‌కు కాల్ చేయమని ఒత్తిడి చేస్తోంది.',
    caller_org_impersonation: 'కాలర్ తాను బ్యాంకు, పోలీస్, ప్రభుత్వ కార్యాలయం లేదా విద్యుత్ శాఖ అధికారిని అని చెబుతున్నారు.',
  },

  safetyAdviceByCategory: {
    bank_impersonation:
      'లింక్ నొక్కవద్దు లేదా బ్యాంకు వివరాలు చెప్పవద్దు. మీ బ్యాంకు కార్డు వెనుక ఉన్న అధికారిక నంబర్‌కు కాల్ చేయండి లేదా బ్రాంచ్‌కు వెళ్లండి.',
    otp_pin_theft:
      'మీ OTP, PIN, CVV లేదా పాస్‌వర్డ్ ఎవరికీ చెప్పకండి. నిజమైన అధికారులు అవి ఎప్పుడూ అడగరు.',
    upi_scam:
      'మీ UPI PIN ఎంటర్ చేయవద్దు. UPI PIN వేస్తే మీ ఖాతా నుండి డబ్బు కట్ అవుతుంది.',
    fake_kyc:
      'లింక్ తెరవకండి. నేరుగా బ్యాంకు బ్రాంచ్‌కు వెళ్లి మాత్రమే KYC వివరాలు సరిచూసుకోండి.',
    phishing_link:
      'ఈ లింక్‌పై నొక్కవద్దు. కుటుంబ సభ్యులను అడిగి నిర్ధారించుకోండి.',
    parcel_delivery_scam:
      'సందేశంలోని లింక్ ద్వారా రుసుము చెల్లించవద్దు. అసలు షాపింగ్ యాప్‌లోనే ఆర్డర్ తనిఖీ చేయండి.',
    lottery_prize_scam:
      'ఈ సందేశాన్ని పట్టించుకోవద్దు. బహుమతి కోసం ఎలాంటి రుసుము చెల్లించవద్దు.',
    fake_job_offer:
      'తెలియని గ్రూపులలో చేరవద్దు లేదా ఆన్‌లైన్ పనుల కోసం డబ్బు కట్టవద్దు.',
    investment_scam:
      'డబ్బు పంపవద్దు. పెట్టుబడి పెట్టే ముందు నేరుగా మీ బ్యాంకులో సంప్రదించండి.',
    govt_benefit_scam:
      'ఆధార్, OTP లేదా బ్యాంకు వివరాలు ఇవ్వవద్దు. అధికారిక ప్రభుత్వ సేవా కేంద్రంలో కనుక్కోండి.',
    police_legal_threat:
      'భయపడకుండా వెంటనే కాల్ కట్ చేయండి. పోలీసులు ఫోన్‌లో డబ్బు అడగరు, డిజిటల్ అరెస్ట్ చేయరు. కుటుంబ సభ్యులకు చెప్పండి.',
    electricity_threat:
      'సందేశంలోని నంబర్‌కు కాల్ చేయవద్దు. మీ కరెంట్ బిల్లుపై ఉన్న అధికారిక కస్టమర్ కేర్ నంబర్‌కు కాల్ చేయండి.',
    fake_loan_offer:
      'లోన్ కోసం ముందస్తు ఫీజు కట్టవద్దు మరియు గుర్తింపు పత్రాలు పంపవద్దు.',
    suspicious_app_install:
      'SMS లేదా వాట్సాప్ ద్వారా వచ్చే APK ఫైళ్లను ఎప్పుడూ ఇన్‌స్టాల్ చేయవద్దు.',
    remote_access_scam:
      'తెలియని వ్యక్తులు చెబితే AnyDesk లేదా QuickSupport యాప్ వేయకండి. వారు మీ ఫోన్ స్క్రీన్ మరియు OTPలు చూడగలరు.',
    urgent_financial_request:
      'డబ్బు పంపే ముందు ఆగి, మీ ఫోన్‌లో ముందే సేవ్ చేసిన నంబర్ ద్వారా కుటుంబ సభ్యులకు కాల్ చేసి మాట్లాడండి.',
    ordinary_message:
      'స్పష్టమైన మోస సంకేతాలు లేవు, అయినా అనుకోని అభ్యర్థనలను నిర్ధారించుకోండి.',
  },

  ordinaryMessageNote:
    'డెమో అంచనా: స్పష్టమైన మోస సంకేతాలు కనిపించలేదు, కానీ అపరిచిత సందేశాల పట్ల జాగ్రత్తగా ఉండండి.',
};

const ml: PhoneTranslations = {
  setupTitle: 'എൽഡർഷീൽഡ് സുരക്ഷ',
  setupSubtitle: 'നിങ്ങളുടെ ഭാഷ ഒരുതവണ തിരഞ്ഞെടുക്കുക. വ്യാജ സന്ദേശങ്ങളും കോളുകളും ഫോൺ സ്വയം തിരിച്ചറിഞ്ഞ് മലയാളത്തിൽ മുന്നറിയിപ്പ് കേൾപ്പിക്കും.',
  setupChooseLanguage: 'ഭാഷ തിരഞ്ഞെടുക്കുക',
  setupStartBtn: 'ആരംഭിക്കുക',

  demoDisclaimer:
    'ഡെമോ മോഡ്: ഈ ഫോൺ സാങ്കൽപ്പിക സന്ദേശങ്ങളും സിമുലേറ്റഡ് കോളുകളുമാണ് ഉപയോഗിക്കുന്നത്. നിങ്ങളുടെ യഥാർത്ഥ SMS, വാട്ട്‌സ്ആപ്പ്, ഫോൺ കോളുകൾ എന്നിവ നിരീക്ഷിക്കുന്നില്ല.',

  lockScreenStatus: 'എൽഡർഷീൽഡ് സുരക്ഷ സജീവം',
  tapToUnlock: 'ഫോൺ തുറക്കാൻ തൊടുക',
  noNewNotifications: 'പുതിയ അറിയിപ്പുകളില്ല. സാങ്കൽപ്പിക സന്ദേശങ്ങൾ തനിയെ എത്തും.',
  shieldWidgetActive: 'എൽഡർഷീൽഡ് സജീവം',
  shieldWidgetPaused: 'സിമുലേഷൻ നിർത്തി',
  shieldWidgetSubtitle: 'സ്വയം പ്രവർത്തിക്കുന്ന SMS, വാട്ട്‌സ്ആപ്പ്, കോൾ സുരക്ഷ',
  folderSafetyTools: 'സുരക്ഷയും ഉപകരണങ്ങളും',

  appPhone: 'ഫോൺ',
  appMessages: 'സന്ദേശങ്ങൾ',
  appWhatsApp: 'വാട്ട്‌സ്ആപ്പ്',
  appContacts: 'വിലാസങ്ങൾ',
  appSettings: 'ക്രമീകരണങ്ങൾ',
  appCamera: 'ക്യാമറ',
  appGallery: 'ഗാലറി',
  appElderShield: 'എൽഡർഷീൽഡ്',

  quickSettingsTitle: 'വേഗത്തിലുള്ള ക്രമീകരണങ്ങൾ',
  tileWifi: 'വൈ-ഫൈ',
  tileAutoSim: 'സിമുലേഷൻ',
  tileVoice: 'ശബ്ദ മുന്നറിയിപ്പ്',
  tileRingtone: 'റിംഗ്‌ടോൺ',
  tileLargeText: 'വലിയ അക്ഷരം',
  tileLockPhone: 'സ്ക്രീൻ ലോക്ക്',
  stateOn: 'ഓൺ',
  stateOff: 'ഓഫ്',
  stateActive: 'സജീവം',
  statePaused: 'നിർത്തി',
  notificationsHeader: 'അറിയിപ്പുകൾ',
  clearNotificationsBtn: 'എല്ലാം മായ്ക്കുക',
  nowTimestamp: 'ഇപ്പോൾ',

  navBack: 'പിന്നോട്ട്',
  navHome: 'ഹോം',
  navRecents: 'സമീപകാല ആപ്പുകൾ',
  recentsEmpty: 'തുറന്ന ആപ്പുകളൊന്നുമില്ല',
  closeAllAppsBtn: 'ഹോം സ്ക്രീനിലേക്ക് മടങ്ങുക',

  scamWarningTitle: 'തട്ടിപ്പ് മുന്നറിയിപ്പ്',
  suspiciousNoticeTitle: 'സംശയാസ്പദ മുന്നറിയിപ്പ്',
  msgFraudulentLead: 'ഈ സന്ദേശം തട്ടിപ്പാകാൻ സാധ്യതയുണ്ട്.',
  callFraudulentLead: 'വിളിക്കുന്നയാൾ ബാങ്ക്, പോലീസ് അല്ലെങ്കിൽ സർക്കാർ ഉദ്യോഗസ്ഥൻ എന്ന വ്യാജേന കബളിപ്പിക്കാൻ സാധ്യതയുണ്ട്.',
  reasonPrefix: 'കാരണം:',
  suspiciousRequestLabel: 'കണ്ടെത്തിയ സംശയാസ്പദമായ ഭാഗം:',
  safetyAdvicePrefix: 'സുരക്ഷാ നിർദ്ദേശം:',
  demoAssessmentNote:
    'ഇതൊരു ഡെമോ വിലയിരുത്തൽ മാത്രമാണ് — പൂർണ്ണ ഉറപ്പല്ല. സാധാരണയായി തോന്നുന്ന സന്ദേശങ്ങളിലും ജാഗ്രത വേണം.',
  btnIUnderstand: 'മനസ്സിലായി',
  btnViewMessageDetails: 'സന്ദേശ വിവരങ്ങൾ കാണുക',
  btnViewCallDetails: 'കോൾ വിവരങ്ങൾ കാണുക',
  btnDismissAlert: 'മുന്നറിയിപ്പ് അടയ്ക്കുക',

  voicePlayingStatus: 'മുന്നറിയിപ്പ് വായിച്ചു കേൾപ്പിക്കുന്നു...',
  voiceReadyStatus: 'ശബ്ദ വിശദീകരണം തയ്യാറാണ്',
  voiceMutedStatus: 'ശബ്ദം മ്യൂട്ട് ചെയ്തിരിക്കുന്നു',
  voiceAutoplayPrompt: 'സ്വയമേവയുള്ള ശബ്ദ മുന്നറിയിപ്പിനായി ഒരുതവണ തൊടുക.',
  enableVoiceTapBtn: 'ശബ്ദം ഓണാക്കുക',
  voiceUnavailableStatus: 'ഈ ഉപകരണത്തിൽ മലയാളം ശബ്ദം ലഭ്യമല്ല. താഴെയുള്ള എഴുതിയ മുന്നറിയിപ്പ് വായിക്കുക.',
  voiceUnsupportedStatus: 'ഈ ബ്രൗസറിൽ ശബ്ദ വായന ലഭ്യമല്ല.',
  replayVoiceBtn: 'വീണ്ടും കേൾക്കുക',
  muteVoiceBtn: 'മ്യൂട്ട്',
  unmuteVoiceBtn: 'ശബ്ദം ഓൺ',

  incomingCallLabel: 'സാങ്കൽപ്പിക ഇൻകമിംഗ് കോൾ',
  callConnectedLabel: 'സാങ്കൽപ്പിക കോൾ തുടരുന്നു',
  callEndedLabel: 'കോൾ അവസാനിച്ചു',
  answerCallBtn: 'എടുക്കുക',
  declineCallBtn: 'നിരസിക്കുക',
  endCallBtn: 'കോൾ നിർത്തുക',
  ringtoneOnLabel: 'റിംഗ്‌ടോൺ ഓൺ',
  ringtoneMutedLabel: 'നിശബ്ദം',
  suspiciousCallBannerTitle: 'എൽഡർഷീൽഡ് മുന്നറിയിപ്പ്: വ്യാജ ഉദ്യോഗസ്ഥ കോളാകാൻ സാധ്യത',
  ordinaryCallNeutralNote:
    'ഈ സാങ്കൽപ്പിക കോളിൽ തട്ടിപ്പ് സൂചനകളൊന്നും കണ്ടെത്തിയില്ല. അപരിചിതമായ ആവശ്യങ്ങൾ എപ്പോഴും പരിശോധിക്കുക.',
  openFullWarningBtn: 'പൂർണ്ണ മുന്നറിയിപ്പ് കാണുക',

  messagesEmpty: 'ഇതുവരെ SMS സന്ദേശങ്ങളില്ല. സാങ്കൽപ്പിക സന്ദേശങ്ങൾ തനിയെ എത്തും.',
  whatsappSimSubtitle: 'സാങ്കൽപ്പിക ചാറ്റ് · യഥാർത്ഥ വാട്ട്‌സ്ആപ്പ് അല്ല',
  whatsappEmpty: 'ഇതുവരെ സാങ്കൽപ്പിക വാട്ട്‌സ്ആപ്പ് സന്ദേശങ്ങളില്ല.',
  viewScamWarningBtn: 'തട്ടിപ്പ് മുന്നറിയിപ്പ് കാണുക',
  quickReplyVerify: 'ഞാൻ ഔദ്യോഗിക നമ്പറിൽ വിളിച്ചു പരിശോധിക്കാം.',
  quickReplyThanks: 'നന്ദി, മനസ്സിലായി.',
  youSenderLabel: 'നിങ്ങൾ',

  tabRecents: 'സമീപകാലം',
  tabContacts: 'വിലാസങ്ങൾ',
  tabKeypad: 'കീപാഡ്',
  callActionBtn: 'വിളിക്കുക',
  messageActionBtn: 'സന്ദേശം',
  dialBtn: 'സാങ്കൽപ്പിക കോൾ',
  noRecentCalls: 'ഇതുവരെ സാങ്കൽപ്പിക കോളുകളില്ല.',
  contactRoleSon: 'മകൻ (കുടുംബം)',
  contactRoleDaughter: 'മകൾ (കുടുംബം)',
  contactRoleDoctor: 'ഫാമിലി ക്ലിനിക്',
  contactRoleBankHelpline: 'ഔദ്യോഗിക ബാങ്ക് ഹെൽപ്പ്‌ലൈൻ (ഡെമോ)',
  contactRoleCyberHelpline: 'സൈബർ സുരക്ഷാ ഹെൽപ്പ്‌ലൈൻ വിവരം',
  cameraSimulatedNote: 'സാങ്കൽപ്പിക ക്യാമറ പ്രിവ്യൂ (ക്യാമറ അനുമതി എടുത്തിട്ടില്ല)',
  cameraCaptureBtn: 'ചിത്രം എടുക്കുക',
  cameraSavedToast: 'ചിത്രം ഗാലറിയിൽ സൂക്ഷിച്ചു',
  galleryPhotoTea: 'രാവിലത്തെ ചായ',
  galleryPhotoGarden: 'വീട്ടിലെ പൂന്തോട്ടം',
  galleryPhotoPark: 'പാർക്കിലെ നടത്തം',
  galleryPhotoSnapshot: 'ക്യാമറ ചിത്രം',
  elderShieldCenterDesc: 'തട്ടിപ്പ് മുന്നറിയിപ്പുകളും അറിയിപ്പ് ചരിത്രവും കാണുക.',
  flaggedEventsHeader: 'മുന്നറിയിപ്പ് നൽകിയവ',
  allEventsHeader: 'എല്ലാ സാങ്കൽപ്പിക സംഭവങ്ങളും',

  settingsLanguageSection: 'ഭാഷ',
  settingsSimulationSection: 'എൽഡർഷീൽഡ് സിമുലേഷൻ',
  settingsAutoSimDesc: 'സാങ്കൽപ്പിക SMS, വാട്ട്‌സ്ആപ്പ്, ഫോൺ കോളുകൾ തനിയെ ലഭ്യമാക്കുക.',
  pauseSimBtn: 'സിമുലേഷൻ നിർത്തുക',
  resumeSimBtn: 'സിമുലേഷൻ തുടരുക',
  sendNextEventBtn: 'അടുത്ത സംഭവം ഇപ്പോൾ കാണിക്കുക',
  restartSimBtn: 'ആദ്യം മുതൽ തുടങ്ങുക',
  settingsVoiceSection: 'ശബ്ദ വിശദീകരണം',
  speechSpeedLabel: 'വായനാ വേഗത',
  speedSlow: 'സാവധാനം',
  speedCalm: 'ശാന്തം',
  speedNormal: 'സാധാരണ',
  testVoiceBtn: 'ശബ്ദം പരിശോധിക്കുക',
  testVoiceSample: 'നമസ്കാരം. എൽഡർഷീൽഡ് സുരക്ഷാ മുന്നറിയിപ്പ് ശബ്ദം വ്യക്തമായി പ്രവർത്തിക്കുന്നു.',
  settingsDisplaySection: 'ഡിസ്പ്ലേയും അക്ഷര വലുപ്പവും',
  largeTextToggleLabel: 'വളരെ വലിയ അക്ഷരങ്ങൾ',
  wallpaperLabel: 'ഹോം വാൾപേപ്പർ',
  wallpaperDawn: 'മഞ്ഞുമലകൾ',
  wallpaperOcean: 'ആഴക്കടൽ നീല',
  wallpaperTwilight: 'സന്ധ്യാ വെളിച്ചം',
  resetSetupBtn: 'ഭാഷാ ക്രമീകരണം പുനഃസജ്ജമാക്കുക',
  confirmResetPrompt: 'ഫോൺ ചരിത്രം മായ്ച്ച് ആദ്യ ഭാഷാ തിരഞ്ഞെടുപ്പിലേക്ക് മടങ്ങണമോ?',
  confirmYesBtn: 'പുനഃസജ്ജമാക്കുക',
  cancelBtn: 'റദ്ദാക്കുക',

  riskHigh: 'ഉയർന്ന അപകടസാധ്യത',
  riskSuspicious: 'സംശയാസ്പദം',
  riskNoObvious: 'വ്യക്തമായ അപകട സൂചനകളില്ല',

  categories: {
    bank_impersonation: 'ബാങ്കിന്റെ പേരിലുള്ള വ്യാജ സന്ദേശം',
    otp_pin_theft: 'OTP അല്ലെങ്കിൽ PIN ആവശ്യം',
    upi_scam: 'UPI പണമിടപാട് തട്ടിപ്പ്',
    fake_kyc: 'വ്യാജ KYC അപ്ഡേറ്റ്',
    phishing_link: 'വ്യാജ വെബ് ലിങ്ക്',
    parcel_delivery_scam: 'വ്യാജ പാഴ്സൽ ഫീസ്',
    lottery_prize_scam: 'ലോട്ടറി അല്ലെങ്കിൽ സമ്മാന തട്ടിപ്പ്',
    fake_job_offer: 'വ്യാജ തൊഴിൽ വാഗ്ദാനം',
    investment_scam: 'ഇരട്ടി ലാഭ നിക്ഷേപ തട്ടിപ്പ്',
    govt_benefit_scam: 'സർക്കാർ പദ്ധതിയുടെ പേരിൽ തട്ടിപ്പ്',
    police_legal_threat: 'വ്യാജ പോലീസ് അല്ലെങ്കിൽ നിയമ ഭീഷണി',
    electricity_threat: 'വൈദ്യുതി വിച്ഛേദിക്കുമെന്ന ഭീഷണി',
    fake_loan_offer: 'വ്യാജ തൽക്ഷണ വായ്പ',
    suspicious_app_install: 'അപകടകരമായ ആപ്പ് (APK) ആവശ്യം',
    remote_access_scam: 'സ്ക്രീൻ ഷെയറിങ് ആപ്പ് തട്ടിപ്പ്',
    urgent_financial_request: 'അടിയന്തര പണ ആവശ്യം',
    ordinary_message: 'സാധാരണ അറിയിപ്പ്',
  },

  warningSignReasons: {
    impersonates_bank: 'നിങ്ങളെ ഭയപ്പെടുത്താൻ ബാങ്ക് അക്കൗണ്ട് അല്ലെങ്കിൽ കാർഡ് ബ്ലോക്ക് ആകുമെന്ന് പറയുന്നു.',
    requests_otp_or_pin: 'നിങ്ങളുടെ രഹസ്യ OTP, PIN, പാസ്‌വേഡ് അല്ലെങ്കിൽ CVV ചോദിക്കുന്നു.',
    suspicious_upi_collect: 'പണമോ റീഫണ്ടോ ലഭിക്കാൻ UPI PIN നൽകാൻ ആവശ്യപ്പെടുന്നു.',
    fake_kyc_threat: 'ഉടൻ KYC അപ്ഡേറ്റ് ചെയ്തില്ലെങ്കിൽ അക്കൗണ്ട് മരവിപ്പിക്കുമെന്ന് ഭീഷണിപ്പെടുത്തുന്നു.',
    suspicious_link: 'വ്യക്തിഗത വിവരങ്ങളോ ബാങ്ക് വിവരങ്ങളോ മോഷ്ടിക്കുന്ന വ്യാജ ലിങ്ക് അടങ്ങിയിരിക്കുന്നു.',
    fake_parcel_fee: 'പാഴ്സൽ വിട്ടുനൽകാൻ ഫീസ് അടയ്ക്കാൻ ആവശ്യപ്പെടുന്നു.',
    unrealistic_prize_lottery: 'പങ്കെടുക്കാത്ത ലോട്ടറിയോ സമ്മാനമോ അടിച്ചെന്ന് വാഗ്ദാനം ചെയ്യുന്നു.',
    unrealistic_job_income: 'ചെറിയ ഓൺലൈൻ ജോലികൾക്ക് ദിവസവും വലിയ വരുമാനം വാഗ്ദാനം ചെയ്യുന്നു.',
    guaranteed_investment_return: 'കുറഞ്ഞ സമയത്തിനുള്ളിൽ പണം ഇരട്ടിയാകുമെന്ന് ഉറപ്പുനൽകുന്നു.',
    fake_government_scheme: 'വിശ്വാസം നേടാൻ സർക്കാർ പെൻഷൻ അല്ലെങ്കിൽ സഹായപദ്ധതിയുടെ പേര് ഉപയോഗിക്കുന്നു.',
    legal_or_police_intimidation: 'പോലീസ് അറസ്റ്റ് അല്ലെങ്കിൽ ഡിജിറ്റൽ അറസ്റ്റ് വാറണ്ട് എന്ന് ഭയപ്പെടുത്തുന്നു.',
    tonight_utility_cutoff: 'ഇന്ന് രാത്രി തന്നെ വീട്ടിലെ വൈദ്യുതി വിച്ഛേദിക്കുമെന്ന് ഭീഷണിപ്പെടുത്തുന്നു.',
    upfront_loan_fee: 'വായ്പ ലഭിക്കാൻ മുൻകൂട്ടി പ്രോസസ്സിംഗ് ഫീസ് ചോദിക്കുന്നു.',
    apk_file_download: 'സുരക്ഷിതമല്ലാത്ത APK ആപ്പ് ഫയൽ ഇൻസ്റ്റാൾ ചെയ്യാൻ പറയുന്നു.',
    remote_screen_sharing_app: 'AnyDesk അല്ലെങ്കിൽ QuickSupport പോലുള്ള സ്ക്രീൻ ഷെയറിങ് ആപ്പ് ഇടാൻ പറയുന്നു.',
    urgent_pressure_tactic: 'പരിശോധിക്കാൻ സമയം നൽകാതെ ഉടൻ പ്രവർത്തിക്കാൻ സമ്മർദ്ദം ചെലുത്തുന്നു.',
    unverified_callback_number: 'സ്ഥിരീകരിക്കാത്ത ഫോൺ നമ്പറിലേക്ക് വിളിക്കാൻ നിർബന്ധിക്കുന്നു.',
    caller_org_impersonation: 'വിളിക്കുന്നയാൾ ബാങ്ക്, പോലീസ്, സർക്കാർ ഓഫീസ് അല്ലെങ്കിൽ വൈദ്യുതി ബോർഡ് ഉദ്യോഗസ്ഥനാണെന്ന് അവകാശപ്പെടുന്നു.',
  },

  safetyAdviceByCategory: {
    bank_impersonation:
      'ലിങ്കിൽ തൊടുകയോ ബാങ്ക് വിവരങ്ങൾ നൽകുകയോ ചെയ്യരുത്. ബാങ്ക് കാർഡിന് പിന്നിലുള്ള ഔദ്യോഗിക നമ്പറിൽ വിളിക്കുക അല്ലെങ്കിൽ ശാഖയിൽ പോകുക.',
    otp_pin_theft:
      'നിങ്ങളുടെ OTP, PIN, CVV, പാസ്‌വേഡ് എന്നിവ ആരുമായും പങ്കിടരുത്. യഥാർത്ഥ ഉദ്യോഗസ്ഥർ ഇവ ചോദിക്കില്ല.',
    upi_scam:
      'നിങ്ങളുടെ UPI PIN നൽകരുത്. UPI PIN നൽകിയാൽ അക്കൗണ്ടിൽ നിന്ന് പണം നഷ്ടപ്പെടും.',
    fake_kyc:
      'ലിങ്ക് തുറക്കരുത്. ബാങ്ക് ശാഖയിൽ നേരിട്ട് പോയി മാത്രം KYC പരിശോധിക്കുക.',
    phishing_link:
      'ഈ ലിങ്കിൽ അമർത്തരുത്. കുടുംബാംഗങ്ങളോട് ചോദിച്ച് ഉറപ്പുവരുത്തുക.',
    parcel_delivery_scam:
      'സന്ദേശത്തിലെ ലിങ്ക് വഴി ഫീസ് അടയ്ക്കരുത്. യഥാർത്ഥ ഷോപ്പിംഗ് ആപ്പിൽ മാത്രം ഓർഡർ പരിശോധിക്കുക.',
    lottery_prize_scam:
      'ഈ സന്ദേശം അവഗണിക്കുക. സമ്മാനത്തിനായി ഒരിക്കലും ഫീസ് അടയ്ക്കരുത്.',
    fake_job_offer:
      'പരിചയമില്ലാത്ത ഗ്രൂപ്പുകളിൽ ചേരുകയോ ഓൺലൈൻ ജോലിക്കായി പണം നൽകുകയോ ചെയ്യരുത്.',
    investment_scam:
      'പണം അയയ്ക്കരുത്. നിക്ഷേപം നടത്തുന്നതിന് മുമ്പ് നേരിട്ട് ബാങ്കുമായി സംസാരിക്കുക.',
    govt_benefit_scam:
      'ആധാർ, OTP, ബാങ്ക് വിവരങ്ങൾ നൽകരുത്. ഔദ്യോഗിക സർക്കാർ കേന്ദ്രത്തിൽ അന്വേഷിക്കുക.',
    police_legal_threat:
      'ഭയപ്പെടാതെ ഉടൻ കോൾ കട്ട് ചെയ്യുക. പോലീസ് ഫോണിലൂടെ പണം ചോദിക്കുകയോ ഡിജിറ്റൽ അറസ്റ്റ് നടത്തുകയോ ഇല്ല. കുടുംബാംഗങ്ങളെ അറിയിക്കുക.',
    electricity_threat:
      'സന്ദേശത്തിലെ നമ്പറിലേക്ക് വിളിക്കരുത്. വൈദ്യുതി ബില്ലിലെ ഔദ്യോഗിക കസ്റ്റമർ കെയർ നമ്പറിൽ വിളിക്കുക.',
    fake_loan_offer:
      'വായ്പയ്ക്കായി മുൻകൂർ ഫീസ് അടയ്ക്കുകയോ രേഖകൾ അയയ്ക്കുകയോ ചെയ്യരുത്.',
    suspicious_app_install:
      'SMS അല്ലെങ്കിൽ വാട്ട്‌സ്ആപ്പ് വഴി വരുന്ന APK ഫയലുകൾ ഒരിക്കലും ഇൻസ്റ്റാൾ ചെയ്യരുത്.',
    remote_access_scam:
      'അപരിചിതർ പറഞ്ഞാൽ AnyDesk അല്ലെങ്കിൽ QuickSupport ആപ്പ് ഇൻസ്റ്റാൾ ചെയ്യരുത്. അവർക്ക് നിങ്ങളുടെ സ്ക്രീനും OTP-യും കാണാനാകും.',
    urgent_financial_request:
      'പണം അയയ്ക്കുന്നതിന് മുമ്പ്, ഫോണിൽ സേവ് ചെയ്തിട്ടുള്ള നമ്പറിൽ കുടുംബാംഗത്തെ നേരിട്ട് വിളിച്ച് ഉറപ്പുവരുത്തുക.',
    ordinary_message:
      'വ്യക്തമായ തട്ടിപ്പ് സൂചനകളില്ല; എങ്കിലും അപ്രതീക്ഷിത ആവശ്യങ്ങൾ പരിശോധിക്കുക.',
  },

  ordinaryMessageNote:
    'ഡെമോ വിലയിരുത്തൽ: വ്യക്തമായ തട്ടിപ്പ് സൂചനകളില്ല, എങ്കിലും അപരിചിത സന്ദേശങ്ങളിൽ ശ്രദ്ധ വേണം.',
};

const kn: PhoneTranslations = {
  setupTitle: 'ಎಲ್ಡರ್‌ಶೀಲ್ಡ್ ರಕ್ಷಣೆ',
  setupSubtitle: 'ನಿಮ್ಮ ಭಾಷೆಯನ್ನು ಒಮ್ಮೆ ಆಯ್ಕೆಮಾಡಿ. ಈ ವರ್ಚುವಲ್ ಫೋನ್ ವಂಚನೆಯ ಸಂದೇಶಗಳು ಮತ್ತು ಕರೆಗಳನ್ನು ಗುರುತಿಸಿ ಕನ್ನಡದಲ್ಲಿ ಎಚ್ಚರಿಕೆ ನೀಡುತ್ತದೆ.',
  setupChooseLanguage: 'ಭಾಷೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ',
  setupStartBtn: 'ಪ್ರಾರಂಭಿಸಿ',

  demoDisclaimer:
    'ಡೆಮೊ ಮೋಡ್: ಈ ಫೋನ್ ಕಾಲ್ಪನಿಕ ಸಂದೇಶಗಳು ಮತ್ತು ಮಾದರಿ ಕರೆಗಳನ್ನು ಬಳಸುತ್ತದೆ. ಇದು ನಿಮ್ಮ ನಿಜವಾದ SMS, ವಾಟ್ಸಾಪ್ ಅಥವಾ ಫೋನ್ ಕರೆಗಳನ್ನು ಗಮನಿಸುವುದಿಲ್ಲ.',

  lockScreenStatus: 'ಎಲ್ಡರ್‌ಶೀಲ್ಡ್ ರಕ್ಷಣೆ ಸಕ್ರಿಯ',
  tapToUnlock: 'ಫೋನ್ ತೆರೆಯಲು ಇಲ್ಲಿ ಒತ್ತಿರಿ',
  noNewNotifications: 'ಹೊಸ ಸೂಚನೆಗಳಿಲ್ಲ. ಕಾಲ್ಪನಿಕ ಸಂದೇಶಗಳು ತಾನಾಗಿಯೇ ಬರುತ್ತವೆ.',
  shieldWidgetActive: 'ಎಲ್ಡರ್‌ಶೀಲ್ಡ್ ಸಕ್ರಿಯ',
  shieldWidgetPaused: 'ಸಿಮ್ಯುಲೇಷನ್ ನಿಂತಿದೆ',
  shieldWidgetSubtitle: 'ಸ್ವಯಂಚಾಲಿತ SMS, ವಾಟ್ಸಾಪ್ ಮತ್ತು ಕರೆ ಸುರಕ್ಷತಾ ಪರಿಶೀಲನೆ',
  folderSafetyTools: 'ಸುರಕ್ಷತೆ ಮತ್ತು ಸಾಧನಗಳು',

  appPhone: 'ಫೋನ್',
  appMessages: 'ಸಂದೇಶಗಳು',
  appWhatsApp: 'ವಾಟ್ಸಾಪ್',
  appContacts: 'ಸಂಪರ್ಕಗಳು',
  appSettings: 'ಸೆಟ್ಟಿಂಗ್‌ಗಳು',
  appCamera: 'ಕ್ಯಾಮೆರಾ',
  appGallery: 'ಗ್ಯಾಲರಿ',
  appElderShield: 'ಎಲ್ಡರ್‌ಶೀಲ್ಡ್',

  quickSettingsTitle: 'ತ್ವರಿತ ಸೆಟ್ಟಿಂಗ್‌ಗಳು',
  tileWifi: 'ವೈ-ಫೈ',
  tileAutoSim: 'ಸಿಮ್ಯುಲೇಷನ್',
  tileVoice: 'ಧ್ವನಿ ಎಚ್ಚರಿಕೆ',
  tileRingtone: 'ರಿಂಗ್‌ಟೋನ್',
  tileLargeText: 'ದೊಡ್ಡ ಅಕ್ಷರ',
  tileLockPhone: 'ಸ್ಕ್ರೀನ್ ಲಾಕ್',
  stateOn: 'ಆನ್',
  stateOff: 'ಆಫ್',
  stateActive: 'ಸಕ್ರಿಯ',
  statePaused: 'ನಿಂತಿದೆ',
  notificationsHeader: 'ಸೂಚನೆಗಳು',
  clearNotificationsBtn: 'ಎಲ್ಲಾ ಅಳಿಸಿ',
  nowTimestamp: 'ಈಗ',

  navBack: 'ಹಿಂದೆ',
  navHome: 'ಮುಖಪುಟ',
  navRecents: 'ಇತ್ತೀಚಿನ ಆಪ್‌ಗಳು',
  recentsEmpty: 'ಯಾವುದೇ ಆಪ್ ತೆರೆದಿಲ್ಲ',
  closeAllAppsBtn: 'ಮುಖಪುಟಕ್ಕೆ ಹಿಂತಿರುಗಿ',

  scamWarningTitle: 'ವಂಚನೆ ಎಚ್ಚರಿಕೆ',
  suspiciousNoticeTitle: 'ಸಂಶಯಾಸ್ಪದ ಎಚ್ಚರಿಕೆ',
  msgFraudulentLead: 'ಈ ಸಂದೇಶವು ವಂಚನೆಯಾಗಿರಬಹುದು.',
  callFraudulentLead: 'ಕರೆ ಮಾಡಿದವರು ಬ್ಯಾಂಕ್, ಪೊಲೀಸ್ ಅಥವಾ ಸರ್ಕಾರಿ ಅಧಿಕಾರಿಯ ಸೋಗಿನಲ್ಲಿ ಮೋಸ ಮಾಡುತ್ತಿರಬಹುದು.',
  reasonPrefix: 'ಕಾರಣ:',
  suspiciousRequestLabel: 'ಪತ್ತೆಯಾದ ಸಂಶಯಾಸ್ಪದ ಭಾಗ:',
  safetyAdvicePrefix: 'ಸುರಕ್ಷತಾ ಸಲಹೆ:',
  demoAssessmentNote:
    'ಇದು ಡೆಮೊ ಅಪಾಯದ ಅಂದಾಜು ಮಾತ್ರ — ಸಂಪೂರ್ಣ ಖಾತರಿಯಲ್ಲ. ಸಾಮಾನ್ಯವಾಗಿ ಕಾಣುವ ಸಂದೇಶಗಳಲ್ಲೂ ಎಚ್ಚರವಿರಲಿ.',
  btnIUnderstand: 'ನನಗೆ ಅರ್ಥವಾಗಿದೆ',
  btnViewMessageDetails: 'ಸಂದೇಶ ವಿವರ ನೋಡಿ',
  btnViewCallDetails: 'ಕರೆ ವಿವರ ನೋಡಿ',
  btnDismissAlert: 'ಎಚ್ಚರಿಕೆ ಮುಚ್ಚಿ',

  voicePlayingStatus: 'ಎಚ್ಚರಿಕೆಯನ್ನು ಓದಿ ಹೇಳಲಾಗುತ್ತಿದೆ...',
  voiceReadyStatus: 'ಧ್ವನಿ ವಿವರಣೆ ಸಿದ್ಧವಾಗಿದೆ',
  voiceMutedStatus: 'ಧ್ವನಿ ಆಫ್ ಮಾಡಲಾಗಿದೆ',
  voiceAutoplayPrompt: 'ಸ್ವಯಂಚಾಲಿತ ಧ್ವನಿ ಎಚ್ಚರಿಕೆಗಾಗಿ ಒಮ್ಮೆ ಇಲ್ಲಿ ಒತ್ತಿರಿ.',
  enableVoiceTapBtn: 'ಧ್ವನಿ ಆನ್ ಮಾಡಿ',
  voiceUnavailableStatus: 'ಈ ಸಾಧನದಲ್ಲಿ ಕನ್ನಡ ಧ್ವನಿ ಲಭ್ಯವಿಲ್ಲ. ಕೆಳಗಿನ ಬರಹದ ಎಚ್ಚರಿಕೆಯನ್ನು ಓದಿರಿ.',
  voiceUnsupportedStatus: 'ಈ ಬ್ರೌಸರ್‌ನಲ್ಲಿ ಧ್ವನಿ ಸೌಲಭ್ಯವಿಲ್ಲ.',
  replayVoiceBtn: 'ಮತ್ತೆ ಕೇಳಿ',
  muteVoiceBtn: 'ಮ್ಯೂಟ್',
  unmuteVoiceBtn: 'ಧ್ವನಿ ಆನ್',

  incomingCallLabel: 'ಕಾಲ್ಪನಿಕ ಒಳಬರುವ ಕರೆ',
  callConnectedLabel: 'ಕಾಲ್ಪನಿಕ ಕರೆ ಚಾಲನೆಯಲ್ಲಿದೆ',
  callEndedLabel: 'ಕರೆ ಮುಗಿದಿದೆ',
  answerCallBtn: 'ಸ್ವೀಕರಿಸಿ',
  declineCallBtn: 'ತಿರಸ್ಕರಿಸಿ',
  endCallBtn: 'ಕರೆ ಮುಗಿಸಿ',
  ringtoneOnLabel: 'ರಿಂಗ್‌ಟೋನ್ ಆನ್',
  ringtoneMutedLabel: 'ನಿಶಬ್ದ',
  suspiciousCallBannerTitle: 'ಎಲ್ಡರ್‌ಶೀಲ್ಡ್ ಎಚ್ಚರಿಕೆ: ನಕಲಿ ಅಧಿಕಾರಿ ಕರೆಯ ಸಾಧ್ಯತೆ',
  ordinaryCallNeutralNote:
    'ಈ ಕಾಲ್ಪನಿಕ ಕರೆಯಲ್ಲಿ ವಂಚನೆಯ ಲಕ್ಷಣಗಳು ಕಂಡುಬಂದಿಲ್ಲ. ಅಪರಿಚಿತ ಬೇಡಿಕೆಗಳನ್ನು ಯಾವಾಗಲೂ ಪರಿಶೀಲಿಸಿ.',
  openFullWarningBtn: 'ಪೂರ್ಣ ಎಚ್ಚರಿಕೆ ನೋಡಿ',

  messagesEmpty: 'ಇನ್ನೂ SMS ಸಂದೇಶಗಳಿಲ್ಲ. ಕಾಲ್ಪನಿಕ ಸಂದೇಶಗಳು ತಾನಾಗಿಯೇ ಬರುತ್ತವೆ.',
  whatsappSimSubtitle: 'ಕಾಲ್ಪನಿಕ ಚಾಟ್ · ನಿಜವಾದ ವಾಟ್ಸಾಪ್ ಅಲ್ಲ',
  whatsappEmpty: 'ಇನ್ನೂ ಕಾಲ್ಪನಿಕ ವಾಟ್ಸಾಪ್ ಸಂದೇಶಗಳಿಲ್ಲ.',
  viewScamWarningBtn: 'ವಂಚನೆ ಎಚ್ಚರಿಕೆ ನೋಡಿ',
  quickReplyVerify: 'ನಾನು ಅಧಿಕೃತ ಸಂಖ್ಯೆಗೆ ಕರೆ ಮಾಡಿ ಪರಿಶೀಲಿಸುತ್ತೇನೆ.',
  quickReplyThanks: 'ಧನ್ಯವಾದಗಳು, ತಿಳಿಯಿತು.',
  youSenderLabel: 'ನೀವು',

  tabRecents: 'ಇತ್ತೀಚಿನವು',
  tabContacts: 'ಸಂಪರ್ಕಗಳು',
  tabKeypad: 'ಕೀಪ್ಯಾಡ್',
  callActionBtn: 'ಕರೆ',
  messageActionBtn: 'ಸಂದೇಶ',
  dialBtn: 'ಕಾಲ್ಪನಿಕ ಕರೆ ಮಾಡಿ',
  noRecentCalls: 'ಇನ್ನೂ ಯಾವುದೇ ಕಾಲ್ಪನಿಕ ಕರೆಗಳಿಲ್ಲ.',
  contactRoleSon: 'ಮಗ (ಕುಟುಂಬ)',
  contactRoleDaughter: 'ಮಗಳು (ಕುಟುಂಬ)',
  contactRoleDoctor: 'ಕುಟುಂಬ ಕ್ಲಿನಿಕ್',
  contactRoleBankHelpline: 'ಅಧಿಕೃತ ಬ್ಯಾಂಕ್ ಸಹಾಯವಾಣಿ (ಡೆಮೊ)',
  contactRoleCyberHelpline: 'ಸೈಬರ್ ಸುರಕ್ಷತಾ ಸಹಾಯವಾಣಿ ಮಾಹಿತಿ',
  cameraSimulatedNote: 'ಕಾಲ್ಪನಿಕ ಕ್ಯಾಮೆರಾ ನೋಟ (ಕ್ಯಾಮೆರಾ ಅನುಮತಿ ಕೇಳಿಲ್ಲ)',
  cameraCaptureBtn: 'ಫೋಟೋ ತೆಗೆಯಿರಿ',
  cameraSavedToast: 'ಫೋಟೋ ಗ್ಯಾಲರಿಯಲ್ಲಿ ಉಳಿಸಲಾಗಿದೆ',
  galleryPhotoTea: 'ಬೆಳಗಿನ ಚಹಾ',
  galleryPhotoGarden: 'ಮನೆಯ ಹೂದೋಟ',
  galleryPhotoPark: 'ಉದ್ಯಾನವನದ ನಡಿಗೆ',
  galleryPhotoSnapshot: 'ಕ್ಯಾಮೆರಾ ಫೋಟೋ',
  elderShieldCenterDesc: 'ಪತ್ತೆಯಾದ ವಂಚನೆ ಎಚ್ಚರಿಕೆಗಳು ಮತ್ತು ಸೂಚನೆಗಳ ಇತಿಹಾಸ.',
  flaggedEventsHeader: 'ಪತ್ತೆಯಾದ ಎಚ್ಚರಿಕೆಗಳು',
  allEventsHeader: 'ಎಲ್ಲಾ ಕಾಲ್ಪನಿಕ ಘಟನೆಗಳು',

  settingsLanguageSection: 'ಭಾಷೆ',
  settingsSimulationSection: 'ಎಲ್ಡರ್‌ಶೀಲ್ಡ್ ಸಿಮ್ಯುಲೇಷನ್',
  settingsAutoSimDesc: 'ಕಾಲ್ಪನಿಕ SMS, ವಾಟ್ಸಾಪ್ ಮತ್ತು ಫೋನ್ ಕರೆಗಳನ್ನು ಸ್ವಯಂಚಾಲಿತವಾಗಿ ಪಡೆಯಿರಿ.',
  pauseSimBtn: 'ಸಿಮ್ಯುಲೇಷನ್ ನಿಲ್ಲಿಸಿ',
  resumeSimBtn: 'ಸಿಮ್ಯುಲೇಷನ್ ಮುಂದುವರಿಸಿ',
  sendNextEventBtn: 'ಮುಂದಿನ ಘಟನೆಯನ್ನು ಈಗ ತೋರಿಸಿ',
  restartSimBtn: 'ಮೊದಲಿನಿಂದ ಪ್ರಾರಂಭಿಸಿ',
  settingsVoiceSection: 'ಧ್ವನಿ ವಿವರಣೆ',
  speechSpeedLabel: 'ಓದುವ ವೇಗ',
  speedSlow: 'ನಿಧಾನ',
  speedCalm: 'ಶಾಂತ',
  speedNormal: 'ಸಾಮಾನ್ಯ',
  testVoiceBtn: 'ಧ್ವನಿ ಪರೀಕ್ಷಿಸಿ',
  testVoiceSample: 'ನಮಸ್ಕಾರ. ಎಲ್ಡರ್‌ಶೀಲ್ಡ್ ಸುರಕ್ಷತಾ ಎಚ್ಚರಿಕೆ ಧ್ವನಿ ಸ್ಪಷ್ಟವಾಗಿ ಕಾರ್ಯನಿರ್ವಹಿಸುತ್ತಿದೆ.',
  settingsDisplaySection: 'ಪರದೆ ಮತ್ತು ಅಕ್ಷರ ಗಾತ್ರ',
  largeTextToggleLabel: 'ಅತಿ ದೊಡ್ಡ ಅಕ್ಷರಗಳು',
  wallpaperLabel: 'ಮುಖಪುಟ ವಾಲ್‌ಪೇಪರ್',
  wallpaperDawn: 'ಮುಂಜಾನೆಯ ಬೆಟ್ಟಗಳು',
  wallpaperOcean: 'ಆಳ ಸಮುದ್ರ ನೀಲಿ',
  wallpaperTwilight: 'ಸಂಜೆಯ ಬೆಳಕು',
  resetSetupBtn: 'ಭಾಷಾ ಸೆಟಪ್ ಮರುಹೊಂದಿಸಿ',
  confirmResetPrompt: 'ಫೋನ್ ಇತಿಹಾಸ ಅಳಿಸಿ ಮೊದಲ ಭಾಷಾ ಆಯ್ಕೆ ಪರದೆಗೆ ಹಿಂತಿರುಗಬೇಕೇ?',
  confirmYesBtn: 'ಮರುಹೊಂದಿಸಿ',
  cancelBtn: 'ರದ್ದುಮಾಡಿ',

  riskHigh: 'ಹೆಚ್ಚಿನ ಅಪಾಯ',
  riskSuspicious: 'ಸಂಶಯಾಸ್ಪದ',
  riskNoObvious: 'ಸ್ಪಷ್ಟ ಅಪಾಯದ ಲಕ್ಷಣಗಳಿಲ್ಲ',

  categories: {
    bank_impersonation: 'ಬ್ಯಾಂಕ್ ಹೆಸರಿನಲ್ಲಿ ನಕಲಿ ಸಂದೇಶ',
    otp_pin_theft: 'OTP ಅಥವಾ PIN ಬೇಡಿಕೆ',
    upi_scam: 'UPI ಪಾವತಿ ಅಥವಾ ರೀಫಂಡ್ ವಂಚನೆ',
    fake_kyc: 'ನಕಲಿ KYC ಅಪ್‌ಡೇಟ್',
    phishing_link: 'ಮೋಸದ ವೆಬ್ ಲಿಂಕ್',
    parcel_delivery_scam: 'ನಕಲಿ ಪಾರ್ಸೆಲ್ ಶುಲ್ಕ',
    lottery_prize_scam: 'ಲಾಟರಿ ಮತ್ತು ಬಹುಮಾನ ವಂಚನೆ',
    fake_job_offer: 'ನಕಲಿ ಉದ್ಯೋಗ ಆಫರ್',
    investment_scam: 'ದ್ವಿಗುಣ ಲಾಭದ ಹೂಡಿಕೆ ಆಮಿಷ',
    govt_benefit_scam: 'ಸರ್ಕಾರಿ ಯೋಜನೆಯ ಹೆಸರಿನಲ್ಲಿ ವಂಚನೆ',
    police_legal_threat: 'ನಕಲಿ ಪೊಲೀಸ್ ಅಥವಾ ಕಾನೂನು ಬೆದರಿಕೆ',
    electricity_threat: 'ವಿದ್ಯುತ್ ಕಡಿತದ ಬೆದರಿಕೆ',
    fake_loan_offer: 'ನಕಲಿ ತಕ್ಷಣದ ಸಾಲ',
    suspicious_app_install: 'ಅಪಾಯಕಾರಿ ಆಪ್ (APK) ಡೌನ್‌ಲೋಡ್ ಬೇಡಿಕೆ',
    remote_access_scam: 'ಸ್ಕ್ರೀನ್ ಶೇರಿಂಗ್ ಆಪ್ ವಂಚನೆ',
    urgent_financial_request: 'ತುರ್ತು ಹಣದ ಬೇಡಿಕೆ',
    ordinary_message: 'ಸಾಮಾನ್ಯ ಸೂಚನೆ',
  },

  warningSignReasons: {
    impersonates_bank: 'ನಿಮ್ಮನ್ನು ಹೆದರಿಸಲು ನಿಮ್ಮ ಬ್ಯಾಂಕ್ ಖಾತೆ ಅಥವಾ ಕಾರ್ಡ್ ಬ್ಲಾಕ್ ಆಗುತ್ತದೆ ಎಂದು ಹೇಳುತ್ತಿದೆ.',
    requests_otp_or_pin: 'ನಿಮ್ಮ ರಹಸ್ಯ OTP, PIN, ಪಾಸ್‌ವರ್ಡ್ ಅಥವಾ ಕಾರ್ಡ್ CVV ಕೇಳುತ್ತಿದೆ.',
    suspicious_upi_collect: 'ಹಣ ಅಥವಾ ರೀಫಂಡ್ ಪಡೆಯಲು UPI PIN ಹಾಕುವಂತೆ ಕೇಳುತ್ತಿದೆ.',
    fake_kyc_threat: 'ತಕ್ಷಣ KYC ಅಪ್‌ಡೇಟ್ ಮಾಡದಿದ್ದರೆ ಖಾತೆ ಸ್ಥಗಿತವಾಗುತ್ತದೆ ಎಂದು ಬೆದರಿಸುತ್ತಿದೆ.',
    suspicious_link: 'ವೈಯಕ್ತಿಕ ಅಥವಾ ಬ್ಯಾಂಕ್ ಮಾಹಿತಿಯನ್ನು ಕದಿಯುವ ನಕಲಿ ಲಿಂಕ್ ಇದರಲ್ಲಿದೆ.',
    fake_parcel_fee: 'ಪಾರ್ಸೆಲ್ ತಲುಪಿಸಲು ಶುಲ್ಕ ಪಾವತಿಸುವಂತೆ ಕೇಳುತ್ತಿದೆ.',
    unrealistic_prize_lottery: 'ನೀವು ಭಾಗವಹಿಸದ ಲಾಟರಿ ಅಥವಾ ಬಹುಮಾನ ಬಂದಿದೆ ಎಂದು ಆಮಿಷ ತೋರಿಸುತ್ತಿದೆ.',
    unrealistic_job_income: 'ಸರಳ ಆನ್‌ಲೈನ್ ಕೆಲಸಕ್ಕೆ ದಿನಕ್ಕೆ ಸಾವಿರಾರು ರೂಪಾಯಿ ಆದಾಯ ನೀಡುವುದಾಗಿ ಹೇಳುತ್ತಿದೆ.',
    guaranteed_investment_return: 'ಕಡಿಮೆ ಸಮಯದಲ್ಲಿ ಹಣ ದ್ವಿಗುಣವಾಗುತ್ತದೆ ಎಂದು ಭರವಸೆ ನೀಡುತ್ತಿದೆ.',
    fake_government_scheme: 'ನಂಬಿಕೆ ಹುಟ್ಟಿಸಲು ಸರ್ಕಾರಿ ಪಿಂಚಣಿ ಅಥವಾ ಸಬ್ಸಿಡಿ ಹೆಸರನ್ನು ಬಳಸುತ್ತಿದೆ.',
    legal_or_police_intimidation: 'ಪೊಲೀಸ್ ಬಂಧನ ಅಥವಾ ಡಿಜಿಟಲ್ ಅರೆಸ್ಟ್ ವಾರೆಂಟ್ ಎಂದು ಹೆದರಿಸುತ್ತಿದೆ.',
    tonight_utility_cutoff: 'ಇಂದು ರಾತ್ರಿಯೇ ಮನೆಯ ವಿದ್ಯುತ್ ಕಡಿತಗೊಳಿಸುವುದಾಗಿ ಗಾಬರಿ ಹುಟ್ಟಿಸುತ್ತಿದೆ.',
    upfront_loan_fee: 'ತಕ್ಷಣದ ಸಾಲಕ್ಕಾಗಿ ಮುಂಗಡ ಪ್ರೊಸೆಸಿಂಗ್ ಶುಲ್ಕ ಕೇಳುತ್ತಿದೆ.',
    apk_file_download: 'ಅಸುರಕ್ಷಿತ APK ಆಪ್ ಫೈಲ್ ಇನ್‌ಸ್ಟಾಲ್ ಮಾಡಲು ಹೇಳುತ್ತಿದೆ.',
    remote_screen_sharing_app: 'AnyDesk ಅಥವಾ QuickSupport ನಂತಹ ಸ್ಕ್ರೀನ್ ಶೇರಿಂಗ್ ಆಪ್ ಹಾಕಲು ಹೇಳುತ್ತಿದೆ.',
    urgent_pressure_tactic: 'ಪರಿಶೀಲಿಸಲು ಸಮಯ ನೀಡದೆ ತಕ್ಷಣ ಕ್ರಮ ಕೈಗೊಳ್ಳುವಂತೆ ಒತ್ತಡ ಹಾಕುತ್ತಿದೆ.',
    unverified_callback_number: 'ಅಪರಿಚಿತ ಫೋನ್ ನಂಬರ್‌ಗೆ ಕರೆ ಮಾಡುವಂತೆ ಒತ್ತಾಯಿಸುತ್ತಿದೆ.',
    caller_org_impersonation: 'ಕರೆ ಮಾಡಿದವರು ಬ್ಯಾಂಕ್, ಪೊಲೀಸ್, ಸರ್ಕಾರಿ ಕಚೇರಿ ಅಥವಾ ವಿದ್ಯುತ್ ಇಲಾಖೆ ಅಧಿಕಾರಿ ಎಂದು ಹೇಳಿಕೊಳ್ಳುತ್ತಿದ್ದಾರೆ.',
  },

  safetyAdviceByCategory: {
    bank_impersonation:
      'ಲಿಂಕ್ ಒತ್ತಬೇಡಿ ಅಥವಾ ಬ್ಯಾಂಕ್ ವಿವರ ನೀಡಬೇಡಿ. ನಿಮ್ಮ ಬ್ಯಾಂಕ್ ಕಾರ್ಡ್ ಹಿಂಭಾಗದಲ್ಲಿರುವ ಅಧಿಕೃತ ಸಂಖ್ಯೆಗೆ ಕರೆ ಮಾಡಿ ಅಥವಾ ಶಾಖೆಗೆ ಭೇಟಿ ನೀಡಿ.',
    otp_pin_theft:
      'ನಿಮ್ಮ OTP, PIN, CVV ಅಥವಾ ಪಾಸ್‌ವರ್ಡ್ ಯಾರಿಗೂ ನೀಡಬೇಡಿ. ನಿಜವಾದ ಅಧಿಕಾರಿಗಳು ಎಂದಿಗೂ ಕೇಳುವುದಿಲ್ಲ.',
    upi_scam:
      'ನಿಮ್ಮ UPI PIN ಹಾಕಬೇಡಿ. UPI PIN ಹಾಕಿದರೆ ನಿಮ್ಮ ಖಾತೆಯಿಂದ ಹಣ ಕಡಿತವಾಗುತ್ತದೆ.',
    fake_kyc:
      'ಲಿಂಕ್ ತೆರೆಯಬೇಡಿ. ನೇರವಾಗಿ ಬ್ಯಾಂಕ್ ಶಾಖೆಗೆ ಹೋಗಿ ಮಾತ್ರ KYC ಪರಿಶೀಲಿಸಿ.',
    phishing_link:
      'ಈ ಲಿಂಕ್ ಮೇಲೆ ಒತ್ತಬೇಡಿ. ಕುಟುಂಬದ ಸದಸ್ಯರೊಂದಿಗೆ ಮಾತನಾಡಿ ಖಚಿತಪಡಿಸಿಕೊಳ್ಳಿ.',
    parcel_delivery_scam:
      'ಸಂದೇಶದ ಲಿಂಕ್ ಮೂಲಕ ಯಾವುದೇ ಶುಲ್ಕ ಕಟ್ಟಬೇಡಿ. ಅಧಿಕೃತ ಶಾಪಿಂಗ್ ಆಪ್‌ನಲ್ಲಿ ಮಾತ್ರ ಆರ್ಡರ್ ನೋಡಿ.',
    lottery_prize_scam:
      'ಈ ಸಂದೇಶವನ್ನು ನಿರ್ಲಕ್ಷಿಸಿ. ಬಹುಮಾನಕ್ಕಾಗಿ ಎಂದಿಗೂ ಶುಲ್ಕ ಪಾವತಿಸಬೇಡಿ.',
    fake_job_offer:
      'ಅಪರಿಚಿತ ಗ್ರೂಪ್‌ಗಳಿಗೆ ಸೇರಬೇಡಿ ಅಥವಾ ಆನ್‌ಲೈನ್ ಕೆಲಸಕ್ಕಾಗಿ ಹಣ ನೀಡಬೇಡಿ.',
    investment_scam:
      'ಹಣ ಕಳುಹಿಸಬೇಡಿ. ಯಾವುದೇ ಹೂಡಿಕೆಗೆ ಮುನ್ನ ನೇರವಾಗಿ ನಿಮ್ಮ ಬ್ಯಾಂಕ್‌ನಲ್ಲಿ ವಿಚಾರಿಸಿ.',
    govt_benefit_scam:
      'ಆಧಾರ್, OTP ಅಥವಾ ಬ್ಯಾಂಕ್ ವಿವರ ಹಂಚಿಕೊಳ್ಳಬೇಡಿ. ಅಧಿಕೃತ ಸರ್ಕಾರಿ ಸೇವಾ ಕೇಂದ್ರದಲ್ಲಿ ವಿಚಾರಿಸಿ.',
    police_legal_threat:
      'ಗಾಬರಿಯಾಗದೆ ತಕ್ಷಣ ಕರೆ ಕಟ್ ಮಾಡಿ. ಪೊಲೀಸರು ಫೋನ್‌ನಲ್ಲಿ ಹಣ ಕೇಳುವುದಿಲ್ಲ ಅಥವಾ ಡಿಜಿಟಲ್ ಅರೆಸ್ಟ್ ಮಾಡುವುದಿಲ್ಲ. ಕುಟುಂಬದವರಿಗೆ ತಿಳಿಸಿ.',
    electricity_threat:
      'ಸಂದೇಶದಲ್ಲಿರುವ ನಂಬರ್‌ಗೆ ಕರೆ ಮಾಡಬೇಡಿ. ನಿಮ್ಮ ವಿದ್ಯುತ್ ಬಿಲ್‌ನಲ್ಲಿರುವ ಅಧಿಕೃತ ನಂಬರ್‌ಗೆ ಕರೆ ಮಾಡಿ.',
    fake_loan_offer:
      'ಸಾಲಕ್ಕಾಗಿ ಮುಂಗಡ ಶುಲ್ಕ ನೀಡಬೇಡಿ ಮತ್ತು ದಾಖಲೆಗಳನ್ನು ಅಪರಿಚಿತ ಲಿಂಕ್‌ಗೆ ಕಳುಹಿಸಬೇಡಿ.',
    suspicious_app_install:
      'SMS ಅಥವಾ ವಾಟ್ಸಾಪ್ ಮೂಲಕ ಬರುವ APK ಫೈಲ್‌ಗಳನ್ನು ಎಂದಿಗೂ ಇನ್‌ಸ್ಟಾಲ್ ಮಾಡಬೇಡಿ.',
    remote_access_scam:
      'ಅಪರಿಚಿತರು ಹೇಳಿದರೆ AnyDesk ಅಥವಾ QuickSupport ಆಪ್ ಹಾಕಬೇಡಿ. ಅವರು ನಿಮ್ಮ ಫೋನ್ ಪರದೆ ಮತ್ತು OTP ನೋಡಬಹುದು.',
    urgent_financial_request:
      'ಹಣ ಕಳುಹಿಸುವ ಮುನ್ನ ನಿಲ್ಲಿ, ನಿಮ್ಮ ಫೋನ್‌ನಲ್ಲಿ ಸೇವ್ ಮಾಡಿರುವ ನಂಬರ್‌ಗೆ ಕುಟುಂಬದವರಿಗೆ ನೇರವಾಗಿ ಕರೆ ಮಾಡಿ ಖಚಿತಪಡಿಸಿಕೊಳ್ಳಿ.',
    ordinary_message:
      'ಸ್ಪಷ್ಟ ವಂಚನೆಯ ಲಕ್ಷಣಗಳಿಲ್ಲ, ಆದರೂ ಅನಿರೀಕ್ಷಿತ ಬೇಡಿಕೆಗಳನ್ನು ಪರಿಶೀಲಿಸಿ.',
  },

  ordinaryMessageNote:
    'ಡೆಮೊ ಅಂದಾಜು: ಸ್ಪಷ್ಟ ವಂಚನೆಯ ಲಕ್ಷಣಗಳು ಕಂಡುಬಂದಿಲ್ಲ, ಆದರೂ ಅಪರಿಚಿತ ಸಂದೇಶಗಳ ಬಗ್ಗೆ ಎಚ್ಚರವಿರಲಿ.',
};

const bn: PhoneTranslations = {
  setupTitle: 'এল্ডারশিল্ড সুরক্ষা',
  setupSubtitle: 'একবার আপনার ভাষা বেছে নিন। এই ভার্চুয়াল ফোনটি প্রতারণামূলক বার্তা ও কল শনাক্ত করে বাংলায় সতর্কবার্তা পড়ে শোনাবে।',
  setupChooseLanguage: 'ভাষা নির্বাচন করুন',
  setupStartBtn: 'শুরু করুন',

  demoDisclaimer:
    'ডেমো মোড: এই ফোনে কাল্পনিক বার্তা ও সিমুলেটেড কল ব্যবহৃত হয়। এটি আপনার আসল SMS, হোয়াটসঅ্যাপ বা ফোন কল নজরদারি করে না।',

  lockScreenStatus: 'এল্ডারশিল্ড সুরক্ষা চালু',
  tapToUnlock: 'ফোন খুলতে ট্যাপ করুন',
  noNewNotifications: 'নতুন কোনো বিজ্ঞপ্তি নেই। কাল্পনিক বার্তা নিজে থেকে আসবে।',
  shieldWidgetActive: 'এল্ডারশিল্ড সক্রিয়',
  shieldWidgetPaused: 'সিমুলেশন বিরতিতে',
  shieldWidgetSubtitle: 'স্বয়ংক্রিয় SMS, হোয়াটসঅ্যাপ ও কল সুরক্ষা পরীক্ষা',
  folderSafetyTools: 'সুরক্ষা ও সরঞ্জাম',

  appPhone: 'ফোন',
  appMessages: 'বার্তা',
  appWhatsApp: 'হোয়াটসঅ্যাপ',
  appContacts: 'পরিচিতি',
  appSettings: 'সেটিংস',
  appCamera: 'ক্যামেরা',
  appGallery: 'গ্যালারি',
  appElderShield: 'এল্ডারশিল্ড',

  quickSettingsTitle: 'দ্রুত সেটিংস',
  tileWifi: 'ওয়াই-ফাই',
  tileAutoSim: 'সিমুলেশন',
  tileVoice: 'কণ্ঠ সতর্কতা',
  tileRingtone: 'রিংটোন',
  tileLargeText: 'বড় অক্ষর',
  tileLockPhone: 'স্ক্রিন লক',
  stateOn: 'চালু',
  stateOff: 'বন্ধ',
  stateActive: 'সক্রিয়',
  statePaused: 'থামানো',
  notificationsHeader: 'বিজ্ঞপ্তিসমূহ',
  clearNotificationsBtn: 'সব মুছুন',
  nowTimestamp: 'এখনই',

  navBack: 'পিছনে',
  navHome: 'হোম',
  navRecents: 'সাম্প্রতিক অ্যাপ',
  recentsEmpty: 'কোনো অ্যাপ খোলা নেই',
  closeAllAppsBtn: 'হোম স্ক্রিনে ফিরুন',

  scamWarningTitle: 'প্রতারণা সতর্কতা',
  suspiciousNoticeTitle: 'সন্দেহজনক সতর্কতা',
  msgFraudulentLead: 'এই বার্তাটি প্রতারণামূলক হতে পারে।',
  callFraudulentLead: 'কলার ব্যাংক, পুলিশ বা সরকারি সংস্থার পরিচয় দিয়ে প্রতারণা করতে পারে।',
  reasonPrefix: 'কারণ:',
  suspiciousRequestLabel: 'শনাক্তকৃত সন্দেহজনক অংশ:',
  safetyAdvicePrefix: 'সুরক্ষা পরামর্শ:',
  demoAssessmentNote:
    'এটি শুধুমাত্র ডেমো ঝুঁকি মূল্যায়ন — শতভাগ নিশ্চয়তা নয়। স্বাভাবিক দেখতে বার্তাতেও সতর্ক থাকুন।',
  btnIUnderstand: 'আমি বুঝতে পেরেছি',
  btnViewMessageDetails: 'বার্তার বিবরণ দেখুন',
  btnViewCallDetails: 'কলের বিবরণ দেখুন',
  btnDismissAlert: 'সতর্কতা বন্ধ করুন',

  voicePlayingStatus: 'সতর্কবার্তা পড়ে শোনানো হচ্ছে...',
  voiceReadyStatus: 'কণ্ঠস্বর প্রস্তুত',
  voiceMutedStatus: 'কণ্ঠস্বর বন্ধ আছে',
  voiceAutoplayPrompt: 'স্বয়ংক্রিয় কণ্ঠ সতর্কবার্তার জন্য একবার ট্যাপ করুন।',
  enableVoiceTapBtn: 'কণ্ঠস্বর চালু করুন',
  voiceUnavailableStatus: 'এই ডিভাইসে বাংলা কণ্ঠস্বর পাওয়া যায়নি। নিচে লিখিত সতর্কবার্তাটি পড়ুন।',
  voiceUnsupportedStatus: 'এই ব্রাউজারে কণ্ঠস্বর সুবিধা নেই।',
  replayVoiceBtn: 'আবার শুনুন',
  muteVoiceBtn: 'মিউট',
  unmuteVoiceBtn: 'আনমিউট',

  incomingCallLabel: 'কাল্পনিক ইনকামিং কল',
  callConnectedLabel: 'কাল্পনিক কল চলছে',
  callEndedLabel: 'কল শেষ হয়েছে',
  answerCallBtn: 'ধরুন',
  declineCallBtn: 'কেটে দিন',
  endCallBtn: 'কল শেষ করুন',
  ringtoneOnLabel: 'রিংটোন চালু',
  ringtoneMutedLabel: 'নীরব',
  suspiciousCallBannerTitle: 'এল্ডারশিল্ড সতর্কতা: ভুয়া কর্মকর্তার কলের আশঙ্কা',
  ordinaryCallNeutralNote:
    'এই কাল্পনিক কলে কোনো স্পষ্ট প্রতারণার লক্ষণ পাওয়া যায়নি। অপ্রত্যাশিত অনুরোধ সর্বদা যাচাই করুন।',
  openFullWarningBtn: 'সম্পূর্ণ সতর্কতা দেখুন',

  messagesEmpty: 'এখনও কোনো SMS নেই। কাল্পনিক বার্তা স্বয়ংক্রিয়ভাবে আসবে।',
  whatsappSimSubtitle: 'কাল্পনিক চ্যাট · আসল হোয়াটসঅ্যাপ নয়',
  whatsappEmpty: 'এখনও কোনো কাল্পনিক হোয়াটসঅ্যাপ বার্তা নেই।',
  viewScamWarningBtn: 'প্রতারণা সতর্কতা দেখুন',
  quickReplyVerify: 'আমি অফিসিয়াল নম্বরে যাচাই করে নেব।',
  quickReplyThanks: 'ধন্যবাদ, বুঝতে পেরেছি।',
  youSenderLabel: 'আপনি',

  tabRecents: 'সাম্প্রতিক',
  tabContacts: 'পরিচিতি',
  tabKeypad: 'কিপ্যাড',
  callActionBtn: 'কল',
  messageActionBtn: 'বার্তা',
  dialBtn: 'কাল্পনিক কল করুন',
  noRecentCalls: 'এখনও কোনো কাল্পনিক কল আসেনি।',
  contactRoleSon: 'ছেলে (পরিবার)',
  contactRoleDaughter: 'মেয়ে (পরিবার)',
  contactRoleDoctor: 'পারিবারিক ক্লিনিক',
  contactRoleBankHelpline: 'অফিসিয়াল ব্যাংক হেল্পলাইন (ডেমো)',
  contactRoleCyberHelpline: 'সাইবার সুরক্ষা হেল্পলাইন তথ্য',
  cameraSimulatedNote: 'কাল্পনিক ক্যামেরা প্রিভিউ (ক্যামেরা অনুমতি নেওয়া হয়নি)',
  cameraCaptureBtn: 'ছবি তুলুন',
  cameraSavedToast: 'ছবি গ্যালারিতে সংরক্ষিত হয়েছে',
  galleryPhotoTea: 'সকালের চা',
  galleryPhotoGarden: 'বাড়ির ফুলের বাগান',
  galleryPhotoPark: 'সকালের হাঁটা',
  galleryPhotoSnapshot: 'ক্যামেরা ছবি',
  elderShieldCenterDesc: 'শনাক্তকৃত প্রতারণা সতর্কতা এবং বিজ্ঞপ্তির ইতিহাস দেখুন।',
  flaggedEventsHeader: 'সতর্ককৃত ঘটনা',
  allEventsHeader: 'সব কাল্পনিক ঘটনা',

  settingsLanguageSection: 'ভাষা',
  settingsSimulationSection: 'এল্ডারশিল্ড সিমুলেশন',
  settingsAutoSimDesc: 'কাল্পনিক SMS, হোয়াটসঅ্যাপ এবং ফোন কল স্বয়ংক্রিয়ভাবে পান।',
  pauseSimBtn: 'সিমুলেশন থামান',
  resumeSimBtn: 'সিমুলেশন শুরু করুন',
  sendNextEventBtn: 'পরবর্তী ঘটনা এখনই দেখান',
  restartSimBtn: 'প্রথম থেকে চালান',
  settingsVoiceSection: 'কণ্ঠস্বরে সতর্কতা',
  speechSpeedLabel: 'পড়ার গতি',
  speedSlow: 'ধীর',
  speedCalm: 'স্বচ্ছন্দ',
  speedNormal: 'স্বাভাবিক',
  testVoiceBtn: 'কণ্ঠস্বর পরীক্ষা করুন',
  testVoiceSample: 'নমস্কার। এল্ডারশিল্ড সুরক্ষা সতর্কবার্তার কণ্ঠস্বর স্পষ্টভাবে কাজ করছে।',
  settingsDisplaySection: 'ডিসপ্লে ও লেখার আকার',
  largeTextToggleLabel: 'অতিরিক্ত বড় অক্ষর',
  wallpaperLabel: 'হোম ওয়ালপেপার',
  wallpaperDawn: 'ভোরের পাহাড়',
  wallpaperOcean: 'গভীর সমুদ্র',
  wallpaperTwilight: 'সন্ধ্যার আভা',
  resetSetupBtn: 'ভাষা সেটআপ রিসেট করুন',
  confirmResetPrompt: 'ফোনের ইতিহাস মুছে প্রাথমিক ভাষা নির্বাচন স্ক্রিনে ফিরতে চান?',
  confirmYesBtn: 'রিসেট করুন',
  cancelBtn: 'বাতিল',

  riskHigh: 'উচ্চ ঝুঁকি',
  riskSuspicious: 'সন্দেহজনক',
  riskNoObvious: 'স্পষ্ট সতর্কতার লক্ষণ নেই',

  categories: {
    bank_impersonation: 'ব্যাংকের নামে ভুয়া সতর্কতা',
    otp_pin_theft: 'OTP বা PIN চাওয়া',
    upi_scam: 'UPI পেমেন্ট বা রিফান্ড প্রতারণা',
    fake_kyc: 'ভুয়া KYC আপডেট',
    phishing_link: 'সন্দেহজনক প্রতারণার লিংক',
    parcel_delivery_scam: 'ভুয়া পার্সেল ফি',
    lottery_prize_scam: 'লটারি ও পুরস্কারের প্রলোভন',
    fake_job_offer: 'ভুয়া চাকরির প্রস্তাব',
    investment_scam: 'দ্বিগুণ লাভের বিনিয়োগ ফাঁদ',
    govt_benefit_scam: 'সরকারি প্রকল্পের নামে প্রতারণা',
    police_legal_threat: 'ভুয়া পুলিশ বা আইনি হুমকি',
    electricity_threat: 'বিদ্যুৎ সংযোগ বিচ্ছিন্নের হুমকি',
    fake_loan_offer: 'ভুয়া তাৎক্ষণিক ঋণ',
    suspicious_app_install: 'বিপজ্জনক অ্যাপ (APK) ইনস্টলের অনুরোধ',
    remote_access_scam: 'স্ক্রিন-শেয়ারিং অ্যাপ প্রতারণা',
    urgent_financial_request: 'জরুরি টাকার অনুরোধ',
    ordinary_message: 'সাধারণ বিজ্ঞপ্তি',
  },

  warningSignReasons: {
    impersonates_bank: 'আপনাকে ভয় দেখাতে আপনার ব্যাংক অ্যাকাউন্ট বা কার্ড বন্ধ হওয়ার দাবি করা হয়েছে।',
    requests_otp_or_pin: 'এতে আপনার গোপন OTP, PIN, পাসওয়ার্ড বা কার্ডের CVV চাওয়া হচ্ছে।',
    suspicious_upi_collect: 'টাকা বা রিফান্ড পাওয়ার নামে UPI PIN দিতে বলা হচ্ছে।',
    fake_kyc_threat: 'অবিলম্বে KYC বা PAN আপডেট না করলে অ্যাকাউন্ট বন্ধের হুমকি দেওয়া হয়েছে।',
    suspicious_link: 'ব্যক্তিগত বা ব্যাংক তথ্য চুরি করার জন্য একটি অযাচাইকৃত লিংক দেওয়া হয়েছে।',
    fake_parcel_fee: 'আটকে থাকা পার্সেল ছাড়ানোর নামে ফি দাবি করা হচ্ছে।',
    unrealistic_prize_lottery: 'অংশগ্রহণ না করেই লটারি বা বড় পুরস্কার জেতার লোভ দেখানো হচ্ছে।',
    unrealistic_job_income: 'সহজ অনলাইন কাজের বিনিময়ে প্রতিদিন হাজার টাকা আয়ের প্রলোভন দেখানো হচ্ছে।',
    guaranteed_investment_return: 'অল্প সময়ে ঝুঁকি ছাড়া টাকা দ্বিগুণ করার দাবি করা হচ্ছে।',
    fake_government_scheme: 'বিশ্বাস অর্জনের জন্য সরকারি পেনশন বা ভাতার নাম ব্যবহার করা হচ্ছে।',
    legal_or_police_intimidation: 'পুলিশ গ্রেপ্তার বা ডিজিটাল অ্যারেস্ট ওয়ারেন্টের ভয় দেখানো হচ্ছে।',
    tonight_utility_cutoff: 'আজ রাতেই বাড়ির বিদ্যুৎ সংযোগ কেটে দেওয়ার হুমকি দেওয়া হচ্ছে।',
    upfront_loan_fee: 'তাৎক্ষণিক ঋণের নামে অগ্রিম প্রসেসিং ফি চাওয়া হচ্ছে।',
    apk_file_download: 'ফোনে অনিরাপদ APK অ্যাপ ফাইল ইনস্টল করতে বলা হচ্ছে।',
    remote_screen_sharing_app: 'AnyDesk বা QuickSupport-এর মতো স্ক্রিন-শেয়ারিং অ্যাপ ইনস্টল করতে বলা হচ্ছে।',
    urgent_pressure_tactic: 'যাচাই করার সুযোগ না দিয়ে এক্ষুনি পদক্ষেপ নিতে তাড়াহুড়ো তৈরি করা হচ্ছে।',
    unverified_callback_number: 'অপরিচিত ব্যক্তিগত নম্বরে কল করার জন্য চাপ দেওয়া হচ্ছে।',
    caller_org_impersonation: 'কলার নিজেকে ব্যাংক, পুলিশ, সরকারি দপ্তর বা বিদ্যুৎ বোর্ডের কর্মকর্তা বলে দাবি করছেন।',
  },

  safetyAdviceByCategory: {
    bank_impersonation:
      'কোনো লিংকে ক্লিক করবেন না বা ব্যাংক তথ্য দেবেন না। আপনার ব্যাংক কার্ডের পেছনে লেখা অফিসিয়াল নম্বরে কল করুন বা শাখায় যান।',
    otp_pin_theft:
      'আপনার OTP, PIN, CVV বা পাসওয়ার্ড কাউকে বলবেন না। আসল কর্মকর্তারা কখনো এগুলো চান না।',
    upi_scam:
      'আপনার UPI PIN দেবেন না। মনে রাখবেন, UPI PIN দিলে আপনার অ্যাকাউন্ট থেকে টাকা কেটে যাবে।',
    fake_kyc:
      'লিংক খুলবেন না। শুধুমাত্র সরাসরি ব্যাংক শাখায় গিয়ে KYC যাচাই করুন।',
    phishing_link:
      'এই লিংকে স্পর্শ করবেন না। পরিবারের বিশ্বস্ত কারও সাথে কথা বলে নিশ্চিত হোন।',
    parcel_delivery_scam:
      'বার্তার লিংক দিয়ে কোনো ফি দেবেন না। শুধুমাত্র আসল শপিং অ্যাপে অর্ডার পরীক্ষা করুন।',
    lottery_prize_scam:
      'এই বার্তাটি উপেক্ষা করুন। পুরস্কার পাওয়ার জন্য কখনো কোনো ফি দেবেন না।',
    fake_job_offer:
      'অপরিচিত গ্রুপে যুক্ত হবেন না বা অনলাইন কাজের জন্য টাকা জমা দেবেন না।',
    investment_scam:
      'টাকা পাঠাবেন না। যেকোনো বিনিয়োগের আগে সরাসরি আপনার ব্যাংকে কথা বলুন।',
    govt_benefit_scam:
      'আধার, OTP বা ব্যাংক তথ্য দেবেন না। সরকারি সেবা কেন্দ্রে গিয়ে যাচাই করুন।',
    police_legal_threat:
      'ভয় না পেয়ে এখনই কল কেটে দিন। পুলিশ ফোনে টাকা চায় না বা ডিজিটাল অ্যারেস্ট করে না। পরিবারের সাথে কথা বলুন।',
    electricity_threat:
      'বার্তায় থাকা নম্বরে কল করবেন না। আপনার ছাপানো বিদ্যুৎ বিলে থাকা অফিসিয়াল নম্বরে যোগাযোগ করুন।',
    fake_loan_offer:
      'ঋণের জন্য অগ্রিম ফি দেবেন না এবং অপরিচিত লিংকে নথিপত্র পাঠাবেন না।',
    suspicious_app_install:
      'SMS বা হোয়াটসঅ্যাপে আসা কোনো APK ফাইল কখনোই ডাউনলোড বা ইনস্টল করবেন না।',
    remote_access_scam:
      'অপরিচিত কারও কথায় AnyDesk বা QuickSupport অ্যাপ ইনস্টল করবেন না। এতে তারা আপনার স্ক্রিন ও OTP দেখতে পাবে।',
    urgent_financial_request:
      'টাকা পাঠানোর আগে থামুন এবং ফোনে আগে থেকে সেভ করা নম্বরে পরিবারের সদস্যকে সরাসরি কল করে নিশ্চিত হোন।',
    ordinary_message:
      'স্পষ্ট প্রতারণার লক্ষণ নেই, তবুও অপ্রত্যাশিত অনুরোধ যাচাই করে নিন।',
  },

  ordinaryMessageNote:
    'ডেমো মূল্যায়ন: স্পষ্ট প্রতারণার লক্ষণ পাওয়া যায়নি, তবে অপরিচিত বার্তায় সতর্ক থাকুন।',
};

export const TRANSLATIONS: Record<LanguageCode, PhoneTranslations> = {
  en,
  ta,
  hi,
  te,
  ml,
  kn,
  bn,
};

export function getTranslation(lang: LanguageCode): PhoneTranslations {
  return TRANSLATIONS[lang] || TRANSLATIONS.en;
}

export function getLanguageOption(lang: LanguageCode): LanguageOption {
  return LANGUAGE_OPTIONS.find((opt) => opt.code === lang) || LANGUAGE_OPTIONS[0];
}
