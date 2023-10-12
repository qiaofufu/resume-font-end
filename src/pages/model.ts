export type Elem = ContactItem| UnorderList| ResponsibilityItem| ProjectItem| ExperienceItem| EducationItem| Info| Block

export interface ContactItem {
    type: "contactItem";
    key: string;
    value: string;
    icon: string;
}

export interface UnorderList {
    type: "unorderList";
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
    responsibility: ResponsibilityItem[];
    summary: string;
}

export interface EducationItem {
    type: "educationItem";
    duration: string;
    name: string;
    degree: string;
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
    gender: string;
    age: number;
    picture: string;
}

export interface Block {
    type: string,
    name: string,
    icon: string,
    data: ContactItem[] | SkillItem[] | ProjectItem[] | EducationItem[] | ExperienceItem[]
}
