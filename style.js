/*Global Variables With No Values*/
let userName = ""
let num_of_exes;
let num_of_edus;
let arrayThatKeepsTrackOfUsersCurrentData = []

/*Interface Setup*/
let canvas = document.getElementById("canvas")
let data = document.getElementById("data")
const restart_local = document.querySelector('.change_state')

/*Text Variables called in the Work Experience function*/
let q_text = "List the Location, Date and Position. SEPARATE EACH WITH A SEMI-COLON (;). (E.g, Best Buy, Calgary, AB; 08/2021 - 10/2022; Geek Squad Agent)"
let _q_text = "List The Tasks You've Completed at Your Job (recommended 3 to 5 tasks)! MAKE SURE TO SEPARATE EACH TASK WITH A COMMA (,)"
let placeholder1_txt = "location; date; description of position..."
let placeholder2_txt = "Write about the tasks you've completed.."

/*Initial/Question One Variables - Enter First and Last Name*/
let question = document.querySelector('.question')
question.innerText = "What is your name? (Please enter first and last name)"
let interface = document.querySelector('.interface')
let input = document.querySelector('.element_1')
let submit_1 = document.querySelector('.element_2')

/*Question Two Variables - Write a Summary about Yourself*/
const summary_i = document.createElement('textarea')
summary_i.placeholder = "Enter a summary about yourself..."
const submit_2 = document.createElement('button')
const q2_text = "First thing we will have you do is write a quick summary about yourself. (Try to keep it 3 to 5 sentences)."
submit_2.innerText = "submit"

/*Question Three Variables - Enter Skill 1*/
const skill_1_i = document.createElement('input')
const submit_3 = document.createElement('button')
const q3_text = "Now it's time to show us your skills. Skill 1. (1 out of 5)"
submit_3.innerText = "submit"

/*Question Four Variables - Enter Skill 2*/
const skill_2_i = document.createElement('input')
const submit_4 = document.createElement('button')
const q4_text = "Now it's time to show us your skills. Skill 2. (2 out of 5)"
submit_4.innerText = "submit"

/*Question Five Variables - Enter Skill 3*/
const skill_3_i = document.createElement('input')
const submit_5 = document.createElement('button')
const q5_text = "Now it's time to show us your skills. Skill 3. (3 out of 5)"
submit_5.innerText = "submit"

/*Question Six Variables - Enter Skill 4*/
const skill_4_i = document.createElement('input')
const submit_6 = document.createElement('button')
const q6_text = "Now it's time to show us your skills. Skill 4. (4 out of 5)"
submit_6.innerText = "submit"

/*Question Seven Variables - Enter Skill 5*/
const skill_5_i = document.createElement('input')
const submit_7 = document.createElement('button')
const q7_text = "Now it's time to show us your skills. Skill 5. (5 out of 5)"
submit_7.innerText = "submit"

let q_num_exe = "How Many Relevant Work Experiences Do You Have? (Please Enter a Number)"
/*Question Eight Variables and Up - Work Experience*/
function workExperience(num_of_exes) {
    let array = []
    removeItems()
    num_of_exes = parseInt(num_of_exes)
    for(let i = 1; i <= num_of_exes * 2; i++) {
        let div = document.createElement('div')
        let text_area = document.createElement('textarea')
        let btn = document.createElement('button')
        let txt_id = 'experience_' + i
        let btn_id = 'ex_btn_' + i
        text_area.id = txt_id
        btn.id = btn_id
        if(i % 2 == 0) {
            text_area.placeholder = placeholder2_txt
        } else {
            text_area.placeholder = placeholder1_txt
        }
        btn.innerText = "submit"
        div.appendChild(text_area)
        div.appendChild(btn)
        div.className= "hidden"
        array.push(div)
        interface.appendChild(div)
    }
    array[0].className = "flex"
    question.innerText = `Experience 1 Part One - ${q_text}`
    for(let j = 1; j<= num_of_exes*2; j++) {
        document.getElementById('ex_btn_' + j).addEventListener('click', () => {
            if(j%2==0) {
                forInputElements(`achievement ${j/2}`, document.getElementById('experience_' + j), `Experience ${(j+2)/2} Part One - ${q_text}`)
                localStorage.setItem(`achievement ${j/2}`, document.getElementById('experience_' + j).value)
                arrayThatKeepsTrackOfUsersCurrentData.push(`achievement ${j/2}: ${document.getElementById('experience_' + j).value}`)
                localStorage.setItem('all_data', JSON.stringify(arrayThatKeepsTrackOfUsersCurrentData))
            } else {
                forInputElements(`experience ${(j+1)/2}`, document.getElementById('experience_' + j), `Experience ${(j+1)/2} Part Two - ${_q_text}`)
                localStorage.setItem(`experience ${(j+1)/2}`, document.getElementById('experience_' + j).value)
                arrayThatKeepsTrackOfUsersCurrentData.push(`experience ${(j+1)/2}: ${document.getElementById('experience_' + j).value}`)
                localStorage.setItem('all_data', JSON.stringify(arrayThatKeepsTrackOfUsersCurrentData))
            }
            if(j == num_of_exes*2) {
                array[j-1].className = "hidden"
                /*Change question later*/
                removeItems()
                question.innerText = q_txt_edu
                localStorage.setItem('question', 'education')
                education()
            } else {
                array[j-1].className = "hidden"
                array[j].className = "flex"
            }
        })
    }
}

/*Question 9 or Up - Education Section*/
const q_txt_edu = "Select How Many Educational Experiences You Would Like to Add?"

function education() {
    removeItems()
    let btn1 = document.createElement('button')
    btn1.innerText = "1"
    let btn2 = document.createElement('button')
    btn2.innerText = "2"
    let btn3 = document.createElement('button')
    btn3.innerText = "3"
    interface.appendChild(btn1)
    interface.appendChild(btn2)
    interface.appendChild(btn3)
    let num_of_iterations;
    function addEventListenersForLocalBtns(n) {
        let array = []
        for(let i = 1; i <= n; i++) {
            let div = document.createElement('div')
            let input = document.createElement('textarea')
            input.id = `edu_${i}`
            input.placeholder = "Seperate each response with a comma as shown in the above example"
            let button = document.createElement('button')
            button.innerText = "submit"
            button.id = `btn_${i}`
            div.appendChild(input)
            div.appendChild(button)
            div.className = "hidden"
            array.push(div)
            interface.appendChild(div)
        }
        question.innerText = "Add Education 1. Format - Degree/Certificate/Volunteer, Name of Instituition, and Dates (E.g, 08/2020 - 10/2022)"
        array[0].className = "flex"

        for(let j = 1; j <= n; j++) {
            if(j == n) {
                document.getElementById(`btn_${j}`).addEventListener('click', () => {
                    forInputElements('education ' + j, document.getElementById(`edu_${j}`), q_lang)
                    localStorage.setItem('education ' + j, document.getElementById(`edu_${j}`).value)
                    arrayThatKeepsTrackOfUsersCurrentData.push(`education ${j}: ${document.getElementById(`edu_${j}`).value}`)
                    localStorage.setItem('all_data', JSON.stringify(arrayThatKeepsTrackOfUsersCurrentData))
                    removeItems()
                    interface.appendChild(languages_i)
                    interface.appendChild(div_lang_btns)
                    localStorage.setItem('question', 'languages')
                })
            }
            else {
                document.getElementById(`btn_${j}`).addEventListener('click', () => {
                    forInputElements('education ' + j, document.getElementById(`edu_${j}`), `Add Education ${j+1}. Format - Degree/Diploma/Certificate, Name of Instituition, and Dates (E.g, 08/2020 - 10/2022`)
                    array[j-1].className = "hidden"
                    array[j].className = "flex"
                    localStorage.setItem('education ' + j, document.getElementById(`edu_${j}`).value)
                    arrayThatKeepsTrackOfUsersCurrentData.push(`education ${j}: ${document.getElementById(`edu_${j}`).value}`)
                    localStorage.setItem('all_data', JSON.stringify(arrayThatKeepsTrackOfUsersCurrentData))
                })
            }
        }
    }

    btn1.addEventListener('click', () => {
        num_of_iterations = 1;
        num_of_edus = num_of_iterations;
        localStorage.setItem('num_of_edus', num_of_edus)
        removeItems()
        addEventListenersForLocalBtns(num_of_iterations)
    })
    btn2.addEventListener('click', () => {
        num_of_iterations = 2;
        num_of_edus = num_of_iterations;
        localStorage.setItem('num_of_edus', num_of_edus)
        removeItems()
        addEventListenersForLocalBtns(num_of_iterations)
    })
    btn3.addEventListener('click', () => {
        num_of_iterations = 3;
        num_of_edus = num_of_iterations;
        localStorage.setItem('num_of_edus', num_of_edus)
        removeItems()
        addEventListenersForLocalBtns(num_of_iterations)
    })
}

/*Question 10 or Up Variables*/
const q_lang = "What languages do you speak. Seperate each language with a comma (,)"
const div_lang_btns = document.createElement('div')
const languages_i = document.createElement('input')
const languages_submit = document.createElement('button')
const lang_skip = document.createElement('button')
lang_skip.innerText = "skip"
languages_submit.innerText = "submit"
div_lang_btns.appendChild(languages_submit)
div_lang_btns.appendChild(lang_skip)

/*Question 11 or Up Variables*/
const q_contact_info = "Enter Your Phone Number, Email Address and Mailing Address. Seperate each response with a comma. (,)"
const contactInfo_i = document.createElement('input')
const contactInfo_submit = document.createElement('button')
contactInfo_submit.innerText = "submit"

/*Question 12 or Up Variables*/
const q_url = "Enter a url for your portfolio (linkedin, local computer)"
const div_url_btns = document.createElement('div')
const url_input = document.createElement('input')
const url_submit = document.createElement('button')
url_submit.innerText = "submit"
const url_skip = document.createElement('button')
url_skip.innerText = "skip"
url_input.placeholder = "Insert a url to show off your projects..."
div_url_btns.appendChild(url_submit)
div_url_btns.appendChild(url_skip)

/*Final Inquiry*/
const q_final = "Click the Submit Button to See the Result"
const final_submit = document.createElement('button')
final_submit.innerText = "SUBMIT"
const final_text = document.createElement('h1')
final_text.innerText = "Congrats for Finishing"

/*Sub elements that will be appended to the #data element*/
const dataChilds = [];

/*All Target Elements*/
let summary = document.querySelector('.summary')
let skill_1 = document.querySelector('.skill_1')
let skill_2 = document.querySelector('.skill_2')
let skill_3 = document.querySelector('.skill_3')
let skill_4 = document.querySelector('.skill_4')
let skill_5 = document.querySelector('.skill_5')


/*The Variable Names of All the Elements stored inside of an array*/
/*FIX FIX FIX FIX FIX FIX */
const allElements = {'1': submit_1, '2': submit_2, 
    '3': submit_3, '4': submit_4, '5': submit_5, '6': submit_6, 
    '7': submit_7, '8': div_lang_btns,
    '9': contactInfo_submit, '10': div_url_btns, '11': final_submit
}
const allInputs = {
    '1': input, '2': summary_i, '3': skill_1_i, 
    '4': skill_2_i, '5': skill_3_i, '6': skill_4_i, '7': skill_5_i, 
    '8': languages_i, '9': contactInfo_i, '10': url_input, '11': final_text
}
/*FIX FIX FIX FIX FIX FIX*/


/*A reusable function for all elements*/
function forInputElements(name, input, changed_question){
    let span = document.createElement('span')
    span.innerText = `${name}: ${input.value}`
    data.appendChild(span)
    question.innerText = changed_question
}

/*Removes All The Items that Are Stored Inside the Interface Div*/
function removeItems() {
    document.querySelectorAll('.interface *').forEach(el => el.parentNode.removeChild(el))
}

function removeText() {
    document.querySelectorAll('#data *').forEach(el => el.parentNode.removeChild(el))
}

function forWorkExperiences(num_of_exes){
    for(let i = 1; i <= num_of_exes; i++) {
        let div = document.createElement('div')
        let loc_date_pos = localStorage.getItem('experience ' + i).split(';')
        let details = localStorage.getItem('achievement ' + i).split(',')
        div.className = "_container"
        let div_2 = document.createElement('div')
        let p_1 = document.createElement('p')
        p_1.innerText = loc_date_pos[0]
        p_1.className = "no-spacing"
        let p_2 = document.createElement('p')
        p_2.innerText = loc_date_pos[1]
        p_2.className = "no-spacing"
        div_2.appendChild(p_1)
        div_2.appendChild(p_2)
        div_2.className = "ex"
        div.appendChild(div_2)
        let em = document.createElement('em')
        em.innerText = loc_date_pos[2]
        let p_3 = document.createElement('p')
        p_3.appendChild(em)
        p_3.className = "position-text"
        div.appendChild(p_3)
        let unorderedList = document.createElement('ul')
        for(let j = 0; j < details.length; j++) {
            let list_item = document.createElement('li')
            list_item.className = "list-item"
            list_item.innerText = details[j]
            unorderedList.appendChild(list_item)
        }
        div.appendChild(unorderedList)
        document.querySelector('.experience').appendChild(div)
    }
}

function forEducation() {
    for(let i = 1; i <= parseInt(localStorage.getItem('num_of_edus')); i++) {
        let div = document.createElement('div')
        div.className = "edu"
        let strong = document.createElement('strong')
        let p = document.createElement('p')
        let em = document.createElement('em')
        em.className = "_date"
        let textArr = localStorage.getItem('education ' + i).split(',')
        strong.innerText = textArr[0]
        p.innerText = textArr[1]
        em.innerText = textArr[2]
        div.appendChild(strong)
        div.appendChild(p)
        div.appendChild(em)
        document.querySelector('.education').appendChild(div)
    }
}
/*Change Name Later*/
function defineElements(num_of_exes) {
    num_of_exes = parseInt(num_of_exes)
    document.querySelector('.name').innerHTML = localStorage.getItem('name')
    summary.innerText = localStorage.getItem('summary')
    skill_1.innerText = localStorage.getItem('skill_1')
    skill_2.innerText = localStorage.getItem('skill_2')
    skill_3.innerText = localStorage.getItem('skill_3')
    skill_4.innerText = localStorage.getItem('skill_4')
    skill_5.innerText = localStorage.getItem('skill_5')
    forWorkExperiences(num_of_exes)
    forEducation()

    if(localStorage.getItem('skipped_languages') == 'true') {
        document.querySelector('.languages').className = "hidden"
    } else {
        const language_text = localStorage.getItem('languages')
        document.querySelector('.language').innerText = language_text
    }

    if(localStorage.getItem('skipped_url') != 'true') {
        let url_link = document.createElement('a')
        url_link.target = "_blank"
        url_link.className = "portfolio_url"
        url_link.href = localStorage.getItem('url')
        url_link.innerText = localStorage.getItem('url')
        document.getElementById('c_i_4').innerText = "Portfolio: "
        document.getElementById('c_i_4').appendChild(url_link)
    } 

    const contact_infos = localStorage.getItem('contact-info').split(',')
    document.getElementById('c_i_1').innerText = `| Phone Number: ${contact_infos[0]} |`
    document.getElementById('c_i_2').innerText = `Email: ${contact_infos[1]} |`
    document.getElementById('c_i_3').innerText = `Address: ${contact_infos[2]}`

}

/*Same for this one. Change Name Later*/
function displayElements() {
    document.getElementById('navbar').style.display = "flex"
    document.getElementById('main-content').style.display = "flex"
    document.getElementById('canvas').style.display = "none"
    document.getElementById('data').style.display = "none"
}

if(localStorage.getItem('finished') === null) {
    restart_local.addEventListener('click', () => {
        localStorage.clear()
    })

    /*Defines or Keeps Track of the State of the About Me Page*/
    if(localStorage.getItem('question') !== null) {
        if(localStorage.getItem('all_data') !== null) {
            arrayThatKeepsTrackOfUsersCurrentData = JSON.parse(localStorage.getItem('all_data'))
        }

        removeItems()
        if(localStorage.getItem('question') == 'work_experience') {
            //write some code here or create and call a function
            arrayThatKeepsTrackOfUsersCurrentData = arrayThatKeepsTrackOfUsersCurrentData.slice(0, 7)
            question.innerText = q_num_exe
            let init_input = document.createElement('input')
            init_input.placeholder = "Enter a number..."
            let init_submit = document.createElement('button')
            init_submit.innerText = "submit"
            init_input.className = "shorter-input"
            interface.appendChild(init_input)
            interface.appendChild(init_submit)
            init_submit.addEventListener('click', () => {
                if(isNaN(parseInt(init_input.value)) == false && parseInt(init_input.value) > 0) {
                    num_of_exes = init_input.value
                    localStorage.setItem('num_of_exes', num_of_exes)
                    workExperience(num_of_exes)
                }
            })
        }
        else if(localStorage.getItem('question') == 'education') {
            //write some code here or create and call a function
            arrayThatKeepsTrackOfUsersCurrentData = arrayThatKeepsTrackOfUsersCurrentData.slice(0, 7 + (parseInt(localStorage.getItem('num_of_exes')) *2) + 1)
            question.innerText = q_txt_edu
            education()
        } else if(localStorage.getItem('question') == 'languages') {
            question.innerText = q_lang
            interface.appendChild(languages_i)
            interface.appendChild(div_lang_btns)
        } else if(localStorage.getItem('question') == "skipped_languages") {
            question.innerText = q_contact_info
            interface.appendChild(contactInfo_i)        
            interface.appendChild(contactInfo_submit)
        }  
        else {
            let arr = JSON.parse(localStorage.getItem('question'))
            question.innerText = arr[2]
            if(allInputs.hasOwnProperty(arr[3])) {
                interface.appendChild(allInputs[arr[3]])
                interface.appendChild(allElements[arr[3]])
            } 
        }
        for(let i = 0; i < arrayThatKeepsTrackOfUsersCurrentData.length; i++) {
            let span = document.createElement('span')
            span.innerText = arrayThatKeepsTrackOfUsersCurrentData[i]
            data.appendChild(span)
        }
        
    }
    
    /*All the Add Event Listeners*/
    submit_1.addEventListener('click', () => {
        if(input.value.length > 0) {
            localStorage.setItem('name', input.value)
            userName = localStorage.getItem('name')
            forInputElements('name', input, q2_text)
            arrayThatKeepsTrackOfUsersCurrentData.push(`name: ${input.value}`)
            localStorage.setItem('all_data', JSON.stringify(arrayThatKeepsTrackOfUsersCurrentData))
            removeItems()
            interface.appendChild(summary_i)
            interface.appendChild(submit_2)
            localStorage.setItem('question', JSON.stringify(['name', input.outerHTML, q2_text, '2']))
        }
    })

    submit_2.addEventListener('click', () => {
        if(summary_i.value.length > 0) {
            localStorage.setItem('summary', summary_i.value)
            forInputElements('summary', summary_i, q3_text)
            arrayThatKeepsTrackOfUsersCurrentData.push(`summary: ${summary_i.value}`)
            localStorage.setItem('all_data', JSON.stringify(arrayThatKeepsTrackOfUsersCurrentData))
            removeItems()
            interface.appendChild(skill_1_i)
            interface.appendChild(submit_3)
            localStorage.setItem('question', JSON.stringify(['summary', summary_i.outerHTML, q3_text, '3']))
        }
    })

    submit_3.addEventListener('click', () => {
        if(skill_1_i.value.length > 0) {
            localStorage.setItem('skill_1', skill_1_i.value)
            forInputElements('skill 1', skill_1_i, q4_text)
            arrayThatKeepsTrackOfUsersCurrentData.push(`skill 1: ${skill_1_i.value}`)
            localStorage.setItem('all_data', JSON.stringify(arrayThatKeepsTrackOfUsersCurrentData))
            removeItems()
            interface.appendChild(skill_2_i)
            interface.appendChild(submit_4)
            localStorage.setItem('question', JSON.stringify(['skill 1', skill_1_i.outerHTML, q4_text, '4']))
        }
    })

    submit_4.addEventListener('click', () => {
        if(skill_2_i.value.length > 0) {
            localStorage.setItem('skill_2', skill_2_i.value)
            forInputElements('skill 2', skill_2_i, q5_text)
            arrayThatKeepsTrackOfUsersCurrentData.push(`skill 2: ${skill_2_i.value}`)
            localStorage.setItem('all_data', JSON.stringify(arrayThatKeepsTrackOfUsersCurrentData))
            removeItems()
            interface.appendChild(skill_3_i)
            interface.appendChild(submit_5)
            localStorage.setItem('question', JSON.stringify(['skill 2', skill_2_i.outerHTML, q5_text, '5']))
        }
    })

    submit_5.addEventListener('click', () => {
        if(skill_3_i.value.length > 0) {
            localStorage.setItem('skill_3', skill_3_i.value)
            forInputElements('skill 3', skill_3_i, q6_text)
            arrayThatKeepsTrackOfUsersCurrentData.push(`skill 3: ${skill_3_i.value}`)
            localStorage.setItem('all_data', JSON.stringify(arrayThatKeepsTrackOfUsersCurrentData))
            removeItems()
            interface.appendChild(skill_4_i)
            interface.appendChild(submit_6)
            localStorage.setItem('question', JSON.stringify(['skill 3', skill_3_i.outerHTML, q6_text, '6']))
        }
    })

    submit_6.addEventListener('click', () => {
        if(skill_4_i.value.length > 0) {
            localStorage.setItem('skill_4', skill_4_i.value)
            forInputElements('skill 4', skill_4_i, q7_text)
            arrayThatKeepsTrackOfUsersCurrentData.push(`skill 4: ${skill_4_i.value}`)
            localStorage.setItem('all_data', JSON.stringify(arrayThatKeepsTrackOfUsersCurrentData))
            removeItems()
            interface.appendChild(skill_5_i)
            interface.appendChild(submit_7)
            localStorage.setItem('question', JSON.stringify(['skill 4', skill_4_i.outerHTML, q7_text, '7']))
        }
    })

    submit_7.addEventListener('click', () => {
        if(skill_5_i.value.length > 0) {
            localStorage.setItem('skill_5', skill_5_i.value)
            forInputElements('skill 5', skill_5_i, q_num_exe)
            arrayThatKeepsTrackOfUsersCurrentData.push(`skill 5: ${skill_5_i.value}`)
            localStorage.setItem('all_data', JSON.stringify(arrayThatKeepsTrackOfUsersCurrentData))
            removeItems()
            localStorage.setItem('question', 'work_experience')
            question.innerText = q_num_exe
            let init_input = document.createElement('input')
            init_input.placeholder = "Enter a number..."
            let init_submit = document.createElement('button')
            init_submit.innerText = "submit"
            init_input.className = "shorter-input"
            interface.appendChild(init_input)
            interface.appendChild(init_submit)
            init_submit.addEventListener('click', () => {
                if(isNaN(parseInt(init_input.value)) == false && parseInt(init_input.value) > 0) {
                    num_of_exes = init_input.value
                    localStorage.setItem('num_of_exes', num_of_exes)
                    workExperience(num_of_exes)
                }
            })
        }
    })

    /*Refer back to this once you have completed the function*/
    languages_submit.addEventListener('click', () => {
        if(languages_i.value.length > 0) {
            localStorage.setItem('languages', languages_i.value)
            forInputElements('languages', languages_i, q_contact_info)
            removeItems()
            interface.appendChild(contactInfo_i)
            interface.appendChild(contactInfo_submit)
            localStorage.setItem('question', JSON.stringify(['languages', languages_i.outerHTML, q_contact_info, '9']))
            arrayThatKeepsTrackOfUsersCurrentData.push(`languages: ${languages_i.value}`)
            localStorage.setItem('all_data', JSON.stringify(arrayThatKeepsTrackOfUsersCurrentData))
        }
    })

    lang_skip.addEventListener('click', () => {
        removeItems()
        localStorage.setItem('question', 'skipped_languages')
        localStorage.setItem('skipped_languages', 'true')
        question.innerText = q_contact_info
        interface.appendChild(contactInfo_i)        
        interface.appendChild(contactInfo_submit)
    })
    
    contactInfo_submit.addEventListener('click', () => {
        if(contactInfo_i.value.length > 0) {
            localStorage.setItem('contact-info', contactInfo_i.value)
            forInputElements('contact-info', contactInfo_i, q_url)
            removeItems()
            interface.appendChild(url_input)
            interface.appendChild(div_url_btns)
            localStorage.setItem('question', JSON.stringify(['contact info', contactInfo_i.outerHTML, q_url, '10']))
            arrayThatKeepsTrackOfUsersCurrentData.push(`contact-info: ${contactInfo_i.value}`)
            localStorage.setItem('all_data', JSON.stringify(arrayThatKeepsTrackOfUsersCurrentData))
        }
    })

    url_submit.addEventListener('click', () => {
        if(url_input.value.length > 0) {
            localStorage.setItem('url', url_input.value)
            forInputElements('url', url_input, q_final)
            removeItems()
            interface.appendChild(final_text)
            interface.appendChild(final_submit)
            localStorage.setItem('skipped_url', 'false')
            localStorage.setItem('question', JSON.stringifiy(['url', url_input.outerHTML, q_final, '11']))
            arrayThatKeepsTrackOfUsersCurrentData.push(`url: ${url_input.value}`)
            localStorage.setItem('all_data', JSON.stringify(arrayThatKeepsTrackOfUsersCurrentData))
        }
    })

    url_skip.addEventListener('click', () => {
        removeItems()
        localStorage.setItem('skipped_url', 'true')
        question.innerText = q_final
        interface.appendChild(final_submit)        
        interface.appendChild(final_text)

    })
    final_submit.addEventListener('click', () => {
        defineElements(localStorage.getItem('num_of_exes'))
        displayElements()
        localStorage.setItem('finished', true)
        localStorage.setItem('finalized', false)
        document.body.appendChild(restart_local)
        restart_local.innerText = "Restart Program"
        restart_local.addEventListener('click', () => {
        localStorage.clear()
    })
        document.body.addEventListener('keyup', event => {
            if(localStorage.getItem('finalized') === 'false') {
                document.getElementById('navbar').style.display = "none"
                document.querySelector('.right-side').style.display = "none"
                document.body.removeChild(restart_local)
                localStorage.setItem('finalized', true)
            } else {
                document.getElementById('navbar').style.display = "flex"
                document.querySelector('.right-side').style.display = "flex"
                document.body.appendChild(restart_local)
                localStorage.setItem('finalized', false)
            }
        })
    })
} else {
    defineElements(localStorage.getItem('num_of_exes'))
    displayElements()
    localStorage.setItem('finalized', false)
    document.body.appendChild(restart_local)
    restart_local.innerText = "Restart Program"
    restart_local.addEventListener('click', () => {
        localStorage.clear()
    })
    document.body.addEventListener('keyup', event => {
        if(localStorage.getItem('finalized') === 'false') {
            document.getElementById('navbar').style.display = "none"
            document.querySelector('.right-side').style.display = "none"
            document.body.removeChild(restart_local)
            localStorage.setItem('finalized', true)
        } else {
            document.getElementById('navbar').style.display = "flex"
            document.querySelector('.right-side').style.display = "flex"
            document.body.appendChild(restart_local)
            localStorage.setItem('finalized', false)
        }
    })
}