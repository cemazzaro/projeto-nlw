const app = document.getElementById("app")
const users = [
    {
        email: 'test@test.com',
        phone: '123456789',
        ref: 100,
        refBy: null
    },
    {
        email: 'tust@tust.com',
        phone: '987654321',
        ref: 200,
        refBy: 100
    }
]

const getUser = (userData) => {
    return users.find((user) => {
        return user.email == userData.email
    })
}

const getTotalSubscribers = (userData) => {
    const subs = users.filter((user) => {
        return user.refBy == userData.ref
    })
    return subs.length

}

const showInvite = (userData) => {
    app.innerHTML = `
        <main>
            <h3>Inscrições Confirmadas</h3>
            <p>Convide mais pessoas e concorra a prêmios! <br>
                Compartilhe o link e acompanhe as inscrições:</p>

            <div class="input-group">   
                <label for="link">
                    <img src="link.svg" alt="link icon">
                </label>
                <input type="text" id="link" value="https://evento.com?=${userData.ref}" disabled>
            </div>

            <section class="stats">
                <h4>${getTotalSubscribers(userData)}</h4>
                <p>Inscrições feitas</p>
            </section>
        </main>
    `
    app.setAttribute('class', 'page-invite')
    updateImageLinks()
}

const saveUser = (userData) => {
    const newUser = {
        ...userData,
        ref: Math.round(Math.random() * 4000),
        refBy: 100,
    }
    
    users.push(newUser)
    return newUser

}

const formAction = () => {
    const form = document.getElementById("form")
    form.onsubmit = (event) => {
        event.preventDefault()
        const formData = new FormData(form)
        const userData = {
            email: formData.get('email'),
            phone: formData.get('phone'),
        }

        const user = getUser(userData)
        if(user) {
            showInvite(user)
        } else {
            const newUser = saveUser(userData)
            showInvite(newUser)

        }

    }
}

const updateImageLinks = () => {
    document.querySelectorAll('img').forEach((img) => {
        if(img.src.includes('githubusercontent')) {
            return
        }
        const src =img.getAttribute('src')
        img.src = `https://raw.githubusercontent.com/maykbrito/my-public-files/main/nlw-19/${src}`
    })
}

const startApp = () => {
    const content = `
        <main>
            <section class="about">
                <div class="section-header">
                    <h2>Sobre o evento</h2>
                    <span class="badge">AO VIVO</span>
                </div>
                <p>
                    Um evento feito por e para pessoas desenvolvedoras apaixonadas por criar soluções inovadoras e compartilhar conhecimento. Vamos mergulhar nas tendências masi recentes em desenvolvimento de software, arquitetura de sistemas e tecnologias emergentes, com palestras, workshops e heckathons. <br><br>
                    Dias 15 a 17 de março / Das 18h às 21h / Online & Gratuito
                </p>
            </section>
            <section class="registration">
                <h2>Incrição</h2>
                <form id="form">
                    <div class="input-wrapper">
                        <div class="input-group">
                            <label for="email">
                                <img src="mail.svg" alt="Email icon">
                            </label>
                            <input type="email" name="email" id="email" placeholder="E-mail">
                        </div>
                        <div class="input-wrapper">
                            <div class="input-group">
                                <label for="phone">
                                    <img src="phone.svg" alt="Phone icon">
                                </label>
                                <input type="text" name="phone" id="phone" placeholder="Telefone">
                            </div>
                            <button>
                                Confirmar
                                <img src="arrow.svg" alt="Arrow right">
                            </button>
                    </div>
                </form>
            </section>
        </main>
    
    `
    app.innerHTML = content
    updateImageLinks()
    formAction()
}

document.querySelector('header').onclick = () => startApp()

startApp()
//showInvite(users[0])