import * as yup from 'yup'

const validatedSchema = {
    name:'dawson',
    email:'dawsonreschke@gmail.com',
    password:'12345678',
    tos:true
}

const userFormSchema = yup.object().shape({
    name: yup
        .string()
        .trim()
        .required('Name is a required field')
        .min(2, 'Name must be greater than 1 character'),
    email: yup
        .string()
        .email('Must be a valid email')
        .required('Email is a required field'),
    password: yup
        .string()
        .trim()
        .required('Password is a required field')
        .min(6,'Password must be at least 6 characters long'),
    tos: yup
        .boolean()
        .oneOf([true],'You must agree to the Terms of Service')
        .required()
})


const validate = (form) => {
    let result = {};
    for(const [key,value] of Object.entries(form)){
        try{
            userFormSchema.validateSync({...validatedSchema,[key]:value}); 
        }catch(err){
            result[key] = err.errors[0]; 
        }
    }
    return result; 
  }

export default validate;