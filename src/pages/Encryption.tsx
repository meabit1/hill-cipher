import '../App.css'
import { ChangeEvent, FormEvent, useState, } from "react";
import { hillCipherEncrypt } from '../utils/hillCipher';

export default function Encryption() {
    const [textFile, setTextFile] = useState('');
    const [cipherText, setCipherText] = useState('');
    const
        [key, setKey] = useState<string[]>(Array(4).fill(''));

    const openFile = (event: ChangeEvent<HTMLInputElement>) => {
        const input = event.target!;

        const reader = new FileReader();
        reader.onload = function () {
            const text = reader.result;
            setTextFile(text as string);
        };
        const files = input.files!;
        reader.readAsText(files[0]);
    };
    const handleOnChange = (e: ChangeEvent<HTMLInputElement>, idx: number) => {
        const regex = /^\d+$/;
        if (!regex.test(e.target.value) && e.target.value.length != 0) return;
        setKey(prev => {
            const newKey = Array.from(prev);
            newKey[idx] = e.target.value;
            return newKey;
        });
    }
    const handleOnEncrypt = (e: FormEvent) => {
        e.preventDefault();
        if (textFile.length === 0) {
            alert('Please select a file')
            setCipherText('');
            return;
        }
        else if (key.includes('')) {
            alert('Please fill the key matrix');
            setCipherText('');
            return;
        }
        try {
            const cipher = hillCipherEncrypt(textFile, key.map(value => parseInt(value)));
            setCipherText(cipher);
        }
        catch (e) {
            alert(e);
        }

    }
    return (
        <div className=''>
            <div className='text-xl font-bold'>Encryption</div>
            <input type="file" onChange={openFile}></input>
            {textFile && <div>
                <h1 className='text-xl font-bold'>Plain Text</h1>
                <p>{textFile}</p>
            </div>}
            <h2 className='text-xl font-bold'>Key Matrix</h2>
            <div className="row">
                <div className='key-matrix'>
                    {
                        key.map((value, i) => <input className='w-14 h-14 border m-1 border-gray-400' key={i} value={value.toString()} type='text' onChange={(e) => handleOnChange(e, i)} ></input>)
                    }
                </div>
                <button className='bg-blue-500 text-white  rounded-md p-4  ml-4 ' onClick={handleOnEncrypt}>Encrypt</button>
            </div>


            {cipherText && <div>
                <h1 className='text-xl font-bold'>Cipher Text</h1>
                <p>{cipherText}</p>
            </div>}

        </div >

    );
}
