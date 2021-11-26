const express = require('express');
const router = express.Router();

const Paciente = require('../models/paciente')

router.get('/', async (req, res) => {
    
    try {
        
        const arrayPacientesDB = await Paciente.find()
        console.log(arrayPacientesDB)

        res.render("pacientes", {
            arrayPacientesDB: arrayPacientesDB
        })

    } catch (error) {
        console.log(error)
    }

    
})

router.get('/crear', (req, res) => {
    res.render('crear')
})

router.post('/', async(req, res)=>{
    const body = req.body
    try {
        await Paciente.create(body)
        res.redirect('/pacientes')

    } catch (error) {
        console.log(error)
    }
})

router.get('/:id', async(req,res)=>{

    const id = req.params.id

    try {
        const pacienteDB = await Paciente.findOne({_id: id})
        console.log(pacienteDB)

        res.render('detalle', {
            paciente: pacienteDB,
            error: false
        })
    } catch (error) {
        console.log(error)

        res.render('detalle', {
            error: true,
            mensaje: 'No se encuetra el id seleccionado'
        })
    }
})

router.delete('/:id', async(req, res)=>{
    const id = req.params.id

    try {
        const pacienteDB = await Paciente.findByIdAndDelete({_id:id})

        if(pacienteDB){
            res.json({
                estado:true,
                mensaje:'Eliminado'
            })
        }else{
            res.json({
                estado:false,
                mensaje:'No se pudo eliminar'
            })
        }


    } catch (error) {
        console.log(error)
    }
})

router.put('/:id', async(req, res)=>{
    const id = req.params.id
    const body = req.body

    try {
        
        const pacienteDB = await Paciente.findByIdAndUpdate(id, body, { useFindAndModify: false})
        console.log(pacienteDB)

        res.json({
            estado: true,
            mensaje: 'Editado'
        })
    } catch (error) {
        console.log(error)

        res.json({
            estado: false,
            mensaje: 'Fallo'
        })
    }
})

module.exports = router;