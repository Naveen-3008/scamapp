import { HackerContactPersona, HackerLibraryScenario } from '../types';

export const ELDER_GUARDIAN_TARGET = {
  id: 'elderguardian-primary',
  name: 'ElderGuardian — Receiver',
  shortName: 'ElderGuardian Phone',
  phoneNumber: '+91 98400 11220',
} as const;

/**
 * Complete fictional testing Scenario Library organized into:
 * - SMS scams (all 12 required fraud archetypes)
 * - Suspicious calls
 * - Safe messages (ordinary legitimate messages for comparison)
 * - Safe calls (including Unknown Caller & Parcel Service delivery check-in)
 */
export const HACKER_SCENARIO_LIBRARY: HackerLibraryScenario[] = [
  // ==================== 1. SMS SCAMS (12 TEMPLATES) ====================
  {
    id: 'lib-sms-bank-suspend',
    category: 'sms_scams',
    name: 'Fake Bank Account Suspension',
    templateLabel: 'Fake bank account suspension',
    channel: 'sms',
    senderName: 'VM-NTBANK',
    phoneNumber: 'VM-NTBANK',
    content:
      'URGENT: Your National Trust savings account will be suspended today due to incomplete verification. Click https://ntbank-alert.example.com immediately to keep your account active.',
    expectedRiskLabel: 'High Risk',
    markedSuspicious: true,
    testingDescription:
      'Tests detection of bank account suspension panic tactics combined with an unverified external link.',
  },
  {
    id: 'lib-sms-otp-theft',
    category: 'sms_scams',
    name: 'Urgent OTP Verification Trap',
    templateLabel: 'OTP requests',
    channel: 'sms',
    senderName: 'AD-SECDESK',
    phoneNumber: '+91 90000 00214',
    content:
      'URGENT Security Notice: ₹38,500 is being debited from your account. Reply immediately or enter your 6-digit OTP at https://cancel-debit.example.org to stop this transfer.',
    expectedRiskLabel: 'High Risk',
    markedSuspicious: true,
    testingDescription:
      'Tests OTP theft warning when a sender pressures the user to disclose a secret one-time password.',
  },
  {
    id: 'lib-sms-fake-kyc',
    category: 'sms_scams',
    name: 'Expired PAN-KYC Block Notice',
    templateLabel: 'Fake KYC updates',
    channel: 'sms',
    senderName: 'VM-KYCUPD',
    phoneNumber: 'VM-KYCUPD',
    content:
      'Dear Customer, your bank account will be blocked today due to expired KYC. Complete your PAN-KYC update immediately at https://kyc-fast-portal.example.com',
    expectedRiskLabel: 'High Risk',
    markedSuspicious: true,
    testingDescription:
      'Tests fake KYC expiration threats directing seniors to lookalike verification websites.',
  },
  {
    id: 'lib-sms-upi-refund',
    category: 'sms_scams',
    name: 'UPI Subsidy Refund PIN Trap',
    templateLabel: 'UPI payment and refund scams',
    channel: 'sms',
    senderName: 'UPI-REFUND',
    phoneNumber: 'UPI-REFUND',
    content:
      'Good news! Your ₹4,200 gas and electricity subsidy refund is approved. Open https://upi-subsidy.example.org and enter your UPI PIN to receive the refund in your bank.',
    expectedRiskLabel: 'High Risk',
    markedSuspicious: true,
    testingDescription:
      'Tests detection of collect-request scams claiming a UPI PIN is required to receive money.',
  },
  {
    id: 'lib-sms-parcel-fee',
    category: 'sms_scams',
    name: 'Held Parcel Redelivery Fee',
    templateLabel: 'Fake parcel delivery fees',
    channel: 'sms',
    senderName: 'JD-SWIFTP',
    phoneNumber: 'JD-SWIFTP',
    content:
      'SwiftParcel Alert: Package #SP9041 is held at the sorting hub due to missing house number. Pay ₹29 delivery fee within 2 hours at https://parcel-fee-check.example.net',
    expectedRiskLabel: 'High Risk',
    markedSuspicious: true,
    testingDescription:
      'Tests small redelivery fee phishing links designed to harvest card or UPI credentials.',
  },
  {
    id: 'lib-sms-lottery-prize',
    category: 'sms_scams',
    name: 'Festival Bumper Lottery Winner',
    templateLabel: 'Lottery and prize scams',
    channel: 'sms',
    senderName: 'LUCK-DRAW',
    phoneNumber: '+91 90000 00509',
    content:
      'Congratulations! Your mobile number won ₹25,00,000 in the Festival Lucky Draw! Visit https://prize-claim-desk.example.org and enter your UPI PIN to claim your cash reward.',
    expectedRiskLabel: 'High Risk',
    markedSuspicious: true,
    testingDescription:
      'Tests detection of unsolicited lottery prize claims paired with payment/PIN traps.',
  },
  {
    id: 'lib-sms-fake-job',
    category: 'sms_scams',
    name: 'Part-Time Daily Task Income Offer',
    templateLabel: 'Fake job offers',
    channel: 'sms',
    senderName: 'HR-TASKS',
    phoneNumber: '+91 90000 00612',
    content:
      'Part-time work from home! Earn ₹5,000 daily on your phone just by liking hotel photos. Join task desk now: https://daily-earn-task.example.org',
    expectedRiskLabel: 'Suspicious',
    markedSuspicious: true,
    testingDescription:
      'Tests detection of unrealistic daily-income task scams targeting messaging users.',
  },
  {
    id: 'lib-sms-investment',
    category: 'sms_scams',
    name: 'Guaranteed Double-Return Scheme',
    templateLabel: 'Investment scams',
    channel: 'sms',
    senderName: 'VIP-WEALTH',
    phoneNumber: '+91 90000 00819',
    content:
      'Guaranteed 100% risk-free double return! Invest ₹10,000 today and get ₹22,000 return in 10 days. Register immediately at https://double-wealth.example.com',
    expectedRiskLabel: 'High Risk',
    markedSuspicious: true,
    testingDescription:
      'Tests detection of guaranteed high-return investment promises and registration links.',
  },
  {
    id: 'lib-sms-govt-benefit',
    category: 'sms_scams',
    name: 'Senior Pension Hold & APK Install',
    templateLabel: 'Fake government benefit messages',
    channel: 'sms',
    senderName: 'PENSION-CELL',
    phoneNumber: '+91 90000 00688',
    content:
      'URGENT: Your senior citizen pension is on hold. Download pension-certificate-update.apk from https://pension-fix.example.net or install AnyDesk now to verify.',
    expectedRiskLabel: 'High Risk',
    markedSuspicious: true,
    testingDescription:
      'Tests fake pension benefit holds combined with malicious APK and remote-access software lures.',
  },
  {
    id: 'lib-sms-police-threat',
    category: 'sms_scams',
    name: 'Cyber Police Digital Arrest Notice',
    templateLabel: 'Fake police threats',
    channel: 'sms',
    senderName: 'CYBER-NOTICE',
    phoneNumber: '+91 90000 00411',
    content:
      'URGENT: Cyber Crime Police found an illegal parcel in your name and issued an arrest warrant for digital arrest. Call 90000-00411 immediately to avoid action.',
    expectedRiskLabel: 'High Risk',
    markedSuspicious: true,
    testingDescription:
      'Tests detection of fake law-enforcement digital arrest intimidation and unverified callback numbers.',
  },
  {
    id: 'lib-sms-electricity',
    category: 'sms_scams',
    name: 'Tonight 9:30 PM Power Disconnection',
    templateLabel: 'Electricity disconnection threats',
    channel: 'sms',
    senderName: 'PWR-BILLING',
    phoneNumber: '+91 90000 00142',
    content:
      'Dear Consumer, your home electricity power will be disconnected tonight at 9:30 PM because last month bill was not updated. Call officer immediately at 90000-00199.',
    expectedRiskLabel: 'High Risk',
    markedSuspicious: true,
    testingDescription:
      'Tests same-night utility cutoff panic messages pushing victims to call personal mobile numbers.',
  },
  {
    id: 'lib-sms-suspicious-link',
    category: 'sms_scams',
    name: 'Shortened Bonus Expiry Phishing Link',
    templateLabel: 'Suspicious links',
    channel: 'sms',
    senderName: 'REWARD-HUB',
    phoneNumber: '+91 90000 00740',
    content:
      'URGENT: Your loyalty cash points expire within 2 hours. Tap http://bit.ly/senior-cash-claim-example immediately to transfer funds.',
    expectedRiskLabel: 'Suspicious',
    markedSuspicious: true,
    testingDescription:
      'Tests shortened URL detection combined with artificial countdown urgency.',
  },

  // ==================== 2. SAFE MESSAGES (ORDINARY COMPARISON) ====================
  {
    id: 'lib-sms-safe-clinic',
    category: 'safe_messages',
    name: 'Eye Clinic Checkup Reminder',
    templateLabel: 'Ordinary legitimate-looking messages (Clinic)',
    channel: 'sms',
    senderName: 'Sunrise Eye Clinic',
    phoneNumber: 'VM-CLINIC',
    content:
      'Friendly reminder: Your routine eye checkup with Dr. Meera Nair is tomorrow at 10:30 AM at Sunrise Clinic. Please bring your reading glasses.',
    expectedRiskLabel: 'Safe / Ordinary',
    markedSuspicious: false,
    testingDescription:
      'Verifies that an ordinary appointment reminder delivers cleanly without triggering a false scam alert.',
  },
  {
    id: 'lib-sms-safe-family',
    category: 'safe_messages',
    name: 'Daughter Dinner & Evening Check-In',
    templateLabel: 'Ordinary legitimate-looking messages (Family)',
    channel: 'sms',
    senderName: 'Priya (Daughter)',
    phoneNumber: '+91 90000 10202',
    content:
      'Hi Dad! Arjun and I are coming over for lunch this Sunday. I am bringing homemade carrot halwa and fresh mangoes for you!',
    expectedRiskLabel: 'Safe / Ordinary',
    markedSuspicious: false,
    testingDescription:
      'Verifies that normal family messages show a standard notification banner with zero scam warnings.',
  },
  {
    id: 'lib-sms-safe-pharmacy',
    category: 'safe_messages',
    name: 'Prepaid Pharmacy Refill Ready',
    templateLabel: 'Ordinary legitimate-looking messages (Pharmacy)',
    channel: 'sms',
    senderName: 'CarePlus Pharmacy',
    phoneNumber: 'VM-CAREPH',
    content:
      'CarePlus Pharmacy: Your monthly blood pressure and vitamin tablets refill is packed and ready for pickup before 8:00 PM. Already paid — no OTP or payment required.',
    expectedRiskLabel: 'Safe / Ordinary',
    markedSuspicious: false,
    testingDescription:
      'Tests negation-guard accuracy so legitimate "no OTP or payment required" notices are not misflagged.',
  },

  // ==================== 3. SUSPICIOUS CALLS ====================
  {
    id: 'lib-call-bank-support',
    category: 'suspicious_calls',
    name: 'Bank Support — OTP & PIN Theft Call',
    templateLabel: 'Bank Support (Suspicious)',
    channel: 'call',
    senderName: 'Bank Support',
    phoneNumber: '+91 90000 00299',
    content:
      'Caller claims to be from Bank Card Security warning that ₹42,000 is being debited and asks you to read out your 6-digit OTP and ATM PIN urgently.',
    expectedRiskLabel: 'High Risk',
    markedSuspicious: true,
    testingDescription:
      'Tests incoming call ringtone, ElderGuardian call screen, and full-screen multilingual scam warning for fake bank support.',
  },
  {
    id: 'lib-call-cyber-police',
    category: 'suspicious_calls',
    name: 'Cyber Police Digital Arrest Call',
    templateLabel: 'Cyber Police Desk (Suspicious)',
    channel: 'call',
    senderName: 'Cyber Crime Desk (Unverified)',
    phoneNumber: '+91 90000 00411',
    content:
      'Caller claims to be Cyber Crime Police stating an illegal parcel was found in your name and demands an immediate digital arrest verification fee.',
    expectedRiskLabel: 'High Risk',
    markedSuspicious: true,
    testingDescription:
      'Tests high-risk police intimidation call detection and automatic native-language voice guidance.',
  },
  {
    id: 'lib-call-parcel-scam',
    category: 'suspicious_calls',
    name: 'Parcel Service — Customs Fee Scam Call',
    templateLabel: 'Parcel Service (Suspicious Fee)',
    channel: 'call',
    senderName: 'Parcel Service',
    phoneNumber: '+91 90000 00429',
    content:
      'Caller claims your courier parcel is held at customs and asks you to pay ₹499 fee and share your UPI PIN over the phone immediately.',
    expectedRiskLabel: 'High Risk',
    markedSuspicious: true,
    testingDescription:
      'Tests suspicious delivery caller demanding upfront payment and secret PIN details.',
  },
  {
    id: 'lib-call-remote-pension',
    category: 'suspicious_calls',
    name: 'Pension Helpdesk — AnyDesk Screen Share',
    templateLabel: 'Pension Support (Suspicious)',
    channel: 'call',
    senderName: 'Pension Support Agent',
    phoneNumber: '+91 90000 00688',
    content:
      'URGENT: Caller claims your senior citizen pension is on hold and instructs you to install AnyDesk screen-sharing app on your phone right now.',
    expectedRiskLabel: 'High Risk',
    markedSuspicious: true,
    testingDescription:
      'Tests remote screen-sharing app call scam detection and warning narration.',
  },

  // ==================== 4. SAFE CALLS ====================
  {
    id: 'lib-call-unknown-neutral',
    category: 'safe_calls',
    name: 'Unknown Caller — Polite Wrong Number',
    templateLabel: 'Unknown Caller (Ordinary)',
    channel: 'call',
    senderName: 'Unknown Caller',
    phoneNumber: '+91 90000 88410',
    content:
      'Caller from a local community library asking if this is the neighborhood book club coordinator, then politely apologizing for dialing the wrong number.',
    expectedRiskLabel: 'Safe / Ordinary',
    markedSuspicious: false,
    testingDescription:
      'Verifies ElderGuardian does NOT falsely claim every unknown caller is fraudulent when no scam signs are present.',
  },
  {
    id: 'lib-call-parcel-safe',
    category: 'safe_calls',
    name: 'Parcel Service — Prepaid Gate Drop-Off',
    templateLabel: 'Parcel Service (Ordinary)',
    channel: 'call',
    senderName: 'Parcel Service',
    phoneNumber: '+91 90000 10550',
    content:
      'Local delivery agent calling from your front gate to leave your already paid grocery order at the door. No OTP or payment requested.',
    expectedRiskLabel: 'Safe / Ordinary',
    markedSuspicious: false,
    testingDescription:
      'Tests ordinary courier arrival call so user can answer, see synchronized call duration on both phones, and end the call.',
  },
  {
    id: 'lib-call-clinic-safe',
    category: 'safe_calls',
    name: 'Dr. Meera Clinic — Appointment Confirmation',
    templateLabel: 'Dr. Meera Clinic (Ordinary)',
    channel: 'call',
    senderName: 'Dr. Meera Clinic',
    phoneNumber: '+91 90000 10200',
    content:
      'Receptionist calling from Sunrise Eye Clinic to confirm your 10:30 AM routine checkup slot tomorrow morning. No payment or personal code requested.',
    expectedRiskLabel: 'Safe / Ordinary',
    markedSuspicious: false,
    testingDescription:
      'Tests routine healthcare call synchronization (Answer, live timer on both phones, Decline, or End Call).',
  },
];

export const HACKER_SMS_TEMPLATES = HACKER_SCENARIO_LIBRARY.filter(
  (s) => s.channel === 'sms'
);

export const HACKER_CALL_PRESETS = HACKER_SCENARIO_LIBRARY.filter(
  (s) => s.channel === 'call'
);

export const HACKER_CONTACTS: HackerContactPersona[] = [
  {
    id: 'contact-target-elderguardian',
    name: ELDER_GUARDIAN_TARGET.name,
    phoneNumber: ELDER_GUARDIAN_TARGET.phoneNumber,
    roleDescription: 'Simulated Receiver Phone (Left Device)',
    isReceiverTarget: true,
    defaultSmsText: HACKER_SMS_TEMPLATES[0].content,
    defaultCallPitch: HACKER_CALL_PRESETS[0].content,
    markedSuspicious: true,
  },
  {
    id: 'contact-bank-support',
    name: 'Bank Support',
    phoneNumber: '+91 90000 00299',
    roleDescription: 'Spoofed Card Security Persona (Suspicious)',
    defaultSmsText: HACKER_SMS_TEMPLATES[1].content,
    defaultCallPitch: HACKER_CALL_PRESETS[0].content,
    markedSuspicious: true,
  },
  {
    id: 'contact-parcel-service',
    name: 'Parcel Service',
    phoneNumber: '+91 90000 10550',
    roleDescription: 'Courier Persona (Ordinary Gate Delivery)',
    defaultSmsText: HACKER_SMS_TEMPLATES[4].content,
    defaultCallPitch:
      'Local delivery agent calling from your front gate to leave your already paid grocery order at the door. No OTP or payment requested.',
    markedSuspicious: false,
  },
  {
    id: 'contact-unknown-caller',
    name: 'Unknown Caller',
    phoneNumber: '+91 90000 88410',
    roleDescription: 'Unlisted Number (Ordinary Wrong Number)',
    defaultSmsText:
      'Hello, checking if this is Mr. Rao from the neighborhood chess club? Sorry if I texted the wrong number.',
    defaultCallPitch:
      'Caller from a local community library asking if this is the neighborhood book club coordinator, then politely apologizing for dialing the wrong number.',
    markedSuspicious: false,
  },
  {
    id: 'contact-cyber-desk',
    name: 'Cyber Crime Desk (Unverified)',
    phoneNumber: '+91 90000 00411',
    roleDescription: 'Fake Law-Enforcement Persona (High Risk)',
    defaultSmsText: HACKER_SMS_TEMPLATES[9].content,
    defaultCallPitch: HACKER_CALL_PRESETS[1].content,
    markedSuspicious: true,
  },
  {
    id: 'contact-clinic-safe',
    name: 'Sunrise Eye Clinic',
    phoneNumber: '+91 90000 10200',
    roleDescription: 'Legitimate Healthcare Reminder Persona (Safe)',
    defaultSmsText:
      'Friendly reminder: Your routine eye checkup with Dr. Meera Nair is tomorrow at 10:30 AM at Sunrise Clinic. Please bring your reading glasses.',
    defaultCallPitch:
      'Receptionist calling from Sunrise Eye Clinic to confirm your 10:30 AM routine checkup slot tomorrow morning. No payment or personal code requested.',
    markedSuspicious: false,
  },
];
