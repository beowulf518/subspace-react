import React, { PropTypes } from 'react';
import { Button, FormGroup } from 'react-bootstrap';
import { Field, reduxForm } from 'redux-form/immutable';
import { ReduxFormInput } from 'components/shared/ReduxFormInput';
import { ReduxFormTextArea } from 'components/shared/ReduxFormTextArea';

const CreateProjectForm = ({ handleSubmit, onSubmit }) => (
  <form onSubmit={handleSubmit(onSubmit)}>
    <h3>Create Project:</h3>
    <Field name="projectName" component={ReduxFormInput} type="text" placeholder="Project Name" />
    <div>Goals</div>
    <Field name="goals" component={ReduxFormTextArea} rows="5" />
    <div>Readme (Optional)</div>
    <Field name="readme" component={ReduxFormTextArea} rows="5" />
    <Field name="tags" component={ReduxFormInput} type="text" placeholder="Tags" />
    <FormGroup>
      <Field name="repoAccess" component="input" type="radio" value="public" /> Public
      <div></div>
      <Field name="repoAccess" component="input" type="radio" value="private" /> Private
    </FormGroup>

    <Button type="submit">Create Repository</Button>
  </form>
)

CreateProjectForm.propTypes = {
  handleSubmit: PropTypes.func,
  onSubmit: PropTypes.func,
}

export default reduxForm({
  form: 'createProject',
})(CreateProjectForm);
