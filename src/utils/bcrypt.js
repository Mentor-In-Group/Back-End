import bcrypt from "bcrypt";
const saltRound = 10;

const encrypt = (password) => {
    return bcrypt.hashSync(password, saltRound);
};

const compare = (password, hash) => {
    return bcrypt.compareSync(password, hash);
};

export { encrypt, compare };