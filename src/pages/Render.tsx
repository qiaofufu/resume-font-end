import {
    Block,
    ContactItem,
    EducationItem,
    Elem,
    ExperienceItem,
    Info,
    ProjectItem,
    ResponsibilityItem,
    SkillItem
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
        default :
            console.log(elem)
            return (<div>Error</div>)
    }
}

function renderContactItem(contactItem: ContactItem): JSX.Element {
    return (
        <div className={styles.contactItem}>
            <IconFont name={contactItem.icon}/>
            {`${contactItem.key}:${contactItem.value}`}
        </div>
    )
}

function renderSkillItem(skillItem: SkillItem): JSX.Element {
    // 渲染 SkillItem 的逻辑
    return (
        <div></div>
    )
}

function renderResponsibilityItem(responsibilityItem: ResponsibilityItem): JSX.Element {
    // 渲染 ResponsibilityItem 的逻辑
    return (
        <div></div>
    )
}

function renderProjectItem(projectItem: ProjectItem): JSX.Element {
    // 渲染 ProjectItem 的逻辑
    return (
        <div></div>
    )
}

function renderEducationItem(educationItem: EducationItem): JSX.Element {
    // 渲染 EducationItem 的逻辑
    return (
        <div></div>
    )
}

function renderExperienceItem(experienceItem: ExperienceItem): JSX.Element {
    // 渲染 ExperienceItem 的逻辑
    return (
        <div></div>
    )
}



function renderInfo(elem:Info) {
    return (
        <div>
            <div className={styles.info}>
                {elem.picture?<img className={styles.infoPicture} src={elem.picture} alt={"头像"}/>:null}
                <div className={styles.infoName}>
                    {elem.name}
                </div>
                {elem.age?<div className={styles.infoAge}> age: {elem.age}</div>:null}
                {elem.gender?<div className={styles.infoGender}>gender: {elem.gender}</div>:null}
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
            <div className={style}>
                {outlet}
            </div>
            {block.type !== "contact"?<hr/>:null}
        </div>
    );
}

