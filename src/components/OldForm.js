import React from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'

const initialValues = { //initaial value objects
    name: '',
    email: '',
    language: ''
}

const onSubmit = values =>{
    console.log('form data', values)
}

// const validate = values => {
//     // values.name values.email values.language
//     // errors.name error.email error.channel
//     //errors.name = 'This field is required'

    

//     let errors = {}

//         if(!values.name) {
//             errors.name = 'Required'
//         }
//         if(!values.email) {
//             errors.email = 'Required'
//         }else if (
//             !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)){
//                 errors.email = 'Invalid email format'
//             } 

//         if(!values.language) {
//             errors.language = 'Required'
//         }

//     return errors
// }

const validationSchema = Yup.object({
    name : Yup.string().required('Required!'),
    email : Yup.string().email('Invalid email format!').required('Required'),
    language : Yup.string().required('Required!'),

})

function OldForms() {
    const formik = useFormik({
        initialValues,
        onSubmit,
        validationSchema,
        // validate,
    })

    // console.log('form errors', formik.errors)
    console.log('Visited Field', formik.touched)

  return (
    <div>
        <form onSubmit={formik.handleSubmit}>
            <div className='form-control'>
                <label htmlFor='name'>Name</label>
                <input type="text" name="name" id="name" 
                    onChange={formik.handleChange} 
                    onBlur={formik.handleBlur}
                    value={formik.values.name}/>
                {formik.touched.name && formik.errors.name ? <div className='error'>{formik.errors.name}</div>: null}
            </div>

            <div className='form-control'>
                <label htmlFor='email'>E-Mail</label>
                <input type="email" name="email" id="email" 
                    onChange={formik.handleChange} 
                    onBlur={formik.handleBlur}
                    value={formik.values.email} />
                {formik.touched.email && formik.errors.email ? <div className='error'>{formik.errors.email}</div>: null}
            </div>


            <div className='form-control'>
                <label htmlFor='language'>Language</label>
                <input type="language" name="language" id="language" 
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange} 
                    value={formik.values.language}/>
                {formik.touched.language && formik.errors.language ? <div className='error'>{formik.errors.language}</div>: null}
            </div>
            
            <button type='submit'>Submit</button>
        </form>
    </div>
  )
}

export default OldForms