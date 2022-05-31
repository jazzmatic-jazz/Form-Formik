import React from 'react'
import { Formik, Form, Field, ErrorMessage, FieldArray, FastField } from 'formik'
import * as Yup from 'yup'
import TextError from './TextError'
import { useState } from 'react'

const initialValues = { //initaial value objects
    name: 'jasmine',
    email: '',
    language: '',
    experience: '',
    address: '',
    social: {
        facebook: '',   //nested object handeling
        twitter: '',
    },
    phoneNumbers: ['', ''], // array handling for the two phone numbers
    phNumbers: ['']

}

const savedValues = { //initaial value objects
    name: 'jasmine',
    email: 'sample@sample.com',
    language: 'python',
    experience: '1 year',
    address: 'najafgarh',
    social: {
        facebook: 'jasmine',   //nested object handeling
        twitter: 'twitter jasmine',
    },
    phoneNumbers: ['', ''], // array handling for the two phone numbers
    phNumbers: ['']

}


const onSubmit = (values, submitProps )=> {
    console.log('form data', values)
    console.log('submitProps', submitProps)
    submitProps.setSubmitting(false)
    submitProps.resetForm()
}

const validationSchema = Yup.object({
    name: Yup.string().required('Required!'),
    email: Yup.string().email('Invalid email format!').required('Required'),
    language: Yup.string().required('Required!'),
    experience: Yup.string().required('Required!'),
})

const ValidateExperience = value => {
    let error
    if (!value) {
        error = 'Required'
    }
    return error
}

function Forms() {
    const [formValues, setFormValues] = useState(null)
    return (
        <Formik
            initialValues={formValues || initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
            enableReinitialize
        // validateOnChange={false}
        //  validateOnBlur={false}
            validateOnMount
        >
            {
                formik => {
                    console.log('formik props', formik)
                    return (
                        <Form>
                            <div className='form-control'>
                                <label htmlFor='name'>Name</label>
                                <Field type="text" name="name" id="name" />
                                <ErrorMessage name='name' component={TextError} />
                            </div>

                            <div className='form-control'>
                                <label htmlFor='email'>E-Mail</label>
                                <Field type="email" name="email" id="email" />
                                <ErrorMessage name='email'>
                                    {
                                        (errorMsg) => <div className='error'>{errorMsg}</div>
                                    }
                                </ErrorMessage>
                            </div>


                            <div className='form-control'>
                                <label htmlFor='language'>Language</label>
                                <Field type="language" name="language" id="language"
                                    placeholder='Python' />
                                <ErrorMessage name='language' component={TextError} />
                            </div>

                            <div className='form-control'>
                                <label htmlFor='experience'>Experience</label>
                                <Field as='textarea' name="experience" id="experience"
                                    validate={ValidateExperience} />
                                <ErrorMessage name='experience' component={TextError} />
                            </div>

                            <div className='form-control'>
                                <label htmlFor="address">Address</label>
                                <FastField name='address'>
                                    {
                                        (props) => {
                                            // console.log('Field Render')
                                            const { field, form, meta } = props
                                            // console.log('Render props', props)
                                            return (
                                                <div>
                                                    <input type="text" id="address" {...field} />
                                                    {meta.touched && meta.error ? <div>{meta.error}</div> : null}
                                                </div>)
                                        }
                                    }
                                </FastField>

                            </div>

                            <div className='form-control'>
                                <label htmlFor="facebook">Facebook Profile</label>
                                <Field type='text' id='facebook' name='social.facebook' />

                            </div>

                            <div className='form-control'>
                                <label htmlFor="twitter">Twitter Profile</label>
                                <Field type='text' id='twitter' name='social.twitter' />

                            </div>

                            <div className='form-control'>
                                <label htmlFor="primaryPh">Primary Phone</label>
                                <Field type='text' id='primaryPh' name='phoneNumbers[0]' />

                            </div>

                            <div className='form-control'>
                                <label htmlFor="secondaryPh">Secondary Phone</label>
                                <Field type='text' id='secondaryPh' name='phoneNumbers[1]' />

                            </div>

                            <div className='form-control'>
                                <label> List of Phone Numbers</label>
                                <FieldArray name='phNumbers'>
                                    {
                                        (fieldArrayProps) => {
                                            // console.log("fieldArrayProps", fieldArrayProps)
                                            const { push, remove, form } = fieldArrayProps
                                            const { values } = form
                                            const { phNumbers } = values
                                            console.log('Form errors', form.errors)

                                            return (
                                                <div>
                                                    {
                                                        phNumbers.map((phNumber, index) =>
                                                            <div key={index}>
                                                                <Field name={`phNumbers[${index}]`} />
                                                                {
                                                                    index > 0 && (
                                                                        <button type='button' onClick={() => remove(index)}>-</button>)

                                                                }
                                                                <button type='button' onClick={() => push('')}>+</button>
                                                            </div>
                                                        )
                                                    }

                                                </div>)
                                        }
                                    }
                                </FieldArray>
                            </div>

                            {/* <button type='button' onClick={() => formik.validateField('experience')}>
                                Validate Experience
                            </button>
                            <button type='button' onClick={() => formik.validateForm()}>
                                Validate all
                            </button>

                            <button type='button' onClick={() => formik.setFieldTouched('experience')}>
                                Visit Experience
                            </button>
                            <button type='button' onClick={() => formik.setTouched({
                                name: true,
                                language: true,
                                email: true,
                                experience: true,
                            })}>
                                Visit Field */}
                            {/* </button> */}
                            {/* <button type='submit' disabled={! ( formik.isValid)}>Submit</button> */}
                            <button type='button' onClick={() => setFormValues(savedValues)}>Load Saved Data</button>
                            <button type='reset'>Reset</button>
                            <button type='submit' disabled={formik.isSubmitting}>Submit</button>
                        </Form>
                    )
                }
            }


        </Formik>
    )
}

export default Forms