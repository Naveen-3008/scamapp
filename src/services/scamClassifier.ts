import { getTranslation } from '../i18n/translations';
import {
  ClassificationResult,
  ClassifierRequest,
  EventChannel,
  IScamClassifierService,
  LanguageCode,
  RiskLevel,
  ScamCategoryId,
  WarningSignId,
} from '../types';

interface RuleDefinition {
  id: WarningSignId;
  weight: number;
  primaryCategory: ScamCategoryId;
  categoryPriority: number;
  channels?: EventChannel[];
  patterns: RegExp[];
  negationGuard?: RegExp;
}

const DETECTION_RULES: RuleDefinition[] = [
  {
    id: 'remote_screen_sharing_app',
    weight: 55,
    primaryCategory: 'remote_access_scam',
    categoryPriority: 100,
    patterns: [
      /\b(?:AnyDesk|TeamViewer|QuickSupport|RustDesk|AirDroid)\b/gi,
      /screen[\s-]*shar(?:e|ing)/gi,
      /திரை\s*பகிர்வு/g,
      /रिमोट\s*ऐप|स्क्रीन\s*शेयर/g,
    ],
  },
  {
    id: 'apk_file_download',
    weight: 55,
    primaryCategory: 'suspicious_app_install',
    categoryPriority: 98,
    patterns: [
      /[a-z0-9-_]+\.apk\b/gi,
      /\.apk/gi,
    ],
  },
  {
    id: 'requests_otp_or_pin',
    weight: 48,
    primaryCategory: 'otp_pin_theft',
    categoryPriority: 95,
    negationGuard:
      /\b(?:no\s+(?:otp\s+or\s+payment|payment\s+or\s+otp|personal\s+code)\s+(?:required|needed|requested))\b/i,
    patterns: [
      /\b(?:\d[\s-]*digit\s+)?OTP\b/gi,
      /\b(?:UPI\s+PIN|ATM\s+PIN|bank\s+PIN|card\s+PIN|CVV|password|passcode)\b/gi,
      /\benter\s+(?:your\s+)?PIN\b/gi,
      /PIN\s*(?:எண்|नंबर|నమోదు|നൽകുക|ನಮೂದಿಸಿ|দিন|ডালें|নম্বর)/gi,
      /(?:OTP|ओटीपी|ஓடிபி|ಒಟಿಪಿ|ওটিপি)/gi,
    ],
  },
  {
    id: 'suspicious_upi_collect',
    weight: 42,
    primaryCategory: 'upi_scam',
    categoryPriority: 92,
    patterns: [
      /\bUPI\s+PIN\b[\s\S]{0,65}\b(?:receive|refund|cashback|claim|reward)\b/gi,
      /\b(?:cashback|refund|subsidy\s+refund|lucky\s+draw)\b[\s\S]{0,110}\bUPI\s+PIN\b/gi,
      /रिफंड[\s\S]{0,110}UPI\s*PIN/gi,
      /UPI\s*PIN[^।.!?\n]{0,65}(?:प्राप्त|पाने|பெற|ಪಡೆಯಲು|পেতে)/gi,
    ],
  },
  {
    id: 'legal_or_police_intimidation',
    weight: 52,
    primaryCategory: 'police_legal_threat',
    categoryPriority: 91,
    patterns: [
      /\b(?:digital\s+arrest|arrest\s+warrant|cyber\s*crime\s*(?:police|cell|desk)|illegal\s+parcel|police\s+action)\b/gi,
      /டிஜிட்டல்\s*கைது|கைது\s*வாரண்ட்|சைபர்\s*போலீஸ்|சட்டவிரோத\s*பார்சல்/g,
      /डिजिटल\s*अरेस्ट|गिरफ्तारी|साइबर\s*क्राइम|पुलिस\s*कार्रवाई/g,
      /డిజిటల్\s*అరెస్ట్|పోలీస్\s*అధికారి|అరెస్ట్\s*వారెంట్|సైబర్\s*క్రైమ్/g,
      /ഡിജിറ്റൽ\s*അറസ്റ്റ്|പോലീസ്\s*കേസ്/g,
      /ಡಿಜಿಟಲ್\s*ಅರೆಸ್ಟ್|ಸೈಬರ್\s*ಪೊಲೀಸ್|ಅಕ್ರಮ\s*ಪಾರ್ಸೆಲ್/g,
      /ডিজিটাল\s*অ্যারেস্ট|পুলিশ\s*কেস|গ্রেপ্তার/g,
    ],
  },
  {
    id: 'caller_org_impersonation',
    weight: 34,
    primaryCategory: 'bank_impersonation',
    categoryPriority: 85,
    channels: ['call'],
    patterns: [
      /\bclaims\s+to\s+be\s+(?:from\s+)?(?:Cyber\s+Crime\s+Police|Bank\s+Card\s+Security|bank|police|government)/gi,
      /அதிகாரி\s*என்று\s*கூறி/g,
      /बैंक\s*अधिकारी\s*बताकर/g,
      /పోలీస్\s*అధికారిని\s*అని\s*చెప్పి/g,
      /ബാങ്ക്\s*ഉദ്യോഗസ്ഥൻ\s*എന്ന\s*വ്യാജേന/g,
      /ಪೊಲೀಸ್\s*ಅಧಿಕಾರಿ\s*ಎಂದು\s*ಹೇಳಿಕೊಂಡು/g,
      /ব্যাংক\s*কর্মকর্তা\s*সেজে/g,
    ],
  },
  {
    id: 'tonight_utility_cutoff',
    weight: 42,
    primaryCategory: 'electricity_threat',
    categoryPriority: 88,
    patterns: [
      /\b(?:electricity|power\s+supply|electricity\s+power)\b[\s\S]{0,65}\b(?:disconnected|cut\s+off|suspended)\b/gi,
      /\bdisconnected\s+tonight\b/gi,
      /மின்சாரம்\s*துண்டிக்கப்படும்|மின்\s*கட்டணம்\s*பதிவாகாததால்/g,
      /बिजली\s*काट\s*दी\s*जाएगी|बिजली\s*कनेक्शन\s*कट/g,
      /కరెంట్\s*కట్\s*చేయబడుతుంది|విద్యుత్\s*శాఖ\s*హెచ్చరిక/g,
      /വൈദ്യുതി\s*വിച്ഛേദിക്കും/g,
      /ವಿದ್ಯುತ್\s*ಕಡಿತ/g,
      /বিদ্যুৎ\s*সংযোগ\s*বিচ্ছিন্ন/g,
    ],
  },
  {
    id: 'fake_kyc_threat',
    weight: 38,
    primaryCategory: 'fake_kyc',
    categoryPriority: 84,
    patterns: [
      /\b(?:KYC|PAN[\s-]*KYC|expired\s+KYC)\b[\s\S]{0,55}\b(?:expired|incomplete|update|suspended|blocked|freeze|freezes)\b/gi,
      /\bsuspended\s+today\s+due\s+to\s+expired\s+KYC\b/gi,
      /KYC\s*(?:புதுப்பிக்க|புதுப்பிப்பு|समाप्त|अपडेट|గడువు|ಅಪ್‌ಡೇಟ್|അപ്ഡേറ്റ്|আপডেট|വിഭാഗം)/gi,
    ],
  },
  {
    id: 'impersonates_bank',
    weight: 34,
    primaryCategory: 'bank_impersonation',
    categoryPriority: 82,
    patterns: [
      /\b(?:savings\s+account|bank\s+account|debit\s+card|ATM\s+card|account)\b[\s\S]{0,55}\b(?:suspended|blocked|freezes|frozen|deactivated)\b/gi,
      /\b₹[0-9,]+\s+is\s+being\s+debited\b/gi,
      /வங்கிக்\s*கணக்கு[\s\S]{0,45}முடக்கப்படும்/g,
      /बैंक\s*खाता[\s\S]{0,45}बंद|एटीएम\s*कार्ड\s*ब्लॉक/g,
      /బ్యాంకు\s*ఖాతా[\s\S]{0,45}బ్లాక్/g,
      /അക്കൗണ്ട്\s*ബ്ലോക്ക്\s*ആകുമെന്നു/g,
      /ಬ್ಯಾಂಕ್\s*ಖಾತೆ[\s\S]{0,45}ಸ್ಥಗಿತಗೊಳ್ಳಲಿದೆ/g,
      /ব্যাংক\s*অ্যাকাউন্ট\s*বন্ধ\s*হয়ে\s*যাচ্ছে/g,
    ],
  },
  {
    id: 'unrealistic_prize_lottery',
    weight: 38,
    primaryCategory: 'lottery_prize_scam',
    categoryPriority: 80,
    patterns: [
      /\b(?:won|winner)\b[\s\S]{0,45}\b(?:lucky\s+draw|lottery|festival\s+lucky\s+draw|bumper\s+prize)\b/gi,
      /\blucky\s+draw\b|\blottery\s+prize\b/gi,
      /குலுக்கல்\s*பரிசு|பரிசு\s*விழுந்துள்ளது/g,
      /लॉटरी|लकी\s*ड्रॉ/g,
      /లాటరీ\s*బహుమతి/g,
      /ഭാഗ്യക്കുറി\s*സമ്മാനം|സമ്മാനം\s*ലഭിച്ചിരിക്കുന്നു/g,
      /ಲಾಟರಿ\s*ಬಹುಮಾನ/g,
      /লটারি\s*পুরস্কার/g,
    ],
  },
  {
    id: 'guaranteed_investment_return',
    weight: 38,
    primaryCategory: 'investment_scam',
    categoryPriority: 79,
    patterns: [
      /\b(?:guaranteed|100%\s*risk[\s-]*free|double\s+return)\b[\s\S]{0,45}\b(?:return|profit|scheme|wealth)\b/gi,
      /\binvest\s+₹?[0-9,]+\b[\s\S]{0,45}\b(?:get|return)\s+₹?[0-9,]+\b/gi,
      /பணம்\s*இரட்டிப்பாகும்/g,
      /पैसा\s*दोगुना|पक्का\s*रिटर्न/g,
      /డబ్బు\s*రెట్టింపు/g,
      /പണം\s*ഇരട്ടിയാകും/g,
      /ಹಣ\s*ದ್ವಿಗುಣ|ಖಚಿತ\s*ಲಾಭ/g,
      /টাকা\s*দ্বিগুণ|১০০%\s*নিশ্চিত\s*লাভ/g,
    ],
  },
  {
    id: 'upfront_loan_fee',
    weight: 38,
    primaryCategory: 'fake_loan_offer',
    categoryPriority: 78,
    patterns: [
      /\b(?:pre[\s-]*approved|instant\s+loan|0%\s*interest)\b[\s\S]{0,65}\b(?:processing\s+fee|no\s+documents)\b/gi,
      /\bupfront\s+processing\s+fee\b/gi,
      /முன்பணம்\s*செலுத்த/g,
      /प्रोसेसिंग\s*फीस|प्रोसेसिंग\s*शुल्क/g,
    ],
  },
  {
    id: 'fake_government_scheme',
    weight: 34,
    primaryCategory: 'govt_benefit_scam',
    categoryPriority: 76,
    patterns: [
      /\b(?:senior\s+citizen\s+pension\s+is\s+on\s+hold|government\s+subsidy|pension\s+life[\s-]*certificate)\b/gi,
      /மூத்த\s*குடிமக்கள்\s*சிறப்பு\s*உதவித்தொகை|ஓய்வூதிய/g,
      /सरकारी\s*गैस\s*सब्सिडी|पेंशन\s*योजना/g,
      /పెన్షన్\s*పథకం/g,
      /മുതിർന്ന\s*പൗരന്മാരുടെ\s*പെൻഷൻ|പെൻഷൻ\s*തടഞ്ഞുവെച്ചിരിക്കുന്നു/g,
      /ಸರ್ಕಾರಿ\s*ಪಿಂಚಣಿ/g,
      /সরকারি\s*ভাতা|পেনশন/g,
    ],
  },
  {
    id: 'fake_parcel_fee',
    weight: 32,
    primaryCategory: 'parcel_delivery_scam',
    categoryPriority: 74,
    negationGuard: /\b(?:already\s+paid|no\s+otp\s+or\s+payment)\b/i,
    patterns: [
      /\b(?:package|parcel|shipment)\b[\s\S]{0,70}\b(?:held|missing\s+house\s+number|redelivery\s+fee|delivery\s+fee)\b/gi,
      /\bpay\s+₹\d{1,3}\s+(?:redelivery|delivery|parcel)\s+fee\b/gi,
      /பார்சல்[\s\S]{0,80}கட்டணம்/g,
      /पार्सल[\s\S]{0,90}शुल्क/g,
      /పార్శిల్[\s\S]{0,95}డెలివరీ\s*రుసుము/g,
      /പാഴ്സൽ[\s\S]{0,80}ഫീസ്/g,
      /পার্সেল[\s\S]{0,80}ফি/g,
    ],
  },
  {
    id: 'unrealistic_job_income',
    weight: 32,
    primaryCategory: 'fake_job_offer',
    categoryPriority: 72,
    patterns: [
      /\b(?:part[\s-]*time\s+work\s+from\s+home|work\s+from\s+home)\b/gi,
      /\bearn\s+₹?[0-9,]+\s+daily\b/gi,
      /வீட்டிலிருந்தே\s*சம்பாதிக்க/g,
      /घर\s*बैठे\s*कमाई|रोज़\s*कमाएं/g,
    ],
  },
  {
    id: 'suspicious_link',
    weight: 24,
    primaryCategory: 'phishing_link',
    categoryPriority: 50,
    patterns: [
      /https?:\/\/[^\s)]+/gi,
      /\bbit\.ly\/[^\s]+|\btinyurl\.com\/[^\s]+/gi,
    ],
  },
  {
    id: 'unverified_callback_number',
    weight: 18,
    primaryCategory: 'urgent_financial_request',
    categoryPriority: 40,
    channels: ['sms', 'whatsapp'],
    patterns: [/90000-\d{5}/g],
  },
  {
    id: 'urgent_pressure_tactic',
    weight: 16,
    primaryCategory: 'urgent_financial_request',
    categoryPriority: 35,
    patterns: [
      /\b(?:URGENT|immediately|urgently|within\s+\d+\s+hours?|tonight\s+at\s+\d)\b/gi,
      /அவசரம்|உடனே|இன்றிரவு/g,
      /चेतावनी|तुरंत|आज\s*रात|आज\s*शाम/g,
      /అత్యవసరం|వెంటనే|ఈ\s*రాత్రి/g,
      /അടിയന്തരം|ഉടൻ/g,
      /ತುರ್ತು\s*ಸೂಚನೆ|ತಕ್ಷಣ/g,
      /জরুরি\s*বিজ্ঞপ্তি|অবিলম্বে|আজ\s*রাত|এখনই/g,
    ],
  },
];

export class LocalRuleBasedClassifier implements IScamClassifierService {
  public readonly engineType = 'local-rule-engine' as const;

  public async classify(request: ClassifierRequest): Promise<ClassificationResult> {
    return this.classifySync(request);
  }

  public classifySync(request: ClassifierRequest): ClassificationResult {
    const { channel, senderName, content, targetLanguage } = request;
    const t = getTranslation(targetLanguage);
    const fullScanText = `${senderName} ${content}`;

    const detectedSigns: WarningSignId[] = [];
    const matchedPhrasesSet = new Set<string>();
    let rawScore = 0;
    let bestCategory: ScamCategoryId = 'ordinary_message';
    let bestPriority = -1;

    for (const rule of DETECTION_RULES) {
      if (rule.channels && !rule.channels.includes(channel)) {
        continue;
      }
      if (rule.negationGuard && rule.negationGuard.test(fullScanText)) {
        continue;
      }

      let ruleMatched = false;
      for (const pattern of rule.patterns) {
        const flags = pattern.flags.includes('g') ? pattern.flags : `${pattern.flags}g`;
        const regex = new RegExp(pattern.source, flags);
        let match: RegExpExecArray | null;
        while ((match = regex.exec(content)) !== null) {
          const phrase = match[0].trim();
          if (phrase.length >= 3) {
            matchedPhrasesSet.add(phrase);
            ruleMatched = true;
          }
          if (match.index === regex.lastIndex) {
            regex.lastIndex++;
          }
        }
      }

      if (ruleMatched) {
        detectedSigns.push(rule.id);
        rawScore += rule.weight;
        if (rule.categoryPriority > bestPriority) {
          bestPriority = rule.categoryPriority;
          bestCategory = rule.primaryCategory;
        }
      }
    }

    // Refine primary category when multiple indicators combine
    if (detectedSigns.includes('legal_or_police_intimidation')) {
      bestCategory = 'police_legal_threat';
    } else if (detectedSigns.includes('unrealistic_prize_lottery')) {
      bestCategory = 'lottery_prize_scam';
    } else if (detectedSigns.includes('guaranteed_investment_return')) {
      bestCategory = 'investment_scam';
    } else if (
      detectedSigns.includes('suspicious_upi_collect') &&
      detectedSigns.includes('requests_otp_or_pin')
    ) {
      bestCategory = 'upi_scam';
    } else if (
      detectedSigns.includes('fake_kyc_threat') &&
      !detectedSigns.includes('apk_file_download') &&
      !detectedSigns.includes('remote_screen_sharing_app')
    ) {
      bestCategory = 'fake_kyc';
    }

    let heuristicScore: number;
    let riskLevel: RiskLevel;

    if (detectedSigns.length === 0) {
      heuristicScore = 6;
      riskLevel = RiskLevel.NO_OBVIOUS_SIGNS;
      bestCategory = 'ordinary_message';
    } else {
      heuristicScore = Math.min(97, Math.max(30, rawScore));
      riskLevel = heuristicScore >= 60 ? RiskLevel.HIGH_RISK : RiskLevel.SUSPICIOUS;
    }

    const leadWarning =
      riskLevel === RiskLevel.NO_OBVIOUS_SIGNS
        ? t.ordinaryMessageNote
        : channel === 'call'
          ? t.callFraudulentLead
          : t.msgFraudulentLead;

    const reasonText = this.buildDynamicReason(detectedSigns, targetLanguage);
    const safetyAdvice = t.safetyAdviceByCategory[bestCategory];

    const alertTitle =
      riskLevel === RiskLevel.HIGH_RISK ? t.scamWarningTitle : t.suspiciousNoticeTitle;

    const spokenScript =
      riskLevel === RiskLevel.NO_OBVIOUS_SIGNS
        ? t.ordinaryMessageNote
        : `${alertTitle}. ${leadWarning} ${t.reasonPrefix} ${reasonText} ${t.safetyAdvicePrefix} ${safetyAdvice}`;

    return {
      riskLevel,
      heuristicScore,
      category: bestCategory,
      warningSigns: detectedSigns,
      matchedPhrases: Array.from(matchedPhrasesSet).slice(0, 4),
      leadWarning,
      reasonText,
      safetyAdvice,
      spokenScript,
      cautionNote: t.demoAssessmentNote,
      engineType: this.engineType,
    };
  }

  private buildDynamicReason(
    warningSigns: WarningSignId[],
    language: LanguageCode
  ): string {
    const t = getTranslation(language);
    if (warningSigns.length === 0) {
      return t.ordinaryMessageNote;
    }

    const reasons: string[] = [];
    for (const signId of warningSigns) {
      const text = t.warningSignReasons[signId];
      if (text && !reasons.includes(text)) {
        reasons.push(text);
      }
      if (reasons.length >= 2) {
        break;
      }
    }
    return reasons.join(' ');
  }
}

const localClassifierInstance = new LocalRuleBasedClassifier();

export function getScamClassifier(): IScamClassifierService {
  return localClassifierInstance;
}
