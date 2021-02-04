import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import TextError from './TextError'

const initialValues = {
    name: '',
    email: '',
    channel: '',
    commenst: '',
    address: ''
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

function YoutubeForm() {

    // console.log('Form values', formik.values)
    // console.log('Form errors', formik.errors)
    // console.log('Visited fields', formik.touched)

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}>
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
                    <label htmlFor='comments'>Channel</label>
                    <Field as='textarea' id='comments' name='comments' />
                </div>

                <div className='form-control'>
                    <label htmlFor='address'>Channel</label>
                    <Field name='address' >
                        { 
                            (props) => {
                                const { field, form, meta } = props
                                console.log('Render props', props)
                                return (
                                    <div>
                                        <input type='text' id='address' {...field} />
                                        {meta.touched && meta.error ? <div>{meta.error}</div> : null}
                                    </div>
                                )
                            }
                        }
                    </Field>
                </div>

                <button type='submit'>Submit</button>
            </Form>
        </Formik>
    )
}

export default YoutubeForm