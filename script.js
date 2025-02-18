const app = document.getElementById("app")

const formAction = () => {
    const form = document.getElementById("form")
    form.onsubmit = (event) => {
        event.preventDefault()
    }
}

const startApp = () => {
    const content = `
    <h2>Inscrição</h2>    
    <form id="form">
            <input type="email" name="email" id="email" placeholder="E-mail"><br>
            <input type="text" name="tel" id="tel" placeholder="Telefone"><br>
            <button>
                Confirmar
            </button>
        </form>
    
    `
    app.innerHTML = content

    formAction()
}

startApp()