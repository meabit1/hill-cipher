const substitutionList = [
    '\x00', '\x01', '\x02', '\x03', '\x04', '\x05', '\x06', '\x07', '\x08', '\x09', '\x0A', '\x0B', '\x0C', '\x0D', '\x0E', '\x0F',
    '\x10', '\x11', '\x12', '\x13', '\x14', '\x15', '\x16', '\x17', '\x18', '\x19', '\x1A', '\x1B', '\x1C', '\x1D', '\x1E', '\x1F',
    ' ', '!', '"', '#', '$', '%', '&', "'", '(', ')', '*', '+', ',', '-', '.', '/',
    '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', ':', ';', '<', '=', '>', '?',
    '@', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O',
    'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '[', '\\', ']', '^', '_',
    '`', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o',
    'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '{', '|', '}', '~', '\x7F',
    '\x80', '\x81', '\x82', '\x83', '\x84', '\x85', '\x86', '\x87', '\x88', '\x89', '\x8A', '\x8B', '\x8C', '\x8D', '\x8E', '\x8F',
    '\x90', '\x91', '\x92', '\x93', '\x94', '\x95', '\x96', '\x97', '\x98', '\x99', '\x9A', '\x9B', '\x9C', '\x9D', '\x9E', '\x9F',
    '\xA0', '\xA1', '\xA2', '\xA3', '\xA4', '\xA5', '\xA6', '\xA7', '\xA8', '\xA9', '\xAA', '\xAB', '\xAC', '\xAD', '\xAE', '\xAF',
    '\xB0', '\xB1', '\xB2', '\xB3', '\xB4', '\xB5', '\xB6', '\xB7', '\xB8', '\xB9', '\xBA', '\xBB', '\xBC', '\xBD', '\xBE', '\xBF',
    '\xC0', '\xC1', '\xC2', '\xC3', '\xC4', '\xC5', '\xC6', '\xC7', '\xC8', '\xC9', '\xCA', '\xCB', '\xCC', '\xCD', '\xCE', '\xCF',
    '\xD0', '\xD1', '\xD2', '\xD3', '\xD4', '\xD5', '\xD6', '\xD7', '\xD8', '\xD9', '\xDA', '\xDB', '\xDC', '\xDD', '\xDE', '\xDF',
    '\xE0', '\xE1', '\xE2', '\xE3', '\xE4', '\xE5', '\xE6', '\xE7', '\xE8', '\xE9', '\xEA', '\xEB', '\xEC', '\xED', '\xEE', '\xEF',
    '\xF0', '\xF1', '\xF2', '\xF3', '\xF4', '\xF5', '\xF6', '\xF7', '\xF8', '\xF9', '\xFA', '\xFB', '\xFC', '\xFD', '\xFE', '\xFF'
];

function mod(a: number, modulo: number) {
    if (a > 0) return a % modulo;
    while (a < 0) {
        a += modulo;
    }
    return a % modulo;
}


function detTwo(matrix: number[], modulo: number) {
    return mod(matrix[0] * matrix[3] - matrix[1] * matrix[2], modulo);
}

function inveseModulo(a: number, modulo: number): number {
    for (let i = 1; i < modulo; i++) {
        if (mod(a * i, modulo) == 1) return i;
    }
    return -1;
}
function inverseMatrix(matrix: number[], modulo: number): number[] {
    const det = detTwo(matrix, modulo);
    const inverseModulo = inveseModulo(mod(det, modulo), modulo);
    if (inverseModulo == -1) {
        console.log("inverse modulo is negative");
        return [-1, -1, -1, -1];
    }
    const inversedMatrix = [
        mod(matrix[3] * inverseModulo, modulo),
        mod(-matrix[1] * inverseModulo, modulo),
        mod(-matrix[2] * inverseModulo, modulo),
        mod(matrix[0] * inverseModulo, modulo)
    ]
    return inversedMatrix;

}


function gcd(a: number, b: number): number {
    while (a < 0) {
        a += b;
    }
    for (let i = Math.min(a, b); i > 0; i--) {
        if (a % i == 0 && b % i == 0) return i;
    }
    return 1;
}


function hillCipherEncrypt(plainText: string, keyMatrix: number[]): string {
    if (detTwo(keyMatrix, 256) == 0) throw "Key matrix cannot be used (det(key) = 0)";
    if (gcd(detTwo(keyMatrix, 256), 256) != 1) throw "Key matrix cannot be used (gcd(det(key),256) =/= 1)";
    if (plainText.length % 2 == 1) plainText += "z";
    const plainList = plainText.split('').map(c => substitutionList.indexOf(c));
    for (let i = 0; i < plainList.length; i += 2) {
        const first = plainList[i];
        const second = plainList[i + 1];
        const firstRow = keyMatrix[0] * first + keyMatrix[1] * second;
        const secondRow = keyMatrix[2] * first + keyMatrix[3] * second;
        plainList[i] = mod(firstRow, 256);
        plainList[i + 1] = mod(secondRow, 256);
    }

    return plainList.map(e => substitutionList[e]).join('');
}

function hillCipherDecrypt(cipherText: string, keyMatrix: number[]): string {
    const cipherList = cipherText.split('').map(c => substitutionList.indexOf(c));
    if (detTwo(keyMatrix, 256) == 0) throw "Key matrix cannot be used";
    const inverseKeyMatrix = inverseMatrix(keyMatrix, 256);
    for (let i = 0; i < cipherList.length; i += 2) {
        const first = cipherList[i];
        const second = cipherList[i + 1];
        const firstRow = inverseKeyMatrix[0] * first + inverseKeyMatrix[1] * second;
        const secondRow = inverseKeyMatrix[2] * first + inverseKeyMatrix[3] * second;
        cipherList[i] = mod(firstRow, 256);
        cipherList[i + 1] = mod(secondRow, 256);
    }
    return cipherList.map(e => substitutionList[e]).join('');
}

export { hillCipherEncrypt, hillCipherDecrypt }

