export type Elem = ContactItem| SkillItem| ResponsibilityItem| ProjectItem| ExperienceItem| EducationItem| Info| Block | AwardItem

export interface ContactItem {
    type: "contactItem";
    key: string;
    link: string;
    value: string;
    icon: string;
}

export interface AwardItem {
    type: "awardItem",
    name: string,
    time: string,
}

export interface SkillItem {
    type: "skillItem";
    value: string;
}

export interface ResponsibilityItem {
    type: "responsibilityItem";
    value: string;
}

export interface ProjectItem {
    type: "projectItem";
    name: string;
    duration: string;
    role: string;
    overview: string;
    link: string;
    responsibility: ResponsibilityItem[];
    summary: ResponsibilityItem[];
}

export interface EducationItem {
    type: "educationItem";
    duration: string;
    name: string;
    degree: string;
    major: string;
}

export interface ExperienceItem {
    type: "experienceItem";
    name: string;
    duration: string;
    position: string;
    responsibility: ResponsibilityItem[];
}

export interface Info {
    type: string;
    name: string;
}

export interface Block {
    type: string,
    name: string,
    icon: string,
    data: ContactItem[] | SkillItem[] | ProjectItem[] | EducationItem[] | ExperienceItem[]
}
