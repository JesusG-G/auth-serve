const {response }= require('express');
const Usuario=require('../models/Usuario');
const bcrypt =require('bcryptjs');
const crearUsuario= async(req,res=response)=>{
    

    const {email, name, password}=req.body;

    try {
        //Verificar si no existe un correo igual
        const usuario= await Usuario.findOne({email});
        if(usuario){
            return res.status(400).json({
                ok:false,
                msg:'El usuario ya existe con ese email'
            });
        }
        //Crear usuario con el modelo
        const dbUser= Usuario(req.body);
        //Encriptar contraseña
        const salt=bcrypt.genSaltSync();
        dbUser.password=bcrypt.hashSync(password,salt);
        //Generar el JWT

        //Crear usuario DB
        await dbUser.save();
        //Generar respuesta exitosa
        return res.status(201).json({
            ok:true,
            uid: dbUser.id,
            name

        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok:true,
            msg:'Por favor hable con el admin'
        })
    }
    
   
};
const loginUsuario=(req,res=response)=>{

    const {email, password}=req.body;

    return res.json({
        ok:true,
        msg:'login de usuario'
    })
};

const revalidarToken=((req,res=response)=>{
    return res.json({
        ok:true,
        msg:'Renew'
    })
})

module.exports={
    crearUsuario,
    loginUsuario,
    revalidarToken
}