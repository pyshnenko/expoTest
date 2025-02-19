import React, { useEffect, useState, useRef } from 'react';
import { Box, Text, TextInput, Button } from "@react-native-material/core";
import Api from '@/components/mech/api';
import { useUserAuth } from '@/hooks/useUserAuth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import storage from '@/components/mech/storage';

export default function Login () {

    const [error, setError] = useState<{email:boolean, pass: boolean, text: string}>({email: false, pass: false, text: ''});
    const [open, setOpen] = useState<boolean>(false);
    const [email, setEmail] = useState<string>('');
    const [pass, setPass] = useState<string>('');
    const [emailresetMessage, setEmailResetMessage] = useState<{visible: boolean, text: string}>({visible: false, text: ''});

    const textStyle = {
        margin: 1, 
        width: 250,
        zIndex:20, 
        backgroundColor: 'white',
        boxShadow: '0 0 30px 10px white'
    }

    const handleSubmit = async (demoMode: boolean = false) => {
        //event.preventDefault();
        console.log('start');
        const emailS: string = (demoMode ? 'demo' : email);
        const password: string = (demoMode ? 'demodemo' : pass);
        if ((emailS==='')||(password==='')) setError({email: true, pass: true, text: 'Заполни поля'})
        else {
            setError({email: false, pass: false, text: ''})
            Api.login({pass: password, email: emailS.includes('@') ? emailS: undefined, login: emailS.includes('@') ? undefined: emailS})
            .then(async (res)=> {
                console.log(`\n${res.status}\n`);
                console.log(res.data.login);
                console.log(res.data.token);
                console.log(res.data.atoken);
                await storage.set('cloudToken', String(res.data.token));
                await storage.set('cloudAToken', res.data.atoken);
                console.log('token add');
                console.log(await storage.get('cloudToken'));
                //setError({email: true, pass: true, text: 'Неверные данные'});
                //setOpen(false);
                useUserAuth(true);
            })
            .catch((e)=>{
                console.log(e.response.status);
                setError({email: true, pass: true, text: 'Неверные данные'});
            });
        }
    }
    /*style={{    
        position: 'absolute',
        top: '50vh',
        left: '50vw',
        width: '10px',
        height: '10px',
        backgroundColor: 'burlywood',
        boxShadow: `-10px 0 250px 300px burlywood`,
        borderRadius: '100px',
        zIndex: 1
    }}*/
    return (
        <Box>
            <Box style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                width: 10,
                height: 10,
                backgroundColor: 'burlywood',
                boxShadow: `-10px 0 150px 250px burlywood`,
                borderRadius: '100px',
                zIndex: 1
            }} />
            {emailresetMessage.visible ? <Text>{emailresetMessage.text}</Text>:
            <Box style={{
                width: '100%', 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                height: '90%', 
                justifyContent: 'center', 
                zIndex: 10
            }}>
                {error&&<Text color="error" style={{padding: 1, zIndex: 20}}>{error.text}</Text>}
                <TextInput color={error.email?'red':'black'} style={textStyle} id="loginBox" label="Логин/email" variant="outlined" onChange={({target}: any)=>{setEmail(target.value)}} />
                <TextInput color={error.email?'red':'black'} style={textStyle} label="Пароль" variant="outlined" onChange={({target}: any)=>{setPass(target.value)}} />
                <Box style={{zIndex: 20}}>
                    <Button title='Вход' style={{margin: 8, boxShadow: '0 0 30px 10px white'}} variant="contained" onPress={()=>handleSubmit()} />
                </Box>
                <Button 
                style={{margin: 4, boxShadow: '0 0 30px 10px white', zIndex: 1, width: 228}} 
                variant="contained" 
                color="secondary"
                title='Демонстрационный режим'
                onPress={()=>{
                    handleSubmit(true)
                }}
                />
            </Box>}
        </Box>
    )
}