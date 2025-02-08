// utils/constants/queryKey.ts
export const QUERY_KEYS = {
  AUTH: {
    LOGIN: ["auth", "login"],
  },
  DOCTOR: {
    // Patients module
    PATIENTS: {
      ALL: ["doctor", "patients", "all"],
      DETAIL: (id: string) => ["doctor", "patients", "detail", id],
      CREATE: ["doctor", "patients", "create"],
      UPDATE: (id: string) => ["doctor", "patients", "update", id],
      DELETE: (id: string) => ["doctor", "patients", "delete", id],
      EXPEDIENTS: (parameter: string) => ["doctor", "patients", "expedients", parameter]
    },
    // Quotes (appointments) module
    QUOTES: {
      ALL: ["doctor", "quotes", "all"],
      DETAIL: (id: string) => ["doctor", "quotes", "detail", id],
      CREATE: ["doctor", "quotes", "create"],
      UPDATE: (id: string) => ["doctor", "quotes", "update", id],
      DELETE: (id: string) => ["doctor", "quotes", "delete", id]
    },
    // Recipes module
    RECIPES: {
      ALL: ["doctor", "recipes", "all"],
      DETAIL: (id: string) => ["doctor", "recipes", "detail", id],
      CREATE: ["doctor", "recipes", "create"],
      UPDATE: (id: string) => ["doctor", "recipes", "update", id],
      DELETE: (id: string) => ["doctor", "recipes", "delete", id]
    },
    // Unit measurements for recipes
    UNITS: {
      ALL: ["doctor", "units", "all"],
      DETAIL: (id: string) => ["doctor", "units", "detail", id]
    }
  }
} as const;