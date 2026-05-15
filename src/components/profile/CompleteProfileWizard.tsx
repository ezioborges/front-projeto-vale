"use client";

import type { AxiosError } from "axios";
import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import useAuth from "@/hooks/useAuth";
import {
  type CompleteProfilePayload,
  updateCurrentUserProfile,
} from "@/services/userService";
import type { EducationRecordItem, ExperienceItem, User } from "@/types/user";
import { getUserDisplayName, resolveDashboardRoute } from "@/utils/auth";

type FormErrors = Record<string, string>;
type BackendValidationError = Record<string, string | string[]>;

type ProfileFormState = Omit<CompleteProfilePayload, "resume"> & {
  resumeFile: File | null;
  currentResumeName: string;
};

const inputClassName =
  "rounded-xl border-slate-200 bg-white px-4 py-3.5 text-slate-900 placeholder:text-slate-400 focus:border-purple-500 focus:ring-purple-500/20";

const textareaClassName =
  "min-h-[140px] w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20";

const selectClassName =
  "w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm text-slate-900 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20";

const steps = [
  {
    title: "Dados Pessoais",
    description: "Informacoes basicas para identificacao e localizacao.",
  },
  {
    title: "Contato e Links",
    description: "Canais para recrutadores entenderem e encontrarem seu perfil.",
  },
  {
    title: "Trajetoria",
    description: "Experiencias e formacao em blocos editaveis.",
  },
  {
    title: "Curriculo",
    description: "Anexo final e revisao antes de liberar candidaturas.",
  },
] as const;

function emptyExperience(): ExperienceItem {
  return {
    company: "",
    role: "",
    start_date: "",
    end_date: "",
    description: "",
    current: false,
  };
}

function emptyEducation(): EducationRecordItem {
  return {
    institution: "",
    course: "",
    start_date: "",
    end_date: "",
    description: "",
  };
}

function buildFormState(user: User): ProfileFormState {
  return {
    full_name: user.full_name ?? "",
    date_of_birth: user.date_of_birth ?? "",
    phone: user.phone ?? "",
    city: user.city ?? "",
    state: user.state ?? "",
    country: user.country ?? "",
    professional_title: user.professional_title ?? "",
    linkedin_url: user.linkedin_url ?? "",
    github_url: user.github_url ?? "",
    portfolio_url: user.portfolio_url ?? "",
    professional_bio: user.professional_bio ?? "",
    experiences:
      user.experiences.length > 0 ? user.experiences : [emptyExperience()],
    education_records:
      user.education_records.length > 0
        ? user.education_records
        : [emptyEducation()],
    resumeFile: null,
    currentResumeName: user.resume ? user.resume.split("/").pop() ?? "" : "",
  };
}

function FieldError({ message }: { message?: string }) {
  if (!message) {
    return null;
  }

  return <p className="mt-2 text-sm text-red-600">{message}</p>;
}

function SectionCard({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-3xl border border-white/70 bg-white/90 p-6 shadow-lg">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-slate-900">{title}</h2>
        <p className="mt-2 text-sm text-slate-600">{description}</p>
      </div>
      {children}
    </section>
  );
}

function firstInvalidStep(form: ProfileFormState) {
  const validators = [
    validatePersonalStep,
    validateProfessionalStep,
    validateJourneyStep,
    validateResumeStep,
  ];

  for (const [index, validator] of validators.entries()) {
    if (Object.keys(validator(form)).length > 0) {
      return index;
    }
  }

  return -1;
}

function validatePersonalStep(form: ProfileFormState): FormErrors {
  const errors: FormErrors = {};

  if (!form.full_name.trim()) errors.full_name = "Informe seu nome completo.";
  if (!form.date_of_birth) {
    errors.date_of_birth = "Informe sua data de nascimento.";
  }
  if (!form.phone.trim()) errors.phone = "Informe um telefone ou WhatsApp.";
  if (!form.city.trim()) errors.city = "Informe sua cidade.";
  if (!form.state.trim()) errors.state = "Informe seu estado.";
  if (!form.country.trim()) errors.country = "Informe seu pais.";

  return errors;
}

function validateProfessionalStep(form: ProfileFormState): FormErrors {
  const errors: FormErrors = {};

  if (!form.professional_title.trim()) {
    errors.professional_title = "Informe o cargo desejado.";
  }
  if (
    !form.linkedin_url.trim() &&
    !form.github_url.trim() &&
    !form.portfolio_url.trim()
  ) {
    errors.links = "Adicione pelo menos um link profissional.";
  }
  if (!form.professional_bio.trim()) {
    errors.professional_bio = "Escreva um resumo profissional.";
  }

  return errors;
}

function validateJourneyStep(form: ProfileFormState): FormErrors {
  const errors: FormErrors = {};

  if (form.experiences.length === 0) {
    errors.experiences = "Adicione ao menos uma experiencia.";
  }

  form.experiences.forEach((item, index) => {
    if (!item.role.trim()) {
      errors[`experiences.${index}.role`] = "Informe o cargo exercido.";
    }
    if (!item.company.trim()) {
      errors[`experiences.${index}.company`] = "Informe a empresa.";
    }
  });

  if (form.education_records.length === 0) {
    errors.education_records = "Adicione ao menos uma formacao.";
  }

  form.education_records.forEach((item, index) => {
    if (!item.course.trim()) {
      errors[`education_records.${index}.course`] = "Informe o curso.";
    }
    if (!item.institution.trim()) {
      errors[`education_records.${index}.institution`] =
        "Informe a instituicao.";
    }
  });

  return errors;
}

function validateResumeStep(form: ProfileFormState): FormErrors {
  const errors: FormErrors = {};

  if (!form.resumeFile && !form.currentResumeName) {
    errors.resume = "Anexe seu curriculo para concluir o cadastro.";
  }

  return errors;
}

export default function CompleteProfileWizard() {
  const router = useRouter();
  const { isAuthenticated, isReady, updateUser, user } = useAuth();
  const [currentStep, setCurrentStep] = useState(0);
  const [form, setForm] = useState<ProfileFormState | null>(null);
  const [errors, setErrors] = useState<FormErrors>({});
  const [globalError, setGlobalError] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    let isActive = true;

    if (!isReady) {
      return () => {
        isActive = false;
      };
    }

    if (!isAuthenticated || !user) {
      router.replace("/auth/login");
      return () => {
        isActive = false;
      };
    }

    if (user.role !== "employee") {
      router.replace(resolveDashboardRoute(user.role));
      return () => {
        isActive = false;
      };
    }

    Promise.resolve().then(() => {
      if (isActive) {
        setForm(buildFormState(user));
      }
    });

    return () => {
      isActive = false;
    };
  }, [isAuthenticated, isReady, router, user]);

  const progress = useMemo(
    () => `${((currentStep + 1) / steps.length) * 100}%`,
    [currentStep],
  );

  if (!form) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
        <div className="rounded-2xl border border-white/70 bg-white/90 px-6 py-5 text-sm text-slate-600 shadow-lg">
          Carregando configuracao do perfil...
        </div>
      </main>
    );
  }

  const handleChange = (
    field: keyof Omit<ProfileFormState, "experiences" | "education_records">,
    value: string | File | null,
  ) => {
    setForm((current) =>
      current
        ? {
            ...current,
            [field]: value,
          }
        : current,
    );
    setErrors((current) => {
      const next = { ...current };
      delete next[field];
      if (field === "linkedin_url" || field === "github_url" || field === "portfolio_url") {
        delete next.links;
      }
      return next;
    });
  };

  const handleExperienceChange = (
    index: number,
    field: keyof ExperienceItem,
    value: string | boolean,
  ) => {
    setForm((current) => {
      if (!current) return current;

      const experiences = [...current.experiences];
      experiences[index] = {
        ...experiences[index],
        [field]: value,
      };

      return { ...current, experiences };
    });
  };

  const handleEducationChange = (
    index: number,
    field: keyof EducationRecordItem,
    value: string,
  ) => {
    setForm((current) => {
      if (!current) return current;

      const education_records = [...current.education_records];
      education_records[index] = {
        ...education_records[index],
        [field]: value,
      };

      return { ...current, education_records };
    });
  };

  const currentStepErrors = [
    validatePersonalStep,
    validateProfessionalStep,
    validateJourneyStep,
    validateResumeStep,
  ][currentStep](form);

  const goNext = () => {
    if (Object.keys(currentStepErrors).length > 0) {
      setErrors(currentStepErrors);
      return;
    }

    setErrors({});
    setCurrentStep((step) => Math.min(step + 1, steps.length - 1));
  };

  const goBack = () => {
    setErrors({});
    setCurrentStep((step) => Math.max(step - 1, 0));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setGlobalError("");

    const invalidStep = firstInvalidStep(form);
    if (invalidStep >= 0) {
      const stepValidators = [
        validatePersonalStep,
        validateProfessionalStep,
        validateJourneyStep,
        validateResumeStep,
      ];
      setCurrentStep(invalidStep);
      setErrors(stepValidators[invalidStep](form));
      return;
    }

    setIsSaving(true);

    try {
      const updatedUser = await updateCurrentUserProfile({
        full_name: form.full_name.trim(),
        date_of_birth: form.date_of_birth,
        phone: form.phone.trim(),
        city: form.city.trim(),
        state: form.state.trim(),
        country: form.country.trim(),
        professional_title: form.professional_title.trim(),
        linkedin_url: form.linkedin_url.trim(),
        github_url: form.github_url.trim(),
        portfolio_url: form.portfolio_url.trim(),
        professional_bio: form.professional_bio.trim(),
        experiences: form.experiences,
        education_records: form.education_records,
        resume: form.resumeFile,
      });

      updateUser(updatedUser);
      router.push("/dashboard-employee");
    } catch (error) {
      const axiosError = error as AxiosError<BackendValidationError>;

      if (
        axiosError.response?.data &&
        typeof axiosError.response.data === "object"
      ) {
        const nextErrors: FormErrors = {};
        for (const [field, messages] of Object.entries(
          axiosError.response.data,
        )) {
          nextErrors[field] = Array.isArray(messages)
            ? String(messages[0])
            : String(messages);
        }
        setErrors(nextErrors);
      } else {
        setGlobalError("Nao foi possivel salvar seu perfil agora.");
      }
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-purple-500/20 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-orange-400/20 blur-3xl" />

      <div className="relative mx-auto max-w-6xl">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.4fr]">
          <aside className="rounded-3xl bg-slate-900 p-8 text-white shadow-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-purple-200">
              Completar perfil
            </p>
            <h1 className="mt-4 text-3xl font-bold leading-tight">
              Libere suas candidaturas com um perfil forte e objetivo
            </h1>
            <p className="mt-4 text-sm leading-6 text-slate-300">
              Estruturamos o cadastro em etapas curtas para diminuir friccao e
              manter foco em dados que realmente ajudam no match com as vagas.
            </p>

            <div className="mt-8 h-2 overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-gradient-to-r from-purple-400 to-orange-300 transition-all"
                style={{ width: progress }}
              />
            </div>

            <div className="mt-8 space-y-4">
              {steps.map((step, index) => {
                const isActive = index === currentStep;
                const isPast = index < currentStep;

                return (
                  <button
                    key={step.title}
                    type="button"
                    className={`flex w-full items-start gap-4 rounded-2xl p-4 text-left transition-colors ${
                      isActive
                        ? "bg-white/10"
                        : "hover:bg-white/5"
                    }`}
                    onClick={() => setCurrentStep(index)}
                  >
                    <span
                      className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold ${
                        isActive || isPast
                          ? "bg-purple-500 text-white"
                          : "border border-white/20 text-slate-300"
                      }`}
                    >
                      {index + 1}
                    </span>
                    <span>
                      <span className="block text-sm font-semibold">
                        {step.title}
                      </span>
                      <span className="mt-1 block text-sm text-slate-300">
                        {step.description}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-5 text-sm text-slate-300">
              Sessao ativa para{" "}
              <span className="font-semibold text-white">
                {getUserDisplayName(user)}
              </span>
            </div>
          </aside>

          <form className="space-y-6" onSubmit={handleSubmit}>
            {globalError && (
              <div className="rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600">
                {globalError}
              </div>
            )}

            {currentStep === 0 && (
              <SectionCard
                title="Dados pessoais"
                description="Esses dados sao usados para identificacao basica e para aproximar vagas da sua regiao."
              >
                <div className="grid gap-5 md:grid-cols-2">
                  <div className="md:col-span-2">
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      Nome completo
                    </label>
                    <Input
                      value={form.full_name}
                      onChange={(event) =>
                        handleChange("full_name", event.target.value)
                      }
                      placeholder="Ex: Maria de Souza Silva"
                      className={inputClassName}
                    />
                    <FieldError message={errors.full_name} />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      Data de nascimento
                    </label>
                    <Input
                      type="date"
                      value={form.date_of_birth}
                      onChange={(event) =>
                        handleChange("date_of_birth", event.target.value)
                      }
                      className={inputClassName}
                    />
                    <FieldError message={errors.date_of_birth} />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      Telefone / WhatsApp
                    </label>
                    <Input
                      value={form.phone}
                      onChange={(event) =>
                        handleChange("phone", event.target.value)
                      }
                      placeholder="(11) 99999-9999"
                      className={inputClassName}
                    />
                    <FieldError message={errors.phone} />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      Cidade
                    </label>
                    <Input
                      value={form.city}
                      onChange={(event) =>
                        handleChange("city", event.target.value)
                      }
                      placeholder="Sao Paulo"
                      className={inputClassName}
                    />
                    <FieldError message={errors.city} />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      Estado
                    </label>
                    <Input
                      value={form.state}
                      onChange={(event) =>
                        handleChange("state", event.target.value)
                      }
                      placeholder="SP"
                      className={inputClassName}
                    />
                    <FieldError message={errors.state} />
                  </div>

                  <div className="md:col-span-2">
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      Pais
                    </label>
                    <Input
                      value={form.country}
                      onChange={(event) =>
                        handleChange("country", event.target.value)
                      }
                      placeholder="Brasil"
                      className={inputClassName}
                    />
                    <FieldError message={errors.country} />
                  </div>
                </div>
              </SectionCard>
            )}

            {currentStep === 1 && (
              <SectionCard
                title="Contato e posicionamento profissional"
                description="Aqui o candidato contextualiza o cargo alvo e oferece caminhos para validacao tecnica ou institucional."
              >
                <div className="grid gap-5">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      Cargo desejado / titulo profissional
                    </label>
                    <Input
                      value={form.professional_title}
                      onChange={(event) =>
                        handleChange("professional_title", event.target.value)
                      }
                      placeholder="Desenvolvedor Front-end"
                      className={inputClassName}
                    />
                    <FieldError message={errors.professional_title} />
                  </div>

                  <div className="grid gap-5 md:grid-cols-3">
                    <div>
                      <label className="mb-2 block text-sm font-medium text-slate-700">
                        LinkedIn
                      </label>
                      <Input
                        value={form.linkedin_url}
                        onChange={(event) =>
                          handleChange("linkedin_url", event.target.value)
                        }
                        placeholder="https://linkedin.com/in/seu-perfil"
                        className={inputClassName}
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-medium text-slate-700">
                        GitHub
                      </label>
                      <Input
                        value={form.github_url}
                        onChange={(event) =>
                          handleChange("github_url", event.target.value)
                        }
                        placeholder="https://github.com/seuusuario"
                        className={inputClassName}
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-medium text-slate-700">
                        Portfolio
                      </label>
                      <Input
                        value={form.portfolio_url}
                        onChange={(event) =>
                          handleChange("portfolio_url", event.target.value)
                        }
                        placeholder="https://seuportfolio.com"
                        className={inputClassName}
                      />
                    </div>
                  </div>
                  <FieldError message={errors.links} />

                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      Resumo profissional
                    </label>
                    <textarea
                      value={form.professional_bio}
                      onChange={(event) =>
                        handleChange("professional_bio", event.target.value)
                      }
                      placeholder="Fale do seu foco, pontos fortes, ferramentas e resultados mais relevantes."
                      className={textareaClassName}
                    />
                    <FieldError message={errors.professional_bio} />
                  </div>
                </div>
              </SectionCard>
            )}

            {currentStep === 2 && (
              <>
                <SectionCard
                  title="Experiencias anteriores"
                  description="Use blocos independentes para deixar a leitura mais objetiva para recrutamento."
                >
                  <div className="space-y-4">
                    {form.experiences.map((experience, index) => (
                      <div
                        key={`experience-${index}`}
                        className="rounded-2xl border border-slate-200 bg-slate-50 p-5"
                      >
                        <div className="grid gap-4 md:grid-cols-2">
                          <div>
                            <label className="mb-2 block text-sm font-medium text-slate-700">
                              Cargo
                            </label>
                            <Input
                              value={experience.role}
                              onChange={(event) =>
                                handleExperienceChange(
                                  index,
                                  "role",
                                  event.target.value,
                                )
                              }
                              className={inputClassName}
                            />
                            <FieldError
                              message={errors[`experiences.${index}.role`]}
                            />
                          </div>
                          <div>
                            <label className="mb-2 block text-sm font-medium text-slate-700">
                              Empresa
                            </label>
                            <Input
                              value={experience.company}
                              onChange={(event) =>
                                handleExperienceChange(
                                  index,
                                  "company",
                                  event.target.value,
                                )
                              }
                              className={inputClassName}
                            />
                            <FieldError
                              message={errors[`experiences.${index}.company`]}
                            />
                          </div>
                          <div>
                            <label className="mb-2 block text-sm font-medium text-slate-700">
                              Inicio
                            </label>
                            <Input
                              type="month"
                              value={experience.start_date}
                              onChange={(event) =>
                                handleExperienceChange(
                                  index,
                                  "start_date",
                                  event.target.value,
                                )
                              }
                              className={inputClassName}
                            />
                          </div>
                          <div>
                            <label className="mb-2 block text-sm font-medium text-slate-700">
                              Fim
                            </label>
                            <Input
                              type="month"
                              value={experience.end_date}
                              disabled={experience.current}
                              onChange={(event) =>
                                handleExperienceChange(
                                  index,
                                  "end_date",
                                  event.target.value,
                                )
                              }
                              className={inputClassName}
                            />
                          </div>
                          <div className="md:col-span-2">
                            <label className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700">
                              <input
                                type="checkbox"
                                checked={experience.current}
                                onChange={(event) =>
                                  handleExperienceChange(
                                    index,
                                    "current",
                                    event.target.checked,
                                  )
                                }
                                className="h-4 w-4 rounded border-slate-300 text-purple-600 focus:ring-purple-500"
                              />
                              Trabalho atual
                            </label>
                          </div>
                          <div className="md:col-span-2">
                            <label className="mb-2 block text-sm font-medium text-slate-700">
                              Principais atividades
                            </label>
                            <textarea
                              value={experience.description}
                              onChange={(event) =>
                                handleExperienceChange(
                                  index,
                                  "description",
                                  event.target.value,
                                )
                              }
                              className={textareaClassName}
                              placeholder="Responsabilidades, entregas e resultados relevantes."
                            />
                          </div>
                        </div>

                        {form.experiences.length > 1 && (
                          <button
                            type="button"
                            className="mt-4 text-sm font-semibold text-red-600"
                            onClick={() =>
                              setForm((current) =>
                                current
                                  ? {
                                      ...current,
                                      experiences:
                                        current.experiences.filter(
                                          (_, itemIndex) => itemIndex !== index,
                                        ),
                                    }
                                  : current,
                              )
                            }
                          >
                            Remover experiencia
                          </button>
                        )}
                      </div>
                    ))}
                    <FieldError message={errors.experiences} />

                    <Button
                      type="button"
                      variant="secondary"
                      className="rounded-xl px-5 py-3"
                      onClick={() =>
                        setForm((current) =>
                          current
                            ? {
                                ...current,
                                experiences: [
                                  ...current.experiences,
                                  emptyExperience(),
                                ],
                              }
                            : current,
                        )
                      }
                    >
                      Adicionar experiencia
                    </Button>
                  </div>
                </SectionCard>

                <SectionCard
                  title="Formacao academica"
                  description="Mantenha cursos e instituicoes separados para facilitar leitura e comparacao."
                >
                  <div className="space-y-4">
                    {form.education_records.map((education, index) => (
                      <div
                        key={`education-${index}`}
                        className="rounded-2xl border border-slate-200 bg-slate-50 p-5"
                      >
                        <div className="grid gap-4 md:grid-cols-2">
                          <div>
                            <label className="mb-2 block text-sm font-medium text-slate-700">
                              Curso
                            </label>
                            <Input
                              value={education.course}
                              onChange={(event) =>
                                handleEducationChange(
                                  index,
                                  "course",
                                  event.target.value,
                                )
                              }
                              className={inputClassName}
                            />
                            <FieldError
                              message={
                                errors[`education_records.${index}.course`]
                              }
                            />
                          </div>
                          <div>
                            <label className="mb-2 block text-sm font-medium text-slate-700">
                              Instituicao
                            </label>
                            <Input
                              value={education.institution}
                              onChange={(event) =>
                                handleEducationChange(
                                  index,
                                  "institution",
                                  event.target.value,
                                )
                              }
                              className={inputClassName}
                            />
                            <FieldError
                              message={
                                errors[
                                  `education_records.${index}.institution`
                                ]
                              }
                            />
                          </div>
                          <div>
                            <label className="mb-2 block text-sm font-medium text-slate-700">
                              Inicio
                            </label>
                            <Input
                              type="month"
                              value={education.start_date}
                              onChange={(event) =>
                                handleEducationChange(
                                  index,
                                  "start_date",
                                  event.target.value,
                                )
                              }
                              className={inputClassName}
                            />
                          </div>
                          <div>
                            <label className="mb-2 block text-sm font-medium text-slate-700">
                              Fim
                            </label>
                            <Input
                              type="month"
                              value={education.end_date}
                              onChange={(event) =>
                                handleEducationChange(
                                  index,
                                  "end_date",
                                  event.target.value,
                                )
                              }
                              className={inputClassName}
                            />
                          </div>
                          <div className="md:col-span-2">
                            <label className="mb-2 block text-sm font-medium text-slate-700">
                              Observacoes
                            </label>
                            <textarea
                              value={education.description}
                              onChange={(event) =>
                                handleEducationChange(
                                  index,
                                  "description",
                                  event.target.value,
                                )
                              }
                              className={textareaClassName}
                              placeholder="Destaques, certificacoes ou foco principal da formacao."
                            />
                          </div>
                        </div>

                        {form.education_records.length > 1 && (
                          <button
                            type="button"
                            className="mt-4 text-sm font-semibold text-red-600"
                            onClick={() =>
                              setForm((current) =>
                                current
                                  ? {
                                      ...current,
                                      education_records:
                                        current.education_records.filter(
                                          (_, itemIndex) => itemIndex !== index,
                                        ),
                                    }
                                  : current,
                              )
                            }
                          >
                            Remover formacao
                          </button>
                        )}
                      </div>
                    ))}
                    <FieldError message={errors.education_records} />

                    <Button
                      type="button"
                      variant="secondary"
                      className="rounded-xl px-5 py-3"
                      onClick={() =>
                        setForm((current) =>
                          current
                            ? {
                                ...current,
                                education_records: [
                                  ...current.education_records,
                                  emptyEducation(),
                                ],
                              }
                            : current,
                        )
                      }
                    >
                      Adicionar formacao
                    </Button>
                  </div>
                </SectionCard>
              </>
            )}

            {currentStep === 3 && (
              <SectionCard
                title="Curriculo e revisao final"
                description="O anexo do curriculo fecha o fluxo e habilita a candidatura em rotas protegidas."
              >
                <div className="space-y-6">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      Curriculo em PDF ou DOC
                    </label>
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={(event) =>
                        handleChange(
                          "resumeFile",
                          event.target.files?.[0] ?? null,
                        )
                      }
                      className={selectClassName}
                    />
                    <FieldError message={errors.resume} />
                    {(form.resumeFile || form.currentResumeName) && (
                      <p className="mt-3 text-sm text-slate-600">
                        Arquivo selecionado:{" "}
                        <span className="font-semibold text-slate-900">
                          {form.resumeFile?.name || form.currentResumeName}
                        </span>
                      </p>
                    )}
                  </div>

                  <div className="rounded-2xl bg-slate-50 p-5">
                    <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
                      Checklist antes de salvar
                    </h3>
                    <ul className="mt-4 space-y-3 text-sm text-slate-700">
                      <li>Dados pessoais e localizacao preenchidos.</li>
                      <li>Pelo menos um link profissional informado.</li>
                      <li>Experiencia e formacao adicionadas em blocos separados.</li>
                      <li>Curriculo anexado para liberar candidaturas.</li>
                    </ul>
                  </div>
                </div>
              </SectionCard>
            )}

            <div className="flex flex-col gap-3 rounded-3xl border border-white/70 bg-white/90 p-5 shadow-lg sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-slate-600">
                Etapa {currentStep + 1} de {steps.length}
              </p>
              <div className="flex flex-col gap-3 sm:flex-row">
                {currentStep > 0 && (
                  <Button
                    type="button"
                    variant="secondary"
                    className="rounded-xl px-5 py-3"
                    onClick={goBack}
                  >
                    Voltar
                  </Button>
                )}

                {currentStep < steps.length - 1 ? (
                  <Button
                    type="button"
                    className="rounded-xl bg-slate-900 px-5 py-3 hover:bg-slate-800 focus-visible:ring-slate-900"
                    onClick={goNext}
                  >
                    Proxima etapa
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    className="rounded-xl bg-slate-900 px-5 py-3 hover:bg-slate-800 focus-visible:ring-slate-900"
                    disabled={isSaving}
                  >
                    {isSaving ? "Salvando perfil..." : "Salvar e liberar acesso"}
                  </Button>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
