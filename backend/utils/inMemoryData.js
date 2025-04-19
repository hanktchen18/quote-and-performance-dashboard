// In-memory data storage
let quotes = [];
let idCounter = 1;

// Generate mock data
const generateMockData = () => {
  const roofTypes = ['Metal', 'TPO', 'Foam', 'Shingle', 'Other'];

  const locations = [
    { city: 'New York', state: 'NY' },
    { city: 'Los Angeles', state: 'CA' },
    { city: 'Chicago', state: 'IL' },
    { city: 'Houston', state: 'TX' },
    { city: 'Phoenix', state: 'AZ' },
    { city: 'Philadelphia', state: 'PA' },
    { city: 'San Antonio', state: 'TX' },
    { city: 'San Diego', state: 'CA' },
    { city: 'Dallas', state: 'TX' },
    { city: 'San Jose', state: 'CA' },
    { city: 'Austin', state: 'TX' },
    { city: 'Jacksonville', state: 'FL' },
    { city: 'Fort Worth', state: 'TX' },
    { city: 'Columbus', state: 'OH' },
    { city: 'Indianapolis', state: 'IN' }
  ];

  const companies = [
    'ABC Roofing',
    'Best Roof Co',
    'City Contractors',
    'Diamond Roofing',
    'Eagle Construction',
    'First Choice Builders',
    'Green Roof Solutions',
    'Highland Contractors',
    'Innovative Building',
    'Johnson Roofing Inc'
  ];

  const contractors = [
    'John Smith',
    'Michael Johnson',
    'David Williams',
    'Robert Brown',
    'William Jones',
    'Richard Davis',
    'Joseph Miller',
    'Thomas Wilson',
    'Charles Moore',
    'Daniel Taylor'
  ];

  const randomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  const randomElement = (array) => {
    return array[Math.floor(Math.random() * array.length)];
  };

  const randomDate = () => {
    const startDate = new Date();
    startDate.setFullYear(startDate.getFullYear() - 3);
    
    const endDate = new Date();
    
    return new Date(startDate.getTime() + Math.random() * (endDate.getTime() - startDate.getTime()));
  };

  quotes = [];
  idCounter = 1;
  
  // Create 1000 quote records
  for (let i = 0; i < 1000; i++) {
    const location = randomElement(locations);
    
    const mockQuote = {
      id: idCounter++,
      contractorName: randomElement(contractors),
      companyName: randomElement(companies),
      roofSize: randomNumber(1000, 5000),
      roofType: randomElement(roofTypes),
      city: location.city,
      state: location.state,
      projectDate: randomDate(),
      createdAt: new Date()
    };
    
    quotes.push(mockQuote);
  }
  
  console.log(`Generated ${quotes.length} mock data records`);
};

// Query all quotes
export const getAllQuotes = (filters = {}) => {
  let result = [...quotes];
  
  if (filters.state) {
    result = result.filter(quote => quote.state === filters.state);
  }
  
  if (filters.roofType) {
    result = result.filter(quote => quote.roofType === filters.roofType);
  }
  
  return result;
};

export const createQuote = (quoteData) => {
  const newQuote = {
    id: idCounter++,
    ...quoteData,
    createdAt: new Date()
  };
  
  quotes.push(newQuote);
  return newQuote;
};

generateMockData(); 