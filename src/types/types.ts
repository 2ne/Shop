interface Address {
  addressId?: number;
  houseName: string;
  street: string;
  town: string;
  county: string;
  postcode: string;
  countryName: string;
}

interface Participant {
  id: number;
  firstName: string;
  lastName: string;
  dob: Date;
  meetsAgeCriteria?: boolean; // Used to cross-reference with BasketItem's ageCriteria
  medicalInfo?: MedicalInfo;
  consentForms?: ConsentForm[];
  additionalForms?: AdditionalForm[];
  uploadedFiles?: UploadedFile[];
}

interface MedicalInfo {
  medicalConditions?: string;
  disabilities?: string;
  behaviouralConditions?: string;
  medicines?: string;
  allergies?: string;
  dietaryNeedsOrConditions?: string;
  doctorsName?: string;
  surgeryAddress?: string;
  surgeryTelephone?: string;
}

type MedicalInfoFieldKey = keyof MedicalInfo;

type MedicalInfoField = {
  key: MedicalInfoFieldKey;
  label: string;
  group: string;
};

export const medicalInfoFields: MedicalInfoField[] = [
  {
    key: "medicalConditions",
    label: "Medical conditions",
    group: "medicalInformation",
  },
  { key: "medicines", label: "Medicines", group: "medicalInformation" },
  {
    key: "disabilities",
    label: "Disabilities",
    group: "medicalInformation",
  },
  {
    key: "behaviouralConditions",
    label: "Behavioural conditions",
    group: "medicalInformation",
  },
  { key: "allergies", label: "Allergies", group: "allergiesAndDietary" },
  {
    key: "dietaryNeedsOrConditions",
    label: "Dietary needs or other conditions",
    group: "allergiesAndDietary",
  },
  {
    key: "doctorsName",
    label: "Doctor's name",
    group: "doctorsDetails",
  },
  {
    key: "surgeryAddress",
    label: "Surgery address",
    group: "doctorsDetails",
  },
  {
    key: "surgeryTelephone",
    label: "Surgery telephone",
    group: "doctorsDetails",
  },
];

interface EmergencyContact {
  name: string;
  phone: string;
  email?: string;
  address?: Address;
}

type EmergencyContactFieldKey = keyof EmergencyContact | keyof Address;

type NestedEmergencyContactFields = {
  key: EmergencyContactFieldKey;
  label: string;
  required?: boolean;
  type: string;
  fields?: EmergencyContactField[];
};

type EmergencyContactField = {
  key: EmergencyContactFieldKey;
  label: string;
  required?: boolean;
  type: string;
} & (NestedEmergencyContactFields | object);

export const emergencyContactFields: EmergencyContactField[] = [
  { key: "name", label: "Name", required: true, type: "text" },
  { key: "phone", label: "Phone number", required: true, type: "tel" },
  { key: "email", label: "Email", required: false, type: "email" },
  {
    key: "address",
    label: "Address",
    required: false,
    type: "object",
    fields: [
      {
        key: "houseName",
        label: "House name / number",
        required: false,
        type: "text",
      },
      { key: "street", label: "Street", required: false, type: "text" },
      { key: "town", label: "Town", required: false, type: "text" },
      { key: "county", label: "County", required: false, type: "text" },
      { key: "postcode", label: "Postcode", required: false, type: "text" },
      {
        key: "countryName",
        label: "Country Name",
        required: false,
        type: "text",
      },
    ],
  },
];

interface ConsentForm {
  termsAndConditions: boolean;
  accessToMedicalInformation: boolean;
  photography?: boolean;
}

type ConsentFormFieldKey = keyof ConsentForm;

type ConsentFormField = {
  key: ConsentFormFieldKey;
  label: string;
  required?: boolean;
  value: boolean;
  content?: boolean;
};

export const consentFormFields: ConsentFormField[] = [
  {
    key: "termsAndConditions",
    label: "Terms & conditions",
    required: true,
    value: false,
    content: true,
  },
  {
    key: "accessToMedicalInformation",
    label: "Access to medical information",
    required: true,
    value: false,
  },
  {
    key: "photography",
    label: "Photography",
    required: false,
    value: false,
  },
];

interface AdditionalForm {
  id: number;
}

interface UploadedFile {
  id: number;
  fileName: string;
  url: string;
}

interface AgeCriteria {
  min?: number;
  max?: number;
}

interface BasketItem {
  id: string;
  title: string;
  subTitle?: string;
  description?: string;
  image?: string;
  dates?: string;
  price?: string;
  priceQuantity?: string;
  cost?: string;
  billing?: string;
  participants?: Participant[];
  ageCriteria?: AgeCriteria;
  requiredProduct?: BasketItem;
  isRequiredProduct?: boolean;
  emergencyContact?: EmergencyContact[];
  limitedStock?: boolean;
  requiresApproval?: boolean;
  outOfStock?: boolean;
  link: string;
  coach?: string;
  coachDescription?: string;
  coachImage?: string;
}

export type {
  Address,
  Participant,
  MedicalInfo,
  EmergencyContact,
  EmergencyContactField,
  NestedEmergencyContactFields,
  ConsentForm,
  ConsentFormField,
  AdditionalForm,
  UploadedFile,
  BasketItem,
  AgeCriteria,
};
