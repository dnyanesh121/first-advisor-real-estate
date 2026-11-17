/* Sample content for the demo. Replace with real data or an API response. */
export const SITE = {
  "brand": "First Advisors Group",
  "unit": "Real Estate",
  "phone": "1800-890-9195",
  "phoneRaw": "18008909195",
  "email": "support@firstadvisorsinsurance.com",
  "address": "Office No. 410, A Wing, Express Zone, Western Express Highway, Malad East, Mumbai 400097, Maharashtra",
  "hours": "Mon–Sat, 9:30 am – 6:30 pm",
  "rera": "[add]",
  "irda": "IRDA License No: 584, License valid till: 07-02-2029, CIN NO-U66010JH2016PTC003572",
  "groupUrl": "https://advisor-group-company.netlify.app/",
  "site_url": "https://www.firstadvisorsinsurance.com/",
  "stats": [
    {
      "value": 1200,
      "suffix": "+",
      "label": "Properties Advised"
    },
    {
      "value": 950,
      "suffix": "+",
      "label": "Satisfied Clients"
    },
    {
      "value": 10,
      "suffix": "+",
      "label": "Years of Experience"
    },
    {
      "text": "[add]",
      "label": "RERA Registration No."
    }
  ]
};

export const CITIES = ["Mumbai","Thane","Navi Mumbai","Pune"];
export const TYPES = {"apartment":"Apartment","villa":"Villa","plot":"Plot","office":"Office","shop":"Shop"};
export const MODE_TYPES = {"buy":["apartment","villa","plot"],"rent":["apartment","villa"],"commercial":["office","shop"]};
export const BUDGETS = {
  "buy": [
    [
      "",
      "Budget"
    ],
    [
      "0-5000000",
      "Under ₹50 L"
    ],
    [
      "5000000-10000000",
      "₹50 L – 1 Cr"
    ],
    [
      "10000000-20000000",
      "₹1 – 2 Cr"
    ],
    [
      "20000000-50000000",
      "₹2 – 5 Cr"
    ],
    [
      "50000000-1000000000000",
      "Above ₹5 Cr"
    ]
  ],
  "rent": [
    [
      "",
      "Budget"
    ],
    [
      "0-25000",
      "Under ₹25,000/mo"
    ],
    [
      "25000-50000",
      "₹25k – 50k/mo"
    ],
    [
      "50000-100000",
      "₹50k – 1 L/mo"
    ],
    [
      "100000-1000000000000",
      "Above ₹1 L/mo"
    ]
  ],
  "commercial": [
    [
      "",
      "Budget"
    ],
    [
      "0-20000000",
      "Under ₹2 Cr"
    ],
    [
      "20000000-1000000000000",
      "Above ₹2 Cr"
    ],
    [
      "lease",
      "Lease only"
    ]
  ]
};
