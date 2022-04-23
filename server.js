const express = require("express")
const morgan = require("morgan")
const mongoose = require("mongoose")
const dotenv = require("dotenv").config()
const blogRoutes =  require("./routes/blogRouter")
const registerAndLogin =  require("./routes/loginAndRegisterRouter")
const PORT = process.env.DB_SERVER_PORT || 5000


const app = express()

mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true })
.then(result => app.listen(PORT, () => console.log(`connected DB on port ${PORT}`)))
.catch(err => console.log(err))

app.set("view engine", "ejs")

app.use(express.static("public"))
app.use(express.urlencoded({ extended: true }))
app.use(morgan("dev"))

// app.get("/", (req, res) => {
//     // res.sendFile("./views/index.html", {root: __dirname})
//    res.redirect("/blogs")
// })

app.get("/about", (req, res) => {
    // res.sendFile("./views/about.html", {root: __dirname})
    res.render("blogs/about", { title: "About" })
})


app.get('/about-us', (req, res) => {
   res.redirect("/about", { title: "About Us" })
})

app.use("/blogs", blogRoutes)
app.use("/info", registerAndLogin)



//404 page
app.use((req, res) => {
    // res.status(404).sendFile("./views/error404.html", {root: __dirname})
    res.status(404).render("error404")
})




