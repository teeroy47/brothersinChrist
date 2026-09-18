import { create } from "zustand";

export interface CheckInFormData {
  prayerDays: number;
  bibleDays: number;
  attendedMeeting: boolean;
  metAccountability: boolean;
  servingContribution: string;
  strugglesAndNeeds: string;
  praiseReport: string;
  flags: string[];
}

const initialForm: CheckInFormData = {
  prayerDays: 5,
  bibleDays: 4,
  attendedMeeting: true,
  metAccountability: true,
  servingContribution: "",
  strugglesAndNeeds: "",
  praiseReport: "",
  flags: [],
};

interface CheckInState {
  currentStep: number;
  formData: CheckInFormData;
  isSubmitting: boolean;
  submitSuccess: boolean;
  setStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  updateField: <K extends keyof CheckInFormData>(field: K, value: CheckInFormData[K]) => void;
  toggleFlag: (flag: string) => void;
  setSubmitting: (submitting: boolean) => void;
  setSuccess: (success: boolean) => void;
  resetForm: () => void;
}

export const useCheckInStore = create<CheckInState>((set) => ({
  currentStep: 1,
  formData: initialForm,
  isSubmitting: false,
  submitSuccess: false,
  setStep: (step) => set({ currentStep: step }),
  nextStep: () => set((state) => ({ currentStep: Math.min(state.currentStep + 1, 4) })),
  prevStep: () => set((state) => ({ currentStep: Math.max(state.currentStep - 1, 1) })),
  updateField: (field, value) =>
    set((state) => ({
      formData: { ...state.formData, [field]: value },
    })),
  toggleFlag: (flag) =>
    set((state) => {
      const exists = state.formData.flags.includes(flag);
      return {
        formData: {
          ...state.formData,
          flags: exists
            ? state.formData.flags.filter((f) => f !== flag)
            : [...state.formData.flags, flag],
        },
      };
    }),
  setSubmitting: (isSubmitting) => set({ isSubmitting }),
  setSuccess: (submitSuccess) => set({ submitSuccess }),
  resetForm: () => set({ currentStep: 1, formData: initialForm, submitSuccess: false }),
}));
