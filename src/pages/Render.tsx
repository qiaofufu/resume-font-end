import {
    AwardItem,
    Block,
    ContactItem,
    EducationItem,
    Elem,
    ExperienceItem,
    Info,
    ProjectItem,
    ResponsibilityItem, SkillItem,
} from "./model";

import {IconFont} from 'tdesign-icons-react';
import styles from "./Render.module.css"


export function Render(data:Elem[]) {
    return data.map((elem) => {
            return render(elem)
        })
}


export function render(elem: Elem): JSX.Element {
    switch (elem.type) {
        case "info":
            return renderInfo(elem as Info);
        case "block":
            return renderBlock(elem as Block, "block");
        case "contact":
            return renderBlock(elem as Block, styles.contact);
        case "skill":
            return renderBlock(elem as Block, styles.skill);
        case "education":
            return renderBlock(elem as Block, styles.education);
        case "experience":
            return renderBlock(elem as Block, styles.experience);
        case "project":
            return renderBlock(elem as Block, styles.project);
        case "award":
            return renderBlock(elem as Block, styles.award);
        case "contactItem":
            return renderContactItem(elem as ContactItem);
        case "skillItem":
            return renderSkillItem(elem as SkillItem);
        case "responsibilityItem":
            return renderResponsibilityItem(elem as ResponsibilityItem);
        case "projectItem":
            return renderProjectItem(elem as ProjectItem);
        case "educationItem":
            return renderEducationItem(elem as EducationItem);
        case "experienceItem":
            return renderExperienceItem(elem as ExperienceItem);
        case "awardItem":
            return renderAwardItem(elem as AwardItem);
        default :
            console.log(elem)
            return (<div>Error</div>)
    }
}

function renderContactItem(contactItem: ContactItem): JSX.Element {
    return (
        <a className={styles.contactItem} href={contactItem.link}>
            <IconFont name={contactItem.icon}/>
            {`${contactItem.key}:${contactItem.value}`}
        </a>
    )
}

function renderSkillItem(skillItem: SkillItem): JSX.Element {
    // 渲染 SkillItem 的逻辑
    return renderLi(skillItem)
}

function renderResponsibilityItem(responsibilityItem: ResponsibilityItem): JSX.Element {
    // 渲染 ResponsibilityItem 的逻辑
    return renderLi(responsibilityItem)
}

function renderAwardItem(elem: AwardItem) {
    return (
        <li className={styles.awardItem}>
            <span className={styles.awardItemTime}>{elem.time}</span>
            <span className={styles.awardItemName}>{elem.name}</span>
        </li>
    );
}

function renderProjectItem(projectItem: ProjectItem): JSX.Element {
    // 渲染 ProjectItem 的逻辑
    const responsibility = Render(projectItem.responsibility)
    const summary = Render(projectItem.summary)
    return (
        <div className={styles.projectItem}>
            <blockquote className={styles.projectItemHeader}>
                {projectItem.link?<a href={projectItem.link}><div>{projectItem.name}</div></a>:<div>{projectItem.name}</div>}
                <div className={styles.projectItemRole}>{projectItem.role}</div>
                <a href={projectItem.link} className={styles.projectItemLink}>{projectItem.link}</a>
                <div className={styles.projectItemDuration}>{projectItem.duration}</div>
            </blockquote>
            <div className={styles.projectItemOverview}>
                <h3>项目概述</h3>
                <p>{projectItem.overview}</p>
            </div>
            <div className={styles.projectItemResponsibility}>
                <h3>主要工作</h3>
                {responsibility}
            </div>
            <div className={styles.projectItemSummary}>
                <h3>项目总结</h3>
                {summary}
            </div>
        </div>
    )
}

function renderEducationItem(educationItem: EducationItem): JSX.Element {
    // 渲染 EducationItem 的逻辑
    return (
        <blockquote className={styles.educationItem}>
            <span>{educationItem.duration}</span>
            <span>{educationItem.name}</span>
            <span>{educationItem.major}</span>
            <span>{educationItem.degree}</span>
        </blockquote>
    )
}

function renderExperienceItem(experienceItem: ExperienceItem): JSX.Element {
    // 渲染 ExperienceItem 的逻辑
    const responsibility = Render(experienceItem.responsibility)
    return (
        <div>
            <blockquote className={styles.experienceItemHeader}>
                <span className={styles.experienceItemName}>{experienceItem.name}</span>
                <span className={styles.experienceItemPosition}>{experienceItem.position}</span>
                <span className={styles.experienceItemDuration}>{experienceItem.duration}</span>
            </blockquote>
            <div>
                {responsibility}
            </div>
        </div>
    )
}

function renderInfo(elem:Info) {
    return (
        <div>
            <div className={styles.info}>
                <div className={styles.infoName}>
                    {elem.name}
                </div>
            </div>
            <hr/>
        </div>
    )
}

function renderBlock(block: Block, style: string): JSX.Element {
    const outlet = block.data.map((item, index) => {
        return (
            <div key={index}>
                {render(item)}
            </div>
        )
    })

    return (
        <div>
            {
                block.name ? <h2><IconFont name={block.icon}/>{block.name}</h2> : null
            }
            {block.type !== "contact"?<hr/>:null}
            <div className={style}>
                {outlet}
            </div>

        </div>
    );
}

function renderLi(elem:ResponsibilityItem|SkillItem) {
    return (
        <li >{elem.value}</li>
    )
}

