
function generarUuid() {
    let uuid = '';
    const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < 26; i++) {
        if (i % 11 === 8) {
            uuid += '-';
        } else {
            const char = characters.charAt(Math.floor(Math.random() * characters.length));
            uuid += char;
        }
    }

    return uuid;
}

module.exports = { generarUuid };