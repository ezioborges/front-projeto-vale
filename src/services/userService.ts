import api from "@/services/api";
import type { EducationRecordItem, ExperienceItem, User } from "@/types/user";

export type CompleteProfilePayload = {
  full_name: string;
  date_of_birth: string;
  phone: string;
  city: string;
  state: string;
  country: string;
  professional_title: string;
  linkedin_url: string;
  github_url: string;
  portfolio_url: string;
  professional_bio: string;
  experiences: ExperienceItem[];
  education_records: EducationRecordItem[];
  resume: File | null;
};

export async function getCurrentUser() {
  const { data } = await api.get<User>("/users/me/");
  return data;
}

export async function updateCurrentUserProfile(
  payload: CompleteProfilePayload,
) {
  const formData = new FormData();

  formData.append("full_name", payload.full_name);
  formData.append("date_of_birth", payload.date_of_birth);
  formData.append("phone", payload.phone);
  formData.append("city", payload.city);
  formData.append("state", payload.state);
  formData.append("country", payload.country);
  formData.append("professional_title", payload.professional_title);
  formData.append("linkedin_url", payload.linkedin_url);
  formData.append("github_url", payload.github_url);
  formData.append("portfolio_url", payload.portfolio_url);
  formData.append("professional_bio", payload.professional_bio);
  formData.append("experiences", JSON.stringify(payload.experiences));
  formData.append(
    "education_records",
    JSON.stringify(payload.education_records),
  );

  if (payload.resume) {
    formData.append("resume", payload.resume);
  }

  const { data } = await api.patch<User>("/users/me/", formData);
  return data;
}
