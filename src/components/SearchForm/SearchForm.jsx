import { Field, Form, Formik } from 'formik';
import css from './SearchForm.module.css';

export default function SearchForm({ onSearch }) {
  return (
    <Formik
      initialValues={{ movieName: '' }}
      onSubmit={(values, actions) => {
        onSearch(values.movieName);
        actions.resetForm();
      }}
    >
      <Form className={css.form}>
        <Field className={css.input} type="text" name="movieName" />
        <button type="submit">Search</button>
      </Form>
    </Formik>
  );
}
