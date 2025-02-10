// quotes.service.ts
import { serviceApi } from "@/services/auth";

export interface IQuote {
  id_citas?: number;
  id_patient: number;
  date: Date;
  hour: number;
  description: string;
  // Additional fields from join
  name?: string;
  lastname?: string;
  cui?: string;
}

export interface IQuoteResponse {
  message: string;
  success: boolean;
  data: {
    quote: IQuote;
  };
}

export interface IQuotesResponse {
  message: string;
  success: boolean;
  data: {
    quotes: IQuote[];
  };
}

export const quoteService = {
  getQuotes: async (): Promise<IQuotesResponse> => {
    const { data } = await serviceApi.get<IQuotesResponse>('/quotes/getAll');
    return data;
  },

  getQuoteById: async (id: string): Promise<IQuoteResponse> => {
    const { data } = await serviceApi.get<IQuoteResponse>(`/quotes/get/${id}`);
    return data;
  },

  createQuote: async (quote: Omit<IQuote, 'id_citas'>): Promise<IQuoteResponse> => {
    const { data } = await serviceApi.post<IQuoteResponse>('/quotes/create', quote);
    return data;
  },

  updateQuote: async (quote: IQuote): Promise<IQuoteResponse> => {
    const { data } = await serviceApi.put<IQuoteResponse>('/quotes/update', quote);
    return data;
  },

  deleteQuote: async (id: string): Promise<IQuoteResponse> => {
    const { data } = await serviceApi.delete<IQuoteResponse>(`/quotes/delete/${id}`);
    return data;
  }
};
