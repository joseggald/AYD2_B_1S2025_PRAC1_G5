import { serviceApi } from "@/services/auth";

export interface IPatient {
  id_patient?: number;
  name: string;
  lastname: string;
  cui: string;
  phone: string;
  email: string;
  age: number;
  gender: string;
  income_at: Date;
}

const sanitizePatient = (patient: Partial<IPatient>): Partial<IPatient> => {
  return {
    ...patient,
    cui: String(patient.cui || ''),
    name: String(patient.name || ''),
    lastname: String(patient.lastname || ''),
    phone: String(patient.phone || ''),
    email: String(patient.email || ''),
    age: Number(patient.age || 0),
    gender: String(patient.gender || ''),
    income_at: patient.income_at instanceof Date ? patient.income_at : new Date(patient.income_at || Date.now())
  };
};

export interface IPatientResponse {
  message: string;
  success: boolean;
  data: {
    patient: IPatient;
  };
}

export interface IPatientsResponse {
  message: string;
  success: boolean;
  data: {
    patients: IPatient[];
  };
}

export const patientService = {
  getPatients: async (): Promise<IPatientsResponse> => {
    const { data } = await serviceApi.get<IPatientsResponse>('/patients/getAll');
    return data;
  },

  getPatientById: async (id: string): Promise<IPatientResponse> => {
    const { data } = await serviceApi.get<IPatientResponse>(`/patients/get/${id}`);
    return data;
  },

  createPatient: async (patient: Omit<IPatient, 'id_patient'>): Promise<IPatientResponse> => {
    const { data } = await serviceApi.post<IPatientResponse>('/patients/create', patient);
    return data;
  },

  updatePatient: async (patient: IPatient): Promise<IPatientResponse> => {
    const sanitizedPatient = sanitizePatient(patient);

    const { data } = await serviceApi.put<IPatientResponse>('/patients/update', sanitizedPatient);
    return data;
  },

  deletePatient: async (id: string): Promise<IPatientResponse> => {
    const { data } = await serviceApi.delete<IPatientResponse>(`/patients/delete/${id}`);
    return data;
  },

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getExpedients: async (parameter: string): Promise<any> => {
    const { data } = await serviceApi.get(`/patients/getExpedients/${parameter}`);
    return data;
  }
};