import * as bcrypt from 'bcrypt';

const hashBcr = {
    hashing: (plainText: string) => {
        return bcrypt.hashSync(plainText, 10);
    },
    compare: (plainText: string, hash: string) => {
        return bcrypt.compareSync(plainText, hash);
    }
}
const token = {
    genToken: () => {

    }
}
const replacements = (template: string, charReplace: string, valuesReplace: string[]) => {
    let getTemplate = template;
    valuesReplace.forEach(value => {
        getTemplate = getTemplate.replace(charReplace, value);
    });
    return getTemplate;
}
const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};
export {
    hashBcr,
    replacements,
    generateOTP
}