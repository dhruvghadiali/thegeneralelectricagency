/**
 * Temporary backend-shaped records. Keeping snake_case and the expected
 * nesting here means the screen exercises the same response mapper the real
 * GET endpoint will use later.
 */
export const DUMMY_COMPANIES = [
  {
    _id: "company-001",
    company_name: "Apex Industrial Solutions",
    company_type: "both",
    email: "business@apexindustrial.in",
    phone_number: "9876501201",
    gst_number: "24AABCA1234F1Z7",
    pan_number: "AABCA1234F",
    website: "https://apexindustrial.in",
    addresses: [
      {
        _id: "address-001-a",
        address: "Plot 18, GIDC Industrial Estate, Makarpura, Vadodara, Gujarat",
        pincode: "390010",
        company_employees: [
          {
            _id: "contact-001-a",
            contact_person_name: "Rakesh Shah",
            contact_person_mobile_number: "9825011001",
            contact_person_position: "owner",
          },
          {
            _id: "contact-001-b",
            contact_person_name: "Meera Joshi",
            contact_person_mobile_number: "9825011002",
            contact_person_position: "purchase",
          },
        ],
      },
      {
        _id: "address-001-b",
        address: "Unit 5, Changodar Industrial Park, Ahmedabad, Gujarat",
        pincode: "382213",
        company_employees: [
          {
            _id: "contact-001-c",
            contact_person_name: "Nirav Patel",
            contact_person_mobile_number: "9825011003",
            contact_person_position: "store_keeper",
          },
        ],
      },
    ],
  },
  {
    _id: "company-002",
    company_name: "Shakti Motor Components",
    company_type: "manufacturer",
    email: "sales@shaktimotors.co.in",
    phone_number: "9876501202",
    gst_number: "24AAECS5678K1Z2",
    pan_number: "AAECS5678K",
    website: "https://shaktimotors.co.in",
    addresses: [
      {
        _id: "address-002-a",
        address: "Survey 42, Rajkot–Gondal Highway, Rajkot, Gujarat",
        pincode: "360022",
        company_employees: [
          {
            _id: "contact-002-a",
            contact_person_name: "Kunal Mehta",
            contact_person_mobile_number: "9825022001",
            contact_person_position: "director",
          },
          {
            _id: "contact-002-b",
            contact_person_name: "Dhara Trivedi",
            contact_person_mobile_number: "9825022002",
            contact_person_position: "sales",
          },
          {
            _id: "contact-002-c",
            contact_person_name: "Vivek Rana",
            contact_person_mobile_number: "9825022003",
            contact_person_position: "engineer",
          },
        ],
      },
    ],
  },
  {
    _id: "company-003",
    company_name: "BluePeak Engineering",
    company_type: "customer",
    email: "projects@bluepeakeng.com",
    phone_number: "9876501203",
    gst_number: "27AAGCB9012M1Z5",
    pan_number: "AAGCB9012M",
    website: "https://bluepeakeng.com",
    addresses: [
      {
        _id: "address-003-a",
        address: "Office 804, Orion Business Park, Thane West, Maharashtra",
        pincode: "400607",
        company_employees: [
          {
            _id: "contact-003-a",
            contact_person_name: "Ananya Kulkarni",
            contact_person_mobile_number: "9825033001",
            contact_person_position: "manager",
          },
          {
            _id: "contact-003-b",
            contact_person_name: "Amit Nair",
            contact_person_mobile_number: "9825033002",
            contact_person_position: "accounts",
          },
        ],
      },
    ],
  },
  {
    _id: "company-004",
    company_name: "Western Drives & Automation",
    company_type: "dealer",
    email: "hello@westerndrives.in",
    phone_number: "9876501204",
    gst_number: "24AAFCW3456D1Z8",
    pan_number: "AAFCW3456D",
    website: "https://westerndrives.in",
    addresses: [
      {
        _id: "address-004-a",
        address: "12, Udhna Udhyog Nagar, Surat, Gujarat",
        pincode: "394210",
        company_employees: [
          {
            _id: "contact-004-a",
            contact_person_name: "Jignesh Desai",
            contact_person_mobile_number: "9825044001",
            contact_person_position: "owner",
          },
          {
            _id: "contact-004-b",
            contact_person_name: "Priya Gandhi",
            contact_person_mobile_number: "9825044002",
            contact_person_position: "sales",
          },
        ],
      },
      {
        _id: "address-004-b",
        address: "Warehouse 7, Palsana Logistics Hub, Surat, Gujarat",
        pincode: "394315",
        company_employees: [],
      },
    ],
  },
  {
    _id: "company-005",
    company_name: "Nova Electrical Traders",
    company_type: "supplier",
    email: "orders@novaelectrical.in",
    phone_number: "9876501205",
    gst_number: "29AAHFN7890P1Z1",
    pan_number: "AAHFN7890P",
    website: "https://novaelectrical.in",
    addresses: [
      {
        _id: "address-005-a",
        address: "44, Peenya Industrial Area Phase 2, Bengaluru, Karnataka",
        pincode: "560058",
        company_employees: [
          {
            _id: "contact-005-a",
            contact_person_name: "Sanjay Rao",
            contact_person_mobile_number: "9825055001",
            contact_person_position: "purchase",
          },
        ],
      },
    ],
  },
  {
    _id: "company-006",
    company_name: "Orbit Process Systems",
    company_type: "customer",
    email: "operations@orbitprocess.com",
    phone_number: "9876501206",
    gst_number: "24AABCO2468R1Z4",
    pan_number: "AABCO2468R",
    website: "https://orbitprocess.com",
    addresses: [
      {
        _id: "address-006-a",
        address: "Block C, Dahej Special Economic Zone, Bharuch, Gujarat",
        pincode: "392130",
        company_employees: [
          {
            _id: "contact-006-a",
            contact_person_name: "Farhan Sheikh",
            contact_person_mobile_number: "9825066001",
            contact_person_position: "engineer",
          },
          {
            _id: "contact-006-b",
            contact_person_name: "Hetal Parmar",
            contact_person_mobile_number: "9825066002",
            contact_person_position: "hr",
          },
        ],
      },
    ],
  },
  {
    _id: "company-007",
    company_name: "Prism Pump Technologies",
    company_type: "manufacturer",
    email: "connect@prismpumps.in",
    phone_number: "9876501207",
    gst_number: "24AAKCP1357T1Z9",
    pan_number: "AAKCP1357T",
    website: "https://prismpumps.in",
    addresses: [
      {
        _id: "address-007-a",
        address: "Plot 91, Vitthal Udyognagar, Anand, Gujarat",
        pincode: "388121",
        company_employees: [
          {
            _id: "contact-007-a",
            contact_person_name: "Bhavesh Patel",
            contact_person_mobile_number: "9825077001",
            contact_person_position: "director",
          },
          {
            _id: "contact-007-b",
            contact_person_name: "Isha Shah",
            contact_person_mobile_number: "9825077002",
            contact_person_position: "other",
          },
        ],
      },
    ],
  },
  {
    _id: "company-008",
    company_name: "Metro Machine Tools",
    company_type: "dealer",
    email: "info@metromachinetools.in",
    phone_number: "9876501208",
    gst_number: "07AALFM8642C1Z6",
    pan_number: "AALFM8642C",
    website: "https://metromachinetools.in",
    addresses: [
      {
        _id: "address-008-a",
        address: "B-17, Naraina Industrial Area Phase 1, New Delhi",
        pincode: "110028",
        company_employees: [
          {
            _id: "contact-008-a",
            contact_person_name: "Manish Arora",
            contact_person_mobile_number: "9825088001",
            contact_person_position: "owner",
          },
        ],
      },
      {
        _id: "address-008-b",
        address: "Shop 26, Industrial Equipment Market, Faridabad, Haryana",
        pincode: "121001",
        company_employees: [
          {
            _id: "contact-008-b",
            contact_person_name: "Ritu Malhotra",
            contact_person_mobile_number: "9825088002",
            contact_person_position: "manager",
          },
        ],
      },
    ],
  },
];

export function getDummyCompanyList({ page = 1, limit = 20, search = "" } = {}) {
  const query = search.trim().toLowerCase();
  const matching = query
    ? DUMMY_COMPANIES.filter((company) =>
        [
          company.company_name,
          company.company_type,
          company.email,
          company.phone_number,
          company.gst_number,
          company.pan_number,
        ].some((value) => value.toLowerCase().includes(query)),
      )
    : DUMMY_COMPANIES;
  const start = (page - 1) * limit;

  return {
    companies: matching.slice(start, start + limit),
    pagination: {
      page,
      limit,
      total: matching.length,
      total_pages: Math.ceil(matching.length / limit),
    },
  };
}

export default DUMMY_COMPANIES;
