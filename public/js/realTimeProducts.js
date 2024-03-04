const socket = io()

document.getElementById("productInput").addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
        const productName = this.value
        this.value = ""

        const ul = document.getElementById("productList")
        const li = document.createElement("li")
        li.appendChild(document.createTextNode(productName))

        const deleteButton = document.createElement("button")
        deleteButton.className = "deleteButton"
        deleteButton.setAttribute("data-productname", productName)
        deleteButton.appendChild(document.createTextNode("Eliminar"))

        li.appendChild(deleteButton)
        ul.appendChild(li)

        socket.emit("newProduct", productName)
    }
})

document.addEventListener("click", function(event) {
    if (event.target.classList.contains("deleteButton")) {
        const productName = event.target.getAttribute("data-productname")
        event.target.parentNode.remove()

        socket.emit("deleteProduct", productName)
    }
})

socket.on("updateProducts", function(data) {
    const ul = document.getElementById("productList")

    if (data.action === 'add') {
        const li = document.createElement("li");
        li.appendChild(document.createTextNode(data.product.name))

        const deleteButton = document.createElement("button")
        deleteButton.className = "deleteButton"
        deleteButton.setAttribute("data-productname", data.product.name)
        deleteButton.appendChild(document.createTextNode("Eliminar"))

        li.appendChild(deleteButton)
        ul.appendChild(li)
    } else if (data.action === 'delete') {
        const items = ul.getElementsByTagName("li")
        for (let i = 0; i < items.length; i++) {
            const productName = items[i].textContent.trim()
            if (productName === data.productName) {
                items[i].remove()
                break
            }
        }
    }
})