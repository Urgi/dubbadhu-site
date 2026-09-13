import { supabase } from "./supabaseClient.js";
import { isValidEmail } from "./validateEmail.js";
import { CAREER_CONTACT_METHODS, careerRoleById } from "../config/careers.js";

const MAX_RESUME_BYTES = 5 * 1024 * 1024;
const ALLOWED_RESUME = {
  "application/pdf": "pdf",
  "application/msword": "doc",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": "docx",
};

function resumeExt(file) {
  if (file.type && ALLOWED_RESUME[file.type]) return ALLOWED_RESUME[file.type];
  const name = (file.name || "").toLowerCase();
  if (name.endsWith(".pdf")) return "pdf";
  if (name.endsWith(".docx")) return "docx";
  if (name.endsWith(".doc")) return "doc";
  return "";
}

function isKnownContact(id) {
  return CAREER_CONTACT_METHODS.some((method) => method.id === id);
}

export function validateCareerApplication({
  name,
  city,
  email,
  contactMethod,
  contactDetail,
  roleId,
  fit,
  resume,
}) {
  const fullName = (name || "").trim();
  const cityCountry = (city || "").trim();
  const trimmedEmail = (email || "").trim();
  const preferredContact = (contactMethod || "").trim();
  const detail = (contactDetail || "").trim();
  const statement = (fit || "").trim();
  const role = careerRoleById(roleId);

  if (fullName.length < 2) {
    return { ok: false, message: "Please enter your name." };
  }
  if (cityCountry.length < 2) {
    return { ok: false, message: "Please enter your city and country." };
  }
  if (!isValidEmail(trimmedEmail)) {
    return { ok: false, message: "Please enter a valid email address." };
  }
  if (!isKnownContact(preferredContact)) {
    return { ok: false, message: "Please choose a preferred contact method." };
  }
  if (preferredContact !== "email" && detail.length < 3) {
    return { ok: false, message: "Please add a phone number or handle for that contact method." };
  }
  if (!role) {
    return { ok: false, message: "Please choose an opening." };
  }
  if (statement.length < 40) {
    return { ok: false, message: "Tell us a bit more about why you’re a good fit (at least a few sentences)." };
  }
  if (statement.length > 4000) {
    return { ok: false, message: "Please keep your note under 4,000 characters." };
  }
  if (!resume) {
    return { ok: false, message: "Please attach your resume (PDF or Word)." };
  }
  if (resume.size > MAX_RESUME_BYTES) {
    return { ok: false, message: "Resume must be 5 MB or smaller." };
  }
  if (!resumeExt(resume)) {
    return { ok: false, message: "Resume must be a PDF or Word document." };
  }
  return {
    ok: true,
    fullName,
    cityCountry,
    trimmedEmail,
    preferredContact,
    detail: preferredContact === "email" ? trimmedEmail : detail,
    statement,
    role,
    resume,
  };
}

export async function submitCareerApplication(fields) {
  const checked = validateCareerApplication(fields);
  if (!checked.ok) return checked;
  if (!supabase) {
    return {
      ok: false,
      code: "configure",
      message: "Applications are not configured on this build. Email support@afaantech.com with your resume.",
    };
  }

  const ext = resumeExt(checked.resume);
  const path = `applications/${crypto.randomUUID()}.${ext}`;
  const { error: uploadError } = await supabase.storage.from("job-applications").upload(path, checked.resume, {
    cacheControl: "3600",
    upsert: false,
    contentType: checked.resume.type || undefined,
  });

  if (uploadError) {
    return {
      ok: false,
      code: "upload",
      message: uploadError.message || "Could not upload your resume. Try a PDF under 5 MB.",
    };
  }

  const { error: insertError } = await supabase.from("job_applications").insert({
    full_name: checked.fullName,
    city_country: checked.cityCountry,
    email: checked.trimmedEmail,
    preferred_contact: checked.preferredContact,
    contact_detail: checked.detail,
    role_id: checked.role.id,
    role_title: checked.role.title,
    fit_statement: checked.statement,
    resume_path: path,
    resume_filename: checked.resume.name,
    resume_mime: checked.resume.type || null,
  });

  if (insertError) {
    return {
      ok: false,
      code: "insert",
      message: insertError.message || "Could not send your application. Try again.",
    };
  }

  return {
    ok: true,
    code: "added",
    message: `Thanks, ${checked.fullName.split(" ")[0]}. We received your application for ${checked.role.title}.`,
  };
}
