class Person extends HTMLElement{
    name;
    lastName;
    semester;
    constructor(name, lastName, semester){
        super();
        this.name = name;
        this.lastName = lastName;
        this.semester = semester;
        this.innerHTML = 
        `
            <div style: "display: flex; flex-direction: column;">
                <span>${this.name}</span>
                <span>${this.lastName}</span>
                <span>${this.semester}</span>
            </div>
        `;
    }
}

customElements.define('custom-person', Person);

document.addEventListener('DOMContentLoaded', async () => {
    const rescueData = async () => {
        return await fetch('/api');
    }
    
    const res = await rescueData();
    const data = await res.json();
    const persons = data.persons;
    persons.map(person => {
        const personHTML = new Person(person.name, person.last_name, person.semester);
        document.body.appendChild(personHTML);
    })    
});

