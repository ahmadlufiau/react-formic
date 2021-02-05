import React from 'react'
import { Formik, Form, Field, ErrorMessage, FieldArray, FastField } from 'formik'
import * as Yup from 'yup'
import TextError from './TextError'

const initialValues = {
    name: 'Ahmad',
    email: '',
    channel: '',
    comments: '',
    address: '',
    social: {
        facebook: '',
        twitter: ''
    },
    phoneNumbers : ['', ''],
    phNumbers: ['']
}

const onSubmit = values => {
    console.log('Form data', values)
}

const validate = values => {
    // values.name values.email values.channel
    // errors.name errors.email errors.channel
    // erros.name = 'this field is required'
    let errors = {}

    if(!values.name) {
        errors.name = 'Required'
    } 

    if(!values.email) {
        errors.email = 'Required'
    } else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email format'
    }

    if(!values.channel) {
        errors.channel = 'Required'
    }

    return errors
}

const validationSchema = Yup.object({
    name: Yup.string().required('Required!'),
    email: Yup.string()
        .email('Invalid email format!')
        .required('Required!'),
    channel: Yup.string().required('Required!'),
})

const validateComments = value => {
    let error

    if(!value) {
        error = 'Required!'
    }
    return error
}

function YoutubeForm() {

    // console.log('Form values', formik.values)
    // console.log('Form errors', formik.errors)
    // console.log('Visited fields', formik.touched)

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
            // validateOnChange={false}
            // validateOnBlur={false}
            >
            <Form>
                <div className='form-control'>
                    <label htmlFor='name'>Name</label>
                    <Field type='text' id='name' name='name' />
                    <ErrorMessage name='name' component={TextError}/>
                </div>

                <div className='form-control'>
                    <label htmlFor='email'>Email</label>
                    <Field type='email' id='email' name='email' />
                    <ErrorMessage name='email'>
                        {
                            (errorMsg) => <div className='error'>{errorMsg}</div>
                        }
                    </ErrorMessage>
                </div>

                <div className='form-control'>
                    <label htmlFor='channel'>Channel</label>
                    <Field type='text' id='channel' name='channel' placeholder='Youtube Channel name' />
                    <ErrorMessage name='channel' />
                </div>

                <div className='form-control'>
                    <label htmlFor='comments'>Comments</label>
                    <Field as='textarea' id='comments' name='comments' validate={validateComments} />
                    <ErrorMessage name='comments' component={TextError} />
                </div>

                <div className='form-control'>
                    <label htmlFor='address'>Address</label>
                    <FastField name='address' >
                        { 
                            (props) => {
                                {/* console.log('Field render') */}
                                const { field, form, meta } = props
                                return (
                                    <div>
                                        <input type='text' id='address' {...field} />
                                        {meta.touched && meta.error ? <div>{meta.error}</div> : null}
                                    </div>
                                )
                            }
                        }
                    </FastField>
                </div>

                <div className='form-control'>
                    <label htmlFor='facebook'>Facebook profile</label>
                    <Field type='text' id='facebook' name='social.facebook' />
                </div>

                <div className='form-control'>
                    <label htmlFor='twitter'>Twitter profile</label>
                    <Field type='text' id='twitter' name='social.twitter' />
                </div>

                <div className='form-control'>
                    <label htmlFor='primaryPh'>Primary phone number</label>
                    <Field type='text' id='primaryPh' name='phoneNumbers[0]' />
                </div>

                <div className='form-control'>
                    <label htmlFor='secondaryPh'>Secondary phone number</label>
                    <Field type='text' id='secondaryPh' name='phoneNumbers[1]' />
                </div>

                <div className='form-control'>
                    <label>List of phone numbers</label>
                    <FieldArray name='phNumbers'>
                        {
                            (fieldArrayProps) => {
                                {/* console.log('fieldArrayProps', fieldArrayProps) */}
                                const {push, remove, form} = fieldArrayProps
                                const {values} = form
                                const {phNumbers} = values
                                console.log('Form errors', form.errors)
                                return (
                                    <div>
                                    {
                                        phNumbers.map((phNumber, index) => (
                                            <div key={index}>
                                                <Field name={`phNumbers[${index}]`} />
                                                {
                                                    index > 0 && 
                                                    <button type='button' onClick={() => remove(index) }> 
                                                        {' '}
                                                        - {' '} 
                                                    </button>
                                                }
                                                <button type='button' onClick={() => push('')}>
                                                    {' '}
                                                    + {' '} 
                                                </button>
                                            </div>
                                        ))
                                    }
                                    </div>
                                )
                            }
                        }
                    </FieldArray>
                </div>

                <button type='submit'>Submit</button>
            </Form>
        </Formik>
    )
}

export default YoutubeForm