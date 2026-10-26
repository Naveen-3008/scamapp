import { SamplePhoneScenario } from '../types';

export const SAMPLE_PHONE_SCENARIOS: SamplePhoneScenario[] = [
  // ==================== ENGLISH SCENARIOS (7) ====================
  {
    id: 'scn-en-01',
    channel: 'sms',
    senderName: 'VM-NTBANK',
    phoneNumber: 'VM-NTBANK',
    content:
      'URGENT: Your National Trust savings account will be suspended today due to expired KYC. Click https://ntbank-kyc.example.com immediately and enter your 6-digit OTP to keep your card active.',
    scenarioLanguage: 'en',
  },
  {
    id: 'scn-en-02',
    channel: 'whatsapp',
    senderName: 'Rohan (Grandson)',
    phoneNumber: '+91 90000 10102',
    content:
      'Grandpa, I reached the hostel safely after my train journey! Having dinner now, I will call you on Sunday morning.',
    scenarioLanguage: 'en',
  },
  {
    id: 'scn-en-03',
    channel: 'call',
    senderName: 'Cyber Crime Desk (Unverified)',
    phoneNumber: '+91 90000 00411',
    content:
      'Automated Notice: Caller claims to be Cyber Crime Police stating an illegal parcel was found in your name and demands immediate digital arrest verification fee.',
    scenarioLanguage: 'en',
  },
  {
    id: 'scn-en-04',
    channel: 'whatsapp',
    senderName: 'Mega Lucky Draw Desk',
    phoneNumber: '+91 90000 00509',
    content:
      'Congratulations! Your WhatsApp number won ₹25,00,000 in the Festival Lucky Draw! Open https://prize-claim.example.org and enter your UPI PIN to receive your cash reward.',
    scenarioLanguage: 'en',
  },
  {
    id: 'scn-en-05',
    channel: 'sms',
    senderName: 'Sunrise Eye Clinic',
    phoneNumber: 'VM-CLINIC',
    content:
      'Friendly reminder: Your eye checkup with Dr. Meera Nair is tomorrow at 10:30 AM at Sunrise Clinic. Please bring your reading glasses.',
    scenarioLanguage: 'en',
  },
  {
    id: 'scn-en-06',
    channel: 'whatsapp',
    senderName: 'Pension Support Agent',
    phoneNumber: '+91 90000 00688',
    content:
      'URGENT: Your senior citizen pension is on hold. Download bank-pension-update.apk from https://pension-fix.example.net or install AnyDesk now to verify.',
    scenarioLanguage: 'en',
  },
  {
    id: 'scn-en-07',
    channel: 'call',
    senderName: 'Dr. Meera Clinic',
    phoneNumber: '+91 90000 10200',
    content:
      'Receptionist calling from Sunrise Eye Clinic to confirm your 10:30 AM routine checkup slot tomorrow morning. No payment or personal code requested.',
    scenarioLanguage: 'en',
  },

  // ==================== ADDITIONAL ENGLISH VARIETY (7) ====================
  {
    id: 'scn-en-08',
    channel: 'sms',
    senderName: 'JD-SWIFTP',
    phoneNumber: 'JD-SWIFTP',
    content:
      'SwiftParcel Alert: Package #SP9041 is held at the hub due to missing house number. Pay ₹29 delivery fee within 2 hours at https://parcel-fee.example.net',
    scenarioLanguage: 'en',
  },
  {
    id: 'scn-en-09',
    channel: 'whatsapp',
    senderName: 'Daily Task HR',
    phoneNumber: '+91 90000 00612',
    content:
      'Part-time work from home! Earn ₹5,000 daily on your phone just by liking hotel photos. Join task group: https://daily-earn.example.org',
    scenarioLanguage: 'en',
  },
  {
    id: 'scn-en-10',
    channel: 'sms',
    senderName: '+91 90000 00142',
    phoneNumber: '+91 90000 00142',
    content:
      'Dear Consumer, your home electricity power will be disconnected tonight at 9:30 PM because last month bill was not updated. Call officer immediately at 90000-00199.',
    scenarioLanguage: 'en',
  },
  {
    id: 'scn-en-11',
    channel: 'whatsapp',
    senderName: 'VIP Wealth Club',
    phoneNumber: '+91 90000 00819',
    content:
      'Guaranteed 100% risk-free double return! Invest ₹10,000 today and get ₹22,000 return in 12 days. Register at https://double-wealth.example.com',
    scenarioLanguage: 'en',
  },
  {
    id: 'scn-en-12',
    channel: 'sms',
    senderName: 'FreshBasket',
    phoneNumber: 'VM-FRESHB',
    content:
      'Your FreshBasket grocery order #4108 (Milk, Apples, and Oats) was delivered at your front door. Already paid — no OTP or payment required.',
    scenarioLanguage: 'en',
  },
  {
    id: 'scn-en-13',
    channel: 'call',
    senderName: 'Card Security Desk (Unverified)',
    phoneNumber: '+91 90000 00299',
    content:
      'Caller claims to be from Bank Card Security warning that ₹42,000 is being debited and asks you to read out your 6-digit OTP and ATM PIN urgently.',
    scenarioLanguage: 'en',
  },
  {
    id: 'scn-en-14',
    channel: 'sms',
    senderName: 'EZ-LOANS',
    phoneNumber: 'EZ-LOANS',
    content:
      'Pre-approved ₹5,00,000 instant loan at 0% interest with no documents! Pay ₹999 upfront processing fee at https://instant-loan.example.org',
    scenarioLanguage: 'en',
  },

  // ==================== TAMIL SCENARIOS — தமிழ் (7) ====================
  {
    id: 'scn-ta-01',
    channel: 'sms',
    senderName: 'VM-TNBANK',
    phoneNumber: 'VM-TNBANK',
    content:
      'அவசரம்: உங்கள் வங்கிக் கணக்கு KYC புதுப்பிக்கப்படாததால் இன்று முடக்கப்படும். உடனே https://tn-kyc.example.com இணைப்பைத் தொட்டு OTP எண்ணைப் பதிவு செய்யவும்.',
    scenarioLanguage: 'ta',
  },
  {
    id: 'scn-ta-02',
    channel: 'whatsapp',
    senderName: 'கார்த்திக் (மகன்)',
    phoneNumber: '+91 90000 20101',
    content:
      'அம்மா, நான் அலுவலகத்திலிருந்து பத்திரமாக வீடு வந்து சேர்ந்துவிட்டேன். இரவு உணவு சாப்பிட்டுவிட்டு உங்களுக்கு போன் செய்கிறேன்.',
    scenarioLanguage: 'ta',
  },
  {
    id: 'scn-ta-03',
    channel: 'call',
    senderName: 'சைபர் போலீஸ் விசாரணை (உறுதிப்படுத்தப்படாதது)',
    phoneNumber: '+91 90000 00755',
    content:
      'அழைப்பவர் சைபர் போலீஸ் அதிகாரி என்று கூறி, உங்கள் பெயரில் சட்டவிரோத பார்சல் சிக்கியுள்ளதால் டிஜிட்டல் கைது வாரண்ட் பிறப்பிக்கப்பட்டுள்ளதாக மிரட்டுகிறார்.',
    scenarioLanguage: 'ta',
  },
  {
    id: 'scn-ta-04',
    channel: 'whatsapp',
    senderName: 'ஓய்வூதிய உதவி மையம்',
    phoneNumber: '+91 90000 00722',
    content:
      'அவசரம்: மூத்த குடிமக்கள் சிறப்பு உதவித்தொகை ₹12,000 பெற உடனே AnyDesk செயலியை நிறுவி அல்லது https://tn-pension.example.org இணைப்பில் UPI PIN உள்ளிடவும்.',
    scenarioLanguage: 'ta',
  },
  {
    id: 'scn-ta-05',
    channel: 'sms',
    senderName: '+91 90000 00711',
    phoneNumber: '+91 90000 00711',
    content:
      'முக்கிய அறிவிப்பு: கடந்த மாத மின் கட்டணம் பதிவாகாததால் இன்றிரவு 9:30 மணிக்கு உங்கள் வீட்டு மின்சாரம் துண்டிக்கப்படும். உடனே அழைக்கவும்: 90000-00788.',
    scenarioLanguage: 'ta',
  },
  {
    id: 'scn-ta-06',
    channel: 'sms',
    senderName: 'அருண் கண் மருத்துவமனை',
    phoneNumber: 'VM-EYECLN',
    content:
      'நினைவூட்டல்: நாளை காலை 10:30 மணிக்கு டாக்டர் லதா அவர்களுடன் உங்கள் கண் பரிசோதனை நேரம் உறுதி செய்யப்பட்டுள்ளது. பழைய மருத்துவச் சீட்டை எடுத்து வரவும்.',
    scenarioLanguage: 'ta',
  },
  {
    id: 'scn-ta-07',
    channel: 'whatsapp',
    senderName: 'பண்டிகை குலுக்கல் பரிசு',
    phoneNumber: '+91 90000 00804',
    content:
      'வாழ்த்துகள்! உங்கள் எண்ணிற்கு ₹15,00,000 குலுக்கல் பரிசு விழுந்துள்ளது. பரிசைப் பெற ₹1,200 முன்பணம் செலுத்த https://prize-tn.example.com பார்க்கவும்.',
    scenarioLanguage: 'ta',
  },

  // ==================== HINDI SCENARIOS — हिन्दी (6) ====================
  {
    id: 'scn-hi-01',
    channel: 'sms',
    senderName: 'AD-SBALERT',
    phoneNumber: 'AD-SBALERT',
    content:
      'चेतावनी: आपका बैंक खाता आज शाम बंद हो जाएगा क्योंकि आपका KYC समाप्त हो गया है। तुरंत https://kyc-hi.example.com खोलें और अपना OTP दर्ज करें।',
    scenarioLanguage: 'hi',
  },
  {
    id: 'scn-hi-02',
    channel: 'whatsapp',
    senderName: 'नेहा (बेटी)',
    phoneNumber: '+91 90000 30102',
    content:
      'पापा, आपकी दवाई मेडिकल स्टोर से ले ली है। शाम को घर आते समय लेती आऊँगी, आप समय पर चाय-नाश्ता कर लेना।',
    scenarioLanguage: 'hi',
  },
  {
    id: 'scn-hi-03',
    channel: 'call',
    senderName: 'बैंक सुरक्षा विभाग (असत्यापित)',
    phoneNumber: '+91 90000 00344',
    content:
      'कॉल करने वाला खुद को बैंक अधिकारी बताकर कह रहा है कि आपका एटीएम कार्ड ब्लॉक हो रहा है और रोकने के लिए तुरंत OTP व UPI PIN मांग रहा है।',
    scenarioLanguage: 'hi',
  },
  {
    id: 'scn-hi-04',
    channel: 'whatsapp',
    senderName: 'बिजली बिल सहायता',
    phoneNumber: '+91 90000 00315',
    content:
      'चेतावनी: पिछला बिल अपडेट न होने से आज रात 9:30 बजे बिजली काट दी जाएगी। तुरंत bill-update.apk डाउनलोड करें या AnyDesk ऐप खोलकर 90000-00399 पर कॉल करें।',
    scenarioLanguage: 'hi',
  },
  {
    id: 'scn-hi-05',
    channel: 'sms',
    senderName: 'UPI-REFUND',
    phoneNumber: 'UPI-REFUND',
    content:
      'बधाई हो! आपको ₹3,500 का सरकारी गैस सब्सिडी रिफंड मिला है। पैसे प्राप्त करने के लिए https://upi-hi.example.org खोलें और अपना UPI PIN डालें।',
    scenarioLanguage: 'hi',
  },
  {
    id: 'scn-hi-06',
    channel: 'call',
    senderName: 'नेहा (बेटी)',
    phoneNumber: '+91 90000 30102',
    content:
      'आपकी बेटी नेहा शाम का हालचाल पूछने और डॉक्टर की अपॉइंटमेंट का समय याद दिलाने के लिए कॉल कर रही है।',
    scenarioLanguage: 'hi',
  },

  // ==================== TELUGU SCENARIOS — తెలుగు (5) ====================
  {
    id: 'scn-te-01',
    channel: 'sms',
    senderName: 'VM-APBANK',
    phoneNumber: 'VM-APBANK',
    content:
      'అత్యవసరం: మీ బ్యాంకు ఖాతా KYC గడువు ముగిసినందున ఈరోజు బ్లాక్ చేయబడుతుంది. వెంటనే https://ap-kyc.example.com ఓపెన్ చేసి OTP నమోదు చేయండి.',
    scenarioLanguage: 'te',
  },
  {
    id: 'scn-te-02',
    channel: 'whatsapp',
    senderName: 'రవి (కుమారుడు)',
    phoneNumber: '+91 90000 40101',
    content:
      'నాన్నగారు, నేను ఆఫీస్ పని ముగించుకుని హైదరాబాద్ చేరుకున్నాను. రాత్రి భోజనం తర్వాత మీకు ఫోన్ చేస్తాను.',
    scenarioLanguage: 'te',
  },
  {
    id: 'scn-te-03',
    channel: 'call',
    senderName: 'సైబర్ క్రైమ్ ఆఫీసర్ (అనిర్ధారిత)',
    phoneNumber: '+91 90000 00477',
    content:
      'కాలర్ పోలీస్ అధికారిని అని చెప్పి డిజిటల్ అరెస్ట్ వారెంట్ ఉందని భయపెడుతూ వెంటనే డబ్బు బదిలీ చేయాలని ఒత్తిడి చేస్తున్నారు.',
    scenarioLanguage: 'te',
  },
  {
    id: 'scn-te-04',
    channel: 'whatsapp',
    senderName: 'పార్శిల్ డెలివరీ డెస్క్',
    phoneNumber: '+91 90000 00429',
    content:
      'మీ పార్శిల్ చిరునామా అసంపూర్తిగా ఉన్నందున నిలిపివేయబడింది. ₹25 డెలివరీ రుసుము చెల్లించడానికి https://parcel-te.example.net లింక్ నొక్కండి.',
    scenarioLanguage: 'te',
  },
  {
    id: 'scn-te-05',
    channel: 'sms',
    senderName: '+91 90000 00422',
    phoneNumber: '+91 90000 00422',
    content:
      'విద్యుత్ శాఖ హెచ్చరిక: మీ పాత కరెంట్ బిల్లు అప్‌డేట్ కానందున ఈ రాత్రి 9 గంటలకు కరెంట్ కట్ చేయబడుతుంది. వెంటనే 90000-00488 కు కాల్ చేయండి.',
    scenarioLanguage: 'te',
  },

  // ==================== MALAYALAM SCENARIOS — മലയാളം (5) ====================
  {
    id: 'scn-ml-01',
    channel: 'whatsapp',
    senderName: 'പെൻഷൻ ഹെൽപ്പ് ഡെസ്ക്',
    phoneNumber: '+91 90000 00511',
    content:
      'അടിയന്തരം: നിങ്ങളുടെ മുതിർന്ന പൗരന്മാരുടെ പെൻഷൻ തടഞ്ഞുവെച്ചിരിക്കുന്നു. ഉടൻ https://kl-pension.example.com വഴി QuickSupport ആപ്പ് ഇൻസ്റ്റാൾ ചെയ്ത് OTP നൽകുക.',
    scenarioLanguage: 'ml',
  },
  {
    id: 'scn-ml-02',
    channel: 'whatsapp',
    senderName: 'അനു (മകൾ)',
    phoneNumber: '+91 90000 50102',
    content:
      'അമ്മേ, കുട്ടികൾക്ക് സ്കൂൾ അവധിയായതിനാൽ ഞങ്ങൾ ശനിയാഴ്ച രാവിലെ വീട്ടിലേക്ക് വരും. അമ്മ ബുദ്ധിമുട്ടി ഒന്നും ഉണ്ടാക്കേണ്ട.',
    scenarioLanguage: 'ml',
  },
  {
    id: 'scn-ml-03',
    channel: 'sms',
    senderName: '+91 90000 00533',
    phoneNumber: '+91 90000 00533',
    content:
      'അഭിനന്ദനങ്ങൾ! നിങ്ങളുടെ ഫോൺ നമ്പറിന് ₹20,00,000 ഭാഗ്യക്കുറി സമ്മാനം ലഭിച്ചിരിക്കുന്നു! സമ്മാനം നേടാൻ https://kerala-draw.example.org തുറക്കുക.',
    scenarioLanguage: 'ml',
  },
  {
    id: 'scn-ml-04',
    channel: 'call',
    senderName: 'ബാങ്ക് KYC വിഭാഗം (സ്ഥിരീകരിക്കാത്തത്)',
    phoneNumber: '+91 90000 00588',
    content:
      'വിളിക്കുന്നയാൾ ബാങ്ക് ഉദ്യോഗസ്ഥൻ എന്ന വ്യാജേന അക്കൗണ്ട് ബ്ലോക്ക് ആകുമെന്നു പറഞ്ഞ് ഉടൻ OTP, PIN വിവരങ്ങൾ ആവശ്യപ്പെടുന്നു.',
    scenarioLanguage: 'ml',
  },
  {
    id: 'scn-ml-05',
    channel: 'sms',
    senderName: 'സേവാ മെഡിക്കൽസ്',
    phoneNumber: 'VM-SEVAMD',
    content:
      'നിങ്ങൾ ഓർഡർ ചെയ്ത സ്ഥിരം മരുന്നുകൾ മെഡിക്കൽ സ്റ്റോറിൽ തയ്യാറായിട്ടുണ്ട്. വൈകുന്നേരം 6 മണിക്ക് മുമ്പ് കൈപ്പറ്റാവുന്നതാണ്.',
    scenarioLanguage: 'ml',
  },

  // ==================== KANNADA SCENARIOS — ಕನ್ನಡ (5) ====================
  {
    id: 'scn-kn-01',
    channel: 'whatsapp',
    senderName: 'KA ಬ್ಯಾಂಕ್ ಅಲರ್ಟ್',
    phoneNumber: '+91 90000 00601',
    content:
      'ತುರ್ತು ಸೂಚನೆ: ನಿಮ್ಮ ಬ್ಯಾಂಕ್ ಖಾತೆಯ KYC ಅಪ್‌ಡೇಟ್ ಆಗದ ಕಾರಣ ಇಂದು ಸ್ಥಗಿತಗೊಳ್ಳಲಿದೆ. ತಕ್ಷಣ https://ka-kyc.example.com/update.apk ಡೌನ್‌ಲೋಡ್ ಮಾಡಿ PIN ನಮೂದಿಸಿ.',
    scenarioLanguage: 'kn',
  },
  {
    id: 'scn-kn-02',
    channel: 'sms',
    senderName: 'ಸುಮಾ (ಮಗಳು)',
    phoneNumber: '+91 90000 60102',
    content:
      'ಅಪ್ಪಾ, ನಾನು ಮೈಸೂರಿನಿಂದ ಸುರಕ್ಷಿತವಾಗಿ ಮನೆಗೆ ತಲುಪಿದೆ. ನೀವು ಸಮಯಕ್ಕೆ ಸರಿಯಾಗಿ ಮಾತ್ರೆ ತೆಗೆದುಕೊಳ್ಳಿ, ನಾಳೆ ಬೆಳಿಗ್ಗೆ ಕರೆ ಮಾಡುತ್ತೇನೆ.',
    scenarioLanguage: 'kn',
  },
  {
    id: 'scn-kn-03',
    channel: 'call',
    senderName: 'ಸೈಬರ್ ಪೊಲೀಸ್ ವಿಭಾಗ (ದೃಢೀಕರಿಸದ)',
    phoneNumber: '+91 90000 00644',
    content:
      'ಕರೆ ಮಾಡಿದವರು ಸೈಬರ್ ಪೊಲೀಸ್ ಅಧಿಕಾರಿ ಎಂದು ಹೇಳಿಕೊಂಡು ಅಕ್ರಮ ಪಾರ್ಸೆಲ್ ಹೆಸರಿನಲ್ಲಿ ಡಿಜಿಟಲ್ ಅರೆಸ್ಟ್ ಬೆದರಿಕೆ ಹಾಕಿ ಹಣ ಕೇಳುತ್ತಿದ್ದಾರೆ.',
    scenarioLanguage: 'kn',
  },
  {
    id: 'scn-kn-04',
    channel: 'sms',
    senderName: 'ನಗರ ಗ್ರಂಥಾಲಯ',
    phoneNumber: 'VM-LIBRRY',
    content:
      'ಜ್ಞಾಪನೆ: ನೀವು ಎರವಲು ಪಡೆದ ಪುಸ್ತಕವನ್ನು ಹಿಂದಿರುಗಿಸಲು ಮುಂದಿನ ಸೋಮವಾರ ಕೊನೆಯ ದಿನವಾಗಿದೆ. ಯಾವುದೇ ಆನ್‌ಲೈನ್ ಪಾವತಿ ಅಗತ್ಯವಿಲ್ಲ.',
    scenarioLanguage: 'kn',
  },
  {
    id: 'scn-kn-05',
    channel: 'whatsapp',
    senderName: 'ಗೋಲ್ಡ್ ಇನ್ವೆಸ್ಟ್ ಗ್ರೂಪ್',
    phoneNumber: '+91 90000 00677',
    content:
      'ಕೇವಲ 10 ದಿನಗಳಲ್ಲಿ ನಿಮ್ಮ ಹಣ ದ್ವಿಗುಣ! ಖಚಿತ ಲಾಭ ಪಡೆಯಲು ತಕ್ಷಣ ಸೇರಿಕೊಳ್ಳಿ: https://ka-profit.example.org ಮತ್ತು UPI PIN ಹಾಕಿ.',
    scenarioLanguage: 'kn',
  },

  // ==================== BENGALI SCENARIOS — বাংলা (5) ====================
  {
    id: 'scn-bn-01',
    channel: 'sms',
    senderName: 'WB-EBILL',
    phoneNumber: 'WB-EBILL',
    content:
      'জরুরি বিজ্ঞপ্তি: গত মাসের বিল আপডেট না হওয়ায় আজ রাত ৯:৩০টায় আপনার বাড়ির বিদ্যুৎ সংযোগ বিচ্ছিন্ন করা হবে। অবিলম্বে কল করুন 90000-00911 অথবা দেখুন https://wb-power.example.com',
    scenarioLanguage: 'bn',
  },
  {
    id: 'scn-bn-02',
    channel: 'whatsapp',
    senderName: 'সৌম্য (ছেলে)',
    phoneNumber: '+91 90000 70101',
    content:
      'মা, আমি অফিস থেকে বেরিয়ে পড়েছি। ফেরার পথে তোমার জন্য মিষ্টি আর ফল নিয়ে আসছি, চিন্তা কোরো না।',
    scenarioLanguage: 'bn',
  },
  {
    id: 'scn-bn-03',
    channel: 'whatsapp',
    senderName: 'ভিআইপি ইনভেস্টমেন্ট ক্লাব',
    phoneNumber: '+91 90000 00933',
    content:
      'সুবর্ণ সুযোগ! মাত্র ১০ দিনে আপনার জমানো টাকা দ্বিগুণ করুন! ১০০% নিশ্চিত লাভ পেতে যুক্ত হোন: https://bangla-profit.example.org এবং UPI PIN দিন।',
    scenarioLanguage: 'bn',
  },
  {
    id: 'scn-bn-04',
    channel: 'call',
    senderName: 'ব্যাংক যাচাইকরণ কল (অযাচাইকৃত)',
    phoneNumber: '+91 90000 00955',
    content:
      'কলার ব্যাংক কর্মকর্তা সেজে বলছেন আপনার ব্যাংক অ্যাকাউন্ট বন্ধ হয়ে যাচ্ছে এবং এখনই গোপন OTP ও PIN নম্বর চাইছেন।',
    scenarioLanguage: 'bn',
  },
  {
    id: 'scn-bn-05',
    channel: 'sms',
    senderName: 'সেবা ডায়াগনস্টিক',
    phoneNumber: 'VM-SEVADG',
    content:
      'নমস্কার, আপনার রক্ত পরীক্ষার রিপোর্ট তৈরি হয়ে গেছে। আগামীকাল সকাল ১০টা থেকে সন্ধ্যা ৭টার মধ্যে কেন্দ্র থেকে সংগ্রহ করতে পারেন।',
    scenarioLanguage: 'bn',
  },
  {
    id: 'scn-ta-08-safe-call',
    channel: 'call',
    senderName: 'கார்த்திக் (மகன்)',
    phoneNumber: '+91 90000 20101',
    content:
      'உங்கள் மகன் கார்த்திக் மாலை நலம் விசாரிக்கவும், ஞாயிற்றுக்கிழமை வீட்டுக்கு வரும் நேரத்தைச் சொல்லவும் அழைக்கிறார்.',
    scenarioLanguage: 'ta',
  },
  {
    id: 'scn-te-06-safe-call',
    channel: 'call',
    senderName: 'రవి (కుమారుడు)',
    phoneNumber: '+91 90000 40101',
    content:
      'మీ కుమారుడు రవి మీ ఆరోగ్యం గురించి అడగడానికి మరియు మందులు సమయానికి వేసుకున్నారా అని కనుక్కోవడానికి కాల్ చేస్తున్నారు.',
    scenarioLanguage: 'te',
  },
  {
    id: 'scn-ml-06-safe-call',
    channel: 'call',
    senderName: 'അനു (മകൾ)',
    phoneNumber: '+91 90000 50102',
    content:
      'നിങ്ങളുടെ മകൾ അനു വൈകുന്നേരത്തെ വിശേഷങ്ങൾ ചോദിക്കാനും ശനിയാഴ്ചത്തെ യാത്രയെക്കുറിച്ച് സംസാരിക്കാനും വിളിക്കുന്നു.',
    scenarioLanguage: 'ml',
  },
  {
    id: 'scn-kn-06-safe-call',
    channel: 'call',
    senderName: 'ಸುಮಾ (ಮಗಳು)',
    phoneNumber: '+91 90000 60102',
    content:
      'ನಿಮ್ಮ ಮಗಳು ಸುಮಾ ನಿಮ್ಮ ಆರೋಗ್ಯ ವಿಚಾರಿಸಲು ಮತ್ತು ನಾಳೆಯ ವೈದ್ಯರ ಭೇಟಿಯ ಸಮಯವನ್ನು ನೆನಪಿಸಲು ಕರೆ ಮಾಡುತ್ತಿದ್ದಾರೆ.',
    scenarioLanguage: 'kn',
  },
  {
    id: 'scn-bn-06-safe-call',
    channel: 'call',
    senderName: 'সৌম্য (ছেলে)',
    phoneNumber: '+91 90000 70101',
    content:
      'আপনার ছেলে সৌম্য সন্ধ্যার খোঁজখবর নিতে এবং রাতের ওষুধ খাওয়ার কথা মনে করিয়ে দিতে কল করছে।',
    scenarioLanguage: 'bn',
  },

  // ==================== ADDITIONAL NORMAL MESSAGES & CALLS ACROSS ALL 7 LANGUAGES ====================
  {
    id: 'scn-en-15-safe-wa',
    channel: 'whatsapp',
    senderName: 'Priya (Daughter)',
    phoneNumber: '+91 90000 10202',
    content:
      'Hi Dad! Just reminding you that Arjun and I are coming over for lunch this Sunday. I am bringing homemade carrot halwa for you!',
    scenarioLanguage: 'en',
  },
  {
    id: 'scn-en-16-safe-sms',
    channel: 'sms',
    senderName: 'City Public Library',
    phoneNumber: 'VM-CTYLIB',
    content:
      'City Library: The gardening book you reserved ("Balcony Herbs & Flowers") is ready at the front desk for pickup this week.',
    scenarioLanguage: 'en',
  },
  {
    id: 'scn-en-17-safe-wa',
    channel: 'whatsapp',
    senderName: 'Morning Walk Group',
    phoneNumber: '+91 90000 10415',
    content:
      'Good morning! Tomorrow 6:30 AM walk will meet near the botanical park east gate, followed by filter coffee at the corner cafe.',
    scenarioLanguage: 'en',
  },
  {
    id: 'scn-en-18-safe-sms',
    channel: 'sms',
    senderName: 'CarePlus Pharmacy',
    phoneNumber: 'VM-CAREPH',
    content:
      'CarePlus Pharmacy: Your monthly blood pressure and vitamin tablets refill is packed and ready. Pick up anytime before 8:00 PM.',
    scenarioLanguage: 'en',
  },
  {
    id: 'scn-en-19-safe-call',
    channel: 'call',
    senderName: 'Priya (Daughter)',
    phoneNumber: '+91 90000 10202',
    content:
      'Your daughter Priya is calling to check how your afternoon rest went and ask what fresh fruit to bring for dinner.',
    scenarioLanguage: 'en',
  },
  {
    id: 'scn-en-20-safe-call',
    channel: 'call',
    senderName: 'Rohan (Grandson)',
    phoneNumber: '+91 90000 10102',
    content:
      'Your grandson Rohan is calling from his college hostel to share his semester results and wish you a pleasant evening.',
    scenarioLanguage: 'en',
  },
  {
    id: 'scn-ta-09-safe-wa',
    channel: 'whatsapp',
    senderName: 'திவ்யா (மகள்)',
    phoneNumber: '+91 90000 20102',
    content:
      'அப்பா, ஞாயிற்றுக்கிழமை மதியம் குழந்தைகளுடன் உங்கள் வீட்டுக்கு வருகிறேன். உங்களுக்குப் பிடித்த மல்லிகைப் பூவும் இனிப்பும் வாங்கி வருகிறேன்.',
    scenarioLanguage: 'ta',
  },
  {
    id: 'scn-ta-10-safe-sms',
    channel: 'sms',
    senderName: 'நலம் மருந்தகம்',
    phoneNumber: 'VM-NALAMM',
    content:
      'நலம் மருந்தகம்: நீங்கள் கேட்ட மாதாந்திர சர்க்கரை மற்றும் வைட்டமின் மாத்திரைகள் தயாராக உள்ளன. மாலை 7 மணிக்குள் பெற்றுக்கொள்ளலாம்.',
    scenarioLanguage: 'ta',
  },
  {
    id: 'scn-ta-11-safe-call',
    channel: 'call',
    senderName: 'அருண் கண் மருத்துவமனை',
    phoneNumber: '+91 90000 20303',
    content:
      'அருண் கண் மருத்துவமனை வரவேற்பாளர் நாளை காலை 10:30 மணி வழக்கமான கண் பரிசோதனை நேரத்தை நினைவூட்ட அழைக்கிறார்.',
    scenarioLanguage: 'ta',
  },
  {
    id: 'scn-hi-07-safe-sms',
    channel: 'sms',
    senderName: 'आरोग्य क्लिनिक',
    phoneNumber: 'VM-AROGYA',
    content:
      'नमस्ते, डॉ. राजेश वर्मा के साथ आपकी नियमित स्वास्थ्य जाँच कल सुबह 11:00 बजे निर्धारित है। कृपया पुरानी रिपोर्ट साथ लाएँ।',
    scenarioLanguage: 'hi',
  },
  {
    id: 'scn-hi-08-safe-wa',
    channel: 'whatsapp',
    senderName: 'आर्यन (पोता)',
    phoneNumber: '+91 90000 30105',
    content:
      'दादाजी प्रणाम! आज मेरे स्कूल के क्रिकेट मैच में हमारी टीम जीत गई! रविवार को घर आकर आपको पूरी कहानी सुनाऊँगा।',
    scenarioLanguage: 'hi',
  },
  {
    id: 'scn-hi-09-safe-sms',
    channel: 'sms',
    senderName: 'जनता लाइब्रेरी',
    phoneNumber: 'VM-JANLIB',
    content:
      'स्नेहिल अनुस्मारक: आपके द्वारा ली गई हिंदी कहानी की पुस्तक अगले बुधवार तक जमा की जा सकती है।',
    scenarioLanguage: 'hi',
  },
  {
    id: 'scn-hi-10-safe-call',
    channel: 'call',
    senderName: 'आर्यन (पोता)',
    phoneNumber: '+91 90000 30105',
    content:
      'आपका पोता आर्यन स्कूल से घर पहुँचकर आपका हालचाल पूछने और अपनी पढ़ाई के बारे में बताने के लिए कॉल कर रहा है।',
    scenarioLanguage: 'hi',
  },
  {
    id: 'scn-te-07-safe-sms',
    channel: 'sms',
    senderName: 'శ్రీ మెడికల్ స్టోర్',
    phoneNumber: 'VM-SRIMED',
    content:
      'నమస్కారం, మీరు ఆర్డర్ చేసిన నెలవారీ మందులు సిద్ధంగా ఉన్నాయి. సాయంత్రం 7 గంటల లోపు స్టోర్ నుండి తీసుకోవచ్చు.',
    scenarioLanguage: 'te',
  },
  {
    id: 'scn-te-08-safe-wa',
    channel: 'whatsapp',
    senderName: 'లక్ష్మి (కుమార్తె)',
    phoneNumber: '+91 90000 40102',
    content:
      'అమ్మా, ఈ ఆదివారం పిల్లలతో కలిసి భోజనానికి వస్తున్నాము. మీ కోసం వేడివేడి సున్నుండలు తయారు చేశాను!',
    scenarioLanguage: 'te',
  },
  {
    id: 'scn-te-09-safe-call',
    channel: 'call',
    senderName: 'లక్ష్మి (కుమార్తె)',
    phoneNumber: '+91 90000 40102',
    content:
      'మీ కుమార్తె లక్ష్మి సాయంత్రం క్షేమ సమాచారాలు అడగడానికి మరియు ఆదివారం రాక గురించి మాట్లాడటానికి కాల్ చేస్తున్నారు.',
    scenarioLanguage: 'te',
  },
  {
    id: 'scn-ml-07-safe-wa',
    channel: 'whatsapp',
    senderName: 'രാജൻ നായർ (പ്രഭാത നടത്തം)',
    phoneNumber: '+91 90000 50108',
    content:
      'നമസ്കാരം! നാളെ രാവിലെ 6:30-ന് പാർക്കിലെ നടപ്പിന് ശേഷം നമുക്ക് ഒരുമിച്ച് ചായ കുടിക്കാം.',
    scenarioLanguage: 'ml',
  },
  {
    id: 'scn-ml-08-safe-call',
    channel: 'call',
    senderName: 'ശാന്തി ക്ലിനിക്',
    phoneNumber: '+91 90000 50303',
    content:
      'ശാന്തി ക്ലിനിക്കിൽ നിന്ന് നാളെ രാവിലെ 10 മണിക്കുള്ള ഡോക്ടറുടെ സാധാരണ പരിശോധന സമയം ഓർമ്മിപ്പിക്കാൻ വിളിക്കുന്നു.',
    scenarioLanguage: 'ml',
  },
  {
    id: 'scn-kn-07-safe-wa',
    channel: 'whatsapp',
    senderName: 'ಕಿರಣ್ (ಮೊಮ್ಮಗ)',
    phoneNumber: '+91 90000 60105',
    content:
      'ತಾತಾ ನಮಸ್ಕಾರ! ನನ್ನ ಕಾಲೇಜು ಪರೀಕ್ಷೆ ತುಂಬಾ ಚೆನ್ನಾಗಿ ಆಯಿತು. ಶನಿವಾರ ಸಂಜೆ ನಿಮ್ಮನ್ನು ನೋಡಲು ಮನೆಗೆ ಬರುತ್ತೇನೆ.',
    scenarioLanguage: 'kn',
  },
  {
    id: 'scn-kn-08-safe-call',
    channel: 'call',
    senderName: 'ಆರೋಗ್ಯ ಕ್ಲಿನಿಕ್',
    phoneNumber: '+91 90000 60303',
    content:
      'ಆರೋಗ್ಯ ಕ್ಲಿನಿಕ್ ಸ್ವಾಗತಕಾರರು ನಾಳೆ ಬೆಳಿಗ್ಗೆ 10:30 ರ ಸಾಮಾನ್ಯ ಆರೋಗ್ಯ ತಪಾಸಣೆಯ ಸಮಯವನ್ನು ನೆನಪಿಸಲು ಕರೆ ಮಾಡುತ್ತಿದ್ದಾರೆ.',
    scenarioLanguage: 'kn',
  },
  {
    id: 'scn-bn-07-safe-wa',
    channel: 'whatsapp',
    senderName: 'রিয়া (নাতনি)',
    phoneNumber: '+91 90000 70105',
    content:
      'দাদু প্রণাম নিও! আজ আমার গানের অনুষ্ঠানে সবাই খুব প্রশংসা করেছে। রবিবার এসে তোমাকে গান শোনাব!',
    scenarioLanguage: 'bn',
  },
  {
    id: 'scn-bn-08-safe-call',
    channel: 'call',
    senderName: 'ডাঃ সেনের ক্লিনিক',
    phoneNumber: '+91 90000 70303',
    content:
      'ডাঃ সেনের ক্লিনিক থেকে আগামীকাল সকাল ১১টায় আপনার নিয়মিত স্বাস্থ্য পরীক্ষার সময় মনে করিয়ে দিতে কল করা হচ্ছে।',
    scenarioLanguage: 'bn',
  },
];
