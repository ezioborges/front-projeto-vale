export type UserRole = "employee" | "employer" | "admin";

export type ExperienceItem = {
  company: string;
  role: string;
  start_date: string;
  end_date: string;
  description: string;
  current: boolean;
};

export type EducationRecordItem = {
  institution: string;
  course: string;
  start_date: string;
  end_date: string;
  description: string;
};

export type User = {
  id: string;
  username: string;
  email: string;
  preferred_name: string | null;
  pronouns: string | null;
  gender_identity: string | null;
  phone: string | null;
  is_whatsapp_active: boolean;
  neighborhood: string | null;
  city: string | null;
  state: string | null;
  has_stable_housing: boolean;
  internet_access_level: string | null;
  needs_immediate_support: boolean;
  role: UserRole;
  work_modality: string | null;
  skills_summary: string | null;
  full_name: string | null;
  date_of_birth: string | null;
  country: string | null;
  professional_title: string | null;
  linkedin_url: string | null;
  github_url: string | null;
  portfolio_url: string | null;
  professional_bio: string | null;
  experiences: ExperienceItem[];
  education_records: EducationRecordItem[];
  resume: string | null;
  profile_completed: boolean;
  age: number | null;
};
