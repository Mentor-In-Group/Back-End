import validator from "validator";
import { isExists, sanitization } from "./sanitization.js";

const dataValid = async (valid, dt) => {
    let pesan = [];
    let dd = [];
    let data = await sanitization(dt);
    const message = await new Promise((resolve, reject) => {
        Object.entries(valid).forEach(async (item) => {
            const [key, value] = item;
            const validate = valid[key].split(",");
            dd = await new Promise((resolve, reject) => {
                let msg = [];
                validate.forEach((v) => {
                    switch (v) {
                        case "required":
                            if (!isExists(data[key])) {
                                msg.push(key + " is required");
                            } else {
                                if (isExists(data[key]) && validator.isEmpty(data[key])) {
                                    msg.push(key + " is required");
                                }
                            }
                            break;
                        case "isEmail":
                            if (isExists(data[key]) && !validator.isEmail(data[key])) {
                                msg.push(key + " is invalid");
                            }
                            break;
                        case "isStrongPassword":
                            if (isExists(data[key]) && !validator.isStrongPassword(data[key])) {
                                msg.push(key +
                                    " harus 8 karakter, berisi 1 uppercase, lowercase, angka dan simbol");
                            }
                            break;
                        default:
                            break;
                    }
                });
                resolve(msg);
            });
            pesan.push(...dd);
        });
        resolve(pesan);
    });
    return { message, data };
};

export { dataValid };
