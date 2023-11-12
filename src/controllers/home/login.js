import dotenv from 'dotenv';

dotenv.config();
const { USER_ADMIN, PASS_ADMIN } = process.env

const loginGet = (req, res) => {
    res.render('login')
}

const loginPost = (req, res) => {
    const { email, password } = req.body;
    console.log(email, password)
    if (email === USER_ADMIN && password === PASS_ADMIN) {
        res.redirect("/admin");
    }

    else {
        res.json({ msg: "Usuario o contraseña incorrectos" });
    }
}

export {
    loginGet,
    loginPost
}