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

export {
    hashBcr
}