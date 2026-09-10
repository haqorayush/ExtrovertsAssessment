export interface CityData {
  name: string;
  colleges: string[];
}

export interface StateData {
  name: string;
  cities: CityData[];
}

export const LOCATION_DATA: StateData[] = [
  {
    name: "California",
    cities: [
      {
        name: "Los Angeles",
        colleges: [
          "University of California, Los Angeles (UCLA)",
          "University of Southern California (USC)",
          "Loyola Marymount University",
          "Occidental College",
          "Other / Independent"
        ]
      },
      {
        name: "San Francisco Bay Area",
        colleges: [
          "UC Berkeley",
          "Stanford University",
          "San Francisco State University",
          "San Jose State University",
          "Other / Independent"
        ]
      },
      {
        name: "San Diego",
        colleges: [
          "UC San Diego (UCSD)",
          "San Diego State University (SDSU)",
          "University of San Diego",
          "Other / Independent"
        ]
      }
    ]
  },
  {
    name: "New York",
    cities: [
      {
        name: "New York City",
        colleges: [
          "New York University (NYU)",
          "Columbia University",
          "Fordham University",
          "The New School / Parsons",
          "CUNY Hunter College",
          "Other / Independent"
        ]
      },
      {
        name: "Ithaca & Upstate",
        colleges: [
          "Cornell University",
          "Syracuse University",
          "University of Rochester",
          "Other / Independent"
        ]
      }
    ]
  },
  {
    name: "Texas",
    cities: [
      {
        name: "Austin",
        colleges: [
          "University of Texas at Austin (UT Austin)",
          "St. Edward's University",
          "Austin Community College",
          "Other / Independent"
        ]
      },
      {
        name: "Dallas / Fort Worth",
        colleges: [
          "Southern Methodist University (SMU)",
          "University of Texas at Dallas (UTD)",
          "Texas Christian University (TCU)",
          "Other / Independent"
        ]
      }
    ]
  },
  {
    name: "Maharashtra",
    cities: [
      {
        name: "Mumbai",
        colleges: [
          "St. Xavier's College",
          "IIT Bombay",
          "Narsee Monjee College of Commerce & Economics (NM)",
          "HR College of Commerce & Economics",
          "Mithibai College",
          "Other / Independent"
        ]
      },
      {
        name: "Pune",
        colleges: [
          "Symbiosis International University",
          "Fergusson College",
          "College of Engineering Pune (COEP)",
          "FLAME University",
          "Other / Independent"
        ]
      }
    ]
  },
  {
    name: "Delhi NCR",
    cities: [
      {
        name: "New Delhi",
        colleges: [
          "Delhi University (North Campus)",
          "Delhi University (South Campus)",
          "IIT Delhi",
          "Jawaharlal Nehru University (JNU)",
          "Ashoka University",
          "Other / Independent"
        ]
      }
    ]
  },
  {
    name: "Karnataka",
    cities: [
      {
        name: "Bengaluru",
        colleges: [
          "Christ University",
          "St. Joseph's University",
          "BMS College of Engineering",
          "PES University",
          "Other / Independent"
        ]
      }
    ]
  }
];

export const VIBE_TAGS = [
  "House Party 🏠",
  "Rooftop Sunset 🌅",
  "Techno & Deep House 🎶",
  "Board Games & Chill 🎲",
  "Live Music / Indie 🎸",
  "Cocktail & Speakeasy 🍸",
  "Clubbing & Raves 🪩",
  "Karaoke Champions 🎤",
  "Foodie Hangouts 🍕",
  "Outdoor Bonfire 🔥",
  "Art & Jam Sessions 🎨",
  "Late Night Drives 🌃"
];
